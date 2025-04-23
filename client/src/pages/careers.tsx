import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Code, 
  GraduationCap,
  HeartHandshake, 
  Coffee,
  Zap,
  Mail,
  GavelIcon
} from 'lucide-react';

type JobPosition = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  emailSubject: string;
};

export function CareersPage() {
  const positions: JobPosition[] = [
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Marketing and the best product make the best mix.',
      icon: <BarChart className="h-10 w-10 text-primary" />,
      emailSubject: 'Marketing Position Application'
    },
    {
      id: 'software',
      title: 'Software',
      description: 'Send us proof of exceptional ability.',
      icon: <Code className="h-10 w-10 text-primary" />,
      emailSubject: 'Software Position Application'
    },
    {
      id: 'legal',
      title: 'Legal',
      description: 'Certified legal experts welcome.',
      icon: <GavelIcon className="h-10 w-10 text-primary" />,
      emailSubject: 'Legal Position Application'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}

      {/* Open Positions */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">Open Positions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {positions.map((position) => (
              <div key={position.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md p-6 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {position.icon}
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-medium text-center text-gray-900 dark:text-white mb-4">
                  {position.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow">
                  {position.description}
                </p>
                <Button 
                  className="w-full mt-auto"
                  onClick={() => window.location.href = `mailto:careers@students-ai.com?subject=${position.emailSubject}`}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CareersPage;