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
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="text-center">
            <div className="text-center">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground">
                <span className="block">Your studies</span>
              </h1>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-primary">
                <span className="block inline-flex items-center justify-center">
                  Simplified
                </span>
              </h1>
            </div>

            <motion.div
              className="mt-10 sm:flex sm:justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-3 sm:mb-0">
                <Link href="/signup">
                  <Button
                    size="default"
                    className="w-full px-6 py-3 text-base bg-gradient-to-r from-primary via-primary-600 to-purple-500 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 text-white font-medium border-none rounded-md"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/features">
                  <Button
                    size="default"
                    variant="outline"
                    className="w-full px-6 py-3 text-base bg-primary/10 hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 border-none hover:-translate-y-1 transition-all duration-300 rounded-md"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.p
              className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Meet Studie, the studying AI agent.
            </motion.p>
            <div className="mt-16"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 sm:py-20 bg-background transition-colors duration-300"
      >
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif text-foreground sm:text-4xl">
              Essential Features
            </h2>
            <p className="max-w-xl mt-4 mx-auto text-muted-foreground">
              Built by students, for students
            </p>
          </div>

          <div className="mt-12">
            {/* Desktop grid - hidden on mobile */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root rounded-xl bg-card px-6 pb-8 h-full border-none shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary to-purple-500 rounded-xl shadow-lg transform transition-transform hover:scale-110">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-6 text-lg font-medium text-foreground tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-4 text-base text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile swipeable carousel - hidden on tablet and up */}
            <div className="sm:hidden overflow-x-auto pb-6 no-scrollbar">
              <div className="flex space-x-4 w-max px-1">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="pt-6 w-[280px] shrink-0 snap-center"
                  >
                    <div className="flow-root rounded-xl bg-card px-6 pb-8 h-full border-none shadow-md bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary to-purple-500 rounded-xl shadow-lg">
                            {feature.icon}
                          </span>
                        </div>
                        <h3 className="mt-6 text-lg font-medium text-foreground tracking-tight">
                          {feature.title}
                        </h3>
                        <p className="mt-4 text-base text-muted-foreground">
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
      <section className="py-16 sm:py-20 transition-colors duration-300 bg-background">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-1 lg:gap-8 lg:items-center">
            <div className="w-full">
              <h2 className="text-3xl font-serif text-foreground sm:text-4xl">
                <i>"We do not learn for school, but for life"</i>
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Still, students-ai is built for academic performance.
              </p>
              <div className="mt-8 space-y-5">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <p className="ml-3 text-base text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 transition-colors duration-300 bg-background">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl shadow-md overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20 relative">
              <div className="lg:self-center relative z-10">
                <h2 className="text-3xl font-serif text-foreground sm:text-4xl">
                  <span className="block">
                    Ready to transform your studying?
                  </span>
                </h2>
                <div className="mt-8 flex flex-col sm:flex-row gap-5">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      variant="default"
                      className="w-full sm:w-auto px-8 py-6 text-base sm:text-lg bg-gradient-to-r from-primary via-primary-600 to-purple-500 hover:shadow-lg hover:shadow-primary/20 text-white hover:text-white/90 transition-all duration-300 hover:-translate-y-1 rounded-md border-none"
                    >
                      Get started for free
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto px-8 py-6 text-base sm:text-lg border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1 rounded-md"
                    >
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Blur effect in the background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl blur-xl"></div>
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
  "24/7 availability for late-night study sessions",
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
