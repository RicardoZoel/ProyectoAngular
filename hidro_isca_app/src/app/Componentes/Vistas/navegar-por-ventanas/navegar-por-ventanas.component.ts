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
  faMobile,
  faGauge,
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
  isHidro_isca=false;
  isListaUsuarios = false;
  isListaContadores=false;
  isListaConsumos=false;
  isListaRecivo=false;
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
  faMobile=faMobile
  faRecivo=faReceipt;
  faGastar=faGauge;
  
  constructor() {
    setTimeout(() => this.whichPageIs(), 300);
  }

  closeEventClick() {
    this.closeEvent.emit();
  }

  whichPageIs(): void {
    this.isHome = this.page === '';
    this.isHidro_isca = this.page.includes('/vistaEmpresa');
    this.isListaUsuarios = this.page.includes('/listaUsuarios');
    this.isListaContadores = this.page.includes('/listaContadores');
    this.isListaConsumos = this.page.includes('/listaConsumos');
    this.isListaRecivo = this.page.includes('/listaRecivo');
  }

  logOut(): void {
  }

  isPlegado = false;
  plegar() {
    this.isPlegado = !this.isPlegado;
  }
}
