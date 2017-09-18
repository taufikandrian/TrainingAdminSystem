package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "role_tb")
public class Role implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
	@Column(name = "role_id", columnDefinition="uniqueidentifier")
	private String id;
	
	@Column(name = "role_code", nullable = false)
    private String roleCode;
	
	@Column(name = "role_name")
    private String roleName;
	
	@Column(name = "role_description")
    private String roleDescription;
	
	public Role(){
		
	}
	public Role(String roleCode,String roleName,String roleDescription){
		this.roleCode = roleCode;
		this.roleName = roleName;
		this.roleDescription = roleDescription;
	}
	public String getId() {
		return id;
	}
	public String getRoleCode() {
		return roleCode;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleDescription() {
		return roleDescription;
	}
	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}
}
