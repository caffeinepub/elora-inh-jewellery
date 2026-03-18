import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Instagram, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-widest text-foreground hover:text-gold transition-colors"
        >
          ELORA.INH
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="font-body text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
            data-ocid="nav.home.link"
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className="font-body text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
            data-ocid="nav.shop.link"
          >
            Shop
          </Link>
          <Link
            to="/contact"
            className="font-body text-sm font-medium text-foreground/80 hover:text-foreground transition-colors tracking-wide"
            data-ocid="nav.contact.link"
          >
            Contact
          </Link>
          <a
            href="https://instagram.com/elora.inh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            data-ocid="nav.instagram.link"
          >
            <Instagram size={16} />
            @elora.inh
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="font-body text-sm font-medium text-foreground tracking-wide"
                onClick={() => setOpen(false)}
                data-ocid="nav.home.link"
              >
                Home
              </Link>
              <Link
                to="/catalog"
                className="font-body text-sm font-medium text-foreground tracking-wide"
                onClick={() => setOpen(false)}
                data-ocid="nav.shop.link"
              >
                Shop
              </Link>
              <Link
                to="/contact"
                className="font-body text-sm font-medium text-foreground tracking-wide"
                onClick={() => setOpen(false)}
                data-ocid="nav.contact.link"
              >
                Contact
              </Link>
              <a
                href="https://instagram.com/elora.inh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm font-medium text-foreground"
                data-ocid="nav.instagram.link"
              >
                <Instagram size={16} />
                @elora.inh
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
