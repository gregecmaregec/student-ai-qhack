import { MainLayout } from "@/components/main-layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Zap,
  Calendar,
  FileText,
  Book,
  Users,
  Smile,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { LandingChat } from "@/components/landing-chat";

export function HomePage() {
  const mentalWellnessFeatureRef = useRef(null);

  useEffect(() => {
    // Keep track of whether animation has been triggered
    const animationTriggered = { mobile: false, desktop: false };

    // Debounce function to limit how often animations are triggered
    const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout | null = null;
      return function executedFunction(...args: any[]) {
        const later = () => {
          if (timeout) clearTimeout(timeout);
          func(...args);
        };
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    // Global scroll handling for page position
    const handlePageScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll percentage
      const scrollPercentage =
        (scrollPosition / (documentHeight - windowHeight)) * 100;

      const smileyContainer = document.getElementById("smiley-container");

      // Activate smiley animation only when actually viewing the mental wellness feature
      // Use different thresholds for mobile vs desktop
      if (smileyContainer) {
        const isMobile = window.innerWidth < 640;

        // On mobile, only activate when very close to the bottom
        // On desktop, activate when at least 80% through the page
        if (
          (isMobile && scrollPercentage > 90) ||
          (!isMobile && scrollPercentage > 80)
        ) {
          smileyContainer.classList.add("smiley-active");

          // Auto-remove animation after 4 seconds on mobile to prevent battery drain
          if (isMobile) {
            setTimeout(() => {
              smileyContainer.classList.remove("smiley-active");
            }, 4000);
          }
        } else if (!isMobile) {
          // Only actively remove on desktop - mobile will auto-expire
          smileyContainer.classList.remove("smiley-active");
        }
      }
    }, 100); // Debounce by 100ms to improve performance

    // Add global scroll event listener
    window.addEventListener("scroll", handlePageScroll);

    // Original scroll handling for mobile view
    const handleCarouselScroll = () => {
      // If animation already triggered in mobile, do nothing
      if (animationTriggered.mobile) return;

      // Check if the user has scrolled to the end of the mobile features carousel
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        const featuresMobileCarousel =
          featuresSection.querySelector(".sm\\:hidden");
        if (featuresMobileCarousel) {
          const isAtEnd =
            featuresMobileCarousel.scrollLeft +
              featuresMobileCarousel.clientWidth >=
            featuresMobileCarousel.scrollWidth - 20;

          // Get the wellness icon and add animation class if at the end
          const wellnessIcon = document.querySelector(".wellness-icon");
          if (wellnessIcon && isAtEnd) {
            wellnessIcon.classList.add("animate-nod");
            // Mark animation as triggered for mobile
            animationTriggered.mobile = true;
            // Remove the event listener since we only need to trigger once
            featuresCarousel?.removeEventListener(
              "scroll",
              handleCarouselScroll,
            );
          }
        }
      }
    };

    // Add scroll event listener to mobile features carousel
    const featuresCarousel = document.querySelector(".sm\\:hidden");
    if (featuresCarousel) {
      featuresCarousel.addEventListener("scroll", handleCarouselScroll);
    }

    // Set up intersection observer for desktop view
    const observer = new IntersectionObserver(
      (entries) => {
        // If animation already triggered in desktop, do nothing
        if (animationTriggered.desktop) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When mental wellness feature is visible, make the face nod
            const wellnessIcon = entry.target.querySelector(".wellness-icon");
            if (wellnessIcon) {
              wellnessIcon.classList.add("animate-nod");
              // Mark animation as triggered for desktop
              animationTriggered.desktop = true;
              // No need to observe anymore
              if (entry.target) {
                observer.unobserve(entry.target);
              }
            }
          }
        });
      },
      { threshold: 0.7 }, // When 70% of the element is visible
    );

    // Get all desktop feature cards and find the one with mental wellness
    const desktopFeatureCards = document.querySelectorAll(
      ".hidden.sm\\:grid .pt-6",
    );
    if (desktopFeatureCards.length > 0) {
      // The Mental Wellness feature is at the end of the features array
      const mentalWellnessCard =
        desktopFeatureCards[desktopFeatureCards.length - 1];
      if (mentalWellnessCard) {
        observer.observe(mentalWellnessCard);
      }
    }

    return () => {
      // Remove global scroll listener
      window.removeEventListener("scroll", handlePageScroll);

      // Clean up the mobile scroll event listener
      const featuresCarousel = document.querySelector(".sm\\:hidden");
      if (featuresCarousel) {
        featuresCarousel.removeEventListener("scroll", handleCarouselScroll);
      }

      // Clean up the intersection observer
      const desktopFeatureCards = document.querySelectorAll(
        ".hidden.sm\\:grid .pt-6",
      );
      if (desktopFeatureCards.length > 0) {
        const mentalWellnessCard =
          desktopFeatureCards[desktopFeatureCards.length - 1];
        if (mentalWellnessCard) {
          observer.unobserve(mentalWellnessCard);
        }
      }
    };
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-20">
          <div className="text-center">
            <div className="text-center mb-2">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
                <span className="block">Your studies</span>
              </h1>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-primary">
                <span className="block inline-flex items-center justify-center gap-2">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Supercharged
                  </motion.span>
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 0.3 
                    }}
                    className="relative"
                  >
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-400" />
                    <motion.div
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      className="absolute inset-0 rounded-full bg-yellow-400/30 blur-md"
                    />
                  </motion.div>
                </span>
              </h1>
            </div>

            <div className="mt-8 relative z-10">
              <LandingChat />
            </div>
            
            <div className="mt-8"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-10 sm:py-14 bg-background transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-serif text-foreground sm:text-2xl md:text-3xl leading-relaxed">
              Essential Features
            </h2>
            <p className="max-w-lg mt-2 mx-auto text-sm text-muted-foreground">
              Built by students, for students
            </p>
          </div>

          <div className="mt-8">
            {/* Desktop grid - hidden on mobile */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="pt-5">
                  <div className="flow-root rounded-lg bg-card px-4 pb-6 h-full border-none shadow-sm transition-all duration-300 hover:shadow hover:shadow-primary/10 hover:-translate-y-1 bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90">
                    <div className="-mt-5">
                      <div>
                        <span className="inline-flex items-center justify-center p-2 bg-gradient-to-br from-primary to-purple-500 rounded-lg shadow transform transition-transform hover:scale-105">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base md:text-lg font-medium text-foreground tracking-tight leading-snug">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile swipeable carousel - hidden on tablet and up */}
            <div className="sm:hidden overflow-x-auto pb-4 no-scrollbar">
              <div className="flex space-x-3 w-max px-1">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="pt-5 w-[240px] shrink-0 snap-center"
                  >
                    <div className="flow-root rounded-lg bg-card px-4 pb-6 h-full border-none shadow-sm bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90">
                      <div className="-mt-5">
                        <div>
                          <span className="inline-flex items-center justify-center p-2 bg-gradient-to-br from-primary to-purple-500 rounded-lg shadow">
                            {feature.icon}
                          </span>
                        </div>
                        <h3 className="mt-4 text-base font-medium text-foreground tracking-tight leading-snug">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 sm:py-14 transition-colors duration-300 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <div>
            <div className="w-full">
              <h2 className="text-xl font-serif text-foreground sm:text-2xl md:text-3xl leading-relaxed">
                <i>"We do not learn for school, but for life"</i>
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                Still, students-ai is built for academic performance.
              </p>
              <div className="mt-6 space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="ml-2 text-sm text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 transition-colors duration-300 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="rounded-lg shadow-sm overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10 hover:shadow hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
            <div className="pt-8 pb-8 px-4 sm:pt-10 sm:px-10 relative">
              <div className="relative z-10">
                <div className="flex justify-center">
                  <h2 className="text-xl font-serif text-foreground sm:text-2xl md:text-3xl leading-relaxed">
                    <span className="block px-2">
                      Ready to supercharge your studies?
                    </span>
                  </h2>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link href="/signup">
                    <button className="relative overflow-hidden px-6 py-2.5 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/90 transition-colors duration-200">
                      <span className="relative">Chat with Studie</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Blur effect in the background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg blur-md"></div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

// Data
const features = [
  {
    title: "Research Assistant",
    description:
      "Find quality sources and organize research efficiently.",
    icon: <Zap className="h-6 w-6 text-white" />,
  },
  {
    title: "Study Planner",
    description:
      "Smart schedules based on your deadlines and preferences.",
    icon: <Calendar className="h-6 w-6 text-white" />,
  },
  {
    title: "Assignment Helper",
    description:
      "Writing suggestions and feedback for better submissions.",
    icon: <FileText className="h-6 w-6 text-white" />,
  },
  {
    title: "Concept Explainer",
    description:
      "Clear explanations for complex academic concepts.",
    icon: <Book className="h-6 w-6 text-white" />,
  },
  {
    title: "Study Tools",
    description:
      "Flash cards and practice questions for better retention.",
    icon: <FileText className="h-6 w-6 text-white" />,
  },
  {
    title: "Mental Wellness",
    description:
      "Support for stress, focus, and work-life balance.",
    icon: (
      <div id="smiley-container" className="wellness-icon-container">
        <svg
          className="h-6 w-6 wellness-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            className="wellness-icon-smile wellness-icon-eyes"
            d="M8 14s1.5 2 4 2 4-2 4-2"
          />
          <path
            className="wellness-icon-eyes"
            d="M8.5 9C8.5 9 9 8.8 9.2 9C9.4 9.2 9.2 9.3 9 9.3C8.8 9.3 8.5 9 8.5 9"
            fill="white"
          />
          <path
            className="wellness-icon-eyes"
            d="M15.5 9C15.5 9 16 8.8 16.2 9C16.4 9.2 16.2 9.3 16 9.3C15.8 9.3 15.5 9 15.5 9"
            fill="white"
          />
        </svg>
      </div>
    ),
  },
];

const benefits = [
  "Latest AI models powering your academic success",
];

const testimonials = [];

export default HomePage;
