package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class University {
	public University() {

	}


	public University(int uniId, String name,String abbName, String country, String city, float minGPA, int slots, int firstPref,int totalPref, boolean showGPA) {
		super();
		this.uniId = uniId;
		this.name = name;
		this.abbName = abbName;
		this.country = country;
		this.city = city;
		this.minGPA = minGPA;
		this.slots = slots;
		this.firstPref = firstPref;
		this.totalPref= totalPref;
		this.showGPA = showGPA;
	}

	@Id
	private int uniId;
	private String name;
	private String abbName;
	private String country;
	private String city;
	private float minGPA;
	private int slots;
	private int firstPref;
	private int totalPref;

	private boolean showGPA;

	


	public boolean isShowGPA() {
		return showGPA;
	}


	public void setShowGPA(boolean showGPA) {
		this.showGPA = showGPA;
	}


	public int getTotalPref() {
		return totalPref;
	}

	public void setTotalPref(int totalPref) {
		this.totalPref = totalPref;
	}

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
	public String getAbbName() {
		return abbName;
	}

	public void setAbbName(String abbName) {
		this.abbName = abbName;
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

	public float getMinGPA() {
		return minGPA;
	}

	public void setMinGPA(float minGPA) {
		this.minGPA = minGPA;
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
