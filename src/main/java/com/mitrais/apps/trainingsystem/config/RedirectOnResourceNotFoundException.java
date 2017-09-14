package com.mitrais.apps.trainingsystem.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import net.minidev.json.JSONObject;

@ControllerAdvice
public class RedirectOnResourceNotFoundException {
	@ExceptionHandler(value = NoHandlerFoundException.class)
    public Object handleStaticResourceNotFound(final NoHandlerFoundException ex, HttpServletRequest req, RedirectAttributes redirectAttributes) {
        if (req.getRequestURI().startsWith("api")) {
            return this.getApiResourceNotFoundBody(ex, req);
        }
        else {
//            redirectAttributes.addFlashAttribute("errorMessage", "My Custom error message");
            return "forward:/";
        }
    }

    private ResponseEntity getApiResourceNotFoundBody(NoHandlerFoundException ex, HttpServletRequest req) {
		 JSONObject json = new JSONObject();
		 json.put("status", 404);
		 json.put("massage", "not found");
		 
		 return ResponseEntity.ok(json);
    }
}