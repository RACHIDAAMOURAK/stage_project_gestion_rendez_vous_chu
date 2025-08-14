package com.hopital.rdv_backend.mapper;

import com.hopital.rdv_backend.dto.RendezVousDTO;
import com.hopital.rdv_backend.entity.RendezVous;

public class RendezVousMapper {
    public static RendezVousDTO toDTO(RendezVous rendezVous) {
        if (rendezVous == null) return null;
        RendezVousDTO dto = new RendezVousDTO();
        dto.setId(rendezVous.getId());
        dto.setPatientId(rendezVous.getPatient() != null ? rendezVous.getPatient().getId() : null);
        dto.setMedecinId(rendezVous.getMedecin() != null ? rendezVous.getMedecin().getId() : null);
        dto.setDateHeure(rendezVous.getDateHeure());
        dto.setDureeMinutes(rendezVous.getDureeMinutes());
        dto.setStatut(rendezVous.getStatut() != null ? rendezVous.getStatut().name() : null);
        dto.setMotif(rendezVous.getMotif());
        dto.setNotes(rendezVous.getNotes());
        dto.setDateCreation(rendezVous.getDateCreation());
        dto.setDateModification(rendezVous.getDateModification());
        // Ajoute le nom et prénom du médecin
        if (rendezVous.getMedecin() != null) {
            dto.setMedecinNom(rendezVous.getMedecin().getNom());
            dto.setMedecinPrenom(rendezVous.getMedecin().getPrenom());
        }
        // Ajoute le nom et prénom du patient
        if (rendezVous.getPatient() != null) {
            dto.setPatientNom(rendezVous.getPatient().getNom());
            dto.setPatientPrenom(rendezVous.getPatient().getPrenom());
        }
        return dto;
    }

    public static RendezVous toEntity(RendezVousDTO dto) {
        if (dto == null) return null;
        RendezVous rendezVous = new RendezVous();
        rendezVous.setId(dto.getId());
        // Pour patient et medecin, il faudra les récupérer via le service/repository dans le contrôleur/service
        rendezVous.setDateHeure(dto.getDateHeure());
        rendezVous.setDureeMinutes(dto.getDureeMinutes());
        if (dto.getStatut() != null) rendezVous.setStatut(RendezVous.Statut.valueOf(dto.getStatut()));
        rendezVous.setMotif(dto.getMotif());
        rendezVous.setNotes(dto.getNotes());
        rendezVous.setDateCreation(dto.getDateCreation());
        rendezVous.setDateModification(dto.getDateModification());
        return rendezVous;
    }
} 