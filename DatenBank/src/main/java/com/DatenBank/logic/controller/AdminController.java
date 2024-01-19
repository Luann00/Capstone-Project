package com.DatenBank.logic.controller;

import java.util.ArrayList;
import java.util.List;

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

import com.DatenBank.logic.entity.Admin;
import com.DatenBank.logic.service.AdminService;

@Controller 
@CrossOrigin 
@RequestMapping("/admin")
public class AdminController {

	private AdminService adminService;

	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}

	@PostMapping
	public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
		adminService.addAdmin(admin);
		return new ResponseEntity<>(admin, HttpStatus.CREATED);
	}

	@DeleteMapping("/{uniKim}")
	public ResponseEntity<?> deleteAdmin(@PathVariable int uniKim) {
		adminService.deleteAdmin(uniKim);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping
	public ResponseEntity<List<Admin>> getAllAdmin() {
		List<Admin> admin = new ArrayList<Admin>();
		admin = adminService.getAllAdmin();
		return new ResponseEntity<>(admin, HttpStatus.OK);
	}

}
