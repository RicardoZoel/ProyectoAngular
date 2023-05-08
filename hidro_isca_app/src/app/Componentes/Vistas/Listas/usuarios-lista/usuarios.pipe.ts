import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/Modelos/Usuario';


@Pipe({ name: 'usuarioPipe' })
export class UsuarioPipe implements PipeTransform {
  transform(values: Usuario[], filter: string): Usuario[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Usuario) => {
        const nameFound = value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const apellidoFound = value.apellido.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const nifFound = value.nif.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const direccionFound = value.direccion.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const poblacionFound = value.poblacion.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const provinciaFound = value.provincia.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const cuenta_bancariaFound = value.cuenta_bancaria.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const telefonoFound = value.telefono.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;

        if (nameFound || apellidoFound || nifFound || direccionFound || telefonoFound || poblacionFound || provinciaFound || cuenta_bancariaFound) {
            return value;
        }
        return null;
    });
  }
}