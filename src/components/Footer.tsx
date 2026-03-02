import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import wolvesLogo from "@/assets/wolves-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <img src={wolvesLogo} alt="Wolves International" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/50 font-body leading-relaxed">
              Your trusted partner in Dubai real estate investment. We connect investors with premium property opportunities.
            </p>
          </div>
          <div>
            <h4 className="font-body font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Features", href: "/features" },
                { label: "Awards", href: "/awards" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-primary-foreground/50 hover:text-secondary transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Roadshows", href: "/roadshows" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-primary-foreground/50 hover:text-secondary transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/50 font-body">
              <li>
                <span className="text-secondary font-semibold block text-xs uppercase tracking-wider mb-1">UAE Office</span>
                20th Floor, Al Moosa Tower 1, Trade Centre, Sheikh Zayed Road, Dubai
              </li>
              <li>
                <span className="text-secondary font-semibold block text-xs uppercase tracking-wider mb-1">Branch Offices</span>
                Amritsar, Punjab, India<br />
                Lisbon, Portugal, Europe
              </li>
              <li>Call: 800-0099</li>
              <li>Info@wolvesint.ae</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40 font-body">
            © 2026 Wolves International. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Icon size={16} className="text-primary-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;