import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  unit: string;
  inStock: boolean;
  image: string;
}

interface ProductCardProps {
  product: Product;
  category: string;
}

export function ProductCard({ product, category }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        category,
        name: product.name,
        description: product.description,
        unit: product.unit,
        image: product.image,
      },
      quantity
    );
    toast.success(`${quantity}x ${product.name} added to cart`);
    setQuantity(1);
  };

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
        
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>
        
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
        <div className="pt-1">
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

        {/* Quantity Selector & Add to Cart */}
        {product.inStock && (
          <div className="pt-3 space-y-2">
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium text-foreground">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleIncrease}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="w-full"
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
