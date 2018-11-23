import Game from '../components/Game'

const chance = (c = 0.5) => Math.random() < c

export default class extends Game {
  config = {
    padding: 5,
    bucket: {
      width: 50,
      height: 45
    },
    fruit: {
      size: 15
    },
    textSize: 16
  }

  // initializations
  fruits = []
  score = 0
  keysDown = {
    left: false,
    right: false
  }

  bucket = parseInt(this.width / 2)

  draw () {
    const { fruit, bucket, padding, textSize } = this.config
    // draw the fruit
    this.fruits.forEach(f => {
      this.ctx.fillStyle = f.bad ? 'red' : 'white'
      this.ctx.fillRect(f.x, f.y, fruit.size, fruit.size)
    })

    // draw the bucket
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.bucket, this.height - bucket.height - padding, bucket.width, bucket.height)

    // draw score
    this.ctx.font = `${textSize}px Arial`
    this.ctx.fillText(`score: ${this.score}`, padding, textSize)
  }

  tick () {
    const { bucket, padding } = this.config

    // move down fruits
    this.fruits.forEach(fruit => {
      fruit.y += 5
    })

    // check contacts...
    this.fruits.filter(f => f.y >= this.height - bucket.height - padding).filter(f => f.x >= this.bucket && f.x <= this.bucket + bucket.width).forEach(f => {
      f.touch = true
      this.score += f.bad ? -10 : 1
    })

    // remove fruits
    this.fruits = this.fruits.filter(f => !f.touch && f.y <= this.height)

    if (this.fruits.length < 5 && chance(0.03)) {
      this.fruits.push({
        y: 0,
        x: Math.random() * (this.width - 0),
        bad: chance(0.1)
      })
    }

    // update keys
    if (this.keysDown.left && this.bucket > 0) {
      this.bucket -= 5
    } else if (this.keysDown.right && this.bucket < this.width - bucket.width) {
      this.bucket += 5
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
    console.log('this', this)
    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
  }

  deinit () {
    document.removeEventListener('keydown', this.keyDown)
    document.removeEventListener('keyup', this.keyUp)
  }
}
