
import ThemeProvider from "./Pages/ThemeProvider.jsx"
import Navbar from "./Pages/Navbar.jsx"

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <Navbar />
      {children}
    </ThemeProvider>
  )
}
