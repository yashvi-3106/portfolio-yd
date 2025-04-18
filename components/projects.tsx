"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const projectCategories = ["Featured", "Contributions", "Clones"]

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Featured",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Featured",
    technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A 3D portfolio website showcasing projects and skills with interactive elements.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Featured",
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 4,
    title: "Open Source Library",
    description: "Contributed to a popular open-source React component library by adding new features and fixing bugs.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Contributions",
    technologies: ["React", "TypeScript", "Storybook"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 5,
    title: "Documentation Site",
    description:
      "Improved documentation for a major JavaScript framework, adding examples and fixing unclear sections.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Contributions",
    technologies: ["Markdown", "JavaScript", "Docusaurus"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 6,
    title: "Twitter Clone",
    description: "A Twitter clone with real-time updates, user authentication, and tweet functionality.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Clones",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 7,
    title: "Netflix Clone",
    description: "A Netflix clone with movie browsing, trailers, and user authentication.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Clones",
    technologies: ["React", "Redux", "Firebase", "TMDB API"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 8,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Featured",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Featured",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Featured",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Featured",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoLink: "#",
    githubLink: "#",
    prLink: "#",
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Featured")
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = projects.filter((project) => project.category === activeCategory).length - 1

  const filteredProjects = projects.filter((project) => project.category === activeCategory)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1))
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text inline-block">Projects</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
        <p className="text-lg max-w-3xl mx-auto">Check out some of my recent work</p>
      </motion.div>

      <Tabs defaultValue="Featured" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList>
            {projectCategories.map((category) => (
              <TabsTrigger key={category} value={category} onClick={() => setCurrentIndex(0)}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {projectCategories.map((category) => (
          <TabsContent key={category} value={category} className="relative">
            <div className="flex items-center justify-center">
              <Button variant="ghost" size="icon" className="absolute left-0 z-10 md:left-10" onClick={prevProject}>
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <div className="w-full overflow-hidden">
                <div className="flex justify-center">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl"
                  >
                    <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative h-64 md:h-auto overflow-hidden">
                          <Image
                            src={filteredProjects[currentIndex]?.image || "/placeholder.svg?height=600&width=800"}
                            alt={filteredProjects[currentIndex]?.title || "Project Image"}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105 w-full h-full"
                          />
                        </div>
                        <CardContent className="p-6 md:p-8 flex flex-col">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {filteredProjects[currentIndex]?.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{filteredProjects[currentIndex]?.title}</h3>
                          <p className="text-foreground/70 mb-6 flex-grow">{filteredProjects[currentIndex]?.description}</p>
                          <div className="flex flex-wrap gap-4 mt-auto">
                            <Button asChild size="sm">
                              <a
                                href={filteredProjects[currentIndex]?.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                              </a>
                            </Button>
                            <Button variant="outline" asChild size="sm">
                              <a
                                href={filteredProjects[currentIndex]?.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="absolute right-0 z-10 md:right-10" onClick={nextProject}>
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            <div className="flex justify-center mt-8">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full ${
                    currentIndex === index ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}