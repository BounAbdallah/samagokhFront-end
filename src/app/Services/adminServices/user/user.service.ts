import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Method to fetch the total number of users
  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/compteUser`);
  }
}
