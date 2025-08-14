import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur, UtilisateurDTO } from '../models/utilisateur.model';

import { InscriptionDTO } from '../models/inscription-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080/api/utilisateurs';

  constructor(private http: HttpClient) { }

  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  createUtilisateur(utilisateur: UtilisateurDTO): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, utilisateur);
  }

  updateUtilisateur(id: number, utilisateur: UtilisateurDTO): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/${id}`, utilisateur);
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Fonctionnalités spécifiques
  getUtilisateursByRole(role: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/role/${role}`);
  }

  getUtilisateursActifs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/actifs`);
  }

  activerUtilisateur(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/activer`, {});
  }

  desactiverUtilisateur(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/desactiver`, {});
  }

  // Authentification
  login(email: string, motDePasse: string): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiUrl}/login`, { email, motDePasse });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  // Inscription complète (utilisateur + patient/médecin)
  inscrireUtilisateur(data: InscriptionDTO): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiUrl}/inscription`, data);
  }
} 