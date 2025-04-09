"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Static imports for components that don't need browser APIs
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Resume from "@/components/resume"
import Hero from "@/components/hero"

// Dynamic imports with SSR disabled for components that need browser APIs
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const Contact = dynamic(() => import("@/components/contact"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })

export default function HomeClient() {
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render anything until client-side
  if (!isMounted) {
    return null
  }

  return (
    <main className="relative overflow-hidden">
      <CustomCursor />
      <Navbar />
      <section id="home" className="min-h-screen">
        <Hero />
      </section>
      <section id="about" className="min-h-screen py-20">
        <About />
      </section>
      <section id="skills" className="min-h-screen py-20">
        <Skills />
      </section>
      <section id="projects" className="min-h-screen py-20">
        <Projects />
      </section>
      <section id="resume" className="min-h-screen py-20">
        <Resume />
      </section>
      <section id="contact" className="min-h-screen py-20">
        <Contact />
      </section>
    </main>
  )
}
