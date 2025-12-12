import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, ExternalLink, Heart, MessageCircle, ChevronLeft, ChevronRight, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstagramEmbed, LinkedInEmbed } from "react-social-media-embed";

// Instagram post URLs
// Extracted from embed blocks - clean URLs without query parameters
const instagramPosts = [
  "https://www.instagram.com/p/DLy4RcoRvBP/",
  "https://www.instagram.com/p/DSGq1FWk0fl/",
];

// LinkedIn post URLs - Add your LinkedIn post URLs here
// To get a post URL: 
// 1. Open LinkedIn post in browser
// 2. Click three dots (...) on the post
// 3. Select "Copy link to post"
// 4. Paste the URL here
// Format: https://www.linkedin.com/posts/username_activity-1234567890-abcdef
// Or use embed URLs: https://www.linkedin.com/embed/feed/update/urn:li:share:...
const linkedInPosts = [
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7388530622073348096",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7405183024256045057",
  "https://www.linkedin.com/embed/feed/update/urn:li:share:7404322178600615938",
];

// Helper function to extract post ID from URL
const getPostId = (url) => {
  const match = url.match(/\/p\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
};

// Fetch Instagram post metadata using oEmbed API
const fetchInstagramData = async (postUrl) => {
  try {
    const cleanUrl = postUrl.split('?')[0];
    const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(cleanUrl)}`;
    
    const response = await fetch(oembedUrl, { mode: 'cors' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      caption: data.title || "Check out my latest post! 🚀",
      thumbnail: data.thumbnail_url || "",
      author: data.author_name || "daxin_tudu",
    };
  } catch (error) {
    console.error("Error fetching Instagram post data:", error);
    return {
      caption: "Check out my latest post! 🚀",
      thumbnail: "",
      author: "daxin_tudu",
    };
  }
};

// Fetch LinkedIn post metadata (placeholder - LinkedIn oEmbed requires authentication)
const fetchLinkedInData = async (postUrl) => {
  try {
    // LinkedIn oEmbed API requires authentication
    // For now, return placeholder data
    return {
      title: "Check out my latest professional update! 💼",
      author: "Dakhin Tudu",
    };
  } catch (error) {
    console.error("Error fetching LinkedIn post data:", error);
    return {
      title: "Check out my latest professional update! 💼",
      author: "Dakhin Tudu",
    };
  }
};

// Instagram Carousel Component
const InstagramCarousel = ({ posts, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full" style={{ aspectRatio: "1 / 1" }}>
        <motion.div
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full glass-card rounded-2xl p-8" style={{ aspectRatio: "1 / 1" }}>
        <Instagram className="w-16 h-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center mb-4">
          No Instagram posts available. Add post URLs in the component.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          To get post URLs: Open Instagram → Click three dots on a post → Copy Link
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ aspectRatio: "1 / 1" }}>
      <div className="relative glass-card rounded-2xl overflow-hidden w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Instagram Post Embed */}
            <div className="instagram-square-container">
              <div className="instagram-embed-wrapper">
                <InstagramEmbed
                  url={posts[currentIndex].url}
                  width="100%"
                  captioned={false}
                />
              </div>
            </div>

            {/* Overlay with caption, likes, and comments */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-10 backdrop-blur-sm">
              <p className="text-white text-sm font-medium mb-3 line-clamp-1 drop-shadow-lg">
                {posts[currentIndex].caption}
              </p>
              <div className="flex items-center gap-5 text-white">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  <span className="text-xs font-semibold">{posts[currentIndex].likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span className="text-xs font-semibold">{posts[currentIndex].comments.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {posts.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-card hover:glow-border z-10"
              onClick={prevPost}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-card hover:glow-border z-10"
              onClick={nextPost}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {posts.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// LinkedIn Carousel Component
const LinkedInCarousel = ({ posts, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full" style={{ aspectRatio: "1 / 1" }}>
        <motion.div
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full glass-card rounded-2xl p-8" style={{ aspectRatio: "1 / 1" }}>
        <Linkedin className="w-16 h-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center mb-4">
          No LinkedIn posts available. Add post URLs in the component.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          To get post URLs: Open LinkedIn → Click three dots on a post → Copy link to post
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ aspectRatio: "1 / 1" }}>
      <div className="relative glass-card rounded-2xl overflow-hidden w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* LinkedIn Post Embed */}
            <div className="instagram-square-container">
              <div className="instagram-embed-wrapper">
                {/* Check if URL is an embed URL or regular post URL */}
                {posts[currentIndex].url.includes('/embed/') ? (
                  <iframe
                    src={posts[currentIndex].url.replace('?collapsed=1', '')}
                    height="100%"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title="Embedded LinkedIn post"
                    className="w-full h-full"
                  />
                ) : (
                  <LinkedInEmbed
                    url={posts[currentIndex].url}
                    width="100%"
                  />
                )}
              </div>
            </div>

            {/* Overlay with title, likes, and comments */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-10 backdrop-blur-sm">
              <p className="text-white text-sm font-medium mb-3 line-clamp-1 drop-shadow-lg">
                {posts[currentIndex].title}
              </p>
              <div className="flex items-center gap-5 text-white">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 fill-blue-500 text-blue-500" />
                  <span className="text-xs font-semibold">{posts[currentIndex].likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span className="text-xs font-semibold">{posts[currentIndex].comments.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {posts.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-card hover:glow-border z-10"
              onClick={prevPost}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-card hover:glow-border z-10"
              onClick={nextPost}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {posts.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SocialMediaFeed = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [instagramData, setInstagramData] = useState([]);
  const [linkedInData, setLinkedInData] = useState([]);
  const [instagramLoading, setInstagramLoading] = useState(true);
  const [linkedInLoading, setLinkedInLoading] = useState(true);

  useEffect(() => {
    const loadInstagramData = async () => {
      setInstagramLoading(true);
      const data = await Promise.all(
        instagramPosts.map(async (url) => {
          const postData = await fetchInstagramData(url);
          const postId = getPostId(url);
          
          return {
            url,
            postId,
            caption: postData?.caption || "Check out my latest post! 🚀",
            likes: Math.floor(Math.random() * 500) + 50,
            comments: Math.floor(Math.random() * 50) + 5,
            thumbnail: postData?.thumbnail || "",
          };
        })
      );
      setInstagramData(data);
      setInstagramLoading(false);
    };

    const loadLinkedInData = async () => {
      setLinkedInLoading(true);
      const data = await Promise.all(
        linkedInPosts.map(async (url) => {
          const postData = await fetchLinkedInData(url);
          
          return {
            url,
            title: postData?.title || "Check out my latest professional update! 💼",
            likes: Math.floor(Math.random() * 200) + 20,
            comments: Math.floor(Math.random() * 30) + 3,
            author: postData?.author || "Dakhin Tudu",
          };
        })
      );
      setLinkedInData(data);
      setLinkedInLoading(false);
    };

    loadInstagramData();
    loadLinkedInData();
  }, []);

  return (
    <section id="social-media" className="relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Social Media Top Posts</h2>
          <p className="section-subtitle mx-auto">
            Latest updates from my social media profiles
          </p>
        </motion.div>

        {/* Instagram and LinkedIn Carousels Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
          {/* Instagram Carousel Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Instagram Posts</h3>
            </div>
            <div className="w-full" style={{ aspectRatio: "1 / 1" }}>
              <InstagramCarousel posts={instagramData} loading={instagramLoading} />
            </div>
            {/* View All Instagram Button */}
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="glass-card hover:glow-border rounded-xl"
                asChild
              >
                <a
                  href="https://www.instagram.com/daxin_tudu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  View All Instagram Posts
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* LinkedIn Carousel Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-4 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">LinkedIn Posts</h3>
            </div>
            <div className="w-full" style={{ aspectRatio: "1 / 1" }}>
              <LinkedInCarousel posts={linkedInData} loading={linkedInLoading} />
            </div>
            {/* View All LinkedIn Button */}
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="glass-card hover:glow-border rounded-xl"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/dakhin-tudu-b3550821b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  View All LinkedIn Posts
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaFeed;

