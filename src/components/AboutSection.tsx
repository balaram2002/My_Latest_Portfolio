import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Rocket, Lightbulb } from "lucide-react";

const strengths = [
  {
    icon: Code2,
    title: "Frontend Expert",
    description: "Building responsive, interactive UIs with React.js & modern CSS",
  },
  {
    icon: Server,
    title: "Backend Specialist",
    description: "Developing robust APIs with Java Spring Boot & microservices",
  },
  {
    icon: Rocket,
    title: "Full-Stack Capable",
    description: "End-to-end development from database to deployment",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Analytical thinking & creative solutions for complex challenges",
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
            className="flex flex-col items-center lg:items-start space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Avatar */}
            <div className="relative">
              <motion.div
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl glass-card p-2 animate-pulse-glow"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-6xl md:text-8xl font-bold gradient-text">DT</span>
                </div>
              </motion.div>
              {/* Floating decoration */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/50 rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
            </div>

            {/* Bio */}
            <div className="text-center lg:text-left space-y-4 max-w-lg">
              <h3 className="text-2xl font-bold text-foreground">
                Full-Stack Developer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate Full-Stack Developer with expertise in Java Spring Boot 
                and React.js. I love building scalable web applications that solve 
                real-world problems. With a strong foundation in both frontend and 
                backend technologies, I create seamless user experiences powered by 
                robust server-side architectures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, I'm exploring new technologies, contributing to 
                open-source projects, and continuously learning to stay ahead in the 
                ever-evolving tech landscape.
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
