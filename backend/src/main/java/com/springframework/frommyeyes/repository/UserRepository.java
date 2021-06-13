package com.springframework.frommyeyes.repository;

import com.springframework.frommyeyes.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {


    @Query("select count(u.userName) from User u where u.userName=:userName")
    Integer getUsernameCount(String userName);

    @Query("select u from User u where u.userName=:userName and u.userPassword=:userPassword")
    User getUser(String userName, String userPassword);

    @Query("select u from User u where u.userName=:userName")
    User getUserByUsername(String userName);

}
