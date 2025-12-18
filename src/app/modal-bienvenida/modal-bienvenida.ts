import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-bienvenida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-bienvenida.html',
  styleUrls: ['./modal-bienvenida.css']
})
export class ModalBienvenidaComponent {
  
  public visible = signal<boolean>(true);

  public entrarAlJuego(): void {
    this.visible.set(false);
  }
}