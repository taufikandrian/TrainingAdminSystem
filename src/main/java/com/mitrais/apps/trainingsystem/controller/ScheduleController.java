package com.mitrais.apps.trainingsystem.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
//import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.validation.Valid;

import org.joda.time.DateTimeConstants;
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
import com.mitrais.apps.trainingsystem.model.EligibleUser;
import com.mitrais.apps.trainingsystem.model.Role;
import com.mitrais.apps.trainingsystem.model.Trainer;
import com.mitrais.apps.trainingsystem.model.Training;
import com.mitrais.apps.trainingsystem.model.TrainingCourse;
import com.mitrais.apps.trainingsystem.model.TrainingCourseDT;
import com.mitrais.apps.trainingsystem.model.User;
import com.mitrais.apps.trainingsystem.model.UserCourse;
import com.mitrais.apps.trainingsystem.model.UserCourseDetail;
import com.mitrais.apps.trainingsystem.model.UserRole;
import com.mitrais.apps.trainingsystem.repository.ClassroomRepository;
import com.mitrais.apps.trainingsystem.repository.CourseTypeRepository;
import com.mitrais.apps.trainingsystem.repository.ScheduleDTRepository;
import com.mitrais.apps.trainingsystem.repository.ScheduleRepository;
import com.mitrais.apps.trainingsystem.repository.TrainerRepository;
import com.mitrais.apps.trainingsystem.repository.TrainingRepository;
import com.mitrais.apps.trainingsystem.repository.UserCourseDetailRepository;
import com.mitrais.apps.trainingsystem.repository.UserCourseRepository;
import com.mitrais.apps.trainingsystem.repository.UserRepository;
import com.mitrais.apps.trainingsystem.repository.UserRoleRepository;

import net.minidev.json.JSONObject;

@RestController
public class ScheduleController extends BaseController<TrainingCourseDT> {

	@Autowired
	private UserRepository userRepo;
	
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
	
	@Autowired
	private UserCourseRepository userCourseRepo;
	
	@Autowired
	private UserCourseDetailRepository userCourseDtlRepo;
	
	@Autowired
	private TrainerRepository trainerRepo;
	
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
        Search s1 = new Search();
        Column c1 = new Column();
        
        //WHERE status
        s1.setValue("Deleted");
        c1.setData("status");
        c1.setSearch(s1);
        columns.add(c1);
        
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
        response.put("recordsTotal", schDTRepo.findAll(DataTable(columns)).size());
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
	@GetMapping("/trainer/all")
    public ResponseEntity<JSONObject> getAllTrainer() {
		JsonFormatter responseJson = new JsonFormatter();
		try{
			List<User> userTrainer = new ArrayList<>();
			List<User> userRoleList = userRepo.findAll();
			System.out.println(userRoleList.size());
			for(int i = 0; i < userRoleList.size(); i++) {
				//@SuppressWarnings("unchecked")
				List<Role> roleTmp = new ArrayList<>();// (List<Role>) userRoleList.get(i).getRoleList();
				roleTmp.addAll(userRoleList.get(i).getRoleList());
				System.out.println(roleTmp.size());
				for(int j = 0; j < roleTmp.size(); j++) {
					if(roleTmp.get(j).getRoleName().trim().equals("Trainer")) {
						userTrainer.add(userRoleList.get(i));
					}
				}
				
			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Trainer", userTrainer);
			return ResponseEntity.ok(responseJson.getJson());
		}
		catch(Exception ex){
			responseJson.setConfirmed(false);
			responseJson.setStatus("failed");
			responseJson.setCode("200");
			responseJson.setMessage("Get Trainer Cannot be Completed");
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
			trainingCourse.setTrainingCourseName((courseTypeTmp.getCourseTypeName() + " " + trainingCourse.getTrainingCourseName()));
			trainingCourse.setStatus("Active");
			trainingCourse.setClassroom(classroomTmp);
			trainingCourse.setCourseType(courseTypeTmp);
			trainingCourse.setTraining(trainTmp);
			responseJson.appendToData("TrainingSchedule_Created", trainingCourse);
			schRepo.save(trainingCourse);
			if(trainingCourse.trainerSecond_id.trim().isEmpty()) {
				Trainer trainerTmp = new Trainer();
				trainerTmp.setTrainerStatus("Primary");
				trainerTmp.setUserId(trainingCourse.trainerFirst_id.trim());
				trainerTmp.setTrainingCourseId(trainingCourse.getId());
				trainerRepo.save(trainerTmp);
			}
			else {
				for(int i = 0;i<2;i++) {
					Trainer trainerTmp = new Trainer();
					if(i == 0) {
						trainerTmp.setTrainerStatus("Primary");
						trainerTmp.setUserId(trainingCourse.trainerFirst_id.trim());
					}
					else {
						trainerTmp.setTrainerStatus("Backup");
						trainerTmp.setUserId(trainingCourse.trainerSecond_id.trim());
					}
					trainerTmp.setTrainingCourseId(trainingCourse.getId());
					trainerRepo.save(trainerTmp);
				}
			}
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
					currenttrainingCourse.setStatus("Deleted");
					schRepo.save(currenttrainingCourse);
					trainTmp.add(currenttrainingCourse);
				}
			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			Training currentTraining = trainTmp.get(0).getTraining();
			responseJson.appendToData("Training_Courses", currentTraining.getTrainingCourses());
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
		List<Trainer> trainerTmp = trainerRepo.findByTrainingCourseId(trainingCourseId);
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Get_Training_Course", trainCourseTmp);
			responseJson.appendToData("Trainer", trainerTmp);
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
//		CourseType courseTypeTmp = typeRepo.findById(trainingCourse.courseType_id);
//		CourseClassroom classroomTmp = clsRoomRepo.findByCourseClassroomCode(trainingCourse.classroom_id);
		try{
//			trainCourseTmp.setTrainingCourseName(courseTypeTmp.getCourseTypeName());
			trainCourseTmp.setTrainingCourseDescription(trainingCourse.getTrainingCourseDescription());
			trainCourseTmp.setTrainingCourseStartDate(trainingCourse.getTrainingCourseStartDate());
			trainCourseTmp.setTrainingCourseStartTime(trainingCourse.getTrainingCourseStartTime());
			trainCourseTmp.setTrainingCourseEndTime(trainingCourse.getTrainingCourseEndTime());
			trainCourseTmp.setTrainingCourseEndDate(trainingCourse.getTrainingCourseEndDate());
			trainCourseTmp.setTrainingCourseCapacity(trainingCourse.getTrainingCourseCapacity());
			System.out.println(trainingCourse.getStatus());
			trainCourseTmp.setStatus(trainingCourse.getStatus());
//			trainCourseTmp.setTrainingType(trainingCourse.getTrainingType());
//			trainCourseTmp.setClassroom(classroomTmp);
//			trainCourseTmp.setCourseType(courseTypeTmp);
			schRepo.save(trainCourseTmp);
//			List<Trainer> trainerTmp = trainerRepo.findByTrainingCourseId(trainingCourseId);
//			if(trainingCourse.trainerSecond_id.trim().isEmpty()) {
//				trainerTmp.get(0).setTrainerStatus("Primary");
//				trainerTmp.get(0).setUserId(trainingCourse.trainerFirst_id.trim());
//				trainerTmp.get(0).setTrainingCourseId(trainingCourseId);
//				trainerRepo.save(trainerTmp.get(0));
//			}
//			else {
//				for(int j = 0;j<2;j++) {
//					if(j == 0) {
//						trainerTmp.get(j).setTrainerStatus("Primary");
//						trainerTmp.get(j).setUserId(trainingCourse.trainerFirst_id.trim());
//					}
//					else {
//						trainerTmp.get(j).setTrainerStatus("Backup");
//						trainerTmp.get(j).setUserId(trainingCourse.trainerSecond_id.trim());
//					}
//					trainerTmp.get(j).setTrainingCourseId(trainingCourseId);
//					trainerRepo.save(trainerTmp.get(j));
//				}
//			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Update_Training_Course", trainCourseTmp);
//			responseJson.appendToData("Update_Trainer", trainerTmp);
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
		Set<UserCourse> participants = userCourseRepo.findByTrainingCourse(courseTmp);
		try{
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("Course_Detail", courseTmp);
			responseJson.appendToData("Course_Training", courseTmp.getTraining());
			responseJson.appendToData("Course_Participants", participants);
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
	
	@PostMapping("/schedule/EligibleStaffDelete/{trainingCourseId}")
	public ResponseEntity<JSONObject> DeleteEligibleStaff(@RequestBody JSONObject userID,@PathVariable String trainingCourseId){
		JsonFormatter responseJson = new JsonFormatter();
		try {
			TrainingCourse trainCourseTmp = this.schRepo.findById(trainingCourseId);
			@SuppressWarnings("unchecked")
			List<String> UserID = (List<String>) userID.get("UserID");
			for(int i = 0; i < UserID.size();i++) {
				User userDeleteTmp = this.userRepo.findById(UserID.get(i));
				UserCourse userCourseTmp = this.userCourseRepo.findByTrainingCourseAndUser(trainCourseTmp, userDeleteTmp);
				userCourseTmp.setUserCourseStatus("Deleted");
				userCourseRepo.save(userCourseTmp);
				List<UserCourseDetail> userCourseDetailTmp = this.userCourseDtlRepo.findByUserCourseID(userCourseTmp);
				for(int j = 0; j < userCourseDetailTmp.size(); j++) {
					userCourseDtlRepo.delete(userCourseDetailTmp.get(j));
				}
			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
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
	
	@PostMapping("/schedule/EligibleStaffAdd/{trainingCourseId}")
	public ResponseEntity<JSONObject> AddEligibleStaff(@RequestBody JSONObject user,@PathVariable String trainingCourseId){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			//List<EligibleUser> listOfEligible = new ArrayList<EligibleUser>();
			TrainingCourse trainCourseTmp = this.schRepo.findById(trainingCourseId);
			Training trainTmp = trainCourseTmp.getTraining();
			@SuppressWarnings("unchecked")
			List<String> userID = (List<String>) user.get("userID");
			for(int i = 0; i < userID.size();i++){
				UserCourse userCourseTmp = new UserCourse();
				userCourseTmp.setUserCourseStatus("Invited");
				userCourseTmp.setUserCourseDescription(trainCourseTmp.getTrainingCourseName());
				userCourseTmp.setUserCourseAverageScore("0");
				userCourseTmp.setUserCourseFinalScore("0");
				userCourseTmp.setUserCourseFinalTest("0");
				userCourseTmp.setUser(userRepo.findById(userID.get(i).toLowerCase()));
				userCourseTmp.setTrainingCourse(trainCourseTmp);
				userCourseRepo.save(userCourseTmp);
				if(trainCourseTmp.getTrainingType().trim().equals("Fixed")) {
					LocalDate localDateStart = LocalDate.parse( new SimpleDateFormat("yyyy-MM-dd").format(trainCourseTmp.getTrainingCourseStartDate()));
					LocalDate localDateEnd = LocalDate.parse( new SimpleDateFormat("yyyy-MM-dd").format(trainCourseTmp.getTrainingCourseEndDate()));
					//long daysBetween = ChronoUnit.DAYS.between(localDateStart, localDateEnd);
					//System.out.println(daysBetween);
					List<LocalDate> totalDates = new ArrayList<>();
					while (!localDateStart.isAfter(localDateEnd)) {
					    totalDates.add(localDateStart);
						Date dateStart = Date.from(localDateStart.atStartOfDay(ZoneId.systemDefault()).toInstant());
						UserCourseDetail userCourseDtlTmp = new UserCourseDetail();
						userCourseDtlTmp.setUserCourseDetailStartDate(dateStart);
						userCourseDtlTmp.setUserCourseDetailEndDate(dateStart);
						userCourseDtlTmp.setUserCourseDetailStartTime(trainCourseTmp.getTrainingCourseStartTime());
						userCourseDtlTmp.setUserCourseDetailEndTime(trainCourseTmp.getTrainingCourseEndTime());
						userCourseDtlTmp.setUserCourseID(userCourseTmp);
						userCourseDtlRepo.save(userCourseDtlTmp);
					    localDateStart = localDateStart.plusDays(1);
					}
				}
				else {
					SimpleDateFormat simpleDateformat = new SimpleDateFormat("EEEE");
					LocalDate localDateStart = LocalDate.parse( new SimpleDateFormat("yyyy-MM-dd").format(trainTmp.getTrainingStartDate()));
					LocalDate localDateEnd = LocalDate.parse( new SimpleDateFormat("yyyy-MM-dd").format(trainTmp.getTrainingEndDate()));
					String day = simpleDateformat.format(trainCourseTmp.getTrainingCourseStartDate());

					List<Date> listOfDate = new ArrayList<>();
					
					System.out.println();
					System.out.println(day);
					System.out.println(localDateStart);
					
					for (LocalDate date = localDateStart; date.isBefore(localDateEnd); date = date.plusDays(1)) {
						Date dateStart = Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());
						if(simpleDateformat.format(dateStart).trim().equals(day)) {
					    	listOfDate.add(dateStart);
						}
					}
					System.out.println(listOfDate.size());
					for(int j = 0; j < listOfDate.size(); j++) {
						UserCourseDetail userCourseDtlTmp = new UserCourseDetail();
						userCourseDtlTmp.setUserCourseDetailStartDate(listOfDate.get(j));
						userCourseDtlTmp.setUserCourseDetailEndDate(listOfDate.get(j));
						userCourseDtlTmp.setUserCourseDetailStartTime(trainCourseTmp.getTrainingCourseStartTime());
						userCourseDtlTmp.setUserCourseDetailEndTime(trainCourseTmp.getTrainingCourseEndTime());
						userCourseDtlTmp.setUserCourseID(userCourseTmp);
						userCourseDtlRepo.save(userCourseDtlTmp);
					}
				}
			}
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
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
	
	@GetMapping("/schedule/inviteEligible/{trainingCourseId}/{userId}")
	public ResponseEntity<JSONObject> InviteEligibleData(@PathVariable String trainingCourseId,@PathVariable String userId){
		JsonFormatter responseJson = new JsonFormatter();
		try{
			TrainingCourse trainingCourseTmp = this.schRepo.findById(trainingCourseId);
			User userListTmp = this.userRepo.findById(userId);
			UserCourse userCourseTmp = this.userCourseRepo.findByTrainingCourseAndUser(trainingCourseTmp, userListTmp);
			userCourseTmp.setUserCourseStatus("Enrolled");
			userCourseRepo.save(userCourseTmp);
			responseJson.setConfirmed(true);
			responseJson.setStatus("success");
			responseJson.setCode("200");
			responseJson.appendToData("InvitedCourse", userCourseTmp);
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
}
