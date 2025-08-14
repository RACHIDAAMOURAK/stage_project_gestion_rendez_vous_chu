import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { RendezVousService } from '../../services/rendez-vous.service';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <div class="dashboard-container fade-in">
      <div class="page-header">
        <h1 class="page-title">👤 Espace Patient</h1>
        <p class="page-subtitle">Gérez vos rendez-vous et votre santé</p>
      </div>
      
      <div class="patient-actions">
        <h2 class="patient-title">Bienvenue sur votre espace patient</h2>
        <div class="patient-btns">
          <div class="patient-btn-card">
            <h3>Prendre un rendez-vous</h3>
            <p>Réservez facilement une consultation médicale en ligne avec le médecin de votre choix.</p>
            <button mat-raised-button color="primary" class="patient-btn" (click)="prendreRendezVous()">
              Prendre RDV
            </button>
          </div>
          <div class="patient-btn-card">
            <h3>Voir mes rendez-vous</h3>
            <p>Consultez la liste complète de tous vos rendez-vous médicaux passés et à venir.</p>
            <button mat-raised-button color="accent" class="patient-btn" (click)="voirMesRendezVous()">
              Voir Mes Rendez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .patient-title {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      color: #20B2AA;
      margin-bottom: 2rem;
    }
    .patient-btns {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      justify-content: center;
      margin-top: 2rem;
      flex-wrap: nowrap;
      align-items: stretch;
    }
    .patient-btn-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(21,101,192,0.08);
      padding: 2rem 1.5rem;
      min-width: 320px;
      max-width: 320px;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0;
    }
    .patient-btn-card h3 {
      color: #20B2AA;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    .patient-btn-card p {
      color: #333;
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
    .patient-btn {
      width: 100%;
      min-width: 200px;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 8px;
      padding: 12px 0;
      margin-top: 0.5rem;
      box-shadow: 0 2px 8px rgba(0, 167, 111, 0.12);
      transition: background 0.2s, box-shadow 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .patient-btn[color="primary"],
    .patient-btn[color="accent"] {
      background: #20B2AA !important;
      color: #fff !important;
      border: none !important;
      box-shadow: 0 2px 8px rgba(32, 178, 170, 0.18);
    }
    .patient-btn:hover {
      box-shadow: 0 6px 20px rgba(0, 167, 111, 0.18);
      filter: brightness(1.08);
    }
    @media (max-width: 700px) {
      .patient-btns {
        flex-direction: column;
        gap: 1.5rem;
        flex-wrap: wrap;
        align-items: stretch;
      }
      .patient-btn-card {
        min-width: 100%;
        max-width: 100%;
      }
      .dashboard-container {
        padding: 1rem;
      }
    }
  `]
})
export class PatientDashboardComponent implements OnInit {
  stats = {
    totalRendezVous: 0,
    rendezVousAujourdhui: 0,
    enAttente: 0,
    confirmes: 0
  };

  prochainsRendezVous: any[] = [];

  constructor(
    private rendezVousService: RendezVousService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatientData();
  }

  loadPatientData(): void {
    // TODO: Récupérer l'ID du patient connecté
    const patientId = 1; // Temporaire

    // Charger les statistiques du patient
    this.rendezVousService.getRendezVousByPatient(patientId).subscribe(rendezVous => {
      this.stats.totalRendezVous = rendezVous.length;
      this.stats.enAttente = rendezVous.filter(rdv => rdv.statut === 'EN_ATTENTE').length;
      this.stats.confirmes = rendezVous.filter(rdv => rdv.statut === 'CONFIRME').length;
      
      // Prochains rendez-vous (limiter à 5)
      this.prochainsRendezVous = rendezVous
        .filter(rdv => rdv.statut === 'EN_ATTENTE' || rdv.statut === 'CONFIRME')
        .slice(0, 5);
    });
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

  prendreRendezVous(): void {
    this.router.navigate(['/prendre-rendez-vous']);
  }

  voirMesRendezVous(): void {
    this.router.navigate(['/mes-rendez-vous']);
  }

  modifierProfil(): void {
    // TODO: Naviguer vers le formulaire de modification du profil
    console.log('Modifier mon profil');
  }

  voirHistorique(): void {
    // TODO: Naviguer vers l'historique médical
    console.log('Voir mon historique médical');
  }

  annulerRendezVous(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      this.rendezVousService.annulerRendezVous(id).subscribe({
        next: () => {
          this.loadPatientData(); // Recharger les données
        },
        error: (error) => {
          console.error('Erreur lors de l\'annulation:', error);
        }
      });
    }
  }
} 