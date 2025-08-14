import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous, RendezVousDTO } from '../models/rendez-vous.model';


@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = 'http://localhost:8080/api/rendez-vous';

  constructor(private http: HttpClient) { }

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl);
  }

  getRendezVousById(id: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${this.apiUrl}/${id}`);
  }

  createRendezVous(rendezVous: RendezVousDTO): Observable<RendezVous> {
    return this.http.post<RendezVous>(this.apiUrl, rendezVous);
  }

  updateRendezVous(id: number, rendezVous: RendezVousDTO): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/${id}`, rendezVous);
  }

  deleteRendezVous(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Nouvelles fonctionnalités métier
  getRendezVousEnAttente(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/en-attente`);
  }

  getRendezVousConfirmes(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/confirmes`);
  }

  getRendezVousAnnules(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/annules`);
  }

  getRendezVousByPatient(patientId: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  getRendezVousByMedecin(medecinId: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/medecin/${medecinId}`);
  }

  confirmerRendezVous(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/confirmer`, {});
  }

  terminerRendezVous(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/terminer`, {});
  }

  annulerRendezVous(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/annuler`, {});
  }
  getRendezVousStats(medecinId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/medecin/${medecinId}/stats`);
}
} 