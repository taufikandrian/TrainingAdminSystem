package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "trainer_tb")
public class Trainer extends Auditable<String> implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "trainer_id", columnDefinition="uniqueidentifier")
    private String id;

	@Column(name = "trainer_status", nullable = false)
    private String trainerStatus;
	
	public String getTrainerStatus() {
		return trainerStatus;
	}

	public void setTrainerStatus(String trainerStatus) {
		this.trainerStatus = trainerStatus;
	}

	public String getId() {
		return id;
	}
	
	public Trainer(){
		
	}
}
