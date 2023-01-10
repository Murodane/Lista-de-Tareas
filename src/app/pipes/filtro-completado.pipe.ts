import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  //esta propiedad permite que se actualice automaticamente el tab en el que se encuentre
  pure:false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada:boolean=true): Lista[] {
   
    return listas.filter(lista=>lista.terminada===completada);
  }

}
