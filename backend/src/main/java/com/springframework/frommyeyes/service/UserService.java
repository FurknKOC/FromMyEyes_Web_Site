package com.springframework.frommyeyes.service;

import com.springframework.frommyeyes.model.dto.LoginRequest;
import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.model.dto.UserRequest;
import com.springframework.frommyeyes.model.entity.User;
import com.springframework.frommyeyes.model.mapper.UserMapper;
import com.springframework.frommyeyes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDto createNewUser(UserDto userDto) {
        User user;

        Integer userCount = userRepository.getUsernameCount(userDto.getUserName());

        if (userCount > 0) {
            return null;
        } else {
            user = UserMapper.mapTo(userDto);
            userRepository.save(user);
        }

        return UserMapper.mapTo(user);
    }

    public UserDto getUser(UserRequest userRequest) {

        User user = userRepository.getUserByUsername(userRequest.getUserName());

        return UserMapper.mapTo(user);
    }

    public UserDto login(LoginRequest loginRequest) {

        User user = userRepository.getUser(loginRequest.getUserName(), loginRequest.getUserPassword());

        if (user != null) {
            return UserMapper.mapTo(user);
        } else {
            return null;
        }

    }


    public UserDto updateUser(UserDto userDto) {

        User user = userRepository.getOne(userDto.getId());
        if (user != null) {
            UserMapper.mapTo(userDto, user);
        } else {
            return null;
        }
        return UserMapper.mapTo(userRepository.save(user));
    }

}
