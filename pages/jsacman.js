import React from 'react'
import Layout from '../components/Layout'

const chance = (c = 0.5) => Math.random() < c

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.config = {
      width: 600,
      height: 500,
      padding: 5,
      bucket: {
        width: 50,
        height: 45
      },
      fruit: {
        size: 15
      }
    }

    // initializations
    this.fruits = []
    this.score = 0
    this.keysDown = {
      left: false,
      right: false
    }
    this.bucket = parseInt(this.config.width / 2)

    this.canvas = React.createRef()
  }

  clear () {
    const { width, height } = this.config
    this.ctx.clearRect(0, 0, width, height)
  }

  draw () {
    const { fruit, height, bucket, padding } = this.config
    // draw the fruit
    this.fruits.forEach(f => {
      this.ctx.fillStyle = f.bad ? 'red' : 'white'
      this.ctx.fillRect(f.x, f.y, fruit.size, fruit.size)
    })

    // draw the bucket
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.bucket, height - bucket.height - padding, bucket.width, bucket.height)
  }

  tick () {
    const { width, height, bucket, padding } = this.config

    // move down fruits
    this.fruits.forEach(fruit => {
      fruit.y += 5
    })

    // check contacts...
    this.fruits.filter(f => f.y >= height - bucket.height - padding).filter(f => f.x >= this.bucket && f.x <= this.bucket + bucket.width).forEach(f => {
      f.touch = true
      this.score += f.bad ? -10 : 1
    })

    // remove fruits
    this.fruits = this.fruits.filter(f => !f.touch && f.y <= height)

    if (this.fruits.length < 5 && chance(0.03)) {
      this.fruits.push({
        y: 0,
        x: Math.random() * (width - 0),
        bad: chance(0.1)
      })
    }

    // update keys
    if (this.keysDown.left && this.bucket > 0) {
      this.bucket -= 5
    } else if (this.keysDown.right && this.bucket < width - bucket.width) {
      this.bucket += 5
    }
  }

  run = () => {
    this.clear()
    this.draw()
    this.tick()

    this.frameid = requestAnimationFrame(this.run)
  }

  keyUp = (e) => {
    if (e.keyCode == '37') {
      this.keysDown.left = false
    } else if (e.keyCode == '39') {
      this.keysDown.right = false
    }
  }

  keyDown = (e) => {
    if (e.keyCode == '37') {
      this.keysDown.left = true
    } else if (e.keyCode == '39') {
      this.keysDown.right = true
    }
  }

  componentDidMount () {
    this.ctx = this.canvas.current.getContext('2d')
    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
    this.frameid = requestAnimationFrame(this.run)
  }

  componentWillUnmount () {
  document.removeEventListener('keydown', this.keyDown)
  document.removeEventListener('keyup', this.keyUp)
    cancelAnimationFrame(this.frameid)
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { width, height } = this.config
    return (
      <Layout>
        <canvas width={width} height={height} ref={this.canvas} />
        <style jsx>{`
          canvas {
            background-color: black;
            border-radius: 5px;
            margin: 0 auto;
            display: block;
          }
        `}</style>
      </Layout>
    )
  }
}
