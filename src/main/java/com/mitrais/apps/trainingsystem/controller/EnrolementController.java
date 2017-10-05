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
import org.springframework.data.jpa.datatables.mapping.Search;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mitrais.apps.trainingsystem.model.UserCourse;
import com.mitrais.apps.trainingsystem.repository.UserCourseRepository;
import com.mitrais.apps.trainingsystem.repository.UserRepository;

import net.minidev.json.JSONObject;

@RestController
public class EnrolementController extends BaseController<UserCourse> {
	
	@Autowired
	UserCourseRepository userCourseRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@PostMapping(value="/schedule/{scheduleID}/participant/all")
    public ResponseEntity<JSONObject> getParticipant(@Valid @RequestBody DataTablesInput input, @PathVariable String scheduleID) {
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
       
       s.setValue(scheduleID);
       c.setData("join.trainingCourse.id");c.setSearch(s);
       columns.add(c);
       
//       s.setValue(scheduleID);
//       c.setData("join.eligibleTrainings.id");c.setSearch(s);
//       columns.add(c);
      
       Sort sort = new Sort(orders);
       Integer pageNumber = (int) Math.ceil(input.getStart() / input.getLength());
       PageRequest page = new PageRequest(pageNumber,input.getLength(), sort);
       Page<UserCourse> data = userCourseRepo.findAll(DataTable(columns), page);
       response.put("draw", input.getDraw());
       response.put("recordsTotal", userCourseRepo.findAll(DataTable(columns)).size());
       response.put("recordsFiltered", data.getTotalElements());
       response.put("data", data.getContent());
       return ResponseEntity.ok(response);
    }
}
