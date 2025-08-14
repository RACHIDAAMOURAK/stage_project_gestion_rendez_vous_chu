package com.hopital.rdv_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends Utilisateur {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NiveauAcces niveauAcces;

    @Column(nullable = false)
    private LocalDate datePriseFonction;

    public enum NiveauAcces {
        SUPER_ADMIN, ADMIN_SIMPLE
    }
} 