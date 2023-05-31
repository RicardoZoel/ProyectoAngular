import { Component } from '@angular/core';
import { EmpresaControlador } from 'src/app/Controladores/EmpresaControlador';
import { Agua } from 'src/app/Modelos/Agua';
import { Empresa } from 'src/app/Modelos/Emresa';
import { swalCalls } from '../Extras/swalCalls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-empresa',
  templateUrl: './vista-empresa.component.html',
  styleUrls: ['./vista-empresa.component.css']
})
export class VistaEmpresaComponent {
  empresa: Empresa = {} as Empresa
  editableEmpresa: Empresa = {} as Empresa
  agua: Agua = {} as Agua
  editableAgua: Agua = {} as Agua
  editando: boolean = false
  constructor(private empresaControlador: EmpresaControlador) { }
  ngOnInit(): void {
    this.loadAll()
  }
  async loadAll() {
    this.empresa = await this.empresaControlador.getEmpresa();
    this.agua = await this.empresaControlador.getAgua();
    this.editableAgua =JSON.parse(JSON.stringify(this.agua))
    this.editableEmpresa =JSON.parse(JSON.stringify(this.empresa))
  }
  verEditar() {
    this.editando = true
  }
  checkData() {
    return new Promise<Boolean>(async (resolve) => {
      var funciona = true;
      var texto = '';
      var cont = 0;
      
      if (this.editableEmpresa.name==undefined||this.editableEmpresa.name=="") {
        texto = "El nombre de la empresa"
        cont += 1
        funciona = false
      }if (this.editableAgua.valor_agua==undefined || this.editableAgua.valor_agua<=0) {
        if(cont==0){
          texto = "El valor del agua"}else{
            texto = texto+", el valor del agua"
          }
          cont += 1
          funciona = false
      }
      if (this.editableEmpresa.direccion==undefined||this.editableEmpresa.direccion=="") {
        if(cont==0){
        texto = "La dirección"}else{
          texto = texto+", la dirección"
        }
        cont += 1
        funciona = false
      }
      if (this.editableEmpresa.poblacion==undefined||this.editableEmpresa.poblacion=="") {
        if(cont==0){
        texto = "La población"}else{
          texto = texto+", la población"
        }
        cont += 1
        funciona = false
      }
      if (this.editableEmpresa.provincia==undefined||this.editableEmpresa.provincia=="") {
        if(cont==0){
        texto = "La provincia"}else{
          texto = texto+", la provincia"
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
  async editar() {
    console.log(this.editableEmpresa.name==this.editableEmpresa.name)
    if (await this.checkData()) {
      await this.empresaControlador.editarAgua(this.editableAgua);
      await this.empresaControlador.editarEmpresa(this.editableEmpresa);

      swalCalls.llamadaEditado()
      this.editando = false
      this.loadAll()
    }
  }
  noEditar() {
    this.editando = false
  }
}
