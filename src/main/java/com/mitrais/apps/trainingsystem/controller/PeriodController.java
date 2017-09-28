package com.mitrais.apps.trainingsystem.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.classes.JsonFormatter;
import com.mitrais.apps.trainingsystem.model.Training;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.TrainingRepository;

@RestController
public class PeriodController extends BaseController<Training> {
	
	@Autowired
	private TrainingRepository trainRepo;
	
	// Datatables training	
	@PostMapping(value="/training/dt/all")
    public ResponseEntity<JSONObject> getTrains(@Valid @RequestBody DataTablesInput input) {
           JSONObject response = new JSONObject();
           
           //SORT
           List<Sort.Order> orders = new ArrayList<>();
           List<Column> columns = input.getColumns();
           for (org.springframework.data.jpa.datatables.mapping.Order item : input.getOrder()) {
                  String c = columns.get(item.getColumn()).getData();
                  if(item.getDir().equals("asc"))
                        orders.add(new Sort.Order(Direction.ASC, c));
                  else
                        orders.add(new Sort.Order(Direction.DESC, c));
           }
          
           Sort s = new Sort(orders);
           PageRequest page = new PageRequest(input.getStart(),input.getStart()+input.getLength(),s);
           Page<Training> data = trainRepo.findAll(DataTable(columns), page);
           response.put("draw", input.getDraw());
           response.put("recordsTotal", trainRepo.findAll(notDeleted()).size());
           response.put("recordsFiltered", data.getTotalElements());
           response.put("data", data.getContent());
           return ResponseEntity.ok(response);
    }
	
	// get eligible participant from IDTraining
	@PostMapping("/training/getEligibleUser")
	public ResponseEntity<JSONObject> getEligibleUser(@RequestBody JSONObject data) {
		JsonFormatter responseJson = new JsonFormatter();
		try{
			String trainingID = (String) data.get("trainingID");
			Training trainCoba = trainRepo.findById(trainingID.toLowerCase());
			List<User> userEligible = trainCoba.getEligibleList();
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Training", trainCoba);
			responseJson.appendToData("UserEligible", userEligible);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Eligible User Cannot be Displayed");
			responseJson.appendToData("EligibleUser", ex.getMessage());
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
			@SuppressWarnings("unchecked")
			List<String> trainingID = (List<String>) training.get("trainingID");
			for(int i = 0; i < trainingID.size();i++){
				Training currenttraining = this.trainRepo.findById(trainingID.get(i).toLowerCase());
				if(currenttraining != null) {
					currenttraining.setTrainingStatus("Inactive");
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
