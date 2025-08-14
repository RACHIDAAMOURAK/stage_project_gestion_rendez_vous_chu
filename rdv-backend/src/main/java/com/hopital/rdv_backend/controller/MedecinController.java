package com.hopital.rdv_backend.controller;

import com.hopital.rdv_backend.dto.MedecinDTO;
import com.hopital.rdv_backend.service.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medecins")
@CrossOrigin(origins = "http://localhost:4200")
public class MedecinController {
    
    @Autowired
    private MedecinService medecinService;
    
    @GetMapping
    public ResponseEntity<List<MedecinDTO>> getAllMedecins() {
        List<MedecinDTO> medecins = medecinService.getAllMedecins();
        return ResponseEntity.ok(medecins);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MedecinDTO> getMedecinById(@PathVariable Long id) {
        Optional<MedecinDTO> medecin = medecinService.getMedecinById(id);
        return medecin.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/numero-rpps/{numeroRPPS}")
    public ResponseEntity<MedecinDTO> getMedecinByNumeroRPPS(@PathVariable String numeroRPPS) {
        Optional<MedecinDTO> medecin = medecinService.getMedecinByNumeroRPPS(numeroRPPS);
        return medecin.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<MedecinDTO> createMedecin(@RequestBody MedecinDTO medecinDTO) {
        try {
            MedecinDTO createdMedecin = medecinService.createMedecin(medecinDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMedecin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MedecinDTO> updateMedecin(@PathVariable Long id, @RequestBody MedecinDTO medecinDTO) {
        Optional<MedecinDTO> updatedMedecin = medecinService.updateMedecin(id, medecinDTO);
        return updatedMedecin.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedecin(@PathVariable Long id) {
        boolean deleted = medecinService.deleteMedecin(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
} 