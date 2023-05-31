import { Component, ViewChild } from '@angular/core';
import { EmpresaControlador } from 'src/app/Controladores/EmpresaControlador';
import { RecibosControlador } from 'src/app/Controladores/RecibosControlador';
import { Empresa } from 'src/app/Modelos/Emresa';
import { Recibos } from 'src/app/Modelos/Recibos';
import { swalCalls } from '../../Extras/swalCalls';
import { faGauge, faPrint, faReceipt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { SeleccionarComponent } from '../../Extras/seleccionar/seleccionar.component';
import { UsuariosControlador } from 'src/app/Controladores/UsuariosControlador';

@Component({
  selector: 'app-Recibos-lista',
  templateUrl: './Recibos-lista.component.html',
  styleUrls: ['./Recibos-lista.component.css']
})
export class RecibosListaComponent {
  @ViewChild('seleccionarUsuarioC', { static: false }) seleccionarUsuarioC!: SeleccionarComponent;
  faEliminar=faTrash;
  faRecibo=faReceipt;
  faImprimir=faPrint
  constructor(private RecibosControlador: RecibosControlador,private empresaControlador: EmpresaControlador,private usuarioControlador:UsuariosControlador){}
  empresa: string="";
  selected_Recibo:Recibos={id:0, empresa:1} as Recibos;
  Recibos:Recibos[]=[];
  selectedMonth: number = 1;
  estado: any[] = [
    { value: 1, name: 'Pendiente' },
    { value: 2, name: 'Pagado' },
  ];
  months: any[] = [
    { value: 1, name: 'Enero/Febrero/Marzo' },
    { value: 2, name: 'Abril/Mayo/Junio' },
    { value: 3, name: 'Julio/Agosto/Septiembre' },
    { value: 4, name: 'Octubre/Noviembre/Diciembre' },
  ];


  async ngOnInit(): Promise<void> {
    await this.loadRecibos()
    var emp:Empresa=await this.empresaControlador.getEmpresa()
    this.empresa=emp.name;
  }


  async openOptionsForm(Recibo:Recibos){
    if(Recibo.estado==1)this.selected_Recibo=JSON.parse(JSON.stringify(Recibo))
    var usuario = await this.usuarioControlador.getUsuario(Recibo.usuario[0])
    await this.seleccionarUsuarioC.addDesdePadre(usuario)
  }
  addUsuario(usu:any){
    this.selected_Recibo.usuario=usu.id

  }
  limpiar_datos() {
    this.selected_Recibo={id:0, empresa:1} as Recibos;
    this.seleccionarUsuarioC.cambiarAEditar()
  }
  
  async loadRecibos() {
    this.Recibos =await this.RecibosControlador.getRecibos();
    console.log(this.Recibos)
  }
  async pagarRecibo(){
    console.log(this.selected_Recibo)
    this.selected_Recibo.empresa=1
    this.selected_Recibo.usuario=this.selected_Recibo.usuario[0]
    console.log(this.selected_Recibo)
    if(await this.RecibosControlador.putRecibo(this.selected_Recibo)){
      swalCalls.llamadaPagado()
    }
  }
  async crearRecibo(){
    if(await this.checkData()){
    if (this.selected_Recibo.id==0){
      if(await this.RecibosControlador.postRecibo(this.selected_Recibo)){
        swalCalls.llamadaCreado()
      }else{
        swalCalls.llamadaErrorKeyDuplucado()
      }
    }else{
      this.selected_Recibo.usuario=this.selected_Recibo.usuario[0]
      this.selected_Recibo.empresa=1
      console.log(JSON.parse(JSON.stringify(this.selected_Recibo)))
      if(await this.RecibosControlador.putRecibo(this.selected_Recibo)){
        swalCalls.llamadaEditado()
      }
    }
    await this.loadRecibos()
  }
  }
  checkData() {
    return new Promise<Boolean>(async (resolve) => {
      var funciona = true;
      var texto = '';
      var cont = 0;
      
      if (this.selected_Recibo.periodo_trimestral==undefined) {
        texto = "El trimestre"
        cont += 1
        funciona = false
      }if (this.selected_Recibo.anyo==undefined || this.selected_Recibo.anyo<2000) {
        if(cont==0){
          texto = "El año"}else{
            texto = texto+", el año"
          }
          cont += 1
          funciona = false
      }
      if (this.selected_Recibo.usuario==undefined) {
        if(cont==0){
        texto = "El usuario"}else{
          texto = texto+", el usuario"
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
  imprimir(Recibo:Recibos){

  }
  pagar(Recibo:Recibos){

  }
  eliminar(Recibo:Recibos){

  }
}
