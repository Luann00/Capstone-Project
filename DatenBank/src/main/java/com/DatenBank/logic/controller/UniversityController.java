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

import com.DatenBank.logic.entity.University;
import com.DatenBank.logic.service.UniversityService;

@Controller 
@CrossOrigin
@RequestMapping("/university")
public class UniversityController {
	
private UniversityService universityService;
	
	
	
	@Autowired
	public UniversityController(UniversityService universityService) {
		this.universityService = universityService;
	}
	
	@PostMapping
    public ResponseEntity<University> addUniversity(@RequestBody University university) {
		universityService.addUniversity(university);
        return new ResponseEntity<>(university, HttpStatus.CREATED);
    }
	
	
	@DeleteMapping("/{uniId}")
    public ResponseEntity<?> deleteUniversity(@PathVariable int uniId) {
		universityService.deleteUniversity(uniId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

	
	
	@GetMapping
	public ResponseEntity<List<University>> getAllUniversity() {
	    List<University> university = new ArrayList<University>();
	    university = universityService.getAllUniversity();
	    return new ResponseEntity<>(university, HttpStatus.OK);
	}


}