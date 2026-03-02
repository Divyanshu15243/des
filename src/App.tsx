import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Roadshows from "./pages/Roadshows";
import RoadshowDetail from "./pages/RoadshowDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import Features from "./pages/Features";
import Awards from "./pages/Awards";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoadshows from "./pages/admin/AdminRoadshows";
import AdminRoadshowForm from "./pages/admin/AdminRoadshowForm";
import AdminCities from "./pages/admin/AdminCities";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBlogForm from "./pages/admin/AdminBlogForm";
import AdminHomeHero from "./pages/admin/AdminHomeHero";
import AdminPopups from "./pages/admin/AdminPopups";
import AdminFeatures from "./pages/admin/AdminFeatures";
import AdminAwards from "./pages/admin/AdminAwards";
import AdminContact from "./pages/admin/AdminContact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roadshows" element={<Roadshows />} />
            <Route path="/roadshows/:slug" element={<RoadshowDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="roadshows" element={<AdminRoadshows />} />
              <Route path="roadshows/:id" element={<AdminRoadshowForm />} />
              <Route path="cities" element={<AdminCities />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="blog/:id" element={<AdminBlogForm />} />
              <Route path="home-hero" element={<AdminHomeHero />} />
              <Route path="popups" element={<AdminPopups />} />
              <Route path="features" element={<AdminFeatures />} />
              <Route path="awards" element={<AdminAwards />} />
              <Route path="contact" element={<AdminContact />} />
            </Route>

            <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
