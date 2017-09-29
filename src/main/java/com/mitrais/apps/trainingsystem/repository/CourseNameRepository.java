package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.CourseName;

public interface CourseNameRepository extends JpaRepository<CourseName, String>, JpaSpecificationExecutor<CourseName> {
	CourseName findByCourseNameCode(String courseNameCode);
}
