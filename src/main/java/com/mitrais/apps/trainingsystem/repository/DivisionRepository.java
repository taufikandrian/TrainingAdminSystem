package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.Division;
import com.mitrais.apps.trainingsystem.model.Training;

public interface DivisionRepository extends JpaRepository<Division, String>, JpaSpecificationExecutor<Training> {
	Division findById(String id);
	Division findByDivisionCode(String divisionCode);
}
