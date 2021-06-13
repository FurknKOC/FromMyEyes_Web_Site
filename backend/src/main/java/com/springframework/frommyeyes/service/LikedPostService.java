package com.springframework.frommyeyes.service;

import com.springframework.frommyeyes.model.dto.LikeRequest;
import com.springframework.frommyeyes.model.dto.LikedPostDto;
import com.springframework.frommyeyes.model.dto.PostDto;
import com.springframework.frommyeyes.model.entity.LikedPost;
import com.springframework.frommyeyes.model.entity.Post;
import com.springframework.frommyeyes.model.entity.User;
import com.springframework.frommyeyes.model.mapper.PostMapper;
import com.springframework.frommyeyes.model.mapper.UserMapper;
import com.springframework.frommyeyes.repository.LikedPostRepository;
import com.springframework.frommyeyes.repository.PostRepository;
import com.springframework.frommyeyes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikedPostService {

    private final LikedPostRepository likedPostRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public boolean like(LikeRequest likeRequest) {

        LikedPost likedPost = new LikedPost();

        User user = userRepository.getUserByUsername(likeRequest.getUser().getUserName());
        Post post = postRepository.getOne(likeRequest.getPost().getId());

        likedPost.setUser(user);
        likedPost.setPost(post);

        likedPostRepository.save(likedPost);

        post.setLikeCount(post.getLikeCount() + 1);

        postRepository.save(post);

        return true;
    }

}
