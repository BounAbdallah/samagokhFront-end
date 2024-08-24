import { Component, inject, OnInit } from '@angular/core';
import { projetModel } from '../projet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../projet.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../User/user.service';

@Component({
  selector: 'app-detail-projet',
  standalone: true,
  imports: [CommonModule], // Ajoutez ici les imports Angular nécessaires si besoin
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css'] // Correction de styleUrl à styleUrls
})
export class DetailProjetComponent implements OnInit {

  projet?: projetModel;

  constructor(
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];  // Récupère l'ID du projet depuis les paramètres de l'URL
      if (id) {
        this.projetService.getProjetById(id).subscribe(
          (response: projetModel) => {
            this.projet = response;
          },
          (error: any) => {
            console.error('Erreur lors de la récupération des détails du projet', error);
          }
        );
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/liste-projet-habitant']);  // Redirige vers la liste des projets
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

 