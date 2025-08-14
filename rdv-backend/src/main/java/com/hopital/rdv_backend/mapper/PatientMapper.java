package com.hopital.rdv_backend.mapper;

import com.hopital.rdv_backend.dto.PatientDTO;
import com.hopital.rdv_backend.entity.Patient;

public class PatientMapper {
    public static PatientDTO toDTO(Patient patient) {
        if (patient == null) return null;
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setNom(patient.getNom());
        dto.setPrenom(patient.getPrenom());
        dto.setEmail(patient.getEmail());
        dto.setNumeroSecu(patient.getNumeroSecu());
        dto.setDateNaissance(patient.getDateNaissance());
        dto.setAdresse(patient.getAdresse());
        dto.setSexe(patient.getSexe() != null ? patient.getSexe().name() : null);
        dto.setAntecedents(patient.getAntecedents());
        dto.setMotDePasse(patient.getMotDePasse());
        dto.setRole("PATIENT");
        return dto;
    }

    // Nouveau mapping: crée un Patient à partir d'un Utilisateur existant et d'un DTO
    public static Patient fromUtilisateurAndDTO(com.hopital.rdv_backend.entity.Utilisateur utilisateur, PatientDTO dto) {
        if (utilisateur == null || dto == null) return null;
        Patient patient = new Patient();
        patient.setId(utilisateur.getId());
        patient.setNom(utilisateur.getNom());
        patient.setPrenom(utilisateur.getPrenom());
        patient.setEmail(utilisateur.getEmail());
        patient.setMotDePasse(utilisateur.getMotDePasse());
        patient.setRole(com.hopital.rdv_backend.entity.Utilisateur.Role.PATIENT);
        // Champs spécifiques patient
        patient.setNumeroSecu(dto.getNumeroSecu());
        patient.setDateNaissance(dto.getDateNaissance());
        patient.setAdresse(dto.getAdresse());
        if (dto.getSexe() != null) patient.setSexe(Patient.Sexe.valueOf(dto.getSexe()));
        patient.setAntecedents(dto.getAntecedents());
        return patient;
    }
    // Restauration de la méthode toEntity pour compatibilité
    public static Patient toEntity(PatientDTO dto) {
        if (dto == null) return null;
        Patient patient = new Patient();
        patient.setId(dto.getId());
        patient.setNom(dto.getNom());
        patient.setPrenom(dto.getPrenom());
        patient.setEmail(dto.getEmail());
        patient.setMotDePasse(dto.getMotDePasse());
        patient.setRole(com.hopital.rdv_backend.entity.Utilisateur.Role.PATIENT);
        patient.setNumeroSecu(dto.getNumeroSecu());
        patient.setDateNaissance(dto.getDateNaissance());
        patient.setAdresse(dto.getAdresse());
        if (dto.getSexe() != null) patient.setSexe(Patient.Sexe.valueOf(dto.getSexe()));
        patient.setAntecedents(dto.getAntecedents());
        return patient;
    }
} 