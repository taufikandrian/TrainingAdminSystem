package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mitrais.apps.trainingsystem.model.Trainer;

public interface TrainerRepository extends JpaRepository<Trainer, String>, JpaSpecificationExecutor<Trainer> {

}
