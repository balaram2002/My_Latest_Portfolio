import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Full-Stack Developer",
    organization: "Freelance / Personal Projects",
    period: "2023 - Present",
    description:
      "Building scalable web applications using React.js and Spring Boot. Developing RESTful APIs, implementing microservices architecture, and creating responsive user interfaces.",
    skills: ["React.js", "Spring Boot", "REST APIs", "MySQL"],
  },
  {
    type: "work",
    title: "Web Developer Intern",
    organization: "Tech Company",
    period: "2022 - 2023",
    description:
      "Contributed to frontend development using React.js. Collaborated with senior developers on backend integration and learned industry best practices.",
    skills: ["React.js", "JavaScript", "Git", "Agile"],
  },
];

const education = [
  {
    type: "education",
    title: "Bachelor's in Computer Science",
    organization: "University",
    period: "2020 - 2024",
    description:
      "Focused on software engineering, data structures, algorithms, and web technologies. Completed multiple projects in Java and web development.",
    skills: ["Java", "DSA", "DBMS", "Web Development"],
  },
];

const certifications = [
  {
    type: "certification",
    title: "Java Programming Certification",
    organization: "Online Platform",
    period: "2023",
    description: "Comprehensive certification covering core Java, OOP concepts, and advanced Java features.",
  },
  {
    type: "certification",
    title: "React.js Developer Certification",
    organization: "Online Platform",
    period: "2023",
    description: "Advanced React concepts including hooks, context, and state management.",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "work":
      return Briefcase;
    case "education":
      return GraduationCap;
    case "certification":
      return Award;
    default:
      return Briefcase;
  }
};

const TimelineItem = ({
  item,
  index,
  isInView,
  isLeft,
}: {
  item: {
    type: string;
    title: string;
    organization: string;
    period: string;
    description: string;
    skills?: string[];
  };
  index: number;
  isInView: boolean;
  isLeft: boolean;
}) => {
  const Icon = getIcon(item.type);

  return (
    <motion.div
      className={`flex items-center gap-8 ${isLeft ? "lg:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2 }}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "lg:text-right" : ""}`}>
        <motion.div
          className="glass-card-hover p-6 space-y-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className={`flex items-center gap-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-primary font-medium">{item.period}</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
          <p className="text-muted-foreground font-medium">{item.organization}</p>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          {item.skills && (
            <div className={`flex flex-wrap gap-2 ${isLeft ? "lg:justify-end" : ""}`}>
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="hidden lg:flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-primary glow-border"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.1 }}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allItems = [...experiences, ...education, ...certifications];

  return (
    <section id="experience" className="relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1 }}
          />

          {/* Timeline Items */}
          <div className="space-y-8 lg:space-y-12">
            {allItems.map((item, index) => (
              <TimelineItem
                key={`${item.type}-${index}`}
                item={item}
                index={index}
                isInView={isInView}
                isLeft={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
