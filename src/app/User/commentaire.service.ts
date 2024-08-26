import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private http = inject(HttpClient);

  getCommentaires() {
    return this.http.get(`${apiUrl}/commentaires`);
  }

  getCommentaire(id: number){
    return this.http.get(`${apiUrl}/${id}`);
  }

  addCommentaire(commentaire: any){
    return this.http.post(`${apiUrl}/commentaires`,commentaire);
  }

  updateCommentaire(id: number, commentaire: any){
    return this.http.put(`${apiUrl}/${id}`, commentaire);
  }

  deleteCommentaire(id: number){
    return this.http.delete(`${apiUrl}/${id}`);
  }
}
