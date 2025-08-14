package com.hopital.rdv_backend.service;

import com.hopital.rdv_backend.dto.DisponibiliteDTO;
import com.hopital.rdv_backend.entity.Disponibilite;
import com.hopital.rdv_backend.entity.Medecin;
import com.hopital.rdv_backend.mapper.DisponibiliteMapper;
import com.hopital.rdv_backend.repository.DisponibiliteRepository;
import com.hopital.rdv_backend.repository.MedecinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DisponibiliteService {
    @Autowired
    private DisponibiliteRepository disponibiliteRepository;
    
    @Autowired
    private MedecinRepository medecinRepository;

    public List<DisponibiliteDTO> getAllDisponibilites() {
        return disponibiliteRepository.findAll().stream()
                .map(DisponibiliteMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<DisponibiliteDTO> getDisponibiliteById(Long id) {
        return disponibiliteRepository.findById(id).map(DisponibiliteMapper::toDTO);
    }

    public DisponibiliteDTO createDisponibilite(DisponibiliteDTO disponibiliteDTO) {
        // Récupérer le médecin
        Optional<Medecin> medecinOpt = medecinRepository.findById(disponibiliteDTO.getMedecinId());
        
        if (medecinOpt.isEmpty()) {
            throw new RuntimeException("Médecin non trouvé");
        }
        
        Disponibilite disponibilite = DisponibiliteMapper.toEntity(disponibiliteDTO);
        disponibilite.setMedecin(medecinOpt.get());
        
        return DisponibiliteMapper.toDTO(disponibiliteRepository.save(disponibilite));
    }

    public Optional<DisponibiliteDTO> updateDisponibilite(Long id, DisponibiliteDTO disponibiliteDTO) {
        return disponibiliteRepository.findById(id).map(existing -> {
            // Récupérer le médecin
            Optional<Medecin> medecinOpt = medecinRepository.findById(disponibiliteDTO.getMedecinId());
            
            if (medecinOpt.isEmpty()) {
                throw new RuntimeException("Médecin non trouvé");
            }
            
            Disponibilite updated = DisponibiliteMapper.toEntity(disponibiliteDTO);
            updated.setId(id);
            updated.setMedecin(medecinOpt.get());
            
            return DisponibiliteMapper.toDTO(disponibiliteRepository.save(updated));
        });
    }

    public boolean deleteDisponibilite(Long id) {
        if (disponibiliteRepository.existsById(id)) {
            disponibiliteRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Nouvelles méthodes métier
    public List<DisponibiliteDTO> getDisponibilitesByMedecin(Long medecinId) {
        return disponibiliteRepository.findAll().stream()
                .filter(d -> d.getMedecin() != null && d.getMedecin().getId().equals(medecinId))
                .map(DisponibiliteMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<DisponibiliteDTO> getDisponibilitesByJourSemaine(java.time.DayOfWeek jourSemaine) {
        return disponibiliteRepository.findAll().stream()
                .filter(d -> d.getJourSemaine() == jourSemaine)
                .map(DisponibiliteMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<DisponibiliteDTO> getDisponibilitesActives() {
        return disponibiliteRepository.findAll().stream()
                .filter(d -> d.getActive() != null && d.getActive())
                .map(DisponibiliteMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<DisponibiliteDTO> getDisponibilitesInactives() {
        return disponibiliteRepository.findAll().stream()
                .filter(d -> d.getActive() != null && !d.getActive())
                .map(DisponibiliteMapper::toDTO)
                .collect(Collectors.toList());
    }

    public boolean activerDisponibilite(Long id) {
        Optional<Disponibilite> disponibiliteOpt = disponibiliteRepository.findById(id);
        if (disponibiliteOpt.isPresent()) {
            Disponibilite disponibilite = disponibiliteOpt.get();
            disponibilite.setActive(true);
            disponibiliteRepository.save(disponibilite);
            return true;
        }
        return false;
    }

    public boolean desactiverDisponibilite(Long id) {
        Optional<Disponibilite> disponibiliteOpt = disponibiliteRepository.findById(id);
        if (disponibiliteOpt.isPresent()) {
            Disponibilite disponibilite = disponibiliteOpt.get();
            disponibilite.setActive(false);
            disponibiliteRepository.save(disponibilite);
            return true;
        }
        return false;
    }
} 