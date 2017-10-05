package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "user_course_tb")
public class UserCourse extends Auditable<String> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "user_course_id", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "user_course_status", nullable = false)
    private String userCourseStatus;
    
	@Column(name = "user_course_description")
    private String userCourseDescription;
    
    @Column(name = "user_course_average_score")
    private String userCourseAverageScore;
    
    @Column(name = "user_course_final_score")
    private String userCourseFinalScore;
    
    @Column(name = "user_course_final_test")
    private String userCourseFinalTest;
    
    public String getUserCourseStatus() {
		return userCourseStatus;
	}

	public void setUserCourseStatus(String userCourseStatus) {
		this.userCourseStatus = userCourseStatus;
	}

	public String getUserCourseDescription() {
		return userCourseDescription;
	}

	public void setUserCourseDescription(String userCourseDescription) {
		this.userCourseDescription = userCourseDescription;
	}

	public String getUserCourseAverageScore() {
		return userCourseAverageScore;
	}

	public void setUserCourseAverageScore(String userCourseAverageScore) {
		this.userCourseAverageScore = userCourseAverageScore;
	}

	public String getUserCourseFinalScore() {
		return userCourseFinalScore;
	}

	public void setUserCourseFinalScore(String userCourseFinalScore) {
		this.userCourseFinalScore = userCourseFinalScore;
	}

	public String getUserCourseFinalTest() {
		return userCourseFinalTest;
	}

	public void setUserCourseFinalTest(String userCourseFinalTest) {
		this.userCourseFinalTest = userCourseFinalTest;
	}

	public UserCourse(){
    	
    }
    
    public UserCourse(String userCourseStatus,String userCourseDescription,String userCourseAverageScore,String userCourseFinalScore,String userCourseFinalTest){
    	this.userCourseStatus = userCourseStatus;
    	this.userCourseDescription = userCourseDescription;
    	this.userCourseAverageScore = userCourseAverageScore;
    	this.userCourseFinalScore = userCourseFinalScore;
    	this.userCourseFinalTest = userCourseFinalTest;
    }
    
	public String getId() {
		return id;
	}

	@ManyToOne(optional=false)
    @JoinColumn(name="user_id",referencedColumnName="user_id")
    private User user;
    public void setUser(User user) {
		this.user = user;
	}

	public User getUser() {
		return user;
	}
	
	@ManyToOne(optional=false)
    @JoinColumn(name="training_course_id",referencedColumnName="training_course_id")
	private TrainingCourse trainingCourse;

	public TrainingCourse getTrainingCourse() {
		return trainingCourse;
	}

	public void setTrainingCourse(TrainingCourse trainingCourse) {
		this.trainingCourse = trainingCourse;
	}
	
}
