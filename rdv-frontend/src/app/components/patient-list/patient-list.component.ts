import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card>
    <mat-card-header>
      <mat-card-title class="list-title">Liste des Patients</mat-card-title>
    </mat-card-header>
      <mat-card-content>
        <div *ngIf="loading" class="loading-container">
          <mat-spinner></mat-spinner>
        </div>
        
        <table *ngIf="!loading" mat-table [dataSource]="patients" class="mat-elevation-z8">
          <!-- Colonne Nom -->
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let patient">{{patient.nom}}</td>
          </ng-container>

          <!-- Colonne Prénom -->
          <ng-container matColumnDef="prenom">
            <th mat-header-cell *matHeaderCellDef>Prénom</th>
            <td mat-cell *matCellDef="let patient">{{patient.prenom}}</td>
          </ng-container>

          <!-- Colonne Email -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let patient">{{patient.email}}</td>
          </ng-container>

          <!-- Colonne Numéro de Sécurité -->
          <ng-container matColumnDef="numeroSecu">
            <th mat-header-cell *matHeaderCellDef>Numéro de Sécurité</th>
            <td mat-cell *matCellDef="let patient">{{patient.numeroSecu}}</td>
          </ng-container>

          <!-- Colonne Actions -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let patient">
             <button mat-icon-button (click)="editPatient(patient)" style="color: #20B2AA">
              <mat-icon>edit</mat-icon>
              </button>
           <button mat-icon-button (click)="deletePatient(patient.id!)" style="color: #20B2AA">
           <mat-icon>delete</mat-icon>
           </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div *ngIf="!loading && patients.length === 0" class="no-data">
          <p>Aucun patient trouvé.</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    
    table {
      width: 100%;
      margin-top: 20px;
    }
    th.mat-header-cell:not(:last-child),
    th.mat-mdc-header-cell:not(:last-child),
    td.mat-cell:not(:last-child),
    td.mat-mdc-cell:not(:last-child) {
      border-right: 1px solid #e0e0e0ff !important;
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
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  loading = true;
displayedColumns: string[] = ['nom', 'prenom', 'email', 'numeroSecu', 'actions'];
  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des patients:', error);
        this.loading = false;
      }
    });
  }

  editPatient(patient: Patient): void {
    this.router.navigate(['/patients/edit', patient.id]);
  }

  deletePatient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          this.loadPatients(); // Recharger la liste
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
} 