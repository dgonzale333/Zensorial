"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ArrowUp, Coffee, ChevronDown } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSubmenu, setShowSubmenu] = useState(null)

  const navItems = [
    { id: "home", label: "Inicio", href: "#" },
    {
      id: "origen",
      label: "Nuestro Origen",
      href: "#coffee-origin-section",
      submenu: [
        { label: "Historias de Caficultores", href: "#coffee-origin-section" },
        { label: "Regiones Cafeteras", href: "#coffee-origin-section" },
        { label: "Proceso Artesanal", href: "#coffee-origin-section" },
      ],
    },
    { id: "cafes", label: "Productos", href: "#coffee-details-section" },
    { id: "nosotros", label: "Nosotros", href: "#about-us-section" },
    { id: "contacto", label: "Contacto", href: "#about-us-section" },
  ]

  // Enhanced scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
      setShowScrollTop(scrollPosition > 500)

      // Section detection
      const sections = ["home", "coffee-origin-section", "coffee-details-section", "about-us-section"]
      const currentSection = sections.find((sectionId) => {
        const element = document.getElementById(sectionId === "home" ? "zensorial-header" : sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          return scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection === "zensorial-header" ? "home" : currentSection.replace("-section", ""))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNavClick = (href, id) => {
    if (href === "#") {
      scrollToTop()
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
    setShowSubmenu(null)
  }

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  }

  const submenuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  }

  return (
    <>
      {/* Enhanced Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-xl border-b border-amber-200/50 shadow-lg" : "bg-transparent"
        }`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick("#", "home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative w-10 h-10 bg-gradient-to-r from-amber-700 to-orange-700 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Coffee className="w-6 h-6 text-white" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-20"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
                  Zensorial
                </span>
                <div className="text-xs text-amber-700 font-medium">Café Premium</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <motion.button
                    onClick={() => handleNavClick(item.href, item.id)}
                    onMouseEnter={() => item.submenu && setShowSubmenu(item.id)}
                    onMouseLeave={() => setShowSubmenu(null)}
                    className={`relative flex items-center gap-1 px-4 py-2 font-medium transition-all duration-300 ${
                      activeSection === item.id ? "text-amber-800" : "text-amber-700 hover:text-amber-800"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          showSubmenu === item.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-700 to-orange-700"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.submenu && showSubmenu === item.id && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-amber-200 overflow-hidden"
                        variants={submenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onMouseEnter={() => setShowSubmenu(item.id)}
                        onMouseLeave={() => setShowSubmenu(null)}
                      >
                        {item.submenu.map((subItem, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleNavClick(subItem.href, item.id)}
                            className="w-full text-left px-4 py-3 text-amber-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            {subItem.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Enhanced Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <motion.button
                onClick={() => setShowSearch(!showSearch)}
                className="p-3 text-amber-700 hover:text-amber-800 hover:bg-amber-100 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 text-amber-700 hover:bg-amber-100 rounded-xl transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                className="py-4 border-t border-amber-200/50"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    type="text"
                    placeholder="Buscar cafés, historias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-900 shadow-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-amber-200/50"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`block w-full text-left px-4 py-4 rounded-xl font-medium transition-all ${
                      activeSection === item.id ? "bg-amber-100 text-amber-800" : "text-amber-700 hover:bg-amber-50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-r from-amber-700 to-orange-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm border border-amber-600/30"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ArrowUp className="w-6 h-6 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
