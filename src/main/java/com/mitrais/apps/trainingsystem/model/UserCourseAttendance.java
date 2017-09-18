package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "user_course_attendance_tb")
public class UserCourseAttendance implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "user_course_attendance_id", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "user_course_attendance_code", nullable = false)
    private String userCourseAttendanceCode;
    
	@Column(name = "user_course_attendance_name")
    private String userCourseAttendanceName;
	
	@Column(name = "user_course_attendance_description", nullable = false)
    private String userCourseAttendanceDescription;
	
	public String getUserCourseAttendanceCode() {
		return userCourseAttendanceCode;
	}
	public void setUserCourseAttendanceCode(String userCourseAttendanceCode) {
		this.userCourseAttendanceCode = userCourseAttendanceCode;
	}
	public String getUserCourseAttendanceName() {
		return userCourseAttendanceName;
	}
	public void setUserCourseAttendanceName(String userCourseAttendanceName) {
		this.userCourseAttendanceName = userCourseAttendanceName;
	}
	public String getUserCourseAttendanceDescription() {
		return userCourseAttendanceDescription;
	}
	public void setUserCourseAttendanceDescription(
			String userCourseAttendanceDescription) {
		this.userCourseAttendanceDescription = userCourseAttendanceDescription;
	}

	public UserCourseAttendance(){
		
	}
	
	public UserCourseAttendance(String userCourseAttendanceCode,String userCourseAttendanceName,String userCourseAttendanceDescription){
		this.userCourseAttendanceCode = userCourseAttendanceCode;
		this.userCourseAttendanceName = userCourseAttendanceName;
		this.userCourseAttendanceDescription = userCourseAttendanceDescription;
	}
	
	public String getId() {
		return id;
	}

}
