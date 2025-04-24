import { MainLayout } from "@/components/main-layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Calendar,
  FileText,
  Book,
  Users,
  Smile,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export function FeaturesPage() {
  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Features to Simplify Your Student Life
          </h1>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute -top-6 left-8">
                <div className="p-3 rounded-lg bg-primary-600 dark:bg-primary-700 text-white shadow-md">
                  {feature.icon}
                </div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-6 mb-4">
                {feature.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        

        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to transform your academic life?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of students who are already using our AI assistants
            to improve their grades and reduce stress.
          </p>
          <div className="flex justify-center">
            <Link href="/signup">
              <Button size="lg" className="px-8">Get Started for Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Data
const features = [
  {
    title: "Smart Study Planning",
    description:
      "AI-powered study plans that adapt to your learning style, schedule, and upcoming deadlines.",
    icon: <Calendar className="h-6 w-6" />,
    benefits: [
      "Personalized study schedules based on your learning habits",
      "Automatic reminders for important deadlines",
      "Adaptive planning that adjusts when you fall behind",
      "Integration with your academic calendar",
    ],
  },
  {
    title: "Advanced Research Assistant",
    description:
      "Streamline your research process with intelligent source discovery and organization.",
    icon: <Zap className="h-6 w-6" />,
    benefits: [
      "Find relevant academic sources for any topic",
      "Summarize research papers in seconds",
      "Organize sources by theme or argument",
      "Generate citations in any format automatically",
    ],
  },
  {
    title: "Assignment Improvement",
    description:
      "Get feedback on your assignments before submission to help you achieve better grades.",
    icon: <FileText className="h-6 w-6" />,
    benefits: [
      "Writing suggestions to improve clarity and flow",
      "Grammar and style checking for academic writing",
      "Plagiarism prevention tools",
      "Structure and argument strengthening advice",
    ],
  },
  {
    title: "Concept Mastery",
    description:
      "Deepen your understanding of complex topics with clear, personalized explanations.",
    icon: <Book className="h-6 w-6" />,
    benefits: [
      "Simplified explanations of difficult concepts",
      "Interactive learning through guided questions",
      "Visual aids and diagrams for better comprehension",
      "Practice problems with step-by-step solutions",
    ],
  },
  {
    title: "Flashcard Generation",
    description:
      "Create effective flashcards automatically from your study materials and notes.",
    icon: <FileText className="h-6 w-6" />,
    benefits: [
      "AI-powered extraction of key concepts",
      "Smart spacing for optimal retention",
      "Custom card templates for different subjects",
      "Progress tracking and review suggestions",
    ],
  },
  {
    title: "Exam-like Quizzes",
    description:
      "Practice with AI-generated quizzes that mirror real exam formats and difficulty.",
    icon: <Book className="h-6 w-6" />,
    benefits: [
      "Questions based on your study materials",
      "Multiple question formats (MCQ, short answer, etc.)",
      "Difficulty adaptation based on performance",
      "Detailed explanations for each answer",
    ],
  },
];

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Basic features for students just getting started.",
    features: [
      "Basic AI study assistant",
      "Limited research queries (10/day)",
      "Basic study planner",
      "24/7 availability",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "9.99",
    period: "month",
    description: "Everything you need for academic success.",
    features: [
      "Advanced AI assistant with all features",
      "Unlimited research queries",
      "Priority response times",
      "Advanced study analytics",
      "Collaboration tools for group projects",
    ],
    popular: false,
  },
  {
    name: "Teams",
    price: "19.99",
    period: "month",
    description: "Perfect for study groups and class projects.",
    features: [
      "Everything in Pro plan",
      "Up to 5 team members",
      "Shared resources and notes",
      "Team progress tracking",
      "Integration with learning management systems",
    ],
    popular: false,
  },
];

export default FeaturesPage;
