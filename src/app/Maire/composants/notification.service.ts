import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiUrl } from '../../apiUrl';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getRecentNotifications(): Observable<any[]> {
    console.log('typeof localStorage:', typeof localStorage);

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (token) {
        return this.http.get<any[]>(`${apiUrl}/notifications`).pipe(
          map(response => response.map(notification => ({
            id: notification.id,
            title: notification.data.titre,
            description: notification.data.description,
            date: new Date(notification.created_at)
          })).slice(-4)), // Affiche les 4 dernières notifications
          catchError(error => {
            console.error('Erreur lors de la récupération des notifications:', error);
            return of([]); // Retourne un tableau vide en cas d'erreur
          })
        );
      } else {
        console.error('Token non trouvé dans localStorage');
        return of([]); // Retourne un tableau vide si le token n'est pas trouvé
      }
    } else {
      console.error('localStorage n\'est pas défini');
      return of([]); // Retourne un tableau vide si localStorage n'est pas défini
    }
  }
}
