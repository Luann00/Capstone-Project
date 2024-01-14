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

    // Priority Schedule Algorithm
    public void allocateStudentsToUniversities() {
        List<Student> students = studentRepository.findAll();
        List<University> universities = universityRepository.findAll();

        for (University university : universities) {
            int availableSlots = university.getSlots();

            // Filter students who selected this university as 1st priority
            List<Student> firstPriorityStudents = students.stream()
                    .filter(student -> student.getAssignedUniversity() == 0
                            && student.getFirstPref() == university.getUniId())
                    .collect(Collectors.toList());

            if (firstPriorityStudents.size() > availableSlots) {
                // Sort by GPA ascendingly (according to German note system)
                firstPriorityStudents.sort(Comparator.comparing(Student::getDurchschnitt));

                // Assign students based on available slots
                for (int i = 0; i < availableSlots; i++) {
                    assignStudentToUniversity(firstPriorityStudents.get(i).getMatrikelnummer(), university.getUniId());
                }
            } else {
                // If available slots are more than 1st priority students, assign them first
                for (Student student : firstPriorityStudents) {
                    assignStudentToUniversity(student.getMatrikelnummer(), university.getUniId());
                }

                int remainingSlots = availableSlots - firstPriorityStudents.size();

                // Filter students who selected this university as 2nd priority
                List<Student> secondPriorityStudents = students.stream()
                        .filter(student -> student.getAssignedUniversity() == 0
                                && student.getSecondPref() == university.getUniId())
                        .collect(Collectors.toList());

                if (secondPriorityStudents.size() > remainingSlots) {
                    // Sort by GPA ascendingly (according to German note system)
                    secondPriorityStudents.sort(Comparator.comparing(Student::getDurchschnitt));

                    // Assign students based on available slots
                    for (int i = 0; i < remainingSlots; i++) {
                        assignStudentToUniversity(secondPriorityStudents.get(i).getMatrikelnummer(),
                                university.getUniId());
                    }
                } else {
                    // If available slots are more than 2nd priority students, assign them first
                    for (Student student : secondPriorityStudents) {
                        assignStudentToUniversity(student.getMatrikelnummer(), university.getUniId());
                    }

                    remainingSlots = remainingSlots - secondPriorityStudents.size();

                    // Filter students who selected this university as 3rd priority
                    List<Student> thirdPriorityStudents = students.stream()
                            .filter(student -> student.getAssignedUniversity() == 0
                                    && student.getThirdPref() == university.getUniId())
                            .collect(Collectors.toList());

                    // Sort by GPA ascendingly (according to German note system)
                    thirdPriorityStudents.sort(Comparator.comparing(Student::getDurchschnitt));

                    // Assign students based on available slots
                    for (int i = 0; i < remainingSlots; i++) {
                        assignStudentToUniversity(thirdPriorityStudents.get(i).getMatrikelnummer(),
                                university.getUniId());
                    }
                }
                ;
            }

        }
    }

    // Get all students who are not assigned to any university
    public List<Student> getUnassignedStudents() {
        return studentRepository.findAll().stream().filter(student -> student.getAssignedUniversity() == 0)
                .collect(Collectors.toList());
    }
}
