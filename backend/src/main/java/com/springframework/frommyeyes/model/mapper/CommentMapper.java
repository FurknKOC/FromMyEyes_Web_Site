package com.springframework.frommyeyes.model.mapper;

import com.springframework.frommyeyes.model.dto.CommentDto;
import com.springframework.frommyeyes.model.dto.ContactDto;
import com.springframework.frommyeyes.model.entity.Comment;
import com.springframework.frommyeyes.model.entity.Contact;

import java.util.List;
import java.util.stream.Collectors;

public class CommentMapper extends BaseMapper{

    public static CommentDto mapTo(Comment entity) {
        if (entity == null) {
            return null;
        }
        CommentDto dto = new CommentDto();
        BaseMapper.mapToDto(dto, entity);

        dto.setLikeCount(entity.getLikeCount());
        dto.setComment(entity.getComment());

        return dto;
    }

    public static Comment mapTo(CommentDto from, Comment to) {
        BaseMapper.mapToEntity(from, to);

        to.setComment(from.getComment());
        to.setLikeCount(from.getLikeCount());

        return to;
    }

    public static Comment mapTo(CommentDto dto) {
        return mapTo(dto, new Comment());
    }

    public static List<CommentDto> mapToDto(List<Comment> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(CommentMapper::mapTo).collect(Collectors.toList());
    }

    public static List<Comment> mapToEntity(List<CommentDto> dtos){
        if (dtos == null) {
            return null;
        }
        return dtos.stream().map(CommentMapper::mapTo).collect(Collectors.toList());
    }

}
