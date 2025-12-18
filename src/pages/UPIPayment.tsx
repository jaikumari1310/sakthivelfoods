import { useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { siteContent } from "@/data/siteContent";
import { 
  ArrowLeft, 
  CheckCircle, 
  Upload, 
  X, 
  Smartphone,
  MessageCircle,
  Mail,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

export default function UPIPayment() {
  const navigate = useNavigate();
  const { items, getTotalItems, clearCart } = useCart();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [upiReference, setUpiReference] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (items.length === 0 && !submitted) {
    return <Navigate to="/cart" replace />;
  }

  // Calculate total for UPI (sum of all item prices * quantities)
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Generate UPI payment string
  const generateUPIString = () => {
    const { id, name: merchantName } = siteContent.upi;
    const amount = calculateTotal();
    return `upi://pay?pa=${id}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const generateOrderSummary = () => {
    let summary = `*UPI Payment - ${siteContent.siteName}*\n\n`;
    summary += `*Customer Details:*\n`;
    summary += `Name: ${name}\n`;
    summary += `Mobile: ${mobile}\n`;
    if (message) summary += `Message: ${message}\n`;
    summary += `\n*Payment Details:*\n`;
    summary += `UPI Reference: ${upiReference}\n`;
    summary += `Amount: ₹${calculateTotal()}\n`;
    summary += `Screenshot: ${screenshot ? "Attached (please send separately)" : "Not provided"}\n`;
    summary += `\n*Items:*\n`;
    
    items.forEach((item, index) => {
      summary += `${index + 1}. ${item.name} (${item.unit}) - Qty: ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });
    
    summary += `\n*Total: ₹${calculateTotal()}*`;
    summary += `\n\n⏳ Payment Status: Pending Verification`;
    return summary;
  };

  const handleWhatsApp = () => {
    if (!name.trim() || !mobile.trim()) {
      toast.error("Please fill in your name and mobile number");
      return;
    }
    if (!upiReference.trim() && !screenshot) {
      toast.error("Please provide UPI reference number or upload screenshot");
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
    if (!upiReference.trim() && !screenshot) {
      toast.error("Please provide UPI reference number or upload screenshot");
      return;
    }
    
    const orderSummary = generateOrderSummary().replace(/\*/g, "");
    const subject = `UPI Payment - Order from ${name} - ${siteContent.siteName}`;
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
              <div className="h-20 w-20 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="h-10 w-10 text-warning" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Payment Pending Verification</h1>
            <p className="text-muted-foreground">
              Thank you for your payment! We'll verify your payment and confirm your order shortly.
            </p>
            <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
              <p>If you uploaded a screenshot, please also share it via WhatsApp for faster verification.</p>
            </div>
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
        title="Pay with UPI"
        description="Scan QR code and complete payment"
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

          <div className="grid gap-6 md:grid-cols-2">
            {/* Left: QR Code and Payment Info */}
            <div className="space-y-6">
              {/* QR Code */}
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <h2 className="font-semibold text-foreground mb-4">Scan to Pay</h2>
                <div className="inline-block p-4 bg-white rounded-lg">
                  <QRCodeSVG 
                    value={generateUPIString()} 
                    size={180}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-2xl font-bold text-primary">₹{calculateTotal()}</p>
                  <p className="text-sm text-muted-foreground">
                    UPI ID: {siteContent.upi.id}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Smartphone className="h-4 w-4" />
                  <span>Scan with any UPI app</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground mb-3">Order Summary ({getTotalItems()} items)</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.category}-${item.id}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-foreground font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-3 pt-3">
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Payment Confirmation Form */}
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <h2 className="font-semibold text-foreground">After Payment</h2>
                <p className="text-sm text-muted-foreground">
                  Complete payment via UPI, then fill the details below to confirm your order.
                </p>
                
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
                  <Label htmlFor="upiRef">UPI Reference Number</Label>
                  <Input
                    id="upiRef"
                    placeholder="12-digit reference number"
                    value={upiReference}
                    onChange={(e) => setUpiReference(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Found in your UPI app after payment
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Payment Screenshot</Label>
                  {screenshotPreview ? (
                    <div className="relative">
                      <img
                        src={screenshotPreview}
                        alt="Payment screenshot"
                        className="w-full h-32 object-cover rounded-lg border border-border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={removeScreenshot}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload screenshot
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Max 5MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Any special requests?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  Send payment confirmation via:
                </p>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Confirm via WhatsApp
                </Button>
                <Button
                  onClick={handleEmail}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Confirm via Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
