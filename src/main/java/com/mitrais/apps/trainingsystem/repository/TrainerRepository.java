package com.mitrais.apps.trainingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.Trainer;

public interface TrainerRepository extends JpaRepository<Trainer, String>, JpaSpecificationExecutor<Trainer> {
	List<Trainer> findByTrainingCourseId(String trainingCourseId);
	Trainer findById(String id);
}
