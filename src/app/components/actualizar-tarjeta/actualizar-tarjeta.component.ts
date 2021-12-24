import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ClienteService } from '../../services/cliente.service';
import { TarjetaService } from '../../services/tarjeta.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ICliente } from '../../models/cliente.model';
import { ITarjeta } from '../../models/tarjeta.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-actualizar-tarjeta',
  templateUrl: './actualizar-tarjeta.component.html',
  styleUrls: ['./actualizar-tarjeta.component.css']
})
export class ActualizarTarjetaComponent implements OnInit {

  public formTarjeta: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {cliente_id: string, tarjeta: ITarjeta}, fb: FormBuilder,
              public clienteService: ClienteService, private route: ActivatedRoute,
              private router: Router,public tarjetaService: TarjetaService) {
    this.formTarjeta =  fb.group({
      numeroTarjeta: ['', Validators.required],
      cliente: ['', Validators.required],
    });
  }

  clientes:any = [];
  tarjeta : any = {};

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarTarjeta();
  }
  public cargarTarjeta(){
    this.tarjeta = this.data.tarjeta
    this.formTarjeta.setValue({numeroTarjeta: this.tarjeta.nroTarjeta, cliente: this.data.cliente_id});
  }

  public cargarClientes(){    
    this.clienteService.listarClientes().then(resp=>{
      this.clientes = resp;
    })
  }

  public guardarForm(){
    if (this.formTarjeta.invalid) {
      return Object.values(this.formTarjeta.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const datos = this.formTarjeta.value;
    this.tarjetaService.actualizarTarjeta(datos.cliente, this.tarjeta.id, this.buildTarjeta(datos)).then(resp=>{
      window.location.reload();
    });

  }

  private buildTarjeta(datos: any): ITarjeta{
    
    const tarjeta: ITarjeta = {
      nroTarjeta: datos.numeroTarjeta
    };

    return tarjeta;

  }
}
