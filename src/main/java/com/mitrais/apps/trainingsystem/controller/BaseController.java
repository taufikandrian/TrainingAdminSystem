package com.mitrais.apps.trainingsystem.controller;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.datatables.mapping.Column;
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
	
	protected Specification<U> active() {
	    return new Specification<U>() {
	      public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
	            CriteriaBuilder builder) {
	    	  return builder.equal(root.get("status"), "Active");
	      }
	    };
	}
	
	protected Specification<U> equalByOneColumn(String columnName, String columnValue) {
		return new Specification<U>() {
			public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
		            CriteriaBuilder builder) {
		    	  return builder.equal(root.get(columnName), columnValue);
		      }
		};
	}
	
	protected Specification<U> DataTable(List<Column> columns) {
        return new Specification<U>() {
          public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
                CriteriaBuilder builder) {
             List<Predicate> where = new ArrayList<>();
             for (Column item : columns) {

                    String search = item.getSearch().getValue();
                    if(!search.equals("")) {
                    	where.add(builder.like(root.get(item.getData()), "%"+search+"%"));
                    }
                          
             }
             
             where.add(builder.notEqual(root.get("status"), "Deleted"));
             return builder.and(where.toArray(new Predicate[0]));
          }
        };
    }
}
