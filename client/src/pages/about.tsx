import { MainLayout } from "@/components/main-layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  HeartHandshake,
  BookOpen,
  LightbulbIcon,
  Trophy,
  GraduationCap,
  UserPlus,
  Github,
  Linkedin,
} from "lucide-react";

// No founder images available yet
export function AboutPage() {
  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            About us
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            We want to deliver the best studying, learning, i.e. getting to the point of it.
          </p>
        </div>

        {/* Our Story section */}
        <div className="mb-20">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Want to learn something? We want to set in motion world's best publicly avilable AI to help you achieve this honorable goal.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Know thyself. It is the beginning of wisdom.
                </p>
              </div>
              <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-12 flex items-center justify-center">
                <div className="text-center">
                  <HeartHandshake className="h-20 w-20 text-white mx-auto mb-4" />
                  <p className="text-white text-lg font-medium">
                    Founded in 2025
                  </p>
                  <p className="text-white text-lg font-medium">
                    By students of UniMA & Heidelberg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              These core principles guide everything we do at students-ai.com.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#121212] rounded-lg p-8 shadow-md transition-colors duration-300 border border-gray-200 dark:border-gray-800"
              >
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg inline-flex mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Meet the passionate people behind students-ai.com.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1E1E1E] rounded-lg overflow-hidden shadow-md transition-colors duration-300"
              >
                <div className="aspect-w-3 aspect-h-2 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center p-8">
                  {member.image ? (
                    <div className="h-24 w-24 rounded-full overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 flex items-center justify-center text-3xl font-bold">
                      {member.initials}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    {member.social.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join us CTA */}
        <div className="bg-primary-700 dark:bg-primary-800 rounded-xl p-8 md:p-12 shadow-xl transition-colors duration-300">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="max-w-2xl mx-auto text-primary-100 mb-8">
              We're always looking for passionate people who want to help
              transform education through AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/careers">
                <Button size="lg" variant="secondary">
                  <UserPlus className="mr-2 h-5 w-5" />
                  View Open Positions
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Try students-ai.com
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Data
const values = [
  {
    title: "Learn, Don't Cheat",
    description:
      "We build tools that enhance learning and understanding, not shortcuts that bypass it. Our AI helps students develop skills, not replace them.",
    icon: (
      <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
    ),
  },
  {
    title: "Accessible Education",
    description:
      "We believe every student deserves access to high-quality educational support regardless of their background or circumstances.",
    icon: (
      <LightbulbIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
    ),
  },
  {
    title: "Student Success",
    description:
      "Everything we do is measured by one standard: does it help students succeed? Not just in grades, but in developing lifelong learning skills.",
    icon: <Trophy className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
  },
];

const team = [
  {
    name: "Gregor Mihelač",
    initials: "GM",
    image: null,
    role: "Co-Founder",
    bio: "AI and education specialist with a vision to transform how students learn through technology.",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />
      },
    ],
  },
  {
    name: "Xuefei Yang",
    initials: "XY",
    role: "Co-Founder",
    bio: "Machine learning expert focused on natural language processing and educational applications of AI.",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />
      },
    ],
  },
  {
    name: "Shivam Suchak",
    initials: "SS",
    role: "Co-Founder",
    bio: "Software engineer with experience in building educational platforms and AI-driven applications.",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />
      },
    ],
  },
  {
    name: "Andrei Prioteasa",
    initials: "AP",
    role: "Co-Founder",
    bio: "Education technology specialist with a passion for making learning accessible through AI.",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />
      },
    ],
  },
  {
    name: "Tim Hirndorf",
    initials: "TH",
    role: "Co-Founder",
    bio: "Product designer and UX specialist focused on creating intuitive educational experiences.",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />
      },
    ],
  },
];

export default AboutPage;
