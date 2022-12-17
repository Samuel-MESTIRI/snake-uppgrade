function getSnakeNextPosition(snake, direction, maxX, maxY) {
  let moveX = snake[0].x + direction.x
  let moveY = snake[0].y + direction.y

  if ((snake[0].x + direction.x) < 0) {
    moveX = maxX - 1
  } else if ((snake[0].y + direction.y) < 0) {
    moveY = maxY - 1
  } else if ((snake[0].x + direction.x) > (maxX - 1)) {
    moveX = 0
  } else if ((snake[0].y + direction.y) > (maxY - 1)) {
    moveY = 0
  }

  return {x: moveX, y: moveY}
}

export { getSnakeNextPosition }