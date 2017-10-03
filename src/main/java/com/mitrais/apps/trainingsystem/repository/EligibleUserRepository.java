package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.EligibleUser;

public interface EligibleUserRepository extends JpaRepository<EligibleUser, String>, JpaSpecificationExecutor<EligibleUser> {
	EligibleUser findByUserIDEligible(String userIDEligible);
	EligibleUser findByUserIDEligibleAndTrainingIDEligible(String userIDEligible,String trainingIDEligible);
}
