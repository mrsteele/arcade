import Game from '../components/Game'

export default class extends Game {
  player = {
    x: parseInt(this.width / 2),
    y: this.height - 20,
    height: 5,
    width: 80
  }

  ball = {
    x: 0,
    y: 0,
    speed: {
      x: 3,
      y: 3
    }
  }

  keysDown = {
    left: false,
    right: false,
    space: false
  }

  draw () {
    this.ctx.fillStyle = 'white'

    // ball
    this.ctx.fillRect(this.ball.x, this.ball.y, 5, 5)

    // player
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height)


    this.ctx.font = `15px Arial`
    this.ctx.fillText(`${this.ball.speed.x}`, 10, 10)
  }

  tick () {
    // update ball
    this.ball.x += this.ball.speed.x
    this.ball.y += this.ball.speed.y

    // check ball collisions walls
    if (this.ball.x <= 0 || this.ball.x >= this.width - 5) {
      this.ball.speed.x = -this.ball.speed.x
    }
    if (this.ball.y <= 0) {
      this.ball.speed.y = -this.ball.speed.y
    } else if (this.ball.y >= this.height) {
      // game over...
    }

    // check if the ball collisions with the paddle...
    let contactedBall = false
    if (
      this.ball.y >= this.player.y &&
      this.ball.y <= this.player.y &&
      this.ball.x >= this.player.x &&
      this.ball.x <= this.player.x + this.player.width
    ) {
      this.ball.speed.y = -this.ball.speed.y
      contactedBall = true
    }

    // update keys
    if (this.keysDown.left && this.player.x > 0) {
      this.player.x -= 5
      if (contactedBall) {
        this.ball.speed.x += 1
      }
    } else if (this.keysDown.right && this.player.x < this.width - this.player.width) {
      this.player.x += 5
      if (contactedBall) {
        this.ball.speed.x -= 1
      }
    }
  }

  keyUp = (e) => {
    if (e.keyCode === 37) {
      this.keysDown.left = false
    } else if (e.keyCode === 39) {
      this.keysDown.right = false
    }
  }

  keyDown = (e) => {
    if (e.keyCode === 37) {
      this.keysDown.left = true
    } else if (e.keyCode === 39) {
      this.keysDown.right = true
    }
  }

  init () {
    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
  }

  deinit () {
    document.removeEventListener('keydown', this.keyDown)
    document.removeEventListener('keyup', this.keyUp)
  }
}
