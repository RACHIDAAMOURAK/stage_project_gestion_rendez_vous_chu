package com.hopital.rdv_backend.mapper;

import com.hopital.rdv_backend.dto.MedecinDTO;
import com.hopital.rdv_backend.entity.Medecin;

public class MedecinMapper {
    public static MedecinDTO toDTO(Medecin medecin) {
        if (medecin == null) return null;
        MedecinDTO dto = new MedecinDTO();
        dto.setId(medecin.getId());
        dto.setNom(medecin.getNom());
        dto.setPrenom(medecin.getPrenom());
        dto.setEmail(medecin.getEmail());
        dto.setNumeroRPPS(medecin.getNumeroRPPS());
        dto.setSpecialite(medecin.getSpecialite());
        dto.setDescription(medecin.getDescription());
        dto.setMotDePasse(medecin.getMotDePasse()); // Ajout du mot de passe
        return dto;
    }

    public static Medecin toEntity(MedecinDTO dto) {
        if (dto == null) return null;
        Medecin medecin = new Medecin();
        medecin.setId(dto.getId());
        medecin.setNom(dto.getNom());
        medecin.setPrenom(dto.getPrenom());
        medecin.setEmail(dto.getEmail());
        medecin.setNumeroRPPS(dto.getNumeroRPPS());
        medecin.setSpecialite(dto.getSpecialite());
        medecin.setDescription(dto.getDescription());
        medecin.setMotDePasse(dto.getMotDePasse());
        medecin.setRole(com.hopital.rdv_backend.entity.Utilisateur.Role.MEDECIN); // Fixe le rôle
        return medecin;
    }
} 