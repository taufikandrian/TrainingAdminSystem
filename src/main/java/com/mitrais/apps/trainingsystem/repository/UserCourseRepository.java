package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.UserCourse;

public interface UserCourseRepository extends JpaRepository<UserCourse, String>, JpaSpecificationExecutor<UserCourse> {

}
 