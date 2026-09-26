import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "Điện thoại",
      brand: "Apple",
      price: 34990000,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
      badge: "Mới",
      specs: { storage: "256GB", extra: "Titanium" }
    },
    {
      id: 2,
      name: "MacBook Pro 14 M3",
      category: "Laptop",
      brand: "Apple",
      price: 39990000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
      badge: "Bán chạy",
      specs: { storage: "512GB", extra: "14 inch" }
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      category: "Tai nghe",
      brand: "Apple",
      price: 5990000,
      image: "https://images.unsplash.com/photo-1606220588913-b3aecb4b277c?q=80&w=1000&auto=format&fit=crop",
      badge: "Giảm 10%",
      specs: { storage: "Không dây", extra: "Chống ồn" }
    },
    {
      id: 4,
      name: "Samsung Galaxy Watch 6",
      category: "Đồng hồ",
      brand: "Samsung",
      price: 6490000,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
      badge: "",
      specs: { storage: "44mm", extra: "Đo nhịp tim" }
    },
    {
      id: 5,
      name: "Sạc nhanh 20W",
      category: "Phụ kiện",
      brand: "Apple",
      price: 590000,
      image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=1000&auto=format&fit=crop",
      badge: "",
      specs: { storage: "Type C", extra: "Chính hãng" }
    },
    {
      id: 6,
      name: "Samsung Galaxy S24 Ultra",
      category: "Điện thoại",
      brand: "Samsung",
      price: 33990000,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop",
      badge: "Hot",
      specs: { storage: "256GB", extra: "AI Camera" }
    }
  ];

  return NextResponse.json({ success: true, data: products });
}
