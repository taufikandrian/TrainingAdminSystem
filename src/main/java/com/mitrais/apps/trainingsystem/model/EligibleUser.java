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
public class EligibleUser extends Auditable<String> implements Serializable {

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
    private String userIDEligible;
    
	@Column(name = "training_id")
    private String trainingIDEligible;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserIDEligible() {
		return userIDEligible;
	}

	public void setUserIDEligible(String userIDEligible) {
		this.userIDEligible = userIDEligible;
	}

	public String getTrainingIDEligible() {
		return trainingIDEligible;
	}

	public void setTrainingIDEligible(String trainingIDEligible) {
		this.trainingIDEligible = trainingIDEligible;
	}
	public EligibleUser() {
		
	}
	public EligibleUser(String id,String userIDEligible,String trainingIDEligible) {
		this.id = id;
		this.userIDEligible = userIDEligible;
		this.trainingIDEligible = trainingIDEligible;
	}

}
