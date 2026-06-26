import { useMemo } from "react"
import { ArrowLeft, ExternalLink, ShieldCheck, Sparkles, Users } from "lucide-react"
import projectsData from "@/data/projects.json"
import { getVisualComponent } from "@/components/pages/Projects"

type ProjectDetailPageProps = {
  projectId: string
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
  detailedDescription: string
  futureWorks: string
  team: string
}

function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  // Find project data by id
  const project = useMemo(() => {
    return (projectsData as ProjectData[]).find((p) => p.id === projectId)
  }, [projectId])

  const { title, subtitle } = useMemo(() => {
    if (!project) return { title: "", subtitle: "" }
    return splitProjectName(project.name)
  }, [project])

  const liveSites = useMemo(() => {
    if (!project) return []
    return parseLiveSites(project.liveSite)
  }, [project])

  // Helper to parse detailedDescription into overview, contributions, and key features
  const parsedDetails = useMemo(() => {
    if (!project || !project.detailedDescription) {
      return { overview: [], contributions: [], keyFeatures: [] }
    }

    const lines = project.detailedDescription.split(/\r?\n/)
    const overview: string[] = []
    const contributions: string[] = []
    const keyFeatures: string[] = []

    let currentSection: "overview" | "contributions" | "features" = "overview"

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      if (trimmed.toLowerCase().includes("my contributions")) {
        currentSection = "contributions"
        continue
      } else if (trimmed.toLowerCase().includes("key features")) {
        currentSection = "features"
        continue
      }

      const cleanLine = trimmed.replace(/^[\s•\-\*]+/, "")

      if (currentSection === "overview") {
        overview.push(trimmed)
      } else if (currentSection === "contributions") {
        contributions.push(cleanLine)
      } else if (currentSection === "features") {
        keyFeatures.push(cleanLine)
      }
    }

    return { overview, contributions, keyFeatures }
  }, [project])

  // Parse futureWorks into a list of items
  const futureWorksList = useMemo(() => {
    if (!project || !project.futureWorks) return []
    return project.futureWorks
      .split(/\r?\n/)
      .map((line) => line.trim().replace(/^[\s•\-\*]+/, ""))
      .filter(Boolean)
  }, [project])

  // Parse team into a list of members
  const teamMembers = useMemo(() => {
    if (!project || !project.team) return []
    return project.team
      .split(/,|\n/)
      .map((item) => item.trim())
      .filter(Boolean)
  }, [project])

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6 fade-up">
        <div className="text-destructive text-4xl font-extrabold">∅</div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Project Not Found</h2>
        <p className="text-muted-foreground max-w-sm font-sans">
          The project ID you are trying to view does not exist or has been moved.
        </p>
        <a
          href="#/projects"
          className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full hover:bg-primary/95 transition-all"
        >
          View All Projects
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-6 md:px-12 lg:px-24 bg-background fade-up">
      <div className="max-w-[85rem] mx-auto space-y-8">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 text-left">
          <a
            href="#/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-all group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Archive
          </a>
          <span className="text-border">/</span>
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            {project.category} Case Study
          </span>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* Left Column: Case Study Text & Deliverables (60%) */}
          <div className="lg:col-span-7 space-y-10 text-left">

            {/* Project Title Block */}
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-muted border border-border text-foreground/80 text-[10px] font-bold tracking-widest uppercase rounded-full">
                {project.category} Project &bull; {project.year}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm font-semibold tracking-wider text-accent uppercase">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Overview / Introduction */}
            {parsedDetails.overview.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading text-lg font-bold text-foreground tracking-tight uppercase border-b border-border/10 pb-2">
                  Overview
                </h2>
                <div className="space-y-4">
                  {parsedDetails.overview.map((paragraph, index) => (
                    <p
                      key={index}
                      className="font-sans text-base text-muted-foreground leading-relaxed text-balance"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {parsedDetails.keyFeatures.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading text-lg font-bold text-foreground tracking-tight uppercase border-b border-border/10 pb-2">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {parsedDetails.keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-card border border-border/50 rounded-xl p-4 flex gap-3 text-left items-start"
                    >
                      <div className="bg-primary/10 p-1.5 rounded-lg flex items-center justify-center mt-0.5 text-primary">
                        <Sparkles className="size-3.5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-sans text-xs font-semibold text-foreground leading-normal">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contributions & Future Roadmap Side-by-Side Grid */}
            {(parsedDetails.contributions.length > 0 || futureWorksList.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Contributions */}
                {parsedDetails.contributions.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="font-heading text-lg font-bold text-foreground tracking-tight uppercase border-b border-border/10 pb-2">
                      My Contributions
                    </h2>
                    <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-4">
                      {parsedDetails.contributions.map((contribution, index) => (
                        <div key={index} className="flex gap-3.5 items-start">
                          <div className="mt-0.5 text-accent shrink-0">
                            <ShieldCheck className="size-4.5" />
                          </div>
                          <p className="font-sans text-sm text-foreground/90 leading-relaxed">
                            {contribution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Future Roadmap */}
                {futureWorksList.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="font-heading text-lg font-bold text-foreground tracking-tight uppercase border-b border-border/10 pb-2">
                      Future Roadmap
                    </h2>
                    <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-4">
                      <div className="space-y-3">
                        {futureWorksList.map((work, index) => (
                          <div key={index} className="flex gap-3 items-start">
                            <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                              {work}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">

            {/* Visual Canvas Representation Container */}
            <div className="relative group overflow-hidden rounded-2xl border border-border/60 shadow-md">
              <div className="p-4 bg-muted/20 border-b border-border/10 flex justify-between items-center text-xs font-mono text-muted-foreground">
                <span>Interactive Canvas Module</span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="p-6 bg-card">
                {getVisualComponent(project.id)}
              </div>
            </div>

            {/* Metadata Detail Card */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-6 text-left shadow-sm">
              <h3 className="font-heading text-sm font-bold text-foreground tracking-widest uppercase border-b border-border/10 pb-3">
                Project Dashboard
              </h3>

              <div className="space-y-4">
                {/* Role */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    My Role
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {project.role}
                  </span>
                </div>

                {/* Outcome */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Project Outcome
                  </span>
                  <span className="text-xs text-muted-foreground leading-relaxed block">
                    {project.outcome}
                  </span>
                </div>

                {/* Timeline */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Timeline
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {project.year}
                  </span>
                </div>

                {/* Team */}
                {teamMembers.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Developers & Team
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {teamMembers.map((member) => (
                        <span
                          key={member}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted border border-border/50 text-foreground/80 font-sans text-[10px] font-medium rounded-full"
                        >
                          <Users className="size-2.5 text-muted-foreground" />
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-background border border-border/60 text-foreground/90 font-sans text-xs font-semibold rounded-md hover:border-primary/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                {(project.github || project.liveSite) && (
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-border/10">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-border rounded-full hover:bg-muted/50 text-foreground transition-all cursor-pointer w-full"
                      >
                        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        Source Code
                      </a>
                    )}
                    {liveSites.map((site) => (
                      <a
                        key={site.url}
                        href={site.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full hover:bg-primary/95 transition-all cursor-pointer w-full text-center"
                      >
                        <ExternalLink className="size-4" />
                        {site.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProjectDetailPage }
