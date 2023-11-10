package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.University;
import com.DatenBank.logic.repository.UniversityRepository;

@Service
public class UniversityService {
	
	@Autowired
	private UniversityRepository universityRepository;
	
	
	public UniversityService(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    public University addUniversity(University university) {
        return universityRepository.save(university);
    }

    public void deleteUniversity(int uniId) {
    	universityRepository.deleteById(uniId);
    }
    
    public List<University> getAllUniversity() {
        return universityRepository.findAll();
    }


}
