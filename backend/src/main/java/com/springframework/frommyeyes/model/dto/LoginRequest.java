package com.springframework.frommyeyes.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest extends BaseDto{

    private String userName;
    private String userPassword;

}
