import { useEffect, useState, useRef } from "react"

import { Navbar } from "@/components/ui/Navbar"
import { Hero } from "@/components/pages/Hero"
import { Projects } from "@/components/pages/Projects"
import { ProjectsListPage } from "@/components/pages/ProjectsListPage"
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage"
import { Journey } from "@/components/pages/Journey"
import { Skills } from "@/components/pages/Skills"
import { Contact } from "@/components/pages/Contact"
import { Footer } from "@/components/ui/Footer"

type RouteState = {
  page: "home" | "projects-list" | "project-detail"
  projectId?: string
}

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "dark"
    }
    const storedTheme = window.localStorage.getItem("portfolio-theme")
    return storedTheme === "light" ? "light" : "dark"
  })

  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })
  const [isMouseActive, setIsMouseActive] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  
  // Custom Hash Routing State
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => {
    if (typeof window === "undefined") return { page: "home" }
    const hash = window.location.hash
    if (hash.startsWith("#/projects/")) {
      return { page: "project-detail", projectId: hash.replace("#/projects/", "") }
    }
    if (hash === "#/projects") {
      return { page: "projects-list" }
    }
    return { page: "home" }
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("portfolio-theme", theme)
  }, [theme])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY })
      if (!isMouseActive) setIsMouseActive(true)
    }

    const handleMouseLeave = () => {
      setIsMouseActive(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isMouseActive])

  // Scroll memory mapping
  const scrollPositions = useRef<Record<string, number>>({
    home: 0,
    "projects-list": 0,
    "project-detail": 0
  })

  // Listener for Hash Routing changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith("#/projects/")) {
        const pId = hash.replace("#/projects/", "")
        setCurrentRoute({ page: "project-detail", projectId: pId })
      } else if (hash === "#/projects") {
        setCurrentRoute({ page: "projects-list" })
      } else {
        setCurrentRoute({ page: "home" })
      }
    }
    
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Keep track of scroll positions for scroll-restoring pages
  useEffect(() => {
    const handleScrollSave = () => {
      const page = currentRoute.page
      if (page === "home" || page === "projects-list") {
        scrollPositions.current[page] = window.scrollY
      }
    }
    
    window.addEventListener("scroll", handleScrollSave, { passive: true })
    return () => window.removeEventListener("scroll", handleScrollSave)
  }, [currentRoute.page])

  // Restore scroll positions or jump to active section anchor
  useEffect(() => {
    const page = currentRoute.page
    const targetScroll = scrollPositions.current[page] || 0
    
    const timer = setTimeout(() => {
      const hash = window.location.hash
      if (page === "home" && hash && hash !== "#/" && hash !== "#") {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "instant" })
          return
        }
      }
      window.scrollTo({ top: targetScroll })
    }, 45)
    
    return () => clearTimeout(timer)
  }, [currentRoute])

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative">
      {/* Dynamic Cursor Glow Backdrop */}
      {isMouseActive && (
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mouseCoords.x}px ${mouseCoords.y}px, ${
              theme === "dark" ? "rgba(180, 35, 24, 0.05)" : "rgba(212, 160, 23, 0.04)"
            }, transparent 40%)`,
          }}
        />
      )}

      <Navbar
        theme={theme}
        onThemeToggle={handleThemeToggle}
        isAboutOpen={isAboutOpen}
        setIsAboutOpen={setIsAboutOpen}
      />
      
      <main className="pt-20">
        {currentRoute.page === "home" && (
          <>
            <Hero isAboutOpen={isAboutOpen} setIsAboutOpen={setIsAboutOpen} />
            <Projects />
            <Journey />
            <Skills />
            <Contact />
          </>
        )}
        
        {currentRoute.page === "projects-list" && (
          <ProjectsListPage />
        )}
        
        {currentRoute.page === "project-detail" && (
          <ProjectDetailPage projectId={currentRoute.projectId || ""} />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App