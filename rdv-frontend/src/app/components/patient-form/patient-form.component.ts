import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

import { PatientService } from '../../services/patient.service';
import { Patient, PatientDTO } from '../../models/patient.model';
import { UtilisateurService } from '../../services/utilisateur.service';
import { InscriptionDTO } from '../../models/inscription-dto.model';

@Component({
  selector: 'app-patient-form',
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
    MatNativeDateModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ isEditMode ? 'Modifier' : 'Ajouter' }} un Patient</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="patientForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Nom</mat-label>
              <input matInput formControlName="nom" required>
              <mat-error *ngIf="patientForm.get('nom')?.hasError('required')">
                Le nom est requis
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Prénom</mat-label>
              <input matInput formControlName="prenom" required>
              <mat-error *ngIf="patientForm.get('prenom')?.hasError('required')">
                Le prénom est requis
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required>
              <mat-error *ngIf="patientForm.get('email')?.hasError('required')">
                L'email est requis
              </mat-error>
              <mat-error *ngIf="patientForm.get('email')?.hasError('email')">
                Format d'email invalide
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Mot de passe</mat-label>
              <input matInput formControlName="motDePasse" type="password" required>
              <mat-error *ngIf="patientForm.get('motDePasse')?.hasError('required')">
                Le mot de passe est requis
              </mat-error>
            </mat-form-field>
          </div>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Numéro de Sécurité</mat-label>
              <input matInput formControlName="numeroSecu" required>
              <mat-error *ngIf="patientForm.get('numeroSecu')?.hasError('required')">
                Le numéro de sécurité est requis
              </mat-error>
            </mat-form-field>
          </div>

          <div class="form-row">
           <mat-form-field appearance="outline">
  <mat-label>Date de Naissance</mat-label>
  <input matInput [matDatepicker]="picker" formControlName="dateNaissance" required>
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
  <mat-error *ngIf="patientForm.get('dateNaissance')?.hasError('required')">
    La date de naissance est requise
  </mat-error>
</mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Sexe</mat-label>
              <mat-select formControlName="sexe" required>
                <mat-option value="HOMME">Homme</mat-option>
                <mat-option value="FEMME">Femme</mat-option>
              </mat-select>
              <mat-error *ngIf="patientForm.get('sexe')?.hasError('required')">
                Le sexe est requis
              </mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Adresse</mat-label>
            <textarea matInput formControlName="adresse" rows="3" required></textarea>
            <mat-error *ngIf="patientForm.get('adresse')?.hasError('required')">
              L'adresse est requise
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Antécédents</mat-label>
            <textarea matInput formControlName="antecedents" rows="4"></textarea>
          </mat-form-field>

          <div class="form-actions">
            <button mat-button type="button" (click)="onCancel()">Annuler</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="patientForm.invalid">
              {{ isEditMode ? 'Modifier' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .form-row mat-form-field {
      flex: 1;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .form-actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-top: 24px;
    }
    
    mat-card {
      margin: 20px;
      max-width: 800px;
    }


  ::ng-deep .mat-datepicker-content {
    background-color: #fff !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18) !important;
  }

  ::ng-deep .mat-calendar {
    color: #20B2AA !important;
  }

  ::ng-deep .mat-calendar .mat-calendar-body-cell {
    background-color: #f9f9f9 !important;
  }

  ::ng-deep .mat-calendar .mat-calendar-body-cell:hover {
    background-color: rgba(32, 178, 170, 0.08) !important;
  }

  ::ng-deep .mat-calendar .mat-calendar-body-cell.mat-calendar-body-selected {
    background-color: rgba(32, 178, 170, 0.18) !important;
    color: #fff !important;
  }









  `]
})
export class PatientFormComponent implements OnInit {
  patientForm!: FormGroup;
  isEditMode = false;
  patientId?: number;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    if (id) {
      this.patientId = +id;
      this.patientService.getPatientById(this.patientId).subscribe(patient => {
        this.initForm(patient);
      });
    } else {
      this.initForm();
    }
  }

  private initForm(patient?: Patient): void {
    this.patientForm = this.fb.group({
      nom: [patient?.nom || '', Validators.required],
      prenom: [patient?.prenom || '', Validators.required],
      email: [patient?.email || '', [Validators.required, Validators.email]],
      numeroSecu: [patient?.numeroSecu || '', Validators.required],
      dateNaissance: [patient?.dateNaissance || '', Validators.required],
      adresse: [patient?.adresse || '', Validators.required],
      sexe: [patient?.sexe || '', Validators.required],
      antecedents: [patient?.antecedents || ''],
     motDePasse: [patient?.motDePasse || '', Validators.required],
      role: ['PATIENT']
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formValue = this.patientForm.value;
      const dateNaissance = formValue.dateNaissance instanceof Date
        ? formValue.dateNaissance.toISOString().split('T')[0]
        : formValue.dateNaissance;
      const inscriptionDto: InscriptionDTO = {
        nom: formValue.nom,
        prenom: formValue.prenom,
        email: formValue.email,
        motDePasse: formValue.motDePasse,
        role: 'PATIENT',
        numeroSecu: formValue.numeroSecu,
        dateNaissance: dateNaissance,
        adresse: formValue.adresse,
        sexe: formValue.sexe,
        antecedents: formValue.antecedents
      };
      if (this.isEditMode && this.patientId) {
        const updateData = { ...formValue };
        if (!updateData.motDePasse) {
          delete updateData.motDePasse;
        }
        this.patientService.updatePatient(this.patientId, updateData).subscribe({
          next: () => {
            this.snackBar.open('Patient modifié avec succès', 'Fermer', { duration: 3000 });
            this.router.navigate(['/patients']);
          },
          error: (error) => {
            console.error('Erreur lors de la modification:', error);
            this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 3000 });
          }
        });
      } else {
        this.utilisateurService.inscrireUtilisateur(inscriptionDto).subscribe({
          next: () => {
            this.snackBar.open('Patient ajouté avec succès', 'Fermer', { duration: 3000 });
            this.router.navigate(['/patients']);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout:', error);
            this.snackBar.open('Erreur lors de l\'ajout', 'Fermer', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/patients']);
  }
}