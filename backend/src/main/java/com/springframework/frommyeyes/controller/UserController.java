package com.springframework.frommyeyes.controller;

import com.springframework.frommyeyes.model.dto.LoginRequest;
import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.model.dto.UserRequest;
import com.springframework.frommyeyes.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController extends BaseController{

    private final UserService userService;

    @PostMapping(value = GET_USER)
    public UserDto getUser(@RequestBody UserRequest userRequest) {
        return userService.getUser(userRequest);
    }

    @PostMapping(value=LOGIN)
    public UserDto Login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }

    @PostMapping(value=CREATE_NEW_USER)
    public UserDto crateNewUser(@RequestBody UserDto userDto) {
        return userService.createNewUser(userDto);
    }

    @PostMapping(value=UPDATE_USER)
    public UserDto updateUser(@RequestBody UserDto userDto) {
        return userService.updateUser(userDto);
    }
}
