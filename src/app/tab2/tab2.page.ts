import { Component, ViewChild } from '@angular/core';
import { GastosService } from '../api/gastos.service';
import { BrMaskModel, BrMaskerIonic3 } from 'brmasker-ionic-3';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  todo = {
    paga: '',
    recibe: '',
    importe: '',
    concepto: '',
    fecha: ''
  };

  constructor(
    private gastosService: GastosService,
    public alertController: AlertController
  ) {}

  crearGasto() {
    console.log(this.todo);
    this.gastosService.añadirGasto(this.todo.paga, this.todo).subscribe(res => {
      console.log(res);
      this.alertaConfirmación();
    });
  }

  actualizarFecha($event) {
    const format = moment($event, 'YYYY/MM/DD');
    const fecha = format.format('DD/MM/YYYY');
    this.todo.fecha = fecha;
  }

  receptor(paga: string) {
    console.log(paga);
    if (paga === 'marcos') {
      this.todo.recibe = 'laia';
      console.log(`paga ${paga} y recibe laia`);
    } else if (paga === 'laia') {
      this.todo.recibe = 'marcos';
      console.log(`paga ${paga} y recibe marcos`);
    }
  }

  async alertaConfirmación() {
    const alert = await this.alertController.create({
      header: 'Gasto confirmado!',
      message: 'Quieres dejar de gastar tanto dinero en comida?',
      buttons: [{
        text: 'Ok',
        handler: () => {
          location.reload();
        }
      }]
    });

    await alert.present();
  }
}
