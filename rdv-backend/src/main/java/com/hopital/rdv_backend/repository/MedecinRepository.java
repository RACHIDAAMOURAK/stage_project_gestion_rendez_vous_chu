package com.hopital.rdv_backend.repository;

import com.hopital.rdv_backend.entity.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedecinRepository extends JpaRepository<Medecin, Long> {
    Optional<Medecin> findByNumeroRPPS(String numeroRPPS);
} 