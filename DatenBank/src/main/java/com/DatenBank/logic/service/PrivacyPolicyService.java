package com.DatenBank.logic.service;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.DatenBank.logic.repository.PrivacyPolicyRepository;
import com.DatenBank.logic.entity.PrivacyPolicy;
import java.util.List;
import java.util.Optional;

@Service
public class PrivacyPolicyService {
    @Autowired
    private PrivacyPolicyRepository privacyPolicyRepository;
    
    public List<PrivacyPolicy> getAllPrivacyPolicies() {
        return privacyPolicyRepository.findAll();
    }
    
    public Optional<PrivacyPolicy> getPrivacyPolicyById(int year) {
        return privacyPolicyRepository.findById(year);
    }
    
    public void add(PrivacyPolicy privacyPolicy) {
        privacyPolicyRepository.save(privacyPolicy);
    }

    public void update(int year, PrivacyPolicy privacyPolicy) throws Exception {
        Optional<PrivacyPolicy> optionalPrivacyPolicy = privacyPolicyRepository.findById(year);
        if (optionalPrivacyPolicy.isPresent()) {
            PrivacyPolicy existingPrivacyPolicy = optionalPrivacyPolicy.get();
            existingPrivacyPolicy.setPrivacyPolicy(privacyPolicy.getPrivacyPolicy());
            privacyPolicyRepository.save(existingPrivacyPolicy);
        } else {
            throw new Exception("PrivacyPolicy not found with year: " + year);
        }
        
    }
    
    public void delete(int year) {
        privacyPolicyRepository.deleteById(year);
    }

    public void deleteAll () {
        privacyPolicyRepository.deleteAll();
    }
    
}
