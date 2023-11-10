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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.DatenBank.logic.entity.WhitelistStudent;
import com.DatenBank.logic.service.WhitelistStudentService;

@Controller // This means that this class is a Controller
@CrossOrigin
@RequestMapping("/whitelistStudent") // This means URL's start with /demo (after Application path)
public class WhitelistStudentController {
	
	
private WhitelistStudentService whitelistStudentService;
	
	
	
	@Autowired
	public WhitelistStudentController(WhitelistStudentService whitelistStudentService) {
		this.whitelistStudentService = whitelistStudentService;
	}
	
	@PostMapping
    public ResponseEntity<WhitelistStudent> addVerwalter(@RequestBody WhitelistStudent whitelistStudent) {
		whitelistStudentService.addWhitelistStudent(whitelistStudent);
        return new ResponseEntity<>(whitelistStudent, HttpStatus.CREATED);
    }
	
	
	@DeleteMapping("/{matrikelnummer}")
    public ResponseEntity<?> deleteWhitelistStudent(@PathVariable int matrikelnummer) {
		whitelistStudentService.deleteWhitelistStudent(matrikelnummer);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

	
	
	@GetMapping
	public ResponseEntity<List<WhitelistStudent>> getAllWhitelistStudent() {
	    List<WhitelistStudent> students = new ArrayList<WhitelistStudent>();
	    students = whitelistStudentService.getAllWhitelistStudents();
	    return new ResponseEntity<>(students, HttpStatus.OK);
	}

}
