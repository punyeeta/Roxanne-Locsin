import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import projectsData from "@/data/projects.json"

type ProjectData = {
  id: string
  name: string
  year: string
  category: string
  shortDescription: string
  role: string
  outcome: string
  techStack: string[]
  github: string
  liveSite: string
  team: string
}

function splitProjectName(name: string) {
  const segments = name.split(/\s*(?:—|–|\s-\s)\s*/)
  if (segments.length >= 2) {
    return {
      title: segments[0].trim(),
      subtitle: segments.slice(1).join(" — ").trim()
    }
  }

  const parenIndex = name.indexOf(" (")
  if (parenIndex !== -1) {
    const title = name.substring(0, parenIndex).trim()
    let subtitle = name.substring(parenIndex + 1).trim()
    if (subtitle.startsWith("(") && subtitle.endsWith(")")) {
      const cleaned = subtitle
        .replace(/^\(/, "")
        .replace(/\)$/, "")
        .split(/\)\s*\(/)
        .join(" — ")
      return { title, subtitle: cleaned }
    } else if (subtitle.startsWith("(")) {
      subtitle = subtitle.substring(1)
    }
    if (subtitle.endsWith(")")) {
      subtitle = subtitle.slice(0, -1)
    }
    return { title, subtitle }
  }

  return { title: name, subtitle: "" }
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState<"Academic" | "Professional" | "Personal" | null>(null)

  // Filter logic:
  // If no filter selected, display the 3 featured projects:
  // - EHCo (Academic) -> id starts with academic-ehco
  // - USAD (Professional) -> id starts with professional-usad
  // - [WORKING] (Personal) -> id starts with personal-working
  let displayedProjects: ProjectData[] = []

  if (activeFilter === null) {
    const ehco = projectsData.find(p => p.id.includes("ehco"))
    const usad = projectsData.find(p => p.id.includes("usad"))
    const working = projectsData.find(p => p.id.includes("working"))

    const featured = []
    if (ehco) featured.push(ehco)
    if (usad) featured.push(usad)
    if (working) featured.push(working)

    displayedProjects = featured as ProjectData[]
  } else {
    // Filter by selected category
    const filtered = projectsData
      .filter(p => p.category === activeFilter)
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))

    // For Academic
    if (activeFilter === "Academic") {
      const order = ["ehco", "hi-lite-studio", "hapagtech"]
      order.forEach(keyword => {
        const found = filtered.find(p => p.id.includes(keyword))
        if (found) displayedProjects.push(found as ProjectData)
      })
      // Fallback in case match ordering is short
      filtered.forEach(p => {
        if (!displayedProjects.includes(p as ProjectData) && displayedProjects.length < 3) {
          displayedProjects.push(p as ProjectData)
        }
      })
    } else {
      displayedProjects = filtered.slice(0, 3) as ProjectData[]
    }
  }

  const handleFilterClick = (filter: "Academic" | "Professional" | "Personal" | null) => {
    setActiveFilter(filter)
  }

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.hash = "#/projects"
  }

  return (
    <section id="projects" className="py-14 px-6 md:px-12 lg:px-24 bg-background scroll-mt-20">
      <div className="max-w-[85rem] mx-auto space-y-8">
        {/* Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-accent">Portfolio Showcase</span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Projects
            </h2>
          </div>

          {/* Filter Controls Cluster */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleFilterClick(null)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer ${activeFilter === null
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border hover:border-primary/50 text-foreground"
                }`}
            >
              Featured
            </button>
            <button
              onClick={() => handleFilterClick("Academic")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer ${activeFilter === "Academic"
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border hover:border-primary/50 text-foreground"
                }`}
            >
              Academic
            </button>
            <button
              onClick={() => handleFilterClick("Professional")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer ${activeFilter === "Professional"
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border hover:border-primary/50 text-foreground"
                }`}
            >
              Professional
            </button>
            <button
              onClick={() => handleFilterClick("Personal")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer ${activeFilter === "Personal"
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border hover:border-primary/50 text-foreground"
                }`}
            >
              Personal
            </button>
            <button
              onClick={handleViewAllClick}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border bg-card border-border hover:border-primary text-primary transition-all cursor-pointer"
            >
              View All
            </button>
          </div>
        </div>

        {/* Stacked Large Cards */}
        <div className="space-y-8 md:space-y-12">
          {displayedProjects.map((project, index) => {
            const isEven = index % 2 === 0
            const { title, subtitle } = splitProjectName(project.name)
            return (
              <div
                key={project.id}
                className="relative group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center cursor-pointer hover:bg-muted/5 p-4 md:py-4 md:px-6 rounded-3xl transition-colors duration-300"
              >
                {/* Visual Representation */}
                <div
                  className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all">
                    {getVisualComponent(project.id)}
                  </div>
                </div>

                {/* Text Description */}
                <div
                  className={`lg:col-span-6 space-y-6 text-left ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#D4A017] uppercase block">
                      {project.category} &bull; {project.year}
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                      {title}
                    </h3>
                    {subtitle && (
                      <span className="text-xs font-semibold tracking-wider text-[#D4A017] uppercase block">
                        {subtitle}
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-base text-muted-foreground leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Details block */}
                  <div className="grid grid-cols-2 gap-4 py-2 border-y border-border/10">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                        Role
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {project.role}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                        Outcome
                      </span>
                      <span className="text-sm font-medium text-foreground text-balance">
                        {project.outcome}
                      </span>
                    </div>
                  </div>

                  {/* Tools capsules */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-card border border-border/50 text-foreground/80 font-sans text-xs font-semibold rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <a
                      href={`#/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-primary hover:text-accent transition-all after:absolute after:inset-0 after:z-10"
                    >
                      View Project <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0% { height: 10%; }
          100% { height: 90%; }
        }
      `}</style>
    </section>
  )
}

// Visual Mapping Helper
function getVisualComponent(id: string) {
  if (id.includes("ehco")) {
    return (
      <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#1C1212] to-[#120B0B] border border-red-950/40 rounded-2xl overflow-hidden flex items-center justify-center p-6 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#B4231808_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="w-full flex items-center justify-between gap-[3px] h-32 relative z-10 px-4">
          {[40, 60, 20, 80, 50, 95, 30, 70, 45, 85, 35, 90, 65, 55, 30, 80, 40, 70, 90, 50, 20, 60, 40].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-center h-full">
              <div
                className="w-full bg-primary/80 rounded-t animate-[wave_1.4s_ease-in-out_infinite_alternate]"
                style={{
                  height: `${val / 2}%`,
                  animationDelay: `${idx * 40}ms`,
                }}
              />
              <div
                className="w-full bg-primary/40 rounded-b mt-[2px] animate-[wave_1.4s_ease-in-out_infinite_alternate]"
                style={{
                  height: `${val / 3}%`,
                  animationDelay: `${idx * 40}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (id.includes("usad")) {
    return (
      <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#121215] to-[#0A0A0D] border border-border/10 rounded-2xl overflow-hidden p-5 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative z-10 h-full flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-border/10 pb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#A1A1AA]">Traffic Monitor</span>
            <span className="flex items-center gap-1.5 text-[9px] text-[#A1A1AA]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Intersection-USAD-04
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-left">
            <div className="bg-muted/20 border border-border/5 p-2 rounded">
              <span className="text-[8px] text-muted-foreground block">FPS</span>
              <span className="text-xs font-bold text-foreground">30.2</span>
            </div>
            <div className="bg-muted/20 border border-border/5 p-2 rounded">
              <span className="text-[8px] text-muted-foreground block">Accidents</span>
              <span className="text-xs font-bold text-[#D4A017]">0</span>
            </div>
            <div className="bg-muted/20 border border-border/5 p-2 rounded">
              <span className="text-[8px] text-muted-foreground block">Vehicles/m</span>
              <span className="text-xs font-bold text-[#B42318]">42</span>
            </div>
          </div>

          <div className="h-16 w-full bg-muted/10 border border-border/5 rounded p-2 flex items-end gap-1">
            {[30, 45, 25, 60, 80, 50, 40, 70, 90, 60, 45, 75, 95, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary/30 to-primary rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (id.includes("working")) {
    return (
      <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#12161E] to-[#0A0D14] border border-[#1E293B]/40 rounded-2xl overflow-hidden flex items-center justify-center p-6 shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px]" />

        <div className="relative z-10 w-full h-full flex flex-col justify-between font-mono text-[9px] text-[#475569] select-none text-left">
          <div className="flex justify-between w-full border-b border-border/10 pb-1">
            <span>[OpenStreetMap]</span>
            <span>Food Map GPS</span>
            <span>Map Unlock: 35%</span>
          </div>

          <svg className="w-full h-24 text-accent" viewBox="0 0 200 80" fill="none">
            <path
              d="M 20 20 L 80 20 L 100 50 L 170 30"
              stroke="#B42318"
              strokeWidth="2"
              strokeDasharray="4 2"
              fill="none"
            />
            <circle cx="20" cy="20" r="4" fill="#D4A017" />
            <circle cx="80" cy="20" r="4" fill="#D4A017" />
            <circle cx="100" cy="50" r="5" fill="#B42318" className="animate-pulse" />
            <circle cx="170" cy="30" r="4" fill="#D4A017" />

            <path
              d="M 50 60 L 120 70"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="50" cy="60" r="3.5" fill="#475569" />
            <circle cx="120" cy="70" r="3.5" fill="#475569" />
          </svg>

          <div className="flex justify-between w-full border-t border-border/10 pt-1">
            <span>Active Pins: 14</span>
            <span>Check-in Verification</span>
            <span>MySQL/Leaflet</span>
          </div>
        </div>
      </div>
    )
  }

  if (id.includes("gabay")) {
    return (
      <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#0F172A] to-[#020617] border border-blue-950/20 rounded-2xl overflow-hidden flex flex-col justify-between p-5 shadow-inner text-left font-mono">
        <div className="flex justify-between items-center border-b border-border/10 pb-2 text-[9px] text-muted-foreground">
          <span>CIVIC APPLICATION</span>
          <span className="text-[#D4A017] font-bold">Quiz Active</span>
        </div>

        <div className="space-y-2 py-3">
          <p className="text-[10px] text-foreground font-bold font-sans">Q1: Which issue is most important to you?</p>
          <div className="space-y-1.5">
            <div className="bg-primary/20 border border-primary/40 px-3 py-1.5 rounded text-[9px] text-[#F8F4EE] flex items-center justify-between">
              <span>A. Public Healthcare Systems</span>
              <span className="text-[8px] bg-primary/40 px-1 rounded">Selected</span>
            </div>
            <div className="bg-muted/30 border border-border/10 px-3 py-1.5 rounded text-[9px] text-muted-foreground">
              <span>B. Infrastructure & Road Dev</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-border/10 pt-2 text-[8px] text-muted-foreground">
          <span>Progress: 1/5</span>
          <span>Java Swing / UI</span>
        </div>
      </div>
    )
  }

  if (id.includes("f-prime")) {
    return (
      <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#1E1B4B] to-[#0F0E2C] border border-[#312E81]/30 rounded-2xl overflow-hidden flex items-center justify-center p-6 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:12px_12px]" />
        <div className="relative z-10 w-full h-full flex flex-col justify-between font-mono text-[9px] text-muted-foreground select-none text-left">
          <div className="flex justify-between w-full border-b border-border/10 pb-1">
            <span>[Calculator View]</span>
            <span>Quad Integration</span>
          </div>

          <svg className="w-full h-24 text-accent" viewBox="0 0 200 80" fill="none">
            <line x1="0" y1="40" x2="200" y2="40" stroke="#312E81" strokeWidth="1" />
            <path d="M 10 70 Q 50 10 100 40 T 190 10" stroke="#B42318" strokeWidth="2" fill="none" />
            <path d="M 50 40 Q 75 25 100 40 L 100 40 L 50 40 Z" fill="rgba(212, 160, 23, 0.15)" stroke="none" />
            <line x1="50" y1="40" x2="50" y2="28" stroke="#D4A017" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="100" y1="40" x2="100" y2="40" stroke="#D4A017" strokeWidth="1" strokeDasharray="2 2" />
          </svg>

          <div className="flex justify-between w-full border-t border-border/10 pt-1">
            <span>Limit a: 2.0</span>
            <span>Limit b: 8.5</span>
            <span>SciPy / Tkinter</span>
          </div>
        </div>
      </div>
    )
  }

  if (id.includes("synced")) {
    return (
      <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#120F24] to-[#0A0714] border border-purple-950/20 rounded-2xl overflow-hidden flex items-center justify-center p-6 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#B4231805_1px,transparent_1px)] bg-[size:16px_16px]" />

        <svg className="w-full h-full text-accent/30" viewBox="0 0 200 120">
          <line x1="40" y1="60" x2="100" y2="30" stroke="currentColor" strokeWidth="0.75" />
          <line x1="40" y1="60" x2="100" y2="90" stroke="currentColor" strokeWidth="0.75" />
          <line x1="100" y1="30" x2="160" y2="60" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
          <line x1="100" y1="90" x2="160" y2="60" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />

          <circle cx="40" cy="60" r="10" fill="rgba(180, 35, 24, 0.15)" stroke="#B42318" strokeWidth="1" />
          <circle cx="40" cy="60" r="3" fill="#B42318" />

          <circle cx="160" cy="60" r="10" fill="rgba(212, 160, 23, 0.15)" stroke="#D4A017" strokeWidth="1" />
          <circle cx="160" cy="60" r="3" fill="#D4A017" />

          <path d="M 60 60 Q 100 20 140 60" stroke="#B42318" strokeWidth="1" fill="none" className="animate-pulse" />
          <path d="M 60 60 Q 100 100 140 60" stroke="#D4A017" strokeWidth="1" fill="none" className="animate-pulse" />
        </svg>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-muted-foreground whitespace-nowrap">
          WebRTC Voice Signaling Active
        </span>
      </div>
    )
  }

  if (id.includes("hi-lite")) {
    return (
      <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#061F1A] to-[#010D0B] border border-teal-950/20 rounded-2xl overflow-hidden flex flex-col justify-between p-5 shadow-inner text-left font-mono">
        <div className="flex justify-between items-center border-b border-border/10 pb-2 text-[9px] text-muted-foreground">
          <span>PORTFOLIO & BOOKINGS</span>
          <span className="text-teal-400 font-bold">Vercel Live</span>
        </div>
        <div className="py-2.5 space-y-1">
          <p className="text-[10px] text-foreground font-bold font-sans">Hi-Lite Booking Calendar</p>
          <div className="grid grid-cols-7 gap-1 text-[8px] text-center border-t border-border/5 pt-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map(d => <span key={d} className="text-muted-foreground">{d}</span>)}
            {[23, 24, 25, 26, 27, 28, 29].map(n => (
              <span key={n} className={n === 25 ? "bg-primary text-primary-foreground rounded-sm font-bold" : "text-foreground"}>
                {n}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-border/10 pt-2 text-[8px] text-muted-foreground">
          <span>Integrates OpenAI API</span>
          <span>Supabase / React</span>
        </div>
      </div>
    )
  }

  if (id.includes("hapagtech") || id.includes("kangina")) {
    return (
      <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#1F1206] to-[#0D0701] border border-amber-950/20 rounded-2xl overflow-hidden flex flex-col justify-between p-5 shadow-inner text-left font-mono">
        <div className="flex justify-between items-center border-b border-border/10 pb-2 text-[9px] text-muted-foreground">
          <span>RESTAURANT ORDERING</span>
          <span className="text-[#D4A017] font-bold">Menu View</span>
        </div>
        <div className="py-3 space-y-1 font-sans">
          <p className="text-[10px] text-foreground font-bold">HapagTech Plate Selection</p>
          <div className="flex items-center justify-between bg-muted/30 border border-border/15 p-2 rounded text-[9px]">
            <span>1x Grilled Tuna Salad</span>
            <span className="font-bold text-[#D4A017]">$12.50</span>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-border/10 pt-2 text-[8px] text-muted-foreground">
          <span>Active Cart System</span>
          <span>Django / Postgres</span>
        </div>
      </div>
    )
  }

  // Fallback default
  return (
    <div className="relative w-full h-full min-h-[200px] md:min-h-[230px] bg-gradient-to-br from-[#12161E] to-[#0A0D14] border border-[#1E293B]/40 rounded-2xl overflow-hidden p-5 shadow-inner text-left font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative z-10 h-full flex flex-col justify-between text-[9px] text-[#475569] select-none">
        <div className="flex items-center justify-between border-b border-border/10 pb-2">
          <span>{id.toUpperCase()}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="h-20 bg-muted/20 border border-border/5 rounded p-2.5 flex items-center justify-center">
          <span className="text-center font-sans text-xs text-muted-foreground font-semibold">Web Interface Showcase</span>
        </div>
        <div className="flex justify-between items-center text-[8px]">
          <span>Full Stack Integration</span>
          <span>Vite &bull; TypeScript</span>
        </div>
      </div>
    </div>
  )
}

export { Projects, getVisualComponent }
