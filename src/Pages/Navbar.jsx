"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Search, ArrowUp, Coffee } from "lucide-react"
import { useTheme } from "./theme-provider"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { id: "home", label: "Inicio", href: "#" },
    { id: "cafes", label: "Nuestros Cafés", href: "#coffee-details-section" },
    { id: "metodos", label: "Métodos", href: "#methods-details-section" },
    { id: "nosotros", label: "Nosotros", href: "#about-us-section" },
  ]

  // Detectar sección activa
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "coffee-details-section", "methods-details-section", "about-us-section"]
      const scrollPosition = window.scrollY + 100

      // Mostrar botón scroll to top
      setShowScrollTop(window.scrollY > 500)

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId === "home" ? "zensorial-header" : sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId === "zensorial-header" ? "home" : sectionId.replace("-section", ""))
            break
          }
        }
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
  }

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-amber-200/50 dark:border-gray-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavClick("#", "home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-amber-900 dark:text-amber-100">Zensorial</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`relative px-3 py-2 font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-400"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <motion.button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                className="py-4 border-t border-amber-200/50 dark:border-gray-700/50"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar cafés, métodos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-amber-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-gray-900 border-t border-amber-200/50 dark:border-gray-700/50"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-800"
                    }`}
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

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
