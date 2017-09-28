package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.Training;

public interface TrainingRepository extends JpaRepository<Training, String>, JpaSpecificationExecutor<Training> {
	Training findById(String id);
	Training findByTrainingName(String trainingName);
}
