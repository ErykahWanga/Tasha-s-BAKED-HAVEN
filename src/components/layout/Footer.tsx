import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold">Tasha's Baked Haven</h3>
            <p className="text-sm text-primary-foreground/70 mt-1">
              Handcrafted with love
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#home" className="hover:text-gold transition-colors">Home</a>
            <a href="#offers" className="hover:text-gold transition-colors">Offers</a>
            <a href="#menu" className="hover:text-gold transition-colors">Menu</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </nav>

          {/* Divider */}
          <div className="w-24 h-px bg-primary-foreground/20" />

          {/* Copyright with hidden admin link */}
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            <span>© {currentYear} Tasha's Baked Haven.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-primary fill-primary" /> by Erykah Wanga
            </span>
            {/* Hidden admin link - only visible to owner */}
            <Link 
              to="/admin" 
              className="ml-4 text-primary-foreground/20 hover:text-primary-foreground/40 transition-colors text-xs"
              aria-label="Admin"
            >
              ;/
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
