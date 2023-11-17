package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class WhitelistAdmin {
	
	
public WhitelistAdmin() {
		
	}
	

	
	
	public WhitelistAdmin(String pkz) {
		this.pkz = pkz;
	}
	


	@Id
	private String pkz; //Primary Key



	public String getPkz() {
		return pkz;
	}




	public void setPkz(String pkz) {
		this.pkz = pkz;
	}
	
	
	



}
