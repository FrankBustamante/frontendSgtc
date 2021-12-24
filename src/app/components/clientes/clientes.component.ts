import { Component, OnInit } from '@angular/core';
import { ICliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarClienteComponent } from '../actualizar-cliente/actualizar-cliente.component';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(public clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog
              ) {}

   clientesLoad : ICliente[] = [];

  columnsToDisplay = ['nombreUsuario', 'email', 'opciones'];

  ngOnInit(): void {
    this.cargarClientes();
  }

  public cargarClientes(){
    this.clienteService.listarClientes().then(resp => {
      this.clientesLoad = resp;
    })
  }

  public editarCliente(cliente: ICliente){
    this.dialog.open(ActualizarClienteComponent, { data: { cliente: cliente}});    
  }

  public nuevoCliente(){
    this.dialog.open(CrearClienteComponent, { });        
  }

  public eliminarCliente(id: any){
    this.clienteService.eliminarCliente(id).then(resp => {
      this.cargarClientes();
    })
  }

}
