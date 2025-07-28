"use client"

import { motion } from "framer-motion"
import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Heart, ArrowUp } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    productos: [
      { name: "Cafés Premium", href: "#coffee-details-section" },
      { name: "Métodos de Preparación", href: "#methods-details-section" },
      { name: "Accesorios", href: "#" },
      { name: "Suscripciones", href: "#" },
    ],
    empresa: [
      { name: "Nosotros", href: "#about-us-section" },
      { name: "Historia", href: "#" },
      { name: "Misión y Visión", href: "#" },
      { name: "Sostenibilidad", href: "#" },
    ],
    soporte: [
      { name: "Preguntas Frecuentes", href: "#" },
      { name: "Guías de Preparación", href: "#" },
      { name: "Contacto", href: "#" },
      { name: "Envíos", href: "#" },
    ],
    legal: [
      { name: "Términos y Condiciones", href: "#" },
      { name: "Política de Privacidad", href: "#" },
      { name: "Política de Cookies", href: "#" },
      { name: "Devoluciones", href: "#" },
    ],
  }

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/zensorial", color: "hover:text-pink-500" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/zensorial", color: "hover:text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/zensorial", color: "hover:text-blue-400" },
  ]

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent" />
        {[...Array(20)].map((_, i) => (
          <Coffee
            key={i}
            className="absolute w-8 h-8 text-amber-600"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                    <Coffee className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-amber-100">Zensorial</span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Transformamos cada momento en una experiencia sensorial única a través del café premium colombiano de
                  la más alta calidad.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <span className="text-sm">Bogotá, Colombia</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-amber-500" />
                    <span className="text-sm">+57 300 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-amber-500" />
                    <span className="text-sm">hola@zensorial.co</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Productos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-amber-100 mb-4">Productos</h3>
                <ul className="space-y-3">
                  {footerLinks.productos.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Empresa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-amber-100 mb-4">Empresa</h3>
                <ul className="space-y-3">
                  {footerLinks.empresa.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Soporte */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-amber-100 mb-4">Soporte</h3>
                <ul className="space-y-3">
                  {footerLinks.soporte.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-amber-100 mb-4">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.div
                className="flex items-center gap-2 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span>© {currentYear} Zensorial. Hecho con</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>en Colombia</span>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-700 transition-colors ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
