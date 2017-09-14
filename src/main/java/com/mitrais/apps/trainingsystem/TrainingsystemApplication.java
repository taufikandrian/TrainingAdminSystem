package com.mitrais.apps.trainingsystem;

import java.security.Key;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

@SpringBootApplication
public class TrainingsystemApplication {
	
	@Autowired
	UserRepository userRepo;
	
	public static void main(String[] args) {
		SpringApplication.run(TrainingsystemApplication.class, args);
	}
}
