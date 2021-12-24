import { Component, OnInit } from '@angular/core';
import { ITarjeta } from '../../models/tarjeta.model'
import { TarjetaService } from '../../services/tarjeta.service';
//import {  } from '../../services/tarjeta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarTarjetaComponent } from '../actualizar-tarjeta/actualizar-tarjeta.component';
import { CrearTarjetaComponent } from '../crear-tarjeta/crear-tarjeta.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  constructor(public tarjetaService: TarjetaService,private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog
              ) { }

  tarjetasLoad  = [];
  columnsToDisplay = ['nombreUsuario', 'ultimosDigitos', 'opciones'];

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  public cargarTarjetas(){
    this.tarjetaService.listarTarjetas().then(resp =>{      
      this.tarjetasLoad = resp;
    })
  }

  public nuevaTarjeta(){
    this.dialog.open(CrearTarjetaComponent, { });
  }

  public editarTarjeta(tarjeta:ITarjeta){
    this.dialog.open(ActualizarTarjetaComponent, { data: {cliente_id: tarjeta.cliente.id, tarjeta: tarjeta}});    
  }

  public eliminarTarjeta(id: any){
    this.tarjetaService.eliminarTarjeta(id).then(resp =>{
      this.cargarTarjetas();
    });
  }

}
