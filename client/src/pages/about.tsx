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

// Import team photos
import photo1 from "../assets/1.jpeg";
import photo2 from "../assets/2.jpeg";
import photo3 from "../assets/3.jpeg";
import photo4 from "../assets/4.jjpeg.jpeg";
import photo5 from "../assets/5.jpeg";

// Import background photos
import bg1 from "../assets/1.1.jpeg";
import bg2 from "../assets/2.1.jpeg";
import bg3 from "../assets/3.1.jpeg";
import bg4 from "../assets/1.1.jpeg";
import bg5 from "../assets/5.1.jpeg";

// Define types for team members
type TeamMember = {
  name: string;
  initials: string;
  image?: string | any;
  headerImage?: string | any;
  role: string;
  bio: string;
  social: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
};

export function AboutPage() {
  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            About us
          </h1>
        </div>

        {/* Our Story section */}
        <div className="mb-20">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-center">
                  <BookOpen className="h-20 w-20 text-primary mx-auto mb-4" />
                  <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
                    Your study sidekick.
                    <br />
                    Built by students, for students.
                  </p>
                </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1E1E1E] rounded-lg overflow-hidden shadow-md transition-colors duration-300"
              >
                <div
                  className="aspect-w-3 aspect-h-2 relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${member.headerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "180px",
                  }}
                >
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    {member.image ? (
                      <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 flex items-center justify-center text-3xl font-bold border-2 border-white">
                        {member.initials}
                      </div>
                    )}
                  </div>
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
              We're looking for passionate people who want to help transform
              studying through AI.
            </p>
            <div className="flex justify-center mt-4">
              <Link href="/careers" className="inline-block">
                <div className="group relative overflow-hidden rounded-full bg-white/5 border border-purple-400/20 hover:border-purple-500/40 px-5 py-2 shadow-sm hover:shadow transition-all duration-300 hover:bg-white/10">
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/30 to-indigo-600/30 transition-transform duration-300 ease-in-out group-hover:translate-y-[0%] rounded-full"></div>
                  <div className="relative flex items-center gap-2 text-sm font-medium text-purple-100 group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                    <UserPlus className="h-4 w-4 transition-all duration-300 group-hover:rotate-12" />
                    <span>View Positions</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const team: TeamMember[] = [
  {
    name: "Xuefei Yang",
    initials: "XY",
    image: photo1,
    headerImage: bg1,
    role: "Co-Founder",
    bio: "ML expert focused on NLP and educational AI",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Shivam Suchak",
    initials: "SS",
    image: photo2,
    headerImage: bg2,
    role: "Co-Founder",
    bio: "Software engineer for AI-driven education platforms",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Andrei Prioteasa",
    initials: "AP",
    image: photo3,
    headerImage: bg3,
    role: "Co-Founder",
    bio: "EdTech specialist making AI learning accessible",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Tim Hirndorf",
    initials: "TH",
    image: photo4,
    headerImage: bg4,
    role: "Co-Founder",
    bio: "UX designer for intuitive learning experiences",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Gregor Mihelač",
    initials: "GM",
    image: photo5,
    headerImage: bg5,
    role: "Co-Founder",
    bio: "AI and education visionary",
    social: [
      {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin className="h-5 w-5" />,
      },
      {
        name: "GitHub",
        url: "#",
        icon: <Github className="h-5 w-5" />,
      },
    ],
  },
];

export default AboutPage;
