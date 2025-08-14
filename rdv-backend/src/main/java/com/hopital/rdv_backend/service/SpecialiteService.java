package com.hopital.rdv_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hopital.rdv_backend.entity.Specialite;
import com.hopital.rdv_backend.repository.SpecialiteRepository;

@Service
public class SpecialiteService {
    @Autowired
    private SpecialiteRepository specialiteRepository;

    public List<Specialite> findAll() {
        return specialiteRepository.findAll();
    }

    public Optional<Specialite> findById(Long id) {
        return specialiteRepository.findById(id);
    }

    public Specialite save(Specialite specialite) {
        return specialiteRepository.save(specialite);
    }

    public void deleteById(Long id) {
        specialiteRepository.deleteById(id);
    }
}
