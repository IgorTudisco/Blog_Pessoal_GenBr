import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  theme: Theme = new Theme()

  idTheme: number

  constructor(

    private temaService: TemaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    if (environment.token == '') {

      this.alertas.showAlertDanger('Sua seção expirou, faça o login novamente.')

      this.router.navigate(['/entrar'])

    }

    this.idTheme = this.activatedRoute.snapshot.params['id']

    this.findById(this.idTheme)

  }

  findById(id: number) {

    this.temaService.getById(id).subscribe((resp: Theme) => {

      this.theme = resp

    })

  }

  deleteById() {

    this.temaService.deleteTema(this.idTheme).subscribe(() => {

      this.alertas.showAlertSuccess('Tema apagado com sucesso!')

      this.router.navigate(['/tema'])

    })

  }

}
