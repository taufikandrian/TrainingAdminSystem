package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

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
}
