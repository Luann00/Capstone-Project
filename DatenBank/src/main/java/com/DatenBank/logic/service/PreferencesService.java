package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.Preferences;
import com.DatenBank.logic.repository.PreferencesRepository;

@Service
public class PreferencesService {
	
	@Autowired
	private PreferencesRepository preferencesRepository;
	
	
	public PreferencesService(PreferencesRepository preferencesRepository) {
        this.preferencesRepository = preferencesRepository;
    }

    public Preferences addPreference(Preferences preference) {
        return preferencesRepository.save(preference);
    }

    public void deletePreference(int matriculationNumber) {
    	preferencesRepository.deleteById(matriculationNumber);
    }
    
    public List<Preferences> getAllPreferences() {
        return preferencesRepository.findAll();
    }


}
