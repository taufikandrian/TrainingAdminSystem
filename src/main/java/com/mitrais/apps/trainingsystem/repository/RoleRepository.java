package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.repository.CrudRepository;

import com.mitrais.apps.trainingsystem.model.Role;

public interface RoleRepository extends CrudRepository<Role, String> {
	Role findById(String id);
	Role findByRoleCode(String roleCode);
}
