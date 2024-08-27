import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../../../Services/adminServices/user/user.service';
import { CommuneService } from '../../../Services/adminServices/commune/commune.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../Services/adminServices/shared.service';
import { VilleService } from '../../../Services/adminServices/ville/ville.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent  implements OnInit{
  cards: any[] = [];

  villeDetails: any;

  villes: any[] = []; 

  // variable de pagination 
  currentPage = 1;
  cardsPerPage = 3;

  totalUsers: number = 0;
  totalCommunes: number = 0;

  get pagedCards() {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    return this.cards.slice(startIndex, endIndex);
  }

  totalPages = Math.ceil(this.cards.length / this.cardsPerPage);

  constructor(private userService : UserService,private communeService: CommuneService,private sharedService: SharedService,private villeService: VilleService){}

  ngOnInit(): void {
    this.fetchTotalUsers();
    this.fetchTotalCommunes();
    this.subscribeToVilles();
    this.fetchVilles();  // Récupérer la liste des villes au démarrage
  }
//Paginate suivante
  nextPage() {
    if (this.currentPage < Math.ceil(this.cards.length / this.cardsPerPage)) {
      this.currentPage++;
    }
  }

  //Paginate préédente
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }



    fetchVilles() {
      this.villeService.getVilles().subscribe(
        (response: any) => {
          console.log(response.data);
          this.villes = response;
          if (response.data) {
            this.villes = response.data;
          }
          this.sharedService.updateVilles(this.villes); // Mettre à jour les villes dans le service partagé
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  

     // Méthode pour afficher les détails d'une ville spécifique
  getShowVilles(id: number) {
    this.villeService.getShowVilles(id).subscribe(
      (response: any) => {
        console.log('Détails de la ville:', response);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de la ville', error);
      }
    );
  }



  subscribeToVilles() {
    this.sharedService.villes$.subscribe(villes => {
      this.populateCards(villes);
    });
  }

  populateCards(villes: any[]): void {
    this.cards = villes.map(ville => ({
      id: ville.id, // Ajoutez cette ligne
      imgSrc: 'https://img.freepik.com/photos-gratuite/ville-ciel-bleu_1417-1867.jpg?ga=GA1.2.1272467380.1720960746&semt=ais_hybrid', 
      title: ville.libelle,
      updated: ville.description,
    }));
    this.totalPages = Math.ceil(this.cards.length / this.cardsPerPage);
  }

  //Récupération du nombre d'utilisateurs
  fetchTotalUsers(): void {
    this.userService.getTotalUsers().subscribe(
      (data: number) => {
        this.totalUsers = data;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  //Récupération du nombre de commune
  fetchTotalCommunes(): void {
    this.communeService.getTotalCommunes().subscribe(
      (data: number) => {
        this.totalCommunes = data;
      },
      (error: any) => {
        console.error('Error fetching communes count:', error);
      }
    );
  }

}


