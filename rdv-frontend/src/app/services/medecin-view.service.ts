import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedecinViewService {
  private currentView = new BehaviorSubject<'home'|'stats'|'rdv'|'disponibilites'>('home');
  showDisponibilitesView() {
    this.currentView.next('disponibilites');
  }
  
  currentView$ = this.currentView.asObservable();

  resetView() {
    this.currentView.next('home');
  }

  showStats() {
    this.currentView.next('stats');
  }

  showRendezVous() {
    this.currentView.next('rdv');
  }
}