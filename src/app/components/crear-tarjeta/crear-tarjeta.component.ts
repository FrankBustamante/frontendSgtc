import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ClienteService } from '../../services/cliente.service';
import { TarjetaService } from '../../services/tarjeta.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ICliente } from '../../models/cliente.model';
import { ITarjeta } from '../../models/tarjeta.model';




@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {

  public formTarjeta: FormGroup;

  constructor(fb: FormBuilder, public clienteService: ClienteService,
              private route: ActivatedRoute, private router: Router,
              public tarjetaService: TarjetaService) {
    this.formTarjeta =  fb.group({
      numeroTarjeta: ['', Validators.required],
      cliente: ['', Validators.required],
    });
  }

  clientes:any = [];
  clienteId:any = "";

  ngOnInit(): void {
    this.cargarClientes()
  }

  public cargarClientes(){
    this.formTarjeta.controls['cliente'].setValue(this.clienteId);
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
    this.tarjetaService.crearTarjeta(datos.cliente, this.buildTarjeta(datos)).then(resp=>{
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
