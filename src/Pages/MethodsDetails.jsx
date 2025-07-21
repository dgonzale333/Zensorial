"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, Thermometer, Scale, Coffee, Star, CheckCircle } from "lucide-react"
import Prensa from "../assets/Img/prensa.jpg"
import V60 from "../assets/Img/v60.jpg"
import Expresso from "../assets/Img/expresso.jpg"
import Aero from "../assets/Img/aero.jpg"
import Cold from "../assets/Img/cold.jpg"
import Chemex from "../assets/Img/chemex.jpg"

const MethodsDetails = () => {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [activeStep, setActiveStep] = useState(0)

  // Datos detallados de los métodos
  const methodsData = [
    {
      id: 1,
      name: "Prensa Francesa",
      image: Prensa,
      difficulty: "Fácil",
      time: "4-6 minutos",
      temperature: "92-96°C",
      ratio: "1:15",
      grind: "Gruesa",
      rating: 4.6,
      description:
        "Método de inmersión completa que produce un café con cuerpo y sabores intensos. Perfecto para principiantes.",
      equipment: ["French Press", "Balanza", "Cronómetro", "Cuchara de madera"],
      steps: [
        {
          title: "Calentar el agua",
          description: "Calienta el agua a 92-96°C. Si no tienes termómetro, deja que hierva y espera 30 segundos.",
          time: "2-3 min",
          tip: "El agua muy caliente puede quemar el café y crear sabores amargos.",
        },
        {
          title: "Moler el café",
          description: "Muele 30g de café con molienda gruesa, similar a migas de pan gruesas.",
          time: "30 seg",
          tip: "La molienda gruesa evita la sobre-extracción y reduce los sedimentos.",
        },
        {
          title: "Precalentar la prensa",
          description: "Enjuaga la French Press con agua caliente para precalentarla, luego vacía.",
          time: "30 seg",
          tip: "Esto ayuda a mantener la temperatura durante la extracción.",
        },
        {
          title: "Agregar café y agua",
          description: "Añade el café molido y vierte 450ml de agua caliente. Revuelve suavemente.",
          time: "30 seg",
          tip: "Revuelve solo para asegurar que todo el café se moje uniformemente.",
        },
        {
          title: "Tiempo de extracción",
          description: "Coloca la tapa con el émbolo arriba y deja reposar por 4 minutos.",
          time: "4 min",
          tip: "No presiones el émbolo todavía, solo déjalo reposar en la superficie.",
        },
        {
          title: "Presionar y servir",
          description: "Presiona el émbolo lentamente hacia abajo y sirve inmediatamente.",
          time: "30 seg",
          tip: "Presiona despacio para evitar que los sedimentos pasen al café.",
        },
      ],
      pros: ["Fácil de usar", "Café con mucho cuerpo", "No requiere filtros", "Económico"],
      cons: ["Puede tener sedimentos", "Difícil de controlar extracción", "Se enfría rápido"],
      bestFor: ["Principiantes", "Café con cuerpo", "Múltiples tazas", "Oficina"],
    },
    {
      id: 2,
      name: "Pour Over V60",
      image: V60,
      difficulty: "Intermedio",
      time: "3-4 minutos",
      temperature: "90-94°C",
      ratio: "1:16",
      grind: "Media-fina",
      rating: 4.8,
      description: "Método de goteo que permite control total sobre la extracción. Produce cafés limpios y brillantes.",
      equipment: ["V60", "Filtros V60", "Balanza", "Cronómetro", "Kettle de cuello de cisne"],
      steps: [
        {
          title: "Preparar el filtro",
          description: "Coloca el filtro en el V60 y enjuágalo con agua caliente para eliminar sabores a papel.",
          time: "30 seg",
          tip: "No olvides vaciar el agua del enjuague antes de agregar el café.",
        },
        {
          title: "Moler y pesar",
          description: "Muele 22g de café con molienda media-fina, similar a sal de mesa.",
          time: "1 min",
          tip: "La consistencia de la molienda es clave para una extracción uniforme.",
        },
        {
          title: "Crear un hoyo",
          description: "Agrega el café al filtro y haz un pequeño hoyo en el centro con el dedo.",
          time: "15 seg",
          tip: "Esto ayuda a que el agua se distribuya uniformemente durante el bloom.",
        },
        {
          title: "Bloom (floración)",
          description: "Vierte 44ml de agua (2x el peso del café) en círculos desde el centro hacia afuera.",
          time: "30 seg",
          tip: "El café debe 'florecer' y expandirse. Espera 30 segundos.",
        },
        {
          title: "Primera vertida",
          description: "Vierte agua hasta llegar a 150ml total, manteniendo movimientos circulares.",
          time: "45 seg",
          tip: "Mantén un flujo constante y evita tocar las paredes del filtro.",
        },
        {
          title: "Vertidas finales",
          description: "Continúa vertiendo en intervalos hasta llegar a 350ml total. Termina a los 3:30.",
          time: "2 min",
          tip: "El goteo debe terminar entre 3:30 y 4:00 minutos.",
        },
      ],
      pros: ["Control total", "Sabores limpios", "Resalta acidez", "Versátil"],
      cons: ["Requiere práctica", "Técnica sensible", "Una taza a la vez", "Equipamiento específico"],
      bestFor: ["Cafés de origen", "Sabores complejos", "Entusiastas", "Precisión"],
    },
    {
      id: 3,
      name: "Espresso",
      image: Expresso,
      difficulty: "Avanzado",
      time: "25-30 segundos",
      temperature: "88-92°C",
      ratio: "1:2",
      grind: "Fina",
      rating: 4.9,
      description: "El método más intenso y concentrado. Base de todas las bebidas con leche.",
      equipment: ["Máquina de espresso", "Molinillo", "Tamper", "Balanza", "Taza precalentada"],
      steps: [
        {
          title: "Calentar la máquina",
          description: "Enciende la máquina y espera a que alcance la temperatura operativa (15-20 min).",
          time: "15-20 min",
          tip: "Una máquina bien calentada es esencial para un buen espresso.",
        },
        {
          title: "Moler el café",
          description: "Muele 18-20g de café con molienda fina, similar a azúcar en polvo.",
          time: "30 seg",
          tip: "La molienda debe ser muy fina pero no polvo. Ajusta según el tiempo de extracción.",
        },
        {
          title: "Dosificar y nivelar",
          description: "Coloca el café en el portafiltro y nivela con el dedo sin compactar.",
          time: "15 seg",
          tip: "Una distribución uniforme es clave antes del tamping.",
        },
        {
          title: "Tamping",
          description: "Compacta el café con 15kg de presión, mantén el tamper nivelado.",
          time: "15 seg",
          tip: "Un tamping uniforme evita canalizaciones en la extracción.",
        },
        {
          title: "Purgar y extraer",
          description: "Purga el grupo, coloca el portafiltro y extrae inmediatamente.",
          time: "25-30 seg",
          tip: "Busca un flujo como 'cola de ratón' que se espese gradualmente.",
        },
        {
          title: "Evaluar y servir",
          description: "Debes obtener 36-40ml en 25-30 segundos. Sirve inmediatamente.",
          time: "Inmediato",
          tip: "Un buen espresso tiene crema dorada y sabor equilibrado.",
        },
      ],
      pros: ["Sabor intenso", "Base para otras bebidas", "Rápido", "Crema característica"],
      cons: ["Equipamiento costoso", "Curva de aprendizaje alta", "Requiere práctica", "Mantenimiento"],
      bestFor: ["Amantes del café fuerte", "Bebidas con leche", "Profesionales", "Experiencia completa"],
    },
    {
      id: 4,
      name: "AeroPress",
      image: Aero,
      difficulty: "Fácil",
      time: "2-3 minutos",
      temperature: "85-92°C",
      ratio: "1:14",
      grind: "Media-fina",
      rating: 4.7,
      description: "Método versátil que combina inmersión y presión. Produce café limpio y suave.",
      equipment: ["AeroPress", "Filtros AeroPress", "Balanza", "Cronómetro", "Cuchara"],
      steps: [
        {
          title: "Preparar el AeroPress",
          description: "Coloca el filtro en la tapa y enjuaga. Ensambla el AeroPress en posición normal.",
          time: "30 seg",
          tip: "Asegúrate de que el émbolo esté completamente arriba antes de agregar café.",
        },
        {
          title: "Agregar café",
          description: "Añade 17g de café molido medio-fino al AeroPress.",
          time: "15 seg",
          tip: "Nivela el café suavemente para una extracción uniforme.",
        },
        {
          title: "Agregar agua y revolver",
          description: "Vierte 240ml de agua a 85-92°C y revuelve vigorosamente por 10 segundos.",
          time: "30 seg",
          tip: "El AeroPress permite agua más fría que otros métodos.",
        },
        {
          title: "Tiempo de contacto",
          description: "Deja reposar por 1 minuto sin presionar.",
          time: "1 min",
          tip: "Este tiempo permite una extracción completa antes de presionar.",
        },
        {
          title: "Presionar",
          description: "Presiona lenta y constantemente durante 30 segundos hasta escuchar el silbido.",
          time: "30 seg",
          tip: "La presión debe ser constante y suave para evitar amargor.",
        },
        {
          title: "Diluir si es necesario",
          description: "Prueba el café y añade agua caliente si prefieres menos concentración.",
          time: "15 seg",
          tip: "El AeroPress produce un concentrado que puedes ajustar a tu gusto.",
        },
      ],
      pros: ["Muy versátil", "Fácil limpieza", "Portátil", "Consistente"],
      cons: ["Una taza por vez", "Filtros específicos", "Puede ser débil", "Plástico"],
      bestFor: ["Viajes", "Oficina", "Experimentación", "Principiantes avanzados"],
    },
    {
      id: 5,
      name: "Cold Brew",
      image: Cold,
      difficulty: "Muy Fácil",
      time: "12-24 horas",
      temperature: "Ambiente",
      ratio: "1:8",
      grind: "Muy gruesa",
      rating: 4.5,
      description: "Extracción en frío que produce un café suave, dulce y menos ácido. Perfecto para el verano.",
      equipment: ["Recipiente grande", "Filtro o colador", "Balanza", "Refrigerador"],
      steps: [
        {
          title: "Moler el café",
          description: "Muele 100g de café con molienda muy gruesa, como migas de pan grandes.",
          time: "1 min",
          tip: "La molienda gruesa evita la sobre-extracción durante el largo tiempo de contacto.",
        },
        {
          title: "Mezclar café y agua",
          description: "Combina el café molido con 800ml de agua fría en un recipiente grande.",
          time: "2 min",
          tip: "Asegúrate de que todo el café esté bien mojado y mezclado.",
        },
        {
          title: "Tiempo de extracción",
          description: "Cubre y refrigera por 12-24 horas. Más tiempo = más fuerte.",
          time: "12-24 horas",
          tip: "Prueba diferentes tiempos para encontrar tu concentración ideal.",
        },
        {
          title: "Filtrar",
          description: "Filtra el café usando un colador fino o filtro de papel para eliminar los sólidos.",
          time: "5 min",
          tip: "Filtra dos veces si quieres un café más limpio.",
        },
        {
          title: "Servir",
          description: "Sirve sobre hielo o diluye con agua/leche según tu preferencia.",
          time: "1 min",
          tip: "El cold brew concentrado se puede guardar en refrigerador por una semana.",
        },
      ],
      pros: ["Muy suave", "Menos ácido", "Se conserva bien", "Refrescante"],
      cons: ["Tiempo muy largo", "Usa mucho café", "Menos complejo", "Requiere planificación"],
      bestFor: ["Verano", "Estómagos sensibles", "Preparación masiva", "Bebidas heladas"],
    },
    {
      id: 6,
      name: "Chemex",
      image: Chemex,
      difficulty: "Intermedio",
      time: "4-6 minutos",
      temperature: "90-96°C",
      ratio: "1:15",
      grind: "Media-gruesa",
      rating: 4.6,
      description: "Método de goteo con filtros gruesos que produce café muy limpio y brillante.",
      equipment: ["Chemex", "Filtros Chemex", "Balanza", "Cronómetro", "Kettle cuello de cisne"],
      steps: [
        {
          title: "Preparar filtro",
          description: "Dobla el filtro Chemex y colócalo con el lado de 3 capas hacia el pico.",
          time: "30 seg",
          tip: "Enjuaga el filtro con agua caliente para eliminar sabor a papel.",
        },
        {
          title: "Moler café",
          description: "Muele 42g de café con molienda media-gruesa, más gruesa que para V60.",
          time: "1 min",
          tip: "Los filtros Chemex son más gruesos, necesitan molienda más gruesa.",
        },
        {
          title: "Bloom inicial",
          description: "Vierte 84ml de agua (2x peso del café) y espera 45 segundos.",
          time: "45 seg",
          tip: "El bloom debe ser generoso debido a la molienda más gruesa.",
        },
        {
          title: "Primera vertida",
          description: "Vierte hasta 300ml en movimientos circulares lentos desde el centro.",
          time: "1 min",
          tip: "Mantén el nivel de agua constante, no dejes que se seque completamente.",
        },
        {
          title: "Vertida final",
          description: "Continúa vertiendo hasta llegar a 630ml total, terminando a los 5-6 minutos.",
          time: "3-4 min",
          tip: "El tiempo total debe ser 5-6 minutos para extracción óptima.",
        },
        {
          title: "Servir",
          description: "Retira el filtro y sirve inmediatamente en tazas precalentadas.",
          time: "30 seg",
          tip: "El Chemex mantiene bien la temperatura, perfecto para compartir.",
        },
      ],
      pros: ["Muy limpio", "Elegante", "Múltiples tazas", "Sabor brillante"],
      cons: ["Filtros caros", "Frágil", "Técnica específica", "Tiempo largo"],
      bestFor: ["Cafés delicados", "Múltiples personas", "Presentación", "Sabores limpios"],
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Muy Fácil":
        return "bg-green-100 text-green-800"
      case "Fácil":
        return "bg-blue-100 text-blue-800"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800"
      case "Avanzado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const MethodCard = ({ method, index }) => (
    <motion.div
      className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      onClick={() => setSelectedMethod(method)}
    >
      {/* Imagen */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={method.image || "/placeholder.svg"}
          alt={method.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(method.difficulty)}`}>
            {method.difficulty}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{method.rating}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{method.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{method.description}</p>

        {/* Especificaciones rápidas */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-600">{method.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-600">{method.temperature}</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-600">{method.ratio}</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-600">{method.grind}</span>
          </div>
        </div>

        {/* Mejor para */}
        <div className="flex flex-wrap gap-1">
          {method.bestFor.slice(0, 2).map((use, index) => (
            <span key={index} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
              {use}
            </span>
          ))}
          {method.bestFor.length > 2 && (
            <span className="text-amber-600 text-xs px-2 py-1">+{method.bestFor.length - 2} más</span>
          )}
        </div>
      </div>
    </motion.div>
  )

  const DetailModal = ({ method, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">{method.name}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(method.difficulty)}`}>
              {method.difficulty}
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Información general */}
            <div className="lg:col-span-1">
              <img
                src={method.image || "/placeholder.svg"}
                alt={method.name}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <div className="space-y-6">
                {/* Especificaciones */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Especificaciones</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="font-medium">Tiempo</span>
                      </div>
                      <span className="text-gray-600">{method.time}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-amber-600" />
                        <span className="font-medium">Temperatura</span>
                      </div>
                      <span className="text-gray-600">{method.temperature}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-amber-600" />
                        <span className="font-medium">Proporción</span>
                      </div>
                      <span className="text-gray-600">{method.ratio}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-amber-600" />
                        <span className="font-medium">Molienda</span>
                      </div>
                      <span className="text-gray-600">{method.grind}</span>
                    </div>
                  </div>
                </div>

                {/* Equipamiento */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Equipamiento Necesario</h4>
                  <ul className="space-y-2">
                    {method.equipment.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros y Contras */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-medium text-green-700 mb-2">Ventajas</h5>
                    <ul className="space-y-1">
                      {method.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-green-600 flex items-center gap-1">
                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Desventajas</h5>
                    <ul className="space-y-1">
                      {method.cons.map((con, index) => (
                        <li key={index} className="text-sm text-red-600 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Instrucciones paso a paso */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-gray-800 mb-6">Instrucciones Paso a Paso</h4>

              <div className="space-y-4">
                {method.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-800">{step.title}</h5>
                          <span className="text-sm text-amber-600 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.time}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                          <p className="text-amber-800 text-sm">
                            <strong>Tip:</strong> {step.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mejor para */}
              <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                <h5 className="font-semibold text-gray-800 mb-3">Este método es perfecto para:</h5>
                <div className="flex flex-wrap gap-2">
                  {method.bestFor.map((use, index) => (
                    <span
                      key={index}
                      className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section id="methods-details-section" className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Métodos de Preparación</h1>
          <p className="text-amber-700 text-lg max-w-3xl mx-auto">
            Domina el arte de preparar café con nuestras guías detalladas. Cada método tiene su personalidad y produce
            sabores únicos.
          </p>
        </motion.div>

        {/* Grid de métodos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methodsData.map((method, index) => (
            <MethodCard key={method.id} method={method} index={index} />
          ))}
        </div>

        {/* Modal de detalles */}
        <AnimatePresence>
          {selectedMethod && <DetailModal method={selectedMethod} onClose={() => setSelectedMethod(null)} />}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MethodsDetails
