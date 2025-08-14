import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisponibiliteService } from '../../services/disponibilite.service';
import { Disponibilite } from '../../models/disponibilite.model';
import { MedecinService } from '../../services/medecin.service';
import { Medecin } from '../../models/medecin.model';

@Component({
  selector: 'app-disponibilite-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  template: `
    <div class="container fade-in">
      <div class="page-header">
        <h1 class="page-title">📅 Gestion des Disponibilités</h1>
        <p class="page-subtitle">Gérer les plannings et disponibilités des médecins</p>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="list-title">
            <mat-icon>schedule</mat-icon>
            Liste des Disponibilités
          </mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="disponibilites" matSort>
              <!-- Colonne Médecin -->
              <ng-container matColumnDef="medecin">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Médecin </th>
                <td mat-cell *matCellDef="let disponibilite"> {{ getMedecinName(disponibilite.medecinId) }} </td>
              </ng-container>

              <!-- Colonne Date -->
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Jour </th>
                <td mat-cell *matCellDef="let disponibilite">
                  {{ getFrenchDay(disponibilite.date, disponibilite.jourSemaine) }}
                </td>
              </ng-container>

              <!-- Colonne Heure Début -->
              <ng-container matColumnDef="heureDebut">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Heure Début </th>
                <td mat-cell *matCellDef="let disponibilite"> {{ disponibilite.heureDebut }} </td>
              </ng-container>

              <!-- Colonne Heure Fin -->
              <ng-container matColumnDef="heureFin">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Heure Fin </th>
                <td mat-cell *matCellDef="let disponibilite"> {{ disponibilite.heureFin }} </td>
              </ng-container>

              <!-- Colonne Statut -->
              <ng-container matColumnDef="statut">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Statut </th>
                <td mat-cell *matCellDef="let disponibilite"> 
                  <span class="status-badge" [ngClass]="disponibilite.active ? 'available' : 'unavailable'">
                    {{ disponibilite.active ? 'Disponible' : 'Non disponible' }}
                  </span>
                </td>
              </ng-container>

              <!-- Colonne Actions -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let disponibilite">
                  <button mat-icon-button (click)="editDisponibilite(disponibilite)" matTooltip="Modifier" style="color: #20B2AA">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="deleteDisponibilite(disponibilite.id)" matTooltip="Supprimer" style="color: #20B2AA">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 50]" showFirstLastButtons></mat-paginator>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="actions">
        <button mat-raised-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Retour
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
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

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
    }
    th.mat-header-cell:not(:last-child),
    th.mat-mdc-header-cell:not(:last-child),
    td.mat-cell:not(:last-child),
    td.mat-mdc-cell:not(:last-child) {
      border-right: 1px solid #e0e0e0 !important;
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

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      display: inline-block;
    }

    .status-badge.available {
      background-color: rgba(16, 185, 129, 0.1);
      color: #16a34a !important;
    }

    .status-badge.unavailable {
      background-color: rgba(239, 68, 68, 0.1);
      color: #dc2626 !important;
    }

    .actions {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .actions button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .actions button:first-child {
      background: var(--gradient-primary);
      color: white;
    }

    .actions button:first-child:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    .actions button:last-child {
      background: transparent;
      color: var(--text-secondary);
      border: 2px solid var(--border-color);
    }

    .actions button:last-child:hover {
      background: var(--background-light);
      color: var(--text-primary);
    }

    mat-card {
      margin-bottom: 2rem;
      border: 1px solid var(--border-color);
      border-radius: 12px;
      box-shadow: 0 4px 6px var(--shadow-color);
    }

    mat-card-header {
      margin-bottom: 1rem;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-primary);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
      
      .page-title {
        font-size: 2rem;
      }
      
      .actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class DisponibiliteListComponent implements OnInit {
  frenchDays: string[] = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  getFrenchDay(dateStr?: string, jourSemaine?: string): string {
    if (dateStr) {
      const date = new Date(dateStr);
      return this.frenchDays[date.getDay()] + ' (' + date.toLocaleDateString('fr-FR') + ')';
    }
    if (jourSemaine) {
      // Si déjà en français, retourne tel quel, sinon tente de traduire
      const jours = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      const joursFr = ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
      const idx = jours.indexOf(jourSemaine);
      if (idx !== -1) return joursFr[idx];
      return jourSemaine;
    }
    return '';
  }
  disponibilites: Disponibilite[] = [];
  displayedColumns: string[] = ['medecin', 'date', 'heureDebut', 'heureFin', 'statut', 'actions'];
  medecins: Medecin[] = [];

  constructor(
    private disponibiliteService: DisponibiliteService,
    private medecinService: MedecinService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    Promise.all([
      this.medecinService.getAllMedecins().toPromise(),
      this.disponibiliteService.getAllDisponibilites().toPromise()
    ]).then(([medecins, disponibilites]) => {
      this.medecins = medecins || [];
      this.disponibilites = disponibilites || [];
    }).catch(error => {
      console.error('Erreur lors du chargement des données:', error);
      this.snackBar.open('Erreur lors du chargement des données', 'Fermer', { duration: 3000 });
    });
  }

  getMedecinName(medecinId: number): string {
    const medecin = this.medecins.find(m => m.id === medecinId);
    return medecin ? `${medecin.nom} ${medecin.prenom}` : String(medecinId);
  }



  editDisponibilite(disponibilite: Disponibilite): void {
    this.router.navigate(['/disponibilites/edit', disponibilite.id]);
  }

  deleteDisponibilite(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette disponibilité ?')) {
      this.disponibiliteService.deleteDisponibilite(id).subscribe({
        next: () => {
          this.snackBar.open('Disponibilité supprimée avec succès', 'Fermer', { duration: 3000 });
          this.loadAllData();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
} 