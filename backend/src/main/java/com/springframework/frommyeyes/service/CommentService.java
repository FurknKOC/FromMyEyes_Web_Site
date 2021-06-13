package com.springframework.frommyeyes.service;

import com.springframework.frommyeyes.model.dto.CommentDto;
import com.springframework.frommyeyes.model.dto.PostDto;
import com.springframework.frommyeyes.model.entity.Comment;
import com.springframework.frommyeyes.model.entity.Post;
import com.springframework.frommyeyes.model.entity.User;
import com.springframework.frommyeyes.model.mapper.CommentMapper;
import com.springframework.frommyeyes.model.mapper.PostMapper;
import com.springframework.frommyeyes.repository.CommentRepository;
import com.springframework.frommyeyes.repository.PostRepository;
import com.springframework.frommyeyes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public CommentDto addComment(CommentDto commentDto) {

        if (commentDto.getId() == null) {
            Comment comment = new Comment();

            User user = userRepository.getUserByUsername(commentDto.getUser().getUserName());
            Post post = postRepository.getOne(commentDto.getPost().getId());

            comment.setComment(commentDto.getComment());
            comment.setLikeCount(commentDto.getLikeCount());
            comment.setUser(user);
            comment.setPost(post);

           return CommentMapper.mapTo(commentRepository.save(comment));
        }

        return null;
    }

}
