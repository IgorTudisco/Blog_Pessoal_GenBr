import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number

  confirmeSenhaDigitada: string

  tipoUsuarioEscolha: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {

      // alert('Sua seção expirou, faça o login novamente.')

      this.router.navigate(['/inicio'])

    }

    this.idUsuario = this.activatedRoute.snapshot.params['id']

    this.findByIdUsuario(this.idUsuario)

  }

  confirmeSenha(event: any) {

    // Recebendo o valor digitado.

    this.confirmeSenhaDigitada = event.target.value
  }

  tipoUsuario(event: any) {

    // Recebendo o valor escolhido.

    this.tipoUsuarioEscolha = event.target.value
  }

  atualizar() {

    this.usuario.tipo = this.tipoUsuarioEscolha

    if (this.usuario.senha != this.confirmeSenhaDigitada) {

      alert("As senhas estão diferentes.")

    } else {

      /* 
      Passando o objeto usuário para o meu service, porém o back só entende json.
      Então vamos tranfomalo em um objeto json atravéz do metodo subscribe.
      Esse metodo recebe uma arrow function para setar o meu usuarion em formato json.
      */
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp

        // Alerta de sucesso.

        alert("Usuário atualizado com sucesso, faça o login novamente")


        environment.token = ''
        environment.nome = ''
        environment.id = 0
        environment.emil = ''
        environment.foto = ''

        this.router.navigate(['/entrar'])
      })

    }


  }

  findByIdUsuario(id: number) {

    this.authService.getByIdUsuruario(id).subscribe((resp: Usuario) => {

      this.usuario = resp

    })

  }

}
