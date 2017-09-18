package com.mitrais.apps.trainingsystem.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "course_type_tb")
public class CourseType implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name = "generator", strategy = "guid", parameters = {})
	@GeneratedValue(generator = "generator")
    @Column(name = "course_type_id", columnDefinition="uniqueidentifier")
    private String id;
	
	@Column(name = "course_type_name")
    private String courseTypeName;
    
	@Column(name = "course_type_description")
    private String courseTypeDescription;
	
	@Column(name = "course_type_level")
    private Integer courseTypeLevel;
	
	@Column(name = "course_type_group")
    private String courseTypeGroup;
	
	public String getCourseTypeName() {
		return courseTypeName;
	}

	public void setCourseTypeName(String courseTypeName) {
		this.courseTypeName = courseTypeName;
	}

	public String getCourseTypeDescription() {
		return courseTypeDescription;
	}

	public void setCourseTypeDescription(String courseTypeDescription) {
		this.courseTypeDescription = courseTypeDescription;
	}

	public Integer getCourseTypeLevel() {
		return courseTypeLevel;
	}

	public void setCourseTypeLevel(Integer courseTypeLevel) {
		this.courseTypeLevel = courseTypeLevel;
	}
	
	public String getCourseTypeGroup() {
		return courseTypeGroup;
	}

	public void setCourseTypeGroup(String courseTypeGroup) {
		this.courseTypeGroup = courseTypeGroup;
	}

	public CourseType(){
		
	}
	
	public CourseType(String courseTypeName,String courseTypeDescription,Integer courseTypeLevel,String courseTypeGroup){
		this.courseTypeName = courseTypeName;
		this.courseTypeDescription = courseTypeDescription;
		this.courseTypeLevel = courseTypeLevel;
		this.courseTypeGroup = courseTypeGroup;
	}

	public String getId() {
		return id;
	}


}
