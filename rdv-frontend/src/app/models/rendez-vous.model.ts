export interface RendezVous {
  id?: number;
  patientId: number;
  medecinId: number;
  dateHeure: string;
  dureeMinutes: number;
  statut: 'EN_ATTENTE' | 'CONFIRME' | 'ANNULE' | 'TERMINE';
  motif?: string;
  notes?: string;
  dateCreation?: string;
  dateModification?: string;
}

export interface RendezVousDTO {
  id?: number;
  patientId: number;
  medecinId: number;
  dateHeure: string;
  dureeMinutes: number;
  statut: string;
  motif?: string;
  notes?: string;
  dateCreation?: string;
  dateModification?: string;
} 