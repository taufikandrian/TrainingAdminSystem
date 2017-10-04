package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "user_tb")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User extends Auditable<String> implements Serializable {
	
	/**
	 * 
	 */
	@Transient
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@Transient
	public String division_id;
	
	@Transient
	public String grade_id;
	
	@Transient
	public List<String> roles;
	
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "user_id", columnDefinition="uniqueidentifier")
    private String id;
    
    @Column(name = "user_full_name")
    private String fullName;
    
	@Column(name = "user_email")
    private String email;
    
    @Column(name = "user_account_name")
    private String accountName;
    
    @Column(name = "user_password")
    private String password;
    
    @Column(name = "user_status")
    private String status;
    
    @Column(name = "user_replacement")
    private Integer userReplacement;
    
    @Column(name = "user_gender")
    private String gender;
    
    public String getGender() {
		return gender;
	}

	public void setGender(String gander) {
		this.gender = gander;
	}

	public Integer getUserReplacement() {
		return userReplacement;
	}

	public void setUserReplacement(Integer userReplacement) {
		this.userReplacement = userReplacement;
	}
	public User() {
    }

    public User(String name, String email, String accountName, String password, String status) {
    	this.setFullName(name);
    	this.setEmail(email);
    	this.setAccountName(accountName);
        this.setPassword(password);
        this.setStatus(status);
    }

    public String getId() {
        return id;
    }

    public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = passwordEncoder.encode(password);;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	@ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="division_id",referencedColumnName="division_id")
    private Division division;
	public Division getDivision() {
		return division;
	}
	public void setDivision(Division division){
		this.division = division;
	}
	
	@ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="grade_id",referencedColumnName="grade_id")
    private Grade grade;
	public Grade getGrade() {
		return grade;
	}
	public void setGrade(Grade grade){
		this.grade = grade;
	}
	
	@ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name="user_role_tb",
            joinColumns=
            @JoinColumn(name="user_id", referencedColumnName="user_id"),
      inverseJoinColumns=
            @JoinColumn(name="role_id", referencedColumnName="role_id")
    )
	private Set<Role> roleList;
	
	public Set<Role> getRoleList() {
		return roleList;
	}
	public void setRoleList(Set<Role> role){
		this.roleList = role;
	}
	
	@ManyToMany(mappedBy="eligibleList")
	private Set<Training> eligibleTrainings;

	public Set<Training> getEligibleTrainings() {
		return eligibleTrainings;
	}

	public void setEligibleTrainings(Set<Training> eligibleTrainings) {
		this.eligibleTrainings = eligibleTrainings;
	}
}
