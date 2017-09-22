package com.mitrais.apps.trainingsystem.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mitrais.apps.trainingsystem.classes.JsonFormatter;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

import net.minidev.json.JSONObject;

@RestController
public class UserController extends BaseController {
	
	@Autowired
	private UserRepository userRepo;
	
	//Datatables for display all users
	@PostMapping("/users/dt/all")
	public DataTablesOutput<User> getUsers(@Valid @RequestBody DataTablesInput input) {
		return userRepo.findAll(input);
	}
	
	//Dropdown of Role User
	@PostMapping("/users/getRole")
    public ResponseEntity<JSONObject> getAllRole(@RequestBody JSONObject data) {
		JsonFormatter responseJson = new JsonFormatter();
		
		String userID = (String) data.get("userID");
		
		User currentuser = this.userRepo.findById(userID.toLowerCase());
		if(currentuser != null) {
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			
			responseJson.appendToData("roles", currentuser.getRoleList());
		} else {
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Roles not found for user ID <strong>#" + userID + "</strong>");
		}
		return ResponseEntity.ok(responseJson.getJson());
	}
}