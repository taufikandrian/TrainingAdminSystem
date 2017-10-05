package com.mitrais.apps.trainingsystem.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.TrainingCourse;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.model.UserCourse;

public interface UserCourseRepository extends JpaRepository<UserCourse, String>, JpaSpecificationExecutor<UserCourse> {
	Set<User> findByTrainingCourse(TrainingCourse course);
	UserCourse findByTrainingCourseAndUser(TrainingCourse course,User user);
}
 