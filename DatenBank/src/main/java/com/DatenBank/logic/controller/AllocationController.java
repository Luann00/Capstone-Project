package com.DatenBank.logic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.DatenBank.logic.service.DecisionMakingService;

@RestController
@CrossOrigin
@RequestMapping("/allocation")
public class AllocationController {

    @Autowired
    private DecisionMakingService decisionMakingService;

    @PostMapping("/allocateStudentsToUniversities")
    public ResponseEntity<String> allocateStudentsToUniversities() {
        try {
            decisionMakingService.allocateStudentsToUniversities();
            return ResponseEntity.ok("Allocation successful.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during allocation: " + e.getMessage());
        }
    }
}
