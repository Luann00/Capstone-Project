package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.Verwalter;
import com.DatenBank.logic.repository.VerwalterRepository;

@Service
public class VerwalterService {
	
	
	@Autowired
	private VerwalterRepository verwalterRepository;
	
	
	public VerwalterService(VerwalterRepository verwalterRepository) {
        this.verwalterRepository = verwalterRepository;
    }

    public Verwalter addVerwalter(Verwalter verwalter) {
        return verwalterRepository.save(verwalter);
    }

    public void deleteVerwalter(int uniKim) {
    	verwalterRepository.deleteById(uniKim);
    }
    
    public List<Verwalter> getAllVerwalter() {
        return verwalterRepository.findAll();
    }


}
