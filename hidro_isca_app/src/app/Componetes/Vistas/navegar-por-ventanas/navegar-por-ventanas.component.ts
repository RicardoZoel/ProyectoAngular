import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import {
  faUtensils,
  faChildren,
  faBaseballBatBall,
  faListCheck,
  faHome,
  faDiagramProject,
  faUsers,
  faClipboardUser,
  faCalendar,
  faPeopleRoof,
  faPersonWalkingLuggage,
  faArrowCircleUp,
  faEnvelope,
  faClipboard,
  faLandmark,
  faReceipt,
  faCommentsDollar,
  faFileCsv,
  faPersonCircleXmark,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { LocalService } from 'src/app/Servicios/local.service';

@Component({
  selector: 'app-navegar-por-ventanas',
  templateUrl: './navegar-por-ventanas.component.html',
  styleUrls: ['./navegar-por-ventanas.component.css'],
})
export class NavegarPorVentanasComponent {
  @Input() page = '';
  @Input() style = '';
  @Output() closeEvent = new EventEmitter<any>();

  //BOOLEAN PAGE
  isHome = false;
  isListaCargos = false;
  isListaIntegrantes = false;
  isListaEjercicios = false;
  isListaFamilias = false;
  isListaRecibos = false;
  isListaQuotas = false;
  isListaBajas = false;
  isListaCategorias = false;
  isListaConceptos = false;
  isAddDatos = false;
  isListaTipoPagos = false;
  isListaAsignaciones = false;

  //ICONOS
  faHome = faHome;
  faDiagramProject = faDiagramProject;
  faUsers = faUsers;
  faClipboardUser = faClipboardUser;
  faCalendar = faCalendar;
  faPeopleRoof = faPeopleRoof;
  faPersonWalkingLuggage = faPersonWalkingLuggage;
  faArrowToCircleUp = faArrowCircleUp;
  faEnvelope = faEnvelope;
  faClipboard = faClipboard;
  faLandmark = faLandmark;
  faReceipt = faReceipt;
  faCommentsDollar = faCommentsDollar;
  faFileCsv = faFileCsv;
  faPersonCircleXmark = faPersonCircleXmark;
  faballotcheck = faListCheck;
  faBaseballBatBall = faBaseballBatBall;
  faChildren = faChildren;
  faUtensils = faUtensils;
  faBars = faBars;


  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 991.98) {
      this.isPlegado = true;
    }else{
      this.isPlegado = false;
    }
  }
  

  constructor(private localService: LocalService) {
    setTimeout(() => this.whichPageIs(), 300);
  }

  closeEventClick() {
    this.closeEvent.emit();
  }

  whichPageIs(): void {
    this.isHome = this.page === '';
    this.isListaCargos = this.page.includes('/listaCargos');
    this.isListaIntegrantes = this.page.includes('/listaIntegrantes');
    this.isListaEjercicios =
      this.page.includes('/listaEjercicios') ||
      this.page.includes('/CargosEjercicios');
    this.isListaFamilias = this.page.includes('/listaFamilias');
    this.isListaRecibos = this.page.includes('/listaRecibos');
    this.isListaConceptos = this.page.includes('/listaConceptos');
    this.isListaTipoPagos = this.page.includes('/listaTipoPagos');
    this.isListaBajas = this.page.includes('/listaBajas');
    this.isListaQuotas = this.page.includes('/listaQuotas');
    this.isListaAsignaciones = this.page.includes('/listaAsignaciones');
    this.isAddDatos = this.page.includes('/addDatos');
  }

  logOut(): void {
    this.localService.localSessionClear();
    this.localService.checkLocalSessionToken();
  }

  isPlegado = false;
  plegar() {
    this.isPlegado = !this.isPlegado;
  }
}
