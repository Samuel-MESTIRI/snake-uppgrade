import { initMap, updateMapCase, removeClassFromCase, setBoost, displayBoost } from "./map";
import { getSnakeNextPosition } from "./snake";

const MAP_X_LENGTH = 30
const MAP_Y_LENGTH = 30
const SNAKE_START_POSITION = [{x: 0, y: 0}]
const BASE_SNAKE_SPEED = 300 // millisecondes
const POURCENTAGE_SPEED_INCREASE = 5 // 5% speed increase

let BOOST = 0
let SNAKE
let SNAKE_SPEED // millisecondes
let DIRECTION = {x: 1, y: 0} // ex: [0, -1] going up
let GAME_ACTIVE // intervall 

// -----------------------------

function initGame() {
  console.log('--- SART ---');

  BOOST = 0
  displayBoost(BOOST)

  initMap(MAP_X_LENGTH, MAP_Y_LENGTH, 'game')

  // set snake speed
  SNAKE_SPEED = JSON.parse(JSON.stringify(BASE_SNAKE_SPEED))

  // set snake
  SNAKE = JSON.parse(JSON.stringify(SNAKE_START_POSITION))
  updateMapCase(SNAKE[0].x, SNAKE[0].y, 'snake')
  
  // set keyboard events
  document.addEventListener('keydown', keyboardEvent)

  // set boost
  setBoost(MAP_X_LENGTH, MAP_Y_LENGTH)
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
      const nextPosition = getSnakeNextPosition(SNAKE, DIRECTION, MAP_X_LENGTH, MAP_Y_LENGTH)
      const nextCase = document.querySelector(`.x${nextPosition.x}.y${nextPosition.y}`)
      const lastSnakePart = SNAKE[SNAKE.length-1]
      
      if (nextCase.classList.contains('boost')) {
        BOOST++
        displayBoost(BOOST)

        speedUp()

        removeClassFromCase(nextPosition.x, nextPosition.y, ['boost'])
        setBoost(MAP_X_LENGTH, MAP_Y_LENGTH)
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

function speedUp() {
  SNAKE_SPEED -= (POURCENTAGE_SPEED_INCREASE * SNAKE_SPEED / 100).toFixed(1)
  console.log(SNAKE_SPEED);

  clearInterval(GAME_ACTIVE)
  GAME_ACTIVE = undefined

  startIntervall()
}

function moveSnake(newX, newY) {
  updateMapCase(newX, newY, 'snake')

  SNAKE[0].x = newX
  SNAKE[0].y = newY
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