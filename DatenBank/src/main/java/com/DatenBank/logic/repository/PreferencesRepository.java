package com.DatenBank.logic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DatenBank.logic.entity.Preferences;

public interface PreferencesRepository extends JpaRepository<Preferences, Integer> {


}
