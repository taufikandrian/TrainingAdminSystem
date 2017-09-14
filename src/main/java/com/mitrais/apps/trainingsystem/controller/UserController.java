package com.mitrais.apps.trainingsystem.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

@RestController
@RequestMapping("/api/users/")
public class UserController {
	
	@Autowired
	private UserRepository userRepo;
	
	@GetMapping(value="all",produces="application/json")
    @ResponseBody
    public Map<String, String> show() {
           ObjectMapper mapper = new ObjectMapper();
           String jsonInString = null;
           
           try {
                  jsonInString = mapper.writeValueAsString(userRepo.findAll());
           } catch (JsonProcessingException e) {
                  e.printStackTrace();
           }
           
           //Create Response
           Map<String, String> response = new HashMap<>();
           
           response.put("status", "true");
           response.put("message", jsonInString);
           
     return response;
    }
}