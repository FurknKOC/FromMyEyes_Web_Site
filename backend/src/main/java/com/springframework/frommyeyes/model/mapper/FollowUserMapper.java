package com.springframework.frommyeyes.model.mapper;

import com.springframework.frommyeyes.model.dto.FollowUserDto;
import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.model.entity.FollowUser;
import com.springframework.frommyeyes.model.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class FollowUserMapper extends BaseMapper{

    public static FollowUserDto mapTo(FollowUser entity) {
        if (entity == null) {
            return null;
        }
        FollowUserDto dto = new FollowUserDto();
        BaseMapper.mapToDto(dto, entity);


        return dto;
    }

    public static FollowUser mapTo(FollowUserDto from, FollowUser to) {
        BaseMapper.mapToEntity(from, to);


        return to;
    }

    public static FollowUser mapTo(FollowUserDto dto) {
        return mapTo(dto, new FollowUser());
    }

    public static List<FollowUserDto> mapToDto(List<FollowUser> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(FollowUserMapper::mapTo).collect(Collectors.toList());
    }

    public static List<FollowUser> mapToEntity(List<FollowUserDto> dtos){
        if (dtos == null) {
            return null;
        }
        return dtos.stream().map(FollowUserMapper::mapTo).collect(Collectors.toList());
    }

}
