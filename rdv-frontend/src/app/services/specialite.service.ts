import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialite } from '../models/specialite.model';

@Injectable({ providedIn: 'root' })
export class SpecialiteService {
  private apiUrl = 'http://localhost:8080/api/specialites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(this.apiUrl);
  }

  getById(id: number): Observable<Specialite> {
    return this.http.get<Specialite>(`${this.apiUrl}/${id}`);
  }

  create(specialite: Omit<Specialite, 'id'>): Observable<Specialite> {
    return this.http.post<Specialite>(this.apiUrl, specialite);
  }

  update(id: number, specialite: Specialite): Observable<Specialite> {
    return this.http.put<Specialite>(`${this.apiUrl}/${id}`, specialite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
