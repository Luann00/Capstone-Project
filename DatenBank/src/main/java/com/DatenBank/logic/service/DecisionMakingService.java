package com.DatenBank.logic.service;

import java.util.List;
import java.util.Map;
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
            assignStudentsBasedOnAvailableSlots(student, availableSlots,university.getUniId(),1);
        }
    }
    
    private void assignSecondPriorityStudent(Student student) {
        List<University> universities = universityRepository.findAll();
    
        for (University university : universities) {
            if (student.getSecondPref() != 0 &&student.getSecondPref() == university.getUniId()) {
                int availableSlots = university.getSlots();
                
        
                assignStudentsBasedOnAvailableSlots(student, availableSlots , university.getUniId(),2);
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
                assignStudentsBasedOnAvailableSlots(student, availableSlots, university.getUniId(),3);
                break; // Break after assigning to the third preference
            }
        }
    }
    
    
    private void assignStudentsBasedOnAvailableSlots(Student student, int availableSlots, int universityId,int priority) {
        University university = universityRepository.findById(universityId).orElse(null);
        List<Student> students = getStudentsWithSamePreference(university,priority);
        if (!students.isEmpty()) {
                 students.sort(Comparator.comparing(Student::getDurchschnitt));
                 double studentDurchschnitt = student.getDurchschnitt();
                 double thresholdDurchschnitt = students.get(availableSlots).getDurchschnitt();
                    if (studentDurchschnitt < thresholdDurchschnitt) {
                        assignStudentToUniversity(student.getMatrikelnummer(), universityId);
                    } else {
                        student.setAssignedUniversity(0);
                    }
    
             
        }
    }
    
    private Map<Integer, List<Student>> groupStudentsByFirstPref() {
        return studentRepository.findAll().stream()
                .collect(Collectors.groupingBy(Student::getFirstPref));
    }

    private Map<Integer, List<Student>> groupStudentsBySecondPref() {
        return studentRepository.findAll().stream()
                .collect(Collectors.groupingBy(Student::getSecondPref));
    }

    private Map<Integer, List<Student>> groupStudentsByThirdPref() {
        return studentRepository.findAll().stream()
                .collect(Collectors.groupingBy(Student::getThirdPref));
    }

    private List<Student> getStudentsWithSamePreference(University university, int priority) {
        int uniId = university.getUniId();
        Map<Integer, List<Student>> studentsByPref;

        switch (priority) {
            case 1:
                studentsByPref = groupStudentsByFirstPref();
                break;
            case 2:
                studentsByPref = groupStudentsBySecondPref();
                break;
            case 3:
                studentsByPref = groupStudentsByThirdPref();
                break;
            default:
                throw new IllegalArgumentException("Invalid priority: " + priority);
        }

        return studentsByPref.getOrDefault(uniId, List.of());
    }


}
