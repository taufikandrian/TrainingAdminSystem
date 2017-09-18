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
import org.joda.time.LocalTime;

@Entity
@Table(name = "user_course_detail_tb")
public class UserCourseDetail implements Serializable {

	private UserCourse userCourseID;
	private UserCourseAttendance userAttendanceID;

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
    private LocalTime userCourseDetailStartTime;
    
	@Column(name = "user_course_detail_end_time")
    private LocalTime userCourseDetailEndTime;

	public Date getUserCourseDetailStartDate() {
		return userCourseDetailStartDate;
	}

	public void setUserCourseDetailStartDate(Date userCourseDetailStartDate) {
		this.userCourseDetailStartDate = userCourseDetailStartDate;
	}

	public Date getUserCourseDetailEndDate() {
		return userCourseDetailEndDate;
	}

	public void setUserCourseDetailEndDate(Date userCourseDetailEndDate) {
		this.userCourseDetailEndDate = userCourseDetailEndDate;
	}

	public LocalTime getUserCourseDetailStartTime() {
		return userCourseDetailStartTime;
	}

	public void setUserCourseDetailStartTime(LocalTime userCourseDetailStartTime) {
		this.userCourseDetailStartTime = userCourseDetailStartTime;
	}

	public LocalTime getUserCourseDetailEndTime() {
		return userCourseDetailEndTime;
	}

	public void setUserCourseDetailEndTime(LocalTime userCourseDetailEndTime) {
		this.userCourseDetailEndTime = userCourseDetailEndTime;
	}

	public UserCourseDetail(){
		
	}
	
	public UserCourseDetail(Date userCourseDetailStartDate,Date userCourseDetailEndDate,LocalTime userCourseDetailStartTime,LocalTime userCourseDetailEndTime){
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
	public UserCourse getUserCourseID() {
		return userCourseID;
	}
	
	@ManyToOne(optional=false)
	@JoinColumn(name="user_course_attendance_id",referencedColumnName="user_course_attendance_id")
	public UserCourseAttendance getUserAttendanceID() {
		return userAttendanceID;
	}

}
