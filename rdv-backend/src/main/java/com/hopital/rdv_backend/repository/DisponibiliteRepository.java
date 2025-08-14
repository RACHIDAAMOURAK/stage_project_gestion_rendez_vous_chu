package com.hopital.rdv_backend.repository;

import com.hopital.rdv_backend.entity.Disponibilite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface DisponibiliteRepository extends JpaRepository<Disponibilite, Long> {
    
    List<Disponibilite> findByMedecinId(Long medecinId);
    
    List<Disponibilite> findByMedecinIdAndActiveTrue(Long medecinId);
    
    List<Disponibilite> findByMedecinIdAndJourSemaineAndActiveTrue(Long medecinId, DayOfWeek jourSemaine);
    
    List<Disponibilite> findByActiveTrue();
} 