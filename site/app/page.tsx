import { Navbar } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { About } from "@/components/about"
import { Certificates } from "@/components/certificates"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-foreground selection:text-background">
      <Navbar />

      <main id="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
        {/* Top Executive Deck: Profile & GitHub Command Center (Side-by-side on Desktop) */}
        <Hero />

        {/* Main Workspace (2-Column Grid on Desktop, Natural flow on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-4 border-t border-border/60">
          {/* Primary Column (Left, 7 cols): Featured Projects & Experience */}
          <div className="lg:col-span-7 space-y-12 min-w-0">
            <Projects />
          </div>

          {/* Companion Column (Right, 5 cols): Certificates, Skills & Education */}
          <div className="lg:col-span-5 space-y-10 min-w-0 lg:border-l lg:border-border/60 lg:pl-8">
            <Certificates />
            <Skills />
            <About />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
