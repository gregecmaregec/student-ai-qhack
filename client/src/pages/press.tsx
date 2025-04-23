import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { 
  CalendarDays, 
  Download, 
  Mail, 
  ExternalLink,
  Award,
  AlignLeft,
  Newspaper,
  FileText
} from 'lucide-react';

type PressRelease = {
  title: string;
  date: string;
  summary: string;
  link?: string;
};

type MediaMention = {
  publication: string;
  title: string;
  date: string;
  link: string;
  logo?: string;
};

export function PressPage() {
  const pressReleases: PressRelease[] = [
    {
      title: "students-ai.com Launches AI-Powered Study Assistant for College Students",
      date: "April 15, 2025",
      summary: "Today, students-ai.com announced the launch of its cutting-edge AI study assistant platform designed specifically for college students. The platform uses artificial intelligence to help students organize study materials, generate practice questions, and provide personalized learning paths.",
      link: "#"
    },
    {
      title: "students-ai.com Secures €2M in Seed Funding to Expand AI Education Platform",
      date: "March 10, 2025",
      summary: "students-ai.com has raised €2 million in seed funding to expand its AI-powered education platform. The round was led by Education Ventures with participation from AI Innovations Fund and several angel investors with backgrounds in education technology.",
      link: "#"
    },
    {
      title: "students-ai.com Partners with 15 European Universities for Academic Year 2025-2026",
      date: "February 22, 2025",
      summary: "students-ai.com announced partnerships with 15 leading European universities today, making its AI-powered study tools available to over 200,000 students for the upcoming academic year. This initiative aims to improve student success rates and enhance the learning experience through personalized AI assistance.",
      link: "#"
    }
  ];

  const mediaMentions: MediaMention[] = [
    {
      publication: "TechCrunch",
      title: "How students-ai.com is Transforming Academic Success with AI",
      date: "April 10, 2025",
      link: "#"
    },
    {
      publication: "Education Weekly",
      title: "Will AI Study Assistants like students-ai.com Revolutionize Higher Education?",
      date: "March 25, 2025",
      link: "#"
    },
    {
      publication: "AI Insider",
      title: "5 EdTech Startups Using AI to Transform Learning - students-ai.com Leads the Pack",
      date: "March 12, 2025",
      link: "#"
    },
    {
      publication: "The University Times",
      title: "Students Embrace AI Tools: A Look at How students-ai.com is Changing Study Habits",
      date: "February 28, 2025",
      link: "#"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Press Center
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              News, updates, and resources for media about students-ai.com.
            </p>
          </div>
        </div>
      </div>

      {/* Press Releases */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">Press Releases</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                The latest announcements from students-ai.com.
              </p>
            </div>
            
            <div className="space-y-8">
              {pressReleases.map((release, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    {release.date}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-gray-900 dark:text-white mb-3">
                    {release.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {release.summary}
                  </p>
                  {release.link && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="inline-flex items-center"
                    >
                      <Newspaper className="h-4 w-4 mr-2" />
                      Read Full Release
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Coverage */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">Media Coverage</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Recent articles and features about students-ai.com.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {mediaMentions.map((mention, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {mention.publication}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {mention.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {mention.title}
                  </h3>
                  <a 
                    href={mention.link} 
                    className="text-primary hover:text-primary-dark hover:underline inline-flex items-center text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Article <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl font-medium text-gray-900 dark:text-white">Looking for a story?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              If you're a journalist working on a story about AI in education, our team would be happy to help with insights, interviews, or data.
            </p>
            <div className="mt-6">
              <Button
                onClick={() => window.location.href = 'mailto:press@students-ai.com?subject=Press Inquiry'}
                className="inline-flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Press Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PressPage;