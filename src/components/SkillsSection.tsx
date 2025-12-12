import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 90, color: "from-cyan-400 to-blue-500" },
      { name: "TypeScript", level: 85, color: "from-blue-400 to-blue-600" },
      { name: "JavaScript", level: 90, color: "from-yellow-400 to-yellow-600" },
      { name: "HTML/CSS", level: 95, color: "from-orange-400 to-red-500" },
      { name: "Tailwind CSS", level: 88, color: "from-teal-400 to-cyan-500" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Java", level: 92, color: "from-red-400 to-red-600" },
      { name: "Spring Boot", level: 88, color: "from-green-400 to-green-600" },
      { name: "REST APIs", level: 90, color: "from-purple-400 to-purple-600" },
      { name: "Microservices", level: 82, color: "from-indigo-400 to-indigo-600" },
      { name: "SQL/MySQL", level: 85, color: "from-blue-400 to-cyan-500" },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git/GitHub", level: 90, color: "from-gray-400 to-gray-600" },
      { name: "Docker", level: 75, color: "from-blue-400 to-blue-600" },
      { name: "AWS", level: 70, color: "from-orange-400 to-orange-600" },
      { name: "Maven/Gradle", level: 80, color: "from-pink-400 to-pink-600" },
      { name: "Postman", level: 88, color: "from-orange-400 to-red-500" },
    ],
  },
];

const SkillBar = ({ skill, index, isInView }: { skill: { name: string; level: number; color: string }; index: number; isInView: boolean }) => (
  <motion.div
    className="space-y-2"
    initial={{ opacity: 0, x: -20 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
      <span className="text-xs text-muted-foreground">{skill.level}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${skill.level}%` } : {}}
        transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass-card p-6 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Circular Progress Indicators for Key Skills */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            { name: "Java", value: 92 },
            { name: "React.js", value: 90 },
            { name: "Spring Boot", value: 88 },
            { name: "TypeScript", value: 85 },
          ].map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center gap-3"
              whileHover={{ scale: 1.1 }}
            >
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    className="fill-none stroke-secondary"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    className="fill-none stroke-primary"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={isInView ? { strokeDashoffset: 251.2 - (251.2 * skill.value) / 100 } : {}}
                    transition={{ duration: 1.5, delay: 0.8 + index * 0.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{skill.value}%</span>
                </div>
              </div>
              <span className="text-sm font-medium text-muted-foreground">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
