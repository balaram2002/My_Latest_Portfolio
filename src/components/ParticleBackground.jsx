import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains("dark"));

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    return () => observer.disconnect();
  }, []);

  if (!init) return null;

  const particleColor = isDark ? "#64ffda" : "#2563EB";

  return (
    <div className="absolute inset-0 w-full z-0 pointer-events-none" style={{ minHeight: '100%' }}>
      <Particles
        id="tsparticles"
        className="absolute inset-0 w-full h-full"
        options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: particleColor,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1.5,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 2,
            straight: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
            trail: {
              enable: false,
            },
          },
          number: {
            density: {
              enable: true,
              height: 800,
              width: 800,
            },
            value: 80,
          },
          opacity: {
            value: {
              min: 0.2,
              max: 0.6,
            },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 3,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
      />
    </div>
  );
};

export default ParticleBackground;

