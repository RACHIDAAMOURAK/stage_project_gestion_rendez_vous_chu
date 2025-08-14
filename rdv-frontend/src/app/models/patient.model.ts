import { Utilisateur } from './utilisateur.model';

export interface Patient extends Utilisateur {
  numeroSecu: string;
  dateNaissance: string;
  adresse: string;
  sexe: 'HOMME' | 'FEMME';
  antecedents?: string;
}

export interface PatientDTO {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  role: string;
  numeroSecu: string;
  dateNaissance: string;
  adresse: string;
  sexe: string;
  antecedents?: string;
} 