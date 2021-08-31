import { Injectable } from '@angular/core';

// Importe feito na mão.

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AlertasComponent } from '../alertas/alertas.component';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(

    // Inserindo a dependencia do bootstrap voltado para o Angular.

    private bsModalService: BsModalService

  ) { }

  // Método feito de forma privada.

  private showAlert(message: string, tipo: string) {

    // Constante que irá monstar o componente que foi celecionado.

    const bsModalRef: BsModalRef = this.bsModalService.show(AlertasComponent)

    // Passando os meus parâmetros

    bsModalRef.content.type = tipo
    bsModalRef.content.message = message

  }

  showAlertDanger(message: string) {

    this.showAlert(message, 'danger')

  }

  showAlertSuccess(message: string) {

    this.showAlert(message, 'success')

  }

  showAlertInfo(message: string) {

    this.showAlert(message, 'info')

  }

}
