# language: es
Característica: Suite de Paper Stone Scissors
  Conjunto de escenarios para comprobar que la web funciona correctamente

  Escenario: Home - Login
    Dado que estoy en la vista Home
    Cuando escribo el usuario test
    Y pulso el boton de login
    Entonces veo el usuario test en la vista Board

  Escenario: Home - Login ko anonimo
    Dado que estoy en la vista Home
    Cuando pulso el boton de login
    Entonces veo error Only humans with name admit

  Escenario: Home - Login ko numerico
    Dado que estoy en la vista Home
    Cuando escribo el usuario test123
    Y pulso el boton de login
    Entonces veo error Only humans admit
    


