import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập đầy đủ email và mật khẩu' },
        { status: 400 }
      );
    }

    if (email === 'admin@phonestore.com' && password === '123456') {
      return NextResponse.json({
        success: true,
        message: 'Đăng nhập thành công!',
        user: {
          id: 1,
          name: 'Sếp Tổng',
          email: 'admin@phonestore.com',
          role: 'ADMIN'
        },
        token: 'mock-jwt-token-admin'
      });
    }

    if (email === 'khachhang@gmail.com' && password === '123456') {
      return NextResponse.json({
        success: true,
        message: 'Đăng nhập thành công!',
        user: {
          id: 2,
          name: 'Khách VIP',
          email: 'khachhang@gmail.com',
          role: 'CUSTOMER'
        },
        token: 'mock-jwt-token-customer'
      });
    }

    return NextResponse.json(
      { success: false, message: 'Sai email hoặc mật khẩu' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ' },
      { status: 500 }
    );
  }
}
