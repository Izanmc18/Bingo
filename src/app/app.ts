import { Component } from '@angular/core';
import { VisorNumeroComponent } from './visor-numero-component/visor-numero-component';
import { TableroComponent } from './tablero-component/tablero-component';
import { HistorialComponent } from './historial-component/historial-component';
import { ControlesComponent } from './controles-component/controles-component';
import { ModalNuevoNumeroComponent } from './modal-nuevo-numero/modal-nuevo-numero';
import { ModalBienvenidaComponent } from './modal-bienvenida/modal-bienvenida';
import { ModalComprobarLineaComponent } from './modal-comprobar-linea/modal-comprobar-linea';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    VisorNumeroComponent, 
    TableroComponent, 
    HistorialComponent, 
    ControlesComponent,
    ModalNuevoNumeroComponent,
    ModalBienvenidaComponent,
    ModalComprobarLineaComponent 
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}