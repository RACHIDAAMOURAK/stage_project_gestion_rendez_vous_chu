package com.hopital.rdv_backend.mapper;

import com.hopital.rdv_backend.dto.UtilisateurDTO;
import com.hopital.rdv_backend.entity.Utilisateur;

public class UtilisateurMapper {
    public static UtilisateurDTO toDTO(Utilisateur utilisateur) {
        if (utilisateur == null) return null;
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setEmail(utilisateur.getEmail());
        dto.setRole(utilisateur.getRole() != null ? utilisateur.getRole().name() : null);
        dto.setMotDePasse(utilisateur.getMotDePasse()); // Ajout du mot de passe
        return dto;
    }

    public static Utilisateur toEntity(UtilisateurDTO dto) {
        if (dto == null) return null;
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(dto.getId());
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        if (dto.getRole() != null) utilisateur.setRole(Utilisateur.Role.valueOf(dto.getRole()));
        utilisateur.setMotDePasse(dto.getMotDePasse()); // Ajout du mot de passe
        return utilisateur;
    }
} 