package com.mitrais.apps.trainingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

@RestController
public class UserController extends BaseController {
	
	@Autowired
	private UserRepository userRepo;
	
	@RequestMapping("/users/all")
    public List<User> getAll() {
		return (List<User>) this.userRepo.findAll();
	}
}