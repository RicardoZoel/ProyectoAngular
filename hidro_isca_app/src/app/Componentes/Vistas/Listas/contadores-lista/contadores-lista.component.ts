import { Component, OnInit, ViewChild } from '@angular/core';
import { ContadorControlador } from 'src/app/Controladores/ContadorControlador';
import { Contador } from 'src/app/Modelos/Contador';
import Swal from 'sweetalert2';
import { SeleccionarComponent } from '../../Extras/seleccionar/seleccionar.component';
import { UsuariosControlador } from 'src/app/Controladores/UsuariosControlador';
import { EmpresaControlador } from 'src/app/Controladores/EmpresaControlador';
import { Empresa } from 'src/app/Modelos/Emresa';
import { swalCalls } from '../../Extras/swalCalls';

@Component({
  selector: 'app-contadores-lista',
  templateUrl: './contadores-lista.component.html',
  styleUrls: ['./contadores-lista.component.css']
})
export class ContadoresListaComponent implements OnInit {
  @ViewChild('seleccionarUsuarioC', { static: false }) seleccionarUsuarioC!: SeleccionarComponent;

  selected_contador:Contador={id:0, empresa:1} as Contador;
  contadores:Contador[]=[];
  cabezera:string="";
  filter: string = ''; // var encargada de guardar el filtrado por carácteres
  empresa: string="";
  constructor(private contadorControlador: ContadorControlador,private usuarioControlador:UsuariosControlador,private empresaControlador: EmpresaControlador) { }

limpiar_datos() {
  this.selected_contador={id:0, empresa:1}as Contador;
  this.seleccionarUsuarioC.cambiarAEditar()
}
  async crearContador() {
  if (await this.checkData()) {

    if (this.selected_contador.id == 0) {
      //console.log(this.selected_contador)
      if (await this.contadorControlador.postContador(this.selected_contador)){
      swalCalls.llamadaCreado()
      }else{
        swalCalls.llamadaErrorKeyDuplucadoContador()
      }
    } else {
      this.selected_contador.empresa=1
      this.selected_contador.usuario=this.selected_contador.usuario[0]
      //console.log(this.selected_contador)
      if(await this.contadorControlador.putContador(this.selected_contador)){
        swalCalls.llamadaEditado()}else{
          swalCalls.llamadaErrorKeyDuplucadoContador()
        }
    }
    await this.loadContador()
    await this.limpiar_datos()
  }
}
  checkData() {
    return new Promise<Boolean>(async (resolve) => {
      var funciona = true;
      var texto = '';
      var cont = 0;
      
      if (this.selected_contador.name==undefined || this.selected_contador.name=="") {
        texto = "El nombre del contador"
        cont += 1
        funciona = false
      }
      if (this.selected_contador.usuario==undefined) {
        if(cont==0){
        texto = "El usuario"}else{
          texto = texto+" y el usuario"
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
  addUsuario(usu:any){
    this.selected_contador.usuario=usu.id
  }
  //
  async ngOnInit(): Promise<void> {
    await this.loadContador()
    var emp:Empresa=await this.empresaControlador.getEmpresa()
    this.empresa=emp.name;
  }
  
  async loadContador() {
    this.contadores =await this.contadorControlador.getContadores();
  }
  async openOptionsForm(contador:Contador){
    this.selected_contador=JSON.parse(JSON.stringify(contador))
    this.selected_contador.empresa=this.selected_contador.empresa[1]
    this.cabezera=contador.name
    var usuario = await this.usuarioControlador.getUsuario(contador.usuario[0])
    
    await this.seleccionarUsuarioC.addDesdePadre(usuario)
  }

}
