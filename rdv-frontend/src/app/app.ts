 
  
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { MedecinViewService } from './services/medecin-view.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    MatToolbarModule, 
    MatButtonModule, 
    MatSnackBarModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
 
  title = 'rdv-frontend';

  constructor(public authService: AuthService, private router: Router, private medecinViewService: MedecinViewService) {}
  
  goToMedecinAccueil(): void {
    this.medecinViewService.resetView();
    this.router.navigate(['/medecin']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToAdminAccueil(): void {
    this.router.navigate(['/admin']);
  }

  goToPatientAccueil(): void {
    this.router.navigate(['/patient']);
  }
  goToMesRendezVous(): void {
    const user = this.authService.getCurrentUser();
    const patientId = user?.id;
    if (patientId) {
      this.router.navigate(['/mes-rendez-vous', patientId]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  voirMesRendezVous(): void {
    this.medecinViewService.showRendezVous();
  }
  voirStatistiques(): void {
    this.medecinViewService.showStats();
    this.router.navigate(['/medecin']);
  }
   voirDisponibilites(): void {
    this.medecinViewService.showDisponibilitesView();
    this.router.navigate(['/medecin']);
  }
}
