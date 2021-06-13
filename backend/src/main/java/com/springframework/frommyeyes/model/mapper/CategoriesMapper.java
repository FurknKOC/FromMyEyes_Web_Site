package com.springframework.frommyeyes.model.mapper;

import com.springframework.frommyeyes.model.dto.CategoriesDto;
import com.springframework.frommyeyes.model.entity.Categories;
import java.util.List;
import java.util.stream.Collectors;

public class CategoriesMapper extends BaseMapper{

    public static CategoriesDto mapTo(Categories entity) {
        if (entity == null) {
            return null;
        }
        CategoriesDto dto = new CategoriesDto();
        BaseMapper.mapToDto(dto, entity);

        dto.setCategoryName(entity.getCategoryName());

        return dto;
    }

    public static Categories mapTo(CategoriesDto from, Categories to) {
        BaseMapper.mapToEntity(from, to);

        to.setCategoryName(from.getCategoryName());

        return to;
    }

    public static Categories mapTo(CategoriesDto dto) {
        return mapTo(dto, new Categories());
    }

    public static List<CategoriesDto> mapToDto(List<Categories> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(CategoriesMapper::mapTo).collect(Collectors.toList());
    }

    public static List<Categories> mapToEntity(List<CategoriesDto> dtos){
        if (dtos == null) {
            return null;
        }
        return dtos.stream().map(CategoriesMapper::mapTo).collect(Collectors.toList());
    }
}
