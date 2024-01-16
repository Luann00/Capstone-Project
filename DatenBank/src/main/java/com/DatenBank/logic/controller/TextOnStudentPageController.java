package com.DatenBank.logic.controller;


import java.util.ArrayList; 
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.DatenBank.logic.entity.TextOnStudentPage;
import com.DatenBank.logic.repository.TextOnStudentPageRepository;
import com.DatenBank.logic.service.TextOnStudentPageService;
import org.springframework.web.bind.annotation.PutMapping;


@Controller // This means that this class is a Controller
@CrossOrigin
@RequestMapping("/textOnStudentPage")   
public class TextOnStudentPageController {

    @Autowired
    private TextOnStudentPageService textOnStudentPageService;

    @Autowired
    private TextOnStudentPageRepository textOnStudentPageRepository;

    public TextOnStudentPageController(TextOnStudentPageService textOnStudentPageService) {
        this.textOnStudentPageService = textOnStudentPageService;
    }

    @PostMapping
    public ResponseEntity<TextOnStudentPage> addTextOnStudentPage(@RequestBody TextOnStudentPage textOnStudentPage) {
        textOnStudentPageService.addTextOnStudentPage(textOnStudentPage);
        return new ResponseEntity<>(textOnStudentPage, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTextOnStudentPage(@PathVariable int id) {
        textOnStudentPageService.deleteTextOnStudentPage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<TextOnStudentPage>> getAllTextOnStudentPage() {
        List<TextOnStudentPage> textOnStudentPages = new ArrayList<TextOnStudentPage>();
        textOnStudentPages = textOnStudentPageService.getAllTextOnStudentPage();
        return new ResponseEntity<>(textOnStudentPages, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TextOnStudentPage> getTextOnStudentPageById(@PathVariable int id) {
        Optional<TextOnStudentPage> textOnStudentPage = textOnStudentPageRepository.findById(id);
        if (textOnStudentPage.isPresent()) {
            return new ResponseEntity<>(textOnStudentPage.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<TextOnStudentPage> updateTextOnStudentPage(@PathVariable int id, @RequestBody TextOnStudentPage updatedTextOnStudentPage) {
        try {
            TextOnStudentPage textOnStudentPage = textOnStudentPageService.updateTextOnStudentPage(id, updatedTextOnStudentPage);
            return new ResponseEntity<>(textOnStudentPage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/all")
    public ResponseEntity<?> deleteAllTextOnStudentPage() {
        textOnStudentPageService.deleteAllTextOnStudentPage();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}