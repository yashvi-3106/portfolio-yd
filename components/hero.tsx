"use client"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)

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

    // Flow field parameters
    const particleCount = 800
    const noiseScale = 0.005
    const noiseStrength = 5
    const particleSpeed = 1
    const particleSize = 2
    const particleOpacity = 0.6
    const flowFieldColors = [
      { r: 185, g: 54, b: 238 }, // Purple (#b936ee)
      { r: 11, g: 160, b: 228 }, // Blue (#0ba0e4)
      { r: 255, g: 86, b: 246 }, // Pink (#ff56f6)
      { r: 58, g: 71, b: 213 }, // Dark Blue (#3a47d5)
    ]

    // Mouse interaction parameters
    const mouseParticleCount = 10
    const mouseParticleLifespan = 50
    const mouseParticleSpeed = 3
    const mouseParticleSize = 3
    const mouseParticleOpacity = 0.8
    const mouseParticles: MouseParticle[] = []

    // Mouse particle class
    class MouseParticle {
      x: number
      y: number
      vx: number
      vy: number
      color: { r: number; g: number; b: number }
      size: number
      opacity: number
      life: number
      maxLife: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        const angle = Math.random() * Math.PI * 2
        this.vx = Math.cos(angle) * (Math.random() * mouseParticleSpeed)
        this.vy = Math.sin(angle) * (Math.random() * mouseParticleSpeed)
        this.color = flowFieldColors[Math.floor(Math.random() * flowFieldColors.length)]
        this.size = Math.random() * mouseParticleSize + 1
        this.opacity = Math.random() * mouseParticleOpacity + 0.2
        this.life = 0
        this.maxLife = Math.random() * mouseParticleLifespan + 20
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life++
        this.opacity = this.opacity * (1 - this.life / this.maxLife)
        this.size = this.size * (1 - (this.life / this.maxLife) * 0.5)
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
        ctx.fill()
      }

      isDead() {
        return this.life >= this.maxLife
      }
    }

    // Particle class for flow field
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      color: { r: number; g: number; b: number }
      size: number
      opacity: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.vx = 0
        this.vy = 0
        this.color = flowFieldColors[Math.floor(Math.random() * flowFieldColors.length)]
        this.size = Math.random() * particleSize + 1
        this.opacity = Math.random() * particleOpacity + 0.2
        this.life = 0
        this.maxLife = 100 + Math.random() * 100
      }

      update(time: number) {
        // Calculate flow field angle using Perlin-like noise
        const angle = (Math.sin(this.x * noiseScale + time) + Math.cos(this.y * noiseScale + time)) * noiseStrength

        // Update velocity based on flow field
        this.vx = Math.cos(angle) * particleSpeed
        this.vy = Math.sin(angle) * particleSpeed

        // Update position
        this.x += this.vx
        this.y += this.vy

        // Increase life
        this.life++

        // Reset particle if it goes off screen or exceeds max life
        if (
          this.x < 0 ||
          this.x > window.innerWidth ||
          this.y < 0 ||
          this.y > window.innerHeight ||
          this.life > this.maxLife
        ) {
          this.reset()
        }
      }

      reset() {
        // Reset position to a random edge of the screen
        const edge = Math.floor(Math.random() * 4)
        switch (edge) {
          case 0: // top
            this.x = Math.random() * window.innerWidth
            this.y = 0
            break
          case 1: // right
            this.x = window.innerWidth
            this.y = Math.random() * window.innerHeight
            break
          case 2: // bottom
            this.x = Math.random() * window.innerWidth
            this.y = window.innerHeight
            break
          case 3: // left
            this.x = 0
            this.y = Math.random() * window.innerHeight
            break
        }

        this.life = 0
        this.maxLife = 100 + Math.random() * 100
        this.color = flowFieldColors[Math.floor(Math.random() * flowFieldColors.length)]
        this.size = Math.random() * particleSize + 1
        this.opacity = Math.random() * particleOpacity + 0.2
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Calculate opacity based on life
        const lifeRatio = this.life / this.maxLife
        const fadeInOut = lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.9 ? (1 - lifeRatio) * 10 : 1

        // Draw particle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * fadeInOut})`
        ctx.fill()
      }
    }

    // Create flow field particles
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Mouse move handler
    let lastMouseX = 0
    let lastMouseY = 0
    let mouseMoveTimeout: NodeJS.Timeout

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = getMousePos(e)
      const x = mousePos.x
      const y = mousePos.y

      // Calculate mouse velocity
      const dx = x - lastMouseX
      const dy = y - lastMouseY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Only create particles if mouse is moving fast enough
      if (distance > 5) {
        // Create particles along the mouse path
        const steps = Math.floor(distance / 5)
        for (let i = 0; i < steps; i++) {
          const stepX = lastMouseX + (dx / steps) * i
          const stepY = lastMouseY + (dy / steps) * i

          // Add multiple particles at each step
          for (let j = 0; j < mouseParticleCount; j++) {
            mouseParticles.push(new MouseParticle(stepX, stepY))
          }
        }
      }

      lastMouseX = x
      lastMouseY = y
      setMousePosition({ x, y })
      setIsMouseMoving(true)

      // Reset the timeout on each mouse move
      clearTimeout(mouseMoveTimeout)
      mouseMoveTimeout = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
    }

    // Initialize mouse position on mouse enter
    const handleMouseEnter = (e: MouseEvent) => {
      const mousePos = getMousePos(e)
      lastMouseX = mousePos.x
      lastMouseY = mousePos.y
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)

    // Animation variables
    let time = 0
    let animationFrameId: number

    // Animation loop
    const animate = () => {
      // Clear canvas with a semi-transparent background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Update and draw flow field particles
      particles.forEach((particle) => {
        particle.update(time)
        particle.draw(ctx)
      })

      // Update and draw mouse particles
      for (let i = mouseParticles.length - 1; i >= 0; i--) {
        mouseParticles[i].update()
        mouseParticles[i].draw(ctx)

        // Remove dead particles
        if (mouseParticles[i].isDead()) {
          mouseParticles.splice(i, 1)
        }
      }

      // Increment time
      time += 0.003

      // Request next frame
      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      clearTimeout(mouseMoveTimeout)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Flow Field Canvas Background with Mouse Interaction */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 bg-black" />

      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div className="mb-6 inline-block relative">
            <motion.span
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur-xl"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="relative bg-background/80 backdrop-blur-sm rounded-lg px-8 py-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  Hi,
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  I'm
                </motion.span>
              </motion.h1>

              <motion.div
                className="relative mt-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text">Yashvi Dholakiya</h1>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-xl md:text-2xl text-muted-foreground mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="typing-text">Full Stack Developer & Designer</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div className="flex flex-col items-center">
            <p className="text-muted-foreground mb-2">Scroll down to explore</p>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
