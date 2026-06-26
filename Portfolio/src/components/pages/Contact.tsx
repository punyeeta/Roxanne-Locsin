import React, { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus("sending")
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New portfolio message from ${formData.name}`,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const socialLinks = [
    {
      icon: <Mail className="size-5" />,
      label: "Email",
      val: "locsin.roxanne235@gmail.com",
      href: "mailto:locsin.roxanne235@gmail.com",
    },
    {
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      label: "GitHub",
      val: "github.com/punyeeta",
      href: "https://github.com/punyeeta",
    },
    {
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: "LinkedIn",
      val: "linkedin.com/in/roxanne-locsin-02855734b",
      href: "https://www.linkedin.com/in/roxanne-locsin-02855734b/",
    },
  ]

  return (
    <section id="contact" className="py-12 px-6 md:px-12 lg:px-24 bg-background scroll-mt-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent">Get In Touch</span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-[1.25]">
              Interested in building something together?
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Have an idea, research project, or internship role in mind? Feel free to reach out directly through the form or my social accounts.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card/40 hover:bg-card hover-lift transition-all group"
              >
                <div className="bg-muted p-2.5 rounded-lg text-primary group-hover:text-accent transition-colors">
                  {link.icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                    {link.label}
                  </span>
                  <span className="text-xs font-semibold text-foreground font-mono">
                    {link.val}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <p className="text-xs font-semibold text-accent font-sans bg-accent/5 border border-accent/15 px-4 py-2.5 rounded-xl inline-block">
              Currently open to internships and collaborative opportunities.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 bg-card border border-border/60 rounded-2xl p-8 shadow-sm flex flex-col h-full">
          <form onSubmit={handleSubmit} className="space-y-6 text-left flex flex-col flex-grow h-full justify-between">
            <div className="space-y-6 flex flex-col flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 shrink-0">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Maomao"
                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maomao@example.com"
                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2 flex flex-col flex-grow">
                <label htmlFor="message" className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground shrink-0">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="I would love to discuss a project..."
                  className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans text-foreground resize-none flex-grow min-h-[220px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover-lift transition-all hover:bg-primary/95 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0 mt-6"
            >
              {status === "sending" && "Sending..."}
              {status === "success" && "Message Sent!"}
              {status === "error" && "Error Sending!"}
              {status === "idle" && (
                <>
                  Send Message <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export { Contact }
