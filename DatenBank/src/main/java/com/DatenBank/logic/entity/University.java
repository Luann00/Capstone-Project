package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class University {
	
	public University() {
		
	}
	
	
	
	
	
	
	
	
	
	
	public University(int uniId, String name, String country, String city, int slots, int firstPref) {
		super();
		this.uniId = uniId;
		this.name = name;
		this.country = country;
		this.city = city;
		this.slots = slots;
		this.firstPref = firstPref;
	}










	@Id
	private int uniId;
	
	private String name;
	private String country;
	private String city;
	private int slots;
	private int firstPref;
	
	
	
	
	
	public int getUniId() {
		return uniId;
	}
	public void setUniId(int uniId) {
		this.uniId = uniId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getSlots() {
		return slots;
	}
	public void setSlots(int slots) {
		this.slots = slots;
	}
	public int getFirstPref() {
		return firstPref;
	}
	public void setFirstPref(int firstPref) {
		this.firstPref = firstPref;
	}

	
	
	

}
