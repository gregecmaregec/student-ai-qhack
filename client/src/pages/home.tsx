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

export function HomePage() {
  const mentalWellnessFeatureRef = useRef(null);

  useEffect(() => {
    // Keep track of whether animation has been triggered
    const animationTriggered = { mobile: false, desktop: false };

    // Original scroll handling for mobile view
    const handleScroll = () => {
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
            featuresCarousel?.removeEventListener("scroll", handleScroll);
          }
        }
      }
    };

    // Add scroll event listener to mobile features carousel
    const featuresCarousel = document.querySelector(".sm\\:hidden");
    if (featuresCarousel) {
      featuresCarousel.addEventListener("scroll", handleScroll);
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
      // Clean up the mobile scroll event listener
      const featuresCarousel = document.querySelector(".sm\\:hidden");
      if (featuresCarousel) {
        featuresCarousel.removeEventListener("scroll", handleScroll);
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
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-primary">
                <span className="block inline-flex items-center justify-center">
                  Supercharged
                </span>
              </h1>
            </div>

            <motion.div
              className="mt-6 sm:flex sm:justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-2 sm:mb-0">
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="w-full px-4 py-1.5 text-xs sm:text-sm sm:px-5 sm:py-2 bg-gradient-to-r from-primary via-primary-600 to-purple-500 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 text-white font-medium border-none rounded-md"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/features">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full px-4 py-1.5 text-xs sm:text-sm sm:px-5 sm:py-2 bg-primary/10 hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 border-none hover:-translate-y-1 transition-all duration-300 rounded-md"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.p
              className="mt-5 max-w-lg mx-auto text-base text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Meet Studie, the studying AI agent.
            </motion.p>
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
            <h2 className="text-2xl font-serif text-foreground sm:text-3xl">
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
                      <h3 className="mt-4 text-base font-medium text-foreground tracking-tight">
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
                        <h3 className="mt-4 text-base font-medium text-foreground tracking-tight">
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
              <h2 className="text-2xl font-serif text-foreground sm:text-3xl">
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
                <h2 className="text-2xl font-serif text-foreground sm:text-3xl">
                  <span className="block">
                    Ready to improve your studies?
                  </span>
                </h2>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link href="/signup">
                    <Button
                      size="sm"
                      variant="default"
                      className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-sm sm:px-5 sm:py-2 bg-gradient-to-r from-primary via-primary-600 to-purple-500 hover:shadow-sm hover:shadow-primary/10 text-white hover:text-white/90 transition-all duration-300 hover:-translate-y-1 rounded-md border-none"
                    >
                      Get started free
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-sm sm:px-5 sm:py-2 border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 rounded-md"
                    >
                      Learn more
                    </Button>
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
      "Get help finding quality sources, summarizing research papers, and organizing your findings.",
    icon: <Zap className="h-6 w-6 text-white" />,
  },
  {
    title: "Study Planner",
    description:
      "Create personalized study schedules based on your courses, deadlines, and learning preferences.",
    icon: <Calendar className="h-6 w-6 text-white" />,
  },
  {
    title: "Assignment Helper",
    description:
      "Get writing suggestions, citation help, and feedback on your assignments before submission.",
    icon: <FileText className="h-6 w-6 text-white" />,
  },
  {
    title: "Concept Explainer",
    description:
      "Get clear, simple explanations for complex academic concepts across all subjects.",
    icon: <Book className="h-6 w-6 text-white" />,
  },
  {
    title: "Group Project Manager",
    description:
      "Coordinate group projects with task distribution, progress tracking, and communication tools.",
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    title: "Mental Wellness",
    description:
      "Get support managing stress, maintaining focus, and balancing your academic and personal life.",
    icon: (
      <div className="wellness-icon-container">
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
          <path className="wellness-icon-eyes" d="M8 14s1.5 2 4 2 4-2 4-2" />
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
  "Best available AI inference with ",
  "Personalized to your learning style and needs",
  "Integrates with your existing academic tools",
  "Constantly learning and improving from feedback",
];

const testimonials = [
  {
    name: "Alex Kim",
    initials: "AK",
    role: "Computer Science, Stanford",
    text: '"This AI assistant helped me debug my code at 2 AM when I was stuck on a project. It explained the concepts I was missing and saved my assignment!"',
  },
  {
    name: "Sophie Martinez",
    initials: "SM",
    role: "Biology, UC Berkeley",
    text: '"The study scheduling feature adapted to my learning style. It knew when I needed breaks and when I could push through difficult material. My grades improved dramatically!"',
  },
  {
    name: "Jordan Williams",
    initials: "JW",
    role: "English Literature, NYU",
    text: '"The research assistant helped me find obscure sources for my thesis and organized them perfectly. It suggested connections between texts I hadn\'t considered before."',
  },
];

export default HomePage;
