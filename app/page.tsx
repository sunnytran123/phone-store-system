"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, User, Search, ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  badge: string;
  specs: { screen: string; storage: string };
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleActionRequiresAuth = () => {
    // Check if user is logged in (mock logic)
    const isLoggedIn = false; // Mocking logged out state
    
    if (!isLoggedIn) {
      setShowAuthModal(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-bold text-xs tracking-tighter">
                PS
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">Phone Store</span>
            </div>
            
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-zinc-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-full bg-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-colors"
                  placeholder="Tìm kiếm iPhone, Samsung..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={handleActionRequiresAuth} className="text-zinc-600 hover:text-zinc-900 transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight mb-6"
          >
            Đỉnh Cao Công Nghệ.
            <br />
            Nằm Trong Tay Bạn.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-2xl mb-10"
          >
            Khám phá các dòng điện thoại mới nhất với thiết kế tinh tế và hiệu năng vượt trội. Nâng tầm phong cách sống ngay hôm nay.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-zinc-900 px-8 py-3 rounded-full font-medium hover:bg-zinc-100 transition-colors inline-flex items-center gap-2"
            >
              Khám phá ngay <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Sản phẩm nổi bật</h2>
            <p className="mt-1 text-sm text-zinc-500">Những mẫu điện thoại được yêu thích nhất</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-zinc-900 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.badge}
                  </div>
                )}
                
                <div className="aspect-[4/5] bg-zinc-100 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                    <Smartphone className="w-20 h-20 opacity-20" />
                  </div>
                  {/* Using a solid background placeholder since unsplash images can be slow or blocked sometimes, but keeping img tag for structure */}
                  <div className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500 bg-zinc-100 flex items-center justify-center p-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-auto drop-shadow-2xl mix-blend-multiply" 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">{product.brand}</div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2 truncate">
                    {product.name}
                  </h3>
                  <div className="text-sm text-zinc-500 mb-4 flex gap-3">
                    <span className="bg-zinc-100 px-2 py-1 rounded">{product.specs.storage}</span>
                    <span className="bg-zinc-100 px-2 py-1 rounded">{product.specs.screen}</span>
                  </div>
                  <div className="mt-auto pt-4">
                    <p className="text-lg font-bold text-zinc-900 mb-4">
                      {formatPrice(product.price)}
                    </p>
                    <button 
                      onClick={handleActionRequiresAuth}
                      className="w-full bg-zinc-900 text-white py-2.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Mua ngay
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer minimal */}
      <footer className="bg-white border-t border-zinc-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 text-white rounded flex items-center justify-center font-bold text-[10px] tracking-tighter">
              PS
            </div>
            <span className="font-bold text-sm tracking-tight">Phone Store</span>
          </div>
          <p className="text-sm text-zinc-500">
            © 2026 Phone Store. Đẳng cấp làm nên thương hiệu.
          </p>
        </div>
      </footer>

      {/* Custom Auth Dialog */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-zinc-100"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-zinc-900 mb-2">Yêu cầu đăng nhập</h3>
            <p className="text-center text-zinc-500 mb-6 text-sm">
              Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng hoặc thực hiện thanh toán.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-zinc-900 text-white py-2.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors"
              >
                Đăng nhập ngay
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full bg-zinc-100 text-zinc-600 py-2.5 rounded-xl font-medium hover:bg-zinc-200 transition-colors"
              >
                Hủy bỏ
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
