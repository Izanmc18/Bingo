import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoService } from '../services/bingo-service';

@Component({
  selector: 'app-modal-nuevo-numero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-nuevo-numero.html',
  styleUrls: ['./modal-nuevo-numero.css']
})
export class ModalNuevoNumeroComponent {
  public bingoService = inject(BingoService);
  
  // Controla si el modal se ve o no
  public visible = signal<boolean>(false);

  constructor() {
    effect(() => {
      const numero = this.bingoService.ultimoNumero();
      
      if (numero !== null) {
        this.mostrarModal();
      } else {
        this.visible.set(false);
      }
    });
  }

  private mostrarModal() {
    this.visible.set(true);

    setTimeout(() => {
      this.visible.set(false);
    }, 3000);
  }

  public cerrar() {
    this.visible.set(false);
  }
}