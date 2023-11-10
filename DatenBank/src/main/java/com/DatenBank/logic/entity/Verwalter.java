package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Verwalter {
	

	public Verwalter() {
		
	}
	
	
	public Verwalter(int uniKim, String vorname, String nachname, String titel, String geschlecht, String email) {
		this.uniKim = uniKim;
		this.vorname = vorname;
		this.nachname = nachname;
		this.titel = titel;
		this.geschlecht = geschlecht;
		this.email = email;
	}
	
	
	
	
	@Id
	private int uniKim; //Primary Key
	private String vorname;
	private String nachname;
	private String titel;
	private String geschlecht;
	private String email;
	public int getUniKim() {
		return uniKim;
	}
	public void setUniKim(int uniKim) {
		this.uniKim = uniKim;
	}
	public String getVorname() {
		return vorname;
	}
	public void setVorname(String vorname) {
		this.vorname = vorname;
	}
	public String getNachname() {
		return nachname;
	}
	public void setNachname(String nachname) {
		this.nachname = nachname;
	}
	public String getTitel() {
		return titel;
	}
	public void setTitel(String titel) {
		this.titel = titel;
	}
	public String getGeschlecht() {
		return geschlecht;
	}
	public void setGeschlecht(String geschlecht) {
		this.geschlecht = geschlecht;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

}
