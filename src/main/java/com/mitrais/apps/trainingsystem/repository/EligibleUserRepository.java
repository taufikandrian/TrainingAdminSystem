package com.mitrais.apps.trainingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.datatables.repository.DataTablesRepository;

import com.mitrais.apps.trainingsystem.model.EligibleUser;

public interface EligibleUserRepository extends DataTablesRepository<EligibleUser, String> {
	List<EligibleUser> findByTrainingTrainID(String trainingTrainID);
}
