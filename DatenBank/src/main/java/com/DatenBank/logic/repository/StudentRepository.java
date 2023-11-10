package com.DatenBank.logic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DatenBank.logic.entity.Student;


public interface StudentRepository extends JpaRepository<Student, Integer> {
}


