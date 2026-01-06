import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Loader2, Briefcase, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const languageColors = {
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
  const [activeTab, setActiveTab] = useState("clients"); // Default to clients
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [languages, setLanguages] = useState(["All"]);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        // Use GraphQL API to get pinned repositories
        const query = `
          query {
            user(login: "balaram2002") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    id
                    name
                    description
                    url
                    homepageUrl
                    stargazers {
                      totalCount
                    }
                    forks {
                      totalCount
                    }
                    primaryLanguage {
                      name
                    }
                    repositoryTopics(first: 5) {
                      nodes {
                        topic {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        // GraphQL API often requires authentication, so let's use REST API directly
        // which is more reliable for public repos
        const response = await fetch(
          "https://api.github.com/users/balaram2002/repos?sort=updated&per_page=30&type=all"
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        // Sort by popularity (stars + forks) and take top 6
        const sortedRepos = data
          .sort((a, b) => {
            const scoreA = a.stargazers_count + a.forks_count;
            const scoreB = b.stargazers_count + b.forks_count;
            return scoreB - scoreA;
          })
          .slice(0, 6);
        
        setRepos(sortedRepos);

        // Extract unique languages from repos
        const langs = sortedRepos
          .map((repo) => repo.language)
          .filter((lang) => lang !== null);
        const uniqueLangs = [...new Set(langs)];
        setLanguages(["All", ...uniqueLangs]);
      } catch (error) {
        console.error("Error fetching repos:", error);
        // Set empty state
        setRepos([]);
        setLanguages(["All"]);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
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
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle mx-auto">
            {activeTab === "clients" 
              ? "Freelancing projects and client work" 
              : "Pinned repositories from my GitHub profile"}
          </p>
        </motion.div>

        {/* Segmented Toggle Control */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="relative inline-flex p-1.5 rounded-full bg-primary/30 border border-primary/40 backdrop-blur-sm shadow-lg">
            {/* Sliding Indicator */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-background dark:bg-white shadow-md"
              initial={{
                left: activeTab === "clients" ? "0.375rem" : "50%",
                width: "calc(50% - 0.375rem)",
              }}
              animate={{
                left: activeTab === "clients" ? "0.375rem" : "50%",
                width: "calc(50% - 0.375rem)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            
            {/* Toggle Buttons */}
            <button
              onClick={() => setActiveTab("clients")}
              className={`relative z-10 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-colors min-w-[80px] sm:min-w-[100px] ${
                activeTab === "clients"
                  ? "text-primary"
                  : "text-muted-foreground dark:text-gray-200"
              }`}
            >
              Client
            </button>
            <button
              onClick={() => setActiveTab("personal")}
              className={`relative z-10 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-colors min-w-[80px] sm:min-w-[100px] ${
                activeTab === "personal"
                  ? "text-primary"
                  : "text-muted-foreground dark:text-gray-200"
              }`}
            >
              Personal
            </button>
          </div>
        </motion.div>

        {/* Content Area - Same space for both tabs */}
        <AnimatePresence mode="wait">
          {activeTab === "clients" ? (
            <motion.div
              key="clients"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Clients Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Briefcase,
                    label: "Projects Delivered",
                    value: "5+",
                    description: "Successful client projects",
                    color: "text-blue-500",
                  },
                  {
                    icon: Users,
                    label: "Happy Clients",
                    value: "3+",
                    description: "Satisfied customers",
                    color: "text-green-500",
                  },
                  {
                    icon: Award,
                    label: "Success Rate",
                    value: "98%",
                    description: "Project completion rate",
                    color: "text-yellow-500",
                  },
                  {
                    icon: TrendingUp,
                    label: "Years Experience",
                    value: "2+",
                    description: "In freelancing",
                    color: "text-purple-500",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass-card-hover p-6 rounded-2xl text-center relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className={`inline-flex p-4 rounded-xl bg-primary/10 mb-4 ${stat.color}`}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground dark:text-white mb-2 relative z-10">{stat.value}</h3>
                    <p className="text-sm font-semibold text-foreground dark:text-gray-100 mb-1 relative z-10">{stat.label}</p>
                    <p className="text-xs text-muted-foreground dark:text-gray-300 relative z-10">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}

              {/* No Projects Message */}
              {!loading && filteredRepos.length === 0 && (
                <div className="flex flex-col justify-center items-center py-20 text-center">
                  <Github className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {repos.length === 0 
                      ? "Unable to fetch repositories. Please check your GitHub connection."
                      : "No projects match the selected filter."}
                  </p>
                  {repos.length === 0 && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="glass-card hover:glow-border rounded-xl"
                      onClick={() => {
                        setLoading(true);
                        // Retry fetching
                        const fetchPinnedRepos = async () => {
                          try {
                          const fallbackResponse = await fetch(
                            "https://api.github.com/users/balaram2002/repos?sort=updated&per_page=30"
                          );
                            const fallbackData = await fallbackResponse.json();
                            
                            const sortedRepos = fallbackData
                              .sort((a, b) => {
                                const scoreA = a.stargazers_count + a.forks_count;
                                const scoreB = b.stargazers_count + b.forks_count;
                                return scoreB - scoreA;
                              })
                              .slice(0, 6);
                            
                            setRepos(sortedRepos);

                            const langs = sortedRepos
                              .map((repo) => repo.language)
                              .filter((lang) => lang !== null);
                            const uniqueLangs = [...new Set(langs)];
                            setLanguages(["All", ...uniqueLangs]);
                          } catch (error) {
                            console.error("Error fetching repos:", error);
                          } finally {
                            setLoading(false);
                          }
                        };
                        fetchPinnedRepos();
                      }}
                    >
                      Retry
                    </Button>
                  )}
                </div>
              )}

              {/* Projects Grid */}
              {!loading && filteredRepos.length > 0 && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
                      className="glass-card-hover p-4 sm:p-6 flex flex-col h-full w-full"
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ y: -8 }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {repo.language && (
                            <span
                              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                                languageColors[repo.language] || languageColors.default
                              }`}
                            />
                          )}
                          <span className="text-xs text-muted-foreground truncate">
                            {repo.language || "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground flex-shrink-0">
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
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-1">
                        {repo.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 flex-grow line-clamp-2 sm:line-clamp-3">
                        {repo.description || "No description available"}
                      </p>

                      {/* Topics */}
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 sm:gap-3 mt-auto pt-3 sm:pt-4 border-t border-border/50">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 glass-card hover:glow-border text-xs sm:text-sm px-2 sm:px-4"
                          asChild
                        >
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Code
                          </a>
                        </Button>
                        {repo.homepage && (
                          <Button
                            size="sm"
                            className="flex-1 glow-button text-xs sm:text-sm px-2 sm:px-4"
                            asChild
                          >
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                ))}
                </motion.div>
              )}

              {/* View More Button - Only for Personal Projects */}
              {!loading && filteredRepos.length > 0 && repos.length > 0 && (
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
                      href="https://github.com/balaram2002?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View All Projects on GitHub
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;

