import { Helmet } from "react-helmet-async";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dakhin Tudu | Full-Stack Developer | Java & React.js Expert</title>
        <meta
          name="description"
          content="Portfolio of Dakhin Tudu - Full-Stack Developer specializing in Java Spring Boot and React.js. Building scalable web applications with modern technologies."
        />
        <meta
          name="keywords"
          content="Dakhin Tudu, Full-Stack Developer, Java Developer, React.js Developer, Spring Boot, Web Development, Portfolio"
        />
        <meta name="author" content="Dakhin Tudu" />
        <meta property="og:title" content="Dakhin Tudu | Full-Stack Developer" />
        <meta
          property="og:description"
          content="Full-Stack Developer specializing in Java Spring Boot and React.js"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://portfolio-daxin.netlify.app/" />
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Particle Background */}
        <ParticleBackground />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
