import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function CareersPage() {
  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">
              Join Our Team
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Help us build the future of AI-powered learning and education
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg mb-8">
              <div className="px-6 py-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Marketing Specialist</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Full-time · Remote</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-primary-600 dark:bg-purple-900 dark:text-purple-200">
                    New
                  </span>
                </div>
                <div className="mt-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    We're looking for a talented marketing specialist to help us reach more students and educators around the world. 
                    You'll be responsible for creating engaging content, managing social media channels, and developing marketing strategies to grow our user base.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => window.location.href = 'mailto:join@students-ai.com?subject=Marketing%20Specialist%20Application'}
                      className="inline-flex items-center"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg mb-8">
              <div className="px-6 py-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Software Engineer</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Full-time · Remote</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Technical
                  </span>
                </div>
                <div className="mt-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    Join our engineering team to build innovative AI-powered learning tools. We're looking for engineers with experience in 
                    React, Node.js, and AI/ML technologies who are passionate about transforming how students learn and study.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => window.location.href = 'mailto:join@students-ai.com?subject=Software%20Engineer%20Application'}
                      className="inline-flex items-center"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <h3 className="text-2xl font-serif font-medium text-gray-900 dark:text-white mb-6">
                Don't see a role that fits?
              </h3>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                We're always looking for talented people to join our team. Send us your resume and tell us how you can contribute.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:join@students-ai.com?subject=General%20Application'}
                className="inline-flex items-center"
                size="lg"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CareersPage;