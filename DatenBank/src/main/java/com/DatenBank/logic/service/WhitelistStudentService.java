package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.WhitelistStudent;
import com.DatenBank.logic.repository.WhitelistStudentRepository;

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

}
