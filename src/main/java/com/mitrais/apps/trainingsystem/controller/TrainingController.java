package com.mitrais.apps.trainingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.model.Training;
import com.mitrais.apps.trainingsystem.repository.TrainingRepository;

@RestController
public class TrainingController extends BaseController {
	
	@Autowired
	private TrainingRepository trainRepo;
	
	@RequestMapping("/training/all")
	public List<Training> getAll() {
		return (List<Training>) this.trainRepo.findAll();
	}
	@PostMapping("/training/create")
	public void add(@RequestBody Training train){
		Training training = trainRepo.findOne(train.getId());
		training.setTrainingName(train.getTrainingName());
		training.setTrainingStatus("active");
		training.setTrainingStartDate(train.getTrainingStartDate());
		training.setTrainingEndDate(train.getTrainingEndDate());
		trainRepo.save(training);
	}
	@PostMapping("/training/update")
	public void update(@RequestBody Training train){
		Training training = trainRepo.findOne(train.getId());
		training.setTrainingStatus("active");
		trainRepo.save(training);
	}
	
	@GetMapping("/training/delete")
	public void delete(@RequestParam ("id") String trainId){
		trainRepo.delete(trainId);
	}
}
