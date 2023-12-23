package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class WhitelistAdmin {

	public WhitelistAdmin() {

	}

	public WhitelistAdmin(String pkz, int year) {
		this.pkz = pkz;
		this.year = year;
	}

	@Id
	private String pkz; // Primary Key

	private int year;

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getPkz() {
		return pkz;
	}

	public void setPkz(String pkz) {
		this.pkz = pkz;
	}

}
