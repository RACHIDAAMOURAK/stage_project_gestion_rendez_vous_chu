import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Specialite } from '../../models/specialite.model';
import { SpecialiteService } from '../../services/specialite.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-specialite-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './specialite-list.component.html',
  styleUrls: ['./specialite-list.component.css']
})
export class SpecialiteListComponent implements OnInit {
  specialites: Specialite[] = [];
  selectedSpecialite: Specialite | null = null;
  isEditing = false;
  newSpecialite: Partial<Specialite> = { nom: '' };

  constructor(
    private specialiteService: SpecialiteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSpecialites();
  }

  loadSpecialites(): void {
    this.specialiteService.getAll().subscribe({
      next: (data) => (this.specialites = data),
      error: () => this.snackBar.open('Erreur de chargement des spécialités', 'Fermer', { duration: 3000 })
    });
  }

  selectSpecialite(s: Specialite): void {
  this.selectedSpecialite = { ...s };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedSpecialite = null;
    this.isEditing = false;
  }

  saveSpecialite(): void {
    if (this.selectedSpecialite) {
      this.specialiteService.update(this.selectedSpecialite.id, this.selectedSpecialite).subscribe({
        next: () => {
          this.snackBar.open('Spécialité modifiée', 'Fermer', { duration: 2000 });
          this.loadSpecialites();
          this.cancelEdit();
        },
        error: () => this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 3000 })
      });
    }
  }

  deleteSpecialite(id: number): void {
    if (confirm('Supprimer cette spécialité ?')) {
      this.specialiteService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Spécialité supprimée', 'Fermer', { duration: 2000 });
          this.loadSpecialites();
        },
        error: () => this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 })
      });
    }
  }

  addSpecialite(): void {
    if (!this.newSpecialite.nom || this.newSpecialite.nom.trim() === '') {
      this.snackBar.open('Le nom de la spécialité est requis', 'Fermer', { duration: 2000 });
      return;
    }
    const specialiteToSend = { nom: this.newSpecialite.nom };
    this.specialiteService.create(specialiteToSend).subscribe({
      next: () => {
        this.snackBar.open('Spécialité ajoutée', 'Fermer', { duration: 2000 });
        this.loadSpecialites();
        this.newSpecialite = { nom: '' };
      },
      error: () => this.snackBar.open('Erreur lors de l\'ajout', 'Fermer', { duration: 3000 })
    });
  }
}
