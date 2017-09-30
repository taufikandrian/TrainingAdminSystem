package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.JobFamily;
import com.mitrais.apps.trainingsystem.model.Training;

public interface JobFamilyRepository extends JpaRepository<JobFamily, String>, JpaSpecificationExecutor<Training> {
	JobFamily findById(String id);
	JobFamily findByFamilyCode(String gradeCode);
}
