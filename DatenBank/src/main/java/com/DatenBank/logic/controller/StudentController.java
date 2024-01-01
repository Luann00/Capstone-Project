package com.DatenBank.logic.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

import com.DatenBank.logic.entity.Student;
import com.DatenBank.logic.repository.StudentRepository;
import com.DatenBank.logic.service.StudentService;

@Controller // This means that this class is a Controller
@CrossOrigin
@RequestMapping("/student")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@Autowired
	private StudentRepository studentRepository;

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

	@DeleteMapping("/all")
	public ResponseEntity<?> deleteAllStudents() {
		studentService.deleteAllStudents();
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PutMapping("/{matrikelnummer}")
	public ResponseEntity<Student> updateStudent(
			@PathVariable int matrikelnummer,
			@RequestBody Student updatedStudent) {

		try {
			Student result = studentService.updateStudent(matrikelnummer, updatedStudent);
			return ResponseEntity.ok(result);
		} catch (ClassNotFoundException e) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}

	@PutMapping("/{matrikelnummer}/updatePriorities")
	public ResponseEntity<Student> updateStudentPriorities(
			@PathVariable int matrikelnummer,
			@RequestBody Map<String, Integer> newPriorities) {

		try {
			Student result = studentService.updateStudentPriorities(matrikelnummer, newPriorities);
			return ResponseEntity.ok(result);
		} catch (ClassNotFoundException e) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}

	}

	@PutMapping("/{matrikelnummer}/updateAccepted")
	public ResponseEntity<Student> updateStudentPriorities(@PathVariable int matrikelnummer) {
		try {
			Student result = studentService.updateAccepted(matrikelnummer);
			return ResponseEntity.ok(result);
		} catch (ClassNotFoundException e) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}

	@GetMapping("/{matrikelnummer}/priorities")

	public ResponseEntity<Map<String, Integer>> getStudentPriorities(@PathVariable int matrikelnummer) {
		Optional<Student> optionalStudent = studentRepository.findById(matrikelnummer);

		if (optionalStudent.isPresent()) {
			Student student = optionalStudent.get();
			Map<String, Integer> priorities = new HashMap<>();
			priorities.put("firstPref", student.getFirstPref());
			priorities.put("secondPref", student.getSecondPref());
			priorities.put("thirdPref", student.getThirdPref());
			return ResponseEntity.ok(priorities);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
