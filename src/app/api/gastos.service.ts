import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private url = 'https://mala-app-1-0.firebaseio.com/usuarios';

  constructor( private http: HttpClient) { }

  añadirGasto(paga: string, detalle: object) {
    return this.http.post(`${this.url}/${paga}/historial.json`, detalle);
  }

  recibirHistorial(paga: string) {
    return this.http.get(`${this.url}/${paga}/historial.json`);
  }
}
