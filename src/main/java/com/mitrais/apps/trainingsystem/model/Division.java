package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "division_tb")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Division implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "division_id", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "division_code", nullable = false)
    private String divisionCode;
	
	@Column(name = "division_name", nullable = false)
    private String divisionName;
	
	@Column(name = "division_description", nullable = false)
    private String divisionDescription;

	public String getDivisionCode() {
		return divisionCode;
	}

	public void setDivisionCode(String divisionCode) {
		this.divisionCode = divisionCode;
	}

	public String getDivisionName() {
		return divisionName;
	}

	public void setDivisionName(String divisionName) {
		this.divisionName = divisionName;
	}

	public String getDivisionDescription() {
		return divisionDescription;
	}

	public void setDivisionDescription(String divisionDescription) {
		this.divisionDescription = divisionDescription;
	}
	
	public Division(){
		
	}

	public Division(String divisionCode, String divisionName, String divisionDescription,String divisionJobFamilyId){
		this.divisionCode = divisionCode;
		this.divisionName = divisionName;
		this.divisionDescription = divisionDescription;
	}

	public String getId() {
		return id;
	}
	
//	@JsonIgnore
//	@OneToMany(mappedBy="division", fetch = FetchType.LAZY)
//	private Set<User> users = new HashSet<>();
//	public Set<User> getUsers() {
//		return users;
//	}
//	public void setUsers(Set<User> users) {
//		this.users = users;
//	}
	
	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="job_family_id",referencedColumnName="job_family_id")
	private JobFamily jobFamily;
	public void setJobFamily(JobFamily jobFamily) {
		this.jobFamily = jobFamily;
	}
	public JobFamily getJobFamily() {
		return jobFamily;
	}
}
