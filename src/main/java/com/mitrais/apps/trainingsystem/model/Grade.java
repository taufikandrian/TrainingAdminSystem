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
@Table(name = "grade_tb")
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
	
//	@Column(name = "job_family_id", nullable = false)
//    private String gradeJobFamilyId;
	
//	public String getGradeJobFamilyId() {
//		return gradeJobFamilyId;
//	}

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
//		this.gradeJobFamilyId = gradeJobFamilyId;
	}
	
	public String getId() {
		return id;
	}
	
	@ManyToOne(optional=false)
    @JoinColumn(name="job_family_id",referencedColumnName="job_family_id")
	private JobFamily jobFamily;

	public JobFamily getJobFamily() {
		return jobFamily;
	}

	public void setJobFamily(JobFamily jobFamily) {
		this.jobFamily = jobFamily;
	}
}
