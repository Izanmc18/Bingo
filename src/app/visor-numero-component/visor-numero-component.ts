import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoService } from '../services/bingo-service';

@Component({
  selector: 'app-visor-numero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visor-numero-component.html',
  styleUrls: ['./visor-numero-component.css']
})
export class VisorNumeroComponent {
  public bingoService = inject(BingoService);
}