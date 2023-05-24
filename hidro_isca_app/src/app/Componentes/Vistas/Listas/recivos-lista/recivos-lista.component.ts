import { Component } from '@angular/core';
import { EmpresaControlador } from 'src/app/Controladores/EmpresaControlador';
import { RecivosControlador } from 'src/app/Controladores/RecivosControlador';
import { Empresa } from 'src/app/Modelos/Emresa';
import { Recivos } from 'src/app/Modelos/Recivos';
import { swalCalls } from '../../Extras/swalCalls';

@Component({
  selector: 'app-recivos-lista',
  templateUrl: './recivos-lista.component.html',
  styleUrls: ['./recivos-lista.component.css']
})
export class RecivosListaComponent {
  constructor(private recivosControlador: RecivosControlador,private empresaControlador: EmpresaControlador){}
  empresa: string="";
  selected_recivo:Recivos={id:0, empresa:1} as Recivos;
  recivos:Recivos[]=[];
  selectedMonth: number = 1;
  months: any[] = [
    { value: 1, name: 'Enero/Febrero/Marzo' },
    { value: 2, name: 'Abril/Mayo/Junio' },
    { value: 3, name: 'Julio/Agosto/Septiembre' },
    { value: 4, name: 'Octubre/Noviembre/Diciembre' },
  ];

  async ngOnInit(): Promise<void> {
    await this.loadRecivos()
    var emp:Empresa=await this.empresaControlador.getEmpresa()
    this.empresa=emp.name;
  }


  async openOptionsForm(recivo:Recivos){
    this.selected_recivo=JSON.parse(JSON.stringify(recivo))
    //await this.seleccionarUsuarioC.addDesdePadre(alumno)
  }
  addUsuario(usu:any){
    this.selected_recivo.usuario=usu.id

  }
  limpiar_datos() {
    this.selected_recivo={id:0, empresa:1} as Recivos;
  }
  
  async loadRecivos() {
    this.recivos =await this.recivosControlador.getRecivos();
    console.log(this.recivos)
  }
  async crearRecivo(){
    if (this.selected_recivo.id==0){
      if(await this.recivosControlador.postRecivo(this.selected_recivo)){
        swalCalls.llamadaCreado()
      }else{
        swalCalls.llamadaErrorKeyDuplucado()
      }
    }else{
      this.selected_recivo.usuario=this.selected_recivo.usuario[0]
      this.selected_recivo.empresa=1
      console.log(JSON.parse(JSON.stringify(this.selected_recivo)))
      if(await this.recivosControlador.putRecivo(this.selected_recivo)){
        swalCalls.llamadaEditado()
      }
    }
    await this.loadRecivos()
  }
}
