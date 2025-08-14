import { Utilisateur } from './utilisateur.model';

export interface Medecin extends Utilisateur {
  numeroRPPS: string;
  specialite: string;
  description?: string;
}

export interface MedecinDTO {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  role: string;
  numeroRPPS: string;
  specialite: string;
  description?: string;
} 