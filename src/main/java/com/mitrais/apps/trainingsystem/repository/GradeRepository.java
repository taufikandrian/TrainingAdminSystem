package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.Grade;
import com.mitrais.apps.trainingsystem.model.Training;

public interface GradeRepository extends JpaRepository<Grade, String>, JpaSpecificationExecutor<Training> {
	Grade findById(String id);
	Grade findByGradeCode(String gradeCode);
}
