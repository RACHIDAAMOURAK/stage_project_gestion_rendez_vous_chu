package com.hopital.rdv_backend.repository;

import com.hopital.rdv_backend.entity.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    
    List<RendezVous> findByPatientId(Long patientId);
    
    List<RendezVous> findByMedecinId(Long medecinId);
    
    List<RendezVous> findByStatut(RendezVous.Statut statut);
    
    @Query("SELECT rv FROM RendezVous rv WHERE rv.medecin.id = :medecinId AND rv.dateHeure BETWEEN :debut AND :fin ORDER BY rv.dateHeure")
    List<RendezVous> findByMedecinAndDateBetween(@Param("medecinId") Long medecinId, 
                                                  @Param("debut") LocalDateTime debut, 
                                                  @Param("fin") LocalDateTime fin);
    
    @Query("SELECT rv FROM RendezVous rv WHERE rv.patient.id = :patientId AND rv.dateHeure BETWEEN :debut AND :fin ORDER BY rv.dateHeure")
    List<RendezVous> findByPatientAndDateBetween(@Param("patientId") Long patientId, 
                                                 @Param("debut") LocalDateTime debut, 
                                                 @Param("fin") LocalDateTime fin);
    
    @Query("SELECT rv FROM RendezVous rv WHERE rv.dateHeure BETWEEN :debut AND :fin ORDER BY rv.dateHeure")
    List<RendezVous> findByDateBetween(@Param("debut") LocalDateTime debut, 
                                       @Param("fin") LocalDateTime fin);
    
    @Query("SELECT rv FROM RendezVous rv WHERE rv.medecin.id = :medecinId AND rv.dateHeure = :dateHeure")
    List<RendezVous> findByMedecinAndDateHeure(@Param("medecinId") Long medecinId, 
                                               @Param("dateHeure") LocalDateTime dateHeure);
    
    @Query("SELECT COUNT(rv) FROM RendezVous rv WHERE rv.medecin.id = :medecinId AND rv.dateHeure BETWEEN :debut AND :fin AND rv.statut != 'ANNULE'")
    long countByMedecinAndDateBetween(@Param("medecinId") Long medecinId, 
                                      @Param("debut") LocalDateTime debut, 
                                      @Param("fin") LocalDateTime fin);
} 