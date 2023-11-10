package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class WhitelistStudent {
	
	
public WhitelistStudent() {
		
	}
	

	
	
	public WhitelistStudent(int matrikelnummer,int jahr) {
		this.matrikelnummer = matrikelnummer;
		this.jahr = jahr;

		
	}
	


	@Id
	private int matrikelnummer; //Primary Key
	
	private int jahr;
	
	
	public int getJahr() {
		return jahr;
	}




	public void setJahr(int jahr) {
		this.jahr = jahr;
	}




	public int getMatrikelnummer() {
		return matrikelnummer;
	}
	public void setMatrikelnummer(int matrikelnummer) {
		this.matrikelnummer = matrikelnummer;
	}
	



}
