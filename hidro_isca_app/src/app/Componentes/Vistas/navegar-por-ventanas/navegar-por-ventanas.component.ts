import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
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
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';

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
  isListaUsuarios = false;
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
  faPowerOff = faPowerOff;
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

  constructor() {
    setTimeout(() => this.whichPageIs(), 300);
  }

  closeEventClick() {
    this.closeEvent.emit();
  }

  whichPageIs(): void {
    this.isHome = this.page === '';
    this.isListaCargos = this.page.includes('/listaCargos');
    this.isListaUsuarios = this.page.includes('/listaUsuarios');
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
  }

  isPlegado = false;
  plegar() {
    this.isPlegado = !this.isPlegado;
  }
}
