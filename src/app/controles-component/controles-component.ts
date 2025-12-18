import { Component, inject } from '@angular/core';
import { BingoService } from '../services/bingo-service';

@Component({
  selector: 'app-controles-component',
  standalone: true,
  imports: [],
  templateUrl: './controles-component.html',
  styleUrl: './controles-component.css',
})
export class ControlesComponent {
  public bingoService = inject(BingoService);

  public cambiarTiempo(event: Event): void {
    const input = event.target as HTMLInputElement;
    

    const valorLimpio = input.value.replace(/[^0-9]/g, '');

    if (input.value !== valorLimpio) {
      input.value = valorLimpio;
    }

    const valorNumerico = parseInt(valorLimpio, 10);

    if (!isNaN(valorNumerico) && valorNumerico > 0) {
      this.bingoService.actualizarTiempo(valorNumerico);
    }
  }
}