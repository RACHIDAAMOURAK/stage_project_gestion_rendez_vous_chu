package com.hopital.rdv_backend.dto;

import lombok.Data;

@Data
public class MedecinDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String numeroRPPS;
    private String specialite;
    private String description;
    private String motDePasse;
} 