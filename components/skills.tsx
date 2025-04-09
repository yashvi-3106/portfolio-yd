"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Canvas } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"

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
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Skills() {
  // Check if we're in the browser
  const isBrowser = typeof window !== "undefined"

  return (
    <div className="relative w-full min-h-screen">
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
