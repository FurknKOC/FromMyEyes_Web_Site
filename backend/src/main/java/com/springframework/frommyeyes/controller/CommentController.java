package com.springframework.frommyeyes.controller;

import com.springframework.frommyeyes.model.dto.CommentDto;
import com.springframework.frommyeyes.model.dto.PostDto;
import com.springframework.frommyeyes.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommentController extends BaseController{

    private final CommentService commentService;

    @PostMapping(value=COMMENT)
    public CommentDto addPost(@RequestBody CommentDto commentDto) {
        return commentService.addComment(commentDto);
    }

}
