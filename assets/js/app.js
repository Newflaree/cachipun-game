// Variables Globales
let player = {
  name: '',
  rep: 0
};
let playerScore = 0;
let iaScore = 0;

// Función para registrar datos del jugador
const newPlayer = () => {
  // Se guarda el nombre del jugador
  const name = document.getElementById( 'nombre' ).value;
  // Se guardan las partidas deseadas
  const numJugadas = document.getElementById( 'n-jugadas' ).value;

  // Se guarda la data en un objeto
  datos = {
    name: name,
    rep: (Number(numJugadas) - 1)
  };

  // Se asigna la data a la variable global player
  player = datos;
  // Desaparece la caja de registro
  document.getElementById('game').classList.remove('hidden');
  // Aparece la pantalla de juego
  document.getElementById('nuevo-juego').classList.add('hidden');
}

// Función que inicia el juego
const playGame = (value) => {
  // Se guarda la opcion del jugador
  const move = ownMove( Number(value) );
  // Se genera la jugada de la maquina
  const macMove = machineMove();

  // Se inicia el juego
  currentGame( move, macMove);

  // Se restan partidas restantes
  player.rep--;
  if ( player.rep < 0) {
    // Si el numero de partidas llega a 0, desaparece los botones
    document.getElementById('btns').classList.add('hidden');
    // Muestra la pantalla de resultados
    resultScreen();
  }
}

// Función que devuelve la elección del jugador
const ownMove = ( move ) => {
  let selectedMove;

  // Se evalua la opcion seleccionada
  switch ( move ) {
    case 1:
      selectedMove = 'Piedra';
      break;
    case 2:
      selectedMove = 'Papel';
      break;
    case 3:
      selectedMove = 'Tijera';
      break;
    default:
      alert('Accion no programada');
      break;
  }
  // Se devuelve el valor de la opcion elegida
  return selectedMove;
}

// Función que genera la jugada de la máquina
const machineMove = () => {
  let selectedMove;
  // Se genera una opcion aleatoria entre 1 y 3
  const mMove = Math.floor(Math.random() * 3) + 1;

  // Se evalua la opcion seleccionada
  switch( mMove ) {
    case 1:
      selectedMove = 'Piedra';
      break;
    case 2:
      selectedMove = 'Papel';
      break;
    case 3:
      selectedMove = 'Tijera';
      break;
    default:
      alet('Accion no programada');
      break;
  }
  // Se devuelve el valor de la opcion elegida
  return selectedMove;
}

// Función que muestra el juego actual
const currentGame = ( player, ia ) => {
  let currentGame = document.getElementById('current-game');
  let gamePoints = points(player, ia);
  let colors;

  if ( gamePoints == 'empate') {
    colors = {player:'blue', ia:'blue'};
  }
  if ( gamePoints == 'player') {
    colors = {player:'green', ia:'red'};
  }
  if ( gamePoints == 'ia') {
    colors = {player:'red', ia:'green'};
  }

  return currentGame.innerHTML = `
  <h2 style='color:${ colors.player };'>${ player }</h2>
  <h2 style='color:${ colors.ia }'>${ ia }</h2>
  `;
}

// Función que entrega los puntos
const points = ( player, ia) => {
  let winner;
  // Piedra
  if ( player == 'Piedra' && ia == 'Tijera' ) {
    playerScore = playerScore + 1; 
    winner = 'player';
  }
  if ( player == 'Piedra' && ia == 'Papel' ) {
    iaScore = iaScore + 1;
    winner = 'ia';
  } 
  if ( player == 'Piedra' && ia == 'Piedra' ) {
    winner = 'empate';
  } 
  // Papel
  if ( player == 'Papel' && ia == 'Piedra' ) {
    playerScore = playerScore + 1;
    winner = 'player';
  }
  if ( player == 'Papel' && ia == 'Tijera' ) {
    iaScore = iaScore + 1;
    winner = 'ia';
  } 
  if ( player == 'Papel' && ia == 'Papel' ) {
    winner = 'empate';
  } 
  // Tijera
  if ( player == 'Tijera' && ia == 'Papel' ) {
    playerScore = playerScore + 1;
    winner = 'player';
  }
  if ( player == 'Tijera' && ia == 'Piedra' ) {
    iaScore = iaScore + 1;
    winner = 'ia';
  } 
  if ( player == 'Tijera' && ia == 'Tijera' ) {
    winner = 'empate';
  } 
  return winner;
}


// Función que imprime el resultado en pantalla
const resultScreen = () => {
  let result = document.getElementById('results');
  let colors;
  let msg;

  if ( playerScore > iaScore ) {
    msg = `¡Felicitaciones, ${ player.name }. Eres el nuevo campeón!`;
    colors = {player:'green', ia:'red'};
  }
  if ( playerScore < iaScore ) {
    msg = 'Mejor suerte para la próxima...!'
    colors = {player:'red', ia:'green'};
  }
  if ( playerScore == iaScore ) {
    msg = '¡Empate!'
    colors = {player:'blue', ia:'blue'};
  }

  return result.innerHTML = `
  <h2>${ msg }</h2>
  <p style='color:${colors.player};'>Jugador: ${ playerScore }</p>
  <p style='color:${colors.ia};'>IA: ${ iaScore }</p>
  `;
}

// Función para resetear el contador
const reset = () => {
  document.getElementById('results').classList.add('hidden');
  document.getElementById('game').classList.add('hidden');
  document.getElementById('nuevo-juego').classList.remove('hidden');
  document.getElementById('btns').classList.remove('hidden');

  player = {
    name: '',
    rep: 0
  }
  playerScore = 0;
  iaScore = 0;
}
