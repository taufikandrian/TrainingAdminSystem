package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "job_family_tb")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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
	
	@JsonIgnore
	@OneToMany(mappedBy="jobFamily", fetch = FetchType.LAZY)
	private Set<Division> divisions = new HashSet<>();
	public Set<Division> getDivisions() {
		return divisions;
	}
	public void setDivisions(Set<Division> divisions) {
		this.divisions = divisions;
	}
	
	@JsonIgnore
	@OneToMany(mappedBy="jobFamily", fetch = FetchType.LAZY)
	private Set<Grade> grades = new HashSet<>();
	public Set<Grade> getGrades() {
		return grades;
	}
	public void setGrades(Set<Grade> grades) {
		this.grades = grades;
	}
}
