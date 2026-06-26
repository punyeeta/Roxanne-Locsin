import { About } from "./About"

type HeroProps = {
  isAboutOpen: boolean
  setIsAboutOpen: (val: boolean) => void
}

function Hero({ isAboutOpen, setIsAboutOpen }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[550px] md:min-h-[650px] lg:min-h-[700px] px-6 md:px-12 lg:px-24 py-12 md:py-16 lg:py-20 overflow-hidden bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Transition container */}
      <div className="max-w-[85rem] mx-auto w-full relative">
        <div
          className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 transition-all duration-700 ease-in-out ${isAboutOpen
            ? "opacity-0 scale-95 pointer-events-none blur-sm"
            : "opacity-100 scale-100 pointer-events-auto blur-none"
            }`}
        >
          {/* Left Side */}
          <div className="lg:col-span-6 space-y-8 fade-up text-left">
            <div className="space-y-4">
              <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                ROXANNE <br />
                <span className="text-primary">LOCSIN</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                Building practical systems, research-driven projects, and meaningful digital experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#/projects"
                className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover-lift hover:shadow-[0_12px_24px_rgba(180,35,24,0.25)] transition-all cursor-pointer pointer-events-auto"
              >
                View Projects
              </a>
              <button
                onClick={() => setIsAboutOpen(true)}
                className="px-8 py-3.5 rounded-full border border-border bg-card/40 hover:bg-card text-foreground font-semibold text-sm hover-lift transition-all cursor-pointer pointer-events-auto"
              >
                About Me
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-6 relative w-full h-[400px] md:h-[500px] flex items-center justify-center fade-up pointer-events-none">
            {/* Subtle Geometric Background Lines */}
            <svg
              className="absolute inset-0 w-full h-full text-border/40 stroke-current"
              viewBox="0 0 500 500"
              fill="none"
            >
              {/* Connecting lines */}
              <path
                d="M100 250 L250 120 L400 250 L250 380 Z"
                strokeDasharray="6 6"
                strokeWidth="1.5"
              />
              <path d="M50 250 H450" strokeWidth="1" strokeDasharray="4 8" />
              <path d="M250 50 V450" strokeWidth="1" strokeDasharray="4 8" />
              {/* Soft gold focus ring */}
              <circle cx="250" cy="250" r="140" stroke="url(#goldGradient)" strokeWidth="1" />

              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A017" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#B42318" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating dots wrapper */}
            <div className="absolute inset-0">
              {/* Animating tiny dots */}
              <div className="absolute top-[20%] left-[30%] w-2 h-2 rounded-full bg-accent opacity-50 animate-ping [animation-duration:3s]" />
              <div className="absolute top-[70%] left-[20%] w-1.5 h-1.5 rounded-full bg-primary opacity-40 animate-pulse" />
              <div className="absolute top-[40%] right-[25%] w-2.5 h-2.5 rounded-full bg-primary/20 border border-primary/40 animate-pulse [animation-duration:4s]" />
              <div className="absolute bottom-[30%] right-[35%] w-1.5 h-1.5 rounded-full bg-accent opacity-60 animate-ping [animation-duration:5s]" />
            </div>

            {/* Floating Project Cards */}
            {/* Card 1 */}
            <div
              className="absolute top-[10%] left-[8%] w-[190px] bg-card/90 border border-border/80 rounded-xl p-4 shadow-lg hover-lift backdrop-blur-md animate-[float_6s_ease-in-out_infinite]"
              style={{ animationDelay: "0s" }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-accent">DSP Research</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs font-heading font-extrabold text-foreground">EHCo Compression</p>
              <p className="text-[9px] text-muted-foreground font-mono leading-none mt-0.5">Adaptive Huffman + RLE</p>
              <div className="mt-3.5 flex items-end gap-[2px] h-8 w-full bg-muted/40 rounded px-1.5 py-1">
                <span className="w-1.5 h-3 bg-primary/80 rounded-t animate-[wave_1.5s_ease-in-out_infinite_alternate]" />
                <span className="w-1.5 h-6 bg-primary/80 rounded-t animate-[wave_1.2s_ease-in-out_infinite_alternate]" />
                <span className="w-1.5 h-4 bg-primary/80 rounded-t animate-[wave_1.7s_ease-in-out_infinite_alternate]" />
                <span className="w-1.5 h-7 bg-primary/80 rounded-t animate-[wave_1.4s_ease-in-out_infinite_alternate]" />
                <span className="w-1.5 h-2 bg-primary/80 rounded-t animate-[wave_1.9s_ease-in-out_infinite_alternate]" />
                <span className="w-1.5 h-5 bg-primary/80 rounded-t animate-[wave_1.1s_ease-in-out_infinite_alternate]" />
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="absolute top-[48%] right-[8%] w-[210px] bg-card/90 border border-border/80 rounded-xl p-4 shadow-lg hover-lift backdrop-blur-md animate-[float_7s_ease-in-out_infinite]"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-primary">Math Tooling</span>
                <span className="text-[9px] text-muted-foreground font-mono">y=sin(x)</span>
              </div>
              <p className="text-xs font-heading font-extrabold text-foreground">f'prime Grapher</p>
              <p className="text-[9px] text-muted-foreground font-mono leading-none mt-0.5">Calculus Approximations</p>
              {/* Coordinate mesh visualization */}
              <div className="mt-3 h-12 w-full bg-muted/40 rounded border border-border/30 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#80808010_1px,transparent_1px)] bg-[size:8px_8px]" />
                {/* sine path line */}
                <svg className="w-full h-full text-accent" viewBox="0 0 100 40">
                  <path
                    d="M0,20 Q25,5 50,20 T100,20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="100"
                    className="animate-[draw_2s_linear_infinite]"
                  />
                </svg>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="absolute bottom-[8%] left-[18%] w-[200px] bg-card/95 border border-border/80 rounded-xl p-4 shadow-lg hover-lift backdrop-blur-md animate-[float_6.5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-accent">ML Forecasting</span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-xs font-heading font-extrabold text-foreground">iQueue Platform</p>
              <p className="text-[9px] text-muted-foreground font-mono leading-none mt-0.5 mb-3">Predictive Queue Intelligence</p>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-muted/50 p-2 rounded">
                  <span className="text-[7px] text-muted-foreground uppercase font-bold tracking-wider block">Wait Est.</span>
                  <span className="text-xs font-bold text-foreground">12 mins</span>
                </div>
                <div className="bg-muted/50 p-2 rounded">
                  <span className="text-[7px] text-muted-foreground uppercase font-bold tracking-wider block">Confidence</span>
                  <span className="text-xs font-bold text-primary">94.2%</span>
                </div>
              </div>
            </div>

            {/* Core node center */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 rounded-full bg-card shadow-inner border border-border flex items-center justify-center">
                <span className="font-heading text-lg font-black text-primary">R</span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className={`absolute inset-0 w-full h-full flex items-center transition-all duration-700 ease-in-out ${isAboutOpen
            ? "opacity-100 scale-100 pointer-events-auto blur-none"
            : "opacity-0 scale-95 pointer-events-none blur-sm"
            }`}
        >
          <About onFlipBack={() => setIsAboutOpen(false)} />
        </div>

      </div>

      {/* Encapsulated animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.5deg); }
        }
        @keyframes wave {
          0% { height: 10%; }
          100% { height: 90%; }
        }
      `}</style>
    </section>
  )
}

export { Hero }