
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "./context/LocationContext";
import { AdminProvider } from "./context/AdminContext";
import Index from "./pages/Index";
import FindDoctor from "./pages/FindDoctor";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import Nearby from "./pages/Nearby";
import Emergency from "./pages/Emergency";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProfileSettings from "./pages/ProfileSettings";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory";
import AdminLogin from "./pages/Admin/Login";
import UserLogin from "./pages/Auth/UserLogin";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminDoctors from "./pages/Admin/Doctors";
import AdminSchedules from "./pages/Admin/Schedules";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <LocationProvider>
            <AdminProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* User Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/find" element={<FindDoctor />} />
                <Route path="/book/:doctorId" element={<BookAppointment />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/nearby" element={<Nearby />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/accounts" element={<Settings />} />
                <Route path="/settings/profile" element={<ProfileSettings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/history" element={<PaymentHistory />} />
                
                {/* Auth Routes */}
                <Route path="/user-login" element={<UserLogin />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/doctors" element={<AdminDoctors />} />
                <Route path="/admin/schedules" element={<AdminSchedules />} />
                <Route path="/admin/settings" element={<AdminDashboard />} />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AdminProvider>
          </LocationProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
