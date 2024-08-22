import { Component, inject, OnInit } from '@angular/core';
import { projetModel } from '../../projet.model';
import { ProjetService } from '../../projet.service';

@Component({
  selector: 'app-liste-projets-habitant',
  standalone: true,
  imports: [],
  templateUrl: './liste-projets-habitant.component.html',
  styleUrl: './liste-projets-habitant.component.css'
})
export class ListeProjetsHabitantComponent implements OnInit {

    // injection de dependance
    private projetService = inject(ProjetService)
  // declaration des variables
  tabprojet:projetModel[]=[];
  projetObject:projetModel ={}
  ngOnInit(): void {
    this.fetchprojet();

  }

  // fonction pour la recuperation des projets
fetchprojet(){
  this.projetService.getAllProjet().subscribe(
    (response:any)=>{
      console.log(response);

    //   if(response.data){
    //     this.tabprojet = response.data;
    //   }
      
    // },(error:any)=>{
    //   console.log(error);
    }
  )
}
  

}
