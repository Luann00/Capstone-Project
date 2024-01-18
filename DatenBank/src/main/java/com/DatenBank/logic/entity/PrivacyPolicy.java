package com.DatenBank.logic.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
@Entity
public class PrivacyPolicy {
    @Id
    private int year;
    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    @Column(columnDefinition = "TEXT")
    private String privacyPolicy;

    public String getPrivacyPolicy() {
        return privacyPolicy;
    }

    public void setPrivacyPolicy(String privacyPolicy) {
        this.privacyPolicy = privacyPolicy;
    }

    public PrivacyPolicy(int year, String privacyPolicy) {
        super();
        this.year = year;
        this.privacyPolicy = privacyPolicy;
        
    }
    

}
