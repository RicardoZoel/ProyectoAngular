import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LocalService } from 'src/app/Servicios/local.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {
  faBars = faBars;
  styleBar: string = '';
  page = '';
  constructor(
    private route: Router,
    private localService: LocalService,
  ) {
    localService.checkLocalSessionToken();

    this.page = this.route.url;
    ////console.log(this.page);
  }


  logOut(): void {
    this.localService.localSessionClear();
    this.localService.checkLocalSessionToken();
  }

}