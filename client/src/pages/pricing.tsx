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
      <div className="bg-white dark:bg-gray-900 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Simple Pricing
          </h1>
          <p className="max-w-2xl mx-auto text-base text-gray-600 dark:text-gray-300">
            Choose the plan that fits your needs
          </p>
        </div>

        {/* Main pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md overflow-hidden transition-all duration-300 border ${
                plan.popular
                  ? 'border-primary-500 dark:border-primary-400 ring-1 ring-primary-500 dark:ring-primary-400 relative'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                  Popular
                </div>
              )}
              <div className="p-4 sm:p-5">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h2>
                <div className="mb-3 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white font-['Tiro_Kannada']">${plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 h-12">
                  {plan.description}
                </p>
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Button
                    className={`w-full mb-4 text-sm py-2 ${
                      plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="sm"
                  >
                    {plan.price === '0' ? 'Get Started' : 'Subscribe'}
                  </Button>
                </Link>
                <div>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-xs">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className="text-xs text-primary-600 pt-1">+ {plan.features.length - 3} more features</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature comparison - mobile friendly */}
        <div className="mt-12 overflow-x-auto -mx-3 sm:-mx-6 lg:mx-0">
          <h2 className="text-2xl font-serif font-bold text-center text-gray-900 dark:text-white mb-6">
            Key Features
          </h2>
          <div className="inline-block min-w-full align-middle">
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <TableCaption className="text-xs">Feature comparison by plan</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3 text-xs">Feature</TableHead>
                  <TableHead className="text-xs">Free</TableHead>
                  <TableHead className="text-xs">Standard</TableHead>
                  <TableHead className="text-xs">Premium</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureComparison.slice(0, 5).map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs font-medium">{feature.name}</TableCell>
                    <TableCell className="text-xs">
                      {feature.free ? 
                        feature.free === true ? <CheckCircle className="h-4 w-4 text-green-500" /> : feature.free
                        : <X className="h-4 w-4 text-red-500" />}
                    </TableCell>
                    <TableCell className="text-xs">
                      {feature.pro ? 
                        feature.pro === true ? <CheckCircle className="h-4 w-4 text-green-500" /> : feature.pro
                        : <X className="h-4 w-4 text-red-500" />}
                    </TableCell>
                    <TableCell className="text-xs">
                      {feature.teams ? 
                        feature.teams === true ? <CheckCircle className="h-4 w-4 text-green-500" /> : feature.teams
                        : <X className="h-4 w-4 text-red-500" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>


        {/* CTA Section - simplified */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Ready to start?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button className="px-5 py-2">
                Chat with Studie
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
    description: 'Limited free plan with basic features to get started.',
    features: [
      'Up to 5 uses per day',
      'Basic AI study assistance',
      'Access to standard models',
      'No credit card required',
      'Web access only'
    ],
    popular: false
  },
  {
    name: 'Standard',
    price: '10',
    period: 'month',
    description: '$10 of credits per month for token usage across all models.',
    features: [
      '$10 worth of processing credits',
      'Access to all AI models',
      'Unlimited uses (until credits depleted)',
      'Higher priority in the queue',
      'File uploads and analysis',
      'API access for developers'
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: '30',
    period: 'month',
    description: '$50 of credits per month for intensive research and larger projects.',
    features: [
      '$50 worth of processing credits',
      'Access to all AI models including premium',
      'Priority processing',
      'Advanced study analytics',
      'Collaboration tools for group projects',
      'Dedicated support'
    ],
    popular: false
  }
];

const featureComparison = [
  { 
    name: 'Uses per day', 
    free: '5', 
    pro: 'Until credits depleted', 
    teams: 'Until credits depleted' 
  },
  { 
    name: 'Monthly Credits', 
    free: '0', 
    pro: '$10 worth', 
    teams: '$50 worth' 
  },
  { 
    name: 'AI Models Access', 
    free: 'Standard only', 
    pro: 'All models', 
    teams: 'All + Premium models' 
  },
  { 
    name: 'Processing Priority', 
    free: 'Standard', 
    pro: 'Higher', 
    teams: 'Highest' 
  },
  { 
    name: 'File Upload & Analysis', 
    free: false, 
    pro: true, 
    teams: true 
  },
  { 
    name: 'API Access', 
    free: false, 
    pro: true, 
    teams: true 
  },
  { 
    name: 'Collaboration Tools', 
    free: false, 
    pro: 'Basic', 
    teams: 'Advanced' 
  },
  { 
    name: 'Study Analytics', 
    free: 'Basic', 
    pro: 'Standard', 
    teams: 'Advanced' 
  },
  { 
    name: 'Support', 
    free: 'Community', 
    pro: 'Email', 
    teams: 'Dedicated' 
  },
  { 
    name: 'Additional API Markup', 
    free: 'N/A', 
    pro: '22%', 
    teams: '22%' 
  }
];

const faqs = [
];

export default PricingPage;
