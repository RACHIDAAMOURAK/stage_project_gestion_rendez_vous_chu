import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RendezVousService } from '../../services/rendez-vous.service';
import { RendezVous } from '../../models/rendez-vous.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-rendez-vous',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <mat-card *ngIf="rdvForm">
      <mat-card-header>
        <mat-card-title>Modifier le Rendez-vous</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="rdvForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Patient ID</mat-label>
            <input matInput formControlName="patientId" type="number" required>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Médecin ID</mat-label>
            <input matInput formControlName="medecinId" type="number" required>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Date/Heure</mat-label>
            <input matInput formControlName="dateHeure" type="datetime-local" required>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Durée (minutes)</mat-label>
            <input matInput formControlName="dureeMinutes" type="number" required>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Statut</mat-label>
            <mat-select formControlName="statut" required>
              <mat-option value="EN_ATTENTE">En attente</mat-option>
              <mat-option value="CONFIRME">Confirmé</mat-option>
              <mat-option value="ANNULE">Annulé</mat-option>
              <mat-option value="TERMINE">Terminé</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Motif</mat-label>
            <textarea matInput formControlName="motif" rows="2"></textarea>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Notes</mat-label>
            <textarea matInput formControlName="notes" rows="2"></textarea>
          </mat-form-field>
          <div class="form-actions">
            <button mat-button type="button" (click)="onCancel()">Annuler</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="rdvForm.invalid">Enregistrer</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`.full-width { width: 100%; margin-bottom: 16px; } .form-actions { display: flex; gap: 16px; margin-top: 16px; }`]
})
export class EditRendezVousComponent implements OnInit {
  rdvForm!: FormGroup;
  rdvId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private rendezVousService: RendezVousService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rdvId = +this.route.snapshot.paramMap.get('id')!;
    this.rendezVousService.getRendezVousById(this.rdvId).subscribe(rdv => {
      this.rdvForm = this.fb.group({
        patientId: [rdv.patientId, Validators.required],
        medecinId: [rdv.medecinId, Validators.required],
        dateHeure: [rdv.dateHeure ? rdv.dateHeure.substring(0,16) : '', Validators.required],
        dureeMinutes: [rdv.dureeMinutes, Validators.required],
        statut: [rdv.statut, Validators.required],
        motif: [rdv.motif || ''],
        notes: [rdv.notes || ''],
        dateCreation: [rdv.dateCreation || ''],
        dateModification: [rdv.dateModification || '']
      });
    });
  }

  onSubmit(): void {
    if (this.rdvForm.valid) {
      const formValue = this.rdvForm.value;
      // Correction du format dateHeure (datetime-local -> ISO)
      let dateHeure = formValue.dateHeure;
      if (dateHeure && dateHeure.length === 16) {
        dateHeure = dateHeure + ':00';
      }
      // On s'assure d'envoyer date_creation et date_modification si attendus par le backend
      const updateData = {
        ...formValue,
        id: this.rdvId,
        patientId: Number(formValue.patientId),
        medecinId: Number(formValue.medecinId),
        dureeMinutes: Number(formValue.dureeMinutes),
        dateHeure: dateHeure,
        dateCreation: formValue.dateCreation,
        dateModification: formValue.dateModification
      };
      this.rendezVousService.updateRendezVous(this.rdvId, updateData).subscribe({
        next: () => {
          this.snackBar.open('Rendez-vous modifié avec succès', 'Fermer', { duration: 3000 });
          this.router.navigate(['/rendez-vous']);
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/rendez-vous']);
  }
}
