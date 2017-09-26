package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.datatables.repository.DataTablesRepository;

import com.mitrais.apps.trainingsystem.model.Training;

public interface TrainingRepository extends DataTablesRepository<Training, String> {
	Training findById(String id);
	Training findByTrainingName(String trainingName);
}
