import { Component, OnInit } from '@angular/core';
import { Disponibilite } from '../../models/disponibilite.model';
type MedecinViewType = 'home' | 'stats' | 'rdv' | 'disponibilites';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { RendezVousService } from '../../services/rendez-vous.service';
import { DisponibiliteService } from '../../services/disponibilite.service';
import { AuthService } from '../../services/auth.service';
import { MedecinViewService } from '../../services/medecin-view.service';
import { DisponibiliteFormDialogComponent } from './disponibilite-form-dialog.component';

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDialogModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>👤 Espace Médecin</h1>
      <p>Gérez vos rendez-vous </p>
      <!-- Vue Accueil -->
      <div *ngIf="currentView === 'home'">
        <div class="main-actions-row">
          <mat-card class="action-card">
            <mat-card-header>
              <mat-card-title style="width:100%; display:flex; align-items:center; justify-content:center; text-align:center;">Vos Rendez-vous</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p style="text-align:center;">Consultez, gérez et confirmez vos rendez-vous avec les patients.</p>
              <button class="custom-button" (click)="showRendezVous()">
                <span style="width:100%; text-align:center;">Voir mes Rendez-vous</span>
              </button>
            </mat-card-content>
          </mat-card>
          <mat-card class="action-card">
            <mat-card-header>
              <mat-card-title style="width:100%; display:flex; align-items:center; justify-content:center; text-align:center;">Vos Disponibilités</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p style="text-align:center;">Gérez vos créneaux horaires disponibles pour les consultations.</p>
              <button class="custom-button" (click)="showDisponibilites()">
                <span style="width:100%; text-align:center;">Voir mes Disponibilités</span>
              </button>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <!-- Vue Statistiques -->
      <div *ngIf="currentView === 'stats'" class="stats-view">
        <h2 style="text-align:center; margin-bottom:30px; color:#20B2AA; font-weight:700; letter-spacing:1px;">Statistiques </h2>
        <button mat-button (click)="resetView()" class="back-button styled-retour">
          <mat-icon></mat-icon>
          <span style="font-weight:500; font-size:18px; margin-left:4px; color:#14c7c4;">Retour</span>
        </button>
        <div class="stats-row">
          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Total Rendez-vous</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">{{stats.totalRendezVous}}</div>
            </mat-card-content>
          </mat-card>
          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Rendez-vous aujourd'hui</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number">{{stats.rendezVousAujourdhui}}</div>
            </mat-card-content>
          </mat-card>
          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>En attente</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number" style="color:#e6a700;">{{stats.enAttente}}</div>
            </mat-card-content>
          </mat-card>
          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Confirmés</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-number" style="color:#14c7c4;">{{stats.confirmes}}</div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <!-- Vue Disponibilités -->
      <div *ngIf="currentView === 'disponibilites'" class="disponibilites-view">
        <button mat-button (click)="resetView()" class="back-button styled-retour">
          <mat-icon></mat-icon>
          <span style="font-weight:500; font-size:18px; margin-left:4px; color:#14c7c4;">Retour</span>
        </button>
        <h2 style="text-align:center; margin-bottom:30px; color:#333;">Gérer mes disponibilités</h2>
        <mat-card class="upcoming-card">
          <mat-card-header>
            <mat-card-title>Vos créneaux disponibles</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div *ngIf="loadingDisponibilites" class="no-rdv">
              <mat-progress-spinner diameter="30" mode="indeterminate"></mat-progress-spinner>
            </div>
            <div *ngIf="!loadingDisponibilites && mesDisponibilites.length === 0" class="no-rdv">
              Aucun créneau disponible pour le moment.
            </div>
            <div *ngIf="!loadingDisponibilites && mesDisponibilites.length > 0" class="table-container">
              <table class="dispo-table">
                <thead>
                  <tr>
                    <th>Jour</th>
                    <th>Heure début</th>
                    <th>Heure fin</th>
                    <th>Durée créneau</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let dispo of mesDisponibilites">
                    <td>{{joursSemaineFr[dispo.jourSemaine]}}</td>
                    <td>{{dispo.heureDebut}}</td>
                    <td>{{dispo.heureFin}}</td>
                    <td>{{dispo.dureeCreneauMinutes}} min</td>
                    <td>
                      <mat-chip [color]="dispo.active ? 'primary' : 'warn'" selected>
                        {{ dispo.active ? 'Active' : 'Inactive' }}
                      </mat-chip>
                    </td>
                    <td>
                      <div class="action-buttons">
                        <button mat-icon-button color="primary" (click)="onEditDisponibilite(dispo)" aria-label="Modifier">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button color="warn" (click)="onAnnulerDisponibilite(dispo)" aria-label="Annuler">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button class="custom-button" style="margin: 30px auto 0 auto; display: flex; align-items: center; justify-content: center; gap: 8px;" (click)="showFormAjout()">
              <mat-icon>add</mat-icon>
              <span style="width:100%; text-align:center;">Ajouter une disponibilité</span>
            </button>
          </mat-card-content>
        </mat-card>
      </div>
      <!-- Vue Rendez-vous -->
      <div *ngIf="currentView === 'rdv'" class="rdv-view">
        <button mat-button (click)="resetView()" class="back-button styled-retour">
          <mat-icon></mat-icon>
          <span style="font-weight:500; font-size:18px; margin-left:4px; color:#14c7c4;">Retour</span>
        </button>
        <mat-card class="upcoming-card">
          <mat-card-header>
            <mat-card-title>Prochains Rendez-vous</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div *ngIf="prochainsRendezVous.length === 0" class="no-rdv">
              <p>Aucun rendez-vous à venir</p>
            </div>
            <div *ngIf="prochainsRendezVous.length > 0" class="table-container">
              <table class="rdv-table">
                <thead>
                  <tr>
                    <th>Date/Heure</th>
                    <th>Patient</th>
                    <th>Durée</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let rdv of prochainsRendezVous">
                    <td>{{rdv.dateHeure | date:'dd/MM/yyyy HH:mm'}}</td>
                    <td>
                      {{ (rdv.patientNom && rdv.patientPrenom) ? (rdv.patientNom + ' ' + rdv.patientPrenom) : (rdv.patientNom || rdv.patientPrenom || ('ID: ' + rdv.patientId)) }}
                    </td>
                    <td>{{rdv.dureeMinutes}} min</td>
                    <td>
                      <mat-chip [color]="getStatutColor(rdv.statut)" selected>
                        {{ getStatutLabel(rdv.statut) }}
                      </mat-chip>
                    </td>
                    <td>
                      <div class="action-buttons">
                        <button mat-icon-button color="primary" (click)="confirmerRendezVous(rdv.id!)" *ngIf="rdv.statut === 'EN_ATTENTE'">
                          <mat-icon>check</mat-icon>
                        </button>
                        <button mat-icon-button color="warn" (click)="onAnnulerRendezVous(rdv)" *ngIf="rdv.statut !== 'ANNULE'">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .rdv-table {
      border-collapse: collapse;
      margin: 0 auto;
      min-width: 600px;
      background: #fff;
      box-shadow: 0 2px 8px rgba(20, 199, 196, 0.08);
      border-radius: 12px;
      overflow: hidden;
    }
    .rdv-table th, .rdv-table td {
      padding: 12px 18px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .rdv-table th {
      background: #f7f7f7;
      font-weight: 600;
      color: #14c7c4;
      font-size: 1rem;
    }
    .rdv-table tr:hover {
      background: #f0fcfc;
    }
    .rdv-table td {
      font-size: 1rem;
    }
    .dispo-form-container {
      margin: 30px auto 0 auto;
      max-width: 500px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(20, 199, 196, 0.08);
      padding: 24px 32px;
    }
    .dispo-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .form-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    }
    .form-row label {
      min-width: 120px;
      font-weight: 500;
      color: #14c7c4;
    }
    .form-row input, .form-row select {
      flex: 1;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
    }
    .form-actions button[type="submit"] {
      background: #16a7a5 !important;
      color: #fff !important;
      border: none !important;
      border-radius: 8px !important;
      font-size: 16px !important;
      padding: 10px 24px !important;
      cursor: pointer !important;
      box-shadow: none !important;
      margin: 0 4px !important;
      outline: none !important;
      display: inline-block !important;
    }
    .form-actions button[type="submit"]:hover {
      background: #14c7c4 !important;
      color: #fff !important;
    }
    .form-actions button[type="button"] {
      background: #16a7a5 !important;
      color: #fff !important;
      border: none !important;
      border-radius: 8px !important;
      font-size: 16px !important;
      padding: 10px 24px !important;
      cursor: pointer !important;
      box-shadow: none !important;
      margin: 0 4px !important;
      outline: none !important;
      display: inline-block !important;
    }
    .form-actions button[type="button"]:hover {
      background: #14c7c4 !important;
      color: #fff !important;
    }
    .custom-button {
      background-color: #16a7a5 !important;
      color: #fff !important;
      border: none !important;
      border-radius: 8px !important;
      font-size: 16px !important;
      padding: 12px 24px !important;
      cursor: pointer !important;
      box-shadow: none !important;
      margin-top: 15px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
    }
    .custom-button:hover {
      background-color: #14c7c4 !important;
      color: #fff !important;
    }
    /* Correction affichage icônes Material dans le tableau */
    .mat-icon {
      font-family: 'Material Icons';
      font-size: 24px;
      vertical-align: middle;
      line-height: 1;
      color: #333;
    }
    .action-buttons button {
      min-width: 36px;
      min-height: 36px;
      padding: 0;
      margin: 0 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .custom-button mat-icon {
      margin-right: 8px;
      font-size: 24px;
      vertical-align: middle;
    }
    .action-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    .table-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 20px;
    }
    .dispo-table {
      border-collapse: collapse;
      margin: 0 auto;
      min-width: 600px;
      background: #fff;
      box-shadow: 0 2px 8px rgba(20, 199, 196, 0.08);
      border-radius: 12px;
      overflow: hidden;
    }
    .dispo-table th, .dispo-table td {
      padding: 12px 18px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .dispo-table th {
      background: #f7f7f7;
      font-weight: 600;
      color: #14c7c4;
      font-size: 1rem;
    }
    .dispo-table tr:hover {
      background: #f0fcfc;
    }
    .dispo-table td {
      font-size: 1rem;
    }
.dashboard-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      margin-bottom: 30px;
      color: #333;
      text-align: center;
    }

    /* Styles communs */
    .back-button {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      color: white;
      background:  #14c7c4;
      border: none;
      box-shadow: none;
      cursor: pointer;
      padding-left: 0;
    }
    .styled-retour {
      justify-content: flex-end;
      margin-left: auto;
      margin-bottom: 30px;
      font-size: 18px;
      font-weight: 500;
      color: #14c7c4;
      background: #fff;
      border: 2px solid #14c7c4;
      border-radius: 8px;
      padding: 8px 20px;
      box-shadow: 0 2px 8px rgba(20, 199, 196, 0.08);
      transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
      outline: none;
      min-width: 120px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .styled-retour:hover {
      color: #fff;
      background: #14c7c4;
      border-color: #16a7a5;
      box-shadow: 0 4px 16px rgba(20, 199, 196, 0.15);
      text-decoration: none;
      color: #fff;
      background: #14c7c4;
      border-color: #16a7a5;
      box-shadow: 0 4px 16px rgba(20, 199, 196, 0.15);
    }

    /* Vue Accueil */
    .main-actions {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 30px;
      margin-top: 50px;
      flex-wrap: wrap;
    }

    .action-card {
      width: 350px;
      padding: 20px;
      text-align: center;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .action-card:hover {
      transform: translateY(-5px);
    }

    .custom-button {
      margin-top: 15px;
      padding: 12px 24px;
      font-size: 16px;
      background-color: #14c7c4;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .custom-button:hover {
      background-color: #16a7a5;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    /* Vue Statistiques */

    .stats-view {
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-row {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      justify-content: center;
      align-items: stretch;
      margin: 2rem auto;
      flex-wrap: nowrap;
      overflow-x: auto;
      width: fit-content;
      max-width: 100%;
    }
    .stats-row .stat-card {
      flex: 1 1 220px;
      min-width: 220px;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
    }
    .stats-row .stat-card .mat-card-header,
    .stats-row .stat-card .mat-card-title,
    .stats-row .stat-card .mat-card-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #16a7a5;
    }
    /* Responsive: on garde tout sur une ligne, scroll horizontal si besoin */
    @media (max-width: 1200px) {
      .stats-row {
        gap: 1rem;
      }
      .stats-row .stat-card {
        min-width: 200px;
        max-width: 260px;
      }
    }

    /* Vue Rendez-vous */
    .rdv-view {
      max-width: 800px;
      margin: 0 auto;
    }

    .upcoming-card {
      width: 100%;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
    }

    .no-rdv {
      text-align: center;
      padding: 20px;
      color: #666;
    }

    .rdv-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
      transition: background-color 0.2s ease;
    }

    .rdv-item:hover {
      background-color: #f9f9f9;
    }

    .rdv-item:last-child {
      border-bottom: none;
    }

    .rdv-info {
      flex: 1;
    }

    .rdv-time {
      font-weight: bold;
      color: #16a7a5;
    }

    .rdv-patient,
    .rdv-duration {
      color: #666;
      font-size: 0.9rem;
    }

    .rdv-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    @media (max-width: 768px) {
      .main-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .action-card {
        width: 100%;
        max-width: 350px;
      }
    }
  `]
})
export class MedecinDashboardComponent implements OnInit {
  // ...existing code...
  onAnnulerRendezVous(rdv: any): void {
    if (!rdv.id) return;
    this.rendezVousService.annulerRendezVous(rdv.id).subscribe({
      next: () => this.loadMedecinData(),
      error: () => alert("Erreur lors de l'annulation du rendez-vous")
    });
  }
  formVisible = false;
  formModel: any = {};
  joursSemaine = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
  joursSemaineFr: { [key: string]: string } = {
    MONDAY: 'Lundi',
    TUESDAY: 'Mardi',
    WEDNESDAY: 'Mercredi',
    THURSDAY: 'Jeudi',
    FRIDAY: 'Vendredi',
    SATURDAY: 'Samedi',
    SUNDAY: 'Dimanche'
  };
  stats = {
    totalRendezVous: 0,
    rendezVousAujourdhui: 0,
    enAttente: 0,
    confirmes: 0
  };
  prochainsRendezVous: any[] = [];
  currentView: MedecinViewType = 'home';
  mesDisponibilites: Disponibilite[] = [];
  loadingDisponibilites: boolean = false;

  constructor(
    private rendezVousService: RendezVousService,
    private disponibiliteService: DisponibiliteService,
    private authService: AuthService,
    private router: Router,
    private medecinViewService: MedecinViewService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMedecinData();
    this.medecinViewService.currentView$.subscribe((view: MedecinViewType) => {
      this.currentView = view;
      if (view !== 'home') {
        this.loadMedecinData();
      }
      if (view === 'disponibilites') {
        this.loadDisponibilites();
      }
    });
  }

  loadMedecinData(): void {
    const medecinId = this.authService.getUserId();
    if (!medecinId) {
      console.error('Aucun médecin connecté');
      return;
    }

    this.rendezVousService.getRendezVousByMedecin(medecinId).subscribe(rendezVous => {
      this.stats.totalRendezVous = rendezVous.length;
      this.stats.enAttente = rendezVous.filter(rdv => rdv.statut === 'EN_ATTENTE').length;
      this.stats.confirmes = rendezVous.filter(rdv => rdv.statut === 'CONFIRME').length;
      this.stats.rendezVousAujourdhui = rendezVous.filter(rdv =>
        new Date(rdv.dateHeure).toDateString() === new Date().toDateString()
      ).length;

      this.prochainsRendezVous = rendezVous
        .filter(rdv => rdv.statut === 'EN_ATTENTE' || rdv.statut === 'CONFIRME')
        .sort((a, b) => new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime())
        .slice(0, 5);
    });
  }

  resetView(): void {
    this.medecinViewService.resetView();
  }

  showRendezVous(): void {
    this.medecinViewService.showRendezVous();
  }

  showDisponibilites(): void {
    this.medecinViewService.showDisponibilitesView();
    this.router.navigate(['/medecin']);
    this.loadDisponibilites();
  }

  loadDisponibilites(): void {
    const medecinId = this.authService.getUserId();
    if (!medecinId) {
      this.mesDisponibilites = [];
      return;
    }
    this.loadingDisponibilites = true;
    this.disponibiliteService.getDisponibilitesByMedecin(medecinId).subscribe({
      next: (dispos) => {
        this.mesDisponibilites = dispos;
        this.loadingDisponibilites = false;
      },
      error: () => {
        this.mesDisponibilites = [];
        this.loadingDisponibilites = false;
      }
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

  confirmerRendezVous(id: number): void {
    this.rendezVousService.confirmerRendezVous(id).subscribe({
      next: () => this.loadMedecinData(),
      error: (error) => console.error('Erreur lors de la confirmation:', error)
    });
  }

  // Ouvre le formulaire d'ajout dans un dialog
  showFormAjout(): void {
    const dialogRef = this.dialog.open(DisponibiliteFormDialogComponent, {
      width: '420px',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const medecinId = this.authService.getUserId();
        if (!medecinId) return;
        const dto = { ...result, medecinId };
        this.disponibiliteService.createDisponibilite(dto).subscribe({
          next: () => this.loadDisponibilites(),
          error: () => alert('Erreur lors de l\'ajout')
        });
      }
    });
  }

  // Ouvre le formulaire de modification dans un dialog
  onEditDisponibilite(dispo: Disponibilite): void {
    const dialogRef = this.dialog.open(DisponibiliteFormDialogComponent, {
      width: '420px',
      data: dispo
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && dispo.id) {
        const medecinId = this.authService.getUserId();
        if (!medecinId) return;
        const dto = { ...result, medecinId };
        this.disponibiliteService.updateDisponibilite(dispo.id, dto).subscribe({
          next: () => this.loadDisponibilites(),
          error: () => alert('Erreur lors de la modification')
        });
      }
    });
  }

  // Annule (désactive) une disponibilité
  onAnnulerDisponibilite(dispo: Disponibilite): void {
    if (!dispo.id) return;
    this.disponibiliteService.desactiverDisponibilite(dispo.id).subscribe({
      next: () => this.loadDisponibilites(),
      error: () => alert("Erreur lors de l'annulation de la disponibilité")
    });
  }
}