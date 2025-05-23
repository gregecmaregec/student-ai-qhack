import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import FeaturesPage from "@/pages/features";
import AboutPage from "@/pages/about";
import PricingPage from "@/pages/pricing";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import CareersPage from "@/pages/careers";
import PressPage from "@/pages/press";
import DashboardPage from "@/pages/dashboard";
import AppPage from "@/pages/app";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, AuthContext } from "@/contexts/auth-context";
import ProtectedRoute from "./components/auth/protected-route";
import CookieConsent from "@/components/cookie-consent";
import { useContext } from "react";

// Landing routes are only accessible for non-authenticated users
const LandingRoute = ({ component: Component, ...rest }: any) => {
  const authContext = useContext(AuthContext);
  const [location] = useLocation();
  
  if (authContext?.user) {
    return <Redirect to="/app" />;
  }
  
  return <Component {...rest} />;
};

function Router() {
  return (
    <Switch>
      <Route path="/">
        <LandingRoute component={HomePage} />
      </Route>
      <Route path="/login">
        <LandingRoute component={LoginPage} />
      </Route>
      <Route path="/signup">
        <LandingRoute component={SignupPage} />
      </Route>
      <Route path="/features">
        <LandingRoute component={FeaturesPage} />
      </Route>
      <Route path="/about">
        <LandingRoute component={AboutPage} />
      </Route>
      <Route path="/pricing">
        <LandingRoute component={PricingPage} />
      </Route>
      <Route path="/privacy">
        <PrivacyPage />
      </Route>
      <Route path="/terms">
        <TermsPage />
      </Route>
      <Route path="/careers">
        <CareersPage />
      </Route>
      <Route path="/press">
        <PressPage />
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </Route>
      <Route path="/app">
        <ProtectedRoute>
          <AppPage />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <CookieConsent />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
