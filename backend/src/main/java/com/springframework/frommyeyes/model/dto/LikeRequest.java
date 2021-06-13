package com.springframework.frommyeyes.model.dto;

import com.springframework.frommyeyes.model.entity.LikedPost;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeRequest extends BaseDto{

    private UserDto user;

    private PostDto post;

}
