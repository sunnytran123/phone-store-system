"use client";

import { useEffect, useState, use } from "react";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw, ChevronRight, ChevronLeft, CheckCircle2, Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  badge: string;
  specs: { storage: string; extra: string };
  colors?: { name: string; hex: string }[];
  capacities?: string[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [selectedPromo, setSelectedPromo] = useState(0);
  

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const found = data.data.find((p: Product) => p.id.toString() === resolvedParams.id);
          setProduct(found || null);
        }
      })
      .finally(() => setLoading(false));
  }, [resolvedParams.id]);

  const images = product ? [product.image, product.image, product.image, product.image, product.image] : [];

  useEffect(() => {
    if (!product) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [product, images.length]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
  };

  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleAddToCart = () => {
    if (!localStorage.getItem("user")) {
      setShowAuthDialog(true);
    } else {
      setShowSuccessDialog(true);
      setTimeout(() => setShowSuccessDialog(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (!localStorage.getItem("user")) {
      setShowAuthDialog(true);
    } else {
      router.push("/checkout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
        <Link href="/" className="text-zinc-500 hover:underline">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 font-sans text-zinc-900">

      <div className="max-w-[1200px] mx-auto px-4 py-4 text-sm text-zinc-500 flex items-center gap-2">
        <Link href="/" className="hover:text-zinc-900">Điện thoại</Link> <ChevronRight className="w-3 h-3 text-zinc-400" /> 
        <span className="text-zinc-900 font-medium">{product.name}</span>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-6 border-b border-zinc-200 pb-4">
          <h1 className="text-[26px] font-bold text-zinc-900">{product.category} {product.name}</h1>
          <div className="text-sm text-zinc-500 mb-1.5 bg-zinc-100 px-2 py-0.5 rounded-full">Đã bán 1,2k</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 flex flex-col items-center">
              <div className="w-full max-w-[500px] aspect-[4/3] flex items-center justify-center p-4 relative mb-6 group overflow-hidden">
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-2 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <img 
                  src={images[currentImageIndex]} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain drop-shadow-xl transition-all duration-500" 
                />

                <button 
                  onClick={handleNextImage}
                  className="absolute right-2 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-3 w-full justify-center overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 border rounded-xl cursor-pointer p-2 flex items-center justify-center transition-colors ${currentImageIndex === index ? 'border-zinc-900 shadow-sm ring-1 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-400'}`}
                  >
                    <img src={img} alt={`thumb ${index}`} className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
              <h3 className="font-bold text-zinc-900 mb-5 text-lg">PhoneStore cam kết</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6">
                <div className="flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-600">Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cáp Type C, Củ sạc nhanh rời đầu Type A</p>
                </div>
                <div className="flex gap-3 items-start">
                  <RotateCcw className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-600">1 đổi 1 trong <strong>30 ngày</strong> đối với sản phẩm lỗi tại 2990 siêu thị toàn quốc <a href="#" className="text-zinc-900 font-medium underline">Xem chi tiết</a></p>
                </div>
                <div className="flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-600">Bảo hành <strong>chính hãng 1 năm</strong> tại các trung tâm bảo hành hãng <a href="#" className="text-zinc-900 font-medium underline">Xem địa chỉ</a></p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-0 shadow-sm border border-zinc-200 mt-2 overflow-hidden">
              <div className="p-4 border-b border-zinc-200 flex gap-4 bg-zinc-50/50">
                <div className="px-5 py-2.5 bg-zinc-900 text-white rounded-lg font-medium text-sm shadow-sm inline-block">Thông số kỹ thuật</div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-5 text-zinc-900">Cấu hình & Bộ nhớ</h3>
                <div className="flex flex-col border border-zinc-200 rounded-xl overflow-hidden">
                  <div className="flex border-b border-zinc-200 bg-zinc-50/50">
                    <div className="w-[35%] p-4 text-sm text-zinc-500 font-medium">Hệ điều hành:</div>
                    <div className="w-[65%] p-4 text-sm font-semibold text-zinc-900">iOS / Android 14</div>
                  </div>
                  <div className="flex border-b border-zinc-200">
                    <div className="w-[35%] p-4 text-sm text-zinc-500 font-medium">Chip xử lý (CPU):</div>
                    <div className="w-[65%] p-4 text-sm font-semibold text-zinc-900">Apple A17 Pro / Snapdragon 8 Gen 3</div>
                  </div>
                  <div className="flex border-b border-zinc-200 bg-zinc-50/50">
                    <div className="w-[35%] p-4 text-sm text-zinc-500 font-medium">RAM:</div>
                    <div className="w-[65%] p-4 text-sm font-semibold text-zinc-900">8 GB</div>
                  </div>
                  <div className="flex border-b border-zinc-200">
                    <div className="w-[35%] p-4 text-sm text-zinc-500 font-medium">Dung lượng lưu trữ:</div>
                    <div className="w-[65%] p-4 text-sm font-semibold text-zinc-900">{product.specs?.storage || "256 GB"}</div>
                  </div>
                  <div className="flex border-b border-zinc-200 bg-zinc-50/50">
                    <div className="w-[35%] p-4 text-sm text-zinc-500 font-medium">Màn hình:</div>
                    <div className="w-[65%] p-4 text-sm font-semibold text-zinc-900">OLED, 6.7", 120Hz</div>
                  </div>
                  <div className="flex border-b border-zinc-200">
                    <div className="w-[35%] p-4 text-sm text-zinc-500 font-medium">Camera sau:</div>
                    <div className="w-[65%] p-4 text-sm font-semibold text-zinc-900">Chính 48 MP & Phụ 12 MP</div>
                  </div>
                  <div className="flex border-b border-zinc-200 bg-zinc-50/50">
                    <div className="w-[35%] p-4 text-sm text-zinc-500 font-medium">Camera trước:</div>
                    <div className="w-[65%] p-4 text-sm font-semibold text-zinc-900">12 MP</div>
                  </div>
                  <div className="flex">
                    <div className="w-[35%] p-4 text-sm text-zinc-500 font-medium">Pin, Sạc:</div>
                    <div className="w-[65%] p-4 text-sm font-semibold text-zinc-900">4422 mAh, 20 W</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="w-full lg:w-[40%] flex flex-col gap-5">
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-200">
              
              {product.capacities && product.capacities.length > 0 && (
                <div className="mb-5">
                  <div className="text-[13px] font-semibold text-zinc-900 mb-2.5">Dung lượng</div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.capacities.map((cap, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCapacity(index)}
                        className={`px-4 py-2 text-[13px] rounded-xl font-medium transition-colors border ${
                          selectedCapacity === index 
                            ? 'border-zinc-900 bg-zinc-900 text-white' 
                            : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 bg-zinc-50 hover:bg-zinc-100'
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="text-[13px] font-semibold text-zinc-900 mb-2.5">Màu sắc</div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium transition-colors border text-[13px] ${
                          selectedColor === index 
                            ? 'border-zinc-900 bg-zinc-50 text-zinc-900 ring-1 ring-zinc-900' 
                            : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 bg-white'
                        }`}
                      >
                        <div 
                          className="w-3.5 h-3.5 rounded-full border border-zinc-300 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl overflow-hidden flex flex-col gap-0.5 mb-5 border border-zinc-200">
                <div className="bg-zinc-900 text-white p-3">
                  <div className="font-bold text-base">GIẢM THÊM 500.000₫</div>
                  <div className="text-[11px] text-zinc-300">Đặc quyền Học Sinh - Sinh Viên</div>
                </div>
                <div className="bg-zinc-100 p-2.5 text-center text-zinc-900 font-bold text-[13px] cursor-pointer hover:bg-zinc-200 transition-colors">
                  Áp dụng đơn từ 7 triệu - <span className="underline">Nhận Ngay</span>
                </div>
              </div>

              <div className="mb-5 flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-red-600 tracking-tight">{formatPrice(product.price)}</span>
                <span className="text-sm text-zinc-400 line-through font-medium">{formatPrice(product.price * 1.1)}</span>
              </div>

              <div className="mb-5 border border-zinc-200 rounded-xl overflow-hidden bg-white">
                <div className="bg-zinc-50 p-3 border-b border-zinc-200 text-[13px] font-bold text-zinc-900">
                  Gói dịch vụ
                </div>
                <div className="p-0">
                  <label className={`flex items-start gap-3 p-3 border-b border-zinc-100 cursor-pointer transition-colors ${selectedService === 0 ? 'bg-zinc-50' : 'hover:bg-zinc-50/50'}`}>
                    <input 
                      type="radio" 
                      name="service" 
                      className="mt-0.5 w-4 h-4 accent-zinc-900 cursor-pointer"
                      checked={selectedService === 0}
                      onChange={() => setSelectedService(0)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[13px] font-semibold text-zinc-900">Gói dịch vụ Tiêu chuẩn</span>
                        <div>
                          <span className="text-[11px] text-zinc-400 line-through mr-2">1.200.000₫</span>
                          <span className="text-[13px] font-bold text-zinc-900">990.000₫</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-zinc-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700" /> Bảo hành theo nhà sản xuất - 12 tháng
                      </div>
                    </div>
                  </label>
                  <label className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${selectedService === 1 ? 'bg-zinc-50' : 'hover:bg-zinc-50/50'}`}>
                    <input 
                      type="radio" 
                      name="service" 
                      className="mt-0.5 w-4 h-4 accent-zinc-900 cursor-pointer"
                      checked={selectedService === 1}
                      onChange={() => setSelectedService(1)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[13px] font-semibold text-zinc-900">Gói VIP Cao cấp</span>
                        <div>
                          <span className="text-[13px] font-bold text-zinc-900">1.590.000₫</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-zinc-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700" /> Bảo hành Rơi vỡ, Vào nước 12 tháng
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mb-6 border border-zinc-200 rounded-xl overflow-hidden bg-white">
                <div className="bg-zinc-50 p-3 border-b border-zinc-200">
                  <div className="font-bold text-zinc-900 text-sm mb-0.5">Khuyến mãi</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Giá và khuyến mãi dự kiến áp dụng đến 23:59 | 30/09</div>
                </div>
                <div className="p-3 flex flex-col gap-3">
                  <div className="text-[13px] font-semibold text-zinc-900 bg-zinc-100/80 p-2.5 rounded-lg border border-zinc-200 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px]">1</span>
                    Chọn 1 trong các khuyến mãi:
                  </div>
                  
                  <label className="flex items-start gap-2.5 cursor-pointer pl-1">
                    <input 
                      type="radio" 
                      name="promo" 
                      className="mt-0.5 w-4 h-4 accent-zinc-900 cursor-pointer"
                      checked={selectedPromo === 0}
                      onChange={() => setSelectedPromo(0)}
                    />
                    <span className="text-[13px] text-zinc-700 leading-snug">Giảm giá <strong className="text-zinc-900">200,000₫</strong> (đã giảm vào giá sản phẩm)</span>
                  </label>
                  
                  <label className="flex items-start gap-2.5 cursor-pointer pl-1">
                    <input 
                      type="radio" 
                      name="promo" 
                      className="mt-0.5 w-4 h-4 accent-zinc-900 cursor-pointer"
                      checked={selectedPromo === 1}
                      onChange={() => setSelectedPromo(1)}
                    />
                    <span className="text-[13px] text-zinc-700 leading-snug">Phiếu mua hàng mua smartphone, tablet, phụ kiện trị giá <strong className="text-zinc-900">250,000₫</strong></span>
                  </label>

                  <div className="text-[13px] font-semibold text-zinc-900 bg-zinc-100/80 p-2.5 rounded-lg border border-zinc-200 flex items-center gap-2 mt-1">
                    <span className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px]">2</span>
                    Các ưu đãi khác:
                  </div>
                  
                  <div className="flex items-start gap-2.5 pl-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0 mt-0.5" />
                    <span className="text-[13px] text-zinc-700 leading-snug">Phiếu mua hàng giảm 10% tối đa <strong className="text-zinc-900">700.000₫</strong> áp dụng mua Máy in, Màn hình</span>
                  </div>
                  
                  <div className="flex items-start gap-2.5 pl-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0 mt-0.5" />
                    <span className="text-[13px] text-zinc-700 leading-snug">Tặng Phiếu mua Tai nghe không dây trị giá <strong className="text-zinc-900">200.000₫</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-1 border-t border-zinc-100">
                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-zinc-900 text-white py-3 rounded-xl text-center shadow-md shadow-zinc-200 hover:bg-zinc-800 transition-all active:scale-[0.98]"
                >
                  <div className="font-bold text-base uppercase tracking-wide">Mua ngay</div>
                  <div className="text-[11px] text-zinc-300 mt-0.5 font-medium">Giao tận nơi hoặc nhận tại siêu thị</div>
                </button>

                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-zinc-50 border border-zinc-300 text-zinc-900 py-3 rounded-xl font-bold text-[13px] uppercase flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all active:scale-[0.98]"
                >
                  <ShoppingCart className="w-4 h-4" /> Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                onClick={() => router.push("/login")}
                className="px-4 py-2.5 text-sm font-medium text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors shadow-md"
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[320px] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">Thành công!</h3>
            <p className="text-zinc-500 text-[13px] mb-5">Đã thêm sản phẩm vào giỏ hàng.</p>
            <button 
              onClick={() => setShowSuccessDialog(false)}
              className="w-full py-2.5 text-sm font-medium text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors shadow-md"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
