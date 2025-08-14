import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disponibilite, DisponibiliteDTO } from '../models/disponibilite.model';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {
  private apiUrl = 'http://localhost:8080/api/disponibilites';

  constructor(private http: HttpClient) { }

  getAllDisponibilites(): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(this.apiUrl);
  }

  getDisponibiliteById(id: number): Observable<Disponibilite> {
    return this.http.get<Disponibilite>(`${this.apiUrl}/${id}`);
  }

  createDisponibilite(disponibilite: DisponibiliteDTO): Observable<Disponibilite> {
    return this.http.post<Disponibilite>(this.apiUrl, disponibilite);
  }

  updateDisponibilite(id: number, disponibilite: DisponibiliteDTO): Observable<Disponibilite> {
    return this.http.put<Disponibilite>(`${this.apiUrl}/${id}`, disponibilite);
  }

  deleteDisponibilite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Nouvelles fonctionnalités métier
  getDisponibilitesActives(): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(`${this.apiUrl}/actives`);
  }

  getDisponibilitesInactives(): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(`${this.apiUrl}/inactives`);
  }

  getDisponibilitesByMedecin(medecinId: number): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(`${this.apiUrl}/medecin/${medecinId}`);
  }

  getDisponibilitesByJour(jourSemaine: string): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(`${this.apiUrl}/jour/${jourSemaine}`);
  }

  activerDisponibilite(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/activer`, {});
  }

  desactiverDisponibilite(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/desactiver`, {});
  }
} 