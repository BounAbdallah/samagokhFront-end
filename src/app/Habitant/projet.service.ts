import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private http = inject(HttpClient);
  

  // methode pour creer un projet
  createProjet(projet:any){
      return this.http.post(`${apiUrl}/add/projets`,projet);

  }

  // methode pour la recuperatio des Projets
  getAllProjet(){
      return this.http.get(`${apiUrl}/projets`);
  }
}
