import frozenFoodsImg from "@/assets/frozen-foods.jpg";
import bakingEssentialsImg from "@/assets/baking-essentials.jpg";
import dairyProductsImg from "@/assets/dairy-products.jpg";

// Site-wide content - easy to update
export const siteContent = {
  siteName: "Sakthivel Foods",
  tagline: "Your Trusted Neighborhood Supermarket",
  description: "Quality groceries at affordable prices since 1995",
  
  contact: {
    phone: "+91 98765 43210",
    email: "info@sakthivelfoods.com",
    address: "123 Market Street, Chennai, Tamil Nadu 600001",
    hours: "Mon-Sat: 8AM - 9PM, Sun: 9AM - 6PM"
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
    price: 120,
    originalPrice: 150,
    unit: "500g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Frozen Peas",
    price: 85,
    originalPrice: null,
    unit: "400g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Chicken Nuggets",
    price: 280,
    originalPrice: 320,
    unit: "450g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Fish Fingers",
    price: 245,
    originalPrice: null,
    unit: "300g",
    inStock: false,
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Vanilla Ice Cream",
    price: 180,
    originalPrice: 220,
    unit: "1L",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Frozen Corn",
    price: 75,
    originalPrice: null,
    unit: "500g",
    inStock: true,
    image: "/placeholder.svg"
  }
];

export const bakingEssentialsProducts = [
  {
    id: 1,
    name: "All-Purpose Flour",
    price: 65,
    originalPrice: null,
    unit: "1kg",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Granulated Sugar",
    price: 55,
    originalPrice: null,
    unit: "1kg",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Baking Powder",
    price: 45,
    originalPrice: 55,
    unit: "100g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Cocoa Powder",
    price: 120,
    originalPrice: null,
    unit: "200g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Vanilla Extract",
    price: 85,
    originalPrice: 100,
    unit: "50ml",
    inStock: false,
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Yeast Pack",
    price: 35,
    originalPrice: null,
    unit: "50g",
    inStock: true,
    image: "/placeholder.svg"
  }
];

export const dairyProducts = [
  {
    id: 1,
    name: "Fresh Milk",
    price: 60,
    originalPrice: null,
    unit: "1L",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Butter",
    price: 55,
    originalPrice: 65,
    unit: "100g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Cheddar Cheese",
    price: 180,
    originalPrice: null,
    unit: "200g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Greek Yogurt",
    price: 95,
    originalPrice: 110,
    unit: "400g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Paneer",
    price: 120,
    originalPrice: null,
    unit: "200g",
    inStock: true,
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Cream",
    price: 75,
    originalPrice: null,
    unit: "200ml",
    inStock: false,
    image: "/placeholder.svg"
  }
];
