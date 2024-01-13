package com.DatenBank.logic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.SelectionProcess;
import com.DatenBank.logic.entity.Student;
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

    public void deleteAllProcesses() {
        selectionProcessRepository.deleteAll();
    }


    public SelectionProcess updateProcess(int year, SelectionProcess updatedProcess) throws Exception {
        // Find the existing process in the database
        Optional<SelectionProcess> optionalProcess = selectionProcessRepository.findById(year);

        if (optionalProcess.isPresent()) {
            // If the process exists, update the fields
            SelectionProcess existingProcess = optionalProcess.get();
            existingProcess.setStartDate(updatedProcess.getStartDate());
            existingProcess.setEndDate(updatedProcess.getEndDate());
            existingProcess.setNumberOfStudents(updatedProcess.getNumberOfStudents());
            existingProcess.setNumberOfPreferences(updatedProcess.getNumberOfPreferences());
            existingProcess.setNumberOfDeadlineExtension(updatedProcess.getNumberOfDeadlineExtension());
            existingProcess.setNumberOfUniversities(updatedProcess.getNumberOfUniversities());
            existingProcess.setDeadlineExtensionMinutes(updatedProcess.getDeadlineExtensionMinutes());
            existingProcess.setDaysUntilStudentDataDeletion(updatedProcess.getDaysUntilStudentDataDeletion());
            existingProcess.setExtended(updatedProcess.isExtended());

            // Save the updated process back to the database
            return selectionProcessRepository.save(existingProcess);
        } else {
            throw new Exception("Pross not found with the year: " + year);
        }

    }

}
