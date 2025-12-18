import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BingoService } from '../services/bingo-service';

@Component({
  selector: 'app-modal-comprobar-linea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-comprobar-linea.html',
  styleUrls: ['./modal-comprobar-linea.css']
})
export class ModalComprobarLineaComponent {
  public bingoService = inject(BingoService);


  public numerosInput: (string | number | null)[] = [null, null, null, null, null];
  
  public estado = signal<'pendiente' | 'exito' | 'error'>('pendiente');

  public cerrar() {
    this.bingoService.cerrarModalLinea();
    this.reiniciarFormulario();
  }

  public comprobar() {
    
    if (this.numerosInput.some(n => !n)) {
      alert('Por favor, introduce los 5 números.');
      return;
    }

    const historial = this.bingoService.historial();

    
    const todosHanSalido = this.numerosInput.every(valor => {
      const numero = Number(valor); 
      return !isNaN(numero) && numero > 0 && historial.includes(numero);
    });

    if (todosHanSalido) {
      this.estado.set('exito'); 
    } else {
      this.estado.set('error');
    }
  }

  public reiniciarFormulario() {
    this.numerosInput = [null, null, null, null, null];
    this.estado.set('pendiente');
  }
}