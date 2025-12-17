import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { siteContent } from "@/data/siteContent";
import { MessageCircle, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Enquiry() {
  const { items, getTotalItems, clearCart } = useCart();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return <Navigate to="/cart" replace />;
  }

  const generateOrderSummary = () => {
    let summary = `*Order Enquiry - ${siteContent.siteName}*\n\n`;
    summary += `*Customer Details:*\n`;
    summary += `Name: ${name}\n`;
    summary += `Mobile: ${mobile}\n`;
    if (message) summary += `Message: ${message}\n`;
    summary += `\n*Items:*\n`;
    
    items.forEach((item, index) => {
      summary += `${index + 1}. ${item.name} (${item.unit}) - Qty: ${item.quantity}\n`;
    });
    
    summary += `\n*Total Items: ${getTotalItems()}*`;
    return summary;
  };

  const handleWhatsApp = () => {
    if (!name.trim() || !mobile.trim()) {
      toast.error("Please fill in your name and mobile number");
      return;
    }
    
    const orderSummary = generateOrderSummary();
    const whatsappNumber = siteContent.enquiry.whatsappNumber.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    clearCart();
    toast.success("Opening WhatsApp...");
  };

  const handleEmail = () => {
    if (!name.trim() || !mobile.trim()) {
      toast.error("Please fill in your name and mobile number");
      return;
    }
    
    const orderSummary = generateOrderSummary().replace(/\*/g, "");
    const subject = `Order Enquiry from ${name} - ${siteContent.siteName}`;
    const mailtoUrl = `mailto:${siteContent.enquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(orderSummary)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    clearCart();
    toast.success("Opening email client...");
  };

  if (submitted) {
    return (
      <Layout>
        <section className="container py-12">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Enquiry Sent!</h1>
            <p className="text-muted-foreground">
              Thank you for your interest. We'll get back to you shortly with pricing and availability details.
            </p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Send Enquiry"
        description="Complete your details to send your product enquiry"
      />
      
      <section className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/cart"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>

          {/* Order Summary */}
          <div className="rounded-lg border border-border bg-card p-4 mb-6">
            <h2 className="font-semibold text-foreground mb-3">Your Items ({getTotalItems()})</h2>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={`${item.category}-${item.id}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.name} ({item.unit})
                  </span>
                  <span className="text-foreground font-medium">x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Your Details</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Any special requests or questions?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Choose how to send your enquiry:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={handleWhatsApp}
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send via WhatsApp
                </Button>
                <Button
                  onClick={handleEmail}
                  variant="outline"
                  size="lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Send via Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
