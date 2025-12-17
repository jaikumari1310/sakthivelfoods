import frozenFoodsImg from "@/assets/frozen-foods.jpg";
import bakingEssentialsImg from "@/assets/baking-essentials.jpg";
import dairyProductsImg from "@/assets/dairy-products.jpg";

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

export const frozenFoodsProducts = [
  {
    id: 1,
    name: "Mixed Vegetable Pack",
    description: "Premium blend of carrots, beans, peas, and corn",
    price: 120,
    originalPrice: 150,
    unit: "500g",
    inStock: true,
    image: "/products/frozen/mixedveg.jpg"
  },
  {
    id: 2,
    name: "Frozen Peas",
    description: "Sweet garden peas, flash frozen for freshness",
    price: 85,
    originalPrice: null,
    unit: "400g",
    inStock: true,
    image: "/products/frozen/frozen-peas.jpeg"
  },
  {
    id: 3,
    name: "Chicken Nuggets",
    description: "Crispy breaded chicken nuggets, ready to fry",
    price: 280,
    originalPrice: 320,
    unit: "450g",
    inStock: true,
    image: "/products/frozen/chicken-nuggets.jpeg"
  },
  {
    id: 4,
    name: "Fish Fingers",
    description: "Golden breaded fish fingers, kid-friendly",
    price: 245,
    originalPrice: null,
    unit: "300g",
    inStock: false,
    image: "/products/frozen/Fish-Fingers.jpg"
  },
  {
    id: 5,
    name: "Vanilla Ice Cream",
    description: "Creamy vanilla ice cream, family pack",
    price: 180,
    originalPrice: 220,
    unit: "1L",
    inStock: true,
    image: "/products/frozen/vanilla.jpg"
  },
  {
    id: 6,
    name: "Frozen Corn",
    description: "Sweet corn kernels, perfect for salads",
    price: 75,
    originalPrice: null,
    unit: "500g",
    inStock: true,
    image: "/products/frozen/frozen-corn.jpg"
  },
  {
    id: 7,
    name: "Frozen Chicken Precut - 1Kg",
    description: "Sliced Precut Chicken",
    price: 375,
    originalPrice: null,
    unit: "1 Kg",
    inStock: true,
    image: "/products/frozen/Frozen-Chicken-Precut-1kg.jpg"
  }
];

export const bakingEssentialsProducts = [
  {
    id: 1,
    name: "All-Purpose Flour",
    description: "Fine quality maida for baking and cooking",
    price: 65,
    originalPrice: null,
    unit: "1kg",
    inStock: true,
    image: "/products/frozen/All-Purpose-Flour-Unbleached-5-Kg.jpg"
  },
  {
    id: 2,
    name: "Granulated Sugar",
    description: "Pure white sugar for all your sweet needs",
    price: 55,
    originalPrice: null,
    unit: "1kg",
    inStock: true,
    image: "/products/frozen/Granulated-Sugar-1kg.jpg"
  },
  {
    id: 3,
    name: "Baking Powder",
    description: "Double acting baking powder for fluffy cakes",
    price: 45,
    originalPrice: 55,
    unit: "100g",
    inStock: true,
    image: "/products/frozen/baking-powrder.jpg"
  },
  {
    id: 4,
    name: "Chocolate Mousse Instant Dessert Mix",
    description: "Rich Dutch-process cocoa for chocolatey treats",
    price: 120,
    originalPrice: null,
    unit: "200g",
    inStock: true,
    image: "/products/frozen/Chocolate-Mousse-Instant-Dessert-Mix.jpg"
  }
];

export const dairyProducts = [
  {
    id: 1,
    name: "Fresh Milk",
    description: "Farm fresh full cream milk, pasteurized",
    price: 60,
    originalPrice: null,
    unit: "1L",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Butter",
    description: "Creamy salted butter, perfect for toast",
    price: 55,
    originalPrice: 65,
    unit: "100g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Cheddar Cheese",
    description: "Aged cheddar with rich, sharp flavor",
    price: 180,
    originalPrice: null,
    unit: "200g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Greek Yogurt",
    description: "Thick and creamy, high in protein",
    price: 95,
    originalPrice: 110,
    unit: "400g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Paneer",
    description: "Fresh cottage cheese, ideal for curries",
    price: 120,
    originalPrice: null,
    unit: "200g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Cream",
    description: "Heavy whipping cream for desserts",
    price: 75,
    originalPrice: null,
    unit: "200ml",
    inStock: false,
    image: "/placeholder.svg"
  }
];
