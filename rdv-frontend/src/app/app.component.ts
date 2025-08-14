import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MedecinViewService } from './services/medecin-view.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <app-navigation></app-navigation>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 80px);
      background-color: var(--background-light);
    }
  `]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private medecinViewService: MedecinViewService
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  resetMedecinView() {
    if (this.router.url.includes('/medecin')) {
      this.medecinViewService.resetView();
    } else {
      this.router.navigate(['/medecin/accueil']);
    }
  }

  showMedecinStats() {
    if (this.router.url.includes('/medecin')) {
      this.medecinViewService.showStats();
    } else {
      this.router.navigate(['/medecin/statistiques']);
    }
  }
}