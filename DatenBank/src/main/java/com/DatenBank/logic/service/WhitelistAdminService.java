package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.WhitelistAdmin;
import com.DatenBank.logic.repository.WhitelistAdminRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class WhitelistAdminService {

    @Autowired
    private WhitelistAdminRepository whitelistAdminRepository;

    public WhitelistAdminService(WhitelistAdminRepository whitelistAdminRepository) {
        this.whitelistAdminRepository = whitelistAdminRepository;
    }

    public WhitelistAdmin addWhitelistAdmin(WhitelistAdmin whitelistAdmin) {
        return whitelistAdminRepository.save(whitelistAdmin);
    }

    public void deleteWhitelistAdmin(int pkz) {
        whitelistAdminRepository.deleteById(pkz);
    }

    public WhitelistAdmin updateEntity(int pkz, WhitelistAdmin updatedEntity) {

        WhitelistAdmin whitelistEntry = whitelistAdminRepository.findById(pkz).orElse(null);

        if (whitelistEntry != null) {
            whitelistEntry.setPkz(updatedEntity.getPkz());
            whitelistEntry.setYear(updatedEntity.getYear());

            // Save the updated entity
            return whitelistAdminRepository.save(whitelistEntry);
        } else {
            // Handle the case when the entity with the given ID is not found
            throw new EntityNotFoundException("Entity with ID " + pkz + " not found");
        }

    }

    public List<WhitelistAdmin> getAllWhitelistAdmin() {
        return whitelistAdminRepository.findAll();
    }

    public void deleteAllWhitelistAdmin() {
        whitelistAdminRepository.deleteAll();
    }

}
