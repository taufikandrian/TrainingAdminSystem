package com.mitrais.apps.trainingsystem.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.model.TrainingCourse;
import com.mitrais.apps.trainingsystem.repository.ScheduleRepository;

@RestController
public class ScheduleController extends BaseController<TrainingCourse> {

	
	@Autowired
	private ScheduleRepository schRepo;
	
	@PostMapping("/schedule/dt/all/{trainingId}")
	public DataTablesOutput<TrainingCourse> getTrainsCourse(@Valid @RequestBody DataTablesInput input,@PathVariable String trainingId) {
		System.out.println(trainingId);
		return schRepo.findAll(input,trainCourseTraining(trainingId));
	}
}
