package com.mitrais.apps.trainingsystem.classes;

import net.minidev.json.JSONObject;

public class JsonFormatter {
	JSONObject jsonFinal 	= new JSONObject();
	JSONObject jsonData 	= new JSONObject();
	
	public JsonFormatter() {}
	
	public JsonFormatter(String status, String code) {
		this.setStatus(status);
		this.setCode(code);
	}
	
	public JsonFormatter(String status, String code, String message, JSONObject jsonData) {
		this.setStatus(status);
		this.setCode(code);
		this.setMessage(message);
	}
	
	public void setStatus(String status) {
		this.jsonFinal.put("status", status);
	}
	
	public void setCode(String code) {
		this.jsonFinal.put("code", code);
	}
	
	public void setMessage(String message) {
		this.jsonFinal.put("message", message);
	}
	
	public void setConfirmed(boolean confirmed) {
		this.jsonFinal.put("confirmed", confirmed);
	}
	
	public void appendToFinalJson(String indexName, Object object) {
		this.jsonFinal.put(indexName, object);
	}
	
	public void appendToData(String indexName, Object object) {
		this.jsonData.put(indexName, object);
	}
	
	public JSONObject getJson() {
		this.jsonFinal.put("data", this.jsonData);
		return this.jsonFinal;
	}
}
