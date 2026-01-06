import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import CursorGradient from "@/components/CursorGradient";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import GitHubActivity from "@/components/GitHubActivity";
import SocialMediaFeed from "@/components/SocialMediaFeed";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Balaram Gochhayat | Full-Stack Developer | Java Spring Boot & React.js Expert</title>
        <meta
          name="title"
          content="Balaram Gochhayat | Full-Stack Developer | Java Spring Boot & React.js Expert"
        />
        <meta
          name="description"
          content="Portfolio of Balaram Gochhayat - Full-Stack Developer specializing in Java Spring Boot, React.js, Microservices, and RESTful APIs. Building scalable web applications with modern technologies. 2+ years of experience in backend development and full-stack solutions."
        />
        <meta
          name="keywords"
          content="Balaram Gochhayat, Full-Stack Developer, Java Developer, React.js Developer, Spring Boot, Microservices, RESTful APIs, PostgreSQL, Docker, Hibernate, Spring Framework, Backend Developer, Frontend Developer, Web Development, Portfolio, Software Engineer, Java Spring Boot Developer, React Developer, Full Stack Engineer"
        />
        <meta name="author" content="Balaram Gochhayat" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balaramportfolio.netlify.app/" />
        <meta property="og:title" content="Balaram Gochhayat | Full-Stack Developer | Java Spring Boot & React.js Expert" />
        <meta
          property="og:description"
          content="Full-Stack Developer specializing in Java Spring Boot, React.js, Microservices, and RESTful APIs. Building scalable web applications with modern technologies."
        />
        <meta property="og:image" content="https://balaramportfolio.netlify.app/profile.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Balaram Gochhayat Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://balaramportfolio.netlify.app/" />
        <meta name="twitter:title" content="Balaram Gochhayat | Full-Stack Developer | Java Spring Boot & React.js Expert" />
        <meta
          name="twitter:description"
          content="Full-Stack Developer specializing in Java Spring Boot, React.js, Microservices, and RESTful APIs."
        />
        <meta name="twitter:image" content="https://balaramportfolio.netlify.app/profile.png" />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="canonical" href="https://balaramportfolio.netlify.app/" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/profile.png" />
        <link rel="apple-touch-icon" href="/profile.png" />
        <link rel="shortcut icon" href="/profile.png" />
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Balaram Gochhayat",
              "jobTitle": "Full-Stack Developer",
              "url": "https://balaramportfolio.netlify.app/",
              "sameAs": [
                "https://github.com/balaram2002",
                "https://www.linkedin.com/in/balaram2002/"
              ],
              "knowsAbout": [
                "Java",
                "Spring Boot",
                "React.js",
                "JavaScript",
                "PostgreSQL",
                "Docker",
                "Microservices",
                "RESTful APIs"
              ],
              "email": "balaramgochhayat2002@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bhubaneswar",
                "addressCountry": "India"
              }
            })
          }}
        />
      </Helmet>

      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Particle Background - Scrolls with page content */}
        <ParticleBackground />
        
        {/* Cursor Gradient Effect */}
        <CursorGradient />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <GitHubActivity />
          {/* <SocialMediaFeed /> */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;

