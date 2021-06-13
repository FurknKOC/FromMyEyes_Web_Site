package com.springframework.frommyeyes.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Categories extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String categoryName;

    @OneToMany(mappedBy = "category")
    private List<Post> posts = new ArrayList<>();

}
