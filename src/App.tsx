import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import FrozenFoods from "./pages/FrozenFoods";
import BakingEssentials from "./pages/BakingEssentials";
import DairyProducts from "./pages/DairyProducts";
import Cart from "./pages/Cart";
import Enquiry from "./pages/Enquiry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/frozen-foods" element={<FrozenFoods />} />
            <Route path="/baking-essentials" element={<BakingEssentials />} />
            <Route path="/dairy-products" element={<DairyProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/enquiry" element={<Enquiry />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
