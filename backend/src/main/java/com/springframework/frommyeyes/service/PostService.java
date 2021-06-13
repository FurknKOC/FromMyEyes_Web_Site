package com.springframework.frommyeyes.service;

import com.springframework.frommyeyes.model.dto.CommentDto;
import com.springframework.frommyeyes.model.dto.PostDto;
import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.model.dto.UserRequest;
import com.springframework.frommyeyes.model.entity.Comment;
import com.springframework.frommyeyes.model.entity.Post;
import com.springframework.frommyeyes.model.entity.User;
import com.springframework.frommyeyes.model.mapper.CategoriesMapper;
import com.springframework.frommyeyes.model.mapper.CommentMapper;
import com.springframework.frommyeyes.model.mapper.PostMapper;
import com.springframework.frommyeyes.model.mapper.UserMapper;
import com.springframework.frommyeyes.repository.CategoriesRepository;
import com.springframework.frommyeyes.repository.CommentRepository;
import com.springframework.frommyeyes.repository.PostRepository;
import com.springframework.frommyeyes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CategoriesRepository categoriesRepository;
    private final CommentRepository commentRepository;

    public PostDto addPost(PostDto postDto) {

        Post post = PostMapper.mapTo(postDto);
        post.setUser(userRepository.getOne(postDto.getUser().getId()));
        post.setCategory(categoriesRepository.getOne(postDto.getCategory().getId()));

        return PostMapper.mapTo(postRepository.save(post));
    }

    public Page<PostDto> getUserPosts(UserRequest userRequest) {

        User user = userRepository.getUserByUsername(userRequest.getUserName());

        List<Post> posts = postRepository.getUserPosts(user.getId());

        Page<Post> page = new PageImpl<>(posts);

        Page<PostDto> postDtos = page.map(PostMapper::mapTo);

        for (PostDto postDto : postDtos) {
            Long categoryId = postRepository.getPostCategoryId(postDto.getId());
            List<Comment> comments = commentRepository.getPostComments(postDto.getId());
            postDto.setComments(comments.stream().map(CommentMapper::mapTo).collect(Collectors.toList()));
            postDto.setUser(UserMapper.mapTo(userRepository.getOne(user.getId())));
            postDto.setCategory(CategoriesMapper.mapTo(categoriesRepository.getOne(categoryId)));
        }

        return postDtos;
    }

    public Page<PostDto> getAllPosts() {

        List<Post> posts = postRepository.findAll();

        for (Post post : posts) {
            List<Comment> comments = commentRepository.getPostComments(post.getId());
            post.setComments(comments);
        }

        Page<Post> page = new PageImpl<>(posts);

        Page<PostDto> postDtos = page.map(PostMapper::mapTo);

        for (PostDto postDto : postDtos) {
            Long categoryId = postRepository.getPostCategoryId(postDto.getId());
            Long userId = postRepository.getPostUserId(postDto.getId());
            List<Comment> comments = commentRepository.getPostComments(postDto.getId());
            for(Comment comment : comments) {
                CommentDto commentDto = CommentMapper.mapTo(comment);
                User commentUser = commentRepository.getUser(comment.getId());
                commentDto.setUser(UserMapper.mapTo(commentUser));
                postDto.getComments().add(commentDto);
            }
            //postDto.setComments(comments.stream().map(CommentMapper::mapTo).collect(Collectors.toList()));
            postDto.setUser(UserMapper.mapTo(userRepository.getOne(userId)));
            postDto.setCategory(CategoriesMapper.mapTo(categoriesRepository.getOne(categoryId)));
        }

        return postDtos;
    }

}
