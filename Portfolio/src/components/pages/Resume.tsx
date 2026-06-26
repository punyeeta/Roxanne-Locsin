import { ArrowRight } from "lucide-react"

function Resume() {
  return (
    <section id="resume" className="py-24 px-6 md:px-12 lg:px-24 bg-card/20 relative border-t border-border/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="space-y-2 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent">Qualifications</span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Curriculum Vitae
          </h2>
        </div>

        {/* Minimal Sheet Card representing a preview of the resume */}
        <div className="bg-card border border-border/70 rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.04)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.4)] p-8 md:p-12 text-left relative overflow-hidden max-w-2xl mx-auto">
          {/* Subtle gold line accent at top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/40 pb-6 gap-4">
            <div>
              <h3 className="font-heading text-2xl font-black text-foreground uppercase tracking-tight">
                Roxanne Locsin
              </h3>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider font-sans">
                Computer Science Student
              </p>
            </div>
            <div className="text-xs text-muted-foreground font-mono space-y-1 md:text-right">
              <p>Philippines</p>
              <p>roxannelocsin@example.com</p>
            </div>
          </div>

          {/* Body structure */}
          <div className="py-8 space-y-8">
            {/* Experience */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.15em] font-bold text-accent border-b border-border/20 pb-1">
                Experience
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h5 className="font-heading text-base font-bold text-foreground">
                      Full-Stack Software Intern
                    </h5>
                    <span className="text-xs text-muted-foreground font-semibold shrink-0">
                      2025 - Present
                    </span>
                  </div>
                  <p className="text-xs text-primary font-semibold mb-1.5">Academic System Development</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Assisting in designing custom web platforms and query-monitoring dashboards. Focused on UI performance and backend processing.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.15em] font-bold text-accent border-b border-border/20 pb-1">
                Education
              </h4>
              <div>
                <div className="flex justify-between items-start gap-4">
                  <h5 className="font-heading text-base font-bold text-foreground">
                    BS in Computer Science
                  </h5>
                  <span className="text-xs text-muted-foreground font-semibold shrink-0 font-sans">
                    Expected 2026
                  </span>
                </div>
                <p className="text-xs text-primary font-semibold mb-1.5">USTP - Cagayan de Oro</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Focusing on software systems architecture, algorithmic complexity, UI research, and digital signal processing models.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Action inside sheet */}
          <div className="border-t border-border/40 pt-8 flex justify-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background dark:bg-foreground dark:text-background font-semibold text-xs rounded-full hover-lift transition-all hover:bg-foreground/90 cursor-pointer"
            >
              Download Full Resume <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Resume }
