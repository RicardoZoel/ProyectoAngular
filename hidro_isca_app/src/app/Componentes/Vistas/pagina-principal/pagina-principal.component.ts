import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/Modelos/Usuario';
@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css'],
})
export class PaginaPrincipalComponent {
  faBars = faBars;
  styleBar: string = '';
  page = '';
  usuario: Usuario = {} as Usuario;
  constructor(private route: Router) {
    
    this.page = this.route.url;
    //////console.log(this.page);
  }

  logOut(): void {
  }
}
