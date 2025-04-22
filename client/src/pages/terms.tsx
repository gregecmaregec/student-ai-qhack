import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Mail, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export function TermsPage() {
  return (
    <MainLayout>
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: April 22, 2025
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Welcome to students-ai.com. These Terms of Service ("Terms") govern your access to and use of students-ai.com and its 
              associated services (collectively, the "Service"). Please read these Terms carefully before using the Service.
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, 
              you may not access or use the Service.
            </p>

            <div className="bg-primary/5 p-6 rounded-lg my-8 border-l-4 border-primary">
              <h3 className="flex items-center text-primary mt-0 mb-4">
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Data Removal Rights</span>
              </h3>
              <p className="mb-0">
                <strong>If you contact us at <a href="mailto:info@students-ai.com" className="text-primary hover:underline">info@students-ai.com</a> with a request to remove your data,</strong> we will promptly delete all your personal information from:
              </p>
              <ul className="mb-0">
                <li>Our database systems</li>
                <li>Authentication services</li>
                <li>Any stored personal identifiers</li>
              </ul>
              <p className="mb-0">
                After this process, no personally identifiable data related to your account will remain in our systems. You may also delete cookies from your browser at any time.
              </p>
            </div>

            <h2 className="flex items-center">
              <FileText className="h-6 w-6 mr-2 text-primary" />
              Account Registration and Use
            </h2>
            <p>
              To use certain features of the Service, you may need to create an account. You agree to provide accurate, 
              current, and complete information during the registration process and to update such information to keep it 
              accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your account credentials and for any activities or actions under your 
              account. We reserve the right to disable any user account at any time if we believe you have violated these Terms.
            </p>

            <h2>Acceptable Use</h2>
            <p>
              You agree not to use the Service for any purpose that is illegal, harmful, or prohibited by these Terms. 
              This includes, but is not limited to:
            </p>
            <ul>
              <li>Using the Service to violate any applicable law or regulation</li>
              <li>Attempting to interfere with or disrupt the Service or servers/networks connected to the Service</li>
              <li>Using the Service to infringe upon intellectual property rights</li>
              <li>Using the Service to engage in any form of harassment, hate speech, or harmful conduct</li>
              <li>Using automated methods to access or use the Service without our express permission</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by students-ai.com and 
              are protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property or proprietary rights laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly 
              perform, republish, download, store, or transmit any of the material on our Service without prior written consent.
            </p>

            <h2>Privacy and Data Protection</h2>
            <p>
              Our Privacy Policy describes how we handle the information you provide to us when you use our Service. 
              By using the Service, you consent to our collection and use of information as set forth in the Privacy Policy.
            </p>
            <p>
              As mentioned above, you have the right to request the deletion of your personal data at any time by 
              contacting us at <a href="mailto:info@students-ai.com" className="text-primary hover:underline">info@students-ai.com</a>.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
            <p>
              All provisions of the Terms which by their nature should survive termination shall survive termination, 
              including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
              provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change 
              will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound 
              by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:info@students-ai.com" className="text-primary hover:underline">info@students-ai.com</a>.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => window.location.href = 'mailto:info@students-ai.com?subject=Terms%20of%20Service%20Question'}
              className="inline-flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Legal Team
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default TermsPage;