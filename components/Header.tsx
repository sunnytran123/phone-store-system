"use client";

import { ShoppingBag, User, Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    
    // Check initially
    checkUser();
    
    // Listen for custom event when login/logout happens
    window.addEventListener("auth-change", checkUser);
    return () => window.removeEventListener("auth-change", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

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
              <Link href="/cart" className="text-zinc-600 hover:text-zinc-900 transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
                  1
                </span>
              </Link>
              {user ? (
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200">
                    <div className="w-6 h-6 bg-zinc-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline">{user.name}</span>
                  </div>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-zinc-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    <div className="p-2 flex flex-col">
                      <Link href="#" className="px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors">Đơn hàng của tôi</Link>
                      <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left w-full">Đăng xuất</button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

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
