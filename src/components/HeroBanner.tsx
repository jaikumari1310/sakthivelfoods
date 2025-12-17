import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export function HeroBanner() {
  const { hero } = siteContent;

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight animate-fade-in">
            {hero.title}
          </h1>
          
          <p 
            className="text-lg text-primary-foreground/80 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {hero.subtitle}
          </p>
          
          <div 
            className="flex flex-wrap gap-4 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
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
      </div>
    </section>
  );
}
