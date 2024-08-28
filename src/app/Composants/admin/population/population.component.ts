import { Component } from '@angular/core';
import { CommuneService } from '../../../Services/adminServices/commune/commune.service';
import { VilleService } from '../../../Services/adminServices/ville/ville.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-population',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './population.component.html',
  styleUrl: './population.component.css'
})
export class PopulationComponent {
  population: any;
  communeNom: string = '';
  communeId!: number;
  habitants!: number;

  constructor(private communeService: CommuneService, private villeService: VilleService,private route: ActivatedRoute){}
  ngOnInit(): void {
    // this.fetchPopulations();
    
  
       // Récupération de l'ID de la ville depuis les paramètres de route
       const id = this.route.snapshot.paramMap.get('id');
       
       if (id) {
         this.getPopulations(+id);  // Appelle la méthode pour afficher les détails de la ville
       }
  
  }
  
      // Méthode pour afficher les détails d'une ville spécifique
      getPopulations(id: number): void {
        this.communeService.getPopulationCommune(id).subscribe(
          (response: any) => {
            this.population = response; 
            this.communeNom = response.commune; 
            this.communeId = id; // Stocke l'ID de la commune
            this.habitants=response.population_count;
            console.log('Détails de la ville:', this.population);
          },
          (error: any) => {
            console.error('Erreur lors de la récupération des détails de la ville', error);
          }
        );
      }
}
