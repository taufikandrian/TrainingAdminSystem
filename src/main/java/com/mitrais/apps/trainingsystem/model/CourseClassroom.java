package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "course_classroom_tb")
public class CourseClassroom implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "course_classroom_id", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "course_classroom_code", nullable = false)
    private String courseClassroomCode;
    
	@Column(name = "course_classroom_name")
    private String courseClassroomName;
	
	@Column(name = "course_classroom_description")
    private String courseClassroomDescription;
	
	@Column(name = "course_classroom_capacity")
    private Integer courseClassroomCapacity;

	public String getCourseClassroomCode() {
		return courseClassroomCode;
	}

	public void setCourseClassroomCode(String courseClassroomCode) {
		this.courseClassroomCode = courseClassroomCode;
	}

	public String getCourseClassroomName() {
		return courseClassroomName;
	}

	public void setCourseClassroomName(String courseClassroomName) {
		this.courseClassroomName = courseClassroomName;
	}

	public String getCourseClassroomDescription() {
		return courseClassroomDescription;
	}

	public void setCourseClassroomDescription(String courseClassroomDescription) {
		this.courseClassroomDescription = courseClassroomDescription;
	}

	public Integer getCourseClassroomCapacity() {
		return courseClassroomCapacity;
	}

	public void setCourseClassroomCapacity(Integer courseClassroomCapacity) {
		this.courseClassroomCapacity = courseClassroomCapacity;
	}

	public CourseClassroom(){
		
	}
	
	public CourseClassroom(String courseClassroomCode,String courseClassroomName,String courseClassroomDescription,Integer courseClassroomCapacity){
		this.courseClassroomCode = courseClassroomCode;
		this.courseClassroomName = courseClassroomName;
		this.courseClassroomDescription = courseClassroomDescription;
		this.courseClassroomCapacity = courseClassroomCapacity;
	}
	
	public String getId() {
		return id;
	}
	
	

}
