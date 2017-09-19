package com.mitrais.apps.trainingsystem.repository;

import org.springframework.data.repository.CrudRepository;

import com.mitrais.apps.trainingsystem.model.Training;

public interface TrainingRepository extends CrudRepository<Training, String> {

}
