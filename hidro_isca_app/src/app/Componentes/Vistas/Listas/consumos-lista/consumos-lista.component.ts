import { Component, ViewChild } from '@angular/core';
import { ConsumoControlador } from 'src/app/Controladores/ConsumoControlador';
import { EmpresaControlador } from 'src/app/Controladores/EmpresaControlador';
import { UsuariosControlador } from 'src/app/Controladores/UsuariosControlador';
import { Consumo } from 'src/app/Modelos/Consumo';
import { Empresa } from 'src/app/Modelos/Emresa';
import { swalCalls } from '../../Extras/swalCalls';
import Swal from 'sweetalert2';
import { SeleccionarComponent } from '../../Extras/seleccionar/seleccionar.component';
import { ContadorControlador } from 'src/app/Controladores/ContadorControlador';
import { Usuario } from 'src/app/Modelos/Usuario';
import { Contador } from 'src/app/Modelos/Contador';

@Component({
  selector: 'app-consumos-lista',
  templateUrl: './consumos-lista.component.html',
  styleUrls: ['./consumos-lista.component.css']
})
export class ConsumosListaComponent {
  @ViewChild('seleccionarUsuarioC', { static: false }) seleccionarUsuarioC!: SeleccionarComponent;
  @ViewChild('seleccionarContadoresC', { static: false }) seleccionarContadoresC!: SeleccionarComponent;
  empresa: string = "";
  selected_consumo: Consumo = { id: 0, empresa: 1 } as Consumo;
  consumos: Consumo[] = [];
  usuario: Usuario = { id: 0 } as Usuario
  contador: Contador = { id: 0 } as Contador
  contadores: Contador[] = []
  selectedMonth: number = 1;
  months: any[] = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' }
  ];
  constructor(private consumoControlador: ConsumoControlador, private empresaControlador: EmpresaControlador, private usuarioControlador: UsuariosControlador, private contadorControlador: ContadorControlador) { }

  async ngOnInit(): Promise<void> {
    await this.loadConsumos()
    await this.loadContadores()
    var emp: Empresa = await this.empresaControlador.getEmpresa()
    this.empresa = emp.name;
  }
  limpiar_datos() {
    this.selected_consumo = { id: 0, empresa: 1 } as Consumo;
    this.seleccionarUsuarioC.cambiarAEditar()
    this.seleccionarContadoresC.cambiarAEditar()
  }
  async loadConsumos() {
    this.consumos = await this.consumoControlador.getConsumos();
  }
  async loadContadores() {
    this.contadores = await this.contadorControlador.getContadores();
    //console.log(this.contadores)
  }
  async openOptionsForm(consumos: Consumo) {
    this.selected_consumo = JSON.parse(JSON.stringify(consumos))
    var usuario = await this.usuarioControlador.getUsuario(consumos.usuario[0])
    await this.seleccionarUsuarioC.addDesdePadre(usuario)
    var contador = await this.contadorControlador.getContador(consumos.contador[0])
    await this.seleccionarContadoresC.addDesdePadre(contador)
  }
  async crearConsumo() {
    if (await this.checkData())
      if (this.selected_consumo.id == 0) {
        if (await this.consumoControlador.postConsumo(this.selected_consumo)) {
          swalCalls.llamadaCreado()
        }
      } else {
        this.selected_consumo.agua = 1
        this.selected_consumo.usuario = this.selected_consumo.usuario[0]
        this.selected_consumo.empresa = 1
        this.selected_consumo.contador = this.selected_consumo.contador[0]
        if (await this.consumoControlador.putConsumo(this.selected_consumo)) {
          swalCalls.llamadaEditado()
        }
      }
    await this.loadConsumos()
    await this.loadContadores()
    await this.limpiar_datos()
  }
  checkData() {
    return new Promise<Boolean>(async (resolve) => {
      var funciona = true;
      var texto = '';
      var cont = 0;

      if (this.selected_consumo.mes == undefined) {
        texto = "El mes"
        cont += 1
        funciona = false
      } if (this.selected_consumo.anyo == undefined || this.selected_consumo.anyo < 2000) {
        if (cont == 0) {
          texto = "El año"
        } else {
          texto = texto + ", el año"
        }
        cont += 1
        funciona = false
      } if (this.selected_consumo.MCC == undefined || this.selected_consumo.MCC <= 0) {
        if (cont == 0) {
          texto = "Los metros cubicos consumidos"
        } else {
          texto = texto + ", los metros cubicos consumidos"
        }
        cont += 1
        funciona = false
      }
      if (this.selected_consumo.usuario == undefined) {
        if (cont == 0) {
          texto = "El usuario"
        } else {
          texto = texto + ", el usuario"
        }
        cont += 1
        funciona = false
      }
      if (this.selected_consumo.contador == undefined) {
        if (cont == 0) {
          texto = "El contador"
        } else {
          texto = texto + ", el contador"
        }
        cont += 1
        funciona = false
      }
      if (funciona) {
        resolve(funciona);
      } else if (cont > 1) {
        Swal.fire({
          icon: 'error',
          title: 'Error de datos',
          text: texto + ' no estan correctamente o esta vacios',
        })
        resolve(funciona);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de datos',
          text: texto + ' no estan correctamente o esta vacios',
        })
        resolve(funciona);
      }
    });
  }
  async addUsuario(usu: any) {
    this.selected_consumo.usuario = usu.id
    this.usuario = usu

    if (usu.id != 0) {
      if (this.contador.id == 0) {
        await this.loadContadores();
        this.descartarAlumnos();
      }else{
        if(this.contador.usuario[0]!=usu.id){
          this.contador={id:0}as Contador
          await this.seleccionarContadoresC.cambiarAEditar()
          await this.loadContadores();
          this.descartarAlumnos();
        }
      }
    }
  }
  async descartarAlumnos() {
    var contadores = [] as any;
    for (let i = 0; i < this.contadores.length; i++) {

      if (this.usuario.id == this.contadores[i].usuario[0]) {
        contadores.push(this.contadores[i]);
      }
    }
    this.contadores = contadores
    ////console.log(this.alumnos);
    return await true;
  }
  async addContador(usu: any) {
    this.selected_consumo.contador = usu.id
    this.contador = usu
    if ((this.usuario.id == 0 || this.usuario.id != usu.usuario[0]) && usu.id != 0) {
      this.selected_consumo.usuario = usu.usuario[0]
      this.usuario = await this.usuarioControlador.getUsuario(usu.usuario[0])
      await this.seleccionarUsuarioC.addDesdePadre(this.usuario)
    }
  }
}
