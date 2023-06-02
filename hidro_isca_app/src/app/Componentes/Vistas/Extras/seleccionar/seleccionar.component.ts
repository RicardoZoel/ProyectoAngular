import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { SeleccionarController } from 'src/app/Controladores/seleccionar.controlador';

@Component({
  selector: 'app-seleccionar',
  templateUrl: './seleccionar.component.html',
  styleUrls: ['./seleccionar.component.css'],
})
export class SeleccionarComponent implements OnChanges {
  @Input() esGetAllAlEmpezar: boolean = true;
  @Input() esBuscableEnBaseDeDatos: boolean = true;
  @Input() objetoTratar: string = '';
  @Input() objetos: any[] = [];
  @Input() estaPorEncima = true;
  @Input() flitrarPorUsuario: any = { id: 0, name: '' } as any;
  filtro: string = '';
  objetoSeleccionado: any = { id: 0, name: '' } as any;
  @Output() OutputObjeto = new EventEmitter<any>();

  vistas = {
    listaAbierta: false,
    soloVer: false,
  };

  enviarObjeto(e: any): void {
    this.filtro = '';
    this.objetoSeleccionado = e;
    this.vistas.listaAbierta = false;
    if (e != null || e != undefined) {
      this.OutputObjeto.emit(e);
    }
    if (e.id != 0) this.vistas.soloVer = true;

  }

  constructor(private controller: SeleccionarController) { }
  ngOnChanges() {
    this.loadObjeto();
    //console.log(this.objetos);
  }
  async actualizar(e: any) {
    //console.log(this.objetos);
    this.filtro = e.target.value;
    this.loadObjeto();
  }

  async addDesdePadre(objeto: any) {
    this.vistas.soloVer = true;
    this.objetoSeleccionado = JSON.parse(JSON.stringify(objeto[0]));
  }

  async cambiarAEditar() {
    this.vistas.soloVer = false;
    this.enviarObjeto({ id: 0 })
  }

  async loadObjeto() {
    if (this.esBuscableEnBaseDeDatos) {
      if (this.flitrarPorUsuario.id == 0) {
        if (this.filtro == '') {
          if (this.esGetAllAlEmpezar) {
            this.objetos = await this.controller.seleccionarObjeto(this.objetoTratar);
            //console.log(1);
          } else {
            this.objetos = [];
          }
        } else {
          this.objetos = await this.controller.seleccionarObjetoFiltrado(
            this.objetoTratar,
            this.filtro
          );
        }
      }else{
        if (this.filtro == '') {
          if (this.esGetAllAlEmpezar) {
            this.objetos = await this.controller.seleccionarObjetoPorUsuario(this.objetoTratar,this.flitrarPorUsuario.id);
            //console.log(1);
          } else {
            this.objetos = [];
          }
        } else {
          this.objetos = await this.controller.seleccionarObjetoFiltradoPorUsuario(
            this.objetoTratar,
            this.filtro,this.flitrarPorUsuario.id
          );
        }
      }
    }
  }

  async limpiar() {
    this.objetoSeleccionado = { id: 0 } as any;
  }
  abrirLista() {
    this.vistas.listaAbierta = true;
  }
  cerrarLista() {
    this.vistas.listaAbierta = false;
  }

  // =================================================================================================================================
}
