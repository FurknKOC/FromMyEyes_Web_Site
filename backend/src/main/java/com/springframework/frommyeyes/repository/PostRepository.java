package com.springframework.frommyeyes.repository;

import com.springframework.frommyeyes.model.entity.Post;
import com.springframework.frommyeyes.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {

    @Query("select p from Post p where p.user.id=:id")
    List<Post> getUserPosts(Long id);

    @Query("select p.category.id from Post p where p.id=:id")
    Long getPostCategoryId(Long id);

    @Query("select p.user.id from Post p where p.id=:id")
    Long getPostUserId(Long id);

}
