package com.mitrais.apps.trainingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.model.Division;
import com.mitrais.apps.trainingsystem.repository.DivisionRepository;

@RestController
public class DivisionController extends BaseController {

	@Autowired
	private DivisionRepository divisionRepo;
	
	@RequestMapping("/division/all")
    public List<Division> getAll() {
		return (List<Division>) this.divisionRepo.findAll();
	}
}
