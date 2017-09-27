package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.repository.CrudRepository;

import com.mitrais.apps.trainingsystem.model.JobFamily;

public interface JobFamilyRepository extends CrudRepository<JobFamily, String> {
	JobFamily findByFamilyCode(String gradeCode);
}
