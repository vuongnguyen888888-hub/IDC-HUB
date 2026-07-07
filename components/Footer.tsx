'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Globe } from 'lucide-react';
import { useMarket } from '@/hooks/useMarket';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { getLocalizedPath } = useMarket();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 pt-16 pb-8 font-sans">
      <div className="ali-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800/60">
          
          {/* Column 1: Brand presentation & contact details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <Link href={getLocalizedPath('/')}>
                <Image 
                  src="https://res.cloudinary.com/dpyizq1m2/image/upload/v1782053913/logo-IDC_2_up2gqp.svg" 
                  alt="Viettel IDC" 
                  width={128}
                  height={32}
                  className="h-8 w-auto object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Cơ quan chủ quản: Công ty Cổ phần Viettel - CHT (Viettel IDC), trực thuộc Tập đoàn Công nghiệp - Viễn thông Quân đội.<br /><br />
              Mã số doanh nghiệp: 0500589150 do Ban Quản lý các Khu công nghệ cao và Khu công nghiệp - UBND thành phố Hà Nội cấp lần đầu ngày 11/04/2008, sửa đổi lần thứ 13 ngày 10/06/2026.<br /><br />
              Chịu trách nhiệm nội dung: Ông Lê Bá Tân.
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EE0033] shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-mono tracking-wider leading-none">Hotline hỗ trợ 24/7</span>
                  <a href="tel:18008088" className="text-white hover:text-[#EE0033] font-bold tracking-wide transition-colors">1800 8088 (Miễn phí)</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#EE0033] shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-mono tracking-wider leading-none">Email liên hệ</span>
                  <a href="mailto:support@viettelidc.com.vn" className="text-neutral-300 hover:text-[#EE0033] font-semibold transition-colors">support@viettelidc.com.vn</a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Products & Solutions */}
          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-widest text-white uppercase border-b border-neutral-800 pb-2">Giải pháp</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { name: 'Viettel Cloud Server', href: '#services-section-title' },
                { name: 'Viettel Kubernetes Service', href: '#services-section-title' },
                { name: 'Private Cloud', href: '#services-section-title' },
                { name: 'Object & Block Storage', href: '#services-section-title' },
                { name: 'Viettel CDN', href: '#services-section-title' },
                { name: 'Dịch vụ An ninh mạng', href: '#services-section-title' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Infrastructures */}
          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-widest text-white uppercase border-b border-neutral-800 pb-2">Hạ tầng trung tâm</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { name: 'TTDL Hòa Lạc III', href: '#datacenter-network-section' },
                { name: 'TTDL Đà Nẵng', href: '#datacenter-network-section' },
                { name: 'TTDL Bình Dương', href: '#datacenter-network-section' },
                { name: 'TTDL Hòa Lạc I & II', href: '#datacenter-network-section' },
                { name: 'Chứng chỉ Rated 3', href: '#datacenter-network-section' },
                { name: 'Bảo mật SOC 2', href: '#datacenter-network-section' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-widest text-white uppercase border-b border-neutral-800 pb-2">Tài nguyên & Hỗ trợ</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { name: 'Tài liệu kỹ thuật (Docs)', href: getLocalizedPath('/contact') },
                { name: 'Sơ đồ trang web', href: getLocalizedPath('/contact') },
                { name: 'Hỏi đáp kỹ thuật (FAQs)', href: getLocalizedPath('/contact') },
                { name: 'Gửi yêu cầu hỗ trợ', href: getLocalizedPath('/contact') },
                { name: 'Chính sách bảo mật', href: getLocalizedPath('/contact') },
                { name: 'Điều khoản sử dụng', href: getLocalizedPath('/contact') }
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


        {/* Bottom copyright and compliance strip */}
        <div className="pt-8 text-xs text-neutral-500 text-center sm:text-left">
          © Bản quyền thuộc về: Công ty Cổ phần Viettel - CHT
        </div>
      </div>
    </footer>
  );
}
