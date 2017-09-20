package com.mitrais.apps.trainingsystem.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

@RestController
public class UserDTController extends BaseController {
	
	@Autowired
	private UserRepository userRepo;
	
	@PostMapping("/data/users")
	public DataTablesOutput<User> getUsers(@Valid @RequestBody DataTablesInput input) {
		return userRepo.findAll(input);
	}

}
