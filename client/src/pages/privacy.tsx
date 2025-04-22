import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Mail, ShieldAlert, UserX, Cookie, Clock } from 'lucide-react';

export function PrivacyPage() {
  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: April 22, 2025
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              At students-ai.com, we are committed to protecting your privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
            </p>

            <div className="bg-primary/5 p-6 rounded-lg my-8 border-l-4 border-primary">
              <h3 className="flex items-center text-primary mt-0 mb-4">
                <ShieldAlert className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Data Removal Commitment</span>
              </h3>
              <p className="mb-0">
                <strong>If you contact us at <a href="mailto:info@students-ai.com" className="text-primary hover:underline">info@students-ai.com</a> with a request to remove your data,</strong> we will promptly delete all your personal information from:
              </p>
              <ul className="mb-0">
                <li>Our database systems</li>
                <li>Authentication services</li>
                <li>Any backups and logs containing personally identifiable information</li>
              </ul>
              <p className="mb-0">
                After this process, no personally identifiable data related to your account will remain in our systems.
              </p>
            </div>

            <h2 className="flex items-center">
              <UserX className="h-6 w-6 mr-2 text-primary" />
              Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul>
              <li>Create an account (name, email, education information)</li>
              <li>Use our AI tools (queries, study materials)</li>
              <li>Participate in surveys or promotions</li>
              <li>Contact our support team</li>
            </ul>
            <p>
              We also collect certain information automatically when you use our platform, including:
            </p>
            <ul>
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Usage patterns and preferences</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2 className="flex items-center">
              <Cookie className="h-6 w-6 mr-2 text-primary" />
              Cookie Policy
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our platform. You can control your cookie preferences at any time using our Cookie Preferences Center.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg my-6">
              <h4 className="font-medium mb-2">Types of cookies we use:</h4>
              <ul className="mb-0">
                <li><strong>Essential cookies:</strong> Required for the platform to function properly</li>
                <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </div>
            <p>
              <strong>You may delete your cookies at any time</strong> through your browser settings. Please note that disabling certain cookies may limit your ability to use some features of our platform.
            </p>

            <h2 className="flex items-center">
              <Clock className="h-6 w-6 mr-2 text-primary" />
              Data Retention
            </h2>
            <p>
              We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
            <p>
              If you request the deletion of your data, we will promptly remove all personally identifiable information from our systems as described above.
            </p>

            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at <a href="mailto:info@students-ai.com" className="text-primary hover:underline">info@students-ai.com</a>.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:info@students-ai.com" className="text-primary hover:underline">info@students-ai.com</a>.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => window.location.href = 'mailto:info@students-ai.com?subject=Privacy%20Policy%20Question'}
              className="inline-flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Privacy Team
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PrivacyPage;