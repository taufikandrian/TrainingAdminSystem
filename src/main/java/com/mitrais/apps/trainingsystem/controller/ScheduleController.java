package com.mitrais.apps.trainingsystem.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.validation.Valid;

import org.joda.time.Days;
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
import com.mitrais.apps.trainingsystem.model.CourseClassroom;
import com.mitrais.apps.trainingsystem.model.CourseType;
import com.mitrais.apps.trainingsystem.model.Training;
import com.mitrais.apps.trainingsystem.model.TrainingCourse;
import com.mitrais.apps.trainingsystem.model.TrainingCourseDT;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.repository.ClassroomRepository;
import com.mitrais.apps.trainingsystem.repository.CourseTypeRepository;
import com.mitrais.apps.trainingsystem.repository.ScheduleDTRepository;
import com.mitrais.apps.trainingsystem.repository.ScheduleRepository;
import com.mitrais.apps.trainingsystem.repository.TrainingRepository;

import net.minidev.json.JSONObject;

@RestController
public class ScheduleController extends BaseController<TrainingCourseDT> {

	
	@Autowired
	private ScheduleRepository schRepo;
	
	@Autowired
	private ScheduleDTRepository schDTRepo;
	
	@Autowired
	private ClassroomRepository clsRoomRepo;
	
	@Autowired 
	private TrainingRepository trainRepo;
	
	@Autowired
	private CourseTypeRepository typeRepo;
	
	@PostMapping("/schedule/dt/all/{trainingId}")
	public ResponseEntity<JSONObject> getTrainsCourse(@Valid @RequestBody DataTablesInput input,@PathVariable String trainingId) {
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
        c.setData("status");
        c.setSearch(s);
        columns.add(c);
        
        //JOIN
        s.setValue(trainingId);
        c.setData("join.training.id");
        c.setSearch(s);
        columns.add(c);
        
//        s.setValue(trainingId);
//        c.setData("join.trainingCourseTrainer.id");
//        c.setSearch(s);
//        columns.add(c);
       
        Sort sort = new Sort(orders);
        PageRequest page = new PageRequest(input.getStart(),input.getStart()+input.getLength(), sort);
        Page<TrainingCourseDT> data = schDTRepo.findAll(DataTable(columns), page);
        response.put("draw", input.getDraw());
        response.put("recordsTotal", schDTRepo.findAll(notDeleted()).size());
        response.put("recordsFiltered", data.getTotalElements());
        response.put("data", data.getContent());
        return ResponseEntity.ok(response);
	}
	
	@GetMapping("/classroom/all")
    public ResponseEntity<JSONObject> getAllClassroom() {
		JsonFormatter responseJson = new JsonFormatter();
		List<CourseClassroom> classroomList = (List<CourseClassroom>) clsRoomRepo.findAll();
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Classroom", classroomList);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Classroom Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	@GetMapping("/coursetype/all")
    public ResponseEntity<JSONObject> getAllCourseName() {
		JsonFormatter responseJson = new JsonFormatter();
		List<CourseType> courseTypeList = (List<CourseType>) typeRepo.findAll();
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_courseType", courseTypeList);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Course Name Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	@PostMapping("/schedule/{trainingId}/create")
	public ResponseEntity<JSONObject> add(@RequestBody TrainingCourse trainingCourse,@PathVariable String trainingId){
		JsonFormatter responseJson = new JsonFormatter();
		Training trainTmp = trainRepo.findById(trainingId);
		CourseType courseTypeTmp = typeRepo.findById(trainingCourse.courseType_id);
		CourseClassroom classroomTmp = clsRoomRepo.findById(trainingCourse.classroom_id);
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			//trainingCourse.setTrainingCourseName(courseNameTmp.getCourseNameName());
			trainingCourse.setStatus("Active");
			trainingCourse.setClassroom(classroomTmp);
			trainingCourse.setCourseType(courseTypeTmp);
			trainingCourse.setTraining(trainTmp);
			responseJson.appendToData("TrainingSchedule_Created", trainingCourse);
			schRepo.save(trainingCourse);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Created Data Cannot be Completed");
			responseJson.appendToData("ScheduleFailedCreate", ex.getMessage());
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
	//DELETE TRAINING FEATURE
	@PostMapping("/schedule/delete")
	public ResponseEntity<JSONObject> deleteData(@RequestBody JSONObject trainingCourse){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			List<TrainingCourse> trainTmp = new ArrayList<TrainingCourse>();
			@SuppressWarnings("unchecked")
			List<String> trainingCourseID = (List<String>) trainingCourse.get("trainingCourseID");
			for(int i = 0; i < trainingCourseID.size();i++){
				TrainingCourse currenttrainingCourse = this.schRepo.findById(trainingCourseID.get(i).toLowerCase());
				if(currenttrainingCourse != null) {
					currenttrainingCourse.setStatus("Inactive");
					schRepo.save(currenttrainingCourse);
					trainTmp.add(currenttrainingCourse);
				}
			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Training_Course_Deleted", trainTmp);
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
	
	//get data detail training
	@GetMapping("/schedule/update/{trainingCourseId}")
	public ResponseEntity<JSONObject> getDetailTraining(@PathVariable String trainingCourseId){
		JsonFormatter responseJson = new JsonFormatter();
		TrainingCourse trainCourseTmp = schRepo.findById(trainingCourseId);
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Training_Course", trainCourseTmp);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Training Course Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	//post data for update feature
	@PostMapping("/schedule/update/{trainingCourseId}")
	public ResponseEntity<JSONObject> updatePostData(@RequestBody TrainingCourse trainingCourse,@PathVariable String trainingCourseId){
		JsonFormatter responseJson = new JsonFormatter();
		TrainingCourse trainCourseTmp = schRepo.findById(trainingCourseId);
		CourseType courseTypeTmp = typeRepo.findById(trainingCourse.courseType_id);
		CourseClassroom classroomTmp = clsRoomRepo.findByCourseClassroomCode(trainingCourse.classroom_id);
		try{
			trainCourseTmp.setTrainingCourseName(courseTypeTmp.getCourseTypeName());
			trainCourseTmp.setTrainingCourseDescription(trainingCourse.getTrainingCourseDescription());
			trainCourseTmp.setTrainingCourseStartDate(trainingCourse.getTrainingCourseStartDate());
			trainCourseTmp.setTrainingCourseStartTime(trainingCourse.getTrainingCourseStartTime());
			trainCourseTmp.setTrainingCourseEndTime(trainingCourse.getTrainingCourseEndTime());
			trainCourseTmp.setTrainingCourseEndDate(trainingCourse.getTrainingCourseEndDate());
			trainCourseTmp.setTrainingCourseCapacity(trainingCourse.getTrainingCourseCapacity());
			trainCourseTmp.setStatus(trainingCourse.getStatus());
			trainCourseTmp.setTrainingType(trainingCourse.getTrainingType());
			trainCourseTmp.setClassroom(classroomTmp);
			trainCourseTmp.setCourseType(courseTypeTmp);
			schRepo.save(trainCourseTmp);
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Update_Training_Course", trainCourseTmp);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.appendToData("UpdateFail", ex);
			responseJson.setMessage("Updated Training Course Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}

	}
	
	@GetMapping("/schedule/TrainingClassDetail/{id}")
	public ResponseEntity<JSONObject> getDetailData(@PathVariable String id){
		JsonFormatter responseJson = new JsonFormatter();
		TrainingCourse courseTmp = schRepo.findById(id);
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Course_Detail", courseTmp);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Course Detail Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
	
//	@GetMapping("/schedule/EligibleStaff/{trainingCourseId}")
//	public ResponseEntity<JSONObject> getEligibleStaff(@PathVariable String trainingCourseId){
//		JsonFormatter responseJson = new JsonFormatter();
//		try{
//			String cekTypeCourse = "";
//			
//			Set<User> hasil = new HashSet<>();
//			
//			TrainingCourse courseTmp = schRepo.findById(trainingCourseId);
//			Training trainTmp = courseTmp.getTraining();
//			CourseType courseTypeTmp = courseTmp.getCourseType();
//
//			cekTypeCourse = courseTypeTmp.getCourseTypeGroup();
//			
//			if(cekTypeCourse.trim() == "BCC") {
//				//hasil filter 
//			}
//			else {
//				hasil = trainTmp.getEligibleList();
//			}
//			
//			responseJson.setConfirmed(true);
//			responseJson.setStatus("success");
//			responseJson.setCode("200");
//			responseJson.appendToData("Course_Detail", hasil);
//			return ResponseEntity.ok(responseJson.getJson());
//		}
//		catch(Exception ex){
//			responseJson.setConfirmed(false);
//			responseJson.setStatus("failed");
//			responseJson.setCode("200");
//			responseJson.setMessage("Get Course Detail Cannot be Completed");
//			return ResponseEntity.ok(responseJson.getJson());
//		}
//	}
	
	@PostMapping("/schedule/EligibleStaffAdd/{trainingCourseId}")
	public ResponseEntity<JSONObject> AddEligibleStaff(@PathVariable String trainingCourseId){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			TrainingCourse trainCourseTmp = this.schRepo.findById(trainingCourseId);
			if(trainCourseTmp.getTrainingType().trim() == "Periodically") {
				LocalDate localDateStart = LocalDate.parse( new SimpleDateFormat("yyyy-MM-dd").format(trainCourseTmp.getTrainingCourseStartDate()));
				LocalDate localDateEnd = LocalDate.parse( new SimpleDateFormat("yyyy-MM-dd").format(trainCourseTmp.getTrainingCourseEndDate()));
//				Date startDateTmp = trainCourseTmp.getTrainingCourseStartDate();
//				Date endDateTmp = trainCourseTmp.getTrainingCourseEndDate();
				long daysBetween = ChronoUnit.DAYS.between(localDateStart, localDateEnd);
				System.out.println(daysBetween);
			}
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex) {
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Course Detail Cannot be Completed");
			return ResponseEntity.ok(responseJson.getJson());
		}
	}
}
