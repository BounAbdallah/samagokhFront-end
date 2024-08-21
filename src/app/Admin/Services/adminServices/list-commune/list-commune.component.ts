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
  
  const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.villeService.getShowVilles(+id).subscribe(
        (data) => {
          this.ville = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération de la ville', error);
        }
      );
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



}
