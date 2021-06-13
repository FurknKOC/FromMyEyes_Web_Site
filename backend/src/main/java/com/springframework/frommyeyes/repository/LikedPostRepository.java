package com.springframework.frommyeyes.repository;

import com.springframework.frommyeyes.model.entity.LikedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LikedPostRepository extends JpaRepository<LikedPost, Long>, JpaSpecificationExecutor<LikedPost> {

}
