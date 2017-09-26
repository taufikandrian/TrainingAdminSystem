package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "eligible_user_tb")
public class EligibleUser implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "eligible_user_id", columnDefinition="uniqueidentifier")
    private String id;

	@Column(name = "user_id", nullable = false)
    private String trainingUserID;
    
	@Column(name = "training_id")
    private String trainingTrainID;

	public String getId() {
		return id;
	}

	public String getTrainingUserID() {
		return trainingUserID;
	}

	public String getTrainingTrainID() {
		return trainingTrainID;
	}
	
	public EligibleUser(){
		
	}
}
