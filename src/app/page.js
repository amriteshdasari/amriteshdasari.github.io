import NavBar from './Components/NavBar'
import HeroSection from './Components/HeroSection'
import AboutSection from './Components/AboutSection'
import SkillsSection from './Components/SkillsSection'
import ExperienceSection from './Components/ExperienceSection'
import FeaturedProjects from './Components/FeaturedProjects'
import ContactSection from './Components/ContactSection'

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="relative z-10 overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <FeaturedProjects />
        <ContactSection />
      </main>
    </>
  )
}
