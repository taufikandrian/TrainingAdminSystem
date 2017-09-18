package com.mitrais.apps.trainingsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

@SpringBootApplication
public class TrainingsystemApplication {
	
	@Autowired
	UserRepository userRepo;
	
	public static void main(String[] args) {
		SpringApplication.run(TrainingsystemApplication.class, args);
	}
}
