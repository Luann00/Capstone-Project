package com.DatenBank.logic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class SelectionProcess {

	public SelectionProcess() {

	}

	public SelectionProcess(String startDate, String endDate, int year, int numberOfStudents, int numberOfPreferences,
			int numberOfDeadlineExtension,
			int numberOfUniversities, int deadlineExtensionMinutes, int daysUntilStudentDataDeletion, boolean extended) {

		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.year = year;
		this.numberOfStudents = numberOfStudents;
		this.numberOfPreferences = numberOfPreferences;
		this.numberOfDeadlineExtension = numberOfDeadlineExtension;
		this.numberOfUniversities = numberOfUniversities;
		this.deadlineExtensionMinutes = deadlineExtensionMinutes;
		this.daysUntilStudentDataDeletion = daysUntilStudentDataDeletion;
		this.extended = false;

	}

	@Id
	private int year;

	private int numberOfStudents;
	private int numberOfPreferences; 
	private int numberOfDeadlineExtension; 
	private int numberOfUniversities;
	private int deadlineExtensionMinutes; 
	private int daysUntilStudentDataDeletion; 
	private String startDate; 
	private String endDate; 

	private boolean deletedStudents = false;

	public boolean isDeletedStudents() {
		return deletedStudents;
	}

	public void setDeletedStudents(boolean deletedStudents) {
		this.deletedStudents = deletedStudents;
	}

	//set extended false per default and change it later after deadline got extended once
	private boolean extended = false;

	public boolean isExtended() {
		return extended;
	}

	public void setExtended(boolean extended) {
		this.extended = extended;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getNumberOfStudents() {
		return numberOfStudents;
	}

	public void setNumberOfStudents(int numberOfStudents) {
		this.numberOfStudents = numberOfStudents;
	}

	public int getNumberOfPreferences() {
		return numberOfPreferences;
	}

	public void setNumberOfPreferences(int numberOfPreferences) {
		this.numberOfPreferences = numberOfPreferences;
	}

	public int getNumberOfDeadlineExtension() {
		return numberOfDeadlineExtension;
	}

	public void setNumberOfDeadlineExtension(int numberOfDeadlineExtension) {
		this.numberOfDeadlineExtension = numberOfDeadlineExtension;
	}

	public int getNumberOfUniversities() {
		return numberOfUniversities;
	}

	public void setNumberOfUniversities(int numberOfUniversities) {
		this.numberOfUniversities = numberOfUniversities;
	}

	public int getDeadlineExtensionMinutes() {
		return deadlineExtensionMinutes;
	}

	public void setDeadlineExtensionMinutes(int deadlineExtensionMinutes) {
		this.deadlineExtensionMinutes = deadlineExtensionMinutes;
	}

	public int getDaysUntilStudentDataDeletion() {
		return daysUntilStudentDataDeletion;
	}

	public void setDaysUntilStudentDataDeletion(int daysUntilStudentDataDeletion) {
		this.daysUntilStudentDataDeletion = daysUntilStudentDataDeletion;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

}
