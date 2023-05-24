import { Component, Input } from '@angular/core';
import { UsuariosControlador } from 'src/app/Controladores/UsuariosControlador';
import { Usuario } from 'src/app/Modelos/Usuario';
import { swalCalls } from '../../Extras/swalCalls';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent {
  selected_usuario:Usuario={id:0}as Usuario;
  usuarios:Usuario[]=[];
  cabezera:string=""
  constructor(private usuControlador: UsuariosControlador) { }
  filter: string = ''; // var encargada de guardar el filtrado por carácteres
  //
  @Input() title = 'Usuario';
  ngOnInit(): void {
    this.loadUsuarios()
  }
  openOptionsForm(usu:Usuario){
    this.selected_usuario=usu
    this.cabezera=usu.name+" "+usu.apellido
  }
  async loadUsuarios() {
    this.usuarios =await this.usuControlador.getUsuarios();
  }
  async crearUsuario(){
    if (this.selected_usuario.id==0){
      if(await this.usuControlador.postUsuario(this.selected_usuario)){
        
        swalCalls.llamadaCreado()
      }
    }else{
      
      if(await this.usuControlador.putUsuario(this.selected_usuario)){

        swalCalls.llamadaEditado()
      }
    }
    await this.loadUsuarios()
  }
  limpiar_datos(){
    this.selected_usuario={id:0}as Usuario;
    this.cabezera=""

  }

}
