"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, MapPin, Mountain, Thermometer, Star, Coffee, Leaf, Award } from "lucide-react"
import useSWR from "swr"
import { COFFEE_PUBLIC_KEY, getPublicCoffees } from "../lib/coffee-api.js"
import { initialCoffeeProducts } from "../data/coffee-products.js"
import { formatCopPrice } from "../lib/store-cart.js"

function normalizeCoffee(coffee, index = 0) {
  return {
    ...coffee,
    id: coffee.id ?? `initial-${index + 1}`,
    image: coffee.imageUrl || coffee.image || "",
  }
}

const CoffeeDetails = () => {
  const [selectedCoffee, setSelectedCoffee] = useState(null)
  const [userRatings, setUserRatings] = useState({})

  const { data: coffeeRecords = initialCoffeeProducts.map(normalizeCoffee), error: coffeeError } = useSWR(
    COFFEE_PUBLIC_KEY,
    getPublicCoffees,
    { fallbackData: initialCoffeeProducts.map(normalizeCoffee) },
  )
  const coffeeData = coffeeRecords.map(normalizeCoffee)

  const StarRating = ({ coffeeId, currentRating, onRate }) => {
    const [hovered, setHovered] = useState(0)

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Tu calificación:</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              className={`w-6 h-6 transition-colors ${
                star <= (hovered || currentRating) ? "text-yellow-400" : "text-gray-300"
              }`}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onRate(coffeeId, star)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star className="w-full h-full fill-current" />
            </motion.button>
          ))}
        </div>
        {currentRating > 0 && (
          <span className="text-sm text-amber-600 font-medium">
            {currentRating === 1 && "Malo"}
            {currentRating === 2 && "Regular"}
            {currentRating === 3 && "Bueno"}
            {currentRating === 4 && "Muy bueno"}
            {currentRating === 5 && "Excelente"}
          </span>
        )}
      </div>
    )
  }

  const CuppingChart = ({ scores }) => (
    <div className="space-y-3">
      {Object.entries(scores).map(([category, score]) => (
        <div key={category} className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 capitalize w-16">{category}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(score / 10) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <span className="text-sm font-bold text-amber-600 w-8">{score}</span>
        </div>
      ))}
    </div>
  )

  const CoffeeCard = ({ coffee, index }) => (
    <motion.div
      className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      onClick={() => setSelectedCoffee(coffee)}
    >
      {/* Imagen del café */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={coffee.image || "/placeholder.svg"}
          alt={coffee.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-amber-600 font-bold">{formatCopPrice(coffee.price)}</span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{coffee.rating}</span>
        </div>
      </div>

      {/* Información básica */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800">{coffee.name}</h3>
          <div className="flex items-center gap-1 text-amber-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{coffee.origin}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{coffee.description}</p>

        {/* Especificaciones rápidas */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-600">{coffee.altitude}</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-600">{coffee.roastLevel}</span>
          </div>
        </div>

        {/* Notas de cata */}
        <div className="flex flex-wrap gap-1">
          {coffee.tastingNotes.slice(0, 3).map((note, index) => (
            <span key={index} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
              {note}
            </span>
          ))}
          {coffee.tastingNotes.length > 3 && (
            <span className="text-amber-600 text-xs px-2 py-1">+{coffee.tastingNotes.length - 3} más</span>
          )}
        </div>
      </div>
    </motion.div>
  )

  const handleRating = (coffeeId, rating) => {
    setUserRatings((prev) => ({
      ...prev,
      [coffeeId]: rating,
    }))
  }

  const DetailModal = ({ coffee, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{coffee.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Imagen y información básica */}
            <div>
              <img
                src={coffee.image || "/placeholder.svg"}
                alt={coffee.name}
                className="w-full h-80 object-cover rounded-xl mb-6"
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-amber-600">{formatCopPrice(coffee.price)}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{coffee.rating}/5</span>
                  </div>
                </div>

                <p className="text-gray-600">{coffee.description}</p>

                {/* Certificaciones */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Certificaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {coffee.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Calificación del usuario */}
                <div>
                  <StarRating coffeeId={coffee.id} currentRating={userRatings[coffee.id] || 0} onRate={handleRating} />
                </div>
              </div>
            </div>

            {/* Especificaciones detalladas */}
            <div className="space-y-6">
              {/* Información técnica */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Especificaciones</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span className="font-medium text-gray-700">Origen</span>
                    </div>
                    <span className="text-gray-600">{coffee.origin}</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Mountain className="w-4 h-4 text-amber-600" />
                      <span className="font-medium text-gray-700">Altitud</span>
                    </div>
                    <span className="text-gray-600">{coffee.altitude}</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-4 h-4 text-amber-600" />
                      <span className="font-medium text-gray-700">Variedad</span>
                    </div>
                    <span className="text-gray-600">{coffee.variety}</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-4 h-4 text-amber-600" />
                      <span className="font-medium text-gray-700">Tostado</span>
                    </div>
                    <span className="text-gray-600">{coffee.roastLevel}</span>
                  </div>
                </div>
              </div>

              {/* Perfil de cata */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Perfil de Cata</h4>
                <CuppingChart scores={coffee.cupping} />
              </div>

              {/* Notas de sabor */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Notas de Sabor</h4>
                <div className="flex flex-wrap gap-2">
                  {coffee.tastingNotes.map((note, index) => (
                    <span key={index} className="bg-amber-100 text-amber-800 px-3 py-2 rounded-full font-medium">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consejos de preparación */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Consejos de Preparación</h4>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {coffee.brewingTips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2 text-amber-800">
                        <Coffee className="w-4 h-4" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section id="coffee-details-section" className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Nuestros Cafés Premium</h1>
          <p className="text-amber-700 text-lg max-w-3xl mx-auto">
            Descubre nuestra selección cuidadosamente curada de cafés especiales. Cada grano cuenta una historia única
            de origen, proceso y sabor.
          </p>
          <Link to="/tienda" className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">
            Comprar cafés
          </Link>
        </motion.div>

        {/* Grid de cafés */}
        {coffeeError && (
          <p role="status" className="mx-auto mb-6 max-w-2xl rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-center text-sm text-amber-900">
            Mostramos el catálogo guardado mientras se restablece la conexión.
          </p>
        )}
        {coffeeData.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coffeeData.map((coffee, index) => (
              <CoffeeCard key={coffee.id} coffee={coffee} index={index} />
            ))}
          </div>
        ) : (
          <p className="mx-auto max-w-xl rounded-2xl border border-amber-200 bg-white/80 p-8 text-center text-stone-600">
            Estamos preparando nuevos cafés para ti.
          </p>
        )}

        {/* Modal de detalles */}
        <AnimatePresence>
          {selectedCoffee && <DetailModal coffee={selectedCoffee} onClose={() => setSelectedCoffee(null)} />}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default CoffeeDetails
