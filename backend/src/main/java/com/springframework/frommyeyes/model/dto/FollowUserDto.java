package com.springframework.frommyeyes.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowUserDto extends BaseDto{

    private UserDto followed;

    private UserDto following;

}
