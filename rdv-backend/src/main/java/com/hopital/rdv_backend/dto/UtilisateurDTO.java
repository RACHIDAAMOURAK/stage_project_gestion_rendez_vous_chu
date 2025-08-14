package com.hopital.rdv_backend.dto;

import lombok.Data;

@Data
public class UtilisateurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String role;
    private String motDePasse;
} 