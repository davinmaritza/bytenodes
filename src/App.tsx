import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PageTransition } from "./components/PageTransition";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import PricingServer from "./pages/PricingServer";
import PricingVPS from "./pages/PricingVPS";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Payment from "./pages/Payment";
import Tickets from "./pages/Tickets";
import FAQ from "./pages/FAQ";
import Documentation from "./pages/Documentation";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import Dashboard from "./pages/client/Dashboard";
import OrderServer from "./pages/client/OrderServer";
import NotFound from "./pages/NotFound";
// Legal Pages
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import AcceptableUse from "./pages/legal/AcceptableUse";
import SLA from "./pages/legal/SLA";
import RefundPolicy from "./pages/legal/RefundPolicy";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/pricing/servers" element={<PageTransition><PricingServer /></PageTransition>} />
        <Route path="/pricing/vps" element={<PageTransition><PricingVPS /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/docs" element={<PageTransition><Documentation /></PageTransition>} />
        
        {/* Legal Pages */}
        <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/cookies" element={<PageTransition><CookiePolicy /></PageTransition>} />
        <Route path="/acceptable-use" element={<PageTransition><AcceptableUse /></PageTransition>} />
        <Route path="/sla" element={<PageTransition><SLA /></PageTransition>} />
        <Route path="/refund" element={<PageTransition><RefundPolicy /></PageTransition>} />
        
        <Route path="/client/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/client/register" element={<PageTransition><Register /></PageTransition>} />
        
        {/* Protected User Routes */}
        <Route path="/client/dashboard" element={
          <PageTransition>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </PageTransition>
        } />
        <Route path="/client/order" element={
          <PageTransition>
            <ProtectedRoute>
              <OrderServer />
            </ProtectedRoute>
          </PageTransition>
        } />
        <Route path="/tickets" element={
          <PageTransition>
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          </PageTransition>
        } />
        <Route path="/payment" element={
          <PageTransition>
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          </PageTransition>
        } />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <PageTransition>
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          </PageTransition>
        } />
        
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AnimatedRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
