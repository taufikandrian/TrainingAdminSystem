package com.mitrais.apps.trainingsystem.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable<U> {
	
    @CreatedDate
    @Column(name = "created_at")
    protected Date creationDate;
    
	@CreatedBy
	@Column(name = "created_by")
    protected U createdBy;

    @LastModifiedDate
    @Column(name = "updated_at")
    protected Date lastModifiedDate;
    
    @LastModifiedBy
    @Column(name = "updated_by", nullable = true)
    protected U lastModifiedBy;
    
    @Column(name = "deleted_at", nullable = true)
    protected Date deletedDate;
    
    @Column(name = "deleted_by", nullable = true)
    protected U deletedBy;
}
