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
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import Dashboard from "./pages/client/Dashboard";
import OrderServer from "./pages/client/OrderServer";
import NotFound from "./pages/NotFound";

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
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
