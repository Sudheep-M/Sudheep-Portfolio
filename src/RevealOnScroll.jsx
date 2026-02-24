import { useEffect, useRef, useState } from "react";

const RevealOnScroll = ({
  children,
  className = "",
  threshold = 0.3,
  rootMargin = "0px",
  once = true,
  animation = "fade-left",
  duration = "duration-700",
  delay = "",
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  const animations = {
    "fade-up": "md:translate-x-80 translate-y-40 opacity-0",
    "fade-down": "md:-translate-y-80 translate-x-40 opacity-0",
    "fade-left": "md:-translate-x-80 -translate-x-40 opacity-0",
    "fade-right": "md:-translate-x-80 translate-x-40 opacity-0",
    zoom: "scale-0 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all ease-out ${className}
        ${duration} ${delay}
        ${isVisible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : animations[animation]}
      `}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
