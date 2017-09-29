package com.mitrais.apps.trainingsystem.model;

import java.util.Date;

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

	@LastModifiedDate
    @Column(name = "updated_at")
    protected Date lastModifiedDate;
    
	@Column(name = "created_by")
    protected U createdBy;
    
    @Column(name = "updated_by")
    protected U lastModifiedBy;
    
    @Column(name = "deleted_by")
    protected U deletedBy;

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public U getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(U createdBy) {
		this.createdBy = createdBy;
	}

	public U getLastModifiedBy() {
		return lastModifiedBy;
	}

	public void setLastModifiedBy(U lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	public U getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(U deletedBy) {
		this.deletedBy = deletedBy;
	}

}
