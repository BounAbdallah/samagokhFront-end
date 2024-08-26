
import { Component, inject } from '@angular/core';

import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { UserModel } from '../../user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

// injection des dependences

private userService = inject(UserService);

private router = inject(Router);

userObjet:UserModel = {}

connexion(){
  console.log(this.userObjet);
  if(this.userObjet.email && this.userObjet.password){
    this.userService.login(this.userObjet).subscribe(
      (response:any)=>{
        console.log(response.token);
        if(response.token){
          localStorage.setItem("token", JSON.stringify(response.token));
<<<<<<< HEAD
          // verifie le role de l'utilisateur
          this.router.navigateByUrl("liste-projet-maire")
=======
            this.router.navigateByUrl("liste-projet-habitant")
          // verifie le role de l'utilisateur{}
>>>>>>> 66837fc81a6afdac4e026c017a04f612787ab67f

        }
      }
    )
  }

}

logout(): void {
  this.userService.logout();
}


}



