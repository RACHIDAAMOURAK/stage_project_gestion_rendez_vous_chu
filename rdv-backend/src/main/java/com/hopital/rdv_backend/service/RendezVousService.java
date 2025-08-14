package com.hopital.rdv_backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hopital.rdv_backend.dto.RendezVousDTO;
import com.hopital.rdv_backend.entity.Medecin;
import com.hopital.rdv_backend.entity.Patient;
import com.hopital.rdv_backend.entity.RendezVous;
import com.hopital.rdv_backend.entity.RendezVous.Statut;
import com.hopital.rdv_backend.mapper.RendezVousMapper;
import com.hopital.rdv_backend.repository.MedecinRepository;
import com.hopital.rdv_backend.repository.PatientRepository;
import com.hopital.rdv_backend.repository.RendezVousRepository;

@Service
public class RendezVousService {
    @Autowired
    private RendezVousRepository rendezVousRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private MedecinRepository medecinRepository;

    public List<RendezVousDTO> getAllRendezVous() {
        return rendezVousRepository.findAll().stream()
                .map(RendezVousMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<RendezVousDTO> getRendezVousById(Long id) {
        return rendezVousRepository.findById(id).map(RendezVousMapper::toDTO);
    }

    public RendezVousDTO createRendezVous(RendezVousDTO rendezVousDTO) {
        // Récupérer le patient et le médecin
        Optional<Patient> patientOpt = patientRepository.findById(rendezVousDTO.getPatientId());
        Optional<Medecin> medecinOpt = medecinRepository.findById(rendezVousDTO.getMedecinId());
        
        if (patientOpt.isEmpty() || medecinOpt.isEmpty()) {
            throw new RuntimeException("Patient ou Médecin non trouvé");
        }
        
        RendezVous rendezVous = RendezVousMapper.toEntity(rendezVousDTO);
        rendezVous.setPatient(patientOpt.get());
        rendezVous.setMedecin(medecinOpt.get());
        
        return RendezVousMapper.toDTO(rendezVousRepository.save(rendezVous));
    }

    public Optional<RendezVousDTO> updateRendezVous(Long id, RendezVousDTO rendezVousDTO) {
        return rendezVousRepository.findById(id).map(existing -> {
            // Récupérer le patient et le médecin
            Optional<Patient> patientOpt = patientRepository.findById(rendezVousDTO.getPatientId());
            Optional<Medecin> medecinOpt = medecinRepository.findById(rendezVousDTO.getMedecinId());
            
            if (patientOpt.isEmpty() || medecinOpt.isEmpty()) {
                throw new RuntimeException("Patient ou Médecin non trouvé");
            }
            
            RendezVous updated = RendezVousMapper.toEntity(rendezVousDTO);
            updated.setId(id);
            updated.setPatient(patientOpt.get());
            updated.setMedecin(medecinOpt.get());
            
            return RendezVousMapper.toDTO(rendezVousRepository.save(updated));
        });
    }

    public boolean deleteRendezVous(Long id) {
        if (rendezVousRepository.existsById(id)) {
            rendezVousRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Exemples de méthodes supplémentaires à adapter
    public List<RendezVousDTO> getRendezVousByPatient(Long patientId) {
        return rendezVousRepository.findAll().stream()
                .filter(r -> r.getPatient() != null && r.getPatient().getId().equals(patientId))
                .map(RendezVousMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByMedecin(Long medecinId) {
        return rendezVousRepository.findAll().stream()
                .filter(r -> r.getMedecin() != null && r.getMedecin().getId().equals(medecinId))
                .map(RendezVousMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByDateRange(java.time.LocalDateTime debut, java.time.LocalDateTime fin) {
        return rendezVousRepository.findAll().stream()
                .filter(r -> r.getDateHeure() != null &&
                        !r.getDateHeure().isBefore(debut) && !r.getDateHeure().isAfter(fin))
                .map(RendezVousMapper::toDTO)
                .collect(Collectors.toList());
    }

    public boolean annulerRendezVous(Long id) {
        Optional<RendezVous> rendezVousOpt = rendezVousRepository.findById(id);
        if (rendezVousOpt.isPresent()) {
            RendezVous rendezVous = rendezVousOpt.get();
            rendezVous.setStatut(RendezVous.Statut.ANNULE);
            rendezVousRepository.save(rendezVous);
            return true;
        }
        return false;
    }

    // Nouvelles méthodes métier
    public List<RendezVousDTO> getRendezVousByStatut(RendezVous.Statut statut) {
        return rendezVousRepository.findAll().stream()
                .filter(r -> r.getStatut() == statut)
                .map(RendezVousMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<RendezVousDTO> getRendezVousByDate(java.time.LocalDate date) {
        return rendezVousRepository.findAll().stream()
                .filter(r -> r.getDateHeure() != null && 
                        r.getDateHeure().toLocalDate().equals(date))
                .map(RendezVousMapper::toDTO)
                .collect(Collectors.toList());
    }

    public boolean confirmerRendezVous(Long id) {
        Optional<RendezVous> rendezVousOpt = rendezVousRepository.findById(id);
        if (rendezVousOpt.isPresent()) {
            RendezVous rendezVous = rendezVousOpt.get();
            rendezVous.setStatut(RendezVous.Statut.CONFIRME);
            rendezVousRepository.save(rendezVous);
            return true;
        }
        return false;
    }

    public boolean terminerRendezVous(Long id) {
        Optional<RendezVous> rendezVousOpt = rendezVousRepository.findById(id);
        if (rendezVousOpt.isPresent()) {
            RendezVous rendezVous = rendezVousOpt.get();
            rendezVous.setStatut(RendezVous.Statut.TERMINE);
            rendezVousRepository.save(rendezVous);
            return true;
        }
        return false;
    }

    public List<RendezVousDTO> getRendezVousEnAttente() {
        return getRendezVousByStatut(RendezVous.Statut.EN_ATTENTE);
    }

    public List<RendezVousDTO> getRendezVousConfirmes() {
        return getRendezVousByStatut(RendezVous.Statut.CONFIRME);
    }

    public List<RendezVousDTO> getRendezVousAnnules() {
        return getRendezVousByStatut(RendezVous.Statut.ANNULE);
    }
    public String getNomPrenomMedecin(Long medecinId) {
    Optional<Medecin> medecinOpt = medecinRepository.findById(medecinId);
    if (medecinOpt.isPresent()) {
        Medecin medecin = medecinOpt.get();
        return medecin.getNom() + " " + medecin.getPrenom();
    } else {
        throw new RuntimeException("Médecin non trouvé pour l'ID : " + medecinId);
    }
}

public Map<String, Long> getStatsRendezVousMedecin(Long medecinId) {
    LocalDate today = LocalDate.now();
    LocalDateTime startOfDay = today.atStartOfDay();
    LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

    List<RendezVous> rdvs = rendezVousRepository.findByMedecinId(medecinId);

    return Map.of(
        "total", (long) rdvs.size(),
        "enAttente", rdvs.stream().filter(r -> r.getStatut() == Statut.EN_ATTENTE).count(),
        "confirmes", rdvs.stream().filter(r -> r.getStatut() == Statut.CONFIRME).count(),
        "aujourdhui", rdvs.stream()
            .filter(r -> r.getDateHeure() != null && 
                       !r.getDateHeure().isBefore(startOfDay) && 
                       r.getDateHeure().isBefore(endOfDay))
            .count()
    );
}

}  