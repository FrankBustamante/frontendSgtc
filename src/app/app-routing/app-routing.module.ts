import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import Componentes
import { ClientesComponent } from "../components/clientes/clientes.component";
import { ActualizarClienteComponent } from "../components/actualizar-cliente/actualizar-cliente.component";
import { CrearClienteComponent } from "../components/crear-cliente/crear-cliente.component";
import { TarjetasComponent } from "../components/tarjetas/tarjetas.component";
import { CrearTarjetaComponent } from "../components/crear-tarjeta/crear-tarjeta.component";
import { ActualizarTarjetaComponent } from "../components/actualizar-tarjeta/actualizar-tarjeta.component";

const appRoutes: Routes = [
  { path: 'clientes', component: ClientesComponent},
  { path: 'nuevo_cliente', component: CrearClienteComponent },
  { path: 'editar_cliente', component: ActualizarClienteComponent },
  { path: 'tarjetas', component: TarjetasComponent },
  { path: 'nueva_tarjeta', component: CrearTarjetaComponent },
  { path: 'editar_tarjeta', component: ActualizarTarjetaComponent }
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
