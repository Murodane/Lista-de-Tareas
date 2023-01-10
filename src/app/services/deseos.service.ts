import { Injectable } from '@angular/core';
import { timeStamp } from 'console';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root',
})
export class DeseosService {
  listas: Lista[] = [];
  constructor() {
    console.log('Servicio inicializado');
    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes ha desaparecer');
    // this.listas.push(lista1, lista2);
    // console.log(this.listas);
    this.cargarStorage();
  }

  getListas(): Lista[] {
    return this.listas;
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  obtenerLista(id: string | number) {
    id = Number(id);
    //console.log(id)
    return this.listas.find((listaData) =>  listaData.id === id);
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    let listaStorage = localStorage.getItem('data');
    if (listaStorage) {
      this.listas = JSON.parse(listaStorage);
    } else {
      this.listas = [];
    }
  }
}
