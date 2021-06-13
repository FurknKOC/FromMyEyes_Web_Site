package com.springframework.frommyeyes.model.mapper;

import com.springframework.frommyeyes.model.dto.PostDto;
import com.springframework.frommyeyes.model.entity.Post;
import com.springframework.frommyeyes.model.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class PostMapper extends BaseMapper{

    public static PostDto mapTo(Post entity) {
        if (entity == null) {
            return null;
        }
        PostDto dto = new PostDto();
        BaseMapper.mapToDto(dto, entity);

        dto.setComment(entity.getComment());
        dto.setPhoto(entity.getPhoto());
        dto.setTitle(entity.getTitle());
        dto.setLikeCount(entity.getLikeCount());

        return dto;
    }

    public static Post mapTo(PostDto from, Post to) {
        BaseMapper.mapToEntity(from, to);
        to.setComment(from.getComment());
        to.setPhoto(from.getPhoto());
        to.setTitle(from.getTitle());
        to.setLikeCount(from.getLikeCount());

        return to;
    }

    public static Post mapTo(PostDto dto) {
        return mapTo(dto, new Post());
    }

    public static List<PostDto> mapToDto(List<Post> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(PostMapper::mapTo).collect(Collectors.toList());
    }

    public static List<Post> mapToEntity(List<PostDto> dtos){
        if (dtos == null) {
            return null;
        }
        return dtos.stream().map(PostMapper::mapTo).collect(Collectors.toList());
    }

}
