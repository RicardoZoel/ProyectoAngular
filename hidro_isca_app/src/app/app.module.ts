import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './Componetes/Vistas/pagina-principal/pagina-principal.component';
import { ContadoresListaComponent } from './Componentes/Vistas/Listas/contadores-lista/contadores-lista.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavegarPorVentanasComponent } from './Componetes/Vistas/navegar-por-ventanas/navegar-por-ventanas.component';
import { UsuarioPipe } from './Componentes/Vistas/Listas/usuarios-lista/usuarios.pipe';
import { UsuariosListaComponent } from './Componentes/Vistas/Listas/usuarios-lista/usuarios-lista.component';
@NgModule({
  declarations: [
    AppComponent,
    UsuariosListaComponent,
    PaginaPrincipalComponent,
    ContadoresListaComponent,
    NavegarPorVentanasComponent,
    UsuarioPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
