import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Code, 
  GraduationCap, 
  HeartHandshake, 
  Coffee,
  Zap,
  BarChart,
  Users,
  Mail,
  CheckCircle2 
} from 'lucide-react';

type JobPosting = {
  id: string;
  title: string;
  department: string;
  location: string;
  remote: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  icon: JSX.Element;
};

export function CareersPage() {
  const jobPostings: JobPosting[] = [
    {
      id: 'marketing-specialist',
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'London, UK',
      remote: true,
      description: 'We are looking for a creative Marketing Specialist to join our team and help us grow our educational AI platform. You will play a crucial role in developing and implementing marketing strategies for students-ai.com.',
      responsibilities: [
        'Develop and execute marketing campaigns targeting universities and educational institutions',
        'Create engaging content for our blog, social media, and newsletters',
        'Analyze marketing data and suggest improvements to our strategies',
        'Collaborate with the product team to ensure our marketing efforts align with our product roadmap',
        'Build relationships with educational partners and influencers'
      ],
      requirements: [
        'Bachelor\'s degree in Marketing, Communications, or a related field',
        '2+ years of experience in digital marketing, preferably in the EdTech sector',
        'Excellent writing and communication skills',
        'Proficiency with marketing analytics tools',
        'Experience with social media marketing and content creation'
      ],
      benefits: [
        'Competitive salary and equity options',
        'Remote-first work environment with flexible hours',
        'Professional development budget',
        'Premium health insurance',
        'Regular team retreats in exciting locations'
      ],
      icon: <BarChart className="h-8 w-8 text-primary" />
    },
    {
      id: 'senior-software-engineer',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Berlin, Germany',
      remote: true,
      description: 'We are seeking an experienced Senior Software Engineer to lead the development of our AI-driven educational platform. You will work with cutting-edge technologies to create tools that help students learn more effectively.',
      responsibilities: [
        'Design and implement new features for our web application',
        'Optimize application for maximum speed and scalability',
        'Collaborate with AI researchers to integrate advanced models into our platform',
        'Mentor junior engineers and review code',
        'Improve engineering processes and development workflows'
      ],
      requirements: [
        'Bachelor\'s or Master\'s degree in Computer Science or related field',
        '5+ years of experience in full-stack development',
        'Strong proficiency with JavaScript/TypeScript, React, and Node.js',
        'Experience with AI/ML integration in web applications',
        'Knowledge of database design and optimization'
      ],
      benefits: [
        'Competitive salary and equity options',
        'Remote-first work environment with flexible hours',
        'Professional development budget',
        'Premium health insurance',
        'Regular team retreats in exciting locations'
      ],
      icon: <Code className="h-8 w-8 text-primary" />
    },
    {
      id: 'student-success-manager',
      title: 'Student Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      remote: true,
      description: 'We are looking for a passionate Student Success Manager to be the voice of our student users. You will ensure students have a positive experience with our platform and help them maximize their learning outcomes.',
      responsibilities: [
        'Provide exceptional support to student users through various channels',
        'Create educational content to help users get the most out of our platform',
        'Collect and analyze user feedback to inform product improvements',
        'Develop and implement user onboarding and engagement strategies',
        'Collaborate with the product team to prioritize feature requests'
      ],
      requirements: [
        'Bachelor\'s degree in Education, Psychology, or a related field',
        '2+ years of experience in customer success or education',
        'Strong communication and interpersonal skills',
        'Ability to explain complex concepts in simple terms',
        'Passion for education and student success'
      ],
      benefits: [
        'Competitive salary and equity options',
        'Remote-first work environment with flexible hours',
        'Professional development budget',
        'Premium health insurance',
        'Regular team retreats in exciting locations'
      ],
      icon: <Users className="h-8 w-8 text-primary" />
    },
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

          <div className="space-y-8">
            {jobPostings.map((job) => (
              <div key={job.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <div className="flex-shrink-0">
                      {job.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-medium text-gray-900 dark:text-white">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <Briefcase className="h-3 w-3 mr-1" /> {job.department}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {job.location}
                        </span>
                        {job.remote && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            Remote Friendly
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-gray-600 dark:text-gray-300">{job.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button
                        onClick={() => {
                          const element = document.getElementById(`job-details-${job.id}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {jobPostings.map((job) => (
            <div key={job.id} id={`job-details-${job.id}`} className="mb-16">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    {job.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-gray-900 dark:text-white">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <Briefcase className="h-3 w-3 mr-1" /> {job.department}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {job.location}
                      </span>
                      {job.remote && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          Remote Friendly
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>{job.description}</p>

                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </ul>

                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, idx) => (
                      <li key={idx}>{requirement}</li>
                    ))}
                  </ul>

                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    Benefits
                  </h4>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Button 
                    size="lg"
                    onClick={() => window.location.href = `mailto:careers@students-ai.com?subject=Application for ${job.title} position`}
                    className="inline-flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Apply for this position
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-medium text-gray-900 dark:text-white">Don't see a position that matches your skills?</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              We're always looking for talented people. Send us your resume and we'll keep it on file for future opportunities.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => window.location.href = 'mailto:careers@students-ai.com?subject=General Application'}
                className="inline-flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send us your resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CareersPage;