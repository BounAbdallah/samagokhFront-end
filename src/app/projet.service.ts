import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private http = inject(HttpClient);



  // methode pour creer un projet
  createProjet(projet:any){
      return this.http.post(`${apiUrl}/add/projets`,projet);

  }

  // recuperation des projets soumis
  getprojetSoumis(projet:any){
    return this.http.get(`${apiUrl}/projets/publies`,projet)
  }

  // publier un projet

  publierProjet(id: number, statut: boolean) {
    return this.http.patch(`${apiUrl}/projets/${id}/statut`, { statut });
  }

  // afiicher les projets pas statut
  getProjetBySttut(statut:any){
    return this.http.get(`${apiUrl}/projets`, statut);


  }

//Afficher details projet :

getProjetDetails(id: number) {
  return this.http.get(`${apiUrl}/projets/${id}`);
}


  // methode pour la recuperatio des Projets
  getAllProjets(){
      return this.http.get(`${apiUrl}/projets`);
  }
}
