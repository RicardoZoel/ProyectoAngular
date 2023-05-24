import { Pipe, PipeTransform } from '@angular/core';
import { Contador } from 'src/app/Modelos/Contador';

@Pipe({
  name: 'contadorPipe'
})
export class ContadorPipe implements PipeTransform {
  transform(values: Contador[], filter: string): Contador[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (!values || values.length === 0) {
      return [];
    }

    filter = filter.toLowerCase();

    return values.filter((value: Contador) => {
      const name = value.name.toLowerCase();
      console.log(name.includes(filter))
      return name.includes(filter);
    });
  }
}
