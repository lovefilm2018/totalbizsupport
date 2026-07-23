import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-load page components on demand for route-based code splitting
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const HowWeWork = lazy(() => import("./pages/HowWeWork"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PersonalSupport = lazy(() => import("./pages/PersonalSupport"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function Router() {
  return (
    <WouterRouter>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/how-we-work" component={HowWeWork} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/personal-support" component={PersonalSupport} />
          
          {/* Fallback routes */}
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <ScrollToTop />
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
