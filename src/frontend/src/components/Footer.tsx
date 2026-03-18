import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-widest mb-3">
              ELORA.INH
            </h3>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Affordable luxury jewellery crafted to last. Anti tarnish, alloy
              brass &amp; stainless steel collections.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-primary-foreground/50 mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="font-body text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-primary-foreground/50 mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/elora.inh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                data-ocid="footer.instagram.link"
              >
                <Instagram size={16} />
                @elora.inh
              </a>
              <a
                href="https://wa.me/919496623220"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                data-ocid="footer.whatsapp.link"
              >
                <MessageCircle size={16} />
                +91 9496623220
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-primary-foreground/40">
            &copy; {year} ELORA.INH. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/40">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary-foreground/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
