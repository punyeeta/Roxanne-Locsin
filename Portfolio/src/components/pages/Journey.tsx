type JourneyStep = {
  year: string
  title: string
  subtitle: string
  description: string
}

function Journey() {
  const steps: JourneyStep[] = [
    {
      year: "2024",
      title: "Exploration & Foundation",
      subtitle: "Understanding Algorithms",
      description:
        "Started exploring full-stack project builds and grounding core theoretical concepts in algorithms and system logic. Built early utility utilities and web scripts.",
    },
    {
      year: "2025",
      title: "Academic & Research Systems",
      subtitle: "Focus on Performance",
      description:
        "Developed custom research-driven software and academic engines. Delved into digital signal processing (DSP), high-volume coordinates drawing, and dashboard UI architectures.",
    },
    {
      year: "2026",
      title: "Refinement & Industry Preparation",
      subtitle: "Software Systems Architecture",
      description:
        "Refining complex digital systems, focusing on performance, modular design, and robust codebases. Preparing for collaborative development and technical internships.",
    },
  ]

  return (
    <section id="journey" className="py-24 px-6 md:px-12 lg:px-24 bg-card/20 relative border-t border-border/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="space-y-2 text-center lg:text-left">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent">Personal Timeline</span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            My Journey
          </h2>
        </div>

        {/* Timeline body */}
        <div className="relative border-l border-border/60 pl-8 ml-4 lg:ml-6 space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group text-left">
              {/* Timeline indicator node */}
              <div className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-accent group-hover:border-accent transition-all duration-300 shadow-sm" />
              
              <div className="space-y-2">
                {/* Year Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted border border-border/40 text-xs font-bold text-primary font-heading tracking-wide">
                  {step.year}
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-accent font-semibold tracking-wider uppercase font-sans">
                    {step.subtitle}
                  </p>
                </div>

                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl pt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Journey }
