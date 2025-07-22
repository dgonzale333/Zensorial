"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, Coffee, Heart, Users, Award, MapPin } from "lucide-react"

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(1)

  const testimonials = [
    {
      id: 1,
      name: "Ana María Jiménez",
      role: "Directora de Experiencia",
      company: "Hotel Boutique Cartagena",
      type: "cliente",
      avatar: "/placeholder.svg?height=80&width=80&text=AMJ",
      rating: 5,
      text: "Nuestros huéspedes internacionales siempre preguntan por el café que servimos en el desayuno. Zensorial no solo nos proporciona un producto excepcional, sino que nos conecta con las historias de los caficultores. Es una experiencia completa que enriquece la estadía de nuestros visitantes.",
      location: "Cartagena, Colombia",
      impact: "Satisfacción de huéspedes +40%",
      background: "from-blue-600 to-blue-700",
    },
    {
      id: 2,
      name: "Don Miguel Herrera",
      role: "Caficultor",
      company: "Finca La Esperanza",
      type: "productor",
      avatar: "/placeholder.svg?height=80&width=80&text=MH",
      rating: 5,
      text: "Trabajar con Zensorial ha transformado mi vida y la de mi familia. No solo nos pagan un precio justo por nuestro café, sino que valoran nuestra historia y tradición. Ver cómo nuestro café llega a personas que aprecian el trabajo que hacemos nos llena de orgullo.",
      location: "Huila, Colombia",
      impact: "Ingresos familiares +60%",
      background: "from-green-600 to-green-700",
      generation: "3ra Generación",
      experience: "25 años",
    },
    {
      id: 3,
      name: "Carlos Mendoza",
      role: "CEO",
      company: "Grupo Empresarial Andino",
      type: "cliente",
      avatar: "/placeholder.svg?height=80&width=80&text=CM",
      rating: 5,
      text: "Implementar el servicio de café de Zensorial en nuestras oficinas fue una de las mejores decisiones que hemos tomado. No solo mejoró el ambiente laboral, sino que se convirtió en un punto de conversación con nuestros clientes. La calidad y la historia detrás de cada taza hacen la diferencia.",
      location: "Bogotá, Colombia",
      impact: "Productividad +25%",
      background: "from-amber-600 to-amber-700",
    },
    {
      id: 4,
      name: "Doña Carmen Rodríguez",
      role: "Cafetera",
      company: "Cooperativa Mujeres del Café",
      type: "productor",
      avatar: "/placeholder.svg?height=80&width=80&text=CR",
      rating: 5,
      text: "Como mujer cafetera, encontrar un socio que respete nuestro trabajo y nos ayude a crecer ha sido fundamental. Zensorial no solo compra nuestro café, sino que invierte en nuestra comunidad y nos ayuda a mejorar nuestros procesos. Juntos estamos construyendo un futuro mejor.",
      location: "Nariño, Colombia",
      impact: "Empoderamiento femenino",
      background: "from-pink-600 to-pink-700",
      generation: "2da Generación",
      experience: "18 años",
    },
    {
      id: 5,
      name: "Sofía Herrera",
      role: "Sommelier de Café",
      company: "Restaurante Alma",
      type: "cliente",
      avatar: "/placeholder.svg?height=80&width=80&text=SH",
      rating: 5,
      text: "En nuestro restaurante, cada detalle cuenta. El café de Zensorial no es solo una bebida, es el final perfecto para una experiencia gastronómica excepcional. La trazabilidad y la historia de cada origen nos permite crear maridajes únicos que sorprenden a nuestros comensales.",
      location: "Medellín, Colombia",
      impact: "Experiencia gastronómica única",
      background: "from-purple-600 to-purple-700",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-green-50 to-orange-50 ">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100  text-green-700  rounded-full text-sm font-medium mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Heart className="w-4 h-4" />
            Voces de Nuestra Comunidad
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 ">
            Historias que{" "}
            <span className="bg-gradient-to-r from-green-600 via-amber-600 to-red-600 bg-clip-text text-transparent">
              Conectan
            </span>
          </h2>
          <p className="text-xl text-gray-600  max-w-3xl mx-auto leading-relaxed">
            Desde los caficultores en las montañas hasta los clientes que disfrutan cada taza, descubre cómo Zensorial
            crea conexiones auténticas y transforma vidas.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative mb-16">
          <div className="relative h-[700px] overflow-hidden rounded-3xl shadow-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 },
                }}
                className={`absolute inset-0 bg-gradient-to-br ${currentTestimonial.background} p-8 md:p-12`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  {currentTestimonial.type === "productor" ? (
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Cpath d=M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
                  ) : (
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=40 height=40 viewBox=0 0 40 40 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=%23ffffff fillOpacity=0.1 fillRule=evenodd%3E%3Cpath d=M0 0h40v40H0V0zm20 20a20 20 0 1 1 0-40 20 20 0 0 1 0 40z/%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
                  )}
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center max-w-5xl mx-auto">
                  {/* Type Badge */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      {currentTestimonial.type === "productor" ? (
                        <Coffee className="w-5 h-5 text-white" />
                      ) : (
                        <Users className="w-5 h-5 text-white" />
                      )}
                      <span className="text-white font-medium">
                        {currentTestimonial.type === "productor" ? "Caficultor Aliado" : "Cliente Satisfecho"}
                      </span>
                    </div>
                  </motion.div>

                  {/* Quote */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Quote className="w-16 h-16 text-white/50 mb-6" />
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">
                      "{currentTestimonial.text}"
                    </blockquote>
                  </motion.div>

                  <div className="grid lg:grid-cols-2 gap-8 items-end">
                    {/* Author Info */}
                    <motion.div
                      className="flex items-center gap-6"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <div className="relative">
                        <img
                          src={currentTestimonial.avatar || "/placeholder.svg"}
                          alt={currentTestimonial.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-current flex items-center justify-center">
                          {currentTestimonial.type === "productor" ? (
                            <Coffee className="w-4 h-4 text-green-600" />
                          ) : (
                            <Award className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1">{currentTestimonial.name}</h4>
                        <p className="text-white/80 font-medium text-lg">{currentTestimonial.role}</p>
                        <p className="text-white/70">{currentTestimonial.company}</p>
                        <div className="flex items-center gap-2 mt-2 text-white/60">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{currentTestimonial.location}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Impact/Details */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-white/80 text-sm mb-1">Impacto</div>
                        <div className="text-white font-bold text-lg">{currentTestimonial.impact}</div>
                      </div>

                      {currentTestimonial.type === "productor" && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-white/80 text-xs mb-1">Generación</div>
                            <div className="text-white font-semibold">{currentTestimonial.generation}</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-white/80 text-xs mb-1">Experiencia</div>
                            <div className="text-white font-semibold">{currentTestimonial.experience}</div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Rating */}
                  <motion.div
                    className="flex items-center gap-2 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                      >
                        <Star className="w-6 h-6 text-yellow-300 fill-current" />
                      </motion.div>
                    ))}
                    <span className="text-white/80 ml-2">Experiencia excepcional</span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90  backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90  backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-12 h-3" : "w-3 h-3 hover:w-4"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-full h-full rounded-full ${
                  index === currentIndex
                    ? `bg-gradient-to-r ${testimonial.background}`
                    : testimonial.type === "productor"
                      ? "bg-green-300 "
                      : "bg-blue-300 "
                }`}
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 7, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Community Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: Coffee,
              value: "200+",
              label: "Familias Caficultoras",
              color: "from-green-500 to-green-600",
              description: "Aliados directos",
            },
            {
              icon: Users,
              value: "1,500+",
              label: "Clientes Satisfechos",
              color: "from-blue-500 to-blue-600",
              description: "En todo el país",
            },
            {
              icon: Heart,
              value: "99%",
              label: "Satisfacción",
              color: "from-red-500 to-red-600",
              description: "Promedio general",
            },
            {
              icon: Award,
              value: "15+",
              label: "Reconocimientos",
              color: "from-amber-500 to-amber-600",
              description: "Calidad y sostenibilidad",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white  rounded-2xl p-6 shadow-lg border border-gray-200 "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-800  font-medium mb-1">{stat.label}</div>
              <div className="text-gray-500  text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
