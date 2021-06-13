package com.springframework.frommyeyes.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto extends BaseDto{

    private String comment;

    private Integer likeCount;

    private UserDto user;

    private PostDto post;

}
