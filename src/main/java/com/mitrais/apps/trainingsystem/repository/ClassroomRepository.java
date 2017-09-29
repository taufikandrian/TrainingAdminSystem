package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.CourseClassroom;

public interface ClassroomRepository extends JpaRepository<CourseClassroom, String>, JpaSpecificationExecutor<CourseClassroom> {
	CourseClassroom findByCourseClassroomCode(String courseClassroomCode);
}
