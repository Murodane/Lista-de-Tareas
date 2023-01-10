import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {
  @Input() terminada = true;
  @ViewChild(IonList)lista!:IonList;
  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  listaSeleccionada(lista: Lista) {
    // console.log(lista)

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }
  borrarLista(lista: Lista) {
    console.log(lista);
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista:Lista) {
    const alert = await this.alertCtrl.create({
      header: 'Editar titulo de lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value:lista.titulo
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           // console.log('cancelar');
           this.lista.closeSlidingItems();

          },
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            //console.log(data);
            if (data.titulo.length === '') {
              return;
            }

           lista.titulo=data.titulo;
           this.deseosService.guardarStorage();
           this.lista.closeSlidingItems();
          },
        },
      ],
    });
    alert.present();
   
  }
}
