import { AboutSection }     from "../components/AboutSection";
import { ContactSection }   from "../components/ContactSection";
import { ExperienceSection} from "../components/ExperienceSection";
import { Footer }           from "../components/Footer";
import { HeroSection }     from "../components/HeroSection";
import { Navbar }          from "../components/Navbar";
import { PageLoader }      from "../components/PageLoader";
import { ProjectsSection } from "../components/ProjecctsSection";
import { ReviewsSection }  from "../components/ReviewsSection";
import { SkillsSection }   from "../components/SkillsSection";
import { StarBackground }  from "@/components/StarBackground";
import { WhatsAppButton }  from "../components/WhatsAppButton";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <PageLoader />
      <StarBackground />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ReviewsSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};