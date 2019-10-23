import { Component, OnInit } from '@angular/core';
import { GastosService } from '../api/gastos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  paga = 'marcos';
  historialMarcos;
  historialLaia;
  loading = true;
  gastosTotal = 0;
  ingresosTotal = 0;
  balance: number;

  constructor(private gastosService: GastosService) {}

  ngOnInit() {
    this.gastosService.recibirHistorial(this.paga).subscribe(historial => {
      this.historialMarcos = this.formatoArray(historial);
      console.log(this.historialMarcos);
      this.calcularGastos();
    });
    this.gastosService.recibirHistorial('laia').subscribe(historial => {
      this.historialLaia = this.formatoArray(historial);
      this.calcularIngresos();
    });
  }

  calcularGastos() {
    let subtotal = 0;
    for (const gasto of this.historialMarcos) {
      subtotal += gasto[1].importe;
    }
    this.gastosTotal = subtotal;
    console.log(this.gastosTotal);
  }

  calcularIngresos() {
    let subtotal = 0;
    for (const ingreso of this.historialLaia) {
      subtotal += ingreso[1].importe;
    }
    this.ingresosTotal = subtotal;
    this.loading = false;
    console.log(this.ingresosTotal);
  }

  calcularBalance() {
    this.balance = this.gastosTotal - this.ingresosTotal;
    return this.balance;
  }

  formatoArray(historial) {
    const nuevoHistorial = Object.entries(historial);
    return nuevoHistorial;
  }
}
