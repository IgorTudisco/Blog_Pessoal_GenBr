import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { Observable } from 'rxjs'
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // Fazendo a injeção de dependencia do HttpClientModule direto no meu construtor
  // O mesmo é passado como parâmetro.

  constructor(
    private http: HttpClient
  ) { }


  // Métodos principais de autenticação

  // Passando os meus parâmetros para o meu entrar.

  // Temos que indicar qual o tipo de dado que o Angular deve "ficar de olho"
  // e assim garantir que o dado passado será do tipo UserLogin.

  entrar(userLogin: UserLogin): Observable<UserLogin>{

    // Passando a minha rota do back end para fazer o login do usuário.

    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar',userLogin)

  }

  cadastrar(usuario: Usuario): Observable<Usuario>{

    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar',usuario)

  }

  // Verificando o token na entrada 

  login(){

    let ok: boolean = false

    if(environment.token != ''){

      ok = true

    }

    return ok

  }

}
