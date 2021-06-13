package com.springframework.frommyeyes.controller;

import com.springframework.frommyeyes.model.dto.LikeRequest;
import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.model.entity.LikedPost;
import com.springframework.frommyeyes.service.LikedPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LikedPostController extends BaseController{

    private final LikedPostService likedPostService;

    @PostMapping(value=LIKE)
    public boolean like(@RequestBody LikeRequest likeRequest) {
        return likedPostService.like(likeRequest);
    }

}
