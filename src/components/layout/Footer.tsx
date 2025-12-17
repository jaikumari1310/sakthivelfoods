import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ShoppingBasket } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export function Footer() {
  const { siteName, contact, categories } = siteContent;

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <ShoppingBasket className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">{siteName}</span>
            </Link>
            <p className="text-sm text-background/70">
              {siteContent.description}
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={category.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{contact.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Store Hours
            </h3>
            <div className="flex items-start gap-3 text-sm text-background/70">
              <Clock className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{contact.hours}</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <p className="text-center text-sm text-background/60">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
