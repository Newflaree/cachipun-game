// Variables Globales
let player = {
  name: '',
  rep: 0
};
let totalPlayerScore = 0;
let totalIaScore = 0;
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
  document.getElementById('nuevo-juego').classList.toggle('hidden');
  // Aparece la pantalla de juego
  document.getElementById('game').classList.toggle('hidden');
  console.log(player);
}

// Función que inicia el juego
const playGame = ( value ) => {
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
    document.getElementById('btns').classList.toggle('hidden');
    // Muestra la pantalla de resultados
    resultScreen();
  }
}

// Función que devuelve la elección del jugador
const ownMove = ( move ) => {
  // Se declara la variable que contiene la jugada
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
  // Se declara la variable que contiene la jugada
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
  // Se crea espacio en memoria en div para que muestre nuestro juego actual
  let currentGame = document.getElementById('current-game');
  // Se llama a función que devuelve al ganador
  let gamePoints = points(player, ia);
  // Se declara la variable donde se guardarán los colores en cada situación
  let colors;

  // Se evalúa el resultado de la partida actual
  if ( gamePoints == 'empate') {
    // Se setean los colores para cada jugada
    colors = {
      player:'gray', 
      ia:'gray'
    };
  }
  if ( gamePoints == 'player') {
    // Se setean los colores para cada jugada
    colors = {
      player:'green', 
      ia:'red'
    };
  }
  if ( gamePoints == 'ia') {
    // Se setean los colores para cada jugada
    colors = {
      player:'red', 
      ia:'green'
    };
  }

  // Se retorna la jugada de cada uno
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
    playerScore++; 
    winner = 'player';
  }
  if ( player == 'Piedra' && ia == 'Papel' ) {
    iaScore++;
    winner = 'ia';
  } 
  if ( player == 'Piedra' && ia == 'Piedra' ) {
    winner = 'empate';
  } 
  // Papel
  if ( player == 'Papel' && ia == 'Piedra' ) {
    playerScore++;
    winner = 'player';
  }
  if ( player == 'Papel' && ia == 'Tijera' ) {
    iaScore++;
    winner = 'ia';
  } 
  if ( player == 'Papel' && ia == 'Papel' ) {
    winner = 'empate';
  } 
  // Tijera
  if ( player == 'Tijera' && ia == 'Papel' ) {
    playerScore++;
    winner = 'player';
  }
  if ( player == 'Tijera' && ia == 'Piedra' ) {
    iaScore++;
    winner = 'ia';
  } 
  if ( player == 'Tijera' && ia == 'Tijera' ) {
    winner = 'empate';
  } 
  // Se devuelve al ganador
  return winner;
}


// Función que imprime el resultado en pantalla
const resultScreen = () => {
  let result = document.getElementById('results');
  let totalResults = document.getElementById('total-results');
  let colors;
  let msg;

  if ( playerScore > iaScore ) {
    msg = `¡Felicitaciones, ${ player.name }. Eres el nuevo campeón!`;
    colors = {
      player:'green', 
      ia:'red'
    };
    totalPlayerScore++;
  }
  if ( playerScore < iaScore ) {
    msg = 'Mejor suerte para la próxima...!'
    colors = {
      player:'red', 
      ia:'green'
    };
    totalIaScore++;
  }
  if ( playerScore == iaScore ) {
    msg = '¡Empate!'
    colors = {
      player:'gray', 
      ia:'gray'
    };
  }

  totalScore( totalResults );

  return result.innerHTML = `
    <h2>${ msg }</h2>
    <p style='color:${colors.player};'>Jugador: ${ playerScore }</p>
    <p style='color:${colors.ia};'>IA: ${ iaScore }</p>

    <button onClick='reset()' >Jugar de Nuevo</button>
  `;
}

// Función que imprime el resultado total
const totalScore = ( tresults ) => {
  return tresults.innerHTML = `
    <h2>Humanos: ${ totalPlayerScore }</h2>
    <h2>Máquinas: ${ totalIaScore }</h2>
    <button onClick='resetTotalScore()'>Reiniciar</button>
  `;
}

// Función para resetear el contador
const reset = () => {
  // Aparece la caja de registro
  document.getElementById('game').classList.toggle('hidden');
  // Aparecen los botonos
  document.getElementById('btns').classList.toggle('hidden');
  // Desaparece la pantalla de juego la pantalla de juego
  document.getElementById('nuevo-juego').classList.toggle('hidden');
  // La caja de resultados de transforma en un string vacío
  document.getElementById('results').innerHTML = '';

  // Se resetea el valor de player
  player = {
    name: '',
    rep: 0
  }
  // Se resetean los contadores de puntos
  playerScore = 0;
  iaScore = 0;
}

const resetTotalScore = () => {
  let totalResults = document.getElementById('total-results');
  totalPlayerScore = 0;
  totalIaScore = 0;

  totalScore( totalResults );
}
