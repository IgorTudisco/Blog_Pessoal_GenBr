import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Theme } from 'src/app/model/Theme';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postagemServe: PostagemService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {

      // alert('Sua seção expirou, faça o login novamente.')

      this.router.navigate(['/entrar'])

    }

    this.idPostagem = this.activatedRoute.snapshot.params['id']

    this.findByIdPostagem(this.idPostagem)

  }

  findByIdPostagem(id: number) {

    this.postagemServe.getByIdPostagem(id).subscribe((resp: Postagem) => {

      this.postagem = resp

    })

  }

  apagar() {

    this.postagemServe.deletePostagem(this.idPostagem).subscribe(() => {

      alert('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])

    })

  }
}
