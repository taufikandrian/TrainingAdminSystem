package com.mitrais.apps.trainingsystem.controller;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.mitrais.apps.trainingsystem.classes.JsonFormatter;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

@RestController
public class LoginController extends BaseController<User> {
	
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	private boolean checkPassword(String originPassword, String encodedPassword) {
		return this.passwordEncoder.matches(originPassword, encodedPassword);
	}
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/")
	private String apiBase() {
		return "API Works";
	}
	
	@PostMapping("/auth")
	public ResponseEntity<JSONObject> getAccess(@RequestBody JSONObject data) {
		String username = (String) data.get("username");
		String password = (String) data.get("password");
		JsonFormatter responseJson = new JsonFormatter();
		User tryUser = new User();
		tryUser = this.userRepo.findByAccountName(username);
		if(tryUser != null && this.checkPassword(password, tryUser.getPassword())) {
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.setMessage("Login succsesfully!");
			
			responseJson.appendToData("user", tryUser);
			responseJson.appendToData("roles", tryUser.getRoleList());
		} else {
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Username and password does not match in our database");
			
			responseJson.appendToData("username", username);
		}
		return ResponseEntity.ok(responseJson.getJson());
	}
}
