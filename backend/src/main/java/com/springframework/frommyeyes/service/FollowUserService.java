package com.springframework.frommyeyes.service;

import com.springframework.frommyeyes.model.dto.FollowUserDto;
import com.springframework.frommyeyes.model.entity.FollowUser;
import com.springframework.frommyeyes.model.mapper.FollowUserMapper;
import com.springframework.frommyeyes.model.mapper.UserMapper;
import com.springframework.frommyeyes.repository.FollowUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowUserService {

    private final FollowUserRepository followUserRepository;

    public FollowUserDto follow(FollowUserDto followUserDto) {

        FollowUser followUser = new FollowUser();

        followUser.setFollowed(UserMapper.mapTo(followUserDto.getFollowed()));
        followUser.setFollowing(UserMapper.mapTo(followUserDto.getFollowing()));

        return FollowUserMapper.mapTo(followUserRepository.save(followUser));
    }

    public String unFollow(FollowUserDto followUserDto) {

        FollowUser followUser = followUserRepository.getFollowUser(followUserDto.getFollowed().getId(), followUserDto.getFollowing().getId());

        followUserRepository.delete(followUser);

        return "OK";
    }

}
