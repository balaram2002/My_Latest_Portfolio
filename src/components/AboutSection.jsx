import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Rocket, Lightbulb } from "lucide-react";

const strengths = [
  {
    icon: Server,
    title: "Backend Specialist",
    description: "Building scalable REST APIs and microservices with Spring Boot",
  },
  {
    icon: Code2,
    title: "Java Expert",
    description: "Proficient in Core Java, OOP, Collections, Multithreading & Java 8",
  },
  {
    icon: Rocket,
    title: "Performance Optimizer",
    description: "Optimized Redis caching to maintain <100ms API responses",
  },
  {
    icon: Lightbulb,
    title: "Microservices Architect",
    description: "Designing distributed systems with Eureka, API Gateway & Redis",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            Passionate developer crafting digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Avatar & Info */}
          <motion.div
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Avatar */}
            <div className="relative group">
              {/* Animated Gradient Border */}
              <motion.div
                className="absolute -inset-1 rounded-full opacity-75 blur-md bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              
              {/* Profile Image Container */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-[4px] bg-background overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                {/* Inner Gradient Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin-slow" />
                
                {/* Image Wrapper */}
                <div className="absolute inset-[4px] rounded-full overflow-hidden bg-background">
                  <img
                    src="./profile.png"
                    alt="Balaram Gochhayat"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                  />
                </div>
              </motion.div>

              {/* Floating Decoration Particles */}
              <motion.div
                className="absolute -top-6 -right-6 w-3 h-3 bg-purple-500 rounded-full blur-sm"
                animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/2 -left-8 w-2 h-2 bg-pink-500 rounded-full blur-sm"
                animate={{ x: [0, -10, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute -bottom-4 right-10 w-2 h-2 bg-blue-500 rounded-full blur-sm"
                animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
              />
            </div>

            {/* Bio */}
            <div className="text-center space-y-4 max-w-lg">
              <h3 className="text-2xl font-bold text-foreground">
                Java Spring Boot Developer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Java Spring Boot Developer with hands-on experience in building scalable REST APIs and microservices. 
                Proficient in Java, Spring Boot, Spring Data JPA, and MySQL/PostgreSQL. Skilled in optimizing backend 
                performance and building scalable distributed systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently working as a Software Developer at Tatwa Technologies, developing microservices for the 
                Litigation Management System. Passionate about building efficient, high-performance backend systems 
                and continuously learning new technologies.
              </p>
            </div>
          </motion.div>

          {/* Strengths Grid */}
          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {strengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                className="glass-card-hover p-6 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <strength.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  {strength.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

