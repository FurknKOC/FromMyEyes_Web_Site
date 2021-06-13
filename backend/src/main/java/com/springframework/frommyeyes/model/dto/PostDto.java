package com.springframework.frommyeyes.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PostDto extends BaseDto {

    private String comment;

    private String photo;

    private String title;

    private Integer likeCount;

    private UserDto user;

    private CategoriesDto category;

    private List<CommentDto> comments = new ArrayList<>();

}
