package com.mitrais.apps.trainingsystem.controller;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery; 
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
public abstract class BaseController<U> {
	protected Specification<U> notDeleted() {
	    return new Specification<U>() {
	      public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
	            CriteriaBuilder builder) {
	    	  return builder.notEqual(root.get("status"), "Deleted");
	      }
	    };
	}
	protected Specification<U> trainCourseTraining(String trainingId) {
		return new Specification<U>() {
			public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
		            CriteriaBuilder builder) {
		    	  return builder.equal(root.get("trainingId"), trainingId);
		      }
		};
	}
	protected Specification<U> notInactive() {
	    return new Specification<U>() {
	      public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
	            CriteriaBuilder builder) {
	    	  return builder.notEqual(root.get("trainingStatus"), "Inactive");
	      }
	    };
	}
}
