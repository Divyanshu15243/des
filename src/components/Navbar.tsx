import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import wolvesLogo from "@/assets/wolves-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Roadshows", href: "/roadshows" },
  { label: "Blog", href: "/blog" },
  { label: "Features", href: "/features" },
  { label: "Awards", href: "/awards" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 ${!isHome ? "bg-primary" : ""}`}>
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <img src={wolvesLogo} alt="Wolves International" className="h-10 md:h-12" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-body font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-secondary"
                  : "text-primary-foreground/80 hover:text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6">
            Register Now
          </Button>
        </div>

        <button className="lg:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-primary/95 backdrop-blur-md border-t border-primary-foreground/10">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`py-2 font-body ${
                  location.pathname === link.href ? "text-secondary" : "text-primary-foreground/80 hover:text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full w-full mt-2">
              Register Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;