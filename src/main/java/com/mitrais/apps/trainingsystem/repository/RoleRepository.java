package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.Role;
import com.mitrais.apps.trainingsystem.model.Training;

public interface RoleRepository extends JpaRepository<Role, String>, JpaSpecificationExecutor<Training> {
	Role findById(String id);
	Role findByRoleCode(String roleCode);
}
