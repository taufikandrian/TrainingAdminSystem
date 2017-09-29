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
             
             //SEARCH
             for (Column item : columns) {
        	 	String search = item.getSearch().getValue();
        	 	
        	 	if(!search.equals("")) {
        	 		String data= item.getData();
        	 		
        	 		if(item.getData() == "status") {
            	 		where.add(builder.notEqual(root.get(item.getData()), search));
            	 	} else if (item.getData().contains(".")) {
            	 		String[] splitedCol = data.split("\\.");
            	 		if(splitedCol.length > 2)
            	 			where.add(builder.equal(root.join(splitedCol[1]).get(splitedCol[2]), search));
            	 		else
            	 			where.add(builder.like(root.join(splitedCol[0]).get(splitedCol[1]), "%"+search+"%"));
            	 		
            	 	} else
            	 		where.add(builder.like(root.get(item.getData()), "%"+search+"%"));
                }
                          
             }
             return builder.and(where.toArray(new Predicate[0]));
          }
        };
    }
}
