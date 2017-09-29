package com.mitrais.apps.trainingsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.mitrais.apps.trainingsystem.model.AuditorAwareImpl;

@Configuration
@EnableJpaAuditing(auditorAwareRef="auditorProvider")
public class PresistenceConfig {
	@Bean
    AuditorAwareImpl auditorProvider() {
        return new AuditorAwareImpl();
    }
}
