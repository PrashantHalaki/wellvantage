import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingScreen } from '@/pages/LandingScreen';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';
import Index from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import Leads from './pages/Leads';
import LeadAdd from './pages/LeadAdd';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingScreen />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/onboarding' element={<Onboarding />} />
            <Route element={<MainLayout />}>
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/leads'
                element={
                  <ProtectedRoute>
                    <Leads />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/lead/add'
                element={
                  <ProtectedRoute>
                    <LeadAdd />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/wv_leads'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/members'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/membership'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/attendance'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/employees'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/revenue'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/expenses'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/workouts'
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
