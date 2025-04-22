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
      description: 'We are looking for a creative marketer to help us grow our educational AI platform. You will play a crucial role in developing and implementing marketing strategies for students-ai.com.',
      icon: <BarChart className="h-10 w-10 text-primary" />,
      emailSubject: 'Marketing Position Application'
    },
    {
      id: 'software',
      title: 'Software',
      description: 'We are seeking an experienced software developer to contribute to our AI-driven educational platform. You will work with cutting-edge technologies to create tools that help students learn more effectively.',
      icon: <Code className="h-10 w-10 text-primary" />,
      emailSubject: 'Software Position Application'
    },
    {
      id: 'legal',
      title: 'Legal',
      description: 'We need a legal expert to help with privacy regulations, terms of service, and other legal matters related to our educational technology platform. Experience with GDPR and educational software is a plus.',
      icon: <GavelIcon className="h-10 w-10 text-primary" />,
      emailSubject: 'Legal Position Application'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Join Our Mission to Transform Education
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Help us build the future of learning with AI that makes education more accessible, personalized, and effective for students worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core principles guide our work and shape our company culture.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-900 dark:text-white">Student-Centered</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We put students first in everything we build, focusing on their needs and educational outcomes.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-900 dark:text-white">Innovation</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We embrace cutting-edge technology and creative thinking to solve complex educational challenges.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-900 dark:text-white">Integrity</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We maintain high ethical standards, with transparency and respect in all our interactions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-gray-900 dark:text-white">Work-Life Balance</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We value flexibility, well-being, and sustainable productivity over burnout culture.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">Open Positions</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join our diverse, remote-first team working to transform education through AI technology.
            </p>
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