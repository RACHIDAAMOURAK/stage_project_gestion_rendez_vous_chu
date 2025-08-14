package com.hopital.rdv_backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AdminDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String niveauAcces;
    private LocalDate datePriseFonction;
    private String motDePasse;
} 