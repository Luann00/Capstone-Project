package com.DatenBank.logic.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RequestMapping;
import com.DatenBank.logic.service.PrivacyPolicyService;
import com.DatenBank.logic.repository.PrivacyPolicyRepository;
import com.DatenBank.logic.entity.PrivacyPolicy;


@Controller
@CrossOrigin
@RequestMapping("/privacyPolicy")
public class PrivacyPolicyController {
    @Autowired
    private PrivacyPolicyService privacyPolicyService;
    @Autowired
    private PrivacyPolicyRepository privacyPolicyRepository;


    public PrivacyPolicyController(PrivacyPolicyService privacyPolicyService) {
        this.privacyPolicyService = privacyPolicyService;
    }

    @PostMapping
    public ResponseEntity<PrivacyPolicy> addPrivacyPolicy(@RequestBody PrivacyPolicy privacyPolicy) {
        privacyPolicyService.add(privacyPolicy);
        return new ResponseEntity<>(privacyPolicy, HttpStatus.CREATED);
    }

    @DeleteMapping("/{year}")
    public ResponseEntity<?> deletePrivacyPolicy(@PathVariable int year) {
        privacyPolicyService.delete(year);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{year}")
    public ResponseEntity<PrivacyPolicy> getPrivacyPolicyById(@PathVariable int year) {
        Optional<PrivacyPolicy> optionalPrivacyPolicy = privacyPolicyService.getPrivacyPolicyById(year);
        if (optionalPrivacyPolicy.isPresent()) {
            PrivacyPolicy privacyPolicy = optionalPrivacyPolicy.get();
            return new ResponseEntity<>(privacyPolicy, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{year}")
    public ResponseEntity<PrivacyPolicy> updatePrivacyPolicy(@PathVariable int year, @RequestBody PrivacyPolicy privacyPolicy) throws Exception {
        privacyPolicyService.update(year, privacyPolicy);
        return new ResponseEntity<>(privacyPolicy, HttpStatus.OK);
    }


}

