import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // listas: Lista[] = [];

  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    // this.listas = deseosService.getListas();
  }

  async agregarLista() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      // subHeader:'Subtitle',
      // message:'XXX',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          },
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === '') {
              return;
            }

            //Crear lista
            const listaId = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          },
        },
      ],
    });
    await alert.present();
   
  }
  // listaSeleccionada(lista:Lista){
  //     // console.log(lista)
  //     this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);

  // }
}
