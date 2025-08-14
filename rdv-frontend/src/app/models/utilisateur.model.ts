export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: 'ADMIN' | 'MEDECIN' | 'SECRETAIRE' | 'PATIENT';
}

export interface UtilisateurDTO {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: string;
} 