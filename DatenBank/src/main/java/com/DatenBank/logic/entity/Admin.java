package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Admin {
	

	public Admin() {
		
	}
	
	
	
	
	
	
	
	public Admin(int uniKim, String name, String surname, String title, String sex, String email) {
		super();
		this.uniKim = uniKim;
		this.name = name;
		this.surname = surname;
		this.title = title;
		this.sex = sex;
		this.email = email;
	}







	@Id
	private int uniKim; //Primary Key
	private String name;
	private String surname;
	private String title;
	private String sex;
	private String email;
	public int getUniKim() {
		return uniKim;
	}







	public void setUniKim(int uniKim) {
		this.uniKim = uniKim;
	}







	public String getName() {
		return name;
	}







	public void setName(String name) {
		this.name = name;
	}







	public String getSurname() {
		return surname;
	}







	public void setSurname(String surname) {
		this.surname = surname;
	}







	public String getTitle() {
		return title;
	}







	public void setTitle(String title) {
		this.title = title;
	}







	public String getSex() {
		return sex;
	}







	public void setSex(String sex) {
		this.sex = sex;
	}







	public String getEmail() {
		return email;
	}







	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
	

}
