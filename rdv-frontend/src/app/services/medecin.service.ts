import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin, MedecinDTO } from '../models/medecin.model';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  private apiUrl = 'http://localhost:8080/api/medecins';

  constructor(private http: HttpClient) { }

  getAllMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(this.apiUrl);
  }

  getMedecinById(id: number): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.apiUrl}/${id}`);
  }

  createMedecin(medecin: MedecinDTO): Observable<Medecin> {
    return this.http.post<Medecin>(this.apiUrl, medecin);
  }

  updateMedecin(id: number, medecin: MedecinDTO): Observable<Medecin> {
    return this.http.put<Medecin>(`${this.apiUrl}/${id}`, medecin);
  }

  deleteMedecin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMedecinByNumeroRPPS(numeroRPPS: string): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.apiUrl}/numero-rpps/${numeroRPPS}`);
  }
} 