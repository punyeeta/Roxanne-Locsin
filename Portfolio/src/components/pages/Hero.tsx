import { BookOpen, BriefcaseBusiness, Clock3, GraduationCap, MapPinned, Sparkles } from "lucide-react"

import portrait from "@/assets/Roxanne.png"

function Hero() {
	const cards = [
		{
			gradient: "from-[#F2322E] to-[#EF4444]",
			icon: (
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
				</svg>
			),
			title: "Core Interests",
			content: (
				<ul className="space-y-1.5">
					{["Web Development", "Software Engineering", "System Design", "Data Visualization", "Human-Centered Design", "Research & Innovation"].map(item => (
						<li key={item} className="flex items-center gap-2 text-sm text-white/85">
							<span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
							{item}
						</li>
					))}
				</ul>
			),
		},
		{
			gradient: "from-[#F59E0B] to-[#FFB436]",
			icon: (
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
				</svg>
			),
			title: "Personal Values",
			content: (
				<ul className="space-y-1.5">
					{["Continuous Learning", "Problem Solving", "Collaboration", "Attention to Detail", "Building Useful Solutions"].map(item => (
						<li key={item} className="flex items-center gap-2 text-sm text-white/85">
							<span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
							{item}
						</li>
					))}
				</ul>
			),
		},
		{
			gradient: "from-[#EA580C] to-[#F97316]",
			icon: (
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
				</svg>
			),
			title: "Tech Stacks",
			content: (
				<div className="flex flex-wrap gap-1.5 justify-center">
					{["React", "Vite", "Tailwind CSS", "Python", "JavaScript", "TypeScript"].map(item => (
						<span key={item} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/15 text-white border border-white/20">
							{item}
						</span>
					))}
				</div>
			),
		},
	]

	return (
		<section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24 lg:pt-6">
			<style>{`
				.name-animate {
					background: linear-gradient(90deg, #374151 0%, #6B7280 30%, #DC2626 65%, #F59E0B 100%);
					background-size: 200% 100%;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					animation: nameShift 9s linear infinite;
					display: inline-block;
				}

				.dark .name-animate {
					background: linear-gradient(90deg, #F3F4F6 0%, #FBBF24 40%, #EF4444 70%, #F3F4F6 100%);
					background-size: 200% 100%;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					animation: nameShift 9s linear infinite;
				}

				@keyframes nameShift {
					0%   { background-position: 0% 50%; }
					50%  { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}

				.stat-card::after {
					content: "";
					position: absolute;
					inset: 0;
					background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
					pointer-events: none;
					border-radius: inherit;
					opacity: 0.5;
				}

				.stat-icon-wrap {
					position: absolute;
					top: 16px;
					left: 16px;
					width: 40px;
					height: 40px;
					border-radius: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(255,255,255,0.15);
					border: 1px solid rgba(255,255,255,0.2);
					z-index: 2;
					transition: transform 600ms cubic-bezier(.2,.9,.25,1), opacity 400ms ease;
				}

				.stat-card:hover .stat-icon-wrap {
					transform: translateY(-180%);
					opacity: 0;
				}

				.card-title {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					margin: 0;
					z-index: 1;
					font-size: 0.9rem;
					font-weight: 700;
					letter-spacing: .1em;
					text-transform: uppercase;
					color: white;
					white-space: nowrap;
					transition: top 650ms cubic-bezier(.2,.9,.25,1), transform 650ms cubic-bezier(.2,.9,.25,1);
					text-shadow: 0 1px 8px rgba(0,0,0,0.2);
				}

				.stat-card:hover .card-title {
					top: 20px;
					transform: translate(-50%, 0);
				}

				.card-content {
					position: absolute;
					left: 16px;
					right: 16px;
					bottom: 16px;
					top: 52px;
					opacity: 0;
					transform: translateY(10px);
					z-index: 1;
					transition: opacity 800ms cubic-bezier(.2,.9,.25,1) 50ms,
					            transform 800ms cubic-bezier(.2,.9,.25,1) 50ms;
					pointer-events: none;
					display: flex;
					align-items: flex-start;
				}

				.stat-card:hover .card-content {
					opacity: 1;
					transform: translateY(0);
					pointer-events: auto;
				}

				.dot-accent {
					width: 6px;
					height: 6px;
					border-radius: 9999px;
					background: rgba(255,255,255,0.7);
					flex-shrink: 0;
				}
			`}</style>

			<div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-36">
				{/* Left column */}
				<div className="flex flex-col items-center gap-4">
					<div className="relative h-[18rem] w-[18rem] rounded-full bg-[#F59E0B] shadow-[0_20px_60px_rgba(249,115,22,0.18)] sm:h-[22rem] sm:w-[22rem] lg:h-[25rem] lg:w-[25rem]">
						<div className="absolute inset-[10px] rounded-full border border-white/20 bg-white/10 backdrop-blur-sm" />
						<div className="absolute inset-[18px] overflow-hidden rounded-full border border-black/5 bg-[#F59E0B]">
							<img
								src={portrait}
								alt="Roxanne Locsin portrait"
								className="h-full w-full object-cover object-center scale-[1.02]"
							/>
						</div>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-[28rem] mx-auto">
						{[
							{ icon: <Clock3 className="h-4 w-4" />, label: "Based in the Philippines" },
							{ icon: <GraduationCap className="h-4 w-4" />, label: "BS Computer Science" },
							{ icon: <MapPinned className="h-4 w-4" />, label: "USTP - CDO" },
							{ icon: <BriefcaseBusiness className="h-4 w-4" />, label: "Open to Internships" },
							{ icon: <Sparkles className="h-4 w-4" />, label: "Entry-Level Opportunities" },
							{ icon: <BookOpen className="h-4 w-4" />, label: "Software Engineering" },
						].map(({ icon, label }) => (
							<span
								key={label}
								className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm font-medium text-[#6B7280]"
							>
								<span className="text-[#F59E0B] dark:text-[#FBBF24]">{icon}</span>
								{label}
							</span>
						))}
					</div>
				</div>

				{/* Right column */}
				<div className="space-y-8">
					<div className="space-y-4">
						<h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
							<span className="name-animate">Roxanne Locsin</span>
						</h1>
					</div>

					<div className="prose max-w-2xl text-base leading-7 text-foreground/90 sm:text-lg">
						<p className="mb-6">
							I am a Computer Science student passionate about building practical software solutions that create real value for users. My experience includes developing web applications, academic systems, data-driven projects, and research initiatives focused on solving complex problems through technology.
						</p>
						<p>
							I enjoy combining technical knowledge with creativity to design applications that are functional, efficient, and user-friendly. As I continue to grow as a developer, I am committed to learning new technologies, improving my craft, and contributing to projects that make a meaningful impact.
						</p>
					</div>

					{/* Cards */}
					<div className="grid grid-cols-3 gap-4">
						{cards.map(({ gradient, icon, title, content }) => (
							<div
								key={title}
								className={`stat-card group relative rounded-xl border border-white/60 bg-gradient-to-br ${gradient} shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] w-full aspect-[4/5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70`}
							>
								<div className="stat-icon-wrap">{icon}</div>
								<h3 className="card-title">{title}</h3>
								<div className="card-content">{content}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="mx-auto mt-14 max-w-7xl">
				<div id="about" className="sr-only">About</div>
				<div id="skills" className="sr-only">Skills</div>
				<div id="projects" className="sr-only">Projects</div>
			</div>
		</section>
	)
}

export { Hero }