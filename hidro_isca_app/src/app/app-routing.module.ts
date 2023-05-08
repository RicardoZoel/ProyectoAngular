import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './Componetes/Vistas/pagina-principal/pagina-principal.component';
import { UsuariosListaComponent } from './Componentes/Vistas/Listas/usuarios-lista/usuarios-lista.component';
import { ContadoresListaComponent } from './Componentes/Vistas/Listas/contadores-lista/contadores-lista.component';

const routes: Routes = [
  { path: '', component: PaginaPrincipalComponent },
  { path: 'listaUsuarios', component: PaginaPrincipalComponent },
  { path: 'listaUsuarios2', component: UsuariosListaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
