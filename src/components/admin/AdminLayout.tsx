import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, MapPin, Newspaper, FileText, Image, Bell, Award, Star, Mail, Settings, LogOut, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Roadshows", href: "/admin/roadshows", icon: MapPin },
  { label: "Cities", href: "/admin/cities", icon: MapPin },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Home Header", href: "/admin/home-hero", icon: Image },
  { label: "Popups", href: "/admin/popups", icon: Bell },
  { label: "Features", href: "/admin/features", icon: Star },
  { label: "Awards", href: "/admin/awards", icon: Award },
  { label: "Contact", href: "/admin/contact", icon: Mail },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-muted">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/admin" className="text-lg font-heading font-bold text-foreground">Wolves Int.</Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href || (item.href !== "/admin" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={signOut}>
            <LogOut size={18} /> Sign Out
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 lg:px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
          <h2 className="text-lg font-heading font-semibold text-foreground">Admin Panel</h2>
          <div className="ml-auto text-sm text-muted-foreground">{user.email}</div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;