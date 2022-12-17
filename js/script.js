import { initMap } from "./map.";

const MAP_X_LENGTH = 30
const MAP_Y_LENGTH = 30
const SNAKE_SPEED = 60 // millisecondes
const SNAKE_START_POSITION = [{x: 10, y: 10}]

let BOOST = 0
let SNAKE
let DIRECTION = {x: 1, y: 0} // ex: [0, -1] going up
let GAME_ACTIVE // intervall 

// -----------------------------

function initGame() {
  console.log('--- SART ---');

  BOOST = 0

  initMap(MAP_X_LENGTH, MAP_Y_LENGTH, 'game')

  // set snake
  SNAKE = JSON.parse(JSON.stringify(SNAKE_START_POSITION))
  updateMapCase(SNAKE[0].x, SNAKE[0].y, 'snake')
  
  // set keyboard events
  document.addEventListener('keydown', keyboardEvent)

  // set boost
  setBoost()
}

function keyboardEvent(event) {
  if (!event) return false
  console.log('event keyboard now');

  switch (event.code) {
    case 'ArrowUp':
      if (DIRECTION.x === 0 && DIRECTION.y === 1) break
      DIRECTION.x = 0
      DIRECTION.y = -1
      break;
    case 'ArrowDown':
      if (DIRECTION.x === 0 && DIRECTION.y === -1) break
      DIRECTION.x = 0
      DIRECTION.y = 1
      break;
    case 'ArrowLeft':
      if (DIRECTION.x === 1 && DIRECTION.y === 0) break
      DIRECTION.x = -1
      DIRECTION.y = 0
      break;
    case 'ArrowRight':
      if (DIRECTION.x === -1 && DIRECTION.y === 0) break
      DIRECTION.x = 1
      DIRECTION.y = 0
      break;
    case 'Space':
      // pause game
      if (GAME_ACTIVE) {
        clearInterval(GAME_ACTIVE)
        GAME_ACTIVE = undefined
      }
      break;
  
    default:
      break;
  }

  // start game with arrows key
  const keyCodeArrows = [37, 38, 39, 40]
  if (!GAME_ACTIVE && keyCodeArrows.includes(event.keyCode)) {
    startIntervall()
  }

  event.preventDefault();
}

function startIntervall() {
  if (!GAME_ACTIVE) {
    GAME_ACTIVE = setInterval(() => {
      const nextPosition = getSnakeNextPosition()
      const nextCase = document.querySelector(`.x${nextPosition.x}.y${nextPosition.y}`)
      const lastSnakePart = SNAKE[SNAKE.length-1]
      
      if (nextCase.classList.contains('boost')) {
        BOOST++
        removeClassFromCase(nextPosition.x, nextPosition.y, ['boost'])
        setBoost()
      } else if (nextCase.classList.contains('snake')) {
        gameOver()
        return
      } else {
        SNAKE.pop()
        removeClassFromCase( lastSnakePart.x, lastSnakePart.y, ['snake'])
      }
      
      SNAKE.unshift({x: nextPosition.x, y: nextPosition.y})

      moveSnake(nextPosition.x, nextPosition.y)
    }, SNAKE_SPEED);
  }
}

function getSnakeNextPosition() {
  let moveX = SNAKE[0].x + DIRECTION.x
  let moveY = SNAKE[0].y + DIRECTION.y

  if ((SNAKE[0].x + DIRECTION.x) < 0) {
    moveX = MAP_X_LENGTH - 1
  } else if ((SNAKE[0].y + DIRECTION.y) < 0) {
    moveY = MAP_Y_LENGTH - 1
  } else if ((SNAKE[0].x + DIRECTION.x) > (MAP_X_LENGTH - 1)) {
    moveX = 0
  } else if ((SNAKE[0].y + DIRECTION.y) > (MAP_Y_LENGTH - 1)) {
    moveY = 0
  }

  return {x: moveX, y: moveY}
}

function updateMapCase(x, y, newCase) {
  const selectedCase = document.querySelector(`.x${x}.y${y}`)
  selectedCase.classList.add(newCase)
}

function removeClassFromCase(x, y, classToRemove) {
  const selectedCase = document.querySelector(`.x${x}.y${y}`)
  selectedCase.classList.remove(...classToRemove)
}

function moveSnake(newX, newY) {
  updateMapCase(newX, newY, 'snake')

  SNAKE[0].x = newX
  SNAKE[0].y = newY
}

function setBoost() {
  let randomCoordinates
  do {
    randomCoordinates = getRandomCoordinates()
  } while (randomCoordinates === [SNAKE[0].x, SNAKE[0].y]);

  updateMapCase(randomCoordinates[0], randomCoordinates[1], 'boost')
}

function getRandomCoordinates() {
  return [
    Math.floor(Math.random() * (MAP_X_LENGTH + 0)),
    Math.floor(Math.random() * (MAP_Y_LENGTH + 0))
  ]
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function gameOver() {
  // clear interval, auto movement
  clearInterval(GAME_ACTIVE)
  GAME_ACTIVE = undefined

  // clear keyboard event
  document.removeEventListener("keydown", keyboardEvent);

  const container = document.querySelector('#game');
  container.innerHTML = ''

  initGame()
}

initGame()