package com.springframework.frommyeyes.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {

    private int status = 1;

    @CreatedDate
    private LocalDateTime createDateTime;

    @LastModifiedDate
    private LocalDateTime updateDateTime;

    @CreatedBy
    private Long createdBy;

    @LastModifiedBy
    private Long updatedBy;

    public boolean isActive() {
        return this.status == status;
    }

    public void setInactive() {
        this.status = 0;
    }

    public void setActive() {
        this.status = 1;
    }

    public abstract Long getId();

    public abstract void setId(Long id);

}
