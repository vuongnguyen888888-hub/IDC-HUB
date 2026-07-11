'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Globe, Facebook, Twitter, Linkedin, Shield } from 'lucide-react';
import { useMarket } from '@/hooks/useMarket';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { getLocalizedPath } = useMarket();

  return (
    <footer className="bg-[#0A0D14] border-t border-neutral-800/40 text-neutral-400 pt-10 pb-6 font-sans selection:bg-[#EE0033]/30 selection:text-white">
      <div className="ali-container">
        {/* Four Elegant Columns - exact Tencent Cloud style layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-6">
          
          {/* Column 1: About Viettel IDC */}
          <div className="space-y-2.5">
            <h4 className="text-[14px] font-bold text-white tracking-tight">Về Viettel IDC</h4>
            <ul className="space-y-1.5 text-[12.5px]">
              {[
                { name: 'Khách hàng thành công', href: '#' },
                { name: 'Đối tác liên kết', href: getLocalizedPath('/partners') },
                { name: 'Trang cộng đồng Facebook', href: 'https://facebook.com', isExternal: true },
                { name: 'Tin tức & Blogs', href: getLocalizedPath('/resources') },
                { name: 'Về chúng tôi', href: getLocalizedPath('/about') }
              ].map((item, idx) => (
                <li key={idx}>
                  {item.isExternal ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                      {item.name}
                    </a>
                  ) : (
                    <Link href={item.href} className="hover:text-white transition-colors block">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Help & Support */}
          <div className="space-y-2.5">
            <h4 className="text-[14px] font-bold text-white tracking-tight">Hỗ trợ & Liên hệ</h4>
            <ul className="space-y-1.5 text-[12.5px]">
              {[
                { name: 'Liên hệ kinh doanh', href: getLocalizedPath('/contact') },
                { name: 'Gửi yêu cầu hỗ trợ (Ticket)', href: getLocalizedPath('/contact') },
                { name: 'Tổng đài hỗ trợ 24/7', href: 'tel:18008088' },
                { name: 'Công cụ tính giá dịch vụ', href: getLocalizedPath('/pricing/calculator') },
                { name: 'Chương trình đối tác', href: getLocalizedPath('/partners') }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Resources */}
          <div className="space-y-2.5">
            <h4 className="text-[14px] font-bold text-white tracking-tight">Dịch vụ & Tài nguyên</h4>
            <ul className="space-y-1.5 text-[12.5px]">
              {[
                { name: 'Danh mục dịch vụ', href: '#services-section-title' },
                { name: 'Trung tâm bảng giá', href: getLocalizedPath('/pricing') },
                { name: 'Tài liệu hướng dẫn (Docs)', href: getLocalizedPath('/resources') },
                { name: 'Hạ tầng trung tâm dữ liệu', href: '#datacenter-network-section' },
                { name: 'Chính sách bảo mật thông tin', href: getLocalizedPath('/contact') }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Portal */}
          <div className="space-y-2.5">
            <h4 className="text-[14px] font-bold text-white tracking-tight">Cổng khách hàng</h4>
            <ul className="space-y-1.5 text-[12.5px]">
              {[
                { name: 'Cổng thông tin khách hàng', href: getLocalizedPath('/contact') },
                { name: 'Quản lý tài nguyên đám mây', href: getLocalizedPath('/contact') },
                { name: 'Trung tâm thanh toán cước', href: getLocalizedPath('/contact') },
                { name: 'Bảng điều khiển (Console)', href: getLocalizedPath('/contact') },
                { name: 'Hộp thư thông báo hệ thống', href: getLocalizedPath('/contact') }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom row divider - exact Tencent Cloud style */}
        <div className="border-t border-neutral-800/60 pt-6 mt-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Left side: Brand presentation & copyright */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Link href={getLocalizedPath('/')}>
                  <Image 
                    src="https://res.cloudinary.com/dpyizq1m2/image/upload/v1782053913/logo-IDC_2_up2gqp.svg" 
                    alt="Viettel IDC" 
                    width={112}
                    height={28}
                    className="h-7 w-auto object-contain brightness-0 invert"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </div>
              <div className="text-[11.5px] text-neutral-500 space-y-1 max-w-3xl lg:max-w-5xl leading-normal">
                <p>Cơ quan chủ quản: Công ty Cổ phần Viettel - CHT (Viettel IDC), trực thuộc Tập đoàn Công nghiệp - Viễn thông Quân đội.</p>
                <p>
                  Mã số doanh nghiệp: 0500589150 do Ban Quản lý các Khu công nghệ cao và Khu công nghiệp<br className="hidden md:inline" />
                  - UBND thành phố Hà Nội cấp lần đầu ngày 11/04/2008, sửa đổi lần thứ 13 ngày 10/06/2026.
                </p>
                <p>Chịu trách nhiệm nội dung: Ông Lê Bá Tân.</p>
                <p className="pt-1.5">
                  Hotline hỗ trợ 24/7: <a href="tel:18008088" className="text-neutral-400 hover:text-[#EE0033] font-semibold transition-colors">1800 8088 (Miễn phí)</a>
                </p>
                <p>
                  Email liên hệ: <a href="mailto:support@viettelidc.com.vn" className="text-neutral-400 hover:text-[#EE0033] font-semibold transition-colors">support@viettelidc.com.vn</a>
                </p>
              </div>
            </div>

            {/* Right side: Policies & social links */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
              
              {/* Policies */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-neutral-400">
                <Link href={getLocalizedPath('/contact')} className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-neutral-700">|</span>
                <Link href={getLocalizedPath('/contact')} className="hover:text-white transition-colors">
                  Legal Terms
                </Link>
                <span className="text-neutral-700">|</span>
                <Link href={getLocalizedPath('/contact')} className="hover:text-white transition-colors">
                  Cookie Preferences
                </Link>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-[8px] border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-[8px] border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-[8px] border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
