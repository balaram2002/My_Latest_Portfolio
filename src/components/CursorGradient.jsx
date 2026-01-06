import { useEffect, useState } from "react";

// Section color mapping - punchy vibrant colors
const sectionColors = {
  home: { h: 166, s: 100, l: 70 }, // Teal
  about: { h: 330, s: 80, l: 65 }, // Pink
  skills: { h: 280, s: 85, l: 65 }, // Purple
  projects: { h: 166, s: 100, l: 70 }, // Teal
  experience: { h: 166, s: 100, l: 70 }, // Teal
  "github-activity": { h: 220, s: 95, l: 60 }, // Blue
  instagram: { h: 320, s: 85, l: 70 }, // Magenta/Pink
  contact: { h: 270, s: 80, l: 65 }, // Purple
  default: { h: 166, s: 100, l: 70 }, // Teal (default)
};

const CursorGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentColor, setCurrentColor] = useState(sectionColors.default);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Detect which section the cursor is over
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        // Find the closest section element
        let sectionElement = element.closest("section");
        
        // If not found, traverse up the DOM tree
        if (!sectionElement) {
          let parent = element.parentElement;
          let depth = 0;
          while (parent && depth < 10) {
            if (parent.tagName === "SECTION" && parent.id) {
              sectionElement = parent;
              break;
            }
            parent = parent.parentElement;
            depth++;
          }
        }

        if (sectionElement && sectionElement.id) {
          const sectionId = sectionElement.id;
          const color = sectionColors[sectionId] || sectionColors.default;
          setCurrentColor(color);
        } else {
          // Check if we're in a specific section by scroll position
          const sections = ["home", "about", "skills", "projects", "experience", "github-activity", "instagram", "contact"];
          const scrollY = window.scrollY + e.clientY;
          
          for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
              const rect = section.getBoundingClientRect();
              const sectionTop = rect.top + window.scrollY;
              const sectionBottom = sectionTop + rect.height;
              
              if (scrollY >= sectionTop && scrollY <= sectionBottom) {
                const color = sectionColors[sectionId] || sectionColors.default;
                setCurrentColor(color);
                return;
              }
            }
          }
          
          setCurrentColor(sectionColors.default);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const colorString = `${currentColor.h} ${currentColor.s}% ${currentColor.l}%`;
  const colorStringLight = `${currentColor.h} ${currentColor.s}% ${currentColor.l + 5}%`;

  return (
    <>
      {/* Primary gradient that follows cursor - Color changes by section */}
      <div
        className="fixed inset-0 pointer-events-none z-0 dark:opacity-100 opacity-0 cursor-gradient"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            hsl(${colorString} / 0.08), 
            transparent 50%)`,
        }}
      />
      {/* Secondary smaller gradient for subtle highlight */}
      <div
        className="fixed inset-0 pointer-events-none z-0 dark:opacity-100 opacity-0 cursor-gradient"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            hsl(${colorStringLight} / 0.1), 
            transparent 60%)`,
        }}
      />
    </>
  );
};

export default CursorGradient;

