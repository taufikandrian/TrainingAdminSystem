package com.mitrais.apps.trainingsystem.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.model.TrainingCourse;
import com.mitrais.apps.trainingsystem.repository.ScheduleRepository;
import net.minidev.json.JSONObject;

@RestController
public class ScheduleController extends BaseController<TrainingCourse> {

	
	@Autowired
	private ScheduleRepository schRepo;
	
	@PostMapping("/schedule/dt/all/{trainingId}")
	public ResponseEntity<JSONObject> getTrainsCourse(@Valid @RequestBody DataTablesInput input,@PathVariable String trainingId) {
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
        Page<TrainingCourse> data = schRepo.findAll(DataTable(columns), page);
//		System.out.println(trainingId);
//		return (List<TrainingCourse>) schRepo.findAll();
        response.put("draw", input.getDraw());
        response.put("recordsTotal", schRepo.findAll(notDeleted()).size());
        response.put("recordsFiltered", data.getTotalElements());
        response.put("data", data.getContent());
        return ResponseEntity.ok(response);
	}
}
