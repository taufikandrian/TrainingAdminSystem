package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "user_course_detail_tb")
public class UserCourseDetail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "user_course_detail_id", columnDefinition="uniqueidentifier")
    private String id;
	
    @Column(name = "user_course_detail_start_date", nullable = false)
    private Date userCourseDetailStartDate;
    
	@Column(name = "user_course_detail_end_date")
    private Date userCourseDetailEndDate;
	
	@Column(name = "user_course_detail_start_time", nullable = false)
    private Time userCourseDetailStartTime;
    
	@Column(name = "user_course_detail_end_time")
    private Time userCourseDetailEndTime;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	public Date getUserCourseDetailStartDate() {
		return userCourseDetailStartDate;
	}

	public void setUserCourseDetailStartDate(Date userCourseDetailStartDate) {
		this.userCourseDetailStartDate = userCourseDetailStartDate;
	}

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	public Date getUserCourseDetailEndDate() {
		return userCourseDetailEndDate;
	}

	public void setUserCourseDetailEndDate(Date userCourseDetailEndDate) {
		this.userCourseDetailEndDate = userCourseDetailEndDate;
	}

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	public Time getUserCourseDetailStartTime() {
		return userCourseDetailStartTime;
	}

	public void setUserCourseDetailStartTime(Time userCourseDetailStartTime) {
		this.userCourseDetailStartTime = userCourseDetailStartTime;
	}

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	public Time getUserCourseDetailEndTime() {
		return userCourseDetailEndTime;
	}

	public void setUserCourseDetailEndTime(Time userCourseDetailEndTime) {
		this.userCourseDetailEndTime = userCourseDetailEndTime;
	}

	public UserCourseDetail(){
		
	}
	
	public UserCourseDetail(Date userCourseDetailStartDate,Date userCourseDetailEndDate,Time userCourseDetailStartTime,Time userCourseDetailEndTime){
		this.userCourseDetailStartDate = userCourseDetailStartDate;
		this.userCourseDetailEndDate = userCourseDetailEndDate;
		this.userCourseDetailStartTime = userCourseDetailStartTime;
		this.userCourseDetailEndTime = userCourseDetailEndTime;
	}

	public String getId() {
		return id;
	}
	
	@ManyToOne(optional=false)
	@JoinColumn(name="user_course_id",referencedColumnName="user_course_id")
	private UserCourse userCourseID;
	public void setUserCourseID(UserCourse userCourseID) {
		this.userCourseID = userCourseID;
	}

	public UserCourse getUserCourseID() {
		return userCourseID;
	}
	
	@ManyToOne(optional=false)
	@JoinColumn(name="user_course_attendance_id",referencedColumnName="user_course_attendance_id")
	private UserCourseAttendance userAttendanceID;
	public UserCourseAttendance getUserAttendanceID() {
		return userAttendanceID;
	}
	
	public void setUserAttendanceID(UserCourseAttendance userAttendanceID) {
		this.userAttendanceID = userAttendanceID;
	}

}
