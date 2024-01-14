package com.DatenBank.logic.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.DatenBank.logic.entity.Student;
import com.DatenBank.logic.repository.StudentRepository;
import com.DatenBank.logic.entity.University;
import com.DatenBank.logic.repository.UniversityRepository;
import java.util.Comparator;

@Service
public class DecisionMakingService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UniversityRepository universityRepository;
    // Logic to manipulate entities

    public void assignStudentToUniversity(int matrikelnummer, int uniId) {
        Student student = studentRepository.findById(matrikelnummer).orElseThrow();
        University university = universityRepository.findById(uniId).orElseThrow();
        updateAvailableSlots(university);

        student.setAssignedUniversity(university.getUniId());
        studentRepository.save(student);
    }

    private void updateAvailableSlots(University university) {
        university.setSlots(university.getSlots() - 1);
        universityRepository.save(university);
    }

    public void allocateStudentsToUniversities() {
        List<Student> students = studentRepository.findAll();
    
        for (Student student : students) {
if(student.getAssignedUniversity()==0){
                assignFirstPriorityStudent(student);
}
    
            if (student.getAssignedUniversity()==0) {
                assignSecondPriorityStudent(student);
            }
    
            if (student.getAssignedUniversity() == 0
            ) {
                assignThirdPriorityStudent(student);
            }
        }
    }
    
    private void assignFirstPriorityStudent(Student student) {
        University university = universityRepository.findById(student.getFirstPref()).orElse(null);
    
        if (university != null) {
            int availableSlots = university.getSlots();
           
            List<Student> firstPriorityStudents = List.of(student);
            assignStudentsBasedOnAvailableSlots(firstPriorityStudents, availableSlots,university.getUniId());
        }
    }
    
    private void assignSecondPriorityStudent(Student student) {
        List<University> universities = universityRepository.findAll();
    
        for (University university : universities) {
            if (student.getSecondPref() != 0 &&student.getSecondPref() == university.getUniId()) {
                int availableSlots = university.getSlots();
                
                
    
                List<Student> secondPriorityStudents = List.of(student);
                assignStudentsBasedOnAvailableSlots(secondPriorityStudents, availableSlots , university.getUniId());
                break; // Break after assigning to the second preference
            }
        }
    }
    
    private void assignThirdPriorityStudent(Student student) {
        List<University> universities = universityRepository.findAll();
    
        for (University university : universities) {
            if (student.getFirstPref() != 0 &&student.getThirdPref() == university.getUniId()) {
                int availableSlots = university.getSlots();
               
    
                List<Student> thirdPriorityStudents = List.of(student);
                assignStudentsBasedOnAvailableSlots(thirdPriorityStudents, availableSlots, university.getUniId());
                break; // Break after assigning to the third preference
            }
        }
    }
    
    
    private void assignStudentsBasedOnAvailableSlots(List<Student> students, int availableSlots, int universityId) {
        if (!students.isEmpty()) {
            if (students.size() > availableSlots) {
                students.sort(Comparator.comparing(Student::getDurchschnitt));
    
                for (int i = 0; i < availableSlots; i++) {
                    assignStudentToUniversity(students.get(i).getMatrikelnummer(), universityId);
                }
            } else {
                for (Student student : students) {
                    assignStudentToUniversity(student.getMatrikelnummer(), universityId);
                }
            }
        }
    }
    
    private List<Student> getAssignedStudentsByPriority(University university, int priority) {
        return studentRepository.findAll().stream()
                .filter(student -> student.getAssignedUniversity() == university.getUniId()
                        && getPriorityPref(student) == priority)
                .collect(Collectors.toList());
    }
    
    private int getPriorityPref(Student student) {
        if (student.getFirstPref() == student.getAssignedUniversity()) {
            return 1;
        } else if (student.getSecondPref() == student.getAssignedUniversity()) {
            return 2;
        } else if (student.getThirdPref() == student.getAssignedUniversity()) {
            return 3;
        } else {
            return 0; // No preference assigned
        }
    }
    


}
