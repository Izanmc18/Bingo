import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoService } from '../services/bingo-service';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablero-component.html',
  styleUrls: ['./tablero-component.css']
})
export class TableroComponent {
  public bingoService = inject(BingoService);
  public todosLosNumeros = Array.from({ length: 90 }, (_, i) => i + 1);

  public esElUltimo(numero: number): boolean {
    return numero === this.bingoService.ultimoNumero();
  }

  public yaSalio(numero: number): boolean {
    return this.bingoService.historial().includes(numero);
  }
}