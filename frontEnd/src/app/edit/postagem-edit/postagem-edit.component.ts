import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Theme } from 'src/app/model/Theme';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  theme: Theme = new Theme()
  listaTheme: Theme[]
  idTheme: number

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postagemServe: PostagemService,
    private themeServe: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {

      this.alertas.showAlertDanger('Sua seção expirou, faça o login novamente.')

      this.router.navigate(['/entrar'])

    }

    let id = this.activatedRoute.snapshot.params['id']

    this.findByIdPostagem(id)
    this.findAllTheme()

  }

  findByIdPostagem(id: number) {

    this.postagemServe.getByIdPostagem(id).subscribe((resp: Postagem) => {

      this.postagem = resp

    })

  }

  findByIdTheme() {

    this.themeServe.getById(this.idTheme).subscribe((resp: Theme) => {

      this.theme = resp

    })

  }

  findAllTheme() {
    this.themeServe.getAllTema().subscribe((resp: Theme[]) => {

      this.listaTheme = resp

    })
  }

  atualizar() {

    this.theme.id = this.idTheme
    this.postagem.theme = this.theme

    this.postagemServe.putPostagem(this.postagem).subscribe((resp: Postagem) => {

      this.postagem = resp

      this.alertas.showAlertSuccess('Postagem atualizada com sucesso!')

      this.router.navigate(['/inicio'])

    })

  }

}
