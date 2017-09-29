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
@Table(name = "course_name_tb")
public class CourseName implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "course_name_id", columnDefinition="uniqueidentifier")
    private String id;

	@Column(name = "course_name_code", nullable = false)
    private String courseNameCode;
    
	@Column(name = "course_name_name")
    private String courseNameName;
	
	@Column(name = "course_name_description", nullable = false)
    private String courseNameDescription;
	
	public String getCourseNameCode() {
		return courseNameCode;
	}

	public void setCourseNameCode(String courseNameCode) {
		this.courseNameCode = courseNameCode;
	}

	public String getCourseNameName() {
		return courseNameName;
	}

	public void setCourseNameName(String courseNameName) {
		this.courseNameName = courseNameName;
	}

	public String getCourseNameDescription() {
		return courseNameDescription;
	}

	public void setCourseNameDescription(String courseNameDescription) {
		this.courseNameDescription = courseNameDescription;
	}

	public CourseName(){
		
	}
	
	public CourseName(String courseNameCode,String courseNameName,String courseNameDescription){
		this.courseNameCode = courseNameCode;
		this.courseNameName = courseNameName;
		this.courseNameDescription = courseNameDescription;
	}
	
	public String getId() {
		return id;
	}
	
	@ManyToOne(optional=false)
    @JoinColumn(name="course_type_id",referencedColumnName="course_type_id")
	private CourseType courseType;
	public void setCourseType(CourseType courseType) {
		this.courseType = courseType;
	}

	public CourseType getCourseType() {
		return courseType;
	}
}
