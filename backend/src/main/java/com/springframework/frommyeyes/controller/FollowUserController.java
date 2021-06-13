package com.springframework.frommyeyes.controller;

import com.springframework.frommyeyes.model.dto.FollowUserDto;
import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.service.FollowUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FollowUserController extends BaseController{

    private final FollowUserService followUserService;

    @PostMapping(value=FOLLOW)
    public FollowUserDto follow(@RequestBody FollowUserDto followUserDto) {
        return followUserService.follow(followUserDto);
    }

    @PostMapping(value=UNFOLLOW)
    public String unfollow(@RequestBody FollowUserDto followUserDto) {
        return followUserService.unFollow(followUserDto);
    }

}
