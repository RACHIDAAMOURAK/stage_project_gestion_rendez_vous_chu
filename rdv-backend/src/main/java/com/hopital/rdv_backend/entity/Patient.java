package com.hopital.rdv_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient extends Utilisateur {
    @Column(nullable = false, unique = true)
    private String numeroSecu;

    @Column(nullable = false)
    private LocalDate dateNaissance;

    @Column(nullable = false)
    private String adresse;

    @Enumerated(EnumType.STRING)
    private Sexe sexe;

    @Column(length = 1000)
    private String antecedents;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<RendezVous> rendezVous;

    public enum Sexe {
        HOMME, FEMME
    }
} 