
import "./index.css"
import { ThemeProvider } from "./Pages/ThemeProvider"
import Navbar from "./Pages/Navbar"



export const metadata = {
  title: "Zensorial Café - Experiencia Premium de Café",
  description:
    "Descubre la mejor experiencia de café con nuestros granos premium, métodos artesanales y ambiente único. Zensorial Café - Donde cada sorbo cuenta una historia.",
  keywords: "café, coffee, premium, artesanal, especialidad, Colombia, espresso, métodos de preparación",
  authors: [{ name: "Zensorial Café" }],
  creator: "Zensorial Café",
  publisher: "Zensorial Café",
  openGraph: {
    title: "Zensorial Café - Experiencia Premium de Café",
    description: "Descubre la mejor experiencia de café con nuestros granos premium y métodos artesanales.",
    url: "https://zensorial.com",
    siteName: "Zensorial Café",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zensorial Café",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zensorial Café - Experiencia Premium de Café",
    description: "Descubre la mejor experiencia de café con nuestros granos premium y métodos artesanales.",
    images: ["/og-image.jpg"],
    creator: "@zensorial_cafe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d97706" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
