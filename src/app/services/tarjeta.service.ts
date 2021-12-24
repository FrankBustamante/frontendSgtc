import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITarjeta } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private path: string = "http://localhost:8080/tarjetas";

  constructor(private http: HttpClient) { }

  public listarTarjetas(): Promise<any>{
    return this.http.get<any>(this.path, this.getHeaders()).toPromise();
  }

  public buscarPorId(id: string): Promise<any>{
    const url = `${this.path}/${id}`;
    return this.http.get(url, this.getHeaders()).toPromise();
  }

  public crearTarjeta(cliente_id: string, tarjeta:ITarjeta): Promise<any>{
    const url = `${this.path}/${cliente_id}`;
    return this.http.post<any>(url, tarjeta, this.getHeaders()).toPromise();
  }

  public actualizarTarjeta(cliente_id: string, id: string, tarjeta: ITarjeta): Promise<any>{
    const url = `${this.path}/${cliente_id}/${id}`;
    return this.http.put(url, tarjeta, this.getHeaders()).toPromise();
  }

  public eliminarTarjeta(id:string): Promise<any>{
    const url = `${this.path}/${id}`
    return this.http.delete(url, this.getHeaders()).toPromise();
  }

   private getHeaders(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        //'authorization': `Bearer ${environment.TOKEN}`,        
      })
    };
    return httpOptions
  }
}
