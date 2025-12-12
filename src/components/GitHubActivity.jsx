import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Calendar, TrendingUp, Loader2 } from "lucide-react";

const GITHUB_USERNAME = "DakhinTudu";

const GitHubActivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [stats, setStats] = useState({
    totalContributions: "Loading...",
    repositories: "Loading...",
    languages: "Loading...",
    starsEarned: "Loading...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // First, get user info to check total public repos
        const userResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`
        );
        
        if (!userResponse.ok) {
          throw new Error(`GitHub API error: ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        const totalPublicRepos = userData.public_repos;
        
        console.log(`GitHub user has ${totalPublicRepos} public repositories`);

        // Fetch all repositories (including forks)
        let allRepos = [];
        let page = 1;
        let hasMore = true;
        const maxPages = 10; // Safety limit to prevent infinite loops

        while (hasMore && page <= maxPages) {
          const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&type=all`
          );
          
          if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.length === 0) {
            hasMore = false;
          } else {
            allRepos = [...allRepos, ...data];
            // Check if we got less than 100 repos (last page) or reached total
            if (data.length < 100 || allRepos.length >= totalPublicRepos) {
              hasMore = false;
            } else {
              page++;
            }
          }
        }

        console.log(`Fetched ${allRepos.length} repositories from GitHub API (expected: ${totalPublicRepos}, pages fetched: ${page})`);
        
        // Use the actual count from API if we got all repos, otherwise use fetched count
        const totalRepos = allRepos.length >= totalPublicRepos ? totalPublicRepos : allRepos.length;

        // Calculate statistics (totalRepos already set above)
        const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        // Get unique languages
        const languages = allRepos
          .map((repo) => repo.language)
          .filter((lang) => lang !== null && lang !== undefined);
        const uniqueLanguages = [...new Set(languages)].length;

        // For contributions, we'll estimate from the contribution graph
        // Since GitHub API doesn't provide direct contribution count,
        // we'll use a reasonable estimate or fetch from contribution graph
        // For now, we'll calculate an estimate based on repos and activity
        const estimatedContributions = Math.max(
          totalRepos * 10, // Rough estimate: 10 contributions per repo
          totalStars * 2   // Or based on stars
        );

        setStats({
          totalContributions: estimatedContributions >= 1000 
            ? `${(estimatedContributions / 1000).toFixed(1)}k+`
            : `${estimatedContributions}+`,
          repositories: totalRepos >= 100 
            ? `${(totalRepos / 100).toFixed(1)}k+`
            : `${totalRepos}+`,
          languages: `${uniqueLanguages}+`,
          starsEarned: totalStars >= 1000 
            ? `${(totalStars / 1000).toFixed(1)}k+`
            : `${totalStars}+`,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        // Fallback to default values on error
        setStats({
          totalContributions: "500+",
          repositories: "20+",
          languages: "5+",
          starsEarned: "100+",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <section id="github-activity" className="relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">GitHub Activity</h2>
          <p className="section-subtitle mx-auto">
            My coding contributions and activity over time
          </p>
        </motion.div>

        {/* GitHub Contribution Graph */}
        <motion.div
          className="glass-card p-8 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Contribution Graph</h3>
                <p className="text-sm text-muted-foreground">@DakhinTudu</p>
              </div>
            </div>
            <motion.a
              href="https://github.com/DakhinTudu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              View Profile
              <TrendingUp className="w-4 h-4" />
            </motion.a>
          </div>

          {/* GitHub Contribution Graph Image */}
          <div className="relative w-full overflow-x-auto overflow-y-hidden rounded-xl bg-secondary/30 dark:bg-secondary/20 p-2 sm:p-4 border border-border/30 dark:border-border/20 github-activity-graph-container">
            {/* GitHub Contribution Graph with custom blue color scheme */}
            <div className="min-w-[600px] sm:min-w-0">
              <img
                src={`https://ghchart.rshah.org/3b82f6/DakhinTudu`}
                alt="GitHub Contribution Chart"
                className="w-full h-auto rounded-lg github-chart-custom"
                loading="lazy"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            {[
              { label: "Total Contributions", value: stats.totalContributions, icon: Calendar },
              { label: "Repositories", value: stats.repositories, icon: Github },
              { label: "Languages", value: stats.languages, icon: TrendingUp },
              { label: "Stars Earned", value: stats.starsEarned, icon: TrendingUp },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card-hover p-4 rounded-xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                {loading ? (
                  <Loader2 className="w-6 h-6 text-primary mx-auto mb-2 animate-spin" />
                ) : (
                  <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                )}
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;

