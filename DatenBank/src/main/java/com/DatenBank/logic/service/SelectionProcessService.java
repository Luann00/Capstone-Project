package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.SelectionProcess;
import com.DatenBank.logic.repository.SelectionProcessRepository;

@Service
public class SelectionProcessService {
	
	
	@Autowired
	private SelectionProcessRepository selectionProcessRepository;
	
	
	public SelectionProcessService(SelectionProcessRepository selectionProcessRepository) {
        this.selectionProcessRepository = selectionProcessRepository;
    }

    public SelectionProcess addSelectionProcess(SelectionProcess selectionProcess) {
        return selectionProcessRepository.save(selectionProcess);
    }

    public void deleteSelectionProcess(int year) {
    	selectionProcessRepository.deleteById(year);
    }
    
    public List<SelectionProcess> getAllSelectionProcess() {
        return selectionProcessRepository.findAll();
    }


    

}
