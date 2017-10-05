package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "training_course_tb")
public class TrainingCourse extends Auditable<String> implements Serializable {

	@Transient
	public String classroom_id;
	
	@Transient
	public String courseType_id;
	
	@Transient
	public String trainerFirst_id;
	
	@Transient
	public String trainerSecond_id;
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "training_course_id", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "training_course_name", nullable = false)
    private String trainingCourseName;
    
	@Column(name = "training_course_description")
    private String trainingCourseDescription;
    
    @Column(name = "training_course_start_date") 
    private Date trainingCourseStartDate;
    
    @Column(name = "training_course_start_time")
    private Time trainingCourseStartTime;
    
    @Column(name = "training_course_end_date")
    private Date trainingCourseEndDate;
    
    @Column(name = "training_course_end_time")
    private Time trainingCourseEndTime;
    
    @Column(name = "training_course_capacity")
    private Integer trainingCourseCapacity;
    
    @Column(name = "training_course_status")
    private String status;
    
    @Column(name = "training_course_type")
    private String trainingType;
    
	public String getTrainingType() {
		return trainingType;
	}

	public void setTrainingType(String trainingType) {
		this.trainingType = trainingType;
	}

	public String getTrainingCourseName() {
		return trainingCourseName;
	}

	public void setTrainingCourseName(String trainingCourseName) {
		this.trainingCourseName = trainingCourseName;
	}

	public String getTrainingCourseDescription() {
		return trainingCourseDescription;
	}

	public void setTrainingCourseDescription(String trainingCourseDescription) {
		this.trainingCourseDescription = trainingCourseDescription;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	public Date getTrainingCourseStartDate() {
		return trainingCourseStartDate;
	}

	public void setTrainingCourseStartDate(Date trainingCourseStartDate) {
		this.trainingCourseStartDate = trainingCourseStartDate;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	public Date getTrainingCourseEndDate() {
		return trainingCourseEndDate; 
	}

	public void setTrainingCourseEndDate(Date trainingCourseEndDate) {
		this.trainingCourseEndDate = trainingCourseEndDate;
	}

	public Integer getTrainingCourseCapacity() {
		return trainingCourseCapacity;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	public Time getTrainingCourseStartTime() {
		return trainingCourseStartTime;
	}

	public void setTrainingCourseStartTime(Time trainingCourseStartTime) {
		this.trainingCourseStartTime = trainingCourseStartTime;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	public Time getTrainingCourseEndTime() {
		return trainingCourseEndTime;
	}

	public void setTrainingCourseEndTime(Time trainingCourseEndTime) {
		this.trainingCourseEndTime = trainingCourseEndTime;
	}

	public void setTrainingCourseCapacity(Integer trainingCourseCapacity) {
		this.trainingCourseCapacity = trainingCourseCapacity;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String trainingCourseStatus) {
		this.status = trainingCourseStatus;
	}
	
	public TrainingCourse(){
    	
    }
	
	public TrainingCourse(String trainingCourseName,String trainingCourseDescription,Date trainingCourseStartDate,Date trainingCourseEndDate,Integer trainingCourseCapacity,String trainingCourseStatus,String trainingType,Time trainingCourseStartTime,Time trainingCourseEndTime){
    	this.trainingCourseName = trainingCourseName;
    	this.trainingCourseDescription = trainingCourseDescription;
    	this.trainingCourseStartDate = trainingCourseStartDate;
    	this.trainingCourseEndDate = trainingCourseEndDate;
    	this.trainingCourseCapacity = trainingCourseCapacity;
    	this.status = trainingCourseStatus;
    	this.trainingType = trainingType;
    	this.trainingCourseStartTime = trainingCourseStartTime;
    	this.trainingCourseEndTime = trainingCourseEndTime;
    }

	public String getId() {
		return id;
	}
	
	@ManyToOne(optional=false)
    @JoinColumn(name="course_type_id",referencedColumnName="course_type_id")
	//@JsonIgnore
	private CourseType courseType;
	public CourseType getCourseType() {
		return courseType;
	}
	public void setCourseType(CourseType courseType) {
		this.courseType = courseType;
	}
	
	@ManyToOne(optional=false)
    @JoinColumn(name="course_classroom_id",referencedColumnName="course_classroom_id")
	//@JsonIgnore
	private CourseClassroom classroom;
	public CourseClassroom getClassroom() {
		return classroom;
	}
	public void setClassroom(CourseClassroom classroom) {
		this.classroom = classroom;
	}
	
	@JsonBackReference
	@ManyToOne(optional=false)
	@JoinColumn(name="training_id",referencedColumnName="training_id")
	private Training training;
	public Training getTraining() {
		return training;
	}
	public void setTraining(Training training) {
		this.training = training;
	}
	
}
