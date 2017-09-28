package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.Training;
import com.mitrais.apps.trainingsystem.model.TrainingCourse;

public interface ScheduleRepository extends JpaRepository<TrainingCourse, String>, JpaSpecificationExecutor<Training> {
	TrainingCourse findByTrainingId(String trainingId);
}
