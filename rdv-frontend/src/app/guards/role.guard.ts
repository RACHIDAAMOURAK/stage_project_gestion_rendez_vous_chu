import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRole();
    
    if (userRole === requiredRole || userRole === 'ADMIN') {
      return true;
    } else {
      // Rediriger vers l'espace approprié
      this.redirectToAppropriateSpace(userRole);
      return false;
    }
  }

  private redirectToAppropriateSpace(role: string | null): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'MEDECIN':
        this.router.navigate(['/medecin']);
        break;
      case 'PATIENT':
        this.router.navigate(['/patient']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
} 