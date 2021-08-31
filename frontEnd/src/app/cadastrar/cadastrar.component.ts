import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  // Por padrão, as variáveis são declaradas em cima so construtores.

  usuario: Usuario = new Usuario

  // Criando uma variavel para receber a primeira senha digitada.

  confirmeSenhaDigitada: string

  // Criando uma variavel para receber a escolha do tipo do usuário.

  tipoUsuarioEscolha: string

  constructor(

    // Referenciando o meu service. (Injeção de dependência)

    private authService: AuthService,

    // Injetando a dependência Router.

    private router: Router,
    private alertas: AlertasService

  ) { }

  // Por padrão vamos usar a função window, para posicionar nossa pg no ponto inicial.
  // É uma boa prática.

  ngOnInit() {
    window.scroll(0, 0)

    /* usamos o this para referênciar a variável dessa class.
       E assim usar as veriáveis de dentro dela, pois se trata de um objeto.

       exemplo -> this.userLogin.id
    */
  }

  confirmeSenha(event: any) {

    // Recebendo o valor digitado.

    this.confirmeSenhaDigitada = event.target.value
  }

  tipoUsuario(event: any) {

    // Recebendo o valor escolhido.

    this.tipoUsuarioEscolha = event.target.value
  }

  cadastrar() {

    this.usuario.tipo = this.tipoUsuarioEscolha

    if (this.usuario.senha != this.confirmeSenhaDigitada) {

      this.alertas.showAlertDanger("As senhas estão diferentes.")

    } else {

      /* 
      Passando o objeto usuário para o meu service, porém o back só entende json.
      Então vamos tranfomalo em um objeto json atravéz do metodo subscribe.
      Esse metodo recebe uma arrow function para setar o meu usuarion em formato json.
      */
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp

        // Passando a rota da minha página de entrada.

        this.router.navigate(['/entrar'])

        // Alerta de sucesso.

        this.alertas.showAlertSuccess("Usuário cadastrado com sucesso.")
      })

    }

  }

}
