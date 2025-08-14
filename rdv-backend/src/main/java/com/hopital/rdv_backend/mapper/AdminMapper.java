package com.hopital.rdv_backend.mapper;

import com.hopital.rdv_backend.dto.AdminDTO;
import com.hopital.rdv_backend.entity.Admin;

public class AdminMapper {
    public static AdminDTO toDTO(Admin admin) {
        if (admin == null) return null;
        AdminDTO dto = new AdminDTO();
        dto.setId(admin.getId());
        dto.setNom(admin.getNom());
        dto.setPrenom(admin.getPrenom());
        dto.setEmail(admin.getEmail());
        dto.setNiveauAcces(admin.getNiveauAcces() != null ? admin.getNiveauAcces().name() : null);
        dto.setDatePriseFonction(admin.getDatePriseFonction());
        dto.setMotDePasse(admin.getMotDePasse()); // Ajout du mot de passe
        return dto;
    }

    public static Admin toEntity(AdminDTO dto) {
        if (dto == null) return null;
        Admin admin = new Admin();
        admin.setId(dto.getId());
        admin.setNom(dto.getNom());
        admin.setPrenom(dto.getPrenom());
        admin.setEmail(dto.getEmail());
        if (dto.getNiveauAcces() != null) admin.setNiveauAcces(Admin.NiveauAcces.valueOf(dto.getNiveauAcces()));
        admin.setDatePriseFonction(dto.getDatePriseFonction());
        admin.setMotDePasse(dto.getMotDePasse());
        admin.setRole(com.hopital.rdv_backend.entity.Utilisateur.Role.ADMIN); // Fixe le rôle
        return admin;
    }
} 