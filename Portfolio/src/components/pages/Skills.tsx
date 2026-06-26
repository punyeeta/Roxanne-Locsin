import { Monitor, Cpu, Hammer } from "lucide-react"

type SkillCategory = {
  title: string
  icon: React.ReactNode
  skills: string[]
}

function Skills() {
  const categories: SkillCategory[] = [
    {
      title: "Frontend",
      icon: <Monitor className="size-5 text-primary" />,
      skills: ["React", "Tailwind CSS", "Vite", "TypeScript", "HTML5", "CSS3", "JavaScript"],
    },
    {
      title: "Backend",
      icon: <Cpu className="size-5 text-accent" />,
      skills: ["Django", "Node.js", "Express", "PostgreSQL", "Python", "SQL"],
    },
    {
      title: "Tools & Design",
      icon: <Hammer className="size-5 text-primary" />,
      skills: ["Git", "Figma", "Docker", "VS Code", "GitHub", "REST APIs"],
    },
  ]

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-background scroll-mt-20">
      <div className="max-w-[85rem] mx-auto space-y-16">
        {/* Section Title */}
        <div className="space-y-2 text-left">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent">Technical Toolkit</span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Skills & Abilities
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-card border border-border/60 rounded-2xl p-8 hover-lift flex flex-col justify-between text-left"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="bg-muted/50 p-2.5 rounded-xl flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {cat.title}
                  </h3>
                </div>

                {/* Capsules */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 bg-background border border-border/70 text-foreground/90 font-sans text-xs font-semibold rounded-full hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Skills }
