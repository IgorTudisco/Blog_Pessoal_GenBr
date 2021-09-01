import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // Pegando as minhas variáveis de ambiente para passar no meu html.

  nome = environment.nome
  foto = environment.foto
  id = environment.id

  constructor(

    // Instanciando o meu Router

    public router: Router,
    public authService: AuthService

  ) { }

  ngOnInit() {

  }

  sair() {

    // Ao apertar no meu botão sair ele irá para a entrada.

    this.router.navigate(['/entrar'])

    // Limpando o meu ambiente.

    environment.token = ''
    environment.nome = ''
    environment.id = 0
    environment.emil = ''
    environment.foto = ''

  }

}
