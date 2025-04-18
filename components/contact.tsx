"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
    }, 1500)
  }

  // Unique background for Contact section
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

    // Create wave effect
    class Wave {
      amplitude: number
      frequency: number
      speed: number
      phase: number
      color: { r: number; g: number; b: number }
      y: number
      opacity: number
      lineWidth: number

      constructor(y: number) {
        this.amplitude = Math.random() * 30 + 10
        this.frequency = Math.random() * 0.01 + 0.005
        this.speed = Math.random() * 0.05 + 0.02
        this.phase = Math.random() * Math.PI * 2
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.y = y
        this.opacity = Math.random() * 0.2 + 0.1
        this.lineWidth = Math.random() * 3 + 1
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.beginPath()

        for (let x = 0; x < window.innerWidth; x += 5) {
          const y = Math.sin(x * this.frequency + time * this.speed + this.phase) * this.amplitude + this.y

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
        ctx.lineWidth = this.lineWidth
        ctx.stroke()
      }
    }

    // Create floating circles
    class Circle {
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
        this.radius = Math.random() * 20 + 5
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

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const { x, y, radius, color, opacity } = this.update(time)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
        ctx.fill()
      }
    }

    // Create waves and circles
    const waves = Array(10)
      .fill(0)
      .map((_, i) => new Wave(window.innerHeight * (i / 10)))

    const circles = Array(20)
      .fill(0)
      .map(() => new Circle())

    // Animation variables
    let time = 0
    let animationFrameId: number

    // Animation loop
    const animate = () => {
      // Clear canvas with a dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw waves
      waves.forEach((wave) => {
        wave.draw(ctx, time)
      })

      // Draw circles
      circles.forEach((circle) => {
        circle.draw(ctx, time)
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
    <div className="relative w-full h-full min-h-screen">
      {/* Unique Background for Contact section */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text inline-block">Contact Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <p className="text-lg max-w-3xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/80 backdrop-blur-sm"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/80 backdrop-blur-sm"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-background/80 backdrop-blur-sm"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full group">
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-background/80 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <div className="space-y-4">
                <a
                  href="mailto:yashvi@example.com"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-muted transition-colors"
                >
                  <Mail className="h-6 w-6 text-primary" />
                  <span>yashvi@example.com</span>
                </a>
                <a
                  href="https://github.com/yashvi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-muted transition-colors"
                >
                  <Github className="h-6 w-6 text-primary" />
                  <span>github.com/yashvi</span>
                </a>
                <a
                  href="https://linkedin.com/in/yashvi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-primary" />
                  <span>linkedin.com/in/yashvi</span>
                </a>
                <a
                  href="https://twitter.com/yashvi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-md hover:bg-muted transition-colors"
                >
                  <Twitter className="h-6 w-6 text-primary" />
                  <span>twitter.com/yashvi</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
