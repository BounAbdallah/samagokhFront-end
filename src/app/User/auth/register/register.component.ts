import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router'; // Utilise le routeur Angular, pas Express
import { UserModel } from '../../user.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  

  constructor(private authService: UserService, private router: Router) {}

  userobject:UserModel = {}

  onSubmit() {
    this.authService.register(this.userobject).subscribe(
      (response: any) => {
        console.log('Inscription réussie :', response);

        // Rediriger vers une autre page après inscription réussie
        this.router.navigateByUrl("login");
      },
      (error: any) => {
        console.error('Erreur lors de l\'inscription :', error);
      }
    );
  }
  user(user: any) {
    throw new Error('Method not implemented.');
  }

//   formValid() {
//     return this.user.nom && this.user.prenom && this.user.email && this.user.password;
//   }
}
