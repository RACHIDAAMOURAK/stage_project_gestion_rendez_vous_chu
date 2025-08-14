
package com.hopital.rdv_backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hopital.rdv_backend.dto.PatientDTO;
import com.hopital.rdv_backend.entity.Patient;
import com.hopital.rdv_backend.mapper.PatientMapper;
import com.hopital.rdv_backend.repository.PatientRepository;

@Service
public class PatientService {
    // Permet de sauvegarder un Patient entité directement (héritage JPA)
    public void savePatientEntity(com.hopital.rdv_backend.entity.Patient patient) {
        patientRepository.save(patient);
    }
    @Autowired
    private PatientRepository patientRepository;

    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(PatientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<PatientDTO> getPatientById(Long id) {
        return patientRepository.findById(id).map(PatientMapper::toDTO);
    }

    public Optional<PatientDTO> getPatientByNumeroSecu(String numeroSecu) {
        return patientRepository.findByNumeroSecu(numeroSecu).map(PatientMapper::toDTO);
    }
    public PatientDTO createPatient(PatientDTO patientDTO) {
        Patient patient = PatientMapper.toEntity(patientDTO);
        return PatientMapper.toDTO(patientRepository.save(patient));
    }
    // Nouvelle méthode pour créer un patient à partir d'un utilisateur existant
    public PatientDTO createPatientFromUtilisateur(com.hopital.rdv_backend.entity.Utilisateur utilisateur, PatientDTO patientDTO) {
        Patient patient = PatientMapper.fromUtilisateurAndDTO(utilisateur, patientDTO);
        return PatientMapper.toDTO(patientRepository.save(patient));
    }

    public Optional<PatientDTO> updatePatient(Long id, PatientDTO patientDTO) {
        return patientRepository.findById(id).map(existing -> {
            Patient updated = PatientMapper.toEntity(patientDTO);
            updated.setId(id);
            return PatientMapper.toDTO(patientRepository.save(updated));
        });
    }

    public boolean deletePatient(Long id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Exemples de méthodes supplémentaires
    public List<PatientDTO> searchPatients(String q) {
        // À adapter selon la logique de recherche réelle
        return getAllPatients().stream()
                .filter(p -> p.getNom().toLowerCase().contains(q.toLowerCase()) ||
                             p.getPrenom().toLowerCase().contains(q.toLowerCase()))
                .collect(Collectors.toList());
    }

    public boolean existsByNumeroSecu(String numeroSecu) {
        return patientRepository.findByNumeroSecu(numeroSecu).isPresent();
    }

    public boolean existsByEmail(String email) {
        // À adapter selon la logique réelle
        return getAllPatients().stream().anyMatch(p -> p.getEmail().equalsIgnoreCase(email));
    }
} 