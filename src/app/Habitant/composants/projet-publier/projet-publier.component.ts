


import { Component, OnInit, inject } from '@angular/core';
import { ProjetService } from '../../projet.service';
import { projetModel } from '../../projet.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../User/user.service';
import {  Router } from '@angular/router'; 
@Component({
      selector: 'app-projet-publier',
      standalone: true,
      imports: [CommonModule],
      templateUrl: './projet-publier.component.html',
      styleUrls: ['./projet-publier.component.css']
    })
export class ProjetPublierComponent implements OnInit {

    private projetService = inject(ProjetService);
    private userService = inject (UserService);
    private router = inject(Router)
    private localStorage = window.localStorage;
  
    tabprojet: projetModel[] = [];
  
    ngOnInit(): void {
      this.fetchProjetsPublies();
    }
  
    fetchProjetsPublies(): void {
      const token = this.localStorage.getItem('token');
  
      if (token) {
        this.projetService.getProjetBySttut(true).subscribe(
          (response: any) => {
            this.tabprojet = response.data;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    }


    // deconnextion
    logout(): void {
        this.userService.logout().subscribe(
          () => {
            // Optionnel : Effacer les informations de l'utilisateur
            localStorage.removeItem('token');
            // Rediriger vers la page de connexion ou la page d'accueil
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Erreur de déconnexion', error);
          }
        );
      }
}
