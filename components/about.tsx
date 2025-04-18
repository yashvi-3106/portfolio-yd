"use client"

import { motion } from "framer-motion"
import { Book, Code, Palette, Plane } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef } from "react"

const educationData = [
  {
    id: 1,
    year: "2020 - 2024",
    degree: "Bachelor of Technology in Computer Science",
    institution: "Indian Institute of Technology",
    logo: "🏛️",
  },
  {
    id: 2,
    year: "2018 - 2020",
    degree: "Higher Secondary Education",
    institution: "Delhi Public School",
    logo: "🏫",
  },
]

const hobbies = [
  { id: 1, name: "Reading", icon: <Book className="h-8 w-8" /> },
  { id: 2, name: "Coding", icon: <Code className="h-8 w-8" /> },
  { id: 3, name: "Traveling", icon: <Plane className="h-8 w-8" /> },
  { id: 4, name: "Art & Design", icon: <Palette className="h-8 w-8" /> },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique background for About section
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

    // Create gradient bubbles
    class Bubble {
      x: number
      y: number
      radius: number
      color: { r: number; g: number; b: number }
      opacity: number
      speed: number
      direction: number
      pulseSpeed: number
      pulsePhase: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.radius = Math.random() * 80 + 40
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.15 + 0.05
        this.speed = Math.random() * 0.5 + 0.1
        this.direction = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update(time: number) {
        // Move in a random direction
        this.x += Math.cos(this.direction) * this.speed
        this.y += Math.sin(this.direction) * this.speed

        // Change direction slightly
        this.direction += (Math.random() - 0.5) * 0.1

        // Pulse size
        const pulseFactor = Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.2 + 1

        // Wrap around edges
        if (this.x < -this.radius) this.x = window.innerWidth + this.radius
        if (this.x > window.innerWidth + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = window.innerHeight + this.radius
        if (this.y > window.innerHeight + this.radius) this.y = -this.radius

        return {
          x: this.x,
          y: this.y,
          radius: this.radius * pulseFactor,
          color: this.color,
          opacity: this.opacity,
        }
      }
    }

    // Initialize bubbles
    const bubbles = Array(15)
      .fill(0)
      .map(() => new Bubble())

    // Animation variables
    let time = 0
    let animationFrameId: number

    // Animation loop
    const animate = () => {
      // Clear canvas with a dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw bubbles
      bubbles.forEach((bubble) => {
        const { x, y, radius, color, opacity } = bubble.update(time)

        // Create gradient for bubble
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Increment time
      time += 0.01

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
    <div className="container mx-auto px-4 py-16 relative">
      {/* Unique Background for About section */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text inline-block">About Me</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
      </motion.div>

      {/* Profile Photo with animated glowing border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-12"
      >
        <div className="relative">
          {/* Animated border */}
          <div className="absolute -inset-1 rounded-full glow-border"></div>

          {/* Photo container */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 z-10">
            <Image src="/placeholder.svg?height=300&width=300" alt="Yashvi Dholakiya" fill className="object-cover" />
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg max-w-3xl mx-auto text-center mb-16"
      >
        Hi, I'm Yashvi Dholakiya — a curious mind powered by caffeine, code, and crazy ideas. I believe technology isn't just about building apps — it's about building possibilities. From designing sleek websites to exploring AI's endless mysteries, I'm here to break things, fix them better, and maybe invent something no one's thought of yet. Adventure? Innovation? Bring it on. With a background in Information Technologo and a keen eye for design, I strive to bridge the gap between aesthetics and functionality. One thing’s for sure: I'm not here to just follow trends — I'm here to create them.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8 gradient-text inline-block">Education</h3>
          <div className="space-y-8 relative timeline">
            {educationData.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item ${
                  index % 2 === 0
                    ? "pr-8 md:pr-0 md:mr-auto md:w-1/2 md:pr-8"
                    : "pl-8 md:pl-0 md:ml-auto md:w-1/2 md:pl-8"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="timeline-content"
                >
                  <div className="text-4xl mb-2">{item.logo}</div>
                  <h4 className="text-xl font-bold">{item.degree}</h4>
                  <p className="text-muted-foreground">{item.institution}</p>
                  <p className="text-sm text-muted-foreground mt-2">{item.year}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative z-10 bg-background/50 backdrop-blur-sm p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-8 gradient-text inline-block">Hobbies</h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {hobbies.map((hobby) => (
                <motion.div key={hobby.id} variants={item}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 bg-background/80 backdrop-blur-sm animated-bg">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 text-primary">{hobby.icon}</div>
                      <h4 className="font-medium">{hobby.name}</h4>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
