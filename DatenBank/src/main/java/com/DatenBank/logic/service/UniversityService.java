package com.DatenBank.logic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.Student;
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

    public void deleteAllUniversities() {
        universityRepository.deleteAll();
    }

    public University updateUniversity(int uniId, University updatedUniversity) throws Exception {
        // Find the existing university in the database
        Optional<University> optionalUniversity = universityRepository.findById(uniId);

        if (optionalUniversity.isPresent()) {
            // If the university exists, update the fields
            University existingUniversity = optionalUniversity.get();
            existingUniversity.setUniId(updatedUniversity.getUniId());
            existingUniversity.setName(updatedUniversity.getName());
            existingUniversity.setAbbName(updatedUniversity.getAbbName());
            existingUniversity.setCountry(updatedUniversity.getCountry());
            existingUniversity.setCity(updatedUniversity.getCity());
            existingUniversity.setMinGPA(updatedUniversity.getMinGPA());
            existingUniversity.setSlots(updatedUniversity.getSlots());
            existingUniversity.setFirstPref(updatedUniversity.getFirstPref());
            existingUniversity.setTotalPref(updatedUniversity.getTotalPref());
            existingUniversity.setUniLink(updatedUniversity.getUniLink());
            existingUniversity.setFaculty(updatedUniversity.getFaculty());

            // Save the updated university back to the database
            return universityRepository.save(existingUniversity);
        } else {
            // If the university is not found throw an exception
            throw new Exception("Student not found with matrikelnummer: " + uniId);
        }

    }


    public void updateAllShowGPA(boolean showGPA) {
        List<University> universities = universityRepository.findAll();
    
        for (University university : universities) {
            university.setShowGPA(showGPA);
            universityRepository.save(university);
        }
    }

    public University getUniversityById(int uniId) {
        Optional<University> optionalUniversity = universityRepository.findById(uniId);
        return optionalUniversity.orElse(null);
    }

}
