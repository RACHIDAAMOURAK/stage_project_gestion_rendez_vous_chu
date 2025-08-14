export interface InscriptionDTO {
  // Champs communs
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: 'PATIENT' | 'MEDECIN';

  // Champs Patient
  numeroSecu?: string;
  dateNaissance?: string; // format YYYY-MM-DD
  adresse?: string;
  sexe?: 'HOMME' | 'FEMME';
  antecedents?: string;

  // Champs Médecin
  numeroRPPS?: string;
  specialite?: string;
  description?: string;
}
