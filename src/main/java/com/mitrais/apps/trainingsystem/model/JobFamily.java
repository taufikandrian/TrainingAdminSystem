package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "job_family_tb")
public class JobFamily implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "job_family_id", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "job_family_code", nullable = false)
    private String familyCode;
	
	@Column(name = "job_family_name", nullable = false)
    private String familyName;
	
	@Column(name = "job_family_description", nullable = false)
    private String familyDescription;

	public String getFamilyCode() {
		return familyCode;
	}

	public void setFamilyCode(String familyCode) {
		this.familyCode = familyCode;
	}

	public String getFamilyName() {
		return familyName;
	}

	public void setFamilyName(String familyName) {
		this.familyName = familyName;
	}

	public String getFamilyDescription() {
		return familyDescription;
	}

	public void setFamilyDescription(String familyDescription) {
		this.familyDescription = familyDescription;
	}

	public JobFamily(){
		
	}
	
	public JobFamily(String familyCode,String familyName,String familyDescription){
		this.familyCode = familyCode;
		this.familyName = familyName;
		this.familyDescription = familyDescription;
	}
	
	public String getId() {
		return id;
	}
	
	@OneToMany
	@JoinColumn(name = "job_family_id")
	@JsonIgnore
	private List<Grade> grades = new ArrayList<>();
	
	@OneToMany
	@JoinColumn(name = "job_family_id")
	@JsonIgnore
	private List<Division> divisions = new ArrayList<>();
	
	public List<Grade> getGrades() {
		return grades;
	}

	public void setGrades(List<Grade> grades) {
		this.grades = grades;
	}

	public List<Division> getDivisions() {
		return divisions;
	}

	public void setDivisions(List<Division> divisions) {
		this.divisions = divisions;
	}

	
}
