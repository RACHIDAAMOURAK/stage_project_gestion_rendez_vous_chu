import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MedecinService } from '../../services/medecin.service';
import { Medecin } from '../../models/medecin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medecin-list',
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
      <mat-card-title class="list-title">Liste des Médecins</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="loading" class="loading-container">
          <mat-spinner></mat-spinner>
        </div>
        
        <table *ngIf="!loading" mat-table [dataSource]="medecins" class="mat-elevation-z8">
          <!-- Colonne ID -->
         <!-- Colonne ID retirée -->

          <!-- Colonne Nom -->
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let medecin">{{medecin.nom}}</td>
          </ng-container>

          <!-- Colonne Prénom -->
          <ng-container matColumnDef="prenom">
            <th mat-header-cell *matHeaderCellDef>Prénom</th>
            <td mat-cell *matCellDef="let medecin">{{medecin.prenom}}</td>
          </ng-container>

          <!-- Colonne Email -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let medecin">{{medecin.email}}</td>
          </ng-container>

          <!-- Colonne Numéro RPPS -->
          <ng-container matColumnDef="numeroRPPS">
            <th mat-header-cell *matHeaderCellDef>Numéro RPPS</th>
            <td mat-cell *matCellDef="let medecin">{{medecin.numeroRPPS}}</td>
          </ng-container>

          <!-- Colonne Spécialité -->
          <ng-container matColumnDef="specialite">
            <th mat-header-cell *matHeaderCellDef>Spécialité</th>
            <td mat-cell *matCellDef="let medecin">{{medecin.specialite}}</td>
          </ng-container>

          <!-- Colonne Actions -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let medecin">
             <button mat-icon-button (click)="editMedecin(medecin)" style="color: #20B2AA">
                <mat-icon>edit</mat-icon>
              </button>
             <button mat-icon-button (click)="deleteMedecin(medecin.id!)" style="color: #20B2AA">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div *ngIf="!loading && medecins.length === 0" class="no-data">
          <p>Aucun médecin trouvé.</p>
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
export class MedecinListComponent implements OnInit {
  medecins: Medecin[] = [];
  loading = true;
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'numeroRPPS', 'specialite', 'actions'];

  constructor(private medecinService: MedecinService, private router: Router) {}

  ngOnInit(): void {
    this.loadMedecins();
  }

  loadMedecins(): void {
    this.loading = true;
    this.medecinService.getAllMedecins().subscribe({
      next: (medecins) => {
        this.medecins = medecins;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des médecins:', error);
        this.loading = false;
      }
    });
  }

  editMedecin(medecin: Medecin): void {
    this.router.navigate(['/medecins/edit', medecin.id]);
  }

  deleteMedecin(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.medecinService.deleteMedecin(id).subscribe({
        next: () => {
          this.loadMedecins(); // Recharger la liste
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
} 