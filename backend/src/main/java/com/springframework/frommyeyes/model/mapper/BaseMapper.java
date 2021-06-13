package com.springframework.frommyeyes.model.mapper;

import com.springframework.frommyeyes.model.dto.BaseDto;
import com.springframework.frommyeyes.model.entity.BaseEntity;

public class BaseMapper {

    public static void mapToDto(BaseDto dto, BaseEntity entity) {
        dto.setStatus(entity.getStatus());
        dto.setId(entity.getId());
    }

    public static void mapToEntity(BaseDto dto, BaseEntity entity) {
        entity.setStatus(dto.getStatus());
        entity.setId(dto.getId());
    }

}
