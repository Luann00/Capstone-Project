package com.DatenBank.logic.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.DatenBank.logic.entity.Student;
import com.DatenBank.logic.repository.StudentRepository;
import com.DatenBank.logic.entity.University;
import com.DatenBank.logic.repository.UniversityRepository;
import java.util.Comparator;


// This service class is responsible for the logic of assigning students to universities. There are some underlying logic issues which hindered the implementation of the algorithm, but by explaining our approach we hope to show our understanding of the problem and how we would have solved it if we had more time.

@Service
public class DecisionMakingService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UniversityRepository universityRepository;
    // Logic to manipulate entities

    // This method assigns a student to a university based on the student's matrikelnummer and the university's uniId
    public void assignStudentToUniversity(int matrikelnummer, int uniId) {
        Student student = studentRepository.findById(matrikelnummer).orElseThrow();
        University university = universityRepository.findById(uniId).orElseThrow();
        student.setAssignedUniversity(university.getUniId());
        studentRepository.save(student);
    }

    // this method traverse through the list of students and assign them to universities based on their preferences
    public void allocateStudentsToUniversities() {
        List<Student> students = studentRepository.findAll();

        for (Student student : students) {
            // If the student has not been assigned to a university, try to assign them to their first preference
            if (student.getAssignedUniversity() == 0) {
                assignFirstPriorityStudent(student);
            }
            // If after trying to assign them to their first preference, they are still not assigned to a university, try to assign them to their second preference

            if (student.getAssignedUniversity() == 0) {
                assignSecondPriorityStudent(student);
            }
// If after trying to assign them to their second preference, they are still not assigned to a university, try to assign them to their third preference
            if (student.getAssignedUniversity() == 0) {
                assignThirdPriorityStudent(student);
            }
        }
    }

    // This method assigns a student to a university based on their first preference
    private void assignFirstPriorityStudent(Student student) {
        // Get the university based on the student's first preference
        University university = universityRepository.findById(student.getFirstPref()).orElse(null);
// If the university exists, assign the student to the university
        if (university != null) {

            assignStudentsBasedOnAvailableSlots(student, university.getUniId(), 1);
        }
    }

    // This method assigns a student to a university based on their second preference
    private void assignSecondPriorityStudent(Student student) {
        University university = universityRepository.findById(student.getSecondPref()).orElse(null);

        if (university != null) {
            assignStudentsBasedOnAvailableSlots(student, university.getUniId(), 2);
        }

    }

    // This method assigns a student to a university based on their third preference
    private void assignThirdPriorityStudent(Student student) {

        University university = universityRepository.findById(student.getThirdPref()).orElse(null);

        if (university != null) {

            assignStudentsBasedOnAvailableSlots(student, university.getUniId(), 3);
        }
    }


    // This method assigns a student to a university based on the available slots for each priority. It takes in a student, the universityId and the priority as parameters
    private void assignStudentsBasedOnAvailableSlots(Student student, int universityId, int priority) {
        University university = universityRepository.findById(universityId).orElse(null);

        // If the university exists, get the list of students with the same preference and sort them based on their GPA
        if (university != null) {
            List<Student> students = getStudentsWithSamePreference(university, priority);
            // Get the number of available slots for each priority
            int availableSlots = getAvailableSlotsForEachPriority(university, priority);

            // If the list of students is not empty, sort them based on their GPA
            if (!students.isEmpty()) {
                students.sort(Comparator.comparing(Student::getDurchschnitt));
// If the number of students is greater than or equal to the available slots, get the student at the threshold index and compare their GPA with the student to be assigned. If the student to be assigned has a lower GPA(German note system), assign them to the university, else do not assign them to the university
                if (students.size() >= availableSlots) {
                    double studentDurchschnitt = student.getDurchschnitt();

                    int thresholdIndex = Math.min(availableSlots, students.size()) - 1;
                    double thresholdDurchschnitt = students.get(thresholdIndex).getDurchschnitt();

                    if (studentDurchschnitt <= thresholdDurchschnitt) {
                        assignStudentToUniversity(student.getMatrikelnummer(), universityId);
                    } else {
                        assignStudentToUniversity(student.getMatrikelnummer(), 0);
                    }
                } else {
                    // If the number of students is less than available slots, assign the student
                    assignStudentToUniversity(student.getMatrikelnummer(), universityId);
                }
            }
        }
    }


    //This method groups students based on their first preference
    private Map<Integer, List<Student>> groupStudentsByFirstPref() {
        return studentRepository.findAll().stream()
                .collect(Collectors.groupingBy(Student::getFirstPref));
    }

    // This method groups students based on their second preference, filtering out students who have been assigned to their first preference
    private Map<Integer, List<Student>> groupStudentsBySecondPref() {
        return studentRepository.findAll().stream()
                .filter(student -> student.getAssignedUniversity() == student.getFirstPref())
                .collect(Collectors.groupingBy(Student::getSecondPref));

    }

    // This method groups students based on their third preference, filtering out students who have been assigned to their first and second preference
    private Map<Integer, List<Student>> groupStudentsByThirdPref() {
        return studentRepository.findAll().stream()
                .filter(student -> student.getAssignedUniversity() == student.getFirstPref()
                        && student.getAssignedUniversity() == student.getSecondPref())
                .collect(Collectors.groupingBy(Student::getThirdPref));
    }

    // This method returns a list of students with the same preference. It takes in a university and a priority as parameters
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

    // This method returns the number of available slots for each priority. It takes in a university and a priority as parameters
    public int getAvailableSlotsForEachPriority(University university, int priority) {

        int availableSlots = university.getSlots();
        int slotsLeft;
        // If the university has no slots left, return 0

        //based on the priority and the number of students with the same preference, calculate the number of slots left
        switch (priority) {
            // If the priority is 1, return the number of available slots( students with first preference can be assigned to the university first, hence all slots are available)
            case 1:
                slotsLeft = availableSlots;
                break;
            // If the priority is 2, return the number of available slots minus the number of students with the same first preference
            case 2:
                slotsLeft = availableSlots - getStudentsWithSamePreference(university, 1).size();
                break;
                // If the priority is 3, return the number of available slots minus the number of students with the same first preference and the number of students with the same second preference
            case 3:
                slotsLeft = availableSlots - getStudentsWithSamePreference(university, 1).size()
                        - getStudentsWithSamePreference(university, 2).size();

                break;

            default:
                throw new IllegalArgumentException("Invalid priority: " + priority);

        }

        return slotsLeft;
    }

}
