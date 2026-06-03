import { useEffect, useState } from "react"

import { Hero } from "@/components/pages/Hero"
import { Navbar } from "@/components/ui/Navbar"

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark"
    }

    const storedTheme = window.localStorage.getItem("portfolio-theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : systemPrefersDark
        ? "dark"
        : "light"
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("portfolio-theme", theme)
  }, [theme])

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  }

  return (
    <div className="min-h-svh overflow-hidden bg-background text-foreground transition-colors duration-500">
      <Navbar theme={theme} onThemeToggle={handleThemeToggle} />
      <main className="pt-24 sm:pt-28">
        <Hero />
      </main>
    </div>
  )
}

export default App