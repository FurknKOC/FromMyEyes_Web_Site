package com.springframework.frommyeyes.repository;

import com.springframework.frommyeyes.model.entity.Comment;
import com.springframework.frommyeyes.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long>, JpaSpecificationExecutor<Comment> {

    @Query("select c from Comment c where c.post.id=:id")
    List<Comment> getPostComments(Long id);

    @Query("select c.user from Comment c where c.id=:id")
    User getUser(Long id);

}
