package com.hopital.rdv_backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RendezVousDTO {
    // Getters and setters for all fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public Long getMedecinId() { return medecinId; }
    public void setMedecinId(Long medecinId) { this.medecinId = medecinId; }
    public java.time.LocalDateTime getDateHeure() { return dateHeure; }
    public void setDateHeure(java.time.LocalDateTime dateHeure) { this.dateHeure = dateHeure; }
    public Integer getDureeMinutes() { return dureeMinutes; }
    public void setDureeMinutes(Integer dureeMinutes) { this.dureeMinutes = dureeMinutes; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public String getMotif() { return motif; }
    public void setMotif(String motif) { this.motif = motif; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public java.time.LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(java.time.LocalDateTime dateCreation) { this.dateCreation = dateCreation; }
    public java.time.LocalDateTime getDateModification() { return dateModification; }
    public void setDateModification(java.time.LocalDateTime dateModification) { this.dateModification = dateModification; }
    public String getMedecinNom() { return medecinNom; }
    public void setMedecinNom(String medecinNom) { this.medecinNom = medecinNom; }
    public String getMedecinPrenom() { return medecinPrenom; }
    public void setMedecinPrenom(String medecinPrenom) { this.medecinPrenom = medecinPrenom; }
    public String getPatientNom() { return patientNom; }
    public void setPatientNom(String patientNom) { this.patientNom = patientNom; }
    public String getPatientPrenom() { return patientPrenom; }
    public void setPatientPrenom(String patientPrenom) { this.patientPrenom = patientPrenom; }
    private Long id;
    private Long patientId;
    private Long medecinId;
    private LocalDateTime dateHeure;
    private Integer dureeMinutes;
    private String statut;
    private String motif;
    private String notes;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;
    private String medecinNom;  // Nom du médecin
    private String medecinPrenom;  // Prénom du médecin
    private String patientNom;   // Nom du patient
    private String patientPrenom; // Prénom du patient

} 