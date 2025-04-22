import { MainLayout } from '@/components/main-layout';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { HeartHandshake, BookOpen, LightbulbIcon, Trophy, GraduationCap, UserPlus } from 'lucide-react';

export function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            About Students AI
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            We're on a mission to transform education by making personalized AI assistance accessible to every student.
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
                  Students AI was born out of our own struggles as students. We experienced firsthand the challenges of balancing coursework, research, and personal life, often working late into the night to meet deadlines.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  We realized that AI could revolutionize how students learn and complete their work—not by doing it for them, but by providing intelligent assistance that enhances their natural abilities and helps them become better learners. Our team of educators, AI researchers, and former students came together to build a platform specifically designed for the unique challenges of academic life.
                </p>
              </div>
              <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-12 flex items-center justify-center">
                <div className="text-center">
                  <HeartHandshake className="h-20 w-20 text-white mx-auto mb-4" />
                  <p className="text-white text-lg font-medium">Founded in 2023</p>
                  <p className="text-white text-lg font-medium">By students, for students</p>
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
              These core principles guide everything we do at Students AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-[#F5F5DC] dark:bg-[#121212] rounded-lg p-8 shadow-md transition-colors duration-300 border border-gray-200 dark:border-gray-800">
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
              Meet the passionate people behind Students AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-[#1E1E1E] rounded-lg overflow-hidden shadow-md transition-colors duration-300">
                <div className="aspect-w-3 aspect-h-2 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center p-8">
                  <div className="h-24 w-24 rounded-full bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 flex items-center justify-center text-3xl font-bold">
                    {member.initials}
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
              We're always looking for passionate people who want to help transform education through AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/careers">
                <Button size="lg" variant="secondary">
                  <UserPlus className="mr-2 h-5 w-5" />
                  View Open Positions
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-primary-800">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Try Students AI
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
    description: 'We build tools that enhance learning and understanding, not shortcuts that bypass it. Our AI helps students develop skills, not replace them.',
    icon: <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
  },
  {
    title: 'Accessible Education',
    description: 'We believe every student deserves access to high-quality educational support regardless of their background or circumstances.',
    icon: <LightbulbIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
  },
  {
    title: 'Student Success',
    description: 'Everything we do is measured by one standard: does it help students succeed? Not just in grades, but in developing lifelong learning skills.',
    icon: <Trophy className="h-6 w-6 text-primary-600 dark:text-primary-400" />
  }
];

const team = [
  {
    name: 'Sarah Chen',
    initials: 'SC',
    role: 'CEO & Co-Founder',
    bio: 'Former AI researcher with a passion for education. Sarah holds a PhD in Computer Science from MIT and has published extensively on educational AI.',
    social: [
      {
        name: 'Twitter',
        url: '#',
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
      },
      {
        name: 'LinkedIn',
        url: '#',
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      }
    ]
  },
  {
    name: 'Michael Johnson',
    initials: 'MJ',
    role: 'CTO & Co-Founder',
    bio: 'Software engineer and former educator with 10+ years of experience building AI systems. Michael taught high school computer science before joining the tech industry.',
    social: [
      {
        name: 'Twitter',
        url: '#',
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
      },
      {
        name: 'GitHub',
        url: '#',
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
      }
    ]
  },
  {
    name: 'Olivia Rodriguez',
    initials: 'OR',
    role: 'Head of Education',
    bio: 'Former university professor with expertise in educational psychology. Olivia ensures our AI tools are grounded in learning science and effective pedagogy.',
    social: [
      {
        name: 'Twitter',
        url: '#',
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
      },
      {
        name: 'LinkedIn',
        url: '#',
        icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      }
    ]
  }
];

export default AboutPage;
