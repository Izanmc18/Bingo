# 🎄 Gran Bingo Fuentezuelas - Edición Navidad

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

¡Bienvenido al repositorio de mi proyecto de Bingo! He desarrollado esta aplicación web para gestionar las partidas del Bingo de la Cena de Navidad de las Fuentezuelas.

El objetivo era crear una aplicación **moderna, rápida y sin dependencias de servidor (backend)**, capaz de funcionar en cualquier navegador y resistir recargas de página sin perder la partida.

## 🚀 Características Principales

* **Arquitectura Reactiva:** Todo el estado se gestiona mediante **Angular Signals**.
* **Cero Backend:** Uso de `localStorage` para persistencia de datos (a prueba de fallos de luz o recargas).
* **Modo Automático:** Un sistema basado en **RxJS** que canta los números automáticamente con velocidad configurable.
* **Diseño Cyberpunk/Neón:** Interfaz oscura con colores vibrantes, animaciones y totalmente responsiva.
* **Modales Nativos:** He creado mi propio sistema de ventanas emergentes (Bienvenida, Nuevo Número, Comprobar Línea) sin usar librerías pesadas como Angular Material.

---

## 🛠️ Cómo lo he construido (Paso a Paso)

Este proyecto ha sido un reto personal para profundizar en las últimas características de Angular. Así es como organicé el desarrollo:

### 1. El "Cerebro" (Service + Signals)
Lo primero que hice fue crear el `BingoService`. Decidí no usar librerías de gestión de estado complejas y apostar por **Signals**.
* Tengo un signal para el `ultimoNumero` y otro para el `historial`.
* Usé `computed` para calcular automáticamente qué números quedan por salir.
* Implementé un `effect` que guarda todo en el navegador automáticamente cada vez que sale una bola.

### 2. Componentes Standalone
Para mantener el código limpio, dividí la interfaz en componentes independientes:
* **Visor:** La bola gigante animada.
* **Tablero:** Una rejilla CSS (Grid) que se adapta a la pantalla y marca en dorado el último número.
* **Controles:** Botones grandes y accesibles.
* **Historial:** Muestra las últimas 5 bolas extraídas.

### 3. El Reto del Modo Automático
Quería que el bingo pudiera funcionar solo. Para ello utilicé **RxJS** (`interval` y `map`).
Lo más interesante fue añadir un `input` para cambiar la velocidad en tiempo real. Si cambias los segundos, el servicio reinicia el temporizador internamente sin detener el juego.

### 4. Validaciones y Lógica de "Línea"
Implementé un modal especial para comprobar si alguien canta línea.
* El usuario introduce los 5 números.
* Sanitizo la entrada (solo permito números) para evitar errores.
* El sistema cruza los datos con el historial y confirma si es correcto o si hay algún error.

### 5. Diseño y Adaptabilidad
Uno de mis focos fue que se viera bien tanto en mi portátil (pantalla pequeña) como en un proyector.
* Usé `clamp()` en CSS para fuentes y tamaños dinámicos.
* El tablero ocupa siempre el máximo espacio disponible gracias a `Flexbox` y `Grid` elástico.
* Estilo visual "Neón" para darle un toque festivo y moderno.

---

## 📦 Instalación y Despliegue

Si quieres probar el código en tu máquina:

1.  Clona el repositorio.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el servidor de desarrollo:
    ```bash
    ng serve
    ```

### Versión Compilada (Producción)

Ya he generado la versión optimizada para producción. Si solo quieres ejecutar el juego sin tocar código, busca la carpeta `dist/`.

He ejecutado el comando de compilación:
```bash
ng build --configuration production
