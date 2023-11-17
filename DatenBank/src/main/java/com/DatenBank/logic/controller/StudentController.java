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

import com.DatenBank.logic.entity.Student;
import com.DatenBank.logic.service.StudentService;




@Controller // This means that this class is a Controller
@CrossOrigin
@RequestMapping("/student") // This means URL's start with /demo (after Application path)
public class StudentController {
	
	
	@Autowired
	private StudentService studentService;
	
	public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
	
	@PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        studentService.addStudent(student);
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }
	
	
	@DeleteMapping("/{matrikelnummer}")
    public ResponseEntity<?> deleteStudent(@PathVariable int matrikelnummer) {
        studentService.deleteStudent(matrikelnummer);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

	
	
	@GetMapping
	public ResponseEntity<List<Student>> getAllStudents() {
	    List<Student> students = new ArrayList<Student>();
	    students = studentService.getAllStudents();
	    return new ResponseEntity<>(students, HttpStatus.OK);
	}
	
	

}
