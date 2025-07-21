"use client"

import { motion } from "framer-motion"
import { Phone, Instagram, Facebook, MessageCircle, MapPin, Mail, Clock, Users, Target, Eye, Heart } from "lucide-react"

const AboutUs = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Teléfono",
      value: "+57 300 123 4567",
      href: "tel:+573001234567",
      color: "text-green-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+57 300 123 4567",
      href: "https://wa.me/573001234567",
      color: "text-green-500",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@zensorial_cafe",
      href: "https://instagram.com/zensorial_cafe",
      color: "text-pink-600",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Zensorial Café",
      href: "https://facebook.com/zensorialcafe",
      color: "text-blue-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: "hola@zensorial.com",
      href: "mailto:hola@zensorial.com",
      color: "text-amber-600",
    },
  ]

  const timeline = [
    {
      year: "2018",
      title: "Los Inicios",
      description: "Todo comenzó con una pasión por el café de calidad y el sueño de crear experiencias únicas.",
    },
    {
      year: "2019",
      title: "Primer Local",
      description: "Abrimos nuestro primer local en el corazón de la ciudad, con un enfoque en café de especialidad.",
    },
    {
      year: "2020",
      title: "Expansión Digital",
      description: "Durante la pandemia, desarrollamos nuestra plataforma online y servicio de delivery.",
    },
    {
      year: "2021",
      title: "Reconocimientos",
      description: "Fuimos galardonados como 'Mejor Café de Especialidad' por la Asociación Nacional de Café.",
    },
    {
      year: "2022",
      title: "Nuevas Sucursales",
      description: "Expandimos nuestra presencia con dos nuevos locales en diferentes zonas de la ciudad.",
    },
    {
      year: "2023",
      title: "Zensorial Hoy",
      description: "Continuamos innovando y creciendo, siempre manteniendo nuestro compromiso con la calidad.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Pasión",
      description: "Cada taza refleja nuestro amor por el café y el compromiso con la excelencia.",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Creamos espacios donde las personas se conectan y comparten momentos especiales.",
    },
    {
      icon: Target,
      title: "Calidad",
      description: "Seleccionamos cuidadosamente cada grano para garantizar la mejor experiencia.",
    },
  ]

  return (
    <section id="about-us-section" className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Nosotros</h1>
          <p className="text-amber-700 text-lg max-w-3xl mx-auto">
            Conoce la historia detrás de Zensorial, nuestra misión, visión y cómo puedes conectarte con nosotros.
          </p>
        </motion.div>

        {/* Historia Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">Nuestra Historia</h2>

          <div className="relative">
            {/* Línea central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200/50">
                      <div className="text-2xl font-bold text-amber-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Punto central */}
                  <div className="relative z-10 w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-lg"></div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Misión y Visión */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Misión */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200/50"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">Nuestra Misión</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Crear experiencias sensoriales únicas a través del café de especialidad, conectando a las personas con los
              sabores auténticos y las historias detrás de cada grano. Nos comprometemos a ofrecer productos de la más
              alta calidad mientras apoyamos a los productores locales y promovemos prácticas sostenibles.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200/50"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">Nuestra Visión</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ser reconocidos como la referencia en café de especialidad, expandiendo nuestra presencia nacional e
              internacional. Aspiramos a ser un puente cultural que conecte diferentes comunidades a través del amor
              compartido por el café, manteniendo siempre nuestros valores de calidad, sostenibilidad y excelencia.
            </p>
          </motion.div>
        </div>

        {/* Valores */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-amber-900 text-center mb-12">Nuestros Valores</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200/50 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contacto y Ubicación */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-amber-900 mb-8">Contáctanos</h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-amber-200/50 hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-12 h-12 ${contact.color} bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-colors`}
                  >
                    <contact.icon className={`w-6 h-6 ${contact.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{contact.label}</p>
                    <p className={`${contact.color} font-semibold`}>{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Horarios */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200/50">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-amber-600" />
                <h4 className="text-xl font-semibold text-gray-800">Horarios de Atención</h4>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span className="font-medium">7:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="font-medium">8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-amber-900 mb-8">Nuestra Ubicación</h3>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200/50 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Zensorial Café - Sede Principal</h4>
                  <p className="text-gray-600">
                    Carrera 15 #85-32, Zona Rosa
                    <br />
                    Bogotá, Colombia
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200/50">
              <div className="w-full h-80 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2097469346!2d-74.05373842507!3d4.676856595306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a8b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sZona%20Rosa%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Zensorial Café"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <motion.a
                  href="https://maps.google.com/?q=Carrera+15+85-32+Zona+Rosa+Bogotá"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="w-4 h-4" />
                  Ver en Google Maps
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
