package com.hopital.rdv_backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PatientDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String numeroSecu;
    private LocalDate dateNaissance;
    private String adresse;
    private String sexe;
    private String antecedents;
    private String motDePasse;
    private String role;
} 