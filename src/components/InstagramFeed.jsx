import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstagramEmbed } from "react-social-media-embed";

// Add your Instagram post URLs here
// To get a post URL: Open Instagram post > Click three dots > Copy Link
const instagramPosts = [
  "https://www.instagram.com/p/DSGq1FWk0fl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DLy4RcoRvBP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DSGq1FWk0fl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
];

// Helper function to extract post ID from URL
const getPostId = (url) => {
  const match = url.match(/\/p\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
};

// Fetch Instagram post metadata using oEmbed API
const fetchPostData = async (postUrl) => {
  try {
    // Clean URL (remove query params for oEmbed)
    const cleanUrl = postUrl.split('?')[0];
    // Use CORS proxy if direct API call fails
    const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(cleanUrl)}`;
    
    const response = await fetch(oembedUrl, {
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      caption: data.title || "",
      thumbnail: data.thumbnail_url || "",
      author: data.author_name || "daxin_tudu",
      html: data.html || "",
    };
  } catch (error) {
    console.error("Error fetching Instagram post data:", error);
    // Return fallback data
    return {
      caption: "Check out my latest post! 🚀",
      thumbnail: "",
      author: "daxin_tudu",
      html: "",
    };
  }
};

const InstagramFeed = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostsData = async () => {
      setLoading(true);
      const data = await Promise.all(
        instagramPosts.map(async (url) => {
          const postData = await fetchPostData(url);
          // Extract post ID for potential future API calls
          const postId = getPostId(url);
          
          // For now, we'll use placeholder likes/comments
          // In production, you'd fetch these from Instagram Graph API
          return {
            url,
            postId,
            caption: postData?.caption || "Check out my latest post! 🚀",
            likes: Math.floor(Math.random() * 500) + 50, // Placeholder - replace with real API
            comments: Math.floor(Math.random() * 50) + 5, // Placeholder - replace with real API
            thumbnail: postData?.thumbnail || "",
          };
        })
      );
      setPostsData(data);
      setLoading(false);
    };

    loadPostsData();
  }, []);

  // If no posts configured, show a message
  if (instagramPosts.length === 0) {
    return (
      <section id="instagram" className="relative" ref={ref}>
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Instagram Feed</h2>
            <p className="section-subtitle mx-auto">
              Follow my journey and latest updates
            </p>
          </motion.div>

          <motion.div
            className="text-center py-20 glass-card rounded-2xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <Instagram className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Add your Instagram post URLs in the component to display them here.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              To get post URLs: Open Instagram → Click three dots on a post → Copy Link
            </p>
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
                Visit My Instagram
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="instagram" className="relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Instagram Feed</h2>
          <p className="section-subtitle mx-auto">
            Follow my journey and latest updates
          </p>
        </motion.div>

        {/* Instagram Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {postsData.map((post, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-2xl overflow-hidden p-0 relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ aspectRatio: "1 / 1" }}
              >
                {/* Square container for Instagram post */}
                <div className="instagram-square-container">
                  <div className="instagram-embed-wrapper">
                    <InstagramEmbed
                      url={post.url}
                      width="100%"
                      captioned={false}
                    />
                  </div>
                </div>

                {/* Overlay with caption, likes, and comments */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-10 backdrop-blur-sm">
                  {/* Caption - One line */}
                  <p className="text-white text-sm font-medium mb-3 line-clamp-1 drop-shadow-lg">
                    {post.caption}
                  </p>
                  
                  {/* Likes and Comments */}
                  <div className="flex items-center gap-5 text-white">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      <span className="text-xs font-semibold">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span className="text-xs font-semibold">{post.comments.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
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
              View All Posts on Instagram
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
