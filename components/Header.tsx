"use client";

import { ShoppingBag, User, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleActionRequiresAuth = () => {
    setShowAuthDialog(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-bold text-xs tracking-tighter">
                PS
              </div>
              <span className="font-bold text-xl text-zinc-900 tracking-tight hidden sm:block">Phone Store</span>
            </Link>
            
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

      {/* Auth Dialog */}
      {showAuthDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[400px] shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Yêu cầu đăng nhập</h3>
            <p className="text-zinc-600 text-sm mb-6">Vui lòng đăng nhập vào hệ thống để tiếp tục thực hiện chức năng mua hàng.</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowAuthDialog(false)}
                className="px-4 py-2.5 text-sm font-medium text-zinc-700 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={() => {
                  setShowAuthDialog(false);
                  router.push("/login");
                }}
                className="px-4 py-2.5 text-sm font-medium text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors shadow-md"
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
