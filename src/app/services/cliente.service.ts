import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICliente } from '../models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private path: string = "http://localhost:8080/clientes";

  constructor(private http: HttpClient) { }

  public listarClientes(): Promise<any>{
    return this.http.get<any>(this.path, this.getHeaders()).toPromise();
  }

  public buscarPorId(id: string): Promise<any>{
    const url = `${this.path}/${id}`;
    return this.http.get(url, this.getHeaders()).toPromise();
  }

  public crearCliente(cliente: ICliente): Promise<any>{
    return this.http.post<any>(this.path, cliente, this.getHeaders()).toPromise();
  }

  public actualizarCliente(id: string, cliente: ICliente): Promise<any>{
    const url = `${this.path}/${id}`;
    return this.http.put(url, cliente, this.getHeaders()).toPromise();
  }

  public eliminarCliente(id:string): Promise<any>{
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
