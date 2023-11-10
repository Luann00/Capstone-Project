package com.DatenBank.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;




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

}


