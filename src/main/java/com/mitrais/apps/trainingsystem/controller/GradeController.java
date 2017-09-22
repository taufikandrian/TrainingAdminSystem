package com.mitrais.apps.trainingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.model.Grade;
import com.mitrais.apps.trainingsystem.repository.GradeRepository;

@RestController
public class GradeController extends BaseController {

	@Autowired
	private GradeRepository gradeRepo;
	
	@RequestMapping("/grade/all")
    public List<Grade> getAll() {
		return (List<Grade>) this.gradeRepo.findAll();
	}
}
