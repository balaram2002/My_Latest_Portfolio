import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Software Developer",
    organization: "Tatwa Technologies | Bhubaneswar",
    period: "Dec 2025 – Present",
    description:
      "Developing microservices for the Litigation Management System (orrisalms.in) using Spring Boot and PgSQL. Migrated legacy data to the new database design using a Spring Boot ETL pipeline. Optimized Redis caching to maintain <100 ms API responses and reduce DB load by 50%+. Strengthened RBAC security, JWT handling, and multi-role access flows. Improved service reliability with Eureka, API Gateway, and fault-tolerant routing.",
    skills: ["Spring Boot", "PostgreSQL", "Redis", "Microservices", "Eureka", "API Gateway", "JWT", "RBAC"],
  },
  {
    type: "work",
    title: "Java Developer Trainee",
    organization: "Tatwa Technologies | Bhubaneswar",
    period: "Sep 2025 – Dec 2025",
    description:
      "Supported migration of legacy modules into Spring Boot microservices. Assisted with API development, caching setup, authentication flow, and data preparation.",
    skills: ["Spring Boot", "REST APIs", "Redis", "Authentication", "Data Migration"],
  },
  {
    type: "work",
    title: "Java Full Stack Developer Intern",
    organization: "Upskalor Technologies | Bhubaneswar",
    period: "Jan 2025 - Sep 2025",
    description:
      "Hands-on training in Java, J2EE, Hibernate, MySQL, Spring Boot. Built full-stack projects using MVC architecture, REST API development, and database integration.",
    skills: ["Java", "J2EE", "Hibernate", "MySQL", "Spring Boot", "MVC", "REST APIs", "Git", "Maven"],
  },
];

const education = [
  {
    type: "education",
    title: "Master of Computer Applications (MCA)",
    organization: "Gandhi Institute for Technology (GIFT), Bhubaneswar",
    period: "Sep 2023 – May 2025",
    description:
      "Completed MCA with focus on software development, and web technologies. Aggregate: 75%.",
    skills: ["Java", "Algorithms", "Web Technologies", "Software Development"],
  },
  {
    type: "education",
    title: "Bachelor of Science (B.Sc)",
    organization: "Om Shanti College, Kendrapara, Odisha",
    period: "Jul 2019 – May 2022",
    description: "Aggregate: 81%.",
    skills: ["Mathematics", "Computer Science", "Problem Solving"],
  },
];

const certifications = [

  {
    type: "certification",
    title: "Merit Certificate",
    organization: "College SIP 2024",
    period: "2024",
    description:
      "Secured 1st position in the Summer Internship Program (SIP) 2024.",
    skills: ["Achievement"],
  },
];

const getIcon = (type) => {
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

const TimelineItem = ({ item, index, isInView, isLeft }) => {
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

