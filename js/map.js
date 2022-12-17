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

export { initMap }