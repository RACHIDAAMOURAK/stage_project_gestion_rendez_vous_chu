package com.hopital.rdv_backend.controller;

import com.hopital.rdv_backend.dto.InscriptionDTO;
import com.hopital.rdv_backend.dto.LoginRequest;
import com.hopital.rdv_backend.dto.UtilisateurDTO;
import com.hopital.rdv_backend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
public class UtilisateurController {
    
    @Autowired
    private UtilisateurService utilisateurService;
    @PostMapping("/inscription")
    public ResponseEntity<?> inscrireUtilisateur(@RequestBody InscriptionDTO inscriptionDTO) {
        try {
            utilisateurService.inscrireUtilisateur(inscriptionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() {
        List<UtilisateurDTO> utilisateurs = utilisateurService.getAllUtilisateurs();
        return ResponseEntity.ok(utilisateurs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurById(@PathVariable Long id) {
        Optional<UtilisateurDTO> utilisateur = utilisateurService.getUtilisateurById(id);
        return utilisateur.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurByEmail(@PathVariable String email) {
        Optional<UtilisateurDTO> utilisateur = utilisateurService.getUtilisateurByEmail(email);
        return utilisateur.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<UtilisateurDTO> createUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
        try {
            UtilisateurDTO createdUtilisateur = utilisateurService.createUtilisateur(utilisateurDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUtilisateur);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> updateUtilisateur(@PathVariable Long id, @RequestBody UtilisateurDTO utilisateurDTO) {
        Optional<UtilisateurDTO> updatedUtilisateur = utilisateurService.updateUtilisateur(id, utilisateurDTO);
        return updatedUtilisateur.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        boolean deleted = utilisateurService.deleteUtilisateur(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<UtilisateurDTO> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<UtilisateurDTO> utilisateur = utilisateurService.login(loginRequest.getEmail(), loginRequest.getMotDePasse());
            return utilisateur.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
} 