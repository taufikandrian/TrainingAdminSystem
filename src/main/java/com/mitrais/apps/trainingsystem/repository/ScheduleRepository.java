package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.datatables.repository.DataTablesRepository;

import com.mitrais.apps.trainingsystem.model.TrainingCourse;

public interface ScheduleRepository extends DataTablesRepository<TrainingCourse, String> {
	TrainingCourse findByTrainingId(String trainingId);
}
