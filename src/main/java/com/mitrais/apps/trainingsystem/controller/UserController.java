package com.mitrais.apps.trainingsystem.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.Search;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mitrais.apps.trainingsystem.classes.JsonFormatter;
import com.mitrais.apps.trainingsystem.model.JobFamily;
import com.mitrais.apps.trainingsystem.model.Role;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.DivisionRepository;
import com.mitrais.apps.trainingsystem.repository.GradeRepository;
import com.mitrais.apps.trainingsystem.repository.JobFamilyRepository;
import com.mitrais.apps.trainingsystem.repository.RoleRepository;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

import net.minidev.json.JSONObject;

@RestController
public class UserController extends BaseController<User> {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private DivisionRepository divRepo;
	
	@Autowired
	private GradeRepository gradeRepo;
	
	@Autowired
	private RoleRepository rolesRepo;
	
	@Autowired
	private JobFamilyRepository jobfamRepo;
	
	@GetMapping(value="/tes/tes")
	public User getusertes() {
		return userRepo.findById("d23ba945-c606-4a39-aa1e-bff96502b366");
	}
	// Datatables training Users
	@PostMapping(value="/users/dt/all")
    public ResponseEntity<JSONObject> getPeriodList(@Valid @RequestBody DataTablesInput input) {
           JSONObject response = new JSONObject();
           List<Column> columns = input.getColumns();
           
           //SORT
           List<Sort.Order> orders = new ArrayList<>();
           for (org.springframework.data.jpa.datatables.mapping.Order item : input.getOrder()) {
                  String c = columns.get(item.getColumn()).getData();
                  if(item.getDir().equals("asc"))
                        orders.add(new Sort.Order(Direction.ASC, c));
                  else
                        orders.add(new Sort.Order(Direction.DESC, c));
           }
           Search s = new Search();
           Column c = new Column();
           
           //WHERE status
           s.setValue("Deleted");
           c.setData("status");c.setSearch(s);
           
           //JOIN
//           s.setValue("AD");
//           c.setData("join.roleList.roleCode");c.setSearch(s);
           
           columns.add(c);
          
           Sort sort = new Sort(orders);
           Integer pageNumber = (int) Math.ceil(input.getStart() / input.getLength());
           PageRequest page = new PageRequest(pageNumber,input.getLength(), sort);
           Page<User> data = userRepo.findAll(DataTable(columns), page);
           response.put("draw", input.getDraw());
           response.put("recordsTotal", userRepo.findAll(notDeleted()).size());
           response.put("recordsFiltered", data.getTotalElements());
           response.put("data", data.getContent());
           return ResponseEntity.ok(response);
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
			Set<Role> listRole = new HashSet<>();
			for(int i = 0; i < user.roles.size();i++){
				listRole.add(rolesRepo.findByRoleCode(user.roles.get(i)));
			}
			user.setStatus("Active");
			user.setDivision(divRepo.findByDivisionCode(user.division_id));
			user.setGrade(gradeRepo.findByGradeCode(user.grade_id));
			user.setRoleList(listRole);
			userRepo.save(user);
			responseJson.appendToData("User_Created", user);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Created Data Cannot be Completed");
			responseJson.appendToData("UserFailedCreate", ex);
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	@GetMapping("/users/checkUsername/{newAccountName}")
	public ResponseEntity<JSONObject> checkUsername(@PathVariable String newAccountName){
		JsonFormatter responseJson = new JsonFormatter();
		User userTmp = userRepo.findByAccountName(newAccountName);
		if(userTmp == null){
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.setMessage("Username is available");
			return ResponseEntity.ok(responseJson.getJson());
		}
		else {
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Username with " + newAccountName + " is already exist");
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
					currentuser.setStatus("Deleted");
					currentuser.setDeletedBy(user.getAsString("actionBy"));
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
	@GetMapping("/users/update/{userid}")
	public ResponseEntity<JSONObject> updateGetData(@PathVariable String userid){
		JsonFormatter responseJson = new JsonFormatter();
		User userTmp = userRepo.findById(userid);
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
	@PostMapping("/users/update/{userid}")
	public ResponseEntity<JSONObject> updatePostData(@RequestBody User user,@PathVariable String userid){
		JsonFormatter responseJson = new JsonFormatter();
		User userTmp = userRepo.findById(userid);
		Set<Role> listRole = new HashSet<Role>();
		try{
			for(int i = 0; i < user.roles.size();i++){
				listRole.add(rolesRepo.findByRoleCode(user.roles.get(i)));
			}
			userTmp.setStatus(user.getStatus());
			userTmp.setRoleList(listRole);
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
	
	@GetMapping("/jobfam/all")
    public ResponseEntity<JSONObject> getAllJobFam() {
		JsonFormatter responseJson = new JsonFormatter();
		List<JobFamily> gradeList = (List<JobFamily>) jobfamRepo.findAll();
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_JobFam", gradeList);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Job Family Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	@GetMapping("/role/all")
    public ResponseEntity<JSONObject> getAllRole() {
		JsonFormatter responseJson = new JsonFormatter();
		List<Role> gradeList = (List<Role>) rolesRepo.findAll();
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Role", gradeList);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Role Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
}