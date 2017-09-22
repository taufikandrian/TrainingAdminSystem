package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.repository.CrudRepository;

import com.mitrais.apps.trainingsystem.model.Division;

public interface DivisionRepository extends CrudRepository<Division, String> {
	Division findById(String id);
	Division findByDivisionCode(String divisionCode);
}
