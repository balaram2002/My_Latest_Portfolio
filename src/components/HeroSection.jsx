import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/balaram2002",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/balaram2002/",
  },
];

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="section-container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.p
            className="text-primary text-lg md:text-xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="gradient-text glow-text">Balaram Gochhayat</span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground h-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "Java & Spring Boot Expert",
                2000,
                "React.js Developer",
                2000,
                "Problem Solver",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-medium"
            />
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card-hover rounded-xl group"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="pt-6"
          >
            <Button
              size="lg"
              className="glow-button text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl"
              asChild
            >
              <a
                href="https://drive.google.com/uc?export=download&id=1X7Q8HDZ5h_qP3Ig60xU3oWZR4JryLSyw"
                download="Balaram_Gochhayat_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity },
          }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;

