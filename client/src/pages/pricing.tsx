import { MainLayout } from '@/components/main-layout';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  CreditCard, 
  Sparkles, 
  Zap, 
  PlusCircle,
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { motion, AnimatePresence } from 'framer-motion';

export function PricingPage() {
  const { isAuthenticated } = useAuth();
  const [activeIndex, setActiveIndex] = useState(1); // Default to the middle (popular) plan
  const [showDetails, setShowDetails] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Get card width for responsive animations
  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
      
      const handleResize = () => {
        if (cardRef.current) {
          setCardWidth(cardRef.current.offsetWidth);
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Color scheme for cards
  const cardColors = [
    { bg: 'from-blue-400 to-blue-500', shadow: 'shadow-blue-400/20' },
    { bg: 'from-purple-400 to-purple-600', shadow: 'shadow-purple-400/20' },
    { bg: 'from-pink-400 to-pink-600', shadow: 'shadow-pink-400/20' }
  ];
  
  const nextCard = () => {
    setShowDetails(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
    }, 150);
  };
  
  const prevCard = () => {
    setShowDetails(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? plans.length - 1 : prev - 1));
    }, 150);
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Choose the plan that works best for your academic needs.
            </p>
          </div>

          {/* Card Stack - Apple Wallet style */}
          <div className="relative h-[460px] sm:h-[500px] w-full max-w-md mx-auto mb-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-full flex items-center justify-center">
              {plans.map((plan, index) => {
                // Calculate distance from active card
                const distance = index - activeIndex;
                
                // We'll show at most 3 cards in the stack - the active one and one on each side
                const isVisible = Math.abs(distance) <= 1;
                
                // Cards other than active are scaled down
                const scale = distance === 0 ? 1 : 0.85;
                
                // Offset each card in the stack
                const yOffset = distance === 0 ? 0 : distance < 0 ? -28 : 28;
                
                // Calculate horizontal offset (creates a fan effect)
                const xOffset = distance * 10;
                
                // Calculate z-index to make sure active card is on top
                const zIndex = 10 - Math.abs(distance);
                
                // Rotate slightly based on distance
                const rotate = distance * 3;

                return (
                  <AnimatePresence key={index}>
                    {isVisible && (
                      <motion.div
                        ref={index === 1 ? cardRef : null}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ 
                          opacity: 1,
                          scale,
                          y: yOffset,
                          x: xOffset,
                          rotate: rotate,
                          zIndex
                        }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`absolute w-full sm:w-96 rounded-xl overflow-hidden ${
                          distance === 0 
                            ? `shadow-xl ${cardColors[index].shadow}`
                            : 'shadow-lg'
                        }`}
                        style={{ cursor: distance === 0 ? 'default' : 'pointer' }}
                        onClick={() => {
                          if (distance !== 0) {
                            setActiveIndex(index);
                          }
                        }}
                      >
                        <motion.div
                          layout
                          className={`p-6 bg-gradient-to-br ${cardColors[index].bg} text-white h-full`}
                        >
                          {/* Card Badge */}
                          {plan.popular && distance === 0 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                            >
                              Most Popular
                            </motion.div>
                          )}
                          
                          {/* Card Icon */}
                          <div className="mb-4">
                            {index === 0 ? (
                              <Zap className="h-10 w-10 text-white/90" />
                            ) : index === 1 ? (
                              <CreditCard className="h-10 w-10 text-white/90" />
                            ) : (
                              <Sparkles className="h-10 w-10 text-white/90" />
                            )}
                          </div>
                          
                          {/* Plan Name */}
                          <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                          
                          {/* Price */}
                          <div className="flex items-baseline mb-4">
                            <span className="text-4xl font-bold">${plan.price}</span>
                            {plan.period && (
                              <span className="ml-1 text-xl opacity-80">/{plan.period}</span>
                            )}
                          </div>
                          
                          {/* Description */}
                          <p className="text-white/90 mb-6">{plan.description}</p>
                          
                          {/* Key Features */}
                          <AnimatePresence>
                            {(distance === 0 && showDetails) && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2 mb-6"
                              >
                                {plan.features.map((feature, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start"
                                  >
                                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-white/90">{feature}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                          
                          {/* Action Buttons */}
                          {distance === 0 && (
                            <div className="flex flex-col gap-3">
                              <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                                <Button 
                                  className="w-full bg-white hover:bg-white/90 text-gray-900"
                                >
                                  {plan.price === '0' ? 'Get Started' : 'Subscribe'}
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                className="w-full border-white/30 hover:bg-white/10 text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleDetails();
                                }}
                              >
                                {showDetails ? 'Show Less' : 'Show Features'}
                              </Button>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mb-16">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevCard}
              aria-label="Previous plan"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {plans.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`h-3 w-3 rounded-full p-0 ${
                    index === activeIndex
                      ? 'bg-primary-500'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to plan ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextCard}
              aria-label="Next plan"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-10">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-[#121212] rounded-lg p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </motion.div>
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
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Start Free Trial
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

const faqs = [
  {
    question: 'How do credits work?',
    answer: 'Monthly credits can be used for any AI model offered. Different models cost different amounts of credits based on their processing power and capabilities.'
  },
  {
    question: 'What happens when I run out of credits?',
    answer: 'When you run out of credits, you can either wait until your next billing cycle or purchase additional credits separately. Free users are limited to 5 uses per day regardless of credits.'
  },
  {
    question: 'What is the 22% API markup?',
    answer: 'For developers using our API, there is a 22% markup on the base token price. This covers our infrastructure, API maintenance, and support costs for developers.'
  },
  {
    question: 'Can I switch between plans?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes to your billing will be prorated based on the time remaining in your current billing cycle.'
  },
  {
    question: 'Do unused credits roll over?',
    answer: 'No, credits do not roll over to the next month. Each billing cycle provides a fresh allocation of credits as specified in your plan.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to your paid features until the end of your current billing period.'
  }
];

export default PricingPage;