package com.DatenBank.logic.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.Student;
import com.DatenBank.logic.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(int matrikelnummer) {
        studentRepository.deleteById(matrikelnummer);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void deleteAllStudents() {
        studentRepository.deleteAll();
    }

    public Student updateStudent(int matrikelnummer, Student updatedStudent) throws Exception {
        // Find the existing student in the database
        Optional<Student> optionalStudent = studentRepository.findById(matrikelnummer);

        if (optionalStudent.isPresent()) {
            // If the student exists, update the fields
            Student existingStudent = optionalStudent.get();
            existingStudent.setVorname(updatedStudent.getVorname());
            existingStudent.setNachname(updatedStudent.getNachname());
            existingStudent.setTitel(updatedStudent.getTitel());
            existingStudent.setGeschlecht(updatedStudent.getGeschlecht());
            existingStudent.setDurchschnitt(updatedStudent.getDurchschnitt());
            existingStudent.setEmail(updatedStudent.getEmail());
            existingStudent.setFirstPref(updatedStudent.getFirstPref());
            existingStudent.setSecondPref(updatedStudent.getSecondPref());
            existingStudent.setThirdPref(updatedStudent.getThirdPref());

            // Save the updated student back to the database
            return studentRepository.save(existingStudent);
        } else {
            // If the student is not found, you may choose to throw an exception or handle
            // it as needed
            throw new Exception("Student not found with matrikelnummer: " + matrikelnummer);
        }

    }
    
    
    public Student updateStudentPriorities(int matrikelnummer, Map<String, Integer> newPriorities) throws Exception {
    	
    	// Find the existing student in the database
        Optional<Student> optionalStudent = studentRepository.findById(matrikelnummer);
        
        if (optionalStudent.isPresent()) {
            // If the student exists, update the fields
            Student existingStudent = optionalStudent.get();
            existingStudent.setFirstPref(newPriorities.get("firstPref"));
            existingStudent.setSecondPref(newPriorities.get("secondPref"));
            existingStudent.setThirdPref(newPriorities.get("thirdPref"));
            // Save the updated student back to the database
            return studentRepository.save(existingStudent);
    } else {
        // If the student is not found, you may choose to throw an exception or handle
        // it as needed
        throw new Exception("Student not found with matrikelnummer: " + matrikelnummer);
    }
}
    
}
