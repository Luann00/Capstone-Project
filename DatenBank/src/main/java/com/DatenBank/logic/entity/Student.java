package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Student {
	
public Student() {
		
	}
	

	
	
	public Student(int matrikelnummer,String vorName,String nachName,double durchschnitt, String email,int zugeteilteUniversitaet, String titel, String geschlecht) {
		this.matrikelnummer = matrikelnummer;
		this.vorname = vorName;
		this.nachname = nachName;
		this.durchschnitt = durchschnitt;
		this.email = email;
		this.zugeteilteUniversitaet = zugeteilteUniversitaet;
		this.titel = titel;
		this.geschlecht = geschlecht;

		
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




	public int getZugeteilteUniversitaet() {
		return zugeteilteUniversitaet;
	}




	public void setZugeteilteUniversitaet(int zugeteilteUniversitaet) {
		this.zugeteilteUniversitaet = zugeteilteUniversitaet;
	}

	@Id
	private int matrikelnummer; //Primary Key
	
	
	public int getMatrikelnummer() {
		return matrikelnummer;
	}
	public void setMatrikelnummer(int matrikelnummer) {
		this.matrikelnummer = matrikelnummer;
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
	
	public double getDurchschnitt() {
		return durchschnitt;
	}
	public void setDurchschnitt(double durchschnitt) {
		this.durchschnitt = durchschnitt;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
	private String vorname;
	private String nachname;
	private String titel;
	private String geschlecht;
	private double durchschnitt;
	private String email;
	private int zugeteilteUniversitaet;


}

