package com.hopital.rdv_backend.controller;

import com.hopital.rdv_backend.entity.Specialite;
import com.hopital.rdv_backend.service.SpecialiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/specialites")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class SpecialiteController {
    @Autowired
    private SpecialiteService specialiteService;

    @GetMapping
    public List<Specialite> getAll() {
        return specialiteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Specialite> getById(@PathVariable Long id) {
        Optional<Specialite> specialite = specialiteService.findById(id);
        return specialite.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Specialite create(@RequestBody Specialite specialite) {
        return specialiteService.save(specialite);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Specialite> update(@PathVariable Long id, @RequestBody Specialite specialite) {
        if (!specialiteService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        specialite.setId(id);
        return ResponseEntity.ok(specialiteService.save(specialite));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!specialiteService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        specialiteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
