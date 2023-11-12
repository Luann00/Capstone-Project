package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.WhitelistStudent;
import com.DatenBank.logic.repository.WhitelistStudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class WhitelistStudentService {
	
	@Autowired
	private WhitelistStudentRepository whitelistStudentRepository;
	
	
	public WhitelistStudentService(WhitelistStudentRepository whitelistStudentRepository) {
        this.whitelistStudentRepository = whitelistStudentRepository;
    }

    public WhitelistStudent addWhitelistStudent(WhitelistStudent student) {
        return whitelistStudentRepository.save(student);
    }

    public void deleteWhitelistStudent(int matrikelnummer) {
    	whitelistStudentRepository.deleteById(matrikelnummer);
    }
    
    public List<WhitelistStudent> getAllWhitelistStudents() {
        return whitelistStudentRepository.findAll();
    }

    public WhitelistStudent updateEntity(int id, WhitelistStudent updatedEntity) {

        WhitelistStudent whitelistEntry = whitelistStudentRepository.findById(id).orElse(null);

        if (whitelistEntry != null) {
            whitelistEntry.setMatrikelnummer(updatedEntity.getMatrikelnummer());
            whitelistEntry.setJahr(updatedEntity.getJahr());

            // Save the updated entity
            return whitelistStudentRepository.save(whitelistEntry);
        } else {
            // Handle the case when the entity with the given ID is not found
            throw new EntityNotFoundException("Entity with ID " + id + " not found");
        }

    }

    public void deleteAllWhitelistStudent() {
    	whitelistStudentRepository.deleteAll();
    }

    

    }
