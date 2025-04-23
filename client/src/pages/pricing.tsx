import { MainLayout } from "@/components/main-layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mb-8 sm:mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm overflow-hidden transition-all duration-300 border ${
                plan.popular
                  ? "border-primary/40 dark:border-primary/30 ring-1 ring-primary/20 relative"
                  : "border-gray-200 dark:border-gray-800"
              } hover:shadow-md`}
            >
              <div className="p-3 sm:p-4">
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 dark:text-white text-left">
                    {plan.name}
                  </h2>
                  {plan.price && (
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {plan.price === "0" ? "Free" : `$${plan.price}`}
                      </span>
                      {plan.period && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 text-left min-h-[2rem]">
                  {plan.description}
                </p>
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Button
                    className="w-full mb-3 text-xs sm:text-sm py-1.5"
                    variant={plan.popular ? "default" : "outline"}
                    size="sm"
                  >
                    {plan.price === "0" ? "Get Started" : "Continue"}
                  </Button>
                </Link>
                <div>
                  <ul className="space-y-1.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-xs">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature comparison - mobile friendly */}
        <div className="mt-10 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="inline-block min-w-full align-middle">
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                  <TableHead className="w-1/3 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300"></TableHead>
                  <TableHead className="py-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Free
                  </TableHead>
                  <TableHead className="py-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Standard
                  </TableHead>
                  <TableHead className="py-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Premium
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
                {featureComparison.map((feature, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-950"
                        : "bg-gray-50/50 dark:bg-gray-900/50"
                    }
                  >
                    <TableCell className="py-3 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {feature.name}
                    </TableCell>
                    <TableCell className="py-3 text-xs text-center">
                      {feature.free ? (
                        feature.free === true ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature.free}
                          </span>
                        )
                      ) : (
                        <X className="h-4 w-4 text-red-400 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="py-3 text-xs text-center bg-primary/5 dark:bg-primary/10">
                      {feature.pro ? (
                        feature.pro === true ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {feature.pro}
                          </span>
                        )
                      ) : (
                        <X className="h-4 w-4 text-red-400 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="py-3 text-xs text-center">
                      {feature.teams ? (
                        feature.teams === true ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature.teams}
                          </span>
                        )
                      ) : (
                        <X className="h-4 w-4 text-red-400 mx-auto" />
                      )}
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
    name: "Free",
    price: "0",
    features: [
      "Up to 5 uses per week",
      "All essential features",
      "Access to all models",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "10",
    period: "month",
    features: [
      "$10 worth of credits",
      "Access to all AI models",
      "Unlimited uses (until credits depleted)",
      "File uploads and analysis",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "30",
    period: "month",
    features: [
      "$30 worth of credits",
      "Higher priority in the queue",
      "early access to new features market experimental",
      "Dedicated support",
    ],
    popular: false,
  },
];

const featureComparison = [
  {
    name: "Uses per week",
    free: "5",
    pro: "Until credits depleted",
    teams: "Until credits depleted",
  },
  {
    name: "Monthly Credits",
    free: "0",
    pro: "$10 worth",
    teams: "$30 worth",
  },
  {
    name: "AI Models Access",
    free: "Standard set",
    pro: "All models",
    teams: "All models",
  },
  {
    name: "Processing Priority",
    free: "Standard",
    pro: "Higher",
    teams: "Highest",
  },
  {
    name: "File Upload & Analysis",
    free: true,
    pro: true,
    teams: true,
  },
];

const faqs = [];

export default PricingPage;
