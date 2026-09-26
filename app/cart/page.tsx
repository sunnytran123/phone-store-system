"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Plus, Minus, Ticket, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  capacity: string;
  quantity: number;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 34990000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
    color: "Titan Tự nhiên",
    capacity: "256GB",
    quantity: 1
  },
  {
    id: 2,
    name: "MacBook Pro 14 M3",
    price: 39990000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    color: "Bạc",
    capacity: "512GB",
    quantity: 1
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [promoCode, setPromoCode] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>(initialCart.map(i => i.id));

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(i => i.id));
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(i => i !== id));
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
  };

  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = promoCode === "VIP100" && selectedItems.length > 0 ? 1000000 : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 font-sans text-zinc-900">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="w-10 h-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Giỏ hàng của bạn</h1>
          <span className="bg-zinc-900 text-white text-xs font-bold px-2.5 py-1 rounded-full ml-2">
            {cartItems.length} sản phẩm
          </span>
        </div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-16 text-center border border-zinc-200 shadow-sm flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-zinc-300" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Giỏ hàng đang trống</h2>
            <p className="text-zinc-500 mb-8 max-w-sm">Có vẻ như bạn chưa chọn mua sản phẩm nào. Khám phá ngay các siêu phẩm công nghệ mới nhất!</p>
            <Link 
              href="/"
              className="bg-zinc-900 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors inline-flex items-center gap-2 shadow-md"
            >
              Tiếp tục mua sắm <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            <div className="w-full lg:w-[65%] flex flex-col gap-4">
              <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer" 
                    checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                    onChange={handleSelectAll}
                  />
                  <span className="font-semibold text-zinc-900">Tất cả ({cartItems.length} sản phẩm)</span>
                </label>
              </div>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, height: 0, overflow: 'hidden' }}
                    className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row gap-4 relative items-start sm:items-center"
                  >
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer mt-2 sm:mt-0" 
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                    
                    <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] shrink-0 bg-zinc-50 rounded-xl p-2 flex items-center justify-center border border-zinc-100">
                      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-md" />
                    </div>
                    
                    <div className="flex-1 flex flex-col py-1 w-full">
                      <div className="flex justify-between items-start pr-8">
                        <div>
                          <h3 className="font-bold text-lg text-zinc-900 leading-tight mb-1">{item.name}</h3>
                          <p className="text-sm text-zinc-500 mb-3">Màu: {item.color} | Bản: {item.capacity}</p>
                        </div>
                      </div>
                      
                      <div className="mt-auto flex items-end justify-between">
                        <span className="font-bold text-xl text-red-600 tracking-tight">{formatPrice(item.price)}</span>
                        
                        <div className="flex items-center gap-4 bg-zinc-50 rounded-xl border border-zinc-200 p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm transition-all"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-sm w-4 text-center select-none">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-5 right-5 text-zinc-400 hover:text-red-500 transition-colors bg-white hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="w-full lg:w-[35%]">
              <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm sticky top-24">
                <h3 className="font-bold text-xl text-zinc-900 mb-6">Tổng quan đơn hàng</h3>
                
                <div className="flex flex-col gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Ticket className="w-5 h-5 text-zinc-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Nhập mã giảm giá..." 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-10 pr-24 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all uppercase"
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-zinc-900 text-white px-4 rounded-lg text-xs font-semibold hover:bg-zinc-800 transition-colors">
                      ÁP DỤNG
                    </button>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-5 space-y-4 mb-6">
                  <div className="flex justify-between items-center text-zinc-600">
                    <span className="text-sm">Tạm tính ({selectedItems.length} sản phẩm)</span>
                    <span className="font-medium text-zinc-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-600">
                    <span className="text-sm">Phí giao hàng</span>
                    <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">Miễn phí</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-zinc-600">
                      <span className="text-sm flex items-center gap-1.5"><Ticket className="w-4 h-4 text-red-500" /> Khuyến mãi</span>
                      <span className="font-medium text-red-500">-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-200 pt-4 mb-6">
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-zinc-900 text-[15px]">Tổng cộng</span>
                    <span className="text-2xl font-black text-red-600 tracking-tight">{formatPrice(total)}</span>
                  </div>
                  <p className="text-[11px] text-right text-zinc-500">(Đã bao gồm VAT)</p>
                </div>

                <button 
                  disabled={selectedItems.length === 0}
                  className="w-full bg-zinc-900 text-white py-3 rounded-xl font-bold text-[15px] hover:bg-zinc-800 hover:shadow-lg transition-all shadow-md flex justify-center items-center gap-2 mb-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-900 disabled:hover:shadow-md"
                >
                  Tiến hành thanh toán <ArrowRight className="w-4 h-4" />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Thanh toán an toàn 100%</span>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
