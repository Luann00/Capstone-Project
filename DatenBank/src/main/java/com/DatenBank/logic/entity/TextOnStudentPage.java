package com.DatenBank.logic.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;  
import jakarta.persistence.Column;
@Entity
public class TextOnStudentPage {
    @Id
    private int id;
    @Column(columnDefinition = "TEXT")
    private String text;
    @Column(columnDefinition = "TEXT")
    private String titel;
    public String getTitel() {
        return titel;
    }
    public void setTitel(String titel) {
        this.titel = titel;
    }
    public TextOnStudentPage() {
        
    }
    public TextOnStudentPage(int id, String text,String titel) {
        super();
        this.id = id;
        this.text = text;
        this.titel=titel;
    }
    public int getId() {
        return id;
    }
    public String getText() {
        return text;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setText(String text) {
        this.text = text;
    }

   

    
}
