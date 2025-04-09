"use client"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-background via-background/90 to-primary/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

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
  initial={{ backgroundColor: "rgba(128, 0, 128, 0.5)" }} // 💥 add this line
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
