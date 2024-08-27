export interface projetModel{

  id?:number;
  user_id?:number;
  titre?:string;
  commune_id?:number;
  description?:string;
  objectif?:string;
  attente?:string;
  image?:string;
  cible?:string;
  categorie?:string;
  statut?: boolean;  // Doit être de type boolean
  etat?: boolean;
  budget?:string;
  timestamps?:Date;
}

