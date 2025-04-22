import { MainLayout } from '@/components/main-layout';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from '@/hooks/use-auth';

export function PricingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Choose the plan that works best for your academic needs. All plans include our core AI assistance features.
          </p>
        </div>

        {/* Main pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden transition-all duration-300 border ${
                plan.popular
                  ? 'border-primary-500 dark:border-primary-400 ring-2 ring-primary-500 dark:ring-primary-400 relative'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                  {plan.name}
                </h2>
                <div className="mb-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 h-16">
                  {plan.description}
                </p>
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Button
                    className={`w-full mb-6 ${
                      plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.price === '0' ? 'Get Started' : 'Subscribe'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Plan includes:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="mt-20 mb-16">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-10">
            Compare All Features
          </h2>

          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A comparison of all available features by plan</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Feature</TableHead>
                  <TableHead>Free</TableHead>
                  <TableHead>Pro</TableHead>
                  <TableHead>Teams</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureComparison.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    <TableCell>
                      {feature.free ? 
                        feature.free === true ? <CheckCircle className="h-5 w-5 text-green-500" /> : feature.free
                        : <X className="h-5 w-5 text-red-500" />}
                    </TableCell>
                    <TableCell>
                      {feature.pro ? 
                        feature.pro === true ? <CheckCircle className="h-5 w-5 text-green-500" /> : feature.pro
                        : <X className="h-5 w-5 text-red-500" />}
                    </TableCell>
                    <TableCell>
                      {feature.teams ? 
                        feature.teams === true ? <CheckCircle className="h-5 w-5 text-green-500" /> : feature.teams
                        : <X className="h-5 w-5 text-red-500" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-10">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#F5F5DC] dark:bg-[#121212] rounded-lg p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Ready to get started?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of students who are already using our AI assistants to improve their academic performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button size="lg" className="px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Data
const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for trying out our AI assistant and basic study needs.',
    features: [
      'Basic AI study assistant',
      'Limited research queries (10/day)',
      'Basic study planner',
      '24/7 availability',
      'Single user only'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: '9.99',
    period: 'month',
    description: 'Everything you need for serious academic success.',
    features: [
      'Advanced AI assistant with all features',
      'Unlimited research queries',
      'Priority response times',
      'Advanced study analytics',
      'Collaboration tools for group projects',
      'File uploads and analysis'
    ],
    popular: true
  },
  {
    name: 'Teams',
    price: '19.99',
    period: 'month',
    description: 'Perfect for study groups and collaborative projects.',
    features: [
      'Everything in Pro plan',
      'Up to 5 team members',
      'Shared resources and notes',
      'Team progress tracking',
      'Integrated group chat',
      'Integration with learning management systems'
    ],
    popular: false
  }
];

const featureComparison = [
  { 
    name: 'AI Study Assistant', 
    free: 'Basic', 
    pro: 'Advanced', 
    teams: 'Advanced' 
  },
  { 
    name: 'Research Queries', 
    free: '10/day', 
    pro: 'Unlimited', 
    teams: 'Unlimited' 
  },
  { 
    name: 'Study Planning', 
    free: 'Basic', 
    pro: 'Advanced', 
    teams: 'Advanced' 
  },
  { 
    name: 'Assignment Helper', 
    free: 'Basic', 
    pro: 'Advanced', 
    teams: 'Advanced' 
  },
  { 
    name: 'Concept Explainer', 
    free: true, 
    pro: true, 
    teams: true 
  },
  { 
    name: 'Citation Generator', 
    free: true, 
    pro: true, 
    teams: true 
  },
  { 
    name: 'File Upload & Analysis', 
    free: false, 
    pro: true, 
    teams: true 
  },
  { 
    name: 'Group Collaboration', 
    free: false, 
    pro: 'Limited', 
    teams: 'Full' 
  },
  { 
    name: 'Response Priority', 
    free: 'Standard', 
    pro: 'Priority', 
    teams: 'Priority' 
  },
  { 
    name: 'Study Analytics', 
    free: 'Basic', 
    pro: 'Advanced', 
    teams: 'Advanced + Team' 
  },
  { 
    name: 'Team Members', 
    free: '1', 
    pro: '1', 
    teams: 'Up to 5' 
  },
  { 
    name: 'LMS Integration', 
    free: false, 
    pro: false, 
    teams: true 
  }
];

const faqs = [
  {
    question: 'Can I switch between plans?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes to your billing will be prorated based on the time remaining in your current billing cycle.'
  },
  {
    question: 'Is there a student discount?',
    answer: 'Yes! Students with a valid .edu email address can get 20% off any paid plan. Contact our support team after signing up to apply for the discount.'
  },
  {
    question: 'What does "limited research queries" mean?',
    answer: 'Research queries are in-depth searches for academic resources and information. Free users can make 10 such queries per day, while paid plans have unlimited access.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to your paid features until the end of your current billing period.'
  },
  {
    question: 'How do team accounts work?',
    answer: 'With the Teams plan, one person serves as the admin and can invite up to 4 additional members. All members share resources and collaborate within a shared workspace.'
  },
  {
    question: 'Do you support international students?',
    answer: 'Absolutely! Our platform is available worldwide, and our AI assistants can help with academic systems from different countries. We also support multiple languages.'
  }
];

export default PricingPage;
