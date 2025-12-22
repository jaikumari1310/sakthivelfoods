import frozenFoodsImg from "@/assets/frozen-foods.jpg";
import bakingEssentialsImg from "@/assets/baking-essentials.jpg";
import dairyProductsImg from "@/assets/dairy-products.jpg";
import productsData from "./products.json";

// Site-wide content - easy to update
export const siteContent = {
  siteName: "Sakthivel Foods",
  tagline: "Your Trusted Neighborhood Supermarket",
  description: "Quality groceries at affordable prices since 1995",
  
  contact: {
    phone: "+91 94455 72664",
    email: "info@sakthivelfoods.com",
    address: "1, 2nd Main Rd, behind Lady of Perpetual Help Church, Ram Nagar, Nafia Enclave, Dhadeswaram Nagar, Velachery, Chennai, Tamil Nadu 600042",
    hours: "Mon-Sat: 8AM - 9PM, Sun: 9AM - 6PM"
  },

  // Enquiry configuration - update these with your actual details
  enquiry: {
    whatsappNumber: "+919445572664", // WhatsApp Business number
    email: "orders@sakthivelfoods.com" // Email for enquiries
  },

  // UPI Payment configuration
  upi: {
    id: "jaikumar.i1310@okhdfcbank", // Your UPI ID
    name: "Jai Kumar", // Display name for UPI
    merchantCode: "", // Optional merchant code
    qrImage: "/GooglePay_QR.png" // Static QR code image
  },

  hero: {
    title: "Fresh Quality, Every Day",
    subtitle: "Discover our wide range of frozen foods, baking essentials, and dairy products at unbeatable prices.",
    ctaText: "Browse Categories"
  },

  categories: [
    {
      id: "frozen-foods",
      name: "Frozen Foods",
      description: "Ready-to-cook meals, vegetables, and ice cream",
      image: frozenFoodsImg,
      href: "/frozen-foods"
    },
    {
      id: "baking-essentials",
      name: "Baking Essentials",
      description: "Flour, sugar, baking powder, and more",
      image: bakingEssentialsImg,
      href: "/baking-essentials"
    },
    {
      id: "dairy-products",
      name: "Dairy Products",
      description: "Fresh milk, cheese, butter, and yogurt",
      image: dairyProductsImg,
      href: "/dairy-products"
    }
  ]
};

export const { frozenFoodsProducts, bakingEssentialsProducts, dairyProducts } = productsData;
