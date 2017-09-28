package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "training_course_tb")
public class TrainingCourse extends Auditable<String> implements Serializable {

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
    
    @Column(name = "training_course_end_date")
    private Date trainingCourseEndDate;
    
    @Column(name = "training_course_capacity")
    private Integer trainingCourseCapacity;
    
    @Column(name = "training_course_status")
    private String trainingCourseStatus;
    
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

	public Date getTrainingCourseStartDate() {
		return trainingCourseStartDate;
	}

	public void setTrainingCourseStartDate(Date trainingCourseStartDate) {
		this.trainingCourseStartDate = trainingCourseStartDate;
	}

	public Date getTrainingCourseEndDate() {
		return trainingCourseEndDate;
	}

	public void setTrainingCourseEndDate(Date trainingCourseEndDate) {
		this.trainingCourseEndDate = trainingCourseEndDate;
	}

	public Integer getTrainingCourseCapacity() {
		return trainingCourseCapacity;
	}

	public void setTrainingCourseCapacity(Integer trainingCourseCapacity) {
		this.trainingCourseCapacity = trainingCourseCapacity;
	}

	public String getTrainingCourseStatus() {
		return trainingCourseStatus;
	}

	public void setTrainingCourseStatus(String trainingCourseStatus) {
		this.trainingCourseStatus = trainingCourseStatus;
	}
	
	public TrainingCourse(){
    	
    }
	
	public TrainingCourse(String trainingCourseName,String trainingCourseDescription,Date trainingCourseStartDate,Date trainingCourseEndDate,Integer trainingCourseCapacity,String trainingCourseStatus){
    	this.trainingCourseName = trainingCourseName;
    	this.trainingCourseDescription = trainingCourseDescription;
    	this.trainingCourseStartDate = trainingCourseStartDate;
    	this.trainingCourseEndDate = trainingCourseEndDate;
    	this.trainingCourseCapacity = trainingCourseCapacity;
    	this.trainingCourseStatus = trainingCourseStatus;
    }

	public String getId() {
		return id;
	}
    
//	@ManyToMany(fetch=FetchType.EAGER)
//    @JoinTable(name="trainer_tb",
//            joinColumns=
//            @JoinColumn(name="training_course_id", referencedColumnName="training_course_id"),
//      inverseJoinColumns=
//            @JoinColumn(name="user_id", referencedColumnName="user_id")
//    )
//	private Set<User> trainingCourseTrainer;
//    public void setTrainingCourseTrainer(Set<User> trainingCourseTrainer) {
//		this.trainingCourseTrainer = trainingCourseTrainer;
//	}
//
//	public Set<User> getTrainingCourseTrainer() {
//		return this.trainingCourseTrainer;
//	}
	
	@ManyToOne(optional=false)
    @JoinColumn(name="course_classroom_id",referencedColumnName="course_classroom_id")
	//@JsonIgnore
	private CourseClassroom classroom;
	public CourseClassroom getClassroom() {
		return classroom;
	}
	
	@ManyToOne(optional=false)
	@JoinColumn(name="training_id",referencedColumnName="training_id")
	//@JsonIgnore
	private Training training;
	public Training getTraining() {
		return training;
	}
}
