package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "division_tb")
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

	public Division(String divisionCode, String divisionName, String divisionDescription){
		this.divisionCode = divisionCode;
		this.divisionName = divisionName;
		this.divisionDescription = divisionDescription;
	}

	public String getId() {
		return id;
	}
}
