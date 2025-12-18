import { Injectable, signal, computed, effect, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

interface EstadoBingo {
  ultimoNumero: number | null;
  historial: number[];
}

@Injectable({
  providedIn: 'root'
})
export class BingoService implements OnDestroy {
  private readonly CLAVE_ALMACENAMIENTO = 'estado_bingo_angular';
  
  // Variable para guardar la suscripción del temporizador
  private subscripcionAutomatico: Subscription | null = null;

  // --- SIGNALS DE ESTADO ---
  public ultimoNumero = signal<number | null>(null);
  public historial = signal<number[]>([]);
  public esModoAutomatico = signal<boolean>(false);
  public modalLineaVisible = signal<boolean>(false); // Para el modal de línea
  
  // NUEVO: Tiempo en segundos para el modo automático (Por defecto 10)
  public tiempoSegundos = signal<number>(10);

  // --- SIGNALS COMPUTADAS ---
  public numerosPendientes = computed(() => {
    const todos = Array.from({ length: 90 }, (_, i) => i + 1);
    const salidos = this.historial();
    return todos.filter(n => !salidos.includes(n));
  });

  public juegoTerminado = computed(() => this.numerosPendientes().length === 0);

  constructor() {
    this.cargarEstado();

    effect(() => {
      const estado: EstadoBingo = {
        ultimoNumero: this.ultimoNumero(),
        historial: this.historial()
      };
      localStorage.setItem(this.CLAVE_ALMACENAMIENTO, JSON.stringify(estado));
    });
  }

  // --- MODALES ---
  public abrirModalLinea(): void { this.modalLineaVisible.set(true); }
  public cerrarModalLinea(): void { this.modalLineaVisible.set(false); }

  // --- GESTIÓN DE TIEMPO ---
  public actualizarTiempo(segundos: number): void {
    if (segundos < 1) segundos = 1; // Mínimo 1 segundo de seguridad
    this.tiempoSegundos.set(segundos);

    // Si está rodando, reiniciamos para aplicar el cambio al instante
    if (this.esModoAutomatico()) {
      this.detenerAutomatico();
      this.iniciarAutomatico();
    }
  }

  // --- MODO AUTOMÁTICO ---
  public alternarModoAutomatico(): void {
    if (this.esModoAutomatico()) {
      this.detenerAutomatico();
    } else {
      this.iniciarAutomatico();
    }
  }

  private iniciarAutomatico(): void {
    if (this.juegoTerminado()) return;

    this.esModoAutomatico.set(true);
    
    // Convertimos segundos a milisegundos
    const ms = this.tiempoSegundos() * 1000;

    this.subscripcionAutomatico = interval(ms).pipe(
      map(() => {
        if (this.juegoTerminado()) {
          this.detenerAutomatico();
          return; 
        }
        this.sacarBola();
      })
    ).subscribe();
  }

  private detenerAutomatico(): void {
    this.esModoAutomatico.set(false);
    if (this.subscripcionAutomatico) {
      this.subscripcionAutomatico.unsubscribe();
      this.subscripcionAutomatico = null;
    }
  }

  // --- LÓGICA MANUAL ---
  public sacarBola(): void {
    const pendientes = this.numerosPendientes();
    if (pendientes.length === 0) return;

    const indiceAleatorio = Math.floor(Math.random() * pendientes.length);
    const nuevoNumero = pendientes[indiceAleatorio];

    this.ultimoNumero.set(nuevoNumero);
    this.historial.update(numeros => [nuevoNumero, ...numeros]);
  }

  public reiniciarPartida(): void {
    if (confirm('¿Reiniciar la fiesta del Bingo?')) {
      this.detenerAutomatico(); 
      this.ultimoNumero.set(null);
      this.historial.set([]);
    }
  }

  ngOnDestroy(): void {
    this.detenerAutomatico();
  }

  private cargarEstado(): void {
    const guardado = localStorage.getItem(this.CLAVE_ALMACENAMIENTO);
    if (guardado) {
      const estado: EstadoBingo = JSON.parse(guardado);
      this.ultimoNumero.set(estado.ultimoNumero);
      this.historial.set(estado.historial);
    }
  }
}