package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Student {

	public Student() {

	}

	public Student(int matrikelnummer,
			String vorName,
			String nachName,
			double durchschnitt,
			String email,
			String titel,
			String geschlecht,
			int firstPref,
			int secondPref,
			int thirdPref,
			int assignedUniversity
			) {

		
		this.matrikelnummer = matrikelnummer;
		this.vorname = vorName;
		this.nachname = nachName;
		this.durchschnitt = durchschnitt;
		this.email = email;
		this.titel = titel;
		this.geschlecht = geschlecht;
		this.firstPref = firstPref;
		this.secondPref = secondPref;
		this.thirdPref = thirdPref;
		this.acceptedPolicy = "No";
		this.assignedUniversity = assignedUniversity;	

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

	

	@Id
	private int matrikelnummer; // Primary Key

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

	public int getFirstPref() {
		return firstPref;
	}

	public void setFirstPref(int firstPref) {
		this.firstPref = firstPref;
	}

	public int getSecondPref() {
		return secondPref;
	}

	public void setSecondPref(int secondPref) {
		this.secondPref = secondPref;
	}

	public int getThirdPref() {
		return thirdPref;
	}

	public void setThirdPref(int thirdPref) {
		this.thirdPref = thirdPref;
	}

	private String vorname;
	private String nachname;
	private String titel;
	private String geschlecht;
	private double durchschnitt;
	private String email;
	private int firstPref;
	private int secondPref;
	private int thirdPref;
	private String acceptedPolicy = "No";
	private int assignedUniversity;

	public int getAssignedUniversity() {
		return assignedUniversity;
	}

	public void setAssignedUniversity(int assignedUniversity) {
		this.assignedUniversity = assignedUniversity;
	}

	public String getAcceptedPolicy() {
		return acceptedPolicy;
	}

	public void setAcceptedPolicy(String acceptedPolicy) {
		this.acceptedPolicy = acceptedPolicy;
	}

}
