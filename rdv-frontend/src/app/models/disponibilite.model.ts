export interface Disponibilite {
  id?: number;
  medecinId: number;
  jourSemaine: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  heureDebut: string;
  heureFin: string;
  dureeCreneauMinutes: number;
  active: boolean;
}

export interface DisponibiliteDTO {
  id?: number;
  medecinId: number;
  jourSemaine: string;
  heureDebut: string;
  heureFin: string;
  dureeCreneauMinutes: number;
  active: boolean;
} 