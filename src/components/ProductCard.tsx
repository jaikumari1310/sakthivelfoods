import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  unit: string;
  inStock: boolean;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <article className="group relative rounded-lg border border-border bg-card overflow-hidden card-hover">
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge className="bg-secondary text-secondary-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-foreground line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground">{product.unit}</p>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ₹{product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="pt-2">
          {product.inStock ? (
            <span className="inline-flex items-center text-xs font-medium text-success">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-success"></span>
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-medium text-destructive">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-destructive"></span>
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
