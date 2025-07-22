"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mountain, Users, Heart, Droplets, Coffee, Award, Calendar, Sun } from "lucide-react"

const CoffeeOriginStory = () => {
  const [activeStory, setActiveStory] = useState(0)
  const [hoveredRegion, setHoveredRegion] = useState(null)

  const coffeeRegions = [
    {
      id: "huila",
      name: "Huila",
      coordinates: { x: 45, y: 65 },
      families: 45,
      altitude: "1,200-2,100m",
      harvest: "Abril - Junio",
      specialty: "Notas frutales y florales",
    },
    {
      id: "narino",
      name: "Nariño",
      coordinates: { x: 35, y: 75 },
      families: 32,
      altitude: "1,500-2,300m",
      harvest: "Mayo - Julio",
      specialty: "Acidez brillante y cuerpo medio",
    },
    {
      id: "quindio",
      name: "Quindío",
      coordinates: { x: 40, y: 55 },
      families: 28,
      altitude: "1,200-1,800m",
      harvest: "Marzo - Mayo",
      specialty: "Equilibrio perfecto y dulzura",
    },
  ]

  const farmerStories = [
    {
      id: 1,
      name: "Don Carlos Mendoza",
      region: "Huila",
      generation: "3ra Generación",
      experience: "35 años",
      image: "/placeholder.svg?height=400&width=300&text=Don+Carlos",
      story:
        "Mi abuelo plantó los primeros cafetos en esta tierra hace más de 70 años. Cada mañana, cuando subo a la montaña y veo el amanecer sobre los cafetales, siento la misma pasión que él me transmitió. Cada grano que cosechamos lleva el amor de tres generaciones.",
      specialty: "Café Bourbon Rosado",
      altitude: "1,850m",
      process: "Lavado tradicional",
      quote: "El café no es solo nuestro sustento, es nuestra herencia y nuestro orgullo.",
    },
    {
      id: 2,
      name: "Doña María Elena",
      region: "Nariño",
      generation: "2da Generación",
      experience: "28 años",
      image: "/placeholder.svg?height=400&width=300&text=Doña+María",
      story:
        "Cuando mi esposo falleció, muchos pensaron que no podría continuar con la finca. Pero mis hijos y yo demostramos que las mujeres también sabemos cultivar café excepcional. Hoy somos reconocidas por la calidad de nuestro Geisha.",
      specialty: "Geisha Natural",
      altitude: "2,100m",
      process: "Natural honey",
      quote: "Cada taza de nuestro café lleva el sabor de la perseverancia y el amor familiar.",
    },
    {
      id: 3,
      name: "Familia Rodríguez",
      region: "Quindío",
      generation: "4ta Generación",
      experience: "45 años",
      image: "/placeholder.svg?height=400&width=300&text=Familia+Rodriguez",
      story:
        "Somos cuatro generaciones trabajando juntas en la misma finca. Los abuelos enseñan a los nietos los secretos del café, mientras los padres innovamos con nuevos procesos. Es hermoso ver cómo la tradición y la innovación se unen en cada cosecha.",
      specialty: "Caturra Premium",
      altitude: "1,650m",
      process: "Semi-lavado",
      quote: "Nuestro café es el resultado de cuatro generaciones de amor y dedicación.",
    },
  ]

  const processSteps = [
    {
      icon: Sun,
      title: "Cultivo",
      description: "Cuidado diario bajo la sombra de los árboles nativos",
      color: "from-yellow-600 to-orange-600",
    },
    {
      icon: Droplets,
      title: "Cosecha",
      description: "Recolección manual de cerezas en su punto perfecto",
      color: "from-red-600 to-red-700",
    },
    {
      icon: Coffee,
      title: "Procesamiento",
      description: "Métodos tradicionales perfeccionados por generaciones",
      color: "from-amber-700 to-amber-800",
    },
    {
      icon: Mountain,
      title: "Secado",
      description: "Secado natural al sol de montaña durante 15-20 días",
      color: "from-orange-700 to-red-700",
    },
  ]

  return (
    <section id="coffee-origin-section" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Heart className="w-4 h-4" />
            Nuestras Raíces
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Historias que{" "}
            <span className="bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 bg-clip-text text-transparent">
              Inspiran
            </span>
          </h2>

          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Conoce a las familias caficultoras que han dedicado sus vidas a cultivar los granos más excepcionales de
            Colombia. Sus historias de tradición, pasión y excelencia son el alma de cada taza.
          </p>
        </motion.div>

        {/* Interactive Colombia Map */}
        <motion.div
          className="mb-20 bg-white rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Regiones Cafeteras de Colombia</h3>

          <div className="relative max-w-2xl mx-auto">
            {/* Simplified Colombia Map SVG */}
            <svg viewBox="0 0 400 500" className="w-full h-96">
              {/* Colombia outline */}
              <path
                d="M100,50 L300,50 L350,100 L380,200 L350,300 L300,400 L200,450 L100,400 L50,300 L80,200 L100,50 Z"
                fill="url(#colombiaGradient)"
                stroke="#b45309"
                strokeWidth="2"
              />

              {/* Coffee regions */}
              {coffeeRegions.map((region, index) => (
                <motion.g key={region.id}>
                  <motion.circle
                    cx={region.coordinates.x * 4}
                    cy={region.coordinates.y * 4}
                    r={hoveredRegion === region.id ? 12 : 8}
                    fill="#dc2626"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    whileHover={{ scale: 1.2 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  />
                  <motion.text
                    x={region.coordinates.x * 4}
                    y={region.coordinates.y * 4 - 20}
                    textAnchor="middle"
                    className="text-sm font-semibold fill-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  >
                    {region.name}
                  </motion.text>
                </motion.g>
              ))}

              <defs>
                <linearGradient id="colombiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="50%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#fdba74" />
                </linearGradient>
              </defs>
            </svg>

            {/* Region Info Popup */}
            <AnimatePresence>
              {hoveredRegion && (
                <motion.div
                  className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-xl border border-amber-200 max-w-xs"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {(() => {
                    const region = coffeeRegions.find((r) => r.id === hoveredRegion)
                    return (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{region.name}</h4>
                        <div className="space-y-1 text-sm text-amber-700">
                          <p>
                            <strong>Familias:</strong> {region.families}
                          </p>
                          <p>
                            <strong>Altitud:</strong> {region.altitude}
                          </p>
                          <p>
                            <strong>Cosecha:</strong> {region.harvest}
                          </p>
                          <p>
                            <strong>Especialidad:</strong> {region.specialty}
                          </p>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Farmer Stories */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Voces de Nuestros Caficultores</h3>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              Cada familia tiene una historia única que contar. Conoce a las personas extraordinarias detrás de nuestro
              café excepcional.
            </p>
          </motion.div>

          {/* Story Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            {farmerStories.map((story, index) => (
              <motion.button
                key={story.id}
                onClick={() => setActiveStory(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeStory === index
                    ? "bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg"
                    : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {story.name.split(" ")[0]} {story.name.split(" ")[1]}
              </motion.button>
            ))}
          </div>

          {/* Active Story */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Story Content */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-700 to-orange-700 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{farmerStories[activeStory].name}</h4>
                      <p className="text-amber-700 font-medium">
                        {farmerStories[activeStory].region} • {farmerStories[activeStory].generation}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-lg text-amber-800 italic mb-6 pl-4 border-l-4 border-amber-600">
                    "{farmerStories[activeStory].quote}"
                  </blockquote>

                  <p className="text-gray-700 leading-relaxed mb-6">{farmerStories[activeStory].story}</p>
                </div>

                {/* Farmer Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Coffee className="w-5 h-5 text-amber-700" />
                      <span className="font-semibold text-gray-900">Especialidad</span>
                    </div>
                    <p className="text-amber-800 text-sm">{farmerStories[activeStory].specialty}</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Mountain className="w-5 h-5 text-orange-700" />
                      <span className="font-semibold text-gray-900">Altitud</span>
                    </div>
                    <p className="text-orange-800 text-sm">{farmerStories[activeStory].altitude}</p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-5 h-5 text-red-700" />
                      <span className="font-semibold text-gray-900">Proceso</span>
                    </div>
                    <p className="text-red-800 text-sm">{farmerStories[activeStory].process}</p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-yellow-700" />
                      <span className="font-semibold text-gray-900">Experiencia</span>
                    </div>
                    <p className="text-yellow-800 text-sm">{farmerStories[activeStory].experience}</p>
                  </div>
                </div>
              </div>

              {/* Farmer Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={farmerStories[activeStory].image || "/placeholder.svg"}
                    alt={farmerStories[activeStory].name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-amber-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-700 to-orange-700 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{farmerStories[activeStory].generation}</div>
                      <div className="text-sm text-amber-700">Tradición Familiar</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Coffee Process */}
        <motion.div
          className="bg-gradient-to-r from-amber-800 to-red-800 rounded-3xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Del Grano a la Taza</h3>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto">
              Cada paso de nuestro proceso está impregnado de tradición y cuidado artesanal, preservando los métodos que
              han sido perfeccionados durante generaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-amber-100 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CoffeeOriginStory
