"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Mountain, Sunrise, Coffee, Heart, Users, Leaf } from "lucide-react"

const ZensorialHeader = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()

  // Parallax effects inspired by coffee landscapes
  const y1 = useTransform(scrollY, [0, 500], [0, -150])
  const y2 = useTransform(scrollY, [0, 500], [0, -300])
  const y3 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 80, damping: 25 })
  const springY3 = useSpring(y3, { stiffness: 120, damping: 35 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

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

  // Coffee plant growing animation
  const coffeeGrowthVariants = {
    animate: {
      y: [-10, -30, -10],
      scale: [1, 1.05, 1],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  // Mountain landscape animation
  const mountainVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const originStats = [
    { icon: Mountain, value: "1,800m", label: "Altitud Promedio", color: "from-amber-700 to-amber-800" },
    { icon: Users, value: "200+", label: "Familias Caficultoras", color: "from-orange-700 to-red-700" },
    { icon: Heart, value: "3ra Gen", label: "Tradición Familiar", color: "from-red-700 to-red-800" },
  ]

  return (
    <header
      id="zensorial-header"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"
    >
      {/* Coffee landscape background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(180, 83, 9, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Mountain silhouettes */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
        style={{ y: springY3 }}
        variants={mountainVariants}
        animate="animate"
      >
        <svg viewBox="0 0 1200 300" className="w-full h-full">
          <path
            d="M0,300 L0,200 L200,100 L400,150 L600,80 L800,120 L1000,60 L1200,100 L1200,300 Z"
            fill="url(#mountainGradient)"
          />
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(180, 83, 9)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(180, 83, 9)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Coffee plants floating elements */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`plant-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            variants={coffeeGrowthVariants}
            animate="animate"
            transition={{
              delay: i * 0.5,
              duration: 5 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <Leaf className="w-4 h-4 text-amber-700/40" />
          </motion.div>
        ))}
      </motion.div>

      {/* Floating coffee cherries */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`cherry-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 15}%`,
            }}
            animate={{
              y: [-15, -35, -15],
              x: [-8, 12, -8],
              rotate: [0, 180, 360],
            }}
            transition={{
              delay: i * 0.3,
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="w-3 h-3 bg-red-600/40 rounded-full shadow-sm" />
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20"
        style={{ y: springY1, opacity: springOpacity, scale: springScale }}
      >
        {/* Origin badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-amber-200/50 shadow-xl">
            <Mountain className="w-5 h-5 text-amber-700" />
            <span className="text-amber-900 font-medium">Desde las Montañas de Colombia</span>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Main headline with coffee story */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            <motion.span
              className="block bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Del Corazón
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-red-700 via-orange-600 to-amber-700 bg-clip-text text-transparent font-extrabold"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              de Colombia
            </motion.span>
            <motion.span
              className="block text-amber-900"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              a tu Mesa
            </motion.span>
          </h1>
        </motion.div>

        {/* Emotional subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-amber-800 max-w-4xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Cada taza cuenta la historia de familias caficultoras que han perfeccionado su arte durante generaciones.
          Conectamos tradición, pasión y excelencia en una experiencia única que honra nuestras raíces.
        </motion.p>

        {/* CTA Buttons with coffee theme */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <motion.button
            onClick={() => {
              document.getElementById("content-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-700 to-orange-700 text-white font-semibold rounded-xl shadow-2xl overflow-hidden border border-amber-600/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <Coffee className="w-5 h-5" />
              Conoce Nuestro Origen
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                →
              </motion.div>
            </span>
          </motion.button>

          <motion.button
            className="group relative px-8 py-4 bg-white/80 backdrop-blur-md text-amber-800 font-semibold rounded-xl border border-amber-200/50 hover:border-amber-300/70 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              <Heart className="w-5 h-5" />
              Historias de Caficultores
            </span>
          </motion.button>
        </motion.div>

        {/* Origin Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, staggerChildren: 0.2 }}
        >
          {originStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-amber-200/30 shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-amber-900 mb-2">{stat.value}</div>
              <div className="text-amber-700 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Coffee farm sunrise effect */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 opacity-30"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Sunrise className="w-full h-full text-amber-500" />
      </motion.div>

      {/* Bottom gradient with earth tones */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-100/60 to-transparent" />
    </header>
  )
}

export default ZensorialHeader
