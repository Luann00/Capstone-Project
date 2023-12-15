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

import com.DatenBank.logic.entity.SelectionProcess;
import com.DatenBank.logic.entity.Student;
import com.DatenBank.logic.service.SelectionProcessService;

@Controller // This means that this class is a Controller
@CrossOrigin
@RequestMapping("/selectionProcess")
public class SelectionProcessController {

	@Autowired
	private SelectionProcessService selectionProcessService;

	public SelectionProcessController(SelectionProcessService selectionProcessService) {
		this.selectionProcessService = selectionProcessService;
	}

	@PostMapping
	public ResponseEntity<SelectionProcess> addSelectionProcess(@RequestBody SelectionProcess selectionProcess) {
		selectionProcessService.addSelectionProcess(selectionProcess);
		return new ResponseEntity<>(selectionProcess, HttpStatus.CREATED);
	}

	@DeleteMapping("/{year}")
	public ResponseEntity<?> deleteSelectionProcess(@PathVariable int year) {
		selectionProcessService.deleteSelectionProcess(year);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PutMapping("/{year}")
	public ResponseEntity<SelectionProcess> updateProcess(
			@PathVariable int year,
			@RequestBody SelectionProcess updatedProcess) {

		try {
			SelectionProcess result = selectionProcessService.updateProcess(year, updatedProcess);
			return ResponseEntity.ok(result);
		} catch (ClassNotFoundException e) {
			// Handle not found exception
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			// Handle other exceptions
			return ResponseEntity.status(500).build();
		}
	}

	@GetMapping
	public ResponseEntity<List<SelectionProcess>> getAllSelectionProcess() {
		List<SelectionProcess> selectionProcess = new ArrayList<SelectionProcess>();
		selectionProcess = selectionProcessService.getAllSelectionProcess();
		return new ResponseEntity<>(selectionProcess, HttpStatus.OK);
	}


	@DeleteMapping("/all")
	public ResponseEntity<?> deleteAllProcesses() {
		selectionProcessService.deleteAllProcesses();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
