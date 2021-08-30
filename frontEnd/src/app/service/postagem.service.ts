import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(

    private http: HttpClient

  ) { }

  // Colocando o Authorization e o token do usuário no header. Assim consigo fazer minha validação.

  token = {

    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  getAllPostagem(): Observable<Postagem[]> {

    return this.http.get<Postagem[]>('http://localhost:8080/postagens', this.token)

  }

  postPostagem(postagem: Postagem): Observable<Postagem> {

    return this.http.post<Postagem>('http://localhost:8080/postagens', postagem, this.token)

  }

}
