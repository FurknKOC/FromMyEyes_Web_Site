package com.springframework.frommyeyes.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Contact extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String email;

    private String phone;

    private String twitter;

    private String instagram;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

}
