import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  getPublishedProjectsByUser(userId: number) {
    return this.http.get(`${apiUrl}/projets/publies/${userId}`);
  }


  // publier un projet

  publierProjet(id: any, statut: boolean) {
    return this.http.patch(`${apiUrl}/projets-statut/${id}`, { statut });
  }

 



  // afiicher les projets pas statut
  getProjetBySttut(statut:any){
    return this.http.get(`${apiUrl}/projets`, statut);


  }

  // methode pour la recuperatio des Projets
  getAllProjets(){
      return this.http.get(`${apiUrl}/projets`);
  }

   // Méthode pour obtenir le nombre total de projets
  getTotalProjets() {
    return this.http.get(`${apiUrl}/projets/count`);
  }

  // // Méthode pour obtenir le nombre de projets publiés
  getProjetsPublies() {
    return this.http.get(`${apiUrl}/projets/publies/count`);
  }

  // methode pour l'affichage des deatils d'un projets

  getProjetById(id: number) {
    return this.http.get(`${apiUrl}/details/projet/${id}`);
  }


  // supprimer
  deleteProject(id: number) {
    return this.http.delete(`${apiUrl}/delete/projets/${id}`);
  }


}


