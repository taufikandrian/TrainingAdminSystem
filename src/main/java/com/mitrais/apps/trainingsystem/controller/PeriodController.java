package com.mitrais.apps.trainingsystem.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
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
public class PeriodController extends BaseController {
	
	@Autowired
	private TrainingRepository trainRepo;
	
	@Autowired
	private EligibleUserRepository eligibleUserRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	
	@PostMapping("/training/dt/all")
	public DataTablesOutput<Training> getTrains(@Valid @RequestBody DataTablesInput input) {
		return trainRepo.findAll(input);
	}
	
	@PostMapping("/training/getEligibleUser")
	public ResponseEntity<JSONObject> getEligibleUser(@RequestBody JSONObject data) {
		JsonFormatter responseJson = new JsonFormatter();
		List<User> userEligible = new ArrayList<User>();
		try{
			String trainingID = (String) data.get("trainingID");
			List<EligibleUser> currentuser = this.eligibleUserRepo.findByTrainingTrainID(trainingID.toLowerCase());
			for(int i = 0; i < currentuser.size();i++){
				userEligible.add(userRepo.findById(currentuser.get(i).getTrainingUserID()));
			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("user", userEligible);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Eligible User Cannot be Displayed");
			responseJson.appendToData("EligibleUser", ex.getMessage());
			//responseJson.setMessage("Roles not found for user ID <strong>#" + userID + "</strong>");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	//create training feature
	@PostMapping("/training/create")
	public ResponseEntity<JSONObject> add(@RequestBody Training training){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			training.setTrainingName(training.getTrainingName());
			training.setTrainingStatus(training.getTrainingStatus());
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
//			List<User> usrEligible = new ArrayList<User>(); //(eligibleList feature show)
			@SuppressWarnings("unchecked")
			List<String> trainingID = (List<String>) training.get("trainingID");
			for(int i = 0; i < trainingID.size();i++){
				Training currenttraining = this.trainRepo.findById(trainingID.get(i).toLowerCase());
//				List<EligibleUser> userEligible = eligibleUserRepo.findByTrainingTrainID(trainingID.get(i).toLowerCase()); //(eligibleList feature show)
//				System.out.println(userEligible); //(eligibleList feature show)
//				for(int j = 0; j < userEligible.size(); j++){ //(eligibleList feature show)
//					User eligibleUsr = userRepo.findById(userEligible.get(j).getTrainingUserID()); //(eligibleList feature show)
//					usrEligible.add(eligibleUsr); //(eligibleList feature show)
//				} //(eligibleList feature show)
				if(currenttraining != null) {
					currenttraining.setTrainingStatus("Inactive");
//					currenttraining.setEligibleList(usrEligible); //(eligibleList feature show)
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
	
	//post data for update feature
	@PostMapping("/training/update/{id}")
	public ResponseEntity<JSONObject> updatePostData(@RequestBody Training training,@PathVariable String id){
		JsonFormatter responseJson = new JsonFormatter();
		Training trainTmp = trainRepo.findById(id);
		try{
			trainTmp.setTrainingName(training.getTrainingName());
			trainTmp.setTrainingStatus(training.getTrainingStatus());
			trainTmp.setTrainingDescription(training.getTrainingDescription());
			trainRepo.save(trainTmp);
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Update_Training", trainTmp);
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
