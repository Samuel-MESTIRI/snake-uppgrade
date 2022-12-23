function initMap(maxX, maxY, gameId) {
  // create all map case in html
  const game = document.querySelector('#'+gameId)

  // create all map cases
  for (let y = -2; y < maxY+1; y++) {
    const line = document.createElement('div')
    line.classList.add('line')
    game.append(line)

    for (let x = -1; x < maxX+1; x++) {
      const box = document.createElement('div')
      let classToadd = ['box']

      // if left wall 
      if (x === -1 && y !== -2) {
        classToadd.push('wall-left')
      }
      // if right wall 
      else if (x === maxX && y !== -2) {
        classToadd.push('wall-right')
      }
      // if  bottom wall
      else if (y === maxY) {
        classToadd.push('wall-bottom', 'floor')
      }
      // if top wall
      else if (y === -2 && x !== -1 && x !== maxX) {
        classToadd.push('wall-top')
      }
      else if (y === -1) {
        classToadd.push('wall')
      }
      else if ((x !== -1 && x !== maxX) && (y !== -2 && y !== maxY)) {
        classToadd.push('floor')
      }

      box.classList.add(...classToadd, 'x'+x, 'y'+y)

      line.append(box)
    }
  }
}

function updateMapCase(x, y, newCase) {
  const selectedCase = document.querySelector(`.x${x}.y${y}`)
  selectedCase.classList.add(newCase)
}

function removeClassFromCase(x, y, classToRemove) {
  const selectedCase = document.querySelector(`.x${x}.y${y}`)
  selectedCase.classList.remove(...classToRemove)
}

function setBoost(maxX, mapY) {
  let randomCoordinates = [0, 0]
  let randomCase
  do {
    randomCoordinates = getRandomCoordinates(maxX, mapY)
    randomCase = document.querySelector(`.x${randomCoordinates[0]}.y${randomCoordinates[1]}`)
  } while (randomCase.classList.contains('snake'));

  

  updateMapCase(randomCoordinates[0], randomCoordinates[1], 'boost')
}

function getRandomCoordinates(maxX, maxY) {
  return [
    Math.floor(Math.random() * (maxX + 0)),
    Math.floor(Math.random() * (maxY + 0))
  ]
}

function displayBoost(nb) {
  const element = document.querySelector('#boost-score')
  element.innerHTML = nb
}

export { initMap, updateMapCase, removeClassFromCase, setBoost, displayBoost }