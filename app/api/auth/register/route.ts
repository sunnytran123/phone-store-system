import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập đầy đủ thông tin' },
        { status: 400 }
      );
    }

    if (email === 'admin@phonestore.com' || email === 'khachhang@gmail.com') {
      return NextResponse.json(
        { success: false, message: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    // Mock successful registration
    return NextResponse.json({
      success: true,
      message: 'Đăng ký tài khoản thành công!',
      user: {
        id: Math.floor(Math.random() * 1000) + 3,
        name,
        email,
        role: 'CUSTOMER'
      },
      token: 'mock-jwt-token-new-user'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ' },
      { status: 500 }
    );
  }
}
