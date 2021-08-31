import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar() {

    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {

      this.userLogin = resp

      // Autenticando o usuário

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.emil = this.userLogin.email

      /*

      Teste com o console.log() para ver se o environment recebeu o dado correto.

      ex 
            console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id)
      console.log(environment.emil)

      */

      this.router.navigate(['/inicio'])

    }, error => {

      if (error.status == 500) {

        this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')

      }

    })

  }

}
