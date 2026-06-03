import { useEffect, useState, type ReactNode } from "react"
import { ArrowDownToLine, Mail, MoonStar, SunMedium } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ThemeMode = "dark" | "light"

type NavbarProps = {
	theme: ThemeMode
	onThemeToggle: () => void
}

type MagneticButtonProps = {
	className?: string
	children: ReactNode
	href?: string
	onClick?: () => void
	target?: string
	rel?: string
	download?: boolean
	ariaLabel?: string
}

function MagneticButton({
	className,
	children,
	href,
	onClick,
	target,
	rel,
	download,
	ariaLabel,
}: MagneticButtonProps) {
	const sharedProps = {
		className: cn("transition-transform duration-200 ease-out hover:-translate-y-0.5", className),
		"aria-label": ariaLabel,
	}

	if (href) {
		return (
			<a href={href} target={target} rel={rel} download={download} {...sharedProps}>
				{children}
			</a>
		)
	}

	return (
		<button type="button" onClick={onClick} {...sharedProps}>
			{children}
		</button>
	)
}

const navItems = [
	{ label: "Skills", href: "#skills" },
	{ label: "Projects", href: "#projects" },
]

function AuraNavLink({
	label,
	href,
	isCompact,
}: {
	label: string
	href: string
	isCompact: boolean
}) {
	const [hovering, setHovering] = useState(false)

	const elRef = { current: null as HTMLAnchorElement | null }

	useEffect(() => {
		const id = "aura-style-injection"
		if (!document.getElementById(id)) {
			const style = document.createElement("style")
			style.id = id
			style.textContent = `
				@property --aura-angle {
					syntax: '<angle>';
					initial-value: 0deg;
					inherits: false;
				}
				@keyframes aura-spin {
					to { --aura-angle: 360deg; }
				}
				.nav-aura-spinning::before {
					animation: aura-spin 2.4s linear infinite !important;
				}
			`
			document.head.appendChild(style)
		}
	}, [])

	return (
		<a
			href={href}
			ref={(el) => { elRef.current = el }}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
			className={cn(
				"group nav-aura-link rounded-full font-medium text-[#F59E0B] transition-colors duration-300 hover:text-primary dark:text-[#FBBF24]",
				hovering && "nav-aura-spinning",
				isCompact ? "px-3 py-1.5" : "px-4 py-2",
			)}
			style={{
				"--aura-opacity": hovering ? "1" : "0",
			} as React.CSSProperties}
		>
			<span className="relative z-10 text-xl font-medium">{label}</span>
			<span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
		</a>
	)
}

function Navbar({ theme, onThemeToggle }: NavbarProps) {
	const [isCompact, setIsCompact] = useState(false)
	const [scrollProgress, setScrollProgress] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const progress = Math.min(window.scrollY / 140, 1)
			setScrollProgress(progress)
			setIsCompact(progress > 0.08)
		}

		handleScroll()
		window.addEventListener("scroll", handleScroll, { passive: true })

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<header className="fixed inset-x-0 top-0 z-50 overflow-x-clip">
			<style>{`
				.nav-aura-link {
					position: relative;
					isolation: isolate;
				}

				.header-shell {
					box-shadow: 0 14px 24px -18px rgba(0, 0, 0, 0.36);
				}
			`}</style>
			<div
				className={cn(
					"header-shell relative left-1/2 right-1/2 grid w-[calc(100vw+2rem)] -translate-x-1/2 grid-cols-[auto_1fr_auto] items-center bg-background/90 backdrop-blur-xl transition-[padding,transform,box-shadow,background-color] duration-500 ease-out",
					isCompact ? "px-8 sm:px-10 py-2.5" : "px-8 sm:px-10 py-4",
				)}
				style={{
					transform: `scale(${1 - scrollProgress * 0.02})`,
				}}
			>
				<a href="#about" className="inline-flex items-center gap-2 self-center lg:self-auto">
					<span className={cn("font-bold tracking-[0.08em] text-primary transition-all duration-300", isCompact ? "text-xl" : "text-2xl")}>
						Roxanne L.
					</span>
				</a>

				<nav className={cn("flex flex-wrap items-center justify-center transition-all duration-300", isCompact ? "gap-2" : "gap-3 sm:gap-4")}>
					{navItems.map((item) => (
						<AuraNavLink
							key={item.label}
							label={item.label}
							href={item.href}
							isCompact={isCompact}
						/>
					))}
				</nav>

				<div className={cn("flex flex-wrap items-center justify-center transition-all duration-300 lg:self-auto", isCompact ? "gap-2" : "gap-3")}>
					<MagneticButton
						href="/resume.pdf"
						download
						ariaLabel="Download Resume"
						className={cn(
							"inline-flex items-center gap-2 rounded-full border border-[#EF4444] bg-[#EF4444] font-semibold text-white shadow-[0_10px_24px_rgba(239,68,68,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(239,68,68,0.28)]",
							isCompact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
						)}
					>
						<ArrowDownToLine className="size-4" />
						<span>Download Resume</span>
					</MagneticButton>

					<MagneticButton
						href="mailto:hello@example.com"
						ariaLabel="Contact Me"
						className={cn(
							"inline-flex items-center gap-2 rounded-full border border-[#F97316] bg-[#F97316] font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(249,115,22,0.24)]",
							isCompact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
						)}
					>
						<Mail className="size-4" />
						<span>Contact Me</span>
					</MagneticButton>

					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={onThemeToggle}
						className={cn(
							"inline-flex items-center justify-center rounded-full border-border/80 bg-background/80 font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:bg-card hover:-translate-y-0.5",
							isCompact ? "size-10" : "h-11 px-4",
						)}
						aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
					>
						{theme === "dark" ? <SunMedium className="size-4 text-accent" /> : <MoonStar className="size-4 text-primary" />}
					</Button>
				</div>
			</div>
		</header>
	)
}

export { Navbar }