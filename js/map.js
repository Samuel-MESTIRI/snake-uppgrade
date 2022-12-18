function initMap(maxX, maxY, gameId) {
  // create all map case in html
  const game = document.querySelector('#'+gameId)

  // create all map cases
  for (let y = 0; y < maxY; y++) {
    const line = document.createElement('div')
    line.classList.add('line')
    game.append(line)

    for (let x = 0; x < maxX; x++) {
      const box = document.createElement('div')
      box.classList.add('box', 'x'+x, 'y'+y)
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