"use client"

import { motion } from "framer-motion"
import { Book, Code, Palette, Plane } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"

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

function Background() {
  return (
    <>
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
  return (
    <div className="container mx-auto px-4 py-16">
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

      {/* Profile Photo - Added at the top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-12"
      >
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30">
          <Image src="/placeholder.svg?height=300&width=300" alt="Yashvi Dholakiya" fill className="object-cover" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg max-w-3xl mx-auto text-center mb-16"
      >
        I'm a passionate full-stack developer and designer with a love for creating beautiful, functional, and
        user-centered digital experiences. With a background in computer science and a keen eye for design, I strive to
        bridge the gap between aesthetics and functionality.
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
          <div className="absolute inset-0 -z-10">
            <Canvas>
              <Background />
            </Canvas>
          </div>

          <div className="relative z-10">
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
