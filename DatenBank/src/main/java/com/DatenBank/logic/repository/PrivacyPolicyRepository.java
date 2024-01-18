package com.DatenBank.logic.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.DatenBank.logic.entity.PrivacyPolicy;


public interface PrivacyPolicyRepository extends JpaRepository<PrivacyPolicy, Integer> {
    
}
