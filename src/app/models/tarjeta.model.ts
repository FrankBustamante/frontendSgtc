import { ICliente } from './cliente.model';

export interface ITarjeta{
	cliente?: any,
	id?: any,
	nroTarjeta: string,
	ultimosDigitos?: any
}