import { MainLayout } from "@/components/main-layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Zap,
  Calendar,
  FileText,
  Book,
  Users,
  Smile,
} from "lucide-react";

export function HomePage() {
  return (
    <MainLayout>
      {/* Navigation Buttons */}
      <div className="bg-white dark:bg-gray-900 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-3">
          <Link href="/features">
            <Button variant="outline" className="rounded-full px-5 py-2 bg-primary/10 hover:bg-primary/20 text-primary border-none">
              Features
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="rounded-full px-5 py-2 bg-primary/10 hover:bg-primary/20 text-primary border-none">
              Pricing
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              <span className="block">
                Full power of AI to supercharge your study{" "}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              AI tools designed for students. Research, assignments,
              planning—all in one place.
            </p>
            <div className="mt-10 sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full px-8 py-3 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 border-none md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave pattern */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-r from-primary via-primary-600 to-primary-700 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900">
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              d="M0,128L48,133.3C96,139,192,149,288,170.7C384,192,480,224,576,224C672,224,768,192,864,181.3C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground sm:text-4xl">
              Essential Features
            </h2>
            <p className="max-w-xl mt-4 mx-auto text-muted-foreground">
              Built by students, for students
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root rounded-lg bg-card px-6 pb-8 h-full border border-border transition-all duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-foreground tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 transition-colors duration-300 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground sm:text-4xl">
                AI that understands student needs
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Built for academic success
              </p>
              <div className="mt-8 space-y-5">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-success-light dark:text-success-dark" />
                    </div>
                    <p className="ml-3 text-base text-foreground">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <div className="relative w-full max-w-lg h-64 bg-primary-100 dark:bg-primary-900/20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 dark:from-primary-500/10 dark:to-purple-500/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-24 w-24 text-primary dark:text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 transition-colors duration-300 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary dark:bg-primary-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-serif font-bold text-white sm:text-4xl">
                  <span className="block">
                    Ready to transform your studying?
                  </span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-primary-50">
                  Sign up for free today
                </p>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      Get started for free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 w-full h-full lg:absolute lg:w-1/2 lg:h-full">
                <div className="w-full h-full bg-primary-800 rounded-tl-lg opacity-30"></div>
              </div>
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
    icon: <Smile className="h-6 w-6 text-white" />,
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
