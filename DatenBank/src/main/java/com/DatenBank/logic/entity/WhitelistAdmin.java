package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class WhitelistAdmin {

	public WhitelistAdmin() {

	}

	public WhitelistAdmin(int pkz, int year) {
		this.pkz = pkz;
		this.year = year;
	}

	@Id
	private int pkz; // Primary Key

	private int year;
	

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getPkz() {
		return pkz;
	}

	public void setPkz(int pkz) {
		this.pkz = pkz;
	}

}
