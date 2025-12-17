import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  description: string;
  image: string;
  href: string;
}

export function CategoryCard({ name, description, image, href }: CategoryCardProps) {
  return (
    <Link
      to={href}
      className="group relative rounded-xl border border-border bg-card overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <div className="flex items-center gap-1 text-sm font-medium text-primary pt-2">
          <span>Browse Products</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
