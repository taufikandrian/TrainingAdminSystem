package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "training_tb")

public class Training extends Auditable<String> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "training_id", columnDefinition="uniqueidentifier")
    private String id;
    
    @Column(name = "training_name", nullable = false)
    private String trainingName;
    
	@Column(name = "training_status")
    private String trainingStatus;
    
    @Column(name = "training_description")
    private String trainingDescription;
    
    @Column(name = "training_start_date")
    private Date trainingStartDate;
    
    @Column(name = "training_end_date")
    private Date trainingEndDate;
    
	public String getTrainingName() {
		return trainingName;
	}
	
	public void setTrainingName(String trainingName) {
		this.trainingName = trainingName;
	}
	
	public String getTrainingStatus() {
		return trainingStatus;
	}
	
	public void setTrainingStatus(String trainingStatus) {
		this.trainingStatus = trainingStatus;
	}
	
	public String getTrainingDescription() {
		return trainingDescription;
	}
	
	public void setTrainingDescription(String trainingDescription) {
		this.trainingDescription = trainingDescription;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	public Date getTrainingStartDate() {
		return trainingStartDate;
	}
	public void setTrainingStartDate(Date trainingStartDate) {
		this.trainingStartDate = trainingStartDate;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	public Date getTrainingEndDate() {
		return trainingEndDate;
	}
	public void setTrainingEndDate(Date trainingEndDate) {
		this.trainingEndDate = trainingEndDate;
	}
	
	public Training() {
		
	}
	
    public Training(String trainingName,String trainingStatus,String trainingDescription,Date trainingStartDate,Date trainingEndDate) {
    	this.trainingName = trainingName;
    	this.trainingStatus = trainingStatus;
    	this.trainingDescription = trainingDescription;
    	this.trainingStartDate = trainingStartDate;
    	this.trainingEndDate = trainingEndDate;
    }
    
	public String getId() {
		return id;
	}
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="eligible_user_tb", joinColumns={@JoinColumn(name="training_id", referencedColumnName="training_id")},
	inverseJoinColumns={@JoinColumn(name="user_id", referencedColumnName="user_id")})
	private List<User> eligibleList;
	public void setEligibleList(List<User> eligibleList) {
		this.eligibleList = eligibleList;
	}

	public List<User> getEligibleList() {
		return eligibleList;
	}
}
