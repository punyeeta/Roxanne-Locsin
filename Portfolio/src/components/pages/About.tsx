import { GraduationCap, Code2, Sparkles, Briefcase, ArrowLeft } from "lucide-react"
import portrait from "@/assets/Roxanne.png"

type AboutProps = {
  onFlipBack: () => void
}

function About({ onFlipBack }: AboutProps) {
  const cards = [
    {
      icon: <GraduationCap className="size-4 text-accent" />,
      label: "Education",
      value: "Computer Science",
      desc: "USTP - CDO",
    },
    {
      icon: <Code2 className="size-4 text-primary" />,
      label: "Focus",
      value: "Software Systems",
      desc: "Architectures & Logic",
    },
    {
      icon: <Sparkles className="size-4 text-accent" />,
      label: "Interest",
      value: "Building useful things",
      desc: "UX & Tooling",
    },
    {
      icon: <Briefcase className="size-4 text-primary" />,
      label: "Status",
      value: "Open to opportunities",
      desc: "Internships & Collabs",
    },
  ]

  return (
    <div className="w-full h-full max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
      {/* Left Column (7 cols) */}
      <div className="lg:col-span-7 space-y-6 text-left">
        <div className="space-y-1">
          <div className="flex items-center">
            <button
              onClick={onFlipBack}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-bold text-accent hover:text-primary transition-colors cursor-pointer pointer-events-auto"
            >
              <ArrowLeft className="size-3.5" /> Roxanne
            </button>
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">
            About Me
          </h2>
        </div>

        <div className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed space-y-3">
          <p>
            I am a Computer Science student driven by the intersection of rigorous research and practical application. I focus on developing clean, performance-optimized, and well-structured software systems.
          </p>
          <p>
            Whether optimizing compression scripts, rendering mathematical models, or building dashboard UI pipelines, I center my process on usability and architectural intent.
          </p>
        </div>

        {/* Focus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-card border border-border/50 rounded-xl p-4 shadow-sm hover-lift flex items-start gap-3"
            >
              <div className="bg-muted p-2 rounded-lg shrink-0 mt-0.5">
                {card.icon}
              </div>
              <div className="text-left">
                <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider block mb-0.5">
                  {card.label}
                </span>
                <h3 className="font-heading font-bold text-foreground text-xs leading-tight mb-0.5">
                  {card.value}
                </h3>
                <p className="text-[10px] text-muted-foreground font-medium">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="border-t border-border/10 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-heading text-base font-bold italic text-primary">
            "Build intentionally. Learn continuously."
          </p>
        </div>
      </div>

      {/* Right Column - User Portrait Image (5 cols) */}
      <div className="lg:col-span-5 flex justify-center items-center">
        <div className="relative group w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden border border-border/80 bg-card p-2 shadow-md hover-lift transition-all">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <img
            src={portrait}
            alt="Roxanne Locsin portrait"
            className="w-full h-full rounded-full object-cover object-top grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
          />
          {/* Subtle design element */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur border border-border/60 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider text-primary whitespace-nowrap">
            ROXANNE LOCSIN
          </div>
        </div>
      </div>
    </div>
  )
}

export { About }
