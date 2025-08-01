"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle } from "lucide-react"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "¿Qué hace especial al café de Zensorial?",
      answer:
        "Nuestro café es especial por varios factores: seleccionamos granos de origen único de las mejores fincas colombianas, utilizamos métodos de tostado artesanal que resaltan las características únicas de cada variedad, y garantizamos frescura máxima entregando el café dentro de los 7 días posteriores al tostado. Además, trabajamos directamente con productores locales para asegurar calidad y comercio justo.",
    },
    {
      question: "¿Cómo debo almacenar el café para mantener su frescura?",
      answer:
        "Para mantener la frescura óptima de tu café: guárdalo en un recipiente hermético opaco, lejos de la luz, calor y humedad. Evita el refrigerador o congelador ya que la humedad puede afectar los aceites naturales. Consume el café dentro de 2-4 semanas después de la fecha de tostado para disfrutar de su mejor sabor. Si compras café en grano, muélelo justo antes de prepararlo.",
    },
    {
      question: "¿Qué método de preparación recomiendan para principiantes?",
      answer:
        "Para principiantes recomendamos empezar con French Press o AeroPress. Ambos métodos son fáciles de dominar, perdonan pequeños errores en la técnica, y producen café consistente y delicioso. French Press es ideal para múltiples tazas y sabores con cuerpo, mientras que AeroPress es perfecto para una taza individual con sabor limpio y suave. Incluimos guías detalladas paso a paso con cada compra.",
    },
   
    {
      question: "¿Ofrecen café descafeinado?",
      answer:
        "Sí, ofrecemos café descafeinado procesado mediante el método de agua suiza (Swiss Water Process), que es 100% natural y no utiliza químicos. Este proceso mantiene intactos los sabores y aromas originales del café, eliminando solo la cafeína. Nuestro descafeinado mantiene el 99.9% del sabor original y es perfecto para disfrutar en cualquier momento del día.",
    },
   
    {
      question: "¿Qué significa 'café de origen único'?",
      answer:
        "Café de origen único significa que todos los granos provienen de una sola finca, región o incluso lote específico, en lugar de ser una mezcla de diferentes orígenes. Esto permite apreciar las características únicas del terroir: el clima, suelo, altitud y métodos de procesamiento específicos de esa ubicación. Cada origen único tiene un perfil de sabor distintivo que refleja su lugar de procedencia.",
    },
    {
      question: "¿Cómo puedo aprender más sobre métodos de preparación?",
      answer:
        "Ofrecemos múltiples recursos para aprender: guías detalladas en nuestro sitio web, videos tutoriales paso a paso, talleres presenciales en nuestras tiendas, y consultoría personalizada. También enviamos una guía de preparación con cada pedido y tenemos un equipo de expertos disponible por WhatsApp para resolver dudas específicas. Síguenos en redes sociales para tips diarios.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="py-16 bg-white ">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-amber-600 " />
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 ">Preguntas Frecuentes</h2>
          </div>
          <p className="text-amber-700  text-lg max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros cafés, métodos de preparación y servicios
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-50  rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100  transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900  pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-amber-600 " />
                  ) : (
                    <Plus className="w-5 h-5 text-amber-600 " />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="border-t border-gray-200 ">
                        <p className="text-gray-600  leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 text-center p-8 bg-gradient-to-r from-amber-50 to-orange-50  rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-amber-900  mb-4">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-amber-700  mb-6">
            Nuestro equipo de expertos está aquí para ayudarte con cualquier pregunta sobre café
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar por WhatsApp
            </motion.button>
            <motion.button
              className="px-6 py-3 border-2 border-amber-600 text-amber-600  font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar Email
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
