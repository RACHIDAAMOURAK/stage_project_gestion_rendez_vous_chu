import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <header class="app-header">
      <div class="header-content">
        <!-- Logo et Titre -->
        <div class="logo-container">
          <img src="/logo.png" alt="Logo Hôpital" class="logo">
          <h1 class="logo-text">Hôpital Rendez-vous</h1>
        </div>

        <!-- Menu de Navigation -->
        <nav class="nav-menu" *ngIf="isAuthenticated()">
          <ng-container [ngSwitch]="getUserRole()">
            
            <!-- Menu Admin -->
            <ng-container *ngSwitchCase="'ADMIN'">
              <a routerLink="/admin" routerLinkActive="active" class="nav-link">
                <mat-icon>dashboard</mat-icon>
                Tableau de bord
              </a>
              <a routerLink="/patients" routerLinkActive="active" class="nav-link">
                <mat-icon>people</mat-icon>
                Patients
              </a>
              <a routerLink="/medecins" routerLinkActive="active" class="nav-link">
                <mat-icon>medical_services</mat-icon>
                Médecins
              </a>
              <a routerLink="/rendez-vous" routerLinkActive="active" class="nav-link">
                <mat-icon>event</mat-icon>
                Rendez-vous
              </a>
              <a routerLink="/disponibilites" routerLinkActive="active" class="nav-link">
                <mat-icon>schedule</mat-icon>
                Disponibilités
              </a>
            </ng-container>

            <!-- Menu Médecin -->
            <ng-container *ngSwitchCase="'MEDECIN'">
              <a routerLink="/medecin" routerLinkActive="active" class="nav-link">
                <mat-icon>dashboard</mat-icon>
                Mon Tableau de bord
              </a>
              <a routerLink="/mes-rendez-vous" routerLinkActive="active" class="nav-link">
                <mat-icon>event</mat-icon>
                Mes Rendez-vous
              </a>
              <a routerLink="/mes-disponibilites" routerLinkActive="active" class="nav-link">
                <mat-icon>schedule</mat-icon>
                Mes Disponibilités
              </a>
            </ng-container>

            <!-- Menu Patient -->
            <ng-container *ngSwitchCase="'PATIENT'">
              <a routerLink="/patient" routerLinkActive="active" class="nav-link">
                <mat-icon>dashboard</mat-icon>
                Mon Espace
              </a>
              <a routerLink="/prendre-rendez-vous" routerLinkActive="active" class="nav-link">
                <mat-icon>add_circle</mat-icon>
                Prendre RDV
              </a>
              <a routerLink="/mes-rendez-vous" routerLinkActive="active" class="nav-link">
                <mat-icon>event</mat-icon>
                Mes Rendez-vous
              </a>
            </ng-container>

          </ng-container>

          <!-- Menu Utilisateur -->
          <div class="user-menu">
            <button mat-button [matMenuTriggerFor]="userMenu" class="user-button">
              <mat-icon>account_circle</mat-icon>
              {{ getUserName() }}
              <mat-icon>arrow_drop_down</mat-icon>
            </button>
            <mat-menu #userMenu="matMenu">
              <button mat-menu-item (click)="goToProfile()">
                <mat-icon>person</mat-icon>
                Mon Profil
              </button>
              <button mat-menu-item (click)="logout()">
                <mat-icon>logout</mat-icon>
                Se déconnecter
              </button>
            </mat-menu>
          </div>
        </nav>

        <!-- Bouton Connexion si non connecté -->
        <div *ngIf="!isAuthenticated()">
          <a routerLink="/login" class="btn btn-primary">
            <mat-icon>login</mat-icon>
            Se connecter
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background: var(--background-white);
      box-shadow: 0 2px 10px var(--shadow-color);
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1400px;
      margin: 0 auto;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      height: 40px;
      width: auto;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 0;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link:hover {
      color: var(--primary-color);
      background-color: var(--background-light);
    }

    .nav-link.active {
      color: var(--primary-color);
      background-color: rgba(37, 99, 235, 0.1);
    }

    .user-menu {
      margin-left: 1rem;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .btn {
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
      text-decoration: none;
    }

    .btn-primary {
      background: var(--gradient-primary);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }

      .nav-menu {
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
      }

      .nav-link {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      }

      .logo-text {
        font-size: 1.25rem;
      }
    }
  `]
})
export class NavigationComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getUserRole(): string {
    const user = this.authService.getCurrentUser();
    return user?.role || '';
  }

  getUserName(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      return `${user.prenom} ${user.nom}`;
    }
    return 'Utilisateur';
  }

  goToProfile(): void {
    // TODO: Navigate to profile page
    console.log('Go to profile');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 