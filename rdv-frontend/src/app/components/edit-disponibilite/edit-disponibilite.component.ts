import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { DisponibiliteService } from '../../services/disponibilite.service';
import { Disponibilite } from '../../models/disponibilite.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-disponibilite',
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
    <mat-card *ngIf="dispoForm">
      <mat-card-header>
        <mat-card-title>Modifier la Disponibilité</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="dispoForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Jour de la semaine</mat-label>
            <mat-select formControlName="jourSemaine" required>
              <mat-option value="MONDAY">Lundi</mat-option>
              <mat-option value="TUESDAY">Mardi</mat-option>
              <mat-option value="WEDNESDAY">Mercredi</mat-option>
              <mat-option value="THURSDAY">Jeudi</mat-option>
              <mat-option value="FRIDAY">Vendredi</mat-option>
              <mat-option value="SATURDAY">Samedi</mat-option>
              <mat-option value="SUNDAY">Dimanche</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Heure Début</mat-label>
            <input matInput formControlName="heureDebut" type="time" required>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Heure Fin</mat-label>
            <input matInput formControlName="heureFin" type="time" required>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Durée du créneau (minutes)</mat-label>
            <input matInput formControlName="dureeCreneauMinutes" type="number" required>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Active</mat-label>
            <mat-select formControlName="active" required>
              <mat-option [value]="true">Oui</mat-option>
              <mat-option [value]="false">Non</mat-option>
            </mat-select>
          </mat-form-field>
          <div class="form-actions">
            <button mat-button type="button" (click)="onCancel()">Annuler</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="dispoForm.invalid">Enregistrer</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`.full-width { width: 100%; margin-bottom: 16px; } .form-actions { display: flex; gap: 16px; margin-top: 16px; }`]
})
export class EditDisponibiliteComponent implements OnInit {
  dispoForm!: FormGroup;
  dispoId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private disponibiliteService: DisponibiliteService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dispoId = +this.route.snapshot.paramMap.get('id')!;
    this.disponibiliteService.getDisponibiliteById(this.dispoId).subscribe(dispo => {
      this.dispoForm = this.fb.group({
        medecinId: [dispo.medecinId, Validators.required],
        jourSemaine: [dispo.jourSemaine, Validators.required],
        heureDebut: [dispo.heureDebut, Validators.required],
        heureFin: [dispo.heureFin, Validators.required],
        dureeCreneauMinutes: [dispo.dureeCreneauMinutes, Validators.required],
        active: [dispo.active, Validators.required]
      });
    });
  }

  onSubmit(): void {
    if (this.dispoForm.valid) {
      const formValue = this.dispoForm.value;
        const updateData = {
          ...formValue,
          id: this.dispoId,
          medecinId: formValue.medecinId
        };
      this.disponibiliteService.updateDisponibilite(this.dispoId, updateData).subscribe({
        next: () => {
          this.snackBar.open('Disponibilité modifiée avec succès', 'Fermer', { duration: 3000 });
          this.router.navigate(['/disponibilites']);
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/disponibilites']);
  }
}
