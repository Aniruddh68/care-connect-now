
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindDoctor from "./pages/FindDoctor";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import Nearby from "./pages/Nearby";
import Emergency from "./pages/Emergency";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find" element={<FindDoctor />} />
          <Route path="/book/:doctorId" element={<BookAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
