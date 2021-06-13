package com.springframework.frommyeyes.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends BaseDto{

    private String userName;

    private String userPassword;

    private String userAbout;

    private String userRole;

    private String backgroundImage;

    private String profileImage;

}
