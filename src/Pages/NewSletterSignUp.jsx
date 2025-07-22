"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Check, X, Coffee, Send } from "lucide-react"

const NewsletterSignup = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle, loading, success, error
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    // Simular API call
    setTimeout(() => {
      if (email.includes("@")) {
        setStatus("success")
        setMessage("¡Gracias! Te has suscrito exitosamente.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage("Por favor ingresa un email válido.")
      }

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 3000)
    }, 1500)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 ">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Coffee className="w-8 h-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Mantente Conectado</h2>
            <Coffee className="w-8 h-8 text-white" />
          </div>

          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe las últimas novedades sobre cafés especiales, métodos de
            preparación, ofertas exclusivas y eventos.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900 dark:text-gray-100 placeholder-gray-500"
                  disabled={status === "loading"}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading" || !email}
                className="px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: status === "loading" ? 1 : 1.05 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.95 }}
              >
                {status === "loading" ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar
                  </>
                )}
              </motion.button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {message && (
                <motion.div
                  className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                    status === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {status === "success" ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm font-medium">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-amber-100">
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span className="text-sm">Ofertas exclusivas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span className="text-sm">Nuevos productos</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span className="text-sm">Tips de preparación</span>
            </div>
          </div>

          <p className="text-amber-200 text-xs mt-4">No spam. Puedes cancelar tu suscripción en cualquier momento.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSignup
