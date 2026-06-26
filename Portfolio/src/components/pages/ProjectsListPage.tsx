import { useState, useMemo } from "react"
import { ArrowRight, Search, ExternalLink } from "lucide-react"
import projectsData from "@/data/projects.json"
import { getVisualComponent } from "@/components/pages/Projects"

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

function parseLiveSites(liveSiteString: string) {
  if (!liveSiteString) return []
  
  if (!liveSiteString.includes("\n") && !liveSiteString.includes("\r")) {
    const cleanUrl = liveSiteString.replace(/^(Live Site:?|Live Prototype:?)\s*/i, "").trim()
    return [{ label: "Live Demo", url: cleanUrl }]
  }
  
  const lines = liveSiteString.split(/\r?\n/)
  const results: { label: string; url: string }[] = []
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    if (!trimmed.toLowerCase().includes("http://") && !trimmed.toLowerCase().includes("https://")) {
      continue
    }
    
    const match = trimmed.match(/^([^:]+):\s*(https?:\/\/\S+)/i)
    if (match) {
      results.push({
        label: match[1].trim().replace(/^(Live Site:?|Live Prototype:?)\s*/i, ""),
        url: match[2].trim()
      })
    } else {
      const urlStartIndex = trimmed.search(/https?:\/\//i)
      if (urlStartIndex !== -1) {
        let label = trimmed.substring(0, urlStartIndex).replace(/:$/, "").trim()
        const url = trimmed.substring(urlStartIndex).trim()
        if (!label) {
          label = "Live Demo"
        }
        results.push({ label, url })
      }
    }
  }
  
  if (results.length === 0) {
    const cleanUrl = liveSiteString.replace(/^(Live Site:?|Live Prototype:?)\s*/i, "").trim()
    return [{ label: "Live Demo", url: cleanUrl }]
  }
  
  return results
}

function ProjectsListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Academic" | "Professional" | "Personal">("All")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    try {
      const saved = sessionStorage.getItem("portfolio-expanded-categories")
      return saved ? JSON.parse(saved) : { Professional: false, Academic: false, Personal: false }
    } catch (e) {
      return { Professional: false, Academic: false, Personal: false }
    }
  })

  const toggleExpandCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = { ...prev, [category]: !prev[category] }
      try {
        sessionStorage.setItem("portfolio-expanded-categories", JSON.stringify(next))
      } catch (e) {
        console.error("Failed to save expanded categories to sessionStorage", e)
      }
      return next
    })
  }

  // Filter & sort projects based on category and search query (newest to oldest)
  const filteredProjects = useMemo(() => {
    const sorted = [...(projectsData as ProjectData[])].sort((a, b) => parseInt(b.year) - parseInt(a.year))
    
    return sorted.filter((project) => {
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false
      }

      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        const matchesName = project.name.toLowerCase().includes(query)
        const matchesDesc = project.shortDescription.toLowerCase().includes(query)
        const matchesRole = project.role.toLowerCase().includes(query)
        const matchesStack = project.techStack.some((tech) => tech.toLowerCase().includes(query))
        return matchesName || matchesDesc || matchesRole || matchesStack
      }

      return true
    })
  }, [searchQuery, selectedCategory])

  // Group filtered projects by category
  const groupedProjects = useMemo(() => {
    const groups: Record<string, ProjectData[]> = {
      Academic: [],
      Professional: [],
      Personal: [],
    }

    filteredProjects.forEach((project) => {
      if (groups[project.category]) {
        groups[project.category].push(project)
      } else {
        groups[project.category] = [project]
      }
    })

    return groups
  }, [filteredProjects])

  const hasResults = filteredProjects.length > 0

  return (
    <div className="min-h-screen py-12 px-6 md:px-12 lg:px-24 bg-background fade-up">
      <div className="max-w-[85rem] mx-auto space-y-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-8">
          <div className="space-y-2 text-left">
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-accent">Archive</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              All Projects
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl font-sans">
              A comprehensive showcase of my academic, professional, and personal engineering work.
            </p>
          </div>

          {/* Search Input and Filter Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects or stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-all font-sans"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-muted/30 p-1.5 rounded-full border border-border/40">
              {(["All", "Academic", "Professional", "Personal"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Categorized Grid */}
        {hasResults ? (
          <div className="space-y-10 md:space-y-12">
            {Object.entries(groupedProjects).map(([category, list]) => {
              if (list.length === 0) return null

              const isExpanded = expandedCategories[category]
              const displayedList = isExpanded ? list : list.slice(0, 3)

              return (
                <div key={category} className="space-y-6 text-left">
                  {/* Category Title Header */}
                  <div className="flex items-center gap-3 border-b border-border/10 pb-3">
                    <h2 className="font-heading text-xl font-bold text-foreground tracking-tight">
                      {category} Projects
                    </h2>
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground font-sans text-xs font-bold rounded-full">
                      {list.length}
                    </span>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedList.map((project) => {
                      const { title, subtitle } = splitProjectName(project.name)
                      return (
                        <div
                          key={project.id}
                          className="relative group flex flex-col bg-card border border-border/60 hover:border-primary/20 rounded-2xl overflow-hidden hover-lift shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                          {/* Interactive Visual Element */}
                          <div className="h-44 relative overflow-hidden bg-muted/10 border-b border-border/10">
                            <div className="absolute inset-0 scale-[0.9] origin-center flex items-center justify-center p-2">
                              <div className="w-full h-full rounded-xl overflow-hidden shadow-sm">
                                {getVisualComponent(project.id)}
                              </div>
                            </div>
                          </div>

                          {/* Card Info Content */}
                          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-widest text-[#D4A017] uppercase">
                                  {project.year}
                                </span>
                                <span className="text-[9px] font-medium px-2 py-0.5 bg-muted border border-border/50 text-foreground/80 rounded-md">
                                  {project.role}
                                </span>
                              </div>

                              <h3 className="font-heading text-lg font-bold text-foreground tracking-tight line-clamp-1">
                                {title}
                              </h3>
                              {subtitle && (
                                <p className="text-[11px] font-semibold text-accent uppercase tracking-wider line-clamp-1 mt-0.5">
                                  {subtitle}
                                </p>
                              )}

                              <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3 pt-1">
                                {project.shortDescription}
                              </p>
                            </div>

                            <div className="space-y-4 pt-2">
                              {/* Tech stack capsules */}
                              <div className="flex flex-wrap gap-1">
                                {project.techStack.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-0.5 bg-background border border-border/40 text-foreground/75 font-sans text-[10px] font-semibold rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.techStack.length > 4 && (
                                  <span className="px-2 py-0.5 bg-muted text-muted-foreground font-sans text-[9px] font-bold rounded">
                                    +{project.techStack.length - 4} more
                                  </span>
                                )}
                              </div>

                              {/* Actions footer */}
                              <div className="flex items-center justify-between border-t border-border/10 pt-3">
                                <a
                                  href={`#/projects/${project.id}`}
                                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent transition-colors after:absolute after:inset-0 after:z-10"
                                >
                                  View Project <ArrowRight className="size-3" />
                                </a>

                                <div className="flex items-center gap-2.5 relative z-20">
                                  {project.github && (
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border rounded-md transition-all flex items-center justify-center relative z-20"
                                      title="View Source Code"
                                    >
                                      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                      </svg>
                                    </a>
                                  )}
                                  {parseLiveSites(project.liveSite).map((site) => (
                                    <a
                                      key={site.url}
                                      href={site.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border rounded-md transition-all relative z-20 flex items-center justify-center"
                                      title={`View Live Site: ${site.label}`}
                                    >
                                      <ExternalLink className="size-3.5" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Load More Button */}
                  {list.length > 3 && (
                    <div className="flex justify-center pt-4">
                      <button
                        onClick={() => toggleExpandCategory(category)}
                        className="px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full border border-border hover:border-primary hover:text-primary transition-all cursor-pointer bg-card shadow-sm font-sans"
                      >
                        {isExpanded ? "Show Less" : `Load More (${list.length - 3} more)`}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="text-center py-20 bg-card border border-border/60 rounded-3xl max-w-xl mx-auto space-y-4">
            <div className="text-accent text-3xl font-extrabold">∅</div>
            <h3 className="font-heading text-lg font-bold text-foreground">No matches found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto px-6 font-sans">
              We couldn't find any projects matching "{searchQuery}" under "{selectedCategory}" category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full hover:bg-primary/95 transition-all cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export { ProjectsListPage }
