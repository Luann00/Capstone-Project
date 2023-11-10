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

import com.DatenBank.logic.entity.Preferences;
import com.DatenBank.logic.service.PreferencesService;

@Controller // This means that this class is a Controller
@CrossOrigin
@RequestMapping("/preferences") // This means URL's start with /demo (after Application path)
public class PreferencesController {
	
private PreferencesService preferencesService;
	
	
	
	@Autowired
	public PreferencesController(PreferencesService preferencesService) {
		this.preferencesService = preferencesService;
	}
	
	@PostMapping
    public ResponseEntity<Preferences> addPreference(@RequestBody Preferences preferences) {
		preferencesService.addPreference(preferences);
        return new ResponseEntity<>(preferences, HttpStatus.CREATED);
    }
	
	
	@DeleteMapping("/{matriculationNumber}")
    public ResponseEntity<?> deletePreferences(@PathVariable int matriculationNumber) {
		preferencesService.deletePreference(matriculationNumber);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

	
	
	@GetMapping
	public ResponseEntity<List<Preferences>> getAllPreferences() {
	    List<Preferences> preferences = new ArrayList<Preferences>();
	    preferences = preferencesService.getAllPreferences();
	    return new ResponseEntity<>(preferences, HttpStatus.OK);
	}


}
