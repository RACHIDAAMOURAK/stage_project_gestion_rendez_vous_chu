import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

import { MedecinService } from '../../services/medecin.service';
import { DisponibiliteService } from '../../services/disponibilite.service';
import { RendezVousService } from '../../services/rendez-vous.service';
import { Medecin } from '../../models/medecin.model';
import { Disponibilite } from '../../models/disponibilite.model';
import { AuthService } from '../../services/auth.service'; 


@Component({
  selector: 'app-prendre-rendez-vous',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule
  ],
  template: `
    <div class="container">
      <h1>Prendre un Rendez-vous</h1>
      
      <mat-stepper #stepper>
        <!-- Étape 1: Choisir un médecin -->
        <mat-step [stepControl]="medecinForm">
          <form [formGroup]="medecinForm">
            <ng-template matStepLabel>Choisir un médecin</ng-template>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Spécialité</mat-label>
              <mat-select formControlName="specialite" (selectionChange)="onSpecialiteChange()">
                <mat-option *ngFor="let spec of specialites" [value]="spec">
                  {{spec}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Médecin</mat-label>
              <mat-select formControlName="medecinId" (selectionChange)="onMedecinChange()">
                <mat-option *ngFor="let medecin of medecinsFiltres" [value]="medecin.id">
                  Dr. {{medecin.prenom}} {{medecin.nom}} - {{medecin.specialite}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <div class="step-actions">
              <button mat-button matStepperNext [disabled]="medecinForm.invalid">Suivant</button>
            </div>
          </form>
        </mat-step>

        <!-- Étape 2: Choisir une date et heure -->
        <mat-step [stepControl]="dateForm">
          <form [formGroup]="dateForm">
            <ng-template matStepLabel>Choisir une date et heure</ng-template>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="date" required>
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width heure-field">
              <mat-label>Heure</mat-label>
              <mat-select formControlName="heure" required>
                <mat-option *ngFor="let creneau of creneauxDisponibles" [value]="creneau">
                  {{creneau}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <div class="step-actions">
              <button mat-button matStepperPrevious>Précédent</button>
              <button mat-button matStepperNext [disabled]="dateForm.invalid">Suivant</button>
            </div>
          </form>
        </mat-step>

        <!-- Étape 3: Informations du rendez-vous -->
        <mat-step [stepControl]="rdvForm">
          <form [formGroup]="rdvForm">
            <ng-template matStepLabel>Informations du rendez-vous</ng-template>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Motif de consultation</mat-label>
              <textarea matInput formControlName="motif" rows="4" required></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Notes supplémentaires</mat-label>
              <textarea matInput formControlName="notes" rows="3"></textarea>
            </mat-form-field>

            <div class="step-actions">
              <button mat-button matStepperPrevious>Précédent</button>
              <button mat-raised-button color="primary" (click)="confirmerRendezVous()" [disabled]="rdvForm.invalid">
                Confirmer le rendez-vous
              </button>
            </div>
          </form>
        </mat-step>
      </mat-stepper>

      <!-- Résumé du rendez-vous -->
      <mat-card class="resume-card" *ngIf="resumeRendezVous">
        <mat-card-header>
          <mat-card-title>Résumé du rendez-vous</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Médecin:</strong> Dr. {{resumeRendezVous.medecinNom}}</p>
          <p><strong>Date:</strong> {{resumeRendezVous.date | date:'dd/MM/yyyy'}}</p>
          <p><strong>Heure:</strong> {{resumeRendezVous.heure}}</p>
          <p><strong>Motif:</strong> {{resumeRendezVous.motif}}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 30px;
      color: #20B2AA;
      text-align: center;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .step-actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-top: 24px;
    }
    
    .resume-card {
      margin-top: 30px;
    }
    
    .resume-card p {
      margin: 8px 0;
      color: #20B2AA;
    }

    /* Style pour tous les menus déroulants (mat-select, mat-option, mat-datepicker) */
    ::ng-deep .mat-select-panel,
    ::ng-deep .mat-mdc-select-panel,
    ::ng-deep .mat-autocomplete-panel,
    ::ng-deep .mat-calendar,
    ::ng-deep .mat-datepicker-content {
      background: #fff !important;
      color: #20B2AA !important;
      opacity: 1 !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18) !important;
      backdrop-filter: none !important;
    }

    /* Style pour toutes les options des panels (spécialité, médecin, heure) */
    ::ng-deep .mat-option,
    ::ng-deep .mat-mdc-option {
      background: #fff !important;
      color: #20B2AA !important;
    }

    ::ng-deep .mat-option:hover,
    ::ng-deep .mat-mdc-option:hover {
      background: rgba(32, 178, 170, 0.08) !important;
    }

    ::ng-deep .mat-option.mat-selected,
    ::ng-deep .mat-mdc-option.mat-selected {
      background: rgba(32, 178, 170, 0.18) !important;
      color: #fff !important;
    }

    ::ng-deep .mat-select-value, ::ng-deep .mat-select-arrow, ::ng-deep .mat-select-trigger {
      color: #20B2AA !important;
    }

    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline {
      color: #20B2AA !important;
      border-color: #20B2AA !important;
    }

    ::ng-deep .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
      color: #20B2AA !important;
      border-color: #20B2AA !important;
    }

    /* Style pour les champs numériques (input type=number) en blanc */
    ::ng-deep input[type="number"] {
      background: #fff !important;
      color: #333 !important;
    }

    /* Style pour le champ d'heure (mat-select) */
    ::ng-deep .mat-select-panel .mat-option {
      color: #20B2AA !important;
    }


    /* Fond et texte du mat-select de l'heure uniquement (input affiché) */
    ::ng-deep .heure-field .mat-select-trigger {
      background: #20B2AA !important;
      color: #fff !important;
      border-radius: 4px;
      padding: 0 8px;
    }

    /* Fond du panel déroulant de l'heure */
    ::ng-deep .mat-select-panel[role="listbox"] {
      background: #20B2AA !important;
    }

    /* Couleur des options du panel de l'heure */
    ::ng-deep .mat-select-panel[role="listbox"] .mat-option {
      color: #fff !important;
    }

    /* Option sélectionnée et survolée dans le panel de l'heure */
    ::ng-deep .mat-select-panel[role="listbox"] .mat-option.mat-selected,
    ::ng-deep .mat-select-panel[role="listbox"] .mat-option.mat-active,
    ::ng-deep .mat-select-panel[role="listbox"] .mat-option:hover {
      background: #ffffffff !important;
      color: #20B2AA !important;
    }

    /* Bordure et label du champ heure */
    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline,
    ::ng-deep .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
      border-color: #20B2AA !important;
    }
    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-label {
      color: #20B2AA !important;
    }

    /* Couleur turquoise pour tous les labels, textes, et titres */
    label,
    .mat-label,
    .mat-step-label,
    .mat-step-text-label,
    .mat-form-field-label,
    .mat-card-title,
    .mat-card-content,
    .mat-stepper-label,
    .mat-stepper-horizontal-line,
    .mat-stepper-vertical-line,
    .mat-step-icon-content,
    .mat-step-header .mat-step-label,
    .mat-step-header .mat-step-icon {
      color: #20B2AA !important;
      border-color: #20B2AA !important;
    }

    /* Bordures turquoise pour les champs */
    ::ng-deep .mat-form-field-outline,
    ::ng-deep .mat-form-field-outline-thick {
      border-color: #20B2AA !important;
    }

    /* Style pour la date sélectionnée dans le datepicker */
    ::ng-deep .mat-calendar-body-selected, ::ng-deep .mat-calendar-body-active {
      background-color: #20B2AA !important;
      color: #fff !important;
    }

    /* Style pour le survol des options */
    ::ng-deep .mat-option.mat-active, ::ng-deep .mat-option:hover {
      background: #20B2AA !important;
      color: #fff !important;
    }
  `]
})
export class PrendreRendezVousComponent implements OnInit {
  medecinForm!: FormGroup;
  dateForm!: FormGroup;
  rdvForm!: FormGroup;

  medecins: Medecin[] = [];
  medecinsFiltres: Medecin[] = [];
  specialites: string[] = [];
  creneauxDisponibles: string[] = [];
  disponibilites: Disponibilite[] = [];

  resumeRendezVous: any = null;

  constructor(
    private fb: FormBuilder,
    private medecinService: MedecinService,
    private disponibiliteService: DisponibiliteService,
    private rendezVousService: RendezVousService,
    private snackBar: MatSnackBar,
      private authService: AuthService 

  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadMedecins();
  }

  private initForms(): void {
    this.medecinForm = this.fb.group({
      specialite: ['', Validators.required],
      medecinId: ['', Validators.required]
    });

    this.dateForm = this.fb.group({
      date: ['', Validators.required],
      heure: ['', Validators.required]
    });

    this.rdvForm = this.fb.group({
      motif: ['', Validators.required],
      notes: ['']
    });
  }

  loadMedecins(): void {
    this.medecinService.getAllMedecins().subscribe(medecins => {
      this.medecins = medecins;
      this.specialites = [...new Set(medecins.map(m => m.specialite))];
    });
  }

  onSpecialiteChange(): void {
    const specialite = this.medecinForm.get('specialite')?.value;
    this.medecinsFiltres = this.medecins.filter(m => m.specialite === specialite);
    this.medecinForm.get('medecinId')?.setValue('');
  }

  onMedecinChange(): void {
    const medecinId = this.medecinForm.get('medecinId')?.value;
    if (medecinId) {
      this.loadDisponibilites(medecinId);
    }
  }

  loadDisponibilites(medecinId: number): void {
    this.disponibiliteService.getDisponibilitesByMedecin(medecinId).subscribe(disponibilites => {
      this.disponibilites = disponibilites.filter(d => d.active);
      this.generateCreneaux();
    });
  }

  generateCreneaux(): void {
    // Générer les créneaux disponibles (exemple simplifié)
    this.creneauxDisponibles = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];
  }

  confirmerRendezVous(): void {
    if (this.medecinForm.valid && this.dateForm.valid && this.rdvForm.valid) {
      const medecinId = this.medecinForm.get('medecinId')?.value;
      const date = this.dateForm.get('date')?.value;
      const heure = this.dateForm.get('heure')?.value;
      const motif = this.rdvForm.get('motif')?.value;
      const notes = this.rdvForm.get('notes')?.value;

      // TODO: Récupérer l'ID du patient connecté
const patientId = this.authService.getUserId();

if (!patientId) {
  this.snackBar.open("Utilisateur non authentifié !", "Fermer", { duration: 3000 });
  return;
}

      const rendezVousData = {
        patientId: patientId,
        medecinId: medecinId,
        dateHeure: `${date.toISOString().split('T')[0]}T${heure}:00`,
        dureeMinutes: 30,
        statut: 'EN_ATTENTE',
        motif: motif,
        notes: notes
      };

      this.rendezVousService.createRendezVous(rendezVousData).subscribe({
        next: () => {
          this.snackBar.open('Rendez-vous créé avec succès !', 'Fermer', { duration: 3000 });
          // TODO: Naviguer vers le tableau de bord patient
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          this.snackBar.open('Erreur lors de la création du rendez-vous', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
} 