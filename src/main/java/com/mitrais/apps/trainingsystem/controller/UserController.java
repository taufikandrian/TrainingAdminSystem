package com.mitrais.apps.trainingsystem.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mitrais.apps.trainingsystem.classes.JsonFormatter;
import com.mitrais.apps.trainingsystem.model.Role;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.DivisionRepository;
import com.mitrais.apps.trainingsystem.repository.GradeRepository;
import com.mitrais.apps.trainingsystem.repository.RoleRepository;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

import net.minidev.json.JSONObject;

@RestController
public class UserController extends BaseController {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private DivisionRepository divRepo;
	
	@Autowired
	private GradeRepository gradeRepo;
	
	@Autowired
	private RoleRepository rolesRepo;
	
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
	
	//create user feature
	@PostMapping("/users/create")
	public ResponseEntity<JSONObject> add(@RequestBody User user){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			List<Role> listRole = new ArrayList<Role>();
			for(int i = 0; i < user.roles.size();i++){
				listRole.add(rolesRepo.findByRoleCode(user.roles.get(i)));
			}
			user.setDivision(divRepo.findByDivisionCode(user.division_id));
			user.setGrade(gradeRepo.findByGradeCode(user.grade_id));
			user.setRoleList(listRole);
			responseJson.appendToData("User_Created", user);
			userRepo.save(user);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Created Data Cannot be Completed");
			responseJson.appendToData("UserFailedCreate", ex.getMessage());
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	//DELETE USER FEATURE
	@PostMapping("/users/delete")
	public ResponseEntity<JSONObject> deleteData(@RequestBody JSONObject user){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			List<User> userTmp = new ArrayList<User>();
			@SuppressWarnings("unchecked")
			List<String> userID = (List<String>) user.get("userID");
			for(int i = 0; i < userID.size();i++){
				User currentuser = this.userRepo.findById(userID.get(i).toLowerCase());
				if(currentuser != null) {
					currentuser.setStatus("deleted");
					userRepo.save(currentuser);
					//responseJson.appendToData("User_Deleted", currentuser);
					userTmp.add(currentuser);
				}
			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("User_Deleted", userTmp);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Deleted Data Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	//get data for update feature
	@GetMapping("/users/update/{accountName}")
	public ResponseEntity<JSONObject> updateGetData(@PathVariable String accountName){
		JsonFormatter responseJson = new JsonFormatter();
		User userTmp = userRepo.findByAccountName(accountName);
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_User", userTmp);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Updated Data Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	//post data for update feature
	@PostMapping("/users/update/{accountName}")
	public ResponseEntity<JSONObject> updatePostData(@RequestBody User user,@PathVariable String accountName){
		JsonFormatter responseJson = new JsonFormatter();
		User userTmp = userRepo.findByAccountName(accountName);
		try{
			userTmp.setStatus(user.getStatus());
			userRepo.save(userTmp);
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Update_User", userTmp);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.appendToData("UpdateFail", ex);
			responseJson.setMessage("Updated Data Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}

	}
}