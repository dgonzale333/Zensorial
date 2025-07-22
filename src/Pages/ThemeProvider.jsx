"use client"

import { createContext, useContext } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Solo modo claro, sin funcionalidad de tema oscuro
  const theme = "light"
  const toggleTheme = () => {} // Función vacía

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
export default ThemeProvider