package com.springframework.frommyeyes.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.engine.profile.Fetch;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class User extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String userName;

    private String userPassword;

    private String userAbout;

    @Size(min = 0, max = 30000, message
            = "About Me must be between 0 and 4000 characters")
    private String profileImage;

    @Size(min = 0, max = 30000, message
            = "About Me must be between 0 and 4000 characters")
    private String backgroundImage;

    private String userRole;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    private Contact contact;

    @OneToMany(mappedBy = "user")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
    private LikedPost likedPost;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "following")
    private FollowUser following;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "followed")
    private FollowUser followed;

}
