import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // Colocando o Authorization e o token do usuário no header. Assim consigo fazer minha validação.

  token = {

    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  // Métodos principais de autenticação

  // Passando os meus parâmetros para o meu entrar.

  // Temos que indicar qual o tipo de dado que o Angular deve "ficar de olho"
  // e assim garantir que o dado passado será do tipo UserLogin.

  entrar(userLogin: UserLogin): Observable<UserLogin> {

    // Passando a minha rota do back end para fazer o login do usuário.

    return this.http.post<UserLogin>('http://localhost:8080/user/logar', userLogin)

  }

  cadastrar(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>('http://localhost:8080/user/cadastrar', usuario)

  }

  atualizar(usuario: Usuario): Observable<Usuario> {

    return this.http.put<Usuario>('http://localhost:8080/user/cadastrar', usuario, this.token)

  }

  // Pegando as postagens do usuário

  getByIdUsuruario(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`http://localhost:8080/usuario/${id}`, this.token)

  }

  // Verificando o token na entrada 

  login() {

    let ok: boolean = false

    if (environment.token != '') {

      ok = true

    }

    return ok

  }

  adm() {

    let ok: boolean = false

    if (environment.type == 'adm') {

      ok = true

    }

    return ok
  }

}
