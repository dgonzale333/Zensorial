"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Coffee, Sparkles, Star, Droplets } from "lucide-react"

const ZensorialHeader = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()

  // Smooth parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Coffee bean floating animation
  const coffeeBeanVariants = {
    animate: {
      y: [-15, -45, -15],
      x: [-8, 12, -8],
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  // Steam effect animation
  const steamVariants = {
    animate: {
      y: [0, -60],
      x: [-5, 5, -5],
      opacity: [0, 0.6, 0],
      scale: [0.5, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      },
    },
  }

  const staggeredParticles = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <header
      id="zensorial-header"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-950 via-yellow-900 to-amber-900 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900"
    >
      {/* Fondo con textura de café */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-yellow-800/30 to-amber-800/50 dark:from-gray-800/60 dark:via-amber-900/40 dark:to-gray-900/50"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(120, 53, 15, 0.4), rgba(146, 64, 14, 0.3), rgba(133, 77, 14, 0.5))",
            "linear-gradient(135deg, rgba(146, 64, 14, 0.5), rgba(120, 53, 15, 0.3), rgba(161, 98, 7, 0.4))",
            "linear-gradient(225deg, rgba(133, 77, 14, 0.4), rgba(146, 64, 14, 0.4), rgba(120, 53, 15, 0.5))",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Efecto de vapor de café */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-stone-100/5 to-stone-50/10 dark:via-gray-100/3 dark:to-gray-50/5"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Interactive mouse-following gradient - Efecto crema */}
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245, 245, 220, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Partículas temáticas de café */}
      <motion.div className="absolute inset-0 pointer-events-none" variants={staggeredParticles} animate="animate">
        {/* Granos de café flotantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`bean-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 10}%`,
              top: `${25 + i * 8}%`,
            }}
            variants={coffeeBeanVariants}
            transition={{
              delay: i * 0.3,
              duration: 6 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="w-3 h-4 bg-amber-800 dark:bg-amber-700 rounded-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 dark:from-amber-600 dark:to-amber-800 rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-amber-900 dark:bg-amber-800 rounded-full" />
            </div>
          </motion.div>
        ))}

        {/* Vapor de café */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`steam-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${60 + Math.sin(i) * 10}%`,
            }}
            variants={steamVariants}
            transition={{
              delay: i * 0.4,
              duration: 2.5 + Math.random() * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          >
            <Droplets className="w-2 h-2 text-stone-200/40 dark:text-gray-300/30" />
          </motion.div>
        ))}

        {/* Elementos decorativos de café */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`decor-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + i * 12}%`,
            }}
            animate={{
              y: [-10, -25, -10],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              delay: i * 0.5,
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {i % 3 === 0 && <Coffee className="w-3 h-3 text-amber-600/50 dark:text-amber-500/40" />}
            {i % 3 === 1 && <Sparkles className="w-2 h-2 text-yellow-600/40 dark:text-yellow-500/30" />}
            {i % 3 === 2 && <Star className="w-2.5 h-2.5 text-amber-500/45 dark:text-amber-400/35" />}
          </motion.div>
        ))}
      </motion.div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16"
        style={{ y: springY1, opacity: springOpacity }}
      >
        {/* Subtitle con tema de café */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/20 dark:bg-gray-800/40 backdrop-blur-sm rounded-full text-stone-100 dark:text-gray-200 text-sm font-medium border border-amber-700/30 dark:border-gray-600/30">
            <Coffee className="w-4 h-4" />
            Experiencia Premium
            <Coffee className="w-4 h-4" />
          </span>
        </motion.div>

        {/* Main title con colores de café */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-stone-100 dark:text-gray-100 mb-8 leading-tight"
          initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.5,
          }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Vive la experiencia
          </motion.span>

          {/* Palabra "Zensorial" con efectos sutiles */}
          <motion.div
            className="block relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {/* Efecto de brillo muy sutil */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-yellow-100/15 to-stone-200/20 dark:from-amber-300/15 dark:via-yellow-200/10 dark:to-gray-200/15 blur-lg"
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Texto simple con gradiente sutil */}
            <motion.span
              className="relative z-10 bg-gradient-to-r from-stone-100 via-amber-100 to-yellow-200 dark:from-gray-100 dark:via-amber-200 dark:to-yellow-300 bg-clip-text text-transparent font-extrabold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 1.3,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              Zensorial
            </motion.span>
          </motion.div>
        </motion.h1>

        {/* Taza de café animada con vapor */}
        <motion.div
          className="relative"
          style={{ y: springY2 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.4, type: "spring", bounce: 0.4 }}
        >
          {/* Vapor saliendo de la taza */}
          <motion.div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${-10 + i * 10}px` }}
                animate={{
                  y: [0, -30],
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              >
                <div className="w-1 h-2 bg-stone-200/50 dark:bg-gray-300/40 rounded-full" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative z-10"
            animate={{
              y: [-8, 8, -8],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Coffee className="w-16 h-16 md:w-20 md:h-20 text-amber-300 dark:text-amber-400" />
          </motion.div>

          {/* Resplandor cálido de café */}
          <motion.div
            className="absolute inset-0 bg-amber-600/30 dark:bg-amber-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Call to action con colores café */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-12"
        >
          <motion.button
            onClick={() => {
              document.getElementById("content-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-amber-600 dark:to-amber-500 text-stone-100 dark:text-gray-100 font-semibold rounded-full shadow-2xl overflow-hidden border border-amber-500/30 dark:border-amber-400/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-700 dark:from-amber-500 dark:to-yellow-600 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Descubre más
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                →
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-950/40 dark:from-gray-900/60 to-transparent" />
    </header>
  )
}

export default ZensorialHeader
