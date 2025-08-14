package com.hopital.rdv_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hopital.rdv_backend.entity.Specialite;

public interface SpecialiteRepository extends JpaRepository<Specialite, Long> {
}
