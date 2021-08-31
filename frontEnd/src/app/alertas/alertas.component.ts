import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  // Para importar uma variavel de outro componente tem que usar a anotação @Input

  @Input() message: string
  @Input() type: string = 'success'

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  // Método para fechar o modal

  onCLose() {

    this.bsModalRef.hide()

  }

}
