package com.springframework.frommyeyes.repository;

import com.springframework.frommyeyes.model.entity.FollowUser;
import com.springframework.frommyeyes.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface FollowUserRepository extends JpaRepository<FollowUser, Long>, JpaSpecificationExecutor<FollowUser> {

    @Query("select f from FollowUser f where f.followed.id=:followedId and f.following.id=:followingId")
    FollowUser getFollowUser(Long followedId, Long followingId);

}
