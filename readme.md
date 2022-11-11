# Paper Stone Scissors

Juego de Piedra Papel Tijera desarrollado para Exdesis, construida en Typescript. Incluye suites basicas de TDD (jest) y BDD (Cucumber con Selenium) en la carpeta spec.

## Instrucciones

- Introducir el nombre del usuario. 
  - No se permiten números, espacios o símbolos
  - Si se utiliza el usuario admin, necesita contraseña admin
- Pulsar boton Join the league
- Pulsar sobre las tres opciones de juego y esperar un segundo el resultado
- Para jugar en la Robot League, es necesario tener los 3 roboitems y algun punto.


### Ligas de juego

- Human League: Versión clásica del juego:
  - Piedra vence a Tijeras
  - Papel vence a Piedra
  - Tijeras vence a Papel
  - Se obtiene un punto por cada victoria

- Robot League: Versión robotica del juego:
  - Masa vence a Laser
  - Campo de fuerza vence a Masa
  - Laser vence a Campo de fuerza
  - Se obtienen 3 puntos y un Robopunto por cada victoria
  - En caso de derrota, se pierde 1 punto y el roboitem queda destruido.

### Niveles de dificultad del juego
- Basic
  - El robot juega aleatoriamente una opcion
- Evolutive
  - El robot analiza la opción del jugador con más exito en todas sus partidas victoriosas y decide sobre ello.
- Maverick
  - El robot tiene un bajo porcentaje de ganar haciendo trampas. De lo contrario, decide con el nivel anterior.
  - Se gana un punto extra en este nivel de dificultad, en ambas ligas.

## Hall of fame
Se incluye una relación de los jugadores registrados con su categoria y su puntuación en ambas ligas. Solo se permite limpiar la lista al usuario admin.