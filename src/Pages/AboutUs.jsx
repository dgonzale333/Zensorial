"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Clock,
  Award,
  Users,
  Heart,
  Leaf,
  Target,
  Eye,
  Coffee,
} from "lucide-react"

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("historia")

  const tabs = [
    { id: "historia", label: "Historia", icon: Coffee },
    { id: "mision", label: "Misión", icon: Target },
    { id: "vision", label: "Visión", icon: Eye },
    { id: "valores", label: "Valores", icon: Heart },
  ]

  const tabContent = {
    historia: {
      title: "Nuestra Historia",
      content: [
        "Zensorial nació en 2018 de la pasión de tres amigos colombianos por el café de especialidad. Todo comenzó en una pequeña finca familiar en Huila, donde descubrimos que cada grano de café cuenta una historia única.",
        "Inspirados por la riqueza de los sabores y aromas que la tierra colombiana puede ofrecer, decidimos crear una experiencia que fuera más allá de una simple taza de café. Queríamos que cada sorbo fuera un viaje sensorial que conectara a las personas con el origen, la tradición y la pasión que hay detrás de cada grano.",
        "Desde entonces, hemos trabajado incansablemente para establecer relaciones directas con productores locales, garantizando no solo la más alta calidad, sino también un comercio justo que beneficie a toda la cadena de valor del café colombiano.",
      ],
    },
    mision: {
      title: "Nuestra Misión",
      content: [
        "Transformar cada momento de consumo de café en una experiencia sensorial única y memorable, conectando a nuestros clientes con la riqueza cultural y natural de Colombia a través de granos de café premium de origen único.",
        "Nos comprometemos a mantener los más altos estándares de calidad en cada etapa del proceso, desde la selección cuidadosa de los granos hasta el tostado artesanal, garantizando que cada taza refleje la pasión y dedicación que ponemos en nuestro trabajo.",
        "Buscamos educar y acompañar a nuestros clientes en su viaje de descubrimiento del café, proporcionando no solo productos excepcionales, sino también el conocimiento y las herramientas necesarias para disfrutar al máximo de esta experiencia.",
      ],
    },
    vision: {
      title: "Nuestra Visión",
      content: [
        "Ser reconocidos como la marca líder en café de especialidad en Colombia y expandir nuestra presencia a nivel internacional, llevando la excelencia del café colombiano a todos los rincones del mundo.",
        "Convertirnos en el puente que conecte a los amantes del café con los productores locales, creando un ecosistema sostenible que beneficie a todas las partes involucradas y preserve las tradiciones cafeteras de nuestro país.",
        "Innovar constantemente en métodos de preparación, experiencias sensoriales y tecnología, manteniendo siempre nuestro compromiso con la calidad, la sostenibilidad y el respeto por el medio ambiente.",
      ],
    },
    valores: {
      title: "Nuestros Valores",
      content: [
        "Calidad: Nunca comprometemos la excelencia. Cada grano es seleccionado cuidadosamente y cada proceso es ejecutado con la máxima precisión para garantizar una experiencia excepcional.",
        "Sostenibilidad: Creemos en un futuro donde el café se produzca de manera responsable, respetando el medio ambiente y apoyando a las comunidades productoras a través de prácticas de comercio justo.",
        "Pasión: El amor por el café es lo que nos mueve cada día. Esta pasión se refleja en cada detalle, desde la selección de los granos hasta el servicio al cliente.",
        "Innovación: Buscamos constantemente nuevas formas de mejorar y sorprender, manteniéndonos a la vanguardia de las tendencias y tecnologías del mundo del café.",
        "Comunidad: Valoramos las relaciones humanas y trabajamos para crear una comunidad de amantes del café que compartan nuestros valores y pasión por esta bebida extraordinaria.",
      ],
    },
  }

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
      color: "text-green-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: "hola@zensorial.co",
      href: "mailto:hola@zensorial.co",
      color: "text-blue-600",
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
      href: "https://facebook.com/zensorial",
      color: "text-blue-700",
    },
  ]

  const stats = [
    { icon: Award, value: "5+", label: "Años de Experiencia" },
    { icon: Users, value: "5,000+", label: "Clientes Satisfechos" },
    { icon: Coffee, value: "50+", label: "Variedades de Café" },
    { icon: Leaf, value: "100%", label: "Comercio Justo" },
  ]

  const schedule = [
    { day: "Lunes - Viernes", hours: "7:00 AM - 8:00 PM" },
    { day: "Sábados", hours: "8:00 AM - 9:00 PM" },
    { day: "Domingos", hours: "9:00 AM - 6:00 PM" },
  ]

  return (
    <section id="about-us-section" className="py-16 bg-gradient-to-br from-amber-50 to-stone-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Conoce Zensorial</h1>
          <p className="text-amber-700 text-lg max-w-3xl mx-auto">
            Descubre la historia, misión y valores que nos impulsan a crear la mejor experiencia de café premium en
            Colombia
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
              <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-amber-900 mb-1">{stat.value}</div>
              <div className="text-amber-700 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-amber-600 text-white shadow-lg"
                      : "bg-white text-amber-600 hover:bg-amber-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="bg-white rounded-2xl p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-amber-900 mb-6">{tabContent[activeTab].title}</h2>
                <div className="space-y-4">
                  {tabContent[activeTab].content.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Contáctanos</h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-amber-50 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${contact.color}`}
                    >
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{contact.label}</div>
                      <div className="text-gray-600 text-sm">{contact.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-amber-600" />
                <h3 className="text-2xl font-bold text-amber-900">Horarios de Atención</h3>
              </div>
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-medium text-gray-900">{item.day}</span>
                    <span className="text-amber-600 font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-amber-600" />
                <h3 className="text-2xl font-bold text-amber-900">Nuestra Ubicación</h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  <strong>Dirección:</strong> Carrera 15 #93-47, Chapinero, Bogotá, Colombia
                </p>
                <p className="text-gray-600">
                  Visítanos en nuestro café principal para vivir la experiencia Zensorial completa
                </p>
              </div>

              <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!..."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>

              <div className="mt-4 text-center">
                <motion.a
                  href="https://maps.google.com/?q=Chapinero,Bogotá,Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="w-4 h-4" />
                  Ver en Google Maps
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
