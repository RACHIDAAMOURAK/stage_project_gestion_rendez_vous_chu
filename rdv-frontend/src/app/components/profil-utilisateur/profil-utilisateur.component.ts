import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil-utilisateur',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.css']
})
export class ProfilUtilisateurComponent {
  userForm: FormGroup;
  user: any;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.user = this.authService.getCurrentUser();
    this.userForm = this.fb.group({
      nom: [this.user?.nom || ''],
      prenom: [this.user?.prenom || ''],
      email: [this.user?.email || ''],
      role: [this.user?.role || ''],
      motDePasse: [this.user?.motDePasse || '']
    });
  }

  enregistrer() {
    const updatedUser = {
      id: this.user?.id,
      nom: this.userForm.value.nom,
      prenom: this.userForm.value.prenom,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      motDePasse: this.userForm.value.motDePasse
    };
    this.authService.updateUserApi(updatedUser).subscribe({
      next: (userApi) => {
        this.authService.updateUser(userApi); // met à jour localStorage et le state
        alert('Profil mis à jour dans la base de données !');
        this.user = userApi;
      },
      error: () => {
        alert('Erreur lors de la mise à jour du profil !');
      }
    });
  }
}
