import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ClienteService } from '../../services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ICliente } from '../../models/cliente.model';


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  formCliente: FormGroup;

  constructor(fb: FormBuilder,
              public clienteService: ClienteService, private route: ActivatedRoute,
              private router: Router,) {
    this.formCliente =  fb.group({
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
}

  ngOnInit(): void {
  }

  public guardarForm(){
    if (this.formCliente.invalid) {
      return Object.values(this.formCliente.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.clienteService.crearCliente(this.buildCliente()).then(resp => {
      this.formCliente.reset();
      window.location.reload();      
    });
  }

  private buildCliente(): ICliente{
    const datos = this.formCliente.value;
    const cliente: ICliente = {
      nombreUsuario: datos.nombreUsuario,
      email: datos.email,
      password: datos.email
    }

    return cliente;
  }

}
