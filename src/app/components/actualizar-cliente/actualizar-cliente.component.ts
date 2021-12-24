import { Component, OnInit, Inject } from '@angular/core';
import { ICliente } from '../../models/cliente.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ClienteService } from '../../services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {

  formCliente: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {cliente: ICliente}, fb: FormBuilder,
              public clienteService: ClienteService, private route: ActivatedRoute,
              private router: Router,
             ) {
    this.formCliente =  fb.group({
      nombreUsuario: ['', Validators.required],
      email: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.buscarCliente();
  }

  private buscarCliente(){
    this.formCliente.setValue({ nombreUsuario: this.data.cliente.nombreUsuario, email: this.data.cliente.email});
  }



  public guardarForm(){
    if (this.formCliente.invalid) {
      return Object.values(this.formCliente.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.clienteService.actualizarCliente(this.data.cliente.id,this.buildCliente()).then(resp => {
      this.formCliente.reset();
      window.location.reload();
      
    });
  }

  private buildCliente(): ICliente{
    const datos = this.formCliente.value;
    const cliente: ICliente = {
      nombreUsuario: datos.nombreUsuario,
      email: datos.email,
      password: this.data.cliente.password,
      id: this.data.cliente.id
    }

    return cliente;
  }

}
