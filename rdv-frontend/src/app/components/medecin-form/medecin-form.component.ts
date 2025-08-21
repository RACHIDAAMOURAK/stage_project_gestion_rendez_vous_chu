import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from '../../services/specialite.service';
import { Specialite } from '../../models/specialite.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MedecinService } from '../../services/medecin.service';
import { Medecin, MedecinDTO } from '../../models/medecin.model';
import { UtilisateurService } from '../../services/utilisateur.service';
import { InscriptionDTO } from '../../models/inscription-dto.model';

@Component({
  selector: 'app-medecin-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ isEditMode ? 'Modifier' : 'Ajouter' }} un Médecin</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="medecinForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Nom</mat-label>
              <input matInput formControlName="nom" required>
              <mat-error *ngIf="medecinForm.get('nom')?.hasError('required')">
                Le nom est requis
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Prénom</mat-label>
              <input matInput formControlName="prenom" required>
              <mat-error *ngIf="medecinForm.get('prenom')?.hasError('required')">
                Le prénom est requis
              </mat-error>
            </mat-form-field>
          </div>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required>
              <mat-error *ngIf="medecinForm.get('email')?.hasError('required')">
                L'email est requis
              </mat-error>
              <mat-error *ngIf="medecinForm.get('email')?.hasError('email')">
                Format d'email invalide
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Mot de passe</mat-label>
              <input matInput formControlName="motDePasse" type="password" required>
              <mat-error *ngIf="medecinForm.get('motDePasse')?.hasError('required')">
                Le mot de passe est requis
              </mat-error>
            </mat-form-field>
          </div>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Numéro RPPS</mat-label>
              <input matInput formControlName="numeroRPPS" required>
              <mat-error *ngIf="medecinForm.get('numeroRPPS')?.hasError('required')">
                Le numéro RPPS est requis
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Spécialité</mat-label>
              <mat-select formControlName="specialite" required>
                <mat-option *ngFor="let spec of specialites" [value]="spec.nom">
                  {{ spec.nom }}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="medecinForm.get('specialite')?.hasError('required')">
                La spécialité est requise
              </mat-error>
            </mat-form-field>
          </div>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="2"></textarea>
            </mat-form-field>
          </div>
          <div class="form-actions">
            <button mat-button type="button" (click)="onCancel()">Annuler</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="medecinForm.invalid">
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
    .form-actions {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }
    mat-card {
      margin: 20px;
    }
    /* Correction de la transparence des panels pour le menu déroulant spécialité */
    ::ng-deep .mat-select-panel,
    ::ng-deep .mat-mdc-select-panel,
    ::ng-deep .mat-autocomplete-panel {
      background: #fff !important;
      opacity: 1 !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18) !important;
      backdrop-filter: none !important;
    }
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
  `]
})
export class MedecinFormComponent implements OnInit {
  medecinForm!: FormGroup;
  isEditMode = false;
  medecinId?: number;
  specialites: Specialite[] = [];

  constructor(
    private fb: FormBuilder,
    private medecinService: MedecinService,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private specialiteService: SpecialiteService
  ) {}

  ngOnInit(): void {
    // Charger les spécialités depuis l'API
    this.specialiteService.getAll().subscribe({
      next: (data) => this.specialites = data,
      error: () => this.specialites = []
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    if (id) {
      this.medecinId = +id;
      this.medecinService.getMedecinById(this.medecinId).subscribe(medecin => {
        this.initForm(medecin);
      });
    } else {
      this.initForm();
    }
  }

  private initForm(medecin?: Medecin): void {
    this.medecinForm = this.fb.group({
      nom: [medecin?.nom || '', Validators.required],
      prenom: [medecin?.prenom || '', Validators.required],
      email: [medecin?.email || '', [Validators.required, Validators.email]],
      numeroRPPS: [medecin?.numeroRPPS || '', Validators.required],
      specialite: [medecin?.specialite || '', Validators.required],
      description: [medecin?.description || ''],
      motDePasse: [medecin?.motDePasse || '', Validators.required],
      role: ['MEDECIN']
    });
  }

  onSubmit(): void {
    if (this.medecinForm.valid) {
      const formValue = this.medecinForm.value;
      const inscriptionDto: InscriptionDTO = {
        nom: formValue.nom,
        prenom: formValue.prenom,
        email: formValue.email,
        motDePasse: formValue.motDePasse,
        role: 'MEDECIN',
        numeroRPPS: formValue.numeroRPPS,
        specialite: formValue.specialite,
        description: formValue.description
      };
      if (this.isEditMode && this.medecinId) {
        // Edition: on garde la logique existante
        const updateData = { ...formValue };
        if (!updateData.motDePasse) {
          delete updateData.motDePasse;
        }
        this.medecinService.updateMedecin(this.medecinId, updateData).subscribe({
          next: () => {
            this.snackBar.open('Médecin modifié avec succès', 'Fermer', { duration: 3000 });
            this.router.navigate(['/medecins']);
          },
          error: (error) => {
            console.error('Erreur lors de la modification:', error);
            this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 3000 });
          }
        });
      } else {
        this.utilisateurService.inscrireUtilisateur(inscriptionDto).subscribe({
          next: () => {
            this.snackBar.open('Médecin ajouté avec succès', 'Fermer', { duration: 3000 });
            this.router.navigate(['/medecins']);
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
    this.router.navigate(['/medecins']);
  }
}
