import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  template: `
    <div class="dashboard-container fade-in">
      <div class="page-header">
        <h1 class="page-title">🏥 Tableau de bord Administrateur</h1>
        <p class="page-subtitle">Gestion complète du système de rendez-vous hospitalier</p>
      </div>

      <div class="dashboard-actions">
        <button mat-raised-button class="btn-turquoise" (click)="navigateToAddMedecin()">
          <mat-icon>person_add</mat-icon>
          Ajouter un Médecin
        </button>
        <button mat-raised-button class="btn-turquoise" (click)="navigateToAddPatient()">
          <mat-icon>person_add</mat-icon>
          Ajouter un Patient
        </button>
      </div>
      <mat-grid-list cols="2" rowHeight="200px" gutterSize="16px">
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>people</mat-icon>
                Gestion des Patients
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Gérer la liste des patients, leurs informations et leurs dossiers</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button class="btn-turquoise" (click)="navigateToPatients()">
                Voir les Patients
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>medical_services</mat-icon>
                Gestion des Médecins
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Gérer la liste des médecins, leurs spécialités et leurs disponibilités</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button class="btn-turquoise" (click)="navigateToMedecins()">
                Voir les Médecins
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>event</mat-icon>
                Gestion des Rendez-vous
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Consulter et gérer tous les rendez-vous du système</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button class="btn-turquoise" (click)="navigateToRendezVous()">
                Voir les Rendez-vous
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>schedule</mat-icon>
                Gestion des Disponibilités
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Gérer les plannings et disponibilités des médecins</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button class="btn-turquoise" (click)="navigateToDisponibilites()">
                Voir les Disponibilités
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>

      <div class="logout-section">
        <button mat-raised-button color="warn" (click)="logout()">
          <mat-icon>logout</mat-icon>
          Se déconnecter
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #20B2AA !important;
      margin-bottom: 0.5rem;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px rgba(32,178,170,0.08);
    }

    .page-subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .dashboard-card {
      width: 100%;
      height: 100%;
      margin: 8px;
      transition: all 0.3s ease;
      border: 1px solid var(--border-color);
    }

    .dashboard-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px #20B2AA;
    }

    .dashboard-card mat-card-header {
      margin-bottom: 1rem;
    }

    .dashboard-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      color: #20B2AA !important;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px rgba(32,178,170,0.08);
    }

    .dashboard-card mat-card-content {
      margin-bottom: 1rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .dashboard-card mat-card-actions {
      padding: 1rem;
    }

    .dashboard-card mat-card-actions button {
      width: 100%;
      height: 48px;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .dashboard-card mat-card-actions button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px #20B2AA(37, 99, 235, 0.3);
    }

    .logout-section {
      text-align: center;
      margin-top: 3rem;
    }

    .logout-section button {
      background: var(--gradient-warm);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logout-section button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    mat-grid-list {
      margin-bottom: 2rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }
      
      .page-title {
        font-size: 2rem;
      }
      
      mat-grid-list {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class AdminDashboardComponent {
  navigateToAddMedecin(): void {
    this.router.navigate(['/medecins/add']);
  }

  navigateToAddPatient(): void {
    this.router.navigate(['/patients/add']);
  }
  constructor(private router: Router) {}

  navigateToPatients(): void {
    this.router.navigate(['/patients']);
  }

  navigateToMedecins(): void {
    this.router.navigate(['/medecins']);
  }

  navigateToRendezVous(): void {
    this.router.navigate(['/rendez-vous']);
  }

  navigateToDisponibilites(): void {
    this.router.navigate(['/disponibilites']);
  }

  logout(): void {
    // TODO: Implement logout logic
    this.router.navigate(['/login']);
  }
} 