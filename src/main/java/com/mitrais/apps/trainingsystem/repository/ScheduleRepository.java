package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.TrainingCourse;

public interface ScheduleRepository extends JpaRepository<TrainingCourse, String>, JpaSpecificationExecutor<TrainingCourse> {
	TrainingCourse findById(String id);
}
