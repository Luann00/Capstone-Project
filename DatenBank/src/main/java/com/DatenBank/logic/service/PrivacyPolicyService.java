package com.DatenBank.logic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.DatenBank.logic.entity.PrivacyPolicy;
import com.DatenBank.logic.repository.PrivacyPolicyRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PrivacyPolicyService {

    @Autowired
    private PrivacyPolicyRepository privacyPolicyRepository;

    // Logic to manipulate entities
    public PrivacyPolicyService(PrivacyPolicyRepository privacyPolicyRepository) {
        this.privacyPolicyRepository = privacyPolicyRepository;
    }

    public PrivacyPolicy addPrivacyPolicy(PrivacyPolicy privacyPolicy) {
        return privacyPolicyRepository.save(privacyPolicy);
    }

    public void deletePrivacyPolicy(int year) {
        privacyPolicyRepository.deleteById(year);
    }

    public List<PrivacyPolicy> getAllPrivacyPolicies() {
        return privacyPolicyRepository.findAll();
    }

    public void deleteAllPrivacyPolicies() {
        privacyPolicyRepository.deleteAll();
    }

    public PrivacyPolicy updatePrivacyPolicy(int year, PrivacyPolicy updatedPrivacyPolicy) throws Exception {
        // Find the existing privacyPolicy in the database
        Optional<PrivacyPolicy> optionalPrivacyPolicy = privacyPolicyRepository.findById(year);
        if (optionalPrivacyPolicy.isPresent()) {
            // If the privacyPolicy exists, update the fields
            PrivacyPolicy existingPrivacyPolicy = optionalPrivacyPolicy.get();
            existingPrivacyPolicy.setPrivacyPolicy(updatedPrivacyPolicy.getPrivacyPolicy());
            // Save the updated privacyPolicy back to the database
            return privacyPolicyRepository.save(existingPrivacyPolicy);
        } else {
            // If the privacyPolicy is not found throw an exception
            throw new Exception("PrivacyPolicy not found with year: " + year);
        }
    }

    public Optional<PrivacyPolicy> getPrivacyPolicyById(int year) {
        return privacyPolicyRepository.findById(year);
    }
}
