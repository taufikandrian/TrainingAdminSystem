package com.mitrais.apps.trainingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.TrainingCourse;
import com.mitrais.apps.trainingsystem.model.UserCourse;
import com.mitrais.apps.trainingsystem.model.UserCourseDetail;
 
public interface UserCourseDetailRepository extends JpaRepository<UserCourseDetail, String>, JpaSpecificationExecutor<UserCourseDetail> {
	List<UserCourseDetail> findByUserCourseID(UserCourse userCourse);
}
