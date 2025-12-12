import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SiSpringboot, SiMysql, SiGit, SiPostgresql, SiDocker, SiHibernate, SiReact, SiJavascript } from "react-icons/si";
import { FaJava, FaGithub } from "react-icons/fa";

const skills = [
  { name: "Java", icon: FaJava, color: "#f89820" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  { name: "Spring Framework", icon: SiSpringboot, color: "#6db33f" },
  { name: "React.js", icon: SiReact, color: "#61dafb" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "SQL", icon: SiMysql, color: "#4479a1" },
  { name: "Git/GitHub", icon: SiGit, color: "#f05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Hibernate", icon: SiHibernate, color: "#59666c" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 bg-background/50" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="section-subtitle mx-auto">
            My tech stack is built for performance and scalability.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.1,
                y: -8,
              }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center gap-4 group border-2 border-white/10 hover:border-opacity-100 hover:bg-white/10 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl relative overflow-hidden"
              style={{
                "--skill-color": skill.color,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-[var(--skill-color)]/10 group-hover:to-[var(--skill-color)]/5 transition-all duration-500" />
              
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <skill.icon
                  className="w-14 h-14 transition-all duration-300 relative z-10 group-hover:drop-shadow-[0_0_20px_var(--skill-color)]"
                  style={{ color: skill.color }}
                />
              </motion.div>
              
              <span className="font-semibold group-hover:text-foreground transition-colors relative z-10 text-sm text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
