import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoService } from '../services/bingo-service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-component.html',
  styleUrls: ['./historial-component.css']
})
export class HistorialComponent {
  public bingoService = inject(BingoService);
}