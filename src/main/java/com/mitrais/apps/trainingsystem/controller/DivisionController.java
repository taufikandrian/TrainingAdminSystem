package com.mitrais.apps.trainingsystem.controller;

import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.classes.JsonFormatter;
import com.mitrais.apps.trainingsystem.model.Division;
import com.mitrais.apps.trainingsystem.model.JobFamily;
import com.mitrais.apps.trainingsystem.repository.JobFamilyRepository;

@RestController
public class DivisionController extends BaseController<Division> {
	
	@Autowired
	private JobFamilyRepository jobFamRepo;
	
	@GetMapping("/division/all/{jobFamCode}")
    public ResponseEntity<JSONObject> getAll(@PathVariable String jobFamCode) {
		JsonFormatter responseJson = new JsonFormatter();
		JobFamily curJobFam = jobFamRepo.findByFamilyCode(jobFamCode);
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Division", curJobFam.getDivisions());
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Division Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
}
