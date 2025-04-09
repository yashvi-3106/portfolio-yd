"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Canvas } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"

function Background() {
  return (
    <>
      {/* Replace Environment with simple lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#b936ee" />
      <hemisphereLight args={["#b936ee", "#0ba0e4", 0.5]} />

      <Float speed={4} rotationIntensity={1} floatIntensity={2} position={[0, 0, -5]}>
        <mesh>
          <sphereGeometry args={[5, 64, 64]} />
          <MeshDistortMaterial
            color="#b936ee"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Check if we're in the browser
  const isBrowser = typeof window !== "undefined"

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

  return (
    <div className="relative w-full h-full min-h-screen">
      <div className="absolute inset-0 -z-10">
        {isBrowser && (
          <Canvas>
            <Background />
          </Canvas>
        )}
      </div>

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
