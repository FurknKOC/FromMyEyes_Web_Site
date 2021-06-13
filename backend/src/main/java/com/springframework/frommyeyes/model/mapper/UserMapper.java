package com.springframework.frommyeyes.model.mapper;

import com.springframework.frommyeyes.model.dto.UserDto;
import com.springframework.frommyeyes.model.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper extends BaseMapper{

    public static UserDto mapTo(User entity) {
        if (entity == null) {
            return null;
        }
        UserDto dto = new UserDto();
        BaseMapper.mapToDto(dto, entity);

        dto.setUserAbout(entity.getUserAbout());
        dto.setUserRole(entity.getUserRole());
        dto.setUserPassword(entity.getUserPassword());
        dto.setUserName(entity.getUserName());
        dto.setBackgroundImage(entity.getBackgroundImage());
        dto.setProfileImage(entity.getProfileImage());

        return dto;
    }

    public static User mapTo(UserDto from, User to) {
        BaseMapper.mapToEntity(from, to);
        to.setUserAbout(from.getUserAbout());
        to.setUserName(from.getUserName());
        to.setUserPassword(from.getUserPassword());
        to.setUserRole(from.getUserRole());
        to.setBackgroundImage(from.getBackgroundImage());
        to.setProfileImage(from.getProfileImage());

        return to;
    }

    public static User mapTo(UserDto dto) {
        return mapTo(dto, new User());
    }

    public static List<UserDto> mapToDto(List<User> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(UserMapper::mapTo).collect(Collectors.toList());
    }

    public static List<User> mapToEntity(List<UserDto> dtos){
        if (dtos == null) {
            return null;
        }
        return dtos.stream().map(UserMapper::mapTo).collect(Collectors.toList());
    }
}
