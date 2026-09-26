"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Truck, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Giả lập dữ liệu sản phẩm khách đã chọn để thanh toán
const checkoutItems = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 34990000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
    color: "Titan Tự nhiên",
    capacity: "256GB",
    quantity: 1
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập delay gọi API tạo đơn hàng
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-zinc-200"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Đặt hàng thành công!</h2>
          <p className="text-[13px] text-zinc-500 mb-8">
            Cảm ơn bạn đã mua sắm tại Phone Store. Mã đơn hàng của bạn là <strong className="text-zinc-900">#PS992384</strong>. Chúng tôi sẽ sớm liên hệ để giao hàng.
          </p>
          <Link 
            href="/"
            className="block w-full bg-zinc-900 text-white py-3 rounded-xl text-[15px] font-medium hover:bg-zinc-800 transition-colors shadow-md"
          >
            Quay lại trang chủ
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 font-sans text-zinc-900">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.back()} className="w-10 h-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">Thanh toán an toàn</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Cột trái: Thông tin giao hàng & Thanh toán */}
          <div className="w-full lg:w-[65%] flex flex-col gap-6">
            
            {/* Thông tin nhận hàng */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-zinc-700" />
                </div>
                <h2 className="text-lg font-bold text-zinc-900">Thông tin nhận hàng</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Họ và tên</label>
                  <input type="text" required placeholder="Nhập họ và tên người nhận" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Số điện thoại</label>
                  <input type="tel" required placeholder="Ví dụ: 0912345678" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Email (không bắt buộc)</label>
                  <input type="email" placeholder="Để nhận email hóa đơn" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Địa chỉ giao hàng</label>
                  <input type="text" required placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">Ghi chú (không bắt buộc)</label>
                  <textarea rows={3} placeholder="Ví dụ: Giao trong giờ hành chính..." className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-zinc-700" />
                </div>
                <h2 className="text-lg font-bold text-zinc-900">Phương thức thanh toán</h2>
              </div>
              
              <div className="flex flex-col gap-3">
                <label className={`flex items-center gap-4 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 accent-zinc-900 cursor-pointer" />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <span className="block font-semibold text-zinc-900 text-[13px]">Thanh toán khi nhận hàng (COD)</span>
                      <span className="text-[11px] text-zinc-500">Khách hàng thanh toán bằng tiền mặt khi nhận hàng.</span>
                    </div>
                    <Truck className="w-5 h-5 text-zinc-400" />
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'vnpay' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'}`}>
                  <input type="radio" name="payment" value="vnpay" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} className="w-4 h-4 accent-zinc-900 cursor-pointer" />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <span className="block font-semibold text-zinc-900 text-[13px]">Thanh toán qua VNPAY</span>
                      <span className="text-[11px] text-zinc-500">Thẻ ATM, Visa, MasterCard, JCB, QR Code</span>
                    </div>
                    <div className="bg-zinc-100 font-bold text-[#005BAA] text-[10px] px-2 py-0.5 rounded">VNPAY</div>
                  </div>
                </label>
                
                <label className={`flex items-center gap-4 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'momo' ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'}`}>
                  <input type="radio" name="payment" value="momo" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} className="w-4 h-4 accent-zinc-900 cursor-pointer" />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <span className="block font-semibold text-zinc-900 text-[13px]">Ví MoMo</span>
                      <span className="text-[11px] text-zinc-500">Quét mã QR qua ứng dụng MoMo</span>
                    </div>
                    <div className="bg-[#A50064] text-white font-bold text-[10px] px-2 py-0.5 rounded">MoMo</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Cột phải: Tổng quan đơn hàng */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg text-zinc-900 mb-5">Đơn hàng của bạn</h3>
              
              <div className="flex flex-col gap-3 mb-5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
                    <div className="w-14 h-14 bg-zinc-50 rounded-lg p-1 border border-zinc-100 flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[13px] text-zinc-900 truncate">{item.name}</h4>
                      <div className="text-[11px] text-zinc-500 mt-0.5 mb-1">{item.color} | {item.capacity}</div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[13px] text-zinc-900">{formatPrice(item.price)}</span>
                        <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-100 pt-4 space-y-2 mb-5">
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="text-[13px]">Tạm tính</span>
                  <span className="font-medium text-sm text-zinc-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600">
                  <span className="text-[13px]">Phí vận chuyển</span>
                  <span className="font-medium text-sm text-green-600">Miễn phí</span>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-4 mb-6">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-bold text-[13px] text-zinc-900">Tổng thanh toán</span>
                  <span className="text-2xl font-black text-red-600 tracking-tight">{formatPrice(total)}</span>
                </div>
                <p className="text-[11px] text-right text-zinc-500">(Đã bao gồm VAT)</p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-900 text-white py-3 rounded-xl font-bold text-base hover:bg-zinc-800 hover:shadow-lg transition-all shadow-md flex justify-center items-center gap-2 mb-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Hoàn tất đặt hàng <ShieldCheck className="w-4 h-4" /></>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>Thông tin của bạn được bảo mật an toàn</span>
              </div>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}
