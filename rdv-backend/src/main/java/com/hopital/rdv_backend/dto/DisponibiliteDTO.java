package com.hopital.rdv_backend.dto;

import lombok.Data;
import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
public class DisponibiliteDTO {
    private Long id;
    private Long medecinId;
    private DayOfWeek jourSemaine;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private Integer dureeCreneauMinutes;
    private Boolean active;
} 