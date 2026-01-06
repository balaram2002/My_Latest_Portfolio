import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitToGoogleSheets } from "@/lib/googleSheets";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/balaram2002",
    color: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/balaram2002/",
    color: "hover:text-blue-400",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitToGoogleSheets(formData);

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });

        // Reset submitted state after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Let's Talk</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Feel free to reach out!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4 glass-card p-4"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">balaramgochhayat2002@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 glass-card p-4"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">India</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 glass-card-hover rounded-xl text-muted-foreground transition-colors ${social.color}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full glow-button text-primary-foreground font-semibold py-6 rounded-xl"
                disabled={isSubmitting || submitted}
              >
                {isSubmitting ? (
                  <motion.div
                    className="flex items-center gap-2"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Send className="w-5 h-5" />
                    Sending...
                  </motion.div>
                ) : submitted ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

