package com.DatenBank.logic.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.DatenBank.logic.entity.WhitelistAdmin;
import com.DatenBank.logic.entity.WhitelistStudent;
import com.DatenBank.logic.service.WhitelistAdminService;

@Controller // This means that this class is a Controller
@CrossOrigin
@RequestMapping("/whitelistAdmin") // This means URL's start with /demo (after Application path)
public class WhitelistAdminController {
	
	
private WhitelistAdminService whitelistAdminService;
	
	
	
	@Autowired
	public WhitelistAdminController(WhitelistAdminService whitelistAdminService) {
		this.whitelistAdminService = whitelistAdminService;
	}
	
	@PostMapping
    public ResponseEntity<WhitelistAdmin> addAdmin(@RequestBody WhitelistAdmin whitelistAdmin) {
		whitelistAdminService.addWhitelistAdmin(whitelistAdmin);
        return new ResponseEntity<>(whitelistAdmin, HttpStatus.CREATED);
    }
	
	 @PutMapping("/update/{pkz}")
	    public WhitelistAdmin updateEntity(@PathVariable int pkz, @RequestBody WhitelistAdmin updatedEntity) {
	        return whitelistAdminService.updateEntity(pkz, updatedEntity);
	    }
	
	
	@DeleteMapping("/{pkz}")
    public ResponseEntity<?> deleteWhitelistAdmin(@PathVariable int pkz) {
		whitelistAdminService.deleteWhitelistAdmin(pkz);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

	@DeleteMapping("/all")
	public ResponseEntity<?> deleteAllWhitelistAdmin() {
		whitelistAdminService.deleteAllWhitelistAdmin();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

	
	
	@GetMapping
	public ResponseEntity<List<WhitelistAdmin>> getAllWhitelistAdmin() {
	    List<WhitelistAdmin> admin = new ArrayList<WhitelistAdmin>();
	    admin = whitelistAdminService.getAllWhitelistAdmin();
	    return new ResponseEntity<>(admin, HttpStatus.OK);
	}



}
