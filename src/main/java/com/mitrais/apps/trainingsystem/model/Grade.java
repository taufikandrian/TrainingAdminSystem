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
@Table(name = "grade_tb")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Grade implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "grade_id", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "grade_code", nullable = false)
    private String gradeCode;
	
	@Column(name = "grade_name", nullable = false)
    private String gradeName;
	
	@Column(name = "grade_description", nullable = false)
    private String gradeDescription;

	public String getGradeCode() {
		return gradeCode;
	}
	
	public void setGradeCode(String gradeCode) {
		this.gradeCode = gradeCode;
	}
	
	public String getGradeName() {
		return gradeName;
	}
	
	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
	
	public String getGradeDescription() {
		return gradeDescription;
	}
	
	public void setGradeDescription(String gradeDescription) {
		this.gradeDescription = gradeDescription;
	}
	
	public Grade(){
		
	}
	
	public Grade(String gradeCode,String gradeName,String gradeDescription,String gradeJobFamilyId){
		this.gradeCode = gradeCode;
		this.gradeName = gradeName;
		this.gradeDescription = gradeDescription;
	}
	
	public String getId() {
		return id;
	}
	
	@JsonIgnore
	@OneToMany(mappedBy="grade", fetch = FetchType.LAZY)
	private Set<User> users = new HashSet<>();
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	
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
