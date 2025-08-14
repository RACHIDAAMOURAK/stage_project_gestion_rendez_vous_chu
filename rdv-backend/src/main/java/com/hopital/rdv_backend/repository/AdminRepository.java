package com.hopital.rdv_backend.repository;

import com.hopital.rdv_backend.entity.Admin;
import com.hopital.rdv_backend.entity.Admin.NiveauAcces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    List<Admin> findByNiveauAcces(NiveauAcces niveauAcces);
    Optional<Admin> findByEmail(String email);
} 