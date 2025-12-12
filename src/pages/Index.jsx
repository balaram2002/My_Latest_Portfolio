import { Helmet } from "react-helmet-async";
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

const Index = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Dakhin Tudu | Full-Stack Developer | Java Spring Boot & React.js Expert</title>
        <meta
          name="title"
          content="Dakhin Tudu | Full-Stack Developer | Java Spring Boot & React.js Expert"
        />
        <meta
          name="description"
          content="Portfolio of Dakhin Tudu - Full-Stack Developer specializing in Java Spring Boot, React.js, Microservices, and RESTful APIs. Building scalable web applications with modern technologies. 2+ years of experience in backend development and full-stack solutions."
        />
        <meta
          name="keywords"
          content="Dakhin Tudu, Full-Stack Developer, Java Developer, React.js Developer, Spring Boot, Microservices, RESTful APIs, PostgreSQL, Docker, Hibernate, Spring Framework, Backend Developer, Frontend Developer, Web Development, Portfolio, Software Engineer, Java Spring Boot Developer, React Developer, Full Stack Engineer"
        />
        <meta name="author" content="Dakhin Tudu" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio-daxin.netlify.app/" />
        <meta property="og:title" content="Dakhin Tudu | Full-Stack Developer | Java Spring Boot & React.js Expert" />
        <meta
          property="og:description"
          content="Full-Stack Developer specializing in Java Spring Boot, React.js, Microservices, and RESTful APIs. Building scalable web applications with modern technologies."
        />
        <meta property="og:image" content="https://portfolio-daxin.netlify.app/profile.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Dakhin Tudu Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://portfolio-daxin.netlify.app/" />
        <meta name="twitter:title" content="Dakhin Tudu | Full-Stack Developer | Java Spring Boot & React.js Expert" />
        <meta
          name="twitter:description"
          content="Full-Stack Developer specializing in Java Spring Boot, React.js, Microservices, and RESTful APIs."
        />
        <meta name="twitter:image" content="https://portfolio-daxin.netlify.app/profile.png" />
        <meta name="twitter:creator" content="@dakhin_tudu" />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="canonical" href="https://portfolio-daxin.netlify.app/" />
        
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
              "name": "Dakhin Tudu",
              "jobTitle": "Full-Stack Developer",
              "url": "https://portfolio-daxin.netlify.app/",
              "sameAs": [
                "https://github.com/DakhinTudu",
                "https://www.linkedin.com/in/dakhin-tudu-b3550821b/",
                "https://www.instagram.com/daxin_tudu/"
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
              "email": "dtudu195@gamil.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bhubaneswar",
                "addressCountry": "India"
              }
            })
          }}
        />
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Particle Background - Scrolls with page content */}
        <ParticleBackground />
        
        {/* Cursor Gradient Effect */}
        <CursorGradient />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
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

