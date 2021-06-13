package com.springframework.frommyeyes.controller;

import com.springframework.frommyeyes.model.dto.CategoriesDto;
import com.springframework.frommyeyes.model.dto.PostDto;
import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.model.dto.UserRequest;
import com.springframework.frommyeyes.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController extends BaseController {

    private final PostService postService;

    @PostMapping(value=ADD_POST)
    public PostDto addPost(@RequestBody PostDto postDto) {
        return postService.addPost(postDto);
    }

    @PostMapping(value = GET_USER_POSTS)
    public Page<PostDto> getUserPosts(@RequestBody UserRequest userRequest) {
        return postService.getUserPosts(userRequest);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping(value = GET_ALL_POSTS)
    public Page<PostDto> getAllPosts() {
        return postService.getAllPosts();
    }

}
