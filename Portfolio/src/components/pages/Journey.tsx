import { useState } from "react"

type JourneyStep = {
  year: string
  title: string
  subtitle: string
  description: string
}

function Journey() {
  const [isExpanded, setIsExpanded] = useState(false)

  const personalSteps: JourneyStep[] = [
    {
      year: "2026",
      title: "Specialization",
      subtitle: "Emerging Technologies and Continuous Learning",
      description: "Currently exploring machine learning, advancing in full-stack development, conducting research, and expanding across multiple areas of computer science."
    },
    {
      year: "2025",
      title: "Exploration",
      subtitle: "Development, Research, and Practical Applications",
      description: "Started building full-stack projects, explored frontend development, and applied technical knowledge through research and practical systems."
    },
    {
      year: "2024",
      title: "Growth",
      subtitle: "Systems, Logic, and User Experience",
      description: "Developed skills in software design, logical thinking, data management, and user-focused development."
    },
    {
      year: "2023",
      title: "Foundations",
      subtitle: "Core Computing and Technical Fundamentals",
      description: "Built foundational knowledge in computer science, problem-solving, and software development."
    }
  ]

  const professionalSteps: JourneyStep[] = [
    {
      year: "June 2026 - July 2026",
      title: "CerebroX (Internship)",
      subtitle: "Development and Quality Assurance",
      description: "Contributed to feature development, debugging, testing, and system improvements, supporting reliability, functionality, and overall user experience."
    }
  ]

  const displayedPersonal = isExpanded ? personalSteps : personalSteps.slice(0, 1)

  const handleToggle = () => {
    const nextState = !isExpanded
    setIsExpanded(nextState)
    if (!nextState) {
      const journeySection = document.getElementById("journey")
      if (journeySection) {
        journeySection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section id="journey" className="py-12 px-6 md:px-12 lg:px-24 bg-card/20 relative border-t border-border/10 scroll-mt-20">
      <div className="max-w-[85rem] mx-auto space-y-12">
        <div className="space-y-2 text-left">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent">Timeline</span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            My Journey
          </h2>
        </div>

        {/* Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Column 1 */}
          <div className="space-y-8">
            <h3 className="font-heading text-xl font-bold text-foreground border-b border-border/10 pb-3 flex items-center gap-2 text-left">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              Personal Journey
            </h3>

            <div className="relative border-l border-border/60 pl-8 ml-4 lg:ml-6 space-y-8">
              {displayedPersonal.map((step, idx) => (
                <div key={step.year} className="relative group text-left fade-up">
                  {/* toggle tool */}
                  {idx === 0 ? (
                    <button
                      onClick={handleToggle}
                      className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary hover:border-accent hover:bg-accent/15 transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer text-primary hover:text-accent font-heading font-extrabold text-[10px] z-10"
                      title={isExpanded ? "Collapse Timeline" : "Reveal full journey (2023 - 2025)"}
                    >
                      {isExpanded}
                    </button>
                  ) : (
                    <div className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-accent group-hover:border-accent transition-all duration-300 shadow-sm" />
                  )}

                  <div className="space-y-2">
                    {/* Year Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted border border-border/40 text-xs font-bold text-primary font-heading tracking-wide">
                      {step.year}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs text-accent font-semibold tracking-wider uppercase font-sans">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xl pt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Reveal/Collapse Controller */}
              <div className="relative group text-left pt-2">
                <button
                  onClick={handleToggle}
                  className="text-xs uppercase tracking-wider font-bold text-accent hover:text-primary transition-colors cursor-pointer text-left"
                >
                  {isExpanded ? "Collapse Timeline" : "Reveal full journey (2023 - 2025)"}
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Professional Journey */}
          <div className="space-y-8">
            <h3 className="font-heading text-xl font-bold text-foreground border-b border-border/10 pb-3 flex items-center gap-2 text-left">
              <span className="w-1.5 h-6 bg-accent rounded-full" />
              Professional Journey
            </h3>

            <div className="relative border-l border-border/60 pl-8 ml-4 lg:ml-6 space-y-8">
              {professionalSteps.map((step) => (
                <div key={step.year} className="relative group text-left">
                  {/* Timeline indicator node */}
                  <div className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm" />

                  <div className="space-y-2">
                    {/* Year Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted border border-border/40 text-xs font-bold text-accent font-heading tracking-wide">
                      {step.year}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs text-primary font-semibold tracking-wider uppercase font-sans">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xl pt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export { Journey }
