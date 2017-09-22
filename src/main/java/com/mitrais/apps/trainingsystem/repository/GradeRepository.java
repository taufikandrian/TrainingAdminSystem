package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.repository.CrudRepository;

import com.mitrais.apps.trainingsystem.model.Grade;

public interface GradeRepository extends CrudRepository<Grade, String> {
	Grade findById(String id);
	Grade findByGradeCode(String gradeCode);
}
