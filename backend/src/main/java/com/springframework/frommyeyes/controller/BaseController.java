package com.springframework.frommyeyes.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
public abstract class BaseController {

    protected static final String CREATE_NEW_USER = "/user";
    protected static final String UPDATE_USER = "/user/update";
    protected static final String LOGIN = "/login";
    protected static final String GET_USER = "/getUser";
    protected static final String GET_CATEGORIES = "/getCategories";
    protected static final String ADD_POST = "/post";
    protected static final String GET_USER_POSTS = "/post/user";
    protected static final String GET_ALL_POSTS = "/posts";
    protected static final String LIKE = "/like";
    protected static final String COMMENT = "/comment";
    protected static final String FOLLOW = "/follow";
    protected static final String UNFOLLOW = "/unfollow";

}
