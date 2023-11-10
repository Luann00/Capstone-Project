package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class WhitelistAdmin {
	
	
public WhitelistAdmin() {
		
	}
	

	
	
	public WhitelistAdmin(int pkz) {
		this.pkz = pkz;
	}
	


	@Id
	private int pkz; //Primary Key



	public int getPkz() {
		return pkz;
	}




	public void setPkz(int pkz) {
		this.pkz = pkz;
	}
	
	
	



}
