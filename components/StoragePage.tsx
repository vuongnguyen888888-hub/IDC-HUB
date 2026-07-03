'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  HardDrive, Database, Shield, Zap, RefreshCw, Check, ArrowRight,
  User, Mail, Phone, CheckCircle2, ChevronRight, ChevronDown, Lock,
  FileText, HelpCircle, HardDriveUpload, Server, Cloud, ExternalLink
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import ScreenSwitcher from './ScreenSwitcher';

export default function StoragePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Viettel Cloud Object Storage (S3-compatible)'
  });
  const [ctaSuccess, setCtaSuccess] = useState(false);

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCtaSuccess(true);
    setTimeout(() => {
      setCtaForm({
        name: '',
        email: '',
        phone: '',
        solution: 'Viettel Cloud Object Storage (S3-compatible)'
      });
    }, 4000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 80;
      const sections = ['overview', 'products', 'comparison', 'use-cases', 'faq'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveTab(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const subnavHeight = 56;
      const offsetPosition = element.offsetTop - subnavHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section id="hero-section" className="relative overflow-hidden bg-[#1E2329] text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2329] via-[#2D3441]/95 to-transparent" />
        
        <div className="ali-container relative z-10 text-left flex flex-col items-start py-6 w-full">
          <div className="space-y-6 max-w-3xl flex flex-col items-start">
            <div className="inline-flex items-center space-x-2 bg-[#EE0033]/15 border border-[#EE0033]/30 px-3 py-1.5 rounded-full text-[#EE0033] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EE0033] mr-1 animate-ping" />
              DANH MỤC CỐT LÕI · STORAGE & DATA PROTECTION
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Lưu trữ & Bảo vệ dữ liệu<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">An toàn & Sẵn sàng tuyệt đối</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Hệ sinh thái lưu trữ đối tượng S3 tương thích ngược, lưu trữ khối hiệu năng siêu cao SSD và giải pháp sao lưu, phục hồi thảm họa tự động chống Ransomware toàn diện. Đảm bảo toàn vẹn dữ liệu cho mọi hạ tầng doanh nghiệp số.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToSection('products')}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#EE0033] text-white font-bold text-sm tracking-wider rounded-full shadow-[0_4px_14px_rgba(238,0,51,0.4)] transition-all duration-300 hover:bg-[#FF1A4E] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_6px_20px_rgba(238,0,51,0.5)] focus:outline-none text-center cursor-pointer"
              >
                <span>Khám phá sản phẩm</span>
                <span className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center text-[8px] font-bold group-hover:border-white group-hover:scale-110 transition-all duration-300">
                  →
                </span>
              </button>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-3 bg-transparent border border-gray-400 hover:border-white text-gray-300 hover:text-white font-bold text-sm tracking-wider rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Nhận tư vấn thiết kế miễn phí
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY TAB NAVIGATION MENU */}
      <div className="sticky top-0 z-[1010] bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm transition-all duration-300">
        <div className="ali-container">
          <div className="flex items-center justify-between h-14 md:h-16">
            
            {/* Left side: Product Name & Tabs */}
            <div className="flex items-center gap-6 lg:gap-8 overflow-hidden h-full">
              <span className="text-sm md:text-base font-extrabold text-gray-950 tracking-tight shrink-0 flex items-center h-full border-r border-gray-200/60 pr-4 md:pr-6">
                Lưu trữ & Bảo vệ dữ liệu
              </span>
              
              {/* Desktop Tabs */}
              <div className="hidden md:flex items-center gap-5 lg:gap-7 h-full">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'products', label: 'Hệ sinh thái sản phẩm' },
                  { id: 'comparison', label: 'Ưu thế so sánh' },
                  { id: 'use-cases', label: 'Kịch bản triển khai' },
                  { id: 'faq', label: 'Hỏi đáp' }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`relative h-14 md:h-16 px-1 text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center ${
                        isActive ? 'text-[#EE0033]' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeStorageTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE0033]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side: Mobile scroll area / Desktop CTA */}
            <div className="flex items-center gap-4 shrink-0 h-full">
              {/* Mobile tabs - scrollable on mobile */}
              <div className="md:hidden flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap max-w-[130px] sm:max-w-[240px] py-1">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'products', label: 'Sản phẩm' },
                  { id: 'comparison', label: 'Ưu thế' },
                  { id: 'faq', label: 'Hỏi đáp' }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`text-[11px] font-bold px-2 py-1 rounded transition-all cursor-pointer ${
                        isActive ? 'text-[#EE0033] bg-red-50' : 'text-gray-500'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <a 
                href="/contact"
                className="px-5 py-2 md:py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-[10px] md:text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                Nhận báo giá
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION OVERVIEW */}
      <section id="overview" className="py-16 md:py-20 bg-white relative">
        <div className="ali-container">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">TỔNG QUAN GIẢI PHÁP</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Bảo vệ toàn vẹn tài sản số quan trọng nhất
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Dữ liệu là huyết mạch của doanh nghiệp số. Hệ sinh thái Lưu trữ & Bảo vệ dữ liệu của Viettel IDC mang đến độ tin cậy vượt trội, tối ưu chi phí lưu giữ dài hạn và phục hồi tức thì khi xảy ra sự cố.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE0033] flex items-center justify-center mb-6">
                  <Cloud className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Lưu trữ đối tượng (Object S3)</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Tương thích hoàn toàn API S3 tiêu chuẩn toàn cầu, tự động co giãn không giới hạn dung lượng lưu trữ, tối ưu hóa cho phân phối nội dung media, tệp tĩnh và hồ sơ pháp lý.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE0033] flex items-center justify-center mb-6">
                  <HardDrive className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Lưu trữ khối (Block SSD)</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Trang bị 100% ổ đĩa Enterprise SSD chuyên dụng, băng thông truy xuất cực lớn và độ trễ cực thấp. Đáp ứng nhu cầu khắt khe của các ứng dụng Core SQL, ERP và Big Data.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE0033] flex items-center justify-center mb-6">
                  <Shield className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Phục hồi Ransomware</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Cơ chế khoá bất biến (Object Lock/WORM) ngăn chặn hoàn toàn việc can thiệp, chỉnh sửa hay mã hóa dữ liệu trái phép từ hacker và ransomware độc hại. Khôi phục trạng thái sạch tức thì.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAND (SECTION DUY NHẤT DÙNG NỀN ĐỎ THEO QUY TẮC CHUNG CỦA VIETTEL IDC) */}
      <section className="bg-[#EE0033] text-white py-12 md:py-16 font-sans">
        <div className="ali-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">99.999%</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Độ sẵn sàng dữ liệu (SLA)</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">&lt; 15s</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Khôi phục tức thời (RPO)</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">100+ PB</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Tổng dung lượng đang lưu trữ</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">S3 API</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Tương thích chuẩn quốc tế</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PRODUCTS DEEP DIVE */}
      <section id="products" className="py-16 md:py-20 bg-gray-50/50 border-b border-gray-200/40 relative overflow-hidden">
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">HỆ SINH THÁI SẢN PHẨM</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Sản phẩm Lưu trữ & Bảo vệ dữ liệu
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Bộ giải pháp toàn diện từ lưu trữ hạ tầng gốc đến sao lưu đám mây và dự phòng khôi phục thảm họa thông minh cho doanh nghiệp.
            </p>
          </motion.div>

          <div className="space-y-16">
            
            {/* GROUP 1: LƯU TRỮ ĐÁM MÂY */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 text-left">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Giải pháp Lưu trữ Core Cloud (Cloud Storage)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 text-left">
                {[
                  {
                    name: 'Viettel Cloud Object Storage (S3)',
                    badge: 'NỔI BẬT',
                    desc: 'Lưu trữ đối tượng dung lượng lớn, độ bền vững đạt 11 số 9 (99.999999999%), tích hợp chuẩn bảo mật S3 API.',
                    details: [
                      'Hỗ trợ Lifecycle Management tự động chuyển đổi Hot / Cool / Cold để tối ưu hóa chi phí',
                      'Tương thích hoàn toàn với tất cả thư viện, SDK và công cụ bên thứ ba chuẩn S3',
                      'Tích hợp sẵn Object Lock ngăn chặn ghi đè, xóa tệp, ngăn ngừa Ransomware tuyệt đối'
                    ],
                    specs: [
                      { label: 'Uptime SLA', value: '✓ 99.99%' },
                      { label: 'Công nghệ', value: '⚡ S3 Standard' }
                    ],
                    pricing: [
                      { planName: 'Standard Hot Tier', specs: ['Truy xuất dữ liệu tức thì', 'Tần suất đọc/ghi cao', 'Độ trễ thấp dưới 10ms'], price: '550', period: 'GB/tháng', fType: 'F1 Auto' },
                      { planName: 'Cool Archive Tier', specs: ['Lưu trữ dữ liệu ít hoạt động', 'Thời gian lưu trữ tối thiểu 30 ngày', 'Tiết kiệm chi phí tới 40%'], price: '350', period: 'GB/tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Cloud
                  },
                  {
                    name: 'Viettel Cloud Block Storage',
                    badge: 'HIỆU NĂNG',
                    desc: 'Hạ tầng lưu trữ dạng khối gắn ngoài chuyên dụng cho Máy chủ ảo hóa, mang lại IOPS đỉnh cao và khả năng mở rộng tức thì.',
                    details: [
                      'Trang bị 100% ổ cứng Enterprise SSD và NVMe chuyên dụng doanh nghiệp',
                      'Băng thông kênh truyền tải dữ liệu siêu tốc độ, tránh hiện tượng nghẽn I/O',
                      'Cho phép tạo ảnh nhanh Snapshot của đĩa cứng tức thì để sao lưu phục hồi hệ thống'
                    ],
                    specs: [
                      { label: 'Độ trễ', value: '⚡ < 1ms' },
                      { label: 'Khả năng nạp', value: '✓ Đến 20.000 IOPS' }
                    ],
                    pricing: [
                      { planName: 'SATA Enterprise (Lưu trữ ấm)', specs: ['Phù hợp lưu file chung, web server', 'Băng thông đọc ghi trung bình', 'Giá thành tiết kiệm'], price: '1.200', period: 'GB/tháng', fType: 'F1 Auto' },
                      { planName: 'SSD Performance (Lưu trữ nóng)', specs: ['Chuyên dụng Core DB, ERP, CRM', 'Độ trễ cực thấp, IOPS cam kết', 'Bảo vệ dữ liệu RAID 10 kép'], price: '2.500', period: 'GB/tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: HardDrive
                  }
                ].map((prod, idx) => {
                  const IconComponent = prod.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">STG-0{idx+1}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-[#EE0033] flex items-center justify-center shrink-0">
                            <IconComponent className="w-6 h-6 stroke-[1.8]" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-lg text-gray-950 font-sans tracking-tight">{prod.name}</h4>
                            <div className="flex gap-1.5 mt-1">
                              {prod.specs.map((spec, sidx) => (
                                <span key={sidx} className="text-[9px] font-bold bg-neutral-100 px-2 py-0.5 rounded text-neutral-600 border border-neutral-200">
                                  {spec.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed min-h-[40px]">
                          {prod.desc}
                        </p>

                        <div className="border-t border-gray-100 pt-4 space-y-2">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Tính năng chính</span>
                          {prod.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600">
                              <Check className="w-3.5 h-3.5 text-[#EE0033] shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>

                        {/* Pricing Tiers inside product card */}
                        <div className="border-t border-gray-100 pt-4 space-y-3">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Gói dịch vụ & Đơn giá</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {prod.pricing.map((price, pidx) => (
                              <div key={pidx} className={`p-3 rounded-xl border text-left flex flex-col justify-between ${
                                price.isPopular ? 'border-[#EE0033]/30 bg-[#FFF0F2]/10' : 'border-gray-200 bg-white'
                              }`}>
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="font-bold text-xs text-gray-950 block truncate">{price.planName}</span>
                                    {price.isPopular && <span className="text-[8px] bg-[#EE0033] text-white px-1 py-0.2 rounded font-extrabold">PHỔ BIẾN</span>}
                                  </div>
                                  <div className="space-y-1">
                                    {price.specs.map((spec, spIdx) => (
                                      <p key={spIdx} className="text-[10px] text-gray-400 leading-normal truncate">{spec}</p>
                                    ))}
                                  </div>
                                </div>
                                <div className="border-t border-gray-100/60 pt-2 mt-2 flex items-baseline gap-1">
                                  <span className="text-sm font-black text-[#EE0033]">{price.price}đ</span>
                                  <span className="text-[10px] text-gray-400">/{price.period}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-mono font-medium">Báo giá chưa gồm 10% VAT</span>
                        <button 
                          onClick={() => {
                            setCtaForm({
                              ...ctaForm,
                              solution: prod.name
                            });
                            scrollToSection('consultation');
                          }}
                          className="text-xs font-bold text-[#EE0033] hover:text-[#C8002B] flex items-center gap-1 cursor-pointer"
                        >
                          Đăng ký dùng thử <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* GROUP 2: SAO LƯU & BẢO VỆ (BACKUP & DR) */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 text-left">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Sao lưu & Phục hồi thảm họa (BaaS & DRaaS)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 text-left">
                {[
                  {
                    name: 'Viettel Cloud Backup (BaaS)',
                    badge: 'BẢO VỆ',
                    desc: 'Dịch vụ sao lưu tự động (Backup-as-a-Service) cho toàn bộ hệ thống máy chủ vật lý, máy chủ ảo hóa và cơ sở dữ liệu lên mây.',
                    details: [
                      'Lập lịch tự động sao lưu định kỳ hàng ngày, hàng giờ không cần can thiệp thủ công',
                      'Công nghệ nén dữ liệu và chống trùng lặp (Deduplication) giúp tiết kiệm dung lượng',
                      'Hỗ trợ khôi phục tại chỗ (Restore-in-place) hoặc khôi phục sang máy chủ mới cực nhanh'
                    ],
                    specs: [
                      { label: 'Uptime SLA', value: '✓ 99.99%' },
                      { label: 'Bảo mật', value: '🔒 Mã hóa AES-256' }
                    ],
                    pricing: [
                      { planName: 'Backup Agent VM', specs: ['Hỗ trợ OS Windows/Linux', 'Mã hóa đầu cuối bảo mật', 'Bao gồm 50GB dung lượng'], price: '450.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'Backup DB Enterprise', specs: ['Hỗ trợ Oracle/SQL/MySQL', 'Sao lưu trực tiếp không ngắt quãng', 'Bao gồm 100GB dung lượng'], price: '950.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: RefreshCw
                  },
                  {
                    name: 'Viettel Disaster Recovery (DRaaS)',
                    badge: 'CHUYÊN SÂU',
                    desc: 'Dịch vụ phục hồi sau thảm họa toàn diện (Disaster Recovery-as-a-Service), nhân bản block liên tục CDP, cam kết RPO tối thiểu.',
                    details: [
                      'Nhân bản dữ liệu thời gian thực cấp block liên tục giữa các trung tâm dữ liệu độc lập',
                      'Hệ thống tự động kích hoạt Failover chuyển mạch lưu lượng chỉ trong vài phút khi sự cố xảy ra',
                      'Hỗ trợ kiểm thử kịch bản thảm họa (DR Testing) định kỳ không ảnh hưởng tới môi trường live'
                    ],
                    specs: [
                      { label: 'RPO tối đa', value: '⚡ < 15 giây' },
                      { label: 'RTO cam kết', value: '✓ < 15 phút' }
                    ],
                    pricing: [
                      { planName: 'DR Cloud-to-Cloud', specs: ['Sao lưu giữa 2 cụm Viettel Cloud', 'Tốc độ chuyển đổi tự động', 'Hỗ trợ kỹ thuật 24/7'], price: '1.500.000', period: 'VM/tháng', fType: 'F1 Auto' },
                      { planName: 'DR On-Premise to Cloud', specs: ['Đồng bộ từ DC của doanh nghiệp', 'Kết nối qua VPN/Kênh thuê riêng', 'Miễn phí DR testing hàng năm'], price: '2.500.000', period: 'VM/tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Shield
                  }
                ].map((prod, idx) => {
                  const IconComponent = prod.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">STG-0{idx+3}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-[#EE0033] flex items-center justify-center shrink-0">
                            <IconComponent className="w-6 h-6 stroke-[1.8]" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-lg text-gray-950 font-sans tracking-tight">{prod.name}</h4>
                            <div className="flex gap-1.5 mt-1">
                              {prod.specs.map((spec, sidx) => (
                                <span key={sidx} className="text-[9px] font-bold bg-neutral-100 px-2 py-0.5 rounded text-neutral-600 border border-neutral-200">
                                  {spec.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed min-h-[40px]">
                          {prod.desc}
                        </p>

                        <div className="border-t border-gray-100 pt-4 space-y-2">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Tính năng chính</span>
                          {prod.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600">
                              <Check className="w-3.5 h-3.5 text-[#EE0033] shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>

                        {/* Pricing Tiers inside product card */}
                        <div className="border-t border-gray-100 pt-4 space-y-3">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Gói dịch vụ & Đơn giá</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {prod.pricing.map((price, pidx) => (
                              <div key={pidx} className={`p-3 rounded-xl border text-left flex flex-col justify-between ${
                                price.isPopular ? 'border-[#EE0033]/30 bg-[#FFF0F2]/10' : 'border-gray-200 bg-white'
                              }`}>
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="font-bold text-xs text-gray-950 block truncate">{price.planName}</span>
                                    {price.isPopular && <span className="text-[8px] bg-[#EE0033] text-white px-1 py-0.2 rounded font-extrabold">PHỔ BIẾN</span>}
                                  </div>
                                  <div className="space-y-1">
                                    {price.specs.map((spec, spIdx) => (
                                      <p key={spIdx} className="text-[10px] text-gray-400 leading-normal truncate">{spec}</p>
                                    ))}
                                  </div>
                                </div>
                                <div className="border-t border-gray-100/60 pt-2 mt-2 flex items-baseline gap-1">
                                  <span className="text-sm font-black text-[#EE0033]">{price.price}đ</span>
                                  <span className="text-[10px] text-gray-400">/{price.period}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-mono font-medium">Báo giá chưa gồm 10% VAT</span>
                        <button 
                          onClick={() => {
                            setCtaForm({
                              ...ctaForm,
                              solution: prod.name
                            });
                            scrollToSection('consultation');
                          }}
                          className="text-xs font-bold text-[#EE0033] hover:text-[#C8002B] flex items-center gap-1 cursor-pointer"
                        >
                          Đăng ký dùng thử <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION COMPARATIVE ADVANTAGES */}
      <section id="comparison" className="py-16 md:py-20 bg-white relative">
        <div className="ali-container">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ƯU THẾ VƯỢT TRỘI</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Tại sao chọn giải pháp lưu trữ của Viettel IDC?
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Chúng tôi kết hợp hạ tầng vật lý đạt chuẩn Rated 3 cao cấp nhất với công nghệ lưu trữ tiên tiến nhất để mang đến trải nghiệm lưu trữ số an toàn, tốc độ và tiết kiệm chi phí tối đa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Chủ quyền dữ liệu Việt</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Toàn bộ dữ liệu được lưu trữ trực tiếp tại hệ thống trung tâm dữ liệu chuẩn Rated 3 nằm tại Việt Nam, tuân thủ tuyệt đối Luật An ninh mạng và Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Tự động hóa hoàn toàn</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tự động tối ưu chi phí thông qua quản trị vòng đời tệp tin (S3 Lifecycle), thiết lập lịch trình sao lưu tự động và khả năng chuyển đổi dự phòng DR site chỉ bằng một lượt click.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Mã hóa an toàn đa lớp</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Dữ liệu luôn được mã hóa trong quá trình truyền tải (In-transit) và lưu trữ (At-rest) bằng thuật toán chuẩn AES-256 kết hợp phân quyền truy cập thông minh IAM và khóa bất biến chống Ransomware.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Băng thông rộng miễn phí</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Doanh nghiệp được miễn phí 100% chi phí lưu chuyển dữ liệu trong hệ thống mạng nội bộ đám mây Viettel IDC (Intra-cloud network bandwidth), cắt giảm hoàn toàn các chi phí ẩn như đám mây quốc tế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION USE CASES */}
      <section id="use-cases" className="py-16 md:py-20 bg-gray-50/50 border-t border-gray-200/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">KỊCH BẢN ĐIỂN HÌNH</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Tối ưu hóa các kịch bản triển khai
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các kịch bản thực tế mà chúng tôi thiết kế đo ni đóng giày riêng để tối đa hóa hiệu quả lưu trữ cho các doanh nghiệp, tổ chức và cơ quan chính phủ.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Sao lưu phục hồi dữ liệu Core System',
                desc: 'Thiết lập luồng đồng bộ tự động cho các máy chủ cơ sở dữ liệu lớn (Oracle, SQL, SAP) từ on-premises lên Viettel Cloud Backup thông qua kết nối an toàn (IPSec VPN hoặc kênh truyền số liệu chuyên dụng). Đảm bảo dự phòng dữ liệu sạch khi gặp sự cố phần cứng.'
              },
              {
                num: '02',
                title: 'Lưu trữ tệp và phân phối Media tốc độ cao',
                desc: 'Tận dụng S3 Object Storage để chứa hàng trăm Terabyte hình ảnh, video sản phẩm, tài liệu hóa đơn điện tử cho các ứng dụng Web, App và Thương mại điện tử. Tích hợp CDN đám mây để tăng tốc độ phản hồi tải trang dưới 0.5 giây cho người dùng cuối.'
              },
              {
                num: '03',
                title: 'Lưu trữ tài liệu lưu trữ dài hạn (Cold Archive)',
                desc: 'Quy trình lưu trữ tối ưu hóa chi phí cho các loại tệp log hệ thống, hồ sơ bệnh án y tế, tài liệu kế toán doanh nghiệp cần giữ từ 5 đến 10 năm theo yêu cầu pháp lý. Tự động chuyển vùng dữ liệu sang Cold Tier giúp cắt giảm 70% chi phí lưu trữ thông thường.'
              },
              {
                num: '04',
                title: 'Hạ tầng dự phòng thảm họa Active-Passive',
                desc: 'Xây dựng bản sao lưu mức block liên tục (Continuous Data Protection) cho các máy chủ ứng dụng quan trọng của doanh nghiệp. Hệ thống dự phòng thảm họa luôn sẵn sàng kích hoạt chuyển dịch lưu lượng (Failover) về Viettel Cloud trong vòng dưới 15 phút.'
              }
            ].map((useCase, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 text-left transition-all duration-300 hover:border-[#EE0033]/30 hover:shadow-sm flex gap-5"
              >
                <div className="text-3xl font-black text-[#EE0033] shrink-0 mt-0.5 font-mono select-none">
                  {useCase.num}
                </div>
                <div className="space-y-2">
                  <h4 className="font-extrabold text-base md:text-lg text-gray-950 font-sans tracking-tight">{useCase.title}</h4>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{useCase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION FAQ */}
      <section id="faq" className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">HỎI ĐÁP THƯỜNG GẶP</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Giải đáp thắc mắc dịch vụ lưu trữ
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các câu hỏi phổ biến nhất của các kiến trúc sư giải pháp CNTT và doanh nghiệp về các tính năng, đơn giá và cấu hình của hệ sinh thái lưu trữ đám mây.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: 'Dữ liệu lưu trữ trên Viettel Cloud Object Storage có bị tính phí băng thông truyền tải ra ngoài (Egress Bandwidth) không?',
                a: 'Khác với các nhà cung cấp đám mây quốc tế tính phí Egress Bandwidth rất cao, Viettel IDC miễn phí hoàn toàn băng thông lưu chuyển nội bộ trong mạng đám mây. Đối với lưu lượng truyền tải ra Internet bên ngoài, chúng tôi cung cấp chính sách băng thông rộng với đơn giá cực kỳ tối ưu, minh bạch và không phát sinh chi phí ẩn.'
              },
              {
                q: 'Tính năng khóa bất biến (Object Lock) hoạt động thế nào để chống lại ransomware?',
                a: 'Khi kích hoạt tính năng Object Lock trên một bucket S3, bạn có thể áp dụng chế độ WORM (Write Once, Read Many). Mọi dữ liệu ghi vào bucket trong khoảng thời gian quy định sẽ KHÔNG THỂ bị ghi đè, sửa đổi hay xóa bỏ bởi bất kỳ ai, kể cả tài khoản Root hay hacker nắm khóa quản trị. Điều này ngăn chặn triệt để hành vi mã hóa đòi tiền chuộc của Ransomware.'
              },
              {
                q: 'BaaS (Cloud Backup) của Viettel IDC có hỗ trợ sao lưu các cơ sở dữ liệu lớn không?',
                a: 'Có, Viettel Cloud Backup hỗ trợ cơ chế sao lưu trực tiếp cấp ứng dụng (Application-consistent Backup) cho hầu hết các cơ sở dữ liệu Enterprise phổ biến bao gồm Oracle Database, Microsoft SQL Server, MySQL, PostgreSQL, MongoDB, v.v. Quá trình sao lưu diễn ra trực tiếp thông qua API của DB, đảm bảo tính toàn vẹn tuyệt đối mà không cần ngắt quãng dịch vụ.'
              },
              {
                q: 'Dịch vụ Disaster Recovery (DRaaS) cam kết các thông số RPO và RTO cụ thể như thế nào?',
                a: 'Nhờ công nghệ nhân bản block liên tục CDP, Viettel Disaster Recovery cam kết RPO (Recovery Point Objective - khoảng thời gian mất mát dữ liệu tối đa) dưới 15 giây đối với kết nối mạng đạt chuẩn, và RTO (Recovery Time Objective - thời gian hệ thống khôi phục hoạt động trở lại sau thảm họa) cam kết dưới 15 phút thông qua quy trình Failover tự động bằng 1-click.'
              }
            ].map((faq, i) => {
              const isOpen = openFAQ === i;
              return (
                <div 
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between text-gray-900 hover:bg-neutral-50 font-bold text-sm md:text-base tracking-tight font-sans cursor-pointer focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#EE0033]' : ''}`} />
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4 text-left">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION CONTACT CONSULTATION */}
      <section id="consultation" className="relative py-20 lg:py-28 bg-gradient-to-br from-[#8A001A] via-[#660011] to-[#3B0007] overflow-hidden text-white font-sans border-t border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#EE0033]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#EE0033]/20 blur-[150px] pointer-events-none" />

        <div className="ali-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-[#FF4D6D] font-bold text-xs uppercase tracking-widest block bg-[#FF4D6D]/10 px-3 py-1 rounded-full w-max">
                DÙNG THỬ LƯU TRỮ MIỄN PHÍ HÔM NAY
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-sans tracking-tight">
                Thiết kế giải pháp dự phòng &amp; lưu trữ tối ưu
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Đội ngũ chuyên gia và kỹ sư cao cấp của Viettel IDC luôn sẵn sàng hỗ trợ khảo sát hiện trạng hạ tầng CNTT trực tiếp tại doanh nghiệp, tư vấn chính sách di trú dữ liệu an toàn và cấp quyền tài khoản dùng thử trải nghiệm miễn phí hệ thống lưu trữ S3 cao cấp.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">Tư vấn miễn phí 100%</span>
                    <p className="text-xs text-gray-300">Không tính phí rà soát hiện trạng thực tế hệ thống lưu trữ.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">Thủ tục đơn giản, bàn giao nhanh</span>
                    <p className="text-xs text-gray-300">Cấp phát tài khoản S3 / Cloud Backup trải nghiệm tức thì trong ngày.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interaction Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl text-neutral-900 max-w-lg mx-auto lg:ml-auto relative border border-neutral-100">
                {ctaSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-neutral-900">Gửi thông tin thành công!</h3>
                      <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                        Cảm ơn bạn đã quan tâm. Kỹ sư giải pháp Lưu trữ Viettel IDC sẽ liên hệ lại tư vấn trực tiếp và cung cấp tài khoản dùng thử trong vòng 15 phút.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="space-y-4 text-left">
                    <div className="text-center mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight">Đăng ký tư vấn lưu trữ</h3>
                      <p className="text-xs text-neutral-500 mt-1.5">Kỹ sư Viettel IDC sẽ liên hệ tư vấn và cấp thử nghiệm trong vòng 15 phút.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-neutral-700">Họ và tên của bạn</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                            <User className="w-4 h-4" />
                          </span>
                          <input 
                            type="text" 
                            required
                            placeholder="Ví dụ: Nguyễn Văn Vương" 
                            value={ctaForm.name}
                            onChange={(e) => setCtaForm({...ctaForm, name: e.target.value})}
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-neutral-700">Email</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                              <Mail className="w-4 h-4" />
                            </span>
                            <input 
                              type="email" 
                              required
                              placeholder="name@company.com" 
                              value={ctaForm.email}
                              onChange={(e) => setCtaForm({...ctaForm, email: e.target.value})}
                              className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-neutral-700">Số điện thoại</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                              <Phone className="w-4 h-4" />
                            </span>
                            <input 
                              type="tel" 
                              required
                              placeholder="Ví dụ: 098xxxxx7" 
                              value={ctaForm.phone}
                              onChange={(e) => setCtaForm({...ctaForm, phone: e.target.value})}
                              className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-neutral-700">Giải pháp cần tư vấn</label>
                        <div className="relative">
                          <select 
                            value={ctaForm.solution}
                            onChange={(e) => setCtaForm({...ctaForm, solution: e.target.value})}
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] appearance-none font-medium transition-all"
                          >
                            <option value="Viettel Cloud Object Storage (S3-compatible)">Viettel Cloud Object Storage (S3-compatible)</option>
                            <option value="Viettel Cloud Block Storage">Viettel Cloud Block Storage</option>
                            <option value="Viettel Cloud Backup (BaaS)">Viettel Cloud Backup (BaaS)</option>
                            <option value="Viettel Disaster Recovery (DRaaS)">Viettel Disaster Recovery (DRaaS)</option>
                          </select>
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#EE0033] hover:bg-[#D0002A] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#EE0033]/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 text-xs md:text-sm mt-6 cursor-pointer"
                    >
                      <span>Gửi yêu cầu tư vấn ngay</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>

                    <span className="text-[10px] text-neutral-400 text-center mt-4 leading-relaxed font-medium block">
                      Bằng việc đăng ký, bạn đồng ý với Chính sách Bảo vệ và Xử lý dữ liệu cá nhân của Viettel.
                    </span>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}
