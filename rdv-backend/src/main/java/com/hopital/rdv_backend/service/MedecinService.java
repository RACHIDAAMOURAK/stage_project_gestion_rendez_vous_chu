
package com.hopital.rdv_backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hopital.rdv_backend.dto.MedecinDTO;
import com.hopital.rdv_backend.entity.Medecin;
import com.hopital.rdv_backend.mapper.MedecinMapper;
import com.hopital.rdv_backend.repository.MedecinRepository;

@Service
public class MedecinService {
    // Permet de sauvegarder un Medecin entité directement (héritage JPA)
    public void saveMedecinEntity(com.hopital.rdv_backend.entity.Medecin medecin) {
        medecinRepository.save(medecin);
    }
    @Autowired
    private MedecinRepository medecinRepository;

    public List<MedecinDTO> getAllMedecins() {
        return medecinRepository.findAll().stream()
                .map(MedecinMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<MedecinDTO> getMedecinById(Long id) {
        return medecinRepository.findById(id).map(MedecinMapper::toDTO);
    }

    public Optional<MedecinDTO> getMedecinByNumeroRPPS(String numeroRPPS) {
        return medecinRepository.findByNumeroRPPS(numeroRPPS).map(MedecinMapper::toDTO);
    }

    public MedecinDTO createMedecin(MedecinDTO medecinDTO) {
        Medecin medecin = MedecinMapper.toEntity(medecinDTO);
        return MedecinMapper.toDTO(medecinRepository.save(medecin));
    }

    public Optional<MedecinDTO> updateMedecin(Long id, MedecinDTO medecinDTO) {
        return medecinRepository.findById(id).map(existing -> {
            Medecin updated = MedecinMapper.toEntity(medecinDTO);
            updated.setId(id);
            return MedecinMapper.toDTO(medecinRepository.save(updated));
        });
    }

    public boolean deleteMedecin(Long id) {
        if (medecinRepository.existsById(id)) {
            medecinRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 