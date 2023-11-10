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

import com.DatenBank.logic.entity.Verwalter;
import com.DatenBank.logic.service.VerwalterService;



@Controller // This means that this class is a Controller
@CrossOrigin // This enables react application to make CRUD requests
@RequestMapping("/verwalter")
public class VerwalterController {
	
	
	private VerwalterService verwalterService;
	
	
	
	@Autowired
	public VerwalterController(VerwalterService verwalterService) {
		this.verwalterService = verwalterService;
	}
	
	@PostMapping
    public ResponseEntity<Verwalter> addVerwalter(@RequestBody Verwalter verwalter) {
        verwalterService.addVerwalter(verwalter);
        return new ResponseEntity<>(verwalter, HttpStatus.CREATED);
    }
	
	
	@DeleteMapping("/{uniKim}")
    public ResponseEntity<?> deleteVerwalter(@PathVariable int uniKim) {
		verwalterService.deleteVerwalter(uniKim);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

	
	
	@GetMapping
	public ResponseEntity<List<Verwalter>> getAllVerwalter() {
	    List<Verwalter> verwalter = new ArrayList<Verwalter>();
	    verwalter = verwalterService.getAllVerwalter();
	    return new ResponseEntity<>(verwalter, HttpStatus.OK);
	}
	

}
