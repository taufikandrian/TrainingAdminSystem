package com.mitrais.apps.trainingsystem.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.Search;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.classes.JsonFormatter;
import com.mitrais.apps.trainingsystem.model.EligibleUser;
import com.mitrais.apps.trainingsystem.model.Training;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.EligibleUserRepository;
import com.mitrais.apps.trainingsystem.repository.TrainingRepository;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

@RestController
public class PeriodController extends BaseController<Training> {
	
	@Autowired
	private TrainingRepository trainRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private EligibleUserRepository eligibleRepo;
	
	// Datatables training	
	@PostMapping(value="/training/dt/all")
    public ResponseEntity<JSONObject> getTrains(@Valid @RequestBody DataTablesInput input) {
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
           
           s.setValue("Deleted");
           c.setData("status");c.setSearch(s);
           columns.add(c);
          
           Sort sort = new Sort(orders);
           Integer pageNumber = (int) Math.ceil(input.getStart() / input.getLength());
           PageRequest page = new PageRequest(pageNumber,input.getLength(), sort);
           Page<Training> data = trainRepo.findAll(DataTable(columns), page);
           response.put("draw", input.getDraw());
           response.put("recordsTotal", trainRepo.findAll(DataTable(columns)).size());
           response.put("recordsFiltered", data.getTotalElements());
           response.put("data", data.getContent());
           return ResponseEntity.ok(response);
    }
	
	// get eligible participant from IDTraining
//	@PostMapping("/training/getEligibleUser")
//	public ResponseEntity<JSONObject> getEligibleUser(@RequestBody JSONObject data) {
//		JsonFormatter responseJson = new JsonFormatter();
//		try{
//			String trainingID = (String) data.get("trainingID");
//			Training trainCoba = trainRepo.findById(trainingID.toLowerCase());
//			Set<User> userEligible = trainCoba.getEligibleList();
//			responseJson.setConfirmed(true);
//			responseJson.setStatus("success");
//			responseJson.setCode("200");
//			responseJson.appendToData("Training", trainCoba);
//			responseJson.appendToData("UserEligible", userEligible);
//			return ResponseEntity.ok(responseJson.getJson());
//		}
//		catch(Exception ex){
//			responseJson.setConfirmed(false);
//			responseJson.setStatus("failed");
//			responseJson.setCode("200");
//			responseJson.setMessage("Eligible User Cannot be Displayed");
//			responseJson.appendToData("EligibleUser", ex.getMessage());
//			return ResponseEntity.ok(responseJson.getJson());
//		}
//	}
	
	//get data for update feature
//	@GetMapping("/training/addEligibleList")
//	public ResponseEntity<JSONObject> ListofEligibleParticipant(){
//		JsonFormatter responseJson = new JsonFormatter();
//		List<User> userTmp = userRepo.findAll();
//		try{
//			responseJson.setConfirmed(true);
//			responseJson.setStatus("success");
//			responseJson.setCode("200");
//			responseJson.appendToData("Get_EligibleUser", userTmp);
//			return ResponseEntity.ok(responseJson.getJson());
//		}
//		catch(Exception ex){
//			responseJson.setConfirmed(false);
//			responseJson.setStatus("failed");
//			responseJson.setCode("200");
//			responseJson.setMessage("Updated Training Cannot be Completed");
//			return ResponseEntity.ok(responseJson.getJson());
//		}
//	}
	
	@PostMapping("/training/addEligibleList/{id}")
	public ResponseEntity<JSONObject> AddEligibleData(@RequestBody JSONObject user,@PathVariable String id){
		JsonFormatter responseJson = new JsonFormatter();
		try {
			Set<User> userTmp = new HashSet<>();
			Training trainTmp = this.trainRepo.findById(id);
			@SuppressWarnings("unchecked")
			List<String> userID = (List<String>) user.get("userID");
			for(int i = 0; i < userID.size();i++){
				User currentuser = this.userRepo.findById(userID.get(i).toLowerCase());
				if(currentuser != null) {
					userTmp.add(currentuser);
					trainTmp.getEligibleList().add(currentuser);
				}
			}
			//trainTmp.setEligibleList(userTmp);
			trainRepo.save(trainTmp);
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Added_EligibleUser", userTmp);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Add Eligible Data Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	@PostMapping("/training/deleteEligibleList/{id}")
	public ResponseEntity<JSONObject> DeleteEligibleData(@RequestBody JSONObject user,@PathVariable String id){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			List<EligibleUser> listOfEligible = new ArrayList<EligibleUser>();
			@SuppressWarnings("unchecked")
			List<String> userID = (List<String>) user.get("userID");
			for(int i = 0; i < userID.size();i++){
				EligibleUser eligibleTmp = this.eligibleRepo.findByUserIDEligibleAndTrainingIDEligible(userID.get(i).toLowerCase(),id);
				listOfEligible.add(eligibleTmp);
				eligibleRepo.delete(eligibleTmp);
			}
			Training curTrain = this.trainRepo.findById(id);
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Training_EligibleParticipants", curTrain.getEligibleList());
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Deleted Data Cannot be Completed");
			responseJson.appendToData("EligibleUserFailedDeleted", ex.getMessage());
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	// create training feature
	@PostMapping("/training/create")
	public ResponseEntity<JSONObject> add(@RequestBody Training training){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			training.setTrainingName(training.getTrainingName());
			training.setStatus(training.getStatus());
			training.setTrainingDescription(training.getTrainingDescription());
			training.setTrainingStartDate(training.getTrainingStartDate());
			training.setTrainingEndDate(training.getTrainingEndDate());
			System.out.println("masuk");
			responseJson.appendToData("Training_Created", training);
			trainRepo.save(training);
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
	//DELETE TRAINING FEATURE
	@PostMapping("/training/delete")
	public ResponseEntity<JSONObject> deleteData(@RequestBody JSONObject training){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			List<Training> trainTmp = new ArrayList<Training>();
			@SuppressWarnings("unchecked")
			List<String> trainingID = (List<String>) training.get("trainingID");
			for(int i = 0; i < trainingID.size();i++){
				Training currenttraining = this.trainRepo.findById(trainingID.get(i).toLowerCase());
				if(currenttraining != null) {
					currenttraining.setStatus("Deleted");
					currenttraining.setDeletedBy(training.getAsString("actionBy"));
					trainRepo.save(currenttraining);
					trainTmp.add(currenttraining);
				}
			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Training_Deleted", trainTmp);
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
	@GetMapping("/training/update/{id}")
	public ResponseEntity<JSONObject> updateGetData(@PathVariable String id){
		JsonFormatter responseJson = new JsonFormatter();
		Training trainTmp = trainRepo.findById(id);
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Training", trainTmp);
			responseJson.appendToData("Get_Training_EligibleParticipants", trainTmp.getEligibleList());
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Updated Training Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	//get data detail training
//	@GetMapping("/training/TrainingDetail/{id}")
//	public ResponseEntity<JSONObject> getDetailTraining(@PathVariable String id){
//		JsonFormatter responseJson = new JsonFormatter();
//		Training trainTmp = trainRepo.findById(id);
//		try{
//			responseJson.setConfirmed(true);
//			responseJson.setStatus("success");
//			responseJson.setCode("200");
//			responseJson.appendToData("Get_Training", trainTmp);
//			return ResponseEntity.ok(responseJson.getJson());
//		}
//		catch(Exception ex){
//			responseJson.setConfirmed(false);
//			responseJson.setStatus("failed");
//			responseJson.setCode("200");
//			responseJson.setMessage("Updated Training Cannot be Completed");
//			return ResponseEntity.ok(responseJson.getJson());
//		}
//	}
	
	//post data for update feature
	@PostMapping("/training/update/{id}")
	public ResponseEntity<JSONObject> updatePostData(@RequestBody Training training,@PathVariable String id){
		JsonFormatter responseJson = new JsonFormatter();
		Training trainTmp = trainRepo.findById(id);
		try{
			trainTmp.setTrainingName(training.getTrainingName());
			trainTmp.setStatus(training.getStatus());
			trainTmp.setTrainingDescription(training.getTrainingDescription());
			trainTmp.setIsOpen(training.getIsOpen());
			trainTmp.setLastModifiedBy(training.getLastModifiedBy());
			trainRepo.save(trainTmp);
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Update_Training", trainTmp);
			responseJson.appendToData("Update_Training_EligibleParticipants", trainTmp.getEligibleList());
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.appendToData("UpdateFail", ex);
			responseJson.setMessage("Updated Training Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}

	}
}
