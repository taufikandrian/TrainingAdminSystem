package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.UserCourseDetail;
 
public interface UserCourseDetailRepository extends JpaRepository<UserCourseDetail, String>, JpaSpecificationExecutor<UserCourseDetail> {

}
