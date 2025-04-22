import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Mail, FileText, Award, Newspaper } from 'lucide-react';

export function PressPage() {
  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">
              Press & Media
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Resources and information for journalists and media professionals
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-primary/10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Media Contact</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    For press inquiries, interview requests, or additional information about students-ai.com, please contact:
                  </p>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">Press Team</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a href="mailto:info@students-ai.com" className="text-primary hover:underline">
                        info@students-ai.com
                      </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-4">
                      For technical inquiries or infrastructure questions:
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a href="mailto:gregor.mihelac@outlook.com" className="text-primary hover:underline">
                        gregor.mihelac@outlook.com
                      </a>
                      <span className="text-sm ml-2 text-gray-500"> (Infrastructure Lead)</span>
                    </p>
                  </div>
                  <div className="mt-8">
                    <Button
                      onClick={() => window.location.href = 'mailto:info@students-ai.com'}
                      className="inline-flex items-center"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Press Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Press Kit</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Download logos, product screenshots, and other media assets for publication.
              </p>
              <div className="mt-auto pt-4">
                <Button variant="outline" className="w-full">
                  Download Press Kit
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">About Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn about our mission, vision, and the team behind students-ai.com.
              </p>
              <div className="mt-auto pt-4">
                <Button variant="outline" className="w-full">
                  Read Our Story
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Newspaper className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">News</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Browse our press releases and recent news coverage of students-ai.com.
              </p>
              <div className="mt-auto pt-4">
                <Button variant="outline" className="w-full">
                  View Latest News
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PressPage;