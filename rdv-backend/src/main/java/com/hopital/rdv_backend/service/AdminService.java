package com.hopital.rdv_backend.service;

import com.hopital.rdv_backend.dto.AdminDTO;
import com.hopital.rdv_backend.entity.Admin;
import com.hopital.rdv_backend.entity.Admin.NiveauAcces;
import com.hopital.rdv_backend.mapper.AdminMapper;
import com.hopital.rdv_backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<AdminDTO> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(AdminMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<AdminDTO> getAdminById(Long id) {
        return adminRepository.findById(id).map(AdminMapper::toDTO);
    }

    public Optional<AdminDTO> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email).map(AdminMapper::toDTO);
    }

    public List<AdminDTO> getAdminsByNiveauAcces(NiveauAcces niveauAcces) {
        return adminRepository.findByNiveauAcces(niveauAcces).stream()
                .map(AdminMapper::toDTO)
                .collect(Collectors.toList());
    }

    public AdminDTO createAdmin(AdminDTO adminDTO) {
        Admin admin = AdminMapper.toEntity(adminDTO);
        return AdminMapper.toDTO(adminRepository.save(admin));
    }

    public Optional<AdminDTO> updateAdmin(Long id, AdminDTO adminDTO) {
        return adminRepository.findById(id).map(existing -> {
            Admin updated = AdminMapper.toEntity(adminDTO);
            updated.setId(id);
            return AdminMapper.toDTO(adminRepository.save(updated));
        });
    }

    public boolean deleteAdmin(Long id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 