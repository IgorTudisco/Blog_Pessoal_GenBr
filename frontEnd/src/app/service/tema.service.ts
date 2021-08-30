import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(

    private http: HttpClient

  ) { }

  // Colocando o Authorization e o token do usuário no header. Assim consigo fazer minha validação.

  token = {

    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  // Criando os métodos com o mesmo nome dos meus end point.
  // Esse método retorna um array, por isso os []

  getAllTema(): Observable<Theme[]> {

    // Passando o header na minha requisição e retornando a minha lista.

    return this.http.get<Theme[]>('http://localhost:8080/theme', this.token)

  }

  // Metodo que pega por id

  getById(id: number): Observable<Theme> {

    // console.log(JSON.stringify(id))
    // console.log(environment.token)
    return this.http.get<Theme>(`http://localhost:8080/theme/${id}`)

  }

  // Esse método recebe um objeto de Theme para salvar no db.

  postTema(theme: Theme): Observable<Theme> {

    // Nesse caso temos que passar a variável theme para salvar no db.

    // console.log(JSON.stringify(theme))
    // console.log(environment.token)
    return this.http.post<Theme>('http://localhost:8080/theme', theme, this.token)

  }

  putTema(theme: Theme): Observable<Theme> {


    // console.log(JSON.stringify(theme))
    //  console.log(environment.token)
    return this.http.put<Theme>('http://localhost:8080/theme', theme, this.token)

  }

  deleteTema(id: number) {


    //   console.log(JSON.stringify(id))
    //   console.log(environment.token)

    // Para passar um parametro na rota devemos usar o ${...} para poder por a variável na url do back

    return this.http.delete(`http://localhost:8080/theme/${id}`, this.token)

  }

}
