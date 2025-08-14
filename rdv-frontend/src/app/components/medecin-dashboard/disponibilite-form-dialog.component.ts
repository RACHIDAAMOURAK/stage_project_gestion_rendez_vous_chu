import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disponibilite } from '../../models/disponibilite.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-disponibilite-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 mat-dialog-title>{{data && data.id ? 'Modifier' : 'Ajouter'}} une disponibilité</h2>
    <form (ngSubmit)="onSubmit()" #dispoForm="ngForm" class="dispo-form-dialog">
      <div class="form-row">
        <label for="jour">Jour :</label>
        <select id="jour" [(ngModel)]="formModel.jourSemaine" name="jourSemaine" required>
          <option *ngFor="let j of joursSemaine" [value]="j">{{joursSemaineFr[j]}}</option>
        </select>
      </div>
      <div class="form-row">
        <label for="heureDebut">Heure début :</label>
        <input id="heureDebut" type="time" [(ngModel)]="formModel.heureDebut" name="heureDebut" required>
      </div>
      <div class="form-row">
        <label for="heureFin">Heure fin :</label>
        <input id="heureFin" type="time" [(ngModel)]="formModel.heureFin" name="heureFin" required>
      </div>
      <div class="form-row">
        <label for="duree">Durée créneau (min) :</label>
        <input id="duree" type="number" [(ngModel)]="formModel.dureeCreneauMinutes" name="dureeCreneauMinutes" min="1" required>
      </div>
      <div class="form-row">
        <label for="active">Active :</label>
        <input id="active" type="checkbox" [(ngModel)]="formModel.active" name="active">
      </div>
      <div class="form-actions">
        <button type="submit" class="custom-form-btn">{{data && data.id ? 'Modifier' : 'Ajouter'}}</button>
        <button type="button" class="custom-form-btn" (click)="onCancel()">Annuler</button>
      </div>
    </form>
  `,
  styles: [`
    .dispo-form-dialog {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
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
    .custom-form-btn {
      background: #14c7c4 !important;
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
      transition: background 0.2s;
    }
    .custom-form-btn:hover {
      background: #16a7a5 !important;
      color: #fff !important;
    }
  `]
})
export class DisponibiliteFormDialogComponent {
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
  formModel: any;

  constructor(
    public dialogRef: MatDialogRef<DisponibiliteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Disponibilite
  ) {
    // Si data existe (modification), on copie les valeurs
    if (data) {
      this.formModel = { ...data };
    } else {
      this.formModel = {
        jourSemaine: this.joursSemaine[0],
        heureDebut: '',
        heureFin: '',
        dureeCreneauMinutes: 30,
        active: true
      };
    }
  }

  onSubmit(): void {
    if (this.formModel.jourSemaine && this.formModel.heureDebut && this.formModel.heureFin && this.formModel.dureeCreneauMinutes) {
      this.dialogRef.close(this.formModel);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
