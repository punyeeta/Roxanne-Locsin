import { useEffect, useState } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"

type NavbarProps = {
  theme: "dark" | "light"
  onThemeToggle: () => void
  isAboutOpen: boolean
  setIsAboutOpen: (val: boolean) => void
}

function Navbar({ theme, onThemeToggle, isAboutOpen: _isAboutOpen, setIsAboutOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const isSubpage = window.location.hash.startsWith("#/projects")

    if (href === "#" || href === "#about") {
      setIsAboutOpen(href === "#about")
      if (isSubpage) {
        window.location.hash = "#/"
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      setIsAboutOpen(false)
      if (isSubpage) {
        window.location.hash = href
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? `bg-background/80 backdrop-blur-md border-b border-border/20 py-3 ${theme === "light" ? "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)]" : ""
          }`
          : "bg-transparent border-b border-transparent py-6"
          }`}
      >
        <div className="max-w-[85rem] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#")}
            className="font-heading text-2xl font-extrabold tracking-tight text-primary transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            R<span className="text-accent font-black">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="font-sans text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2.5 rounded-full border border-border hover:bg-muted/50 text-foreground transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="size-4 text-accent" />
              ) : (
                <Moon className="size-4 text-primary" />
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-muted text-foreground transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden transition-all duration-500 flex flex-col justify-center items-center ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none translate-y-4"
          }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="font-heading text-3xl font-bold text-foreground/90 hover:text-primary transition-all duration-300 transform"
              style={{
                transitionDelay: `${idx * 75}ms`,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

export { Navbar }