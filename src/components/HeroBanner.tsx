import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export function HeroBanner() {
  const { hero } = siteContent;

  return (
    <section className="relative overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-supermarket.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative container py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl space-y-6 text-white">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {hero.title}
          </h1>

          <p className="text-lg text-white/90">
            {hero.subtitle}
          </p>

          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Link to="/frozen-foods">
              {hero.ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>
      </div>
    </section>
  );
}