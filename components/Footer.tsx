import Link from "next/link";
import { MapPin, Phone, Mail, CreditCard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="font-black text-xl text-zinc-950">P</span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">PhoneStore</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Hệ thống bán lẻ điện thoại di động, máy tính bảng, phụ kiện chính hãng uy tín nhất Việt Nam.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-zinc-500" />
                <span>123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-zinc-500" />
                <span>1900 1234 (Miễn phí)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span>cskh@phonestore.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-6 uppercase tracking-wider">Hỗ trợ khách hàng</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo hành</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách đổi trả 30 ngày</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách giao hàng</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hướng dẫn mua trả góp</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hướng dẫn thanh toán</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tra cứu đơn hàng</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-6 uppercase tracking-wider">Về PhoneStore</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Giới thiệu công ty</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tuyển dụng</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Gửi góp ý, khiếu nại</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tìm siêu thị (300 shop)</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tin tức công nghệ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-6 uppercase tracking-wider">Thanh toán</h3>
            <div className="flex gap-2 mb-8">
              <div className="w-12 h-8 bg-zinc-800 rounded flex items-center justify-center border border-zinc-700">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="w-12 h-8 bg-zinc-800 rounded flex items-center justify-center border border-zinc-700 text-xs font-bold text-white">
                VISA
              </div>
              <div className="w-12 h-8 bg-zinc-800 rounded flex items-center justify-center border border-zinc-700 text-xs font-bold text-white">
                ATM
              </div>
            </div>

            <h3 className="font-bold text-white text-base mb-4 uppercase tracking-wider">Kết nối</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 PhoneStore. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
