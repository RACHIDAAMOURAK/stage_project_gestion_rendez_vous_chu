package com.hopital.rdv_backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class InscriptionDTO {
    // Champs communs
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String role;

    // Champs spécifiques patient
    private String numeroSecu;
    private LocalDate dateNaissance;
    private String adresse;
    private String sexe;
    private String antecedents;

    // Champs spécifiques médecin
    private String numeroRPPS;
    private String specialite;
    private String description;
}
