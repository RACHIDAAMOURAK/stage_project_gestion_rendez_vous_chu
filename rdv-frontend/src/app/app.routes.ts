import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { MedecinListComponent } from './components/medecin-list/medecin-list.component';
import { RendezVousListComponent } from './components/rendez-vous-list/rendez-vous-list.component';
import { DisponibiliteListComponent } from './components/disponibilite-list/disponibilite-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SpecialiteListComponent } from './components/specialite-list/specialite-list.component';
import { MedecinDashboardComponent } from './components/medecin-dashboard/medecin-dashboard.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { MedecinFormComponent } from './components/medecin-form/medecin-form.component';
import { PrendreRendezVousComponent } from './components/prendre-rendez-vous/prendre-rendez-vous.component';
import { MesRendezVousComponent } from './components/mes-rendez-vous/mes-rendez-vous.component';
import { ProfilUtilisateurComponent } from './components/profil-utilisateur/profil-utilisateur.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'mes-rendez-vous/:id', component: MesRendezVousComponent },
  { path: 'mes-rendez-vous', component: MesRendezVousComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'PATIENT' } },
  { path: 'profil-utilisateur', component: ProfilUtilisateurComponent, canActivate: [AuthGuard] },
  // Formulaires d'ajout (ADMIN)
  { path: 'patients/add', component: PatientFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ADMIN' } },
  { path: 'patients/edit/:id', component: PatientFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ADMIN' } },
  { path: 'medecins/add', component: MedecinFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ADMIN' } },
  { path: 'medecins/edit/:id', component: MedecinFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ADMIN' } },
  
  // Routes Admin (protégées)
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  { 
    path: 'patients', 
    component: PatientListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  { 
    path: 'medecins', 
    component: MedecinListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  { 
    path: 'rendez-vous', 
    component: RendezVousListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'rendez-vous/edit/:id',
    loadComponent: () => import('./components/edit-rendez-vous/edit-rendez-vous.component').then(m => m.EditRendezVousComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  { 
    path: 'disponibilites', 
    component: DisponibiliteListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'specialites',
    component: SpecialiteListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'disponibilites/edit/:id',
    loadComponent: () => import('./components/edit-disponibilite/edit-disponibilite.component').then(m => m.EditDisponibiliteComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },
  
  // Routes Médecin (protégées)
  { 
    path: 'medecin', 
    component: MedecinDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'MEDECIN' }
  },
  
  // Routes Patient (protégées)
  { 
    path: 'patient', 
    component: PatientDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'PATIENT' }
  },
  { 
    path: 'prendre-rendez-vous', 
    component: PrendreRendezVousComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'PATIENT' }
  },
  
  // Route par défaut
  { path: '**', redirectTo: '/login' }
];
