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
        student.setAssignedUniversity(university.getUniId());
        studentRepository.save(student);
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
            
            assignStudentsBasedOnAvailableSlots(student, university.getUniId(),1);
        }
    }
    
    private void assignSecondPriorityStudent(Student student) {
        University university = universityRepository.findById(student.getSecondPref()).orElse(null);
    
        if (university != null) {
            assignStudentsBasedOnAvailableSlots(student, university.getUniId(),2);
        }
                
        
                
            
        
    }
    
    private void assignThirdPriorityStudent(Student student) {
       
        University university = universityRepository.findById(student.getThirdPref()).orElse(null);
    
        if (university != null) {
            
           
            assignStudentsBasedOnAvailableSlots(student, university.getUniId(),3);
        }
    }
    
    
    private void assignStudentsBasedOnAvailableSlots(Student student, int universityId, int priority) {
        University university = universityRepository.findById(universityId).orElse(null);
    
        if (university != null) {
            List<Student> students = getStudentsWithSamePreference(university, priority);
            int availableSlots = getAvailableSlotsForEachPriority(university, priority);
    
            if (!students.isEmpty()) {
                students.sort(Comparator.comparing(Student::getDurchschnitt));
    
                if (students.size() >= availableSlots) {
                    double studentDurchschnitt = student.getDurchschnitt();
    
                   
                    int thresholdIndex = Math.min(availableSlots, students.size())-1;
                    double thresholdDurchschnitt = students.get(thresholdIndex).getDurchschnitt();
    
                    if (studentDurchschnitt <= thresholdDurchschnitt) {
                        assignStudentToUniversity(student.getMatrikelnummer(), universityId);
                    } else {
                        assignStudentToUniversity(student.getMatrikelnummer(),0);
                    }
                } else {
                    // If the number of students is less than available slots, assign the student
                    assignStudentToUniversity(student.getMatrikelnummer(), universityId);
                }
            }
        }
    }
    
    
    private Map<Integer, List<Student>> groupStudentsByFirstPref() {
        return studentRepository.findAll().stream()
               .collect(Collectors.groupingBy(Student::getFirstPref));
    }

    private Map<Integer, List<Student>> groupStudentsBySecondPref() {
        return studentRepository.findAll().stream()
        .filter(student -> student.getAssignedUniversity()==student.getFirstPref())               .collect(Collectors.groupingBy(Student::getSecondPref));

    }

    private Map<Integer, List<Student>> groupStudentsByThirdPref() {
        return studentRepository.findAll().stream()
        .filter(student -> student.getAssignedUniversity()==student.getFirstPref()&&student.getAssignedUniversity()==student.getSecondPref()) 
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

    public int getAvailableSlotsForEachPriority(University university, int priority) {
        
        int availableSlots = university.getSlots();
        int slotsLeft;
        switch (priority) {
            case 1:
            slotsLeft= availableSlots;
            break;
            case 2:
            slotsLeft= availableSlots- getStudentsWithSamePreference(university, 1).size();
            break;
            case 3:
slotsLeft= availableSlots- getStudentsWithSamePreference(university, 1).size()- getStudentsWithSamePreference(university, 2).size();

                
                break;
        
            default:
                throw new IllegalArgumentException("Invalid priority: " + priority);
                
        }

        return slotsLeft;
    }

}
