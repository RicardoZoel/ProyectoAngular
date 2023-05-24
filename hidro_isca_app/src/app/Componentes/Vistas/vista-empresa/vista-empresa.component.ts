import { Component } from '@angular/core';
import { EmpresaControlador } from 'src/app/Controladores/EmpresaControlador';
import { Agua } from 'src/app/Modelos/Agua';
import { Empresa } from 'src/app/Modelos/Emresa';
import { swalCalls } from '../Extras/swalCalls';

@Component({
  selector: 'app-vista-empresa',
  templateUrl: './vista-empresa.component.html',
  styleUrls: ['./vista-empresa.component.css']
})
export class VistaEmpresaComponent {
  empresa:Empresa={} as Empresa
  editableEmpresa:Empresa={} as Empresa
  agua:Agua={} as Agua
  editableAgua:Agua={} as Agua
  editando:boolean=false
  constructor(private empresaControlador: EmpresaControlador){}
  ngOnInit(): void {
    this.loadAll()
  }
  async loadAll(){
    this.empresa =await this.empresaControlador.getEmpresa();
    this.agua =await this.empresaControlador.getAgua();
    this.editableAgua=this.agua
    this.editableEmpresa=this.empresa
  }
  verEditar(){
    this.editando=true
  }
  async editar(){
    await this.empresaControlador.editarAgua(this.editableAgua);
    await this.empresaControlador.editarEmpresa(this.editableEmpresa);
    
    swalCalls.llamadaEditado()
  }
  noEditar(){
    this.editando=false
  }
}
