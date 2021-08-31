import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  theme: Theme = new Theme()

  listaTheme: Theme[]

  constructor(

    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    // Verificando o token

    if (environment.token == '') {

      this.alertas.showAlertDanger('Sua seção expirou, faça o login novamente.')

      this.router.navigate(['/entrar'])

    }

    // Mostrando a minha Lista de tema.

    this.findAllTheme()

  }

  cadastrarTheme() {
    this.temaService.postTema(this.theme).subscribe((resp: Theme) => {

      this.theme = resp

      this.alertas.showAlertSuccess("Tema cadastrado com sucesso!")

      // Chamando o getAllThema para o memo seja mostrado na tela.

      this.findAllTheme()

      // Ao estanciar o tema novamente abrimos a possíbilidade para que se possa cadastrar um novo tema.

      this.theme = new Theme()

    })
  }

  // Passando a minha lista para dentro da minha lista de tema.

  findAllTheme() {
    this.temaService.getAllTema().subscribe((resp: Theme[]) => {

      this.listaTheme = resp

    })
  }


}
