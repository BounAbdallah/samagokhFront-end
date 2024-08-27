import { Component , OnInit} from '@angular/core';
import { CommuneService } from '../../../Services/adminServices/commune/commune.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { log } from 'console';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VilleService } from '../../../Services/adminServices/ville/ville.service';

@Component({
  selector: 'app-list-commune',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './list-commune.component.html',
  styleUrl: './list-commune.component.css'
})
export class ListCommuneComponent {

  ville: any;
 

totalCommunes: number = 0;
constructor(private communeService: CommuneService, private villeService: VilleService,private route: ActivatedRoute){}
ngOnInit(): void {
  this.loadCommunes();
  this.fetchTotalCommunes();
  

     // Récupération de l'ID de la ville depuis les paramètres de route
     const id = this.route.snapshot.paramMap.get('id');
     
     if (id) {
       this.getShowVilles(+id);  // Appelle la méthode pour afficher les détails de la ville
     }

}
loadCommunes(){
this.communeService.getCommunes().subscribe(
  (response:any)=>{
    console.log(response);
  }
)
}

fetchTotalCommunes(): void {
  this.communeService.getTotalCommunes().subscribe(
    (data: number) => {
      this.totalCommunes = data;
    },
    (error) => {
      console.error('Error fetching communes count:', error);
    }
  );
}


 

     // Méthode pour afficher les détails d'une ville spécifique
  getShowVilles(id: number): void {
    this.villeService.getShowVilles(id).subscribe(
      (response: any) => {
        this.ville = response;  // Stocke les détails de la ville dans la propriété 'ville'
        console.log('Détails de la ville:', this.ville);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des détails de la ville', error);
      }
    );
  }

    // Nouvelle méthode pour obtenir le maire d'une commune spécifique
    getMaireForCommune(communeId: number): any {
      return this.ville.maire.find((maire: any) => maire.commune_id === communeId);
    }
}

