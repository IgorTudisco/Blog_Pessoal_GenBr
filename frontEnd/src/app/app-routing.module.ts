import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';

// comocando as rotas dentro do array, funciona como um json.
// passa o path e o componente.
// o Path vazio vai ser o meu redirecionamento. (Quando não tiver barra, vai ser essa rota).
// por seguranção passamos o full para ele trazer toda a nossa rota.

const routes: Routes = [

  {
    path:'',
    redirectTo: 'entrar',
    pathMatch: 'full'
  },
  {
    path:'entrar',
    component: EntrarComponent
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
