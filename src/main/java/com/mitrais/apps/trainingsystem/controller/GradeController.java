package com.mitrais.apps.trainingsystem.controller;

import java.util.List;

import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.classes.JsonFormatter;
import com.mitrais.apps.trainingsystem.model.Grade;
import com.mitrais.apps.trainingsystem.repository.GradeRepository;

@RestController
public class GradeController extends BaseController<Grade> {

	@Autowired
	private GradeRepository gradeRepo;
	
	@RequestMapping("/grade/all")
    public ResponseEntity<JSONObject> getAll() {
		JsonFormatter responseJson = new JsonFormatter();
		List<Grade> gradeList = (List<Grade>) gradeRepo.findAll();
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Grade", gradeList);
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
