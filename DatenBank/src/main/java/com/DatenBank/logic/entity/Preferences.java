package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Preferences {
	
	public Preferences() {
		
	}
	
	
	
	
	
	
	
	
	
	
	public Preferences(int matriculationNumber, int preference1, int preference2, int preference3, int preference4,
			int preference5, int preference6, int preference7, int preference8) {
		
		super();
		this.matriculationNumber = matriculationNumber;
		this.preference1 = preference1;
		this.preference2 = preference2;
		this.preference3 = preference3;
		this.preference4 = preference4;
		this.preference5 = preference5;
		this.preference6 = preference6;
		this.preference7 = preference7;
		this.preference8 = preference8;
	}










	@Id
	private int matriculationNumber;
	
	//maximal 8 mögliche präferenzen
	private int preference1;
	private int preference2;
	private int preference3;
	private int preference4;
	private int preference5;
	private int preference6;
	private int preference7;
	private int preference8;
	
	
	
	public int getMatriculationNumber() {
		return matriculationNumber;
	}
	public void setMatriculationNumber(int matriculationNumber) {
		this.matriculationNumber = matriculationNumber;
	}
	public int getPreference1() {
		return preference1;
	}
	public void setPreference1(int preference1) {
		this.preference1 = preference1;
	}
	public int getPreference2() {
		return preference2;
	}
	public void setPreference2(int preference2) {
		this.preference2 = preference2;
	}
	public int getPreference3() {
		return preference3;
	}
	public void setPreference3(int preference3) {
		this.preference3 = preference3;
	}
	public int getPreference4() {
		return preference4;
	}
	public void setPreference4(int preference4) {
		this.preference4 = preference4;
	}
	public int getPreference5() {
		return preference5;
	}
	public void setPreference5(int preference5) {
		this.preference5 = preference5;
	}
	public int getPreference6() {
		return preference6;
	}
	public void setPreference6(int preference6) {
		this.preference6 = preference6;
	}
	public int getPreference7() {
		return preference7;
	}
	public void setPreference7(int preference7) {
		this.preference7 = preference7;
	}
	public int getPreference8() {
		return preference8;
	}
	public void setPreference8(int preference8) {
		this.preference8 = preference8;
	}


	

	

}
