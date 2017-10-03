package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.CourseType;

public interface CourseTypeRepository extends JpaRepository<CourseType, String>, JpaSpecificationExecutor<CourseType> {
	CourseType findById(String id);
}

