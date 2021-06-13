package com.springframework.frommyeyes.model.mapper;

import com.springframework.frommyeyes.model.dto.ContactDto;
import com.springframework.frommyeyes.model.entity.Contact;
import com.springframework.frommyeyes.model.entity.Post;

import java.util.List;
import java.util.stream.Collectors;

public class ContactMapper extends BaseMapper{

    public static ContactDto mapTo(Contact entity) {
        if (entity == null) {
            return null;
        }
        ContactDto dto = new ContactDto();
        BaseMapper.mapToDto(dto, entity);

        dto.setEmail(entity.getEmail());
        dto.setInstagram(entity.getInstagram());
        dto.setPhone(entity.getPhone());
        dto.setTwitter(entity.getTwitter());

        return dto;
    }

    public static Contact mapTo(ContactDto from, Contact to) {
        BaseMapper.mapToEntity(from, to);
        to.setEmail(from.getEmail());
        to.setInstagram(from.getInstagram());
        to.setPhone(from.getPhone());
        to.setTwitter(from.getTwitter());

        return to;
    }

    public static Contact mapTo(ContactDto dto) {
        return mapTo(dto, new Contact());
    }

    public static List<ContactDto> mapToDto(List<Contact> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(ContactMapper::mapTo).collect(Collectors.toList());
    }

    public static List<Contact> mapToEntity(List<ContactDto> dtos){
        if (dtos == null) {
            return null;
        }
        return dtos.stream().map(ContactMapper::mapTo).collect(Collectors.toList());
    }

}
