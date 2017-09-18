package com.mitrais.apps.trainingsystem.controller;

import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

@RestController
public class LoginController extends BaseController {

	@Autowired
	private UserRepository userRepo;
	
	@PostMapping("/auth")
    public ResponseEntity getAccess(@RequestParam("fuser") String accountName,@RequestParam("fpass") String password){
		JSONObject json = new JSONObject();
		JSONObject jsonData = new JSONObject();
		JSONObject jsonUser = new JSONObject();
		User cekUserName = new User();
		//User CekPassword = new User();
		cekUserName = this.userRepo.findByAccountName(accountName);
		if(cekUserName != null  && cekUserName.getPassword() != password) {
			jsonData.put("user", cekUserName);
			json.put("status", "success");
			json.put("code", "200");
			json.put("data", jsonData);
		} else {
			jsonUser.put("username", accountName);
			jsonData.put("message", "Username and password does not match in our database");
			jsonData.put("user", jsonUser);
			json.put("status", "failed");
			json.put("code", "404");
			json.put("data", jsonData);
		}
		return ResponseEntity.ok(json);
	}
}
