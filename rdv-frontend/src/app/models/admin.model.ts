export interface Admin {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  niveauAcces: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATEUR';
  dateCreation?: string;
  dateModification?: string;
  actif: boolean;
}

export interface AdminDTO {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  niveauAcces: string;
  dateCreation?: string;
  dateModification?: string;
  actif: boolean;
} 