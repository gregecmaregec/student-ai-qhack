import { MainLayout } from "@/components/main-layout";
import { LandingChat } from "@/components/landing-chat";

export function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-20">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
            <span className="block">Students AI</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ask any academic question and get an instant answer
          </p>
        </div>
        
        <LandingChat />
      </div>
    </MainLayout>
  );
}