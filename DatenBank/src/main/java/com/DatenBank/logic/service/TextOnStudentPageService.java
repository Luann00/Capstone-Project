package com.DatenBank.logic.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.DatenBank.logic.entity.TextOnStudentPage;
import com.DatenBank.logic.repository.TextOnStudentPageRepository;

@Service
public class TextOnStudentPageService {
    @Autowired
    private TextOnStudentPageRepository textOnStudentPageRepository;

    // Logic to manipulate entities
    public TextOnStudentPageService(TextOnStudentPageRepository textOnStudentPageRepository) {
        this.textOnStudentPageRepository = textOnStudentPageRepository;
    }

    public TextOnStudentPage addTextOnStudentPage(TextOnStudentPage textOnStudentPage) {
        return textOnStudentPageRepository.save(textOnStudentPage);
    }

    public void deleteTextOnStudentPage(int id) {
        textOnStudentPageRepository.deleteById(id);
    }

    public List<TextOnStudentPage> getAllTextOnStudentPage() {
        return textOnStudentPageRepository.findAll();
    }

    public void deleteAllTextOnStudentPage() {
        textOnStudentPageRepository.deleteAll();
    }

    public TextOnStudentPage updateTextOnStudentPage(int id, TextOnStudentPage updatedTextOnStudentPage)
            throws Exception {
        // Find the existing textOnStudentPage in the database
        Optional<TextOnStudentPage> optionalTextOnStudentPage = textOnStudentPageRepository.findById(id);
        if (optionalTextOnStudentPage.isPresent()) {
            // If the textOnStudentPage exists, update the fields
            TextOnStudentPage existingTextOnStudentPage = optionalTextOnStudentPage.get();
            existingTextOnStudentPage.setId(updatedTextOnStudentPage.getId());
            existingTextOnStudentPage.setText(updatedTextOnStudentPage.getText());
            existingTextOnStudentPage.setTitel(updatedTextOnStudentPage.getTitel());
            // Save the updated textOnStudentPage back to the database
            return textOnStudentPageRepository.save(existingTextOnStudentPage);
        } else {
            // If the textOnStudentPage is not found throw an exception
            throw new Exception("TextOnStudentPage not found");
        }
    }

}
