import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  theme: Theme = new Theme()

  constructor(

    private temaService: TemaService,
    private router: Router,

    // Pega o parametro ativo na minha url

    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(){

    if(environment.token == ''){

      // alert('Sua seção expirou, faça o login novamente.')
 
       this.router.navigate(['/entrar'])
 
     }

     // Pegando o parametro na url e como eu quero assim que entrar, eu tenho que passar ele no ngOnInit

     let id = this.activatedRoute.snapshot.params['id']

     // Passando o id para o método

     this.findByIdTema(id)

  }


  findByIdTema(id: number){

    this.temaService.getById(id).subscribe((resp: Theme) => {

      this.theme = resp

      // console.log(id)
      // console.log(this.theme)

    })

  }

  atualizar(){

    this.temaService.putTema(this.theme).subscribe((resp: Theme) => {

      this.theme = resp

      alert('Tema atualizado com sucesso!')

      this.router.navigate(['/tema'])

    })

  }


}
