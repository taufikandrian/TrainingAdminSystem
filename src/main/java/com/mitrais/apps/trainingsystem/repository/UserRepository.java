package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.datatables.repository.DataTablesRepository;
import org.springframework.data.repository.CrudRepository;

import com.mitrais.apps.trainingsystem.model.User;

public interface UserRepository extends DataTablesRepository<User, String> {
    User findByFullName(String name);
    User findByAccountName(String accountName);
    User findByPassword(String password);
    User findById(String id);
}
