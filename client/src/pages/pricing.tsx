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
        </div>

        {/* Main pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:shadow-md"
            >
              <div className="p-4">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2 text-center">
                  {plan.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 h-12 text-center">
                  {plan.description}
                </p>
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Button
                    className="w-full mb-4 text-sm py-2"
                    variant="outline"
                    size="sm"
                  >
                    {plan.price === '0' ? 'Get Started' : 'Continue'}
                  </Button>
                </Link>
                <div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature comparison - mobile friendly */}
        <div className="mt-12 overflow-x-auto -mx-3 sm:-mx-6 lg:mx-0">
          <div className="inline-block min-w-full align-middle">
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
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
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button className="px-5 py-2">
                Chat with Studie, our newest Agent
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
    features: [
      'Up to 5 uses per day',
      'All essential features',
      'Access to all models',
    ],
    popular: false
  },
  {
    name: 'Standard',
    price: '10',
    period: 'month',
    features: [
      '$10 worth of token credits',
      'Access to all AI models',
      'Unlimited uses (until credits depleted)',
      'File uploads and analysis',
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: '30',
    period: 'month',
    description: '$30 of credits',
    features: [
      '$30 worth of processing credits',
      'Higher priority in the queue',
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
    free: 'Standard set', 
    pro: 'All models', 
    teams: 'All models' 
  },
  { 
    name: 'Processing Priority', 
    free: 'Standard', 
    pro: 'Higher', 
    teams: 'Highest' 
  },
  { 
    name: 'File Upload & Analysis', 
    free: true, 
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
