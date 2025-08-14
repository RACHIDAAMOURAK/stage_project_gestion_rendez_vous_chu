    
package com.hopital.rdv_backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hopital.rdv_backend.dto.UtilisateurDTO;
import com.hopital.rdv_backend.entity.Utilisateur;
import com.hopital.rdv_backend.mapper.UtilisateurMapper;
import com.hopital.rdv_backend.repository.UtilisateurRepository;

@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedecinService medecinService;

    public List<UtilisateurDTO> getAllUtilisateurs() {
        return utilisateurRepository.findAll().stream()
                .map(UtilisateurMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<UtilisateurDTO> getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id).map(UtilisateurMapper::toDTO);
    }

    public Optional<UtilisateurDTO> getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email).map(UtilisateurMapper::toDTO);
    }

    public UtilisateurDTO createUtilisateur(UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateur = UtilisateurMapper.toEntity(utilisateurDTO);
        Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);
        return UtilisateurMapper.toDTO(savedUtilisateur);
    }

    public void inscrireUtilisateur(com.hopital.rdv_backend.dto.InscriptionDTO inscriptionDTO) {
        // Correction : créer directement l'entité du bon type et la sauvegarder une seule fois
        if ("PATIENT".equalsIgnoreCase(inscriptionDTO.getRole())) {
            com.hopital.rdv_backend.entity.Patient patient = new com.hopital.rdv_backend.entity.Patient();
            patient.setNom(inscriptionDTO.getNom());
            patient.setPrenom(inscriptionDTO.getPrenom());
            patient.setEmail(inscriptionDTO.getEmail());
            patient.setMotDePasse(inscriptionDTO.getMotDePasse());
            patient.setRole(Utilisateur.Role.PATIENT);
            patient.setNumeroSecu(inscriptionDTO.getNumeroSecu());
            patient.setDateNaissance(inscriptionDTO.getDateNaissance());
            patient.setAdresse(inscriptionDTO.getAdresse());
            if (inscriptionDTO.getSexe() != null) {
                try {
                    patient.setSexe(com.hopital.rdv_backend.entity.Patient.Sexe.valueOf(inscriptionDTO.getSexe().toUpperCase()));
                } catch (Exception e) {
                    patient.setSexe(null);
                }
            }
            patient.setAntecedents(inscriptionDTO.getAntecedents());
            patientService.savePatientEntity(patient);
        } else if ("MEDECIN".equalsIgnoreCase(inscriptionDTO.getRole())) {
            com.hopital.rdv_backend.entity.Medecin medecin = new com.hopital.rdv_backend.entity.Medecin();
            medecin.setNom(inscriptionDTO.getNom());
            medecin.setPrenom(inscriptionDTO.getPrenom());
            medecin.setEmail(inscriptionDTO.getEmail());
            medecin.setMotDePasse(inscriptionDTO.getMotDePasse());
            medecin.setRole(Utilisateur.Role.MEDECIN);
            medecin.setNumeroRPPS(inscriptionDTO.getNumeroRPPS());
            medecin.setSpecialite(inscriptionDTO.getSpecialite());
            medecin.setDescription(inscriptionDTO.getDescription());
            medecinService.saveMedecinEntity(medecin);
        } else {
            // Autre rôle (ex : ADMIN, SECRETAIRE...)
            Utilisateur utilisateur = new Utilisateur();
            utilisateur.setNom(inscriptionDTO.getNom());
            utilisateur.setPrenom(inscriptionDTO.getPrenom());
            utilisateur.setEmail(inscriptionDTO.getEmail());
            utilisateur.setMotDePasse(inscriptionDTO.getMotDePasse());
            try {
                utilisateur.setRole(Utilisateur.Role.valueOf(inscriptionDTO.getRole()));
            } catch (Exception e) {
                utilisateur.setRole(Utilisateur.Role.PATIENT); // fallback
            }
            utilisateurRepository.save(utilisateur);
        }
    }
    public Optional<UtilisateurDTO> updateUtilisateur(Long id, UtilisateurDTO utilisateurDTO) {
        return utilisateurRepository.findById(id).map(existing -> {
            // Ne crée pas un nouvel objet. Mets à jour l’existant
            existing.setNom(utilisateurDTO.getNom());
            existing.setPrenom(utilisateurDTO.getPrenom());
            existing.setEmail(utilisateurDTO.getEmail());
            existing.setMotDePasse(utilisateurDTO.getMotDePasse());
            // ajoute d’autres champs si nécessaire

            Utilisateur saved = utilisateurRepository.save(existing);
            return UtilisateurMapper.toDTO(saved);
        });
    }


    public boolean deleteUtilisateur(Long id) {
        if (utilisateurRepository.existsById(id)) {
            utilisateurRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<UtilisateurDTO> login(String email, String motDePasse) {
        return utilisateurRepository.findByEmail(email)
                .filter(utilisateur -> utilisateur.getMotDePasse().equals(motDePasse))
                .map(UtilisateurMapper::toDTO);
    }
} 