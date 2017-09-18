package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "user_role_tb")
public class UserRole extends Auditable<String> implements Serializable{
	
    private User user;
    private Role role;
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "user_role_tb", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "user_role_status", nullable = false)
    private String userRoleStatus;
	
	public UserRole(){
		
	}
	
	public UserRole(String userRoleStatus){
		this.userRoleStatus = userRoleStatus;
	}
	
	public String getId() {
		return id;
	}
	
	public String getUserRoleStatus() {
		return userRoleStatus;
	}
	
	public void setUserRoleStatus(String userRoleStatus) {
		this.userRoleStatus = userRoleStatus;
	}
	
	@ManyToOne(optional=false)
    @JoinColumn(name="user_id",referencedColumnName="user_id")
	public User getUser() {
		return user;
	}
	@ManyToOne(optional=false)
    @JoinColumn(name="role_id",referencedColumnName="role_id")
	public Role getRole() {
		return role;
	}
}
