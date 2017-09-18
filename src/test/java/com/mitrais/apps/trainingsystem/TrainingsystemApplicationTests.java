package com.mitrais.apps.trainingsystem;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mitrais.apps.trainingsystem.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrainingsystemApplicationTests {

	@Autowired
	private UserRepository userRepo;
	@Test
	public void contextLoads() {
		System.out.println(userRepo.findAll());
	}

}
