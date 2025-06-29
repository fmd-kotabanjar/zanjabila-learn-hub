import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Program from "./pages/Program";
import Artikel from "./pages/Artikel";
import Ebook from "./pages/Ebook";
import Login from "./pages/Login";
import Daftar from "./pages/Daftar";
import Bantuan from "./pages/Bantuan";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import CreateDemoAccounts from "./pages/CreateDemoAccounts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/program" element={<Program />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/ebook" element={<Ebook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/daftar" element={<Daftar />} />
            <Route path="/bantuan" element={<Bantuan />} />
            <Route path="/setup-demo" element={<CreateDemoAccounts />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;