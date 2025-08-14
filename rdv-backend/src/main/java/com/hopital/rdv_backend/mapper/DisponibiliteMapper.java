package com.hopital.rdv_backend.mapper;

import com.hopital.rdv_backend.dto.DisponibiliteDTO;
import com.hopital.rdv_backend.entity.Disponibilite;

public class DisponibiliteMapper {
    public static DisponibiliteDTO toDTO(Disponibilite disponibilite) {
        if (disponibilite == null) return null;
        DisponibiliteDTO dto = new DisponibiliteDTO();
        dto.setId(disponibilite.getId());
        dto.setMedecinId(disponibilite.getMedecin() != null ? disponibilite.getMedecin().getId() : null);
        dto.setJourSemaine(disponibilite.getJourSemaine());
        dto.setHeureDebut(disponibilite.getHeureDebut());
        dto.setHeureFin(disponibilite.getHeureFin());
        dto.setDureeCreneauMinutes(disponibilite.getDureeCreneauMinutes());
        dto.setActive(disponibilite.getActive());
        return dto;
    }

    public static Disponibilite toEntity(DisponibiliteDTO dto) {
        if (dto == null) return null;
        Disponibilite disponibilite = new Disponibilite();
        disponibilite.setId(dto.getId());
        // Pour medecin, il faudra le récupérer via le service/repository dans le contrôleur/service
        disponibilite.setJourSemaine(dto.getJourSemaine());
        disponibilite.setHeureDebut(dto.getHeureDebut());
        disponibilite.setHeureFin(dto.getHeureFin());
        disponibilite.setDureeCreneauMinutes(dto.getDureeCreneauMinutes());
        disponibilite.setActive(dto.getActive());
        return disponibilite;
    }
} 