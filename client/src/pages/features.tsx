import { MainLayout } from '@/components/main-layout';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Calendar,
  FileText,
  Book,
  Users,
  Smile,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export function FeaturesPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Features to Simplify Your Student Life
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Our AI assistant platform offers a comprehensive suite of tools designed specifically for students to help you excel in your academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="relative bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
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
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-[#F5F5DC] dark:bg-[#121212] rounded-xl p-8 md:p-12 mt-16 transition-colors duration-300 border border-gray-200 dark:border-gray-800">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Compare Plans
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Choose the plan that fits your needs. Start with our free tier and upgrade as you grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white dark:bg-[#1E1E1E] rounded-lg p-6 shadow-md transition-all duration-300 border ${
                  plan.popular 
                    ? 'border-primary-500 dark:border-primary-400 ring-2 ring-primary-500 dark:ring-primary-400 relative' 
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  {plan.period && <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700' 
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.price === '0' ? 'Get Started' : 'Subscribe'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to transform your academic life?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of students who are already using our AI assistants to improve their grades and reduce stress.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">
                Get Started for Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
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
    title: 'Smart Study Planning',
    description: 'AI-powered study plans that adapt to your learning style, schedule, and upcoming deadlines.',
    icon: <Calendar className="h-6 w-6" />,
    benefits: [
      'Personalized study schedules based on your learning habits',
      'Automatic reminders for important deadlines',
      'Adaptive planning that adjusts when you fall behind',
      'Integration with your academic calendar'
    ]
  },
  {
    title: 'Advanced Research Assistant',
    description: 'Streamline your research process with intelligent source discovery and organization.',
    icon: <Zap className="h-6 w-6" />,
    benefits: [
      'Find relevant academic sources for any topic',
      'Summarize research papers in seconds',
      'Organize sources by theme or argument',
      'Generate citations in any format automatically'
    ]
  },
  {
    title: 'Assignment Improvement',
    description: 'Get feedback on your assignments before submission to help you achieve better grades.',
    icon: <FileText className="h-6 w-6" />,
    benefits: [
      'Writing suggestions to improve clarity and flow',
      'Grammar and style checking for academic writing',
      'Plagiarism prevention tools',
      'Structure and argument strengthening advice'
    ]
  },
  {
    title: 'Concept Mastery',
    description: 'Deepen your understanding of complex topics with clear, personalized explanations.',
    icon: <Book className="h-6 w-6" />,
    benefits: [
      'Simplified explanations of difficult concepts',
      'Interactive learning through guided questions',
      'Visual aids and diagrams for better comprehension',
      'Practice problems with step-by-step solutions'
    ]
  }
];

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Basic features for students just getting started.',
    features: [
      'Basic AI study assistant',
      'Limited research queries (10/day)',
      'Basic study planner',
      '24/7 availability'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: '9.99',
    period: 'month',
    description: 'Everything you need for academic success.',
    features: [
      'Advanced AI assistant with all features',
      'Unlimited research queries',
      'Priority response times',
      'Advanced study analytics',
      'Collaboration tools for group projects'
    ],
    popular: true
  },
  {
    name: 'Teams',
    price: '19.99',
    period: 'month',
    description: 'Perfect for study groups and class projects.',
    features: [
      'Everything in Pro plan',
      'Up to 5 team members',
      'Shared resources and notes',
      'Team progress tracking',
      'Integration with learning management systems'
    ],
    popular: false
  }
];

export default FeaturesPage;
