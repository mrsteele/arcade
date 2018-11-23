import React from 'react'
import Layout from '../components/Layout'

export default class extends React.Component {
  canvas = React.createRef()
  width = 600
  height = 500

  clear () {
    const { width, height } = this
    this.ctx.clearRect(0, 0, width, height)
  }

  draw () {
    // draw placeholder text
    this.ctx.font = `30px Arial`
    this.ctx.fillText('Replace your this.draw function!', 10, 10)
  }

  tick () {
    // update the game things...
  }

  run = () => {
    this.clear()
    this.draw()
    this.tick()

    this.frameid = window.requestAnimationFrame(this.run)
  }

  init () {
    // to run onMount
  }

  deinit () {
    // remove things...
  }

  componentDidMount () {
    this.ctx = this.canvas.current.getContext('2d')
    this.init()
    this.frameid = window.requestAnimationFrame(this.run)
  }

  componentWillUnmount () {
    this.deinit()
    window.cancelAnimationFrame(this.frameid)
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { width, height } = this
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
