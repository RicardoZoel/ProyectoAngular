import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './Componentes/Vistas/pagina-principal/pagina-principal.component';
import { ContadoresListaComponent } from './Componentes/Vistas/Listas/contadores-lista/contadores-lista.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavegarPorVentanasComponent } from './Componentes/Vistas/navegar-por-ventanas/navegar-por-ventanas.component';
import { UsuarioPipe } from './Componentes/Vistas/Listas/usuarios-lista/usuarios.pipe';
import { UsuariosListaComponent } from './Componentes/Vistas/Listas/usuarios-lista/usuarios-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from './Servicios/base.service';
import { FormsModule } from '@angular/forms';
import { VistaEmpresaComponent } from './Componentes/Vistas/vista-empresa/vista-empresa.component';
import { ContadorPipe } from './Componentes/Vistas/Listas/contadores-lista/contadores.pipe';
import { SeleccionarComponent } from './Componentes/Vistas/Extras/seleccionar/seleccionar.component';
import { ConsumosListaComponent } from './Componentes/Vistas/Listas/consumos-lista/consumos-lista.component';
import { RecivosListaComponent } from './Componentes/Vistas/Listas/recivos-lista/recivos-lista.component';
@NgModule({
  declarations: [
    AppComponent,
    UsuariosListaComponent,
    PaginaPrincipalComponent,
    ContadoresListaComponent,
    NavegarPorVentanasComponent,
    UsuarioPipe,
    VistaEmpresaComponent,
    ContadorPipe,
    SeleccionarComponent,
    ConsumosListaComponent,
    RecivosListaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,FormsModule
  ],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
