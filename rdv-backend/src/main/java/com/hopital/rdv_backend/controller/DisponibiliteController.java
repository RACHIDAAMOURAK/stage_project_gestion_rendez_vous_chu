package com.hopital.rdv_backend.controller;

import com.hopital.rdv_backend.dto.DisponibiliteDTO;
import com.hopital.rdv_backend.service.DisponibiliteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/disponibilites")
@CrossOrigin(origins = "http://localhost:4200")
public class DisponibiliteController {
    
    @Autowired
    private DisponibiliteService disponibiliteService;
    
    @GetMapping
    public ResponseEntity<List<DisponibiliteDTO>> getAllDisponibilites() {
        List<DisponibiliteDTO> disponibilites = disponibiliteService.getAllDisponibilites();
        return ResponseEntity.ok(disponibilites);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DisponibiliteDTO> getDisponibiliteById(@PathVariable Long id) {
        Optional<DisponibiliteDTO> disponibilite = disponibiliteService.getDisponibiliteById(id);
        return disponibilite.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    

    
    @PostMapping
    public ResponseEntity<DisponibiliteDTO> createDisponibilite(@RequestBody DisponibiliteDTO disponibiliteDTO) {
        try {
            DisponibiliteDTO createdDisponibilite = disponibiliteService.createDisponibilite(disponibiliteDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDisponibilite);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DisponibiliteDTO> updateDisponibilite(@PathVariable Long id, @RequestBody DisponibiliteDTO disponibiliteDTO) {
        Optional<DisponibiliteDTO> updatedDisponibilite = disponibiliteService.updateDisponibilite(id, disponibiliteDTO);
        return updatedDisponibilite.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisponibilite(@PathVariable Long id) {
        boolean deleted = disponibiliteService.deleteDisponibilite(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Nouveaux endpoints métier
    @GetMapping("/medecin/{medecinId}")
    public ResponseEntity<List<DisponibiliteDTO>> getDisponibilitesByMedecin(@PathVariable Long medecinId) {
        List<DisponibiliteDTO> disponibilites = disponibiliteService.getDisponibilitesByMedecin(medecinId);
        return ResponseEntity.ok(disponibilites);
    }

    @GetMapping("/jour/{jourSemaine}")
    public ResponseEntity<List<DisponibiliteDTO>> getDisponibilitesByJourSemaine(@PathVariable String jourSemaine) {
        try {
            java.time.DayOfWeek jour = java.time.DayOfWeek.valueOf(jourSemaine.toUpperCase());
            List<DisponibiliteDTO> disponibilites = disponibiliteService.getDisponibilitesByJourSemaine(jour);
            return ResponseEntity.ok(disponibilites);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/actives")
    public ResponseEntity<List<DisponibiliteDTO>> getDisponibilitesActives() {
        List<DisponibiliteDTO> disponibilites = disponibiliteService.getDisponibilitesActives();
        return ResponseEntity.ok(disponibilites);
    }

    @GetMapping("/inactives")
    public ResponseEntity<List<DisponibiliteDTO>> getDisponibilitesInactives() {
        List<DisponibiliteDTO> disponibilites = disponibiliteService.getDisponibilitesInactives();
        return ResponseEntity.ok(disponibilites);
    }

    @PostMapping("/{id}/activer")
    public ResponseEntity<Void> activerDisponibilite(@PathVariable Long id) {
        boolean active = disponibiliteService.activerDisponibilite(id);
        return active ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/desactiver")
    public ResponseEntity<Void> desactiverDisponibilite(@PathVariable Long id) {
        boolean inactive = disponibiliteService.desactiverDisponibilite(id);
        return inactive ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
} 