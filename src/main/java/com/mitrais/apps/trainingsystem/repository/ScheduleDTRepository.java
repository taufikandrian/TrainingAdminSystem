package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.TrainingCourseDT;

public interface ScheduleDTRepository extends JpaRepository<TrainingCourseDT, String>, JpaSpecificationExecutor<TrainingCourseDT> {
	TrainingCourseDT findById(String id);
}
