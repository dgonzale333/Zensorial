"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause, Heart, MessageCircle, Share, Volume2, VolumeX } from "lucide-react"
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
  const [activeTab, setActiveTab] = useState("cafes")
  const [cardSlides, setCardSlides] = useState({})
  const [playingVideos, setPlayingVideos] = useState({}) // Estado para controlar reproducción de videos
  const [mutedVideos, setMutedVideos] = useState({}) // Estado para controlar el volumen de videos

  // Datos de ejemplo para los carruseles
  const contentData = {
    cafes: [
      {
        id: 1,
        type: "image",
        images: [
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe13 },
          { type: "image", src: imgCafe14 },
          { type: "image", src: imgCafe6 }
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
          { type: "image", src: imgCafe3 }
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
          { type: "image", src: imgCafe9 },
          { type: "image", src: imgCafe10 },
          { type: "image", src: imgCafe11 },
          { type: "image", src: imgCafe12 }
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
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe4 },
          { type: "image", src: imgCafe5 }
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
          { type: "image", src: imgCafe4 },
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe3 }
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
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe4 },
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe2 }
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
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe4 },
          { type: "image", src: imgCafe }
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
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe4 }
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
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe4 }
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
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe4 },
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe3 }
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
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe },
          { type: "image", src: imgCafe4 },
          { type: "image", src: imgCafe2 }
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
          { type: "image", src: imgCafe4 },
          { type: "image", src: imgCafe2 },
          { type: "image", src: imgCafe3 },
          { type: "image", src: imgCafe }
        ],
        title: "Reconocimientos",
        description: "Premiados por nuestra excelencia",
        likes: 167,
        comments: 34,
      },
    ],
  }

  const tabs = [
    { id: "cafes", label: "Nuestros Cafés", icon: "☕" },
    { id: "metodos", label: "Métodos", icon: "⚡" },
    { id: "nosotros", label: "Nosotros", icon: "👥" },
  ]

  // Función para obtener el índice actual de una tarjeta específica
  const getCardSlideIndex = (cardId) => {
    return cardSlides[cardId] || 0
  }

  // Función para cambiar al siguiente slide de una tarjeta específica
  const nextSlide = (cardId, totalImages) => {
    setCardSlides(prev => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) + 1 >= totalImages ? 0 : (prev[cardId] || 0) + 1
    }))
  }

  // Función para cambiar al slide anterior de una tarjeta específica
  const prevSlide = (cardId, totalImages) => {
    setCardSlides(prev => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) === 0 ? totalImages - 1 : (prev[cardId] || 0) - 1
    }))
  }

  // Función para controlar la reproducción del video
  const toggleVideo = (cardId, slideIndex) => {
    const videoKey = `${cardId}-${slideIndex}`
    setPlayingVideos(prev => ({
      ...prev,
      [videoKey]: !prev[videoKey]
    }))
  }

  // Función para controlar el volumen del video
  const toggleMute = (cardId, slideIndex) => {
    const videoKey = `${cardId}-${slideIndex}`
    setMutedVideos(prev => ({
      ...prev,
      [videoKey]: !prev[videoKey]
    }))
  }

  const InstagramCard = ({ item }) => {
    const currentIndex = getCardSlideIndex(item.id)
    const currentMedia = item.images[currentIndex]
    const videoKey = `${item.id}-${currentIndex}`
    const isVideoPlaying = playingVideos[videoKey]
    const isVideoMuted = mutedVideos[videoKey] || false // Por defecto no está silenciado
    
    return (
      <motion.div
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-sm mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header estilo Instagram */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">Z</span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">zensorial_cafe</p>
            <p className="text-xs text-gray-500">Hace 2 horas</p>
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
            <img 
              src={currentMedia.src} 
              alt={item.title} 
              className="w-full h-80 object-cover" 
            />
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
              className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">{item.likes}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{item.comments}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-700 hover:text-green-500 transition-colors ml-auto"
            >
              <Share className="w-5 h-5" />
            </motion.button>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="content-section" className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 py-16">
      <div className="container mx-auto px-4">
        {/* Navbar elegante */}
        <motion.nav
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-amber-200/50">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === "cafes") {
                        document.getElementById("coffee-details-section")?.scrollIntoView({
                          behavior: "smooth",
                        })
                      } else if (tab.id === "metodos") {
                        document.getElementById("methods-details-section")?.scrollIntoView({
                          behavior: "smooth",
                        })
                      } else {
                        setActiveTab(tab.id)
                      }
                    }}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md"
                        : "text-amber-800 hover:bg-amber-100/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Contenido de los carruseles */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {contentData[activeTab].map((item, index) => (
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
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ContentSection;