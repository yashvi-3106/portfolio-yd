"use client"

import { motion } from "framer-motion"
import { Download, PlaneIcon as PaperPlane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Resume() {
  return (
    <div className="container mx-auto px-4 py-12">
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
