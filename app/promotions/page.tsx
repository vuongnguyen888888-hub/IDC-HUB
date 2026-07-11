'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarket } from '../../hooks/useMarket';
import { Tag, Copy, Check, Gift, Zap, Award, Sparkles, Phone, HelpCircle, Flame } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScreenSwitcher from '../../components/ScreenSwitcher';

interface DealItem {
  id: string;
  badgeVi: string;
  badgeEn: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  code: string;
  icon: React.ComponentType<any>;
}

export default function PromotionsPage() {
  const { market, isGlobal, getLocalizedPath } = useMarket();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeDeals: DealItem[] = [
    {
      id: 'cloud-server-new',
      badgeVi: 'KHUYẾN MẠI THÁNG 6',
      badgeEn: 'JUNE SPECIAL DEAL',
      titleVi: 'Giảm 30% Đăng ký mới Cloud Server',
      titleEn: '30% OFF New Cloud Server Subscriptions',
      descVi: 'Áp dụng cho mọi cấu hình Cloud Server Basic và Professional khi đăng ký chu kỳ thanh toán từ 6 tháng trở lên.',
      descEn: 'Applied to all Basic and Professional Cloud Server configurations for billing cycles of 6 months or longer.',
      code: 'VIETTELCLOUD30',
      icon: Flame
    },
    {
      id: 'startup-grant',
      badgeVi: 'ĐỒNG HÀNH KHỞI NGHIỆP',
      badgeEn: 'STARTUP GRANT',
      titleVi: 'Tặng Gói hỗ trợ Hạ tầng Mây tới 50.000.000đ',
      titleEn: 'Up to $2,000 Free Cloud Credits for Startups',
      descVi: 'Gói tài trợ hạ tầng mây cho doanh nghiệp khởi nghiệp công nghệ, hỗ trợ tăng tốc kiến trúc và tư vấn kỹ thuật miễn phí.',
      descEn: 'Cloud infrastructure credit grant for verified tech startups, combined with free architecture coaching.',
      code: 'STARTUP50M',
      icon: Gift
    },
    {
      id: 'free-migration',
      badgeVi: 'CHUYỂN VÙNG MIỄN PHÍ',
      badgeEn: 'FREE CLOUD MIGRATION',
      titleVi: 'Miễn phí Chuyển vùng dữ liệu & Tối ưu hóa',
      titleEn: '100% Free Data Migration & Audit',
      descVi: 'Hỗ trợ di chuyển toàn bộ hệ thống từ nhà cung cấp mây khác hoặc máy chủ On-premise về Viettel IDC hoàn toàn không downtime.',
      descEn: 'Seamless migration service of your database and files from AWS, GCP, Azure or on-prem to Viettel IDC with zero downtime.',
      code: 'MIGRATEFREE',
      icon: Zap
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#5A5A5A] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-12 py-8" id="main-content">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-gray-400 font-sans">
            <li>
              <Link href={getLocalizedPath('/')} className="hover:text-[#EE0033] transition-all duration-150">
                {isGlobal ? 'Home' : 'Trang chủ'}
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span className="text-gray-700 font-medium" aria-current="page">
                {isGlobal ? 'Promotions' : 'Chương trình khuyến mại'}
              </span>
            </li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 bg-[#EE0033]/15 w-[450px] h-[450px] rounded-full blur-3xl -mr-28 -mt-28" />
          
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#EE0033]/25 text-[#FF8599] border border-[#EE0033]/30 tracking-widest">
              <Tag className="w-3 h-3 text-[#FF8599]" />
              {isGlobal ? 'OFFICIAL DEALS' : 'ƯU ĐÃI NỔI BẬT THÁNG NÀY'}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white">
              {isGlobal ? 'Special Promotions' : 'Chương trình Ưu đãi & Khuyến mại'}
            </h1>
            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans">
              {isGlobal 
                ? 'Save up to 30% on premium cloud hosting, gain cloud credits for your startup, and enjoy cost-free migration auditing with Viettel IDC.' 
                : 'Khám phá các chương trình tài trợ, chiết khấu và ưu đãi hạ tầng lớn nhất giúp tối ưu chi phí vận hành doanh nghiệp hiệu quả nhất.'}
            </p>
          </div>
        </section>

        {/* DEALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {activeDeals.map((deal) => {
            const Icon = deal.icon;
            const isCopied = copiedCode === deal.code;
            return (
              <div key={deal.id} className="bg-white border border-gray-100 hover:border-[#EE0033]/30 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#EE0033] bg-[#FAF5F6] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {isGlobal ? deal.badgeEn : deal.badgeVi}
                    </span>
                    <Icon className="w-4 h-4 text-[#EE0033]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-[#EE0033] transition-colors leading-snug">
                      {isGlobal ? deal.titleEn : deal.titleVi}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {isGlobal ? deal.descEn : deal.descVi}
                    </p>
                  </div>
                </div>

                {/* Voucher code segment */}
                <div className="mt-6 pt-5 border-t border-gray-100 space-y-4">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">
                        {isGlobal ? 'PROMO CODE' : 'MÃ KHUYẾN MẠI'}
                      </span>
                      <code className="text-xs font-bold text-gray-900 font-mono tracking-wide">{deal.code}</code>
                    </div>
                    <button
                      onClick={() => handleCopy(deal.code)}
                      className={`p-2 rounded-lg transition-all ${
                        isCopied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white hover:bg-[#EE0033] text-gray-400 hover:text-white border border-gray-200'
                      }`}
                      title={isGlobal ? 'Copy Code' : 'Sao chép mã'}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <Link
                    href={getLocalizedPath('/contact')}
                    className="w-full text-center py-2 bg-gray-900 hover:bg-[#EE0033] text-white flex items-center justify-center font-bold text-xs rounded-[8px] transition-all block"
                  >
                    <span>{isGlobal ? 'Redeem Offer' : 'Đăng ký áp dụng'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* PROMOTION FAQ */}
        <section className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-10 mb-16 text-left">
          <div className="max-w-md mb-8 space-y-1">
            <h2 className="text-lg md:text-xl font-bold text-gray-950">
              {isGlobal ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp về ưu đãi'}
            </h2>
            <p className="text-xs text-gray-400">
              {isGlobal ? 'Got questions about applying promo codes? Read below.' : 'Tìm hiểu kỹ lưỡng quy trình nhập mã ưu đãi và chính sách đi kèm.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs md:text-sm">
                {isGlobal ? 'How do I redeem my promo code?' : 'Cách thức áp dụng mã khuyến mại như thế nào?'}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                {isGlobal 
                  ? 'Copy the code above and click "Redeem Offer" to submit it with your contact details. Our team will verify and apply the reduction to your custom quote.' 
                  : 'Sao chép mã phía trên và nhấp vào nút "Đăng ký áp dụng". Điền đầy đủ thông tin để chuyên viên tư vấn hỗ trợ tích hợp mã khuyến mại trực tiếp vào hóa đơn của bạn.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs md:text-sm">
                {isGlobal ? 'Can I combine multiple promotion codes?' : 'Các ưu đãi có cộng dồn với nhau không?'}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                {isGlobal 
                  ? 'Each customer or custom invoice can only redeem one code at a time unless explicitly authorized by a custom Enterprise SLA agreement.' 
                  : 'Rất tiếc, các mã khuyến mại không hỗ trợ cộng dồn, ngoại trừ các trường hợp ký hợp đồng chiến lược dài hạn quy mô lớn.'}
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}
