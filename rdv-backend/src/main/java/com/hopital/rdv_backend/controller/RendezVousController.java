package com.hopital.rdv_backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hopital.rdv_backend.dto.RendezVousDTO;
import com.hopital.rdv_backend.entity.RendezVous;
import com.hopital.rdv_backend.service.RendezVousService;

@RestController
@RequestMapping("/api/rendez-vous")
@CrossOrigin(origins = "http://localhost:4200")
public class RendezVousController {
    
    @Autowired
    private RendezVousService rendezVousService;
    
    @GetMapping
    public ResponseEntity<List<RendezVousDTO>> getAllRendezVous() {
        List<RendezVousDTO> rendezVous = rendezVousService.getAllRendezVous();
        return ResponseEntity.ok(rendezVous);
    }
    
    // Endpoints spécifiques AVANT les endpoints génériques
    @GetMapping("/en-attente")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousEnAttente() {
        List<RendezVousDTO> rendezVous = rendezVousService.getRendezVousEnAttente();
        return ResponseEntity.ok(rendezVous);
    }

    @GetMapping("/confirmes")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousConfirmes() {
        List<RendezVousDTO> rendezVous = rendezVousService.getRendezVousConfirmes();
        return ResponseEntity.ok(rendezVous);
    }

    @GetMapping("/annules")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousAnnules() {
        List<RendezVousDTO> rendezVous = rendezVousService.getRendezVousAnnules();
        return ResponseEntity.ok(rendezVous);
    }
    
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByPatient(@PathVariable Long patientId) {
        List<RendezVousDTO> rendezVous = rendezVousService.getRendezVousByPatient(patientId);
        return ResponseEntity.ok(rendezVous);
    }
    
    @GetMapping("/medecin/{medecinId}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByMedecin(@PathVariable Long medecinId) {
        List<RendezVousDTO> rendezVous = rendezVousService.getRendezVousByMedecin(medecinId);
        return ResponseEntity.ok(rendezVous);
    }
    
    @GetMapping("/date-range")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime debut,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
        List<RendezVousDTO> rendezVous = rendezVousService.getRendezVousByDateRange(debut, fin);
        return ResponseEntity.ok(rendezVous);
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByStatut(@PathVariable String statut) {
        try {
            RendezVous.Statut statutEnum = RendezVous.Statut.valueOf(statut.toUpperCase());
            List<RendezVousDTO> rendezVous = rendezVousService.getRendezVousByStatut(statutEnum);
            return ResponseEntity.ok(rendezVous);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<RendezVousDTO>> getRendezVousByDate(@PathVariable String date) {
        try {
            java.time.LocalDate localDate = java.time.LocalDate.parse(date);
            List<RendezVousDTO> rendezVous = rendezVousService.getRendezVousByDate(localDate);
            return ResponseEntity.ok(rendezVous);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Endpoints génériques APRÈS les endpoints spécifiques
    @GetMapping("/{id}")
    public ResponseEntity<RendezVousDTO> getRendezVousById(@PathVariable Long id) {
        Optional<RendezVousDTO> rendezVous = rendezVousService.getRendezVousById(id);
        return rendezVous.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<RendezVousDTO> createRendezVous(@RequestBody RendezVousDTO rendezVousDTO) {
        try {
            RendezVousDTO createdRendezVous = rendezVousService.createRendezVous(rendezVousDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRendezVous);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RendezVousDTO> updateRendezVous(@PathVariable Long id, @RequestBody RendezVousDTO rendezVousDTO) {
        Optional<RendezVousDTO> updatedRendezVous = rendezVousService.updateRendezVous(id, rendezVousDTO);
        return updatedRendezVous.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRendezVous(@PathVariable Long id) {
        boolean deleted = rendezVousService.deleteRendezVous(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    // Actions sur les statuts
    @PostMapping("/{id}/confirmer")
    public ResponseEntity<Void> confirmerRendezVous(@PathVariable Long id) {
        boolean confirmed = rendezVousService.confirmerRendezVous(id);
        return confirmed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/terminer")
    public ResponseEntity<Void> terminerRendezVous(@PathVariable Long id) {
        boolean termine = rendezVousService.terminerRendezVous(id);
        return termine ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/annuler")
    public ResponseEntity<Void> annulerRendezVous(@PathVariable Long id) {
        boolean annule = rendezVousService.annulerRendezVous(id);
        return annule ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/medecin/{medecinId}/stats")
public ResponseEntity<Map<String, Long>> getStatsRendezVousMedecin(@PathVariable Long medecinId) {
    return ResponseEntity.ok(rendezVousService.getStatsRendezVousMedecin(medecinId));
}
} 