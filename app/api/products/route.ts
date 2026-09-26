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
      specs: { storage: "256GB", extra: "Titanium" },
      colors: [
        { name: "Titan Tự nhiên", hex: "#bcaaa4" },
        { name: "Titan Xanh", hex: "#455a64" },
        { name: "Titan Đen", hex: "#212121" },
        { name: "Titan Trắng", hex: "#f5f5f5" }
      ],
      capacities: ["256GB", "512GB", "1TB"]
    },
    {
      id: 2,
      name: "MacBook Pro 14 M3",
      category: "Laptop",
      brand: "Apple",
      price: 39990000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
      badge: "Bán chạy",
      specs: { storage: "512GB", extra: "14 inch" },
      colors: [
        { name: "Space Black", hex: "#1c1c1e" },
        { name: "Silver", hex: "#e3e4e5" }
      ],
      capacities: ["512GB", "1TB"]
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      category: "Tai nghe",
      brand: "Apple",
      price: 5990000,
      image: "https://images.unsplash.com/photo-1606220588913-b3aecb4b277c?q=80&w=1000&auto=format&fit=crop",
      badge: "Giảm 10%",
      specs: { storage: "Không dây", extra: "Chống ồn" },
      colors: [
        { name: "Trắng", hex: "#ffffff" }
      ],
      capacities: ["Tiêu chuẩn"]
    },
    {
      id: 4,
      name: "Samsung Galaxy Watch 6",
      category: "Đồng hồ",
      brand: "Samsung",
      price: 6490000,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
      badge: "",
      specs: { storage: "44mm", extra: "Đo nhịp tim" },
      colors: [
        { name: "Đen", hex: "#111111" },
        { name: "Bạc", hex: "#dcdcdc" }
      ],
      capacities: ["40mm", "44mm"]
    },
    {
      id: 5,
      name: "Sạc nhanh 20W",
      category: "Phụ kiện",
      brand: "Apple",
      price: 590000,
      image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=1000&auto=format&fit=crop",
      badge: "",
      specs: { storage: "Type C", extra: "Chính hãng" },
      colors: [
        { name: "Trắng", hex: "#ffffff" }
      ],
      capacities: ["20W"]
    },
    {
      id: 6,
      name: "Samsung Galaxy S24 Ultra",
      category: "Điện thoại",
      brand: "Samsung",
      price: 33990000,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop",
      badge: "Hot",
      specs: { storage: "256GB", extra: "AI Camera" },
      colors: [
        { name: "Titan Tím", hex: "#673ab7" },
        { name: "Titan Vàng", hex: "#ffeb3b" },
        { name: "Titan Đen", hex: "#1a1a1a" }
      ],
      capacities: ["256GB", "512GB", "1TB"]
    },
    {
      id: 7,
      name: "iPad Air 5",
      category: "Tablet",
      brand: "Apple",
      price: 15990000,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
      badge: "",
      specs: { storage: "64GB", extra: "M1 Chip" },
      colors: [
        { name: "Xám", hex: "#5a5a5a" },
        { name: "Xanh dương", hex: "#2196f3" },
        { name: "Hồng", hex: "#f8bbd0" }
      ],
      capacities: ["64GB", "256GB"]
    },
    {
      id: 8,
      name: "Sony WH-1000XM5",
      category: "Tai nghe",
      brand: "Sony",
      price: 7990000,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
      badge: "Giảm 5%",
      specs: { storage: "Chụp tai", extra: "Chống ồn ANC" },
      colors: [
        { name: "Đen", hex: "#000000" },
        { name: "Bạc", hex: "#e0e0e0" }
      ],
      capacities: ["Tiêu chuẩn"]
    },
    {
      id: 9,
      name: "Xiaomi 14 Pro",
      category: "Điện thoại",
      brand: "Xiaomi",
      price: 21990000,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=1000&auto=format&fit=crop",
      badge: "",
      specs: { storage: "256GB", extra: "Leica Camera" },
      colors: [
        { name: "Đen", hex: "#111111" },
        { name: "Trắng", hex: "#fafafa" },
        { name: "Xanh lá", hex: "#388e3c" }
      ],
      capacities: ["256GB", "512GB"]
    }
  ];

  return NextResponse.json({ success: true, data: products });
}
