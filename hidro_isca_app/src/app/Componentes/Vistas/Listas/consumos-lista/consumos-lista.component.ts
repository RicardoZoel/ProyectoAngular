import { Component } from '@angular/core';
import { ConsumoControlador } from 'src/app/Controladores/ConsumoControlador';
import { EmpresaControlador } from 'src/app/Controladores/EmpresaControlador';
import { UsuariosControlador } from 'src/app/Controladores/UsuariosControlador';
import { Consumo } from 'src/app/Modelos/Consumo';
import { Empresa } from 'src/app/Modelos/Emresa';
import { swalCalls } from '../../Extras/swalCalls';

@Component({
  selector: 'app-consumos-lista',
  templateUrl: './consumos-lista.component.html',
  styleUrls: ['./consumos-lista.component.css']
})
export class ConsumosListaComponent {
  empresa: string="";
  selected_consumo:Consumo={id:0, empresa:1} as Consumo;
  consumos:Consumo[]=[];
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
  constructor(private consumoControlador: ConsumoControlador,private empresaControlador: EmpresaControlador) { }

  async ngOnInit(): Promise<void> {
    await this.loadConsumos()
    var emp:Empresa=await this.empresaControlador.getEmpresa()
    this.empresa=emp.name;
  }
  limpiar_datos() {
    this.selected_consumo={id:0, empresa:1} as Consumo;
  }
  async loadConsumos() {
    this.consumos =await this.consumoControlador.getConsumos();
    console.log(this.consumos)
  }
  async openOptionsForm(consumos:Consumo){
    this.selected_consumo=JSON.parse(JSON.stringify(consumos))
    //await this.seleccionarUsuarioC.addDesdePadre(alumno)
  }
  async crearConsumo(){
    if (this.selected_consumo.id==0){
      if(await this.consumoControlador.postConsumo(this.selected_consumo)){
        swalCalls.llamadaCreado()
      }
    }else{
      this.selected_consumo.agua=1
      this.selected_consumo.usuario=this.selected_consumo.usuario[0]
      this.selected_consumo.empresa=1
      this.selected_consumo.contador=this.selected_consumo.contador[0]
      if(await this.consumoControlador.putConsumo(this.selected_consumo)){
        swalCalls.llamadaEditado()
      }
    }
    await this.loadConsumos()
  }
  
  addUsuario(usu:any){
    this.selected_consumo.usuario=usu.id

  }
  
  addContador(usu:any){
    this.selected_consumo.contador=usu.id
  }
}
