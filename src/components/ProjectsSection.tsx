import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
}

const languageColors: Record<string, string> = {
  Java: "bg-red-500",
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-green-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  React: "bg-cyan-400",
  default: "bg-gray-400",
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [languages, setLanguages] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/DakhinTudu/repos?sort=updated&per_page=12"
        );
        const data = await response.json();
        setRepos(data);

        // Extract unique languages
        const langs: string[] = data
          .map((repo: GitHubRepo) => repo.language)
          .filter((lang: string | null): lang is string => lang !== null);
        const uniqueLangs = [...new Set(langs)] as string[];
        setLanguages(["All", ...uniqueLangs]);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filteredRepos =
    filter === "All"
      ? repos
      : repos.filter((repo) => repo.language === filter);

  return (
    <section id="projects" className="relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle mx-auto">
            Explore my latest work fetched directly from GitHub
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {languages.map((lang) => (
            <Button
              key={lang}
              variant={filter === lang ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(lang)}
              className={`rounded-full transition-all ${
                filter === lang ? "glow-button" : "glass-card hover:glow-border"
              }`}
            >
              {lang}
            </Button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredRepos.map((repo) => (
              <motion.div
                key={repo.id}
                className="glass-card-hover p-6 flex flex-col h-full"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <span
                        className={`w-3 h-3 rounded-full ${
                          languageColors[repo.language] || languageColors.default
                        }`}
                      />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {repo.language || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
                  {repo.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                  {repo.description || "No description available"}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 glass-card hover:glow-border"
                    asChild
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {repo.homepage && (
                    <Button
                      size="sm"
                      className="flex-1 glow-button"
                      asChild
                    >
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Button */}
        {!loading && repos.length > 0 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="glass-card hover:glow-border rounded-xl"
              asChild
            >
              <a
                href="https://github.com/DakhinTudu?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All Projects on GitHub
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
