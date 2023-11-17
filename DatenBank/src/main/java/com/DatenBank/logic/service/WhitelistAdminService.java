package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.WhitelistAdmin;
import com.DatenBank.logic.repository.WhitelistAdminRepository;

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

    public void deleteWhitelistAdmin(String pkz) {
    	whitelistAdminRepository.deleteById(pkz);
    }
    
    public List<WhitelistAdmin> getAllWhitelistAdmin() {
        return whitelistAdminRepository.findAll();
    }

    public void deleteAllWhitelistAdmin() {
    	whitelistAdminRepository.deleteAll();
    }

}
