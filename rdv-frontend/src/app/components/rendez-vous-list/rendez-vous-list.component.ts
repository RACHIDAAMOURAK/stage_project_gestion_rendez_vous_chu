import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { RendezVousService } from '../../services/rendez-vous.service';
import { RendezVous } from '../../models/rendez-vous.model';
import { PatientService } from '../../services/patient.service';
import { MedecinService } from '../../services/medecin.service';
import { Patient } from '../../models/patient.model';
import { Medecin } from '../../models/medecin.model';

@Component({
  selector: 'app-rendez-vous-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
      <mat-card-title class="list-title">Liste des Rendez-vous</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="loading" class="loading-container">
          <mat-spinner></mat-spinner>
        </div>
        

        <table *ngIf="!loading" mat-table [dataSource]="rendezVous" class="mat-elevation-z8">
          <!-- Colonne Numéro -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>Numéro</th>
            <td mat-cell *matCellDef="let rdv">{{rdv.id}}</td>
          </ng-container>

          <!-- Colonne Patient (Nom Prénom) -->
          <ng-container matColumnDef="patientId">
            <th mat-header-cell *matHeaderCellDef>Patient</th>
            <td mat-cell *matCellDef="let rdv">{{getPatientName(rdv.patientId)}}</td>
          </ng-container>

          <!-- Colonne Médecin (Nom Prénom) -->
          <ng-container matColumnDef="medecinId">
            <th mat-header-cell *matHeaderCellDef>Médecin</th>
            <td mat-cell *matCellDef="let rdv">{{getMedecinName(rdv.medecinId)}}</td>
          </ng-container>

          <!-- Colonne Date/Heure -->
          <ng-container matColumnDef="dateHeure">
            <th mat-header-cell *matHeaderCellDef>Date/Heure</th>
            <td mat-cell *matCellDef="let rdv">{{rdv.dateHeure | date:'dd/MM/yyyy HH:mm'}}</td>
          </ng-container>

          <!-- Colonne Durée -->
          <ng-container matColumnDef="dureeMinutes">
            <th mat-header-cell *matHeaderCellDef>Durée (min)</th>
            <td mat-cell *matCellDef="let rdv">{{rdv.dureeMinutes}}</td>
          </ng-container>

          <!-- Colonne Statut -->
          <ng-container matColumnDef="statut">
            <th mat-header-cell *matHeaderCellDef>Statut</th>
            <td mat-cell *matCellDef="let rdv">
              <mat-chip [color]="getStatutColor(rdv.statut)" selected>
                {{getStatutLabel(rdv.statut)}}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Colonne Actions -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let rdv">
              <button mat-icon-button (click)="editRendezVous(rdv)" style="color: #20B2AA">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="deleteRendezVous(rdv.id!)" style="color: #20B2AA">
                <mat-icon>delete</mat-icon>
              </button>
              <button mat-icon-button (click)="confirmerRendezVous(rdv.id!)" *ngIf="rdv.statut === 'EN_ATTENTE'" style="color: #20B2AA">
                <mat-icon>check</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div *ngIf="!loading && rendezVous.length === 0" class="no-data">
          <p>Aucun rendez-vous trouvé.</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    th.mat-header-cell:not(:last-child),
    th.mat-mdc-header-cell:not(:last-child),
    td.mat-cell:not(:last-child),
    td.mat-mdc-cell:not(:last-child) {
      border-right: 1px solid #e0e0e0 !important;
    }
    .loading-container {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    
    table {
      width: 100%;
      margin-top: 20px;
    }
    th.mat-header-cell, th.mat-mdc-header-cell {
      background: #20B2AA !important;
      color: #fff !important;
      font-weight: bold !important;
      text-align: center !important;
      border-bottom: 2px solid #fff !important;
    }
    .mat-table thead tr {
      background: #20B2AA !important;
    }
    td.mat-cell {
      text-align: center;
    }
    .list-title {
      text-align: center;
      width: 100%;
      font-size: 2rem;
      font-weight: bold;
      color: #20B2AA;
      letter-spacing: 1px;
    }
    
    .no-data {
      text-align: center;
      padding: 20px;
      color: #666;
    }
    
    mat-card {
      margin: 20px;
    }
  `]
})
export class RendezVousListComponent implements OnInit {
  rendezVous: RendezVous[] = [];
  loading = true;
  displayedColumns: string[] = ['id', 'patientId', 'medecinId', 'dateHeure', 'dureeMinutes', 'statut', 'actions'];

  patients: Patient[] = [];
  medecins: Medecin[] = [];

  constructor(
    private rendezVousService: RendezVousService,
    private patientService: PatientService,
    private medecinService: MedecinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loading = true;
    Promise.all([
      this.patientService.getAllPatients().toPromise(),
      this.medecinService.getAllMedecins().toPromise()
    ]).then(([patients, medecins]) => {
      this.patients = patients || [];
      this.medecins = medecins || [];
      this.loadRendezVous();
    }).catch(error => {
      console.error('Erreur lors du chargement des patients/médecins:', error);
      this.loading = false;
    });
  }

  loadRendezVous(): void {
    this.rendezVousService.getAllRendezVous().subscribe({
      next: (rendezVous) => {
        this.rendezVous = rendezVous;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des rendez-vous:', error);
        this.loading = false;
      }
    });
  }

  getPatientName(patientId: number): string {
    const patient = this.patients.find(p => p.id === patientId);
    return patient ? `${patient.nom} ${patient.prenom}` : String(patientId);
  }

  getMedecinName(medecinId: number): string {
    const medecin = this.medecins.find(m => m.id === medecinId);
    return medecin ? `${medecin.nom} ${medecin.prenom}` : String(medecinId);
  }

  getStatutColor(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'warn';
      case 'CONFIRME': return 'primary';
      case 'TERMINE': return 'accent';
      case 'ANNULE': return '';
      default: return '';
    }
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'En attente';
      case 'CONFIRME': return 'Confirmé';
      case 'TERMINE': return 'Terminé';
      case 'ANNULE': return 'Annulé';
      default: return statut;
    }
  }

  editRendezVous(rendezVous: RendezVous): void {
    this.router.navigate(['/rendez-vous/edit', rendezVous.id]);
  }

  deleteRendezVous(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      this.rendezVousService.deleteRendezVous(id).subscribe({
        next: () => {
          this.loadRendezVous(); // Recharger la liste
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  confirmerRendezVous(id: number): void {
    this.rendezVousService.confirmerRendezVous(id).subscribe({
      next: () => {
        this.loadRendezVous(); // Recharger la liste
      },
      error: (error) => {
        console.error('Erreur lors de la confirmation:', error);
      }
    });
  }
}