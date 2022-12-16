const MAP_X_LENGTH = 30
const MAP_Y_LENGTH = 30
const SNAKE_SPEED = 50 // millisecondes

let MAP = []
let BOOST = 0
let SNAKE = [{x: 10, y: 10}]
let DIRECTION = {x: 1, y: 0} // ex: [0, -1] going up
let GAME_ACTIVE // intervall 

// -----------------------------

function initGame() {
  console.log('--- SART ---');
  
  // fill MAP contant with map case
  MAP = getInitMap(MAP_X_LENGTH, MAP_Y_LENGTH)

  // create all map case in html
  const game = document.querySelector('#game')

  MAP.forEach(xEl => {
    const line = document.createElement('div')
    line.classList.add('line')
    game.append(line)

    xEl.forEach(yEl => {
      const box = document.createElement('div')
      box.classList.add('box', 'x'+yEl.x, 'y'+yEl.y)
      line.append(box)
    })
  })

  // set snake
  updateMapCase(SNAKE[0].x, SNAKE[0].y, 'snake')
  

  // set keyboard events
  setKeyboardEvent()

  // set boost
  setBoost()
 

  console.log(MAP);
}

function setKeyboardEvent() {
  document.addEventListener('keydown', (event) => {
    console.log('KEY');
    switch (event.code) {
      case 'ArrowUp':
        DIRECTION.x = 0
        DIRECTION.y = -1
        break;
      case 'ArrowDown':
        DIRECTION.x = 0
        DIRECTION.y = 1
        break;
      case 'ArrowLeft':
        DIRECTION.x = -1
        DIRECTION.y = 0
        break;
      case 'ArrowRight':
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
  }, true)
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

function getInitMap(xLength, yLength) {
  const map = []
  for (let i = 0; i < xLength; i++) {
    map[i] = []
    for (let j = 0; j < yLength; j++) {
      map[i][j] = {x: j, y: i}
    }
  }
  return map
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
  clearInterval(GAME_ACTIVE)
  const container = document.querySelector('#game');
  removeAllChildNodes(container);
  initGame()
}

initGame()