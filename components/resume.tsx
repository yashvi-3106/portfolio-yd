"use client"

import { motion } from "framer-motion"
import { Download, PlaneIcon as PaperPlane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef } from "react"

export default function Resume() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique background for Resume section
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Colors
    const colors = [
      { r: 185, g: 54, b: 238 }, // Purple (#b936ee)
      { r: 11, g: 160, b: 228 }, // Blue (#0ba0e4)
      { r: 255, g: 86, b: 246 }, // Pink (#ff56f6)
      { r: 58, g: 71, b: 213 }, // Dark Blue (#3a47d5)
    ]

    // Create paper-like texture with lines
    const drawPaperTexture = (ctx: CanvasRenderingContext2D) => {
      // Fill background
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw horizontal lines
      const lineSpacing = 30
      const lineCount = Math.ceil(window.innerHeight / lineSpacing)

      for (let i = 0; i < lineCount; i++) {
        const y = i * lineSpacing
        const color = colors[i % colors.length]

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(window.innerWidth, y)
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw vertical lines (less visible)
      const verticalSpacing = 100
      const verticalCount = Math.ceil(window.innerWidth / verticalSpacing)

      for (let i = 0; i < verticalCount; i++) {
        const x = i * verticalSpacing
        const color = colors[(i + 2) % colors.length]

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, window.innerHeight)
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.05)`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // Create floating paper particles
    class PaperParticle {
      x: number
      y: number
      size: number
      speed: number
      angle: number
      rotationSpeed: number
      rotation: number
      color: { r: number; g: number; b: number }
      opacity: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 5 + 2
        this.speed = Math.random() * 0.5 + 0.2
        this.angle = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
        this.rotation = Math.random() * Math.PI * 2
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.2 + 0.1
      }

      update() {
        // Move in a random direction
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Slightly change direction
        this.angle += (Math.random() - 0.5) * 0.1

        // Rotate
        this.rotation += this.rotationSpeed

        // Wrap around edges
        if (this.x < -this.size) this.x = window.innerWidth + this.size
        if (this.x > window.innerWidth + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = window.innerHeight + this.size
        if (this.y > window.innerHeight + this.size) this.y = -this.size

        return {
          x: this.x,
          y: this.y,
          size: this.size,
          rotation: this.rotation,
          color: this.color,
          opacity: this.opacity,
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const { x, y, size, rotation, color, opacity } = this.update()

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        // Draw small square (paper-like)
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
        ctx.fillRect(-size / 2, -size / 2, size, size)

        ctx.restore()
      }
    }

    // Create particles
    const particles = Array(100)
      .fill(0)
      .map(() => new PaperParticle())

    // Animation variables
    let animationFrameId: number

    // Animation loop
    const animate = () => {
      // Draw paper texture
      drawPaperTexture(ctx)

      // Draw particles
      particles.forEach((particle) => {
        particle.draw(ctx)
      })

      // Request next frame
      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {/* Unique Background for Resume section */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text inline-block">Resume</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
        <p className="text-lg max-w-3xl mx-auto">Download my resume or view it online</p>
      </motion.div>

      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-[8.5/11] w-full bg-card relative max-h-[400px]">
                <div
                  className="w-full h-full bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url("/placeholder.svg?height=1100&width=850")' }}
                  aria-label="Resume Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button size="sm" className="group">
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
              Download Resume
            </Button>
            <Button size="sm" variant="outline" className="group">
              <PaperPlane className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              Email Resume
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
