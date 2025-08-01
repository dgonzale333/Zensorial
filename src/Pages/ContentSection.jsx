"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ChevronDown,
  Coffee,
  Utensils,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Heart,
  MessageCircle,
  Share,
  Volume2,
  VolumeX,
} from "lucide-react"

// Importaciones de imágenes y videos
import imgCafe from "../assets/Img/WhatsApp Image 2025-07-19 at 1.31.52 PM.jpeg"
import imgCafe2 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.31.53 PM (1).jpeg"
import imgCafe3 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.31.53 PM.jpeg"
import imgCafe4 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.31.53 PM (2).jpeg"
import imgCafe5 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.31.53 PM.jpeg"
import imgCafe6 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.32.37 PM.jpeg"
import imgCafe7 from "../assets/Img/WhatsApp Image 2025-07-21 at 9.14.56 AM (1).jpeg"
import imgCafe8 from "../assets/Img/WhatsApp Image 2025-07-21 at 9.14.56 AM.jpeg"
import imgCafe9 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.32.32 PM (1).jpeg"
import imgCafe10 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.32.36 PM (1).jpeg"
import imgCafe11 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.32.32 PM.jpeg"
import imgCafe12 from "../assets/Img/WhatsApp Image 2025-07-19 at 1.32.32 PM (3).jpeg"
import imgCafe13 from "../assets/Img/WhatsApp Image 2025-07-21 at 9.14.56 AM (1).jpeg"
import imgCafe14 from "../assets/Img/WhatsApp Image 2025-07-21 at 9.14.56 AM.jpeg"
import videoCafe1 from "../assets/Video/videoCafe1.mp4"
import videoCafe2 from "../assets/Video/videoCafe2.mp4"
import videoCafe3 from "../assets/Video/videoCafe3.mp4"

const ContentSection = () => {
  const [activeSection, setActiveSection] = useState("cafes")
  const [cardSlides, setCardSlides] = useState({})
  const [playingVideos, setPlayingVideos] = useState({}) // Estado para controlar reproducción de videos
  const [mutedVideos, setMutedVideos] = useState({}) // Estado para controlar el volumen de videos

  // Datos de ejemplo para los carruseles con imágenes reales
  const contentData = {
    cafes: [
      {
        id: 1,
        type: "image",
        images: [
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe4 },
        ],
        title: "Procesos de Tostado",
        description: "Granos seleccionados de las mejores plantaciones",
        likes: 234,
        comments: 45,
      },
      {
        id: 2,
        type: "video",
        images: [
          { type: "video", src: videoCafe1 },
          { type: "video", src: videoCafe2 },
          { type: "video", src: videoCafe3 },
          { type: "image", src: imgCafe7 },
        ],
        title: "Proceso de Preparación",
        description: "El arte de preparar el café perfecto",
        likes: 189,
        comments: 32,
      },
      {
        id: 3,
        type: "image",
        images: [
          { type: "image", src: imgCafe8 },
          { type: "image", src: imgCafe9 },
          { type: "image", src: imgCafe10 },
          { type: "image", src: imgCafe11 },
        ],
        title: "Origen de Nuestros Granos",
        description: "Directamente desde las montañas",
        likes: 312,
        comments: 67,
      },
      {
        id: 4,
        type: "image",
        images: [
          { type: "image", src: imgCafe12 },
          { type: "image", src: imgCafe13 },
          { type: "image", src: imgCafe14 },
          { type: "image", src: imgCafe },
        ],
        title: "Espresso Perfecto",
        description: "La base de todas nuestras creaciones",
        likes: 278,
        comments: 54,
      },
    ],
    metodos: [
      {
        id: 5,
        type: "video",
        images: [
          { type: "video", src: videoCafe2 },
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe4 },
        ],
        title: "Método French Press",
        description: "Extracción completa y sabor intenso",
        likes: 156,
        comments: 28,
      },
      {
        id: 6,
        type: "image",
        images: [
          { type: "image", src: imgCafe5 },
          { type: "image", src: imgCafe6 },
          { type: "image", src: imgCafe7 },
          { type: "image", src: imgCafe8 },
        ],
        title: "Pour Over V60",
        description: "Precisión y control total",
        likes: 203,
        comments: 41,
      },
      {
        id: 7,
        type: "video",
        images: [
          { type: "video", src: videoCafe3 },
          { type: "image", src: imgCafe9 },
          { type: "image", src: imgCafe10 },
          { type: "image", src: imgCafe11 },
        ],
        title: "Máquina de Espresso",
        description: "Tecnología y tradición unidos",
        likes: 267,
        comments: 52,
      },
      {
        id: 8,
        type: "image",
        images: [
          { type: "image", src: imgCafe12 },
          { type: "image", src: imgCafe13 },
          { type: "image", src: imgCafe14 },
          { type: "image", src: imgCafe },
        ],
        title: "Cold Brew",
        description: "Extracción en frío para sabores únicos",
        likes: 145,
        comments: 33,
      },
    ],
    nosotros: [
      {
        id: 9,
        type: "image",
        images: [
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe4 },
          { type: "image", src: imgCafe5 },
        ],
        title: "Nuestro Equipo",
        description: "Apasionados por el café de calidad",
        likes: 189,
        comments: 76,
      },
      {
        id: 10,
        type: "video",
        images: [
          { type: "video", src: videoCafe1 },
          { type: "image", src: imgCafe6 },
          { type: "image", src: imgCafe7 },
          { type: "image", src: imgCafe8 },
        ],
        title: "Proceso de Tostado",
        description: "Artesanía en cada grano",
        likes: 234,
        comments: 45,
      },
      {
        id: 11,
        type: "image",
        images: [
          { type: "image", src: imgCafe9 },
          { type: "image", src: imgCafe10 },
          { type: "image", src: imgCafe11 },
          { type: "image", src: imgCafe12 },
        ],
        title: "Nuestro Espacio",
        description: "Un lugar para disfrutar y relajarse",
        likes: 298,
        comments: 89,
      },
      {
        id: 12,
        type: "image",
        images: [
          { type: "image", src: imgCafe13 },
          { type: "image", src: imgCafe14 },
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe2 },
        ],
        title: "Reconocimientos",
        description: "Premiados por nuestra excelencia",
        likes: 167,
        comments: 34,
      },
    ],
  }

  const sections = [
    {
      id: "cafes",
      title: "Nuestros Cafés",
      icon: Coffee,
      description: "Descubre nuestra selección premium de cafés de origen único",
      targetId: "coffee-details-section",
    },
    {
      id: "metodos",
      title: "Métodos",
      icon: Utensils,
      description: "Aprende las mejores técnicas de preparación de café",
      targetId: "methods-details-section",
    },
    {
      id: "nosotros",
      title: "Nosotros",
      icon: Users,
      description: "Conoce nuestra historia, misión y valores",
      targetId: "about-us-section",
    },
  ]

  const getCardSlideIndex = (cardId) => {
    return cardSlides[cardId] || 0
  }

  // Función para cambiar al siguiente slide de una tarjeta específica
  const nextSlide = (cardId, totalImages) => {
    setCardSlides((prev) => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) + 1 >= totalImages ? 0 : (prev[cardId] || 0) + 1,
    }))
  }

  // Función para cambiar al slide anterior de una tarjeta específica
  const prevSlide = (cardId, totalImages) => {
    setCardSlides((prev) => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) === 0 ? totalImages - 1 : (prev[cardId] || 0) - 1,
    }))
  }

  // Función para controlar la reproducción del video
  const toggleVideo = (cardId, slideIndex) => {
    const videoKey = `${cardId}-${slideIndex}`
    setPlayingVideos((prev) => ({
      ...prev,
      [videoKey]: !prev[videoKey],
    }))
  }

  // Función para controlar el volumen del video
  const toggleMute = (cardId, slideIndex) => {
    const videoKey = `${cardId}-${slideIndex}`
    setMutedVideos((prev) => ({
      ...prev,
      [videoKey]: !prev[videoKey],
    }))
  }

  const handleSectionClick = (targetId) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const InstagramCard = ({ item }) => {
    const currentIndex = getCardSlideIndex(item.id)
    const currentMedia = item.images[currentIndex]
    const videoKey = `${item.id}-${currentIndex}`
    const isVideoPlaying = playingVideos[videoKey]
    const isVideoMuted = mutedVideos[videoKey] || false

    return (
      <motion.div
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-sm mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header estilo Instagram */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-700 to-orange-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">Z</span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">zensorial_cafe</p>
            <p className="text-xs text-amber-600">Hace 2 horas</p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="relative">
          {currentMedia.type === "video" ? (
            <div className="relative">
              <video
                ref={(video) => {
                  if (video) {
                    video.muted = isVideoMuted
                    if (isVideoPlaying) {
                      video.play()
                    } else {
                      video.pause()
                    }
                  }
                }}
                src={currentMedia.src}
                className="w-full h-80 object-cover"
                loop
                playsInline
              />

              {/* Control de play/pause para videos */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  onClick={() => toggleVideo(item.id, currentIndex)}
                  className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </motion.button>
              </div>

              {/* Control de volumen */}
              <div className="absolute top-4 right-4">
                <motion.button
                  onClick={() => toggleMute(item.id, currentIndex)}
                  className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isVideoMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          ) : (
            <img src={currentMedia.src || "/placeholder.svg"} alt={item.title} className="w-full h-80 object-cover" />
          )}

          {/* Overlay para videos cuando no están reproduciendo */}
          {currentMedia.type === "video" && !isVideoPlaying && (
            <div className="absolute top-4 left-4">
              <div className="bg-black/50 rounded px-2 py-1">
                <span className="text-white text-xs font-medium">VIDEO</span>
              </div>
            </div>
          )}

          {/* Navegación del carrusel */}
          {item.images.length > 1 && (
            <>
              <button
                onClick={() => prevSlide(item.id, item.images.length)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => nextSlide(item.id, item.images.length)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Indicadores de slide */}
          {item.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
              {item.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Acciones estilo Instagram */}
        <div className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">{item.likes}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-gray-700 hover:text-amber-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{item.comments}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-700 hover:text-amber-700 transition-colors ml-auto"
            >
              <Share className="w-5 h-5" />
            </motion.button>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
            <p className="text-amber-700 text-sm">{item.description}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="content-section" className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Explora Zensorial</h2>
          <p className="text-amber-700 text-lg max-w-3xl mx-auto">
            Sumérgete en el mundo del café premium y descubre todo lo que tenemos para ofrecerte
          </p>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleSectionClick(section.targetId)}
              whileHover={{ y: -10 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-amber-700 to-orange-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <section.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-amber-900 mb-4 group-hover:text-amber-700 transition-colors">
                  {section.title}
                </h3>

                <p className="text-amber-700 mb-6 leading-relaxed">{section.description}</p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-amber-700 font-semibold group-hover:gap-4 transition-all duration-300">
                  <span>Explorar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram-style Cards Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-amber-900 mb-4">Momentos Zensorial</h3>
            <p className="text-amber-700 text-lg">Descubre nuestro día a día a través de imágenes y videos</p>
          </div>

          {/* Contenido de los carruseles */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {contentData["cafes"].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <InstagramCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-amber-700"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="text-sm font-medium">Continúa explorando</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContentSection
