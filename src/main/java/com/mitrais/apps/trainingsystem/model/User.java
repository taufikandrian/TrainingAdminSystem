package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "user_tb")
public class User extends Auditable<String> implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "user_id", columnDefinition="uniqueidentifier")
    private String id;
    
    @Column(name = "user_full_name", nullable = false)
    private String fullName;
    
	@Column(name = "user_email")
    private String email;
    
    @Column(name = "user_account_name")
    private String accountName;
    
    @Column(name = "user_password")
    private String password;
    
    @Column(name = "user_status")
    private String status;
    
    public User() {
    }

    public User(String name, String email, String accountName, String password, String status) {
        this.fullName 		= name;
        this.email 			= email;
        this.accountName 	= accountName;
        this.password 		= password;
        this.status 		= status;
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
		this.password = password;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	@ManyToOne(optional=false) 
    @JoinColumn(name="division_id",referencedColumnName="division_id")
    private Division division;
	public Division getDivision() {
		return division;
	}

	@ManyToOne(optional=false)
    @JoinColumn(name="grade_id",referencedColumnName="grade_id")
    private Grade grade;
	public Grade getGrade() {
		return grade;
	}
	
	@ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="user_role_tb",
            joinColumns=
            @JoinColumn(name="user_id", referencedColumnName="user_id"),
      inverseJoinColumns=
            @JoinColumn(name="role_id", referencedColumnName="role_id")
    )
	private List<Role> roleList;
	public List<Role> getRoleList() {
		return roleList;
	}
	
	@Override
	public String toString() {
		return "User{" +
				", name='" + fullName + '\'' +
				'}';
	}
}
