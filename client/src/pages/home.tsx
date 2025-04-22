import { useState } from 'react';
import { MainLayout } from '@/components/main-layout';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Book, Calendar, FileText, Users, Smile, Send } from 'lucide-react';

export function HomePage() {
  const [demoMessage, setDemoMessage] = useState('');

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span className="block">Simplifying Student Life</span>
              <span className="block text-primary-600 dark:text-primary-400">With Intelligent AI Assistants</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Streamline your learning journey with AI tools designed specifically for students.
              Get help with research, assignments, study planning, and more.
            </p>
            <div className="mt-10 sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <Link href="/signup">
                  <Button size="lg" className="w-full px-8 py-3 md:py-4 md:text-lg md:px-10">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="/features">
                  <Button size="lg" variant="outline" className="w-full px-8 py-3 text-primary-700 bg-primary-100 dark:text-primary-300 dark:bg-gray-800 hover:bg-primary-200 dark:hover:bg-gray-700 border-none md:py-4 md:text-lg md:px-10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave pattern */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-700 dark:from-primary-700 dark:via-purple-700 dark:to-primary-900">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="currentColor" d="M0,128L48,133.3C96,139,192,149,288,170.7C384,192,480,224,576,224C672,224,768,192,864,181.3C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-3xl font-serif font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight">
              Everything you need in your academic journey
            </p>
            <p className="max-w-xl mt-5 mx-auto text-lg text-gray-600 dark:text-gray-300">
              Designed by students, for students. Our AI assistant helps you navigate every aspect of your academic life.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root rounded-lg bg-[#F5F5DC] dark:bg-[#121212] px-6 pb-8 h-full border border-gray-200 dark:border-gray-800 transition-all duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-600 dark:bg-primary-700 rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-600 dark:text-gray-300">
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

      {/* Demo Section */}
      <section className="py-16 sm:py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-serif font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Experience the AI that understands student challenges
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
                Our AI assistants are trained on educational content and understand the specific challenges that students face daily.
              </p>
              <div className="mt-8 space-y-5">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="relative mx-auto w-full rounded-lg shadow-lg overflow-hidden">
                <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-5 h-96 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  {/* AI assistant interface */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Study Assistant</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </Button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto py-4 space-y-4">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-primary-600 dark:text-primary-300" />
                          </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-gray-800 dark:text-gray-200">Hello! How can I help with your studies today?</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-primary-100 dark:bg-primary-900 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-primary-800 dark:text-primary-200">I need help organizing my research sources for my biology paper on photosynthesis.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-primary-600 dark:text-primary-300" />
                          </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-gray-800 dark:text-gray-200">I'd be happy to help organize your research! Let's create a structure for your paper on photosynthesis. Would you like me to suggest some main sections and help categorize your sources?</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t dark:border-gray-700">
                      <div className="flex items-center">
                        <input 
                          type="text" 
                          placeholder="Type your message..." 
                          className="flex-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-4 py-2"
                          value={demoMessage}
                          onChange={(e) => setDemoMessage(e.target.value)}
                        />
                        <Button size="icon" className="ml-3 rounded-full bg-primary-600 dark:bg-primary-700 text-white hover:bg-primary-700 dark:hover:bg-primary-600">
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-1 text-3xl font-serif font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight">
              Students love our AI assistants
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-[#F5F5DC] dark:bg-[#121212] rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-800 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <span className="text-primary-700 dark:text-primary-300 font-semibold">{testimonial.initials}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {testimonial.text}
                </p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="h-5 w-5 text-yellow-400" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 dark:bg-primary-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-serif font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to transform your study experience?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-primary-200">
                  Sign up for free today and experience how AI can simplify your student life.
                </p>
                <div className="mt-8 sm:flex space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link href="/signup">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      Get started for free
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-white bg-primary-800 hover:bg-primary-900 border-white border-opacity-20">
                      Watch demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
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
    title: 'Research Assistant',
    description: 'Get help finding quality sources, summarizing research papers, and organizing your findings.',
    icon: <Zap className="h-6 w-6 text-white" />,
  },
  {
    title: 'Study Planner',
    description: 'Create personalized study schedules based on your courses, deadlines, and learning preferences.',
    icon: <Calendar className="h-6 w-6 text-white" />,
  },
  {
    title: 'Assignment Helper',
    description: 'Get writing suggestions, citation help, and feedback on your assignments before submission.',
    icon: <FileText className="h-6 w-6 text-white" />,
  },
  {
    title: 'Concept Explainer',
    description: 'Get clear, simple explanations for complex academic concepts across all subjects.',
    icon: <Book className="h-6 w-6 text-white" />,
  },
  {
    title: 'Group Project Manager',
    description: 'Coordinate group projects with task distribution, progress tracking, and communication tools.',
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    title: 'Mental Wellness',
    description: 'Get support managing stress, maintaining focus, and balancing your academic and personal life.',
    icon: <Smile className="h-6 w-6 text-white" />,
  },
];

const benefits = [
  '24/7 availability for late-night study sessions',
  'Personalized to your learning style and needs',
  'Integrates with your existing academic tools',
  'Constantly learning and improving from feedback',
];

const testimonials = [
  {
    name: 'Alex Kim',
    initials: 'AK',
    role: 'Computer Science, Stanford',
    text: '"This AI assistant helped me debug my code at 2 AM when I was stuck on a project. It explained the concepts I was missing and saved my assignment!"',
  },
  {
    name: 'Sophie Martinez',
    initials: 'SM',
    role: 'Biology, UC Berkeley',
    text: '"The study scheduling feature adapted to my learning style. It knew when I needed breaks and when I could push through difficult material. My grades improved dramatically!"',
  },
  {
    name: 'Jordan Williams',
    initials: 'JW',
    role: 'English Literature, NYU',
    text: '"The research assistant helped me find obscure sources for my thesis and organized them perfectly. It suggested connections between texts I hadn\'t considered before."',
  },
];

export default HomePage;
