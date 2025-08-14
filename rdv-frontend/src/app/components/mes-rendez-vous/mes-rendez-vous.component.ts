import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RendezVousService } from '../../services/rendez-vous.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-mes-rendez-vous',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="mes-rdv-container">
      <h2>Mes Rendez-vous</h2>
      <div *ngIf="rendezVousList.length === 0">
        <p>Aucun rendez-vous trouvé.</p>
      </div>
      <div *ngFor="let rdv of rendezVousList" class="rdv-item">
        <div>
          <strong>{{ rdv.dateHeure | date:'dd/MM/yyyy HH:mm' }}</strong>
    <span> | Dr. {{ rdv.medecinNom }} {{ rdv.medecinPrenom }} | {{ rdv.dureeMinutes }} min</span>
        </div>
        <div *ngIf="rdv.motif"><em>{{ rdv.motif }}</em></div>
        <div>
          <span [class]="getStatutClass(rdv.statut)">{{ getStatutLabel(rdv.statut) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mes-rdv-container { max-width: 800px; margin: 2rem auto; padding: 2rem; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .rdv-item { border-bottom: 1px solid #eee; padding: 1rem 0; }
    .rdv-item:last-child { border-bottom: none; }
    .rdv-item strong { color: #20B2AA; }
    .rdv-item em { color: #374151; font-style: italic; }
    .rdv-item span { margin-right: 1rem; }
    .statut-en-attente { color: orange; font-weight: bold; }
    .statut-confirme { color: #1deae7ff; font-weight: bold; }
    .statut-termine { color: green; font-weight: bold; }
    .statut-annule { color: red; font-weight: bold; }
  `]
})
export class MesRendezVousComponent implements OnInit {
  rendezVousList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private rendezVousService: RendezVousService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let patientIdStr = this.route.snapshot.paramMap.get('id');
    let patientId: number | null = null;
    if (patientIdStr) {
      patientId = Number(patientIdStr);
    } else {
      const user = this.authService.getCurrentUser();
      patientId = user?.id ?? null;
    }
    if (patientId) {
      this.rendezVousService.getRendezVousByPatient(patientId).subscribe(rdvList => {
        this.rendezVousList = rdvList;
      });
    }
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'En attente';
      case 'CONFIRME': return 'Confirmé';
      case 'TERMINE': return 'Terminé';
      case 'ANNULE': return 'Annulé';
      default: return statut;
    }
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'statut-en-attente';
      case 'CONFIRME': return 'statut-confirme';
      case 'TERMINE': return 'statut-termine';
      case 'ANNULE': return 'statut-annule';
      default: return '';
    }
  }
}
