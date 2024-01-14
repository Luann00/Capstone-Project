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

        student.setAssignedUniversity(university.getUniId());
        studentRepository.save(student);
    }

    public void allocateStudentsToUniversities() {
        List<Student> students = studentRepository.findAll();
    
        for (Student student : students) {
            
                assignFirstPriorityStudent(student);
            
    
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
        List<University> universities = universityRepository.findAll();
    
        for (University university : universities) {
            if (student.getFirstPref() != 0 &&student.getFirstPref() == university.getUniId()) {
                int availableSlots = university.getSlots();
                List<Student> firstPriorityAssignedStudents = getAssignedStudentsByPriority(university, 1);
    
                List<Student> firstPriorityStudents = List.of(student);
                assignStudentsBasedOnAvailableSlots(firstPriorityStudents, availableSlots - firstPriorityAssignedStudents.size(), university.getUniId());
                break; // Break after assigning to the first preference
            }
        }
    }
    
    private void assignSecondPriorityStudent(Student student) {
        List<University> universities = universityRepository.findAll();
    
        for (University university : universities) {
            if (student.getSecondPref() != 0 &&student.getSecondPref() == university.getUniId()) {
                int availableSlots = university.getSlots();
                List<Student> firstPriorityAssignedStudents = getAssignedStudentsByPriority(university, 1);
                List<Student> secondPriorityAssignedStudents = getAssignedStudentsByPriority(university, 2);
    
                List<Student> secondPriorityStudents = List.of(student);
                assignStudentsBasedOnAvailableSlots(secondPriorityStudents, availableSlots - firstPriorityAssignedStudents.size() - secondPriorityAssignedStudents.size(), university.getUniId());
                break; // Break after assigning to the second preference
            }
        }
    }
    
    private void assignThirdPriorityStudent(Student student) {
        List<University> universities = universityRepository.findAll();
    
        for (University university : universities) {
            if (student.getFirstPref() != 0 &&student.getThirdPref() == university.getUniId()) {
                int availableSlots = university.getSlots();
                List<Student> firstPriorityAssignedStudents = getAssignedStudentsByPriority(university, 1);
                List<Student> secondPriorityAssignedStudents = getAssignedStudentsByPriority(university, 2);
    
                List<Student> thirdPriorityStudents = List.of(student);
                assignStudentsBasedOnAvailableSlots(thirdPriorityStudents, availableSlots - firstPriorityAssignedStudents.size() - secondPriorityAssignedStudents.size(), university.getUniId());
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
