import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Theme } from '../model/Theme';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]

  listaTheme: Theme[]
  idTheme: number
  theme: Theme = new Theme()

  user: Usuario = new Usuario()

  idUser = environment.id

  // Para alterar a ordem das postagens.

  key = 'data'
  reverse: true // normalmente é false, mas queremos inverter a ordem.

  constructor(

    // Injetando a minha dependencia de Router.

    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {

      this.alertas.showAlertDanger('Sua seção expirou, faça o login novamente.')

      this.router.navigate(['/entrar'])

    }

    this.getAllTema()
    this.findAllPostagem()
    this.findByIdUser()

  }

  getAllTema() {

    this.temaService.getAllTema().subscribe((resp: Theme[]) => {

      this.listaTheme = resp

    })

  }

  findByIdTheme() {

    this.temaService.getById(this.idTheme).subscribe((resp: Theme) => {

      this.theme = resp

    })

  }

  findAllPostagem() {

    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {

      this.listaPostagem = resp

    })

  }

  findByIdUser() {

    this.authService.getByIdUsuruario(this.idUser).subscribe((resp: Usuario) => {

      this.user = resp

    })

  }

  publicar() {

    // Preenchendo os campos que não são passados pelo usuário

    this.theme.id = this.idTheme

    // Após passar o id do tema, colocamos ele dentro de postagem.

    this.postagem.theme = this.theme

    // Passando o Id do usuário para dentro do obj usuário.

    this.user.id = this.idUser

    // Passando o usuário para dentro de postagem.

    this.postagem.usuarioPostagem = this.user

    // Agora passando a postagem para o meu back.

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {

      this.postagem = resp

      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')

      this.postagem = new Postagem()

      this.findAllPostagem()

    })

  }

}
