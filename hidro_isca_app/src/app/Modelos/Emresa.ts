export class Empresa {
    id: number;
    name: string;
    direccion: string;
    poblacion: string;
    provincia: string;
  
    constructor(
      id: number, name: string, direccion: string, poblacion: string, provincia: string) {
      this.id = id
      this.name = name;
      this.direccion = direccion;
      this.poblacion = poblacion;
      this.provincia = provincia;
    }
  }
  