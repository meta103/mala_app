import { Component, OnInit } from '@angular/core';
import { GastosService } from '../api/gastos.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  paga = 'laia';
  historialMarcos;
  historialLaia;
  loading = true;
  gastosTotal = 0;
  ingresosTotal = 0;
  balance: number;

  constructor(private gastosService: GastosService) {}

  ngOnInit() {
    this.gastosService.recibirHistorial(this.paga).subscribe(historial => {
      this.historialLaia = this.formatoArray(historial);
      this.calcularGastos();
    });
    this.gastosService.recibirHistorial('marcos').subscribe(historial => {
      this.historialMarcos = this.formatoArray(historial);
      this.calcularIngresos();
    });
  }

  calcularGastos() {
    let subtotal = 0;
    for (const gasto of this.historialLaia) {
      subtotal += gasto[1].importe;
    }
    this.gastosTotal = subtotal;
    console.log(this.gastosTotal);
  }

  calcularIngresos() {
    let subtotal = 0;
    for (const ingreso of this.historialMarcos) {
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
