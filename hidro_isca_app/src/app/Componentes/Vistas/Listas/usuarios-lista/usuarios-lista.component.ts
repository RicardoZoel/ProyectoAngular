import { Component, Input } from '@angular/core';
import { UsuariosControlador } from 'src/app/Controladores/UsuariosControlador';
import { Usuario } from 'src/app/Modelos/Usuario';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent {

  usuarios:Usuario[]=[];
  constructor(private usuControlador: UsuariosControlador) { }
  filter: string = ''; // var encargada de guardar el filtrado por carácteres
  //
  @Input() title = 'Usuarios';
  ngOnInit(): void {
    console.log("hola")
    this.loadAsistenciasAlumno()
  }
  openOptionsForm(usu:Usuario){

  }
  async loadAsistenciasAlumno() {
    console.log("hola")
    this.usuarios =await this.usuControlador.getUsuarios();
  }
}
