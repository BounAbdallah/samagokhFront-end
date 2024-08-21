import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private http =inject(HttpClient);


  //Login

  login(identifienrts:any){
    return this.http.post(`${apiUrl}/login`,identifienrts)
  }

  //deconnexion

  logout(){
    return this.http.get(`${apiUrl}/login`)
  }




}
