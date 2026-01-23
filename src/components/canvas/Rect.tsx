import React, {useLayoutEffect} from 'react'

const CanvasRect: React.FC = () => {
  useLayoutEffect(() => {
    const container = document.getElementById('container') as HTMLDivElement
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
    if (!container || !canvas) return
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

    function resizeCanvas() {
      const rect = container.getBoundingClientRect()
      console.log('Container Rect:', rect)
      canvas.width = rect.width
      canvas.height = rect.height
      draw()
    }

    function draw() {
      const {width, height} = canvas
      if (!ctx) return
      // Clear
      ctx.clearRect(0, 0, width, height)

      // Blue rectangle (full canvas)
      ctx.fillStyle = '#1e90ff' // blue
      ctx.fillRect(0, 0, width, height)

      // Orange circle in the middle
      const radius = Math.min(width, height) * 0.35
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2)
      ctx.fillStyle = '#ff8c00' // orange
      ctx.fill()
    }
    resizeCanvas()

    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        const rect = entry.contentRect
        canvas.width = rect.width
        canvas.height = rect.height
        draw()
      }
    })
    observer.observe(container)

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      observer.disconnect()
    }
  }, [])
  return (
    <div
      id="container"
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        background: '#e4e4e4',
      }}
    >
      <canvas style={{display: 'block'}} id="myCanvas"></canvas>
    </div>
  )
}

export default CanvasRect
