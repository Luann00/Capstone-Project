package com.DatenBank.logic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DatenBank.logic.entity.Admin;
import com.DatenBank.logic.repository.AdminRepository;

@Service
public class AdminService {
	
	
	@Autowired
	private AdminRepository adminRepository;
	
	
	public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public void deleteAdmin(int uniKim) {
    	adminRepository.deleteById(uniKim);
    }
    
    public List<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }


}
