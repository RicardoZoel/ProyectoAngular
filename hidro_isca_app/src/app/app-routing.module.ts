import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './Componentes/Vistas/pagina-principal/pagina-principal.component';
import { UsuariosListaComponent } from './Componentes/Vistas/Listas/usuarios-lista/usuarios-lista.component';
import { ContadoresListaComponent } from './Componentes/Vistas/Listas/contadores-lista/contadores-lista.component';
import { VistaEmpresaComponent } from './Componentes/Vistas/vista-empresa/vista-empresa.component';

const routes: Routes = [
  { path: '', component: PaginaPrincipalComponent },
  { path: 'listaUsuarios', component: PaginaPrincipalComponent },
  { path: 'listaContadores', component: PaginaPrincipalComponent },
  { path: 'listaConsumos', component: PaginaPrincipalComponent },
  { path: 'listaRecibos', component: PaginaPrincipalComponent },
  { path: 'vistaEmpresa', component: PaginaPrincipalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
