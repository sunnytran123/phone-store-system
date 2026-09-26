import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 34990000,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
      badge: "Mới",
      specs: { screen: "6.7 inch", storage: "256GB" }
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 33990000,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop",
      badge: "Bán chạy",
      specs: { screen: "6.8 inch", storage: "256GB" }
    },
    {
      id: 3,
      name: "iPhone 15",
      brand: "Apple",
      price: 22990000,
      image: "https://images.unsplash.com/photo-1695048064977-96a99b4f0b24?q=80&w=1000&auto=format&fit=crop",
      badge: "Giảm 10%",
      specs: { screen: "6.1 inch", storage: "128GB" }
    },
    {
      id: 4,
      name: "Xiaomi 14 Pro",
      brand: "Xiaomi",
      price: 21990000,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=1000&auto=format&fit=crop",
      badge: "",
      specs: { screen: "6.73 inch", storage: "256GB" }
    }
  ];

  return NextResponse.json({ success: true, data: products });
}
