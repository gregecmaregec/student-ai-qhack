import React, { useState, useEffect } from 'react';
import { X, Cookie, InfoIcon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CookieSettings {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  // Define the cookie policy version to track changes
  const COOKIE_POLICY_VERSION = '1.0';
  
  // Default all cookies to true initially
  const defaultSettings: CookieSettings = {
    essential: true, // Essential cookies can't be disabled
    functional: true,
    analytics: true,
    marketing: false,
  };
  
  const [showBanner, setShowBanner] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);
  
  // Check if user has already consented on mount
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    const version = localStorage.getItem('cookie-policy-version');
    
    // Show banner if no consent or policy version has changed
    if (!consent || version !== COOKIE_POLICY_VERSION) {
      setShowBanner(true);
    } else {
      // Load saved settings
      try {
        const savedSettings = JSON.parse(localStorage.getItem('cookie-settings') || '');
        setSettings({
          ...defaultSettings,
          ...savedSettings,
        });
      } catch (e) {
        // If parsing fails, use default settings
        setSettings(defaultSettings);
      }
    }
  }, []);
  
  // Save consent with current settings
  const saveConsent = (newSettings?: CookieSettings) => {
    const settingsToSave = newSettings || settings;
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-policy-version', COOKIE_POLICY_VERSION);
    localStorage.setItem('cookie-settings', JSON.stringify(settingsToSave));
    setSettings(settingsToSave);
    setShowBanner(false);
    setShowDialog(false);
    
    // Here you would typically update your cookie/tracking implementation
    // based on the user's preferences (settingsToSave)
    console.log('Cookie preferences saved:', settingsToSave);
  };
  
  // Accept all cookies
  const acceptAll = () => {
    saveConsent({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };
  
  // Accept only essential cookies
  const acceptEssential = () => {
    saveConsent({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };
  
  // Handle individual setting changes
  const handleSettingChange = (key: keyof CookieSettings, value: boolean) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };
  
  return (
    <>
      {/* Cookie Consent Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start flex-1">
              <Cookie className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-1">Cookie Consent</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-0">
                  We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
                  Read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for more information.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 ml-0 md:ml-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowDialog(true)}
                className="whitespace-nowrap"
              >
                <Settings className="h-4 w-4 mr-2" />
                Cookie Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={acceptEssential}
                className="whitespace-nowrap"
              >
                Essential Only
              </Button>
              <Button 
                size="sm" 
                onClick={acceptAll}
                className="whitespace-nowrap bg-primary"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Cookie Settings Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Cookie className="h-5 w-5 mr-2 text-primary" />
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="cookies" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cookies">Cookie Settings</TabsTrigger>
              <TabsTrigger value="info">Cookie Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cookies" className="py-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Essential Cookies - Always enabled */}
                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="essential-cookies" className="text-base font-medium">
                        Essential Cookies
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Required for the website to function. Cannot be disabled.
                      </p>
                    </div>
                    <Switch 
                      id="essential-cookies" 
                      checked={settings.essential}
                      disabled
                    />
                  </div>
                  
                  {/* Functional Cookies */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <Label htmlFor="functional-cookies" className="text-base font-medium">
                        Functional Cookies
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Remember your preferences to personalize your experience.
                      </p>
                    </div>
                    <Switch 
                      id="functional-cookies" 
                      checked={settings.functional} 
                      onCheckedChange={(checked) => handleSettingChange('functional', checked)}
                    />
                  </div>
                  
                  {/* Analytics Cookies */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <Label htmlFor="analytics-cookies" className="text-base font-medium">
                        Analytics Cookies
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Help us improve by collecting anonymous usage data.
                      </p>
                    </div>
                    <Switch 
                      id="analytics-cookies" 
                      checked={settings.analytics} 
                      onCheckedChange={(checked) => handleSettingChange('analytics', checked)}
                    />
                  </div>
                  
                  {/* Marketing Cookies */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <Label htmlFor="marketing-cookies" className="text-base font-medium">
                        Marketing Cookies
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Used to deliver relevant advertisements based on your interests.
                      </p>
                    </div>
                    <Switch 
                      id="marketing-cookies" 
                      checked={settings.marketing} 
                      onCheckedChange={(checked) => handleSettingChange('marketing', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="py-4">
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium flex items-center mb-2">
                    <InfoIcon className="h-4 w-4 mr-2 text-primary" />
                    What are cookies?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Cookies are small text files that are stored on your browser when you visit websites. 
                    They are widely used to make websites work more efficiently and provide useful information 
                    to website owners.
                  </p>
                </div>
                
                <h4 className="font-medium">How we use cookies</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium">Essential Cookies</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      These cookies are necessary for the website to function properly. They enable core 
                      functionality such as security, network management, and account access. You cannot 
                      disable these cookies in our system.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium">Functional Cookies</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      These cookies help us to personalize content and functionality, including remembering 
                      your preferences, preferred language, or the region you are in.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium">Analytics Cookies</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      These cookies allow us to count visits and traffic sources so we can measure and improve 
                      the performance of our site. They help us to know which pages are the most and least 
                      popular and see how visitors move around the site.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium">Marketing Cookies</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      These cookies are used to track visitors across websites. The intention is to display 
                      ads that are relevant and engaging for the individual user.
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 pt-2">
                  For more information, please visit our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => saveConsent()}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CookieConsent;