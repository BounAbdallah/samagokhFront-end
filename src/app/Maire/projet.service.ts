import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { apiUrl } from '../apiUrl'; // Assurez-vous que cette importation est correcte

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private http = inject(HttpClient);

  // Méthode pour vérifier la présence du token dans localStorage
  private getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      console.error('localStorage n\'est pas défini');
      return null;
    }
  }

  // Méthode pour faire des appels API avec vérification du token
  private getRequest<T>(url: string): Observable<T> {
    const token = this.getToken();
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get<T>(url, { headers }).pipe(
        tap(response => console.log(`Réponse de ${url}:`, response)),
        catchError(this.handleError<T>(`getRequest`))
      );
    } else {
      console.error('Token non trouvé dans localStorage');
      return of({} as T); // Retourne un objet vide si le token n'est pas trouvé
    }
  }

  // Récupération des projets par statut
  getProjetByStatut(statutSelectionne: boolean): Observable<any[]> {
    const url = `${apiUrl}/projets?statut=${statutSelectionne}`;
    return this.getRequest<any[]>(url).pipe(
      map(response => Array.isArray(response) ? response : []),
      catchError(() => of([]))
    );
  }

  // Création de projet
  createProjet(projet: any): Observable<any> {
    const url = `${apiUrl}/add/projets`;
    const token = this.getToken();
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.post<any>(url, projet, { headers }).pipe(
        tap(response => console.log('Réponse createProjet:', response)),
        catchError(this.handleError<any>('createProjet'))
      );
    } else {
      console.error('Token non trouvé dans localStorage');
      return of(null); // Retourne null si le token n'est pas trouvé
    }
  }

  // Récupération des projets soumis
  getProjetSoumis(params: any): Observable<any[]> {
    const url = `${apiUrl}/projets/publies`;
    return this.getRequest<any[]>(url).pipe(
      tap(response => console.log('Réponse getProjetSoumis:', response)),
      catchError(() => of([]))
    );
  }

  // Publication d'un projet
  publierProjet(id: number, statut: boolean): Observable<any> {
    const url = `${apiUrl}/projets/${id}`;
    const token = this.getToken();
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.patch<any>(url, { statut }, { headers }).pipe(
        tap(response => console.log('Réponse publierProjet:', response)),
        catchError(this.handleError<any>('publierProjet'))
      );
    } else {
      console.error('Token non trouvé dans localStorage');
      return of(null); // Retourne null si le token n'est pas trouvé
    }
  }

  // Mettre à jour le statut d'un projet
  updateProjetStatut(id: number, statut: boolean): Observable<any> {
    const url = `${apiUrl}/update/projet/${id}`;
    const token = this.getToken();
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.patch<any>(url, { statut }, { headers }).pipe(
        tap(response => console.log('Réponse updateProjetStatut:', response)),
        catchError(this.handleError<any>('updateProjetStatut'))
      );
    } else {
      console.error('Token non trouvé dans localStorage');
      return of(null); // Retourne null si le token n'est pas trouvé
    }
  }

  // Récupération de tous les projets
  getAllProjets(): Observable<any[]> {
    const url = `${apiUrl}/projets`;
    return this.getRequest<any[]>(url).pipe(
      map(response => Array.isArray(response) ? response : []),
      catchError(() => of([]))
    );
  }

  // Méthode pour obtenir les détails d'un projet par ID
  getProjetDetails(projectId: number): Observable<any> {
    const url = `${apiUrl}/details/projet/${projectId}`;
    return this.getRequest<any>(url);
  }

  // Récupération des statistiques de votes d'un projet
  getVoteStatistics(projectId: number): Observable<any> {
    const url = `${apiUrl}/projets/${projectId}/votes/stats`;
    return this.getRequest<any>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      let errorMsg: string;

      if (error.error instanceof ErrorEvent) {
        errorMsg = `Erreur côté client : ${error.error.message}`;
      } else {
        errorMsg = `Erreur côté serveur : ${error.status}\nMessage: ${error.message}`;
        console.error(`Contenu de la réponse :`, error.error);
      }

      console.error(`${operation} échoué : ${errorMsg}`);
      return throwError(() => new Error(`${operation} échoué : ${errorMsg}`));
    };
  }
}
