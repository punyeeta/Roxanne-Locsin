import { Monitor, Cpu, Hammer, ArrowRight } from "lucide-react"

type SkillCategory = {
  title: string
  icon: React.ReactNode
  skills: string[]
}

function Skills() {
  const categories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: <Monitor className="size-5 text-primary" />,
      skills: ["Python", "Java", "C++", "TypeScript", "SQL"],
    },
    {
      title: "Core CS Concepts",
      icon: <Cpu className="size-5 text-accent" />,
      skills: [
        "Object-Oriented Programming (OOP)",
        "Data Structures & Algorithms",
        "Software Development Lifecycle (SDLC)",
        "Debugging",
        "System Design Fundamentals",
      ],
    },
    {
      title: "Web & Software Development",
      icon: <Monitor className="size-5 text-primary" />,
      skills: ["HTML", "CSS", "React", "Responsive Design", "API Integration"],
    },
    {
      title: "Tools & Platforms",
      icon: <Hammer className="size-5 text-accent" />,
      skills: ["Git", "GitHub", "VS Code", "Figma"],
    },
  ]

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-background scroll-mt-20 relative border-t border-border/10">
      <div id="resume" className="absolute top-0 left-0" />

      <div className="max-w-[85rem] mx-auto">
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-sm uppercase tracking-[0.2em] font-bold text-accent">Technical Toolkit</span>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Skills & Abilities
              </h2>
            </div>

            <div className="space-y-6">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border/60 rounded-2xl p-6 hover-lift flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="bg-muted/50 p-2.5 rounded-xl flex items-center justify-center">
                        {cat.icon}
                      </div>
                      <h3 className="font-heading text-base font-bold text-foreground">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Capsules */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-background border border-border/70 text-foreground/90 font-sans text-xs font-semibold rounded-full hover:border-primary/50 transition-colors"
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

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-sm uppercase tracking-[0.2em] font-bold text-accent">Qualifications</span>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Curriculum Vitae
              </h2>
            </div>

            {/* Resume Preview Card */}
            <div className="bg-card border border-border/70 rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.04)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.4)] p-6 md:p-8 text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-4 gap-4">
                <div>
                  <h3 className="font-heading text-2xl font-black text-foreground uppercase tracking-tight">
                    Roxanne M. Locsin
                  </h3>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider font-sans">
                    Computer Science
                  </p>
                </div>
                <div className="text-[12px] text-muted-foreground font-mono space-y-0.5 sm:text-right shrink-0">
                  <p>Burgos Macahambus St., Brgy. 15, CDO</p>
                  <p>locsin.roxanne235@gmail.com</p>
                  <p>0966 936 2413</p>
                </div>
              </div>

              {/* Body */}
              <div className="py-6 space-y-6">
                {/* Objective */}
                <div className="space-y-2">
                  <h4 className="text-[12px] uppercase tracking-[0.15em] font-bold text-accent border-b border-border/20 pb-0.5">
                    Objective
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Computer Science student seeking an OJT/internship opportunity to gain hands-on experience in computing systems, software development, and data-driven technologies. Interested in contributing to real-world projects while exploring software engineering, systems analysis, databases, AI, and IT support.
                  </p>
                </div>

                {/* Projects */}
                <div className="space-y-4">
                  <h4 className="text-[12px] uppercase tracking-[0.15em] font-bold text-accent border-b border-border/20 pb-0.5">
                    Project Experience
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h5 className="font-heading text-sm font-bold text-foreground">
                          Hi-Lite Studio: Web Application
                        </h5>
                        <span className="text-[12px] text-muted-foreground font-semibold shrink-0">
                          Frontend Developer
                        </span>
                      </div>
                      <p className="text-[12px] text-primary font-semibold mb-1">React, TypeScript (Vite), Supabase, Tailwind CSS, OpenAI API</p>
                      <p className="text-[12px] text-muted-foreground leading-normal">
                        Built the frontend interface for creative portfolio management and client booking workflows; developed responsive components using Tailwind CSS and shadcn/ui.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h5 className="font-heading text-sm font-bold text-foreground">
                          USAD AI Traffic System
                        </h5>
                        <span className="text-[12px] text-muted-foreground font-semibold shrink-0">
                          Developer
                        </span>
                      </div>
                      <p className="text-[12px] text-primary font-semibold mb-1">Computer Vision, OpenCV, OCR, AI Systems, System Logic Design</p>
                      <p className="text-[12px] text-muted-foreground leading-normal">
                        Contributed to AI-based traffic management, assisting in designing system logic for traffic flow optimization and decision-making.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h5 className="font-heading text-sm font-bold text-foreground">
                          EHCo - Audio Compression System
                        </h5>
                        <span className="text-[12px] text-muted-foreground font-semibold shrink-0">
                          C++ Academic Project
                        </span>
                      </div>
                      <p className="text-[12px] text-primary font-semibold mb-1">Adaptive Huffman Coding, DCT, Run-Length Encoding</p>
                      <p className="text-[12px] text-muted-foreground leading-normal">
                        Contributed to an audio compression system using hybrid techniques, implementing Adaptive Huffman Coding for efficient encoding.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="border-t border-border/40 pt-6 flex justify-center">
                <a
                  href="/Locsin_Roxanne_OJT_Resume.pdf"
                  download="Locsin_Roxanne_OJT_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background dark:bg-foreground dark:text-background font-semibold text-xs rounded-full hover-lift transition-all hover:bg-foreground/90 cursor-pointer"
                >
                  Download Full Resume <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Skills }
