"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef } from "react"

const skills = [
  {
    id: 1,
    name: "React",
    description: "Building interactive UIs with React and its ecosystem",
    logo: "⚛️",
  },
  {
    id: 2,
    name: "Next.js",
    description: "Creating full-stack web applications with Next.js",
    logo: "▲",
  },
  {
    id: 3,
    name: "TypeScript",
    description: "Writing type-safe code with TypeScript",
    logo: "TS",
  },
  {
    id: 4,
    name: "Node.js",
    description: "Building scalable backend services with Node.js",
    logo: "🟢",
  },
  {
    id: 5,
    name: "MongoDB",
    description: "Working with NoSQL databases for flexible data storage",
    logo: "🍃",
  },
  {
    id: 6,
    name: "GraphQL",
    description: "Creating efficient APIs with GraphQL",
    logo: "◢",
  },
  {
    id: 7,
    name: "Tailwind CSS",
    description: "Crafting beautiful UIs with utility-first CSS",
    logo: "🌊",
  },
  {
    id: 8,
    name: "Three.js",
    description: "Creating 3D experiences for the web",
    logo: "🧊",
  },
  {
    id: 9,
    name: "Framer Motion",
    description: "Adding fluid animations to web interfaces",
    logo: "🔄",
  },
  {
    id: 10,
    name: "UI/UX Design",
    description: "Designing intuitive and beautiful user experiences",
    logo: "🎨",
  },
  {
    id: 11,
    name: "AWS",
    description: "Deploying and managing cloud infrastructure",
    logo: "☁️",
  },
  {
    id: 12,
    name: "Docker",
    description: "Containerizing applications for consistent deployment",
    logo: "🐳",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Unique background for Skills section
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

    // Create hexagon grid
    class Hexagon {
      x: number
      y: number
      size: number
      color: { r: number; g: number; b: number }
      opacity: number
      pulseSpeed: number
      pulsePhase: number
      rotation: number
      rotationSpeed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 20 + 30
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.2 + 0.05
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulsePhase = Math.random() * Math.PI * 2
        this.rotation = Math.random() * Math.PI
        this.rotationSpeed = (Math.random() - 0.5) * 0.005
      }

      update(time: number) {
        // Pulse opacity
        const opacityFactor = Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.5 + 0.5

        // Rotate
        this.rotation += this.rotationSpeed

        return {
          x: this.x,
          y: this.y,
          size: this.size,
          color: this.color,
          opacity: this.opacity * opacityFactor,
          rotation: this.rotation,
        }
      }

      draw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number,
        rotation: number,
        color: { r: number; g: number; b: number },
        opacity: number,
      ) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        // Draw hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const px = Math.cos(angle) * size
          const py = Math.sin(angle) * size
          if (i === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        ctx.closePath()

        // Fill with gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 1.5})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fill()

        ctx.restore()
      }
    }

    // Create hexagon grid
    const hexagons: Hexagon[] = []
    const spacing = 100
    const offsetX = spacing / 2
    const offsetY = (spacing * Math.sqrt(3)) / 2

    for (let row = -1; row < Math.ceil(window.innerHeight / offsetY) + 1; row++) {
      for (let col = -1; col < Math.ceil(window.innerWidth / spacing) + 1; col++) {
        const x = col * spacing + (row % 2) * offsetX
        const y = row * offsetY
        hexagons.push(new Hexagon(x, y))
      }
    }

    // Animation variables
    let time = 0
    let animationFrameId: number

    // Animation loop
    const animate = () => {
      // Clear canvas with a dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw hexagons
      hexagons.forEach((hexagon) => {
        const { x, y, size, color, opacity, rotation } = hexagon.update(time)
        hexagon.draw(ctx, x, y, size, rotation, color, opacity)
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
    <div className="relative w-full min-h-screen">
      {/* Unique Background for Skills section */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text inline-block">Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto">Here are some of the technologies and skills I've worked with</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {skills.map((skill) => (
            <motion.div key={skill.id} variants={item}>
              <Card className="overflow-hidden skill-card bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{skill.logo}</div>
                  <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                  <p className="text-muted-foreground text-sm">{skill.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
