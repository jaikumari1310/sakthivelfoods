import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Plus, Minus, Trash2, ShoppingCart, Send } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <PageHeader
          title="Your Cart"
          description="Items you've selected for enquiry"
        />
        <section className="container py-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Browse our categories and add items to your cart
            </p>
            <Link to="/">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Your Cart"
        description={`${getTotalItems()} item${getTotalItems() !== 1 ? "s" : ""} selected`}
      />
      
      <section className="container py-8 md:py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.category}-${item.id}`}
                className="flex gap-4 p-4 rounded-lg border border-border bg-card"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-md object-cover bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.unit}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, item.category, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium text-foreground">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, item.category, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive ml-auto"
                      onClick={() => removeFromCart(item.id, item.category)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={`${item.category}-${item.id}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground truncate mr-2">
                      {item.name}
                    </span>
                    <span className="text-foreground font-medium">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Total Items</span>
                  <span>{getTotalItems()}</span>
                </div>
              </div>
              <Link to="/enquiry" className="block">
                <Button className="w-full" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Send Enquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
