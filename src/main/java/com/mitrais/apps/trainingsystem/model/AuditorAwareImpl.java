package com.mitrais.apps.trainingsystem.model;

import org.springframework.data.domain.AuditorAware;

public class AuditorAwareImpl implements AuditorAware<String> {
	
	@Override
	public String getCurrentAuditor() {
		// TODO Auto-generated method stub
		return "ffc71638-d598-4cc2-88ac-eb043395ae78";
	}

}
