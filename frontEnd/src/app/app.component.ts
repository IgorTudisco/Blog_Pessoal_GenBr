import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Fazendo a injeção de dependencia do meu service para poder usar no meu html do meu app componente.
  constructor(

    public auth: AuthService

  ){

  }

}
