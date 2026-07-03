'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, Database, Shield, Zap, RefreshCw, Check, ArrowRight,
  User, Mail, Phone, CheckCircle2, ChevronRight, ChevronDown, Lock,
  FileText, Cloud, Terminal, Cpu, Share2, Key
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';

export default function DataPlatformPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Viettel Cloud Database Service (vDBS)'
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
        solution: 'Viettel Cloud Database Service (vDBS)'
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
              NỀN TẢNG DỮ LIỆU & TÍCH HỢP · DATA PLATFORM & API
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Nền tảng dữ liệu lớn<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">Vận hành thông minh & Tích hợp mượt mà</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Cung cấp cơ sở dữ liệu được quản trị hoàn toàn (Database-as-a-Service), bộ nhớ đệm In-Memory hiệu năng cực cao và cổng quản lý API Gateway an toàn tối đa cho hệ thống Core và các ứng dụng doanh nghiệp lớn.
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
                Nhận tư vấn kỹ thuật
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY TAB NAVIGATION MENU */}
      <div className="sticky top-0 z-[1010] bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm transition-all duration-300">
        <div className="ali-container">
          <div className="flex items-center justify-between h-14 md:h-16">
            
            <div className="flex items-center gap-6 lg:gap-8 overflow-hidden h-full">
              <span className="text-sm md:text-base font-extrabold text-gray-950 tracking-tight shrink-0 flex items-center h-full border-r border-gray-200/60 pr-4 md:pr-6">
                Data & Integration
              </span>
              
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
                          layoutId="activePlatformTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE0033]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 h-full">
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
              Khai phóng tiềm năng từ dữ liệu doanh nghiệp
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Giải quyết bài toán thiết lập, quản trị dữ liệu phức tạp. Với các dịch vụ Managed Database và API Gateway của Viettel IDC, đội ngũ kỹ sư của bạn hoàn toàn rảnh tay để tập trung phát triển nghiệp vụ cốt lõi mà không lo lắng về hạ tầng, sao lưu hay tính tương thích.
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
                  <Database className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Tự động hoá quản lý DB</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Quản lý tự động chu trình sống cơ sở dữ liệu: sao lưu tuần hoàn định kỳ, cài đặt phần mềm, vá lỗi bảo mật khẩn cấp và nâng cấp tài nguyên chỉ trong vài giây.
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
                  <Zap className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">In-Memory Cache Siêu tốc</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Công nghệ lưu trữ dữ liệu dạng RAM Cache hỗ trợ giảm tải cho hệ thống cơ sở dữ liệu chính, rút ngắn tốc độ phản hồi API hệ thống về dạng mili-giây cực nhanh.
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
                  <Share2 className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Tích hợp & Quản trị API</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Cổng API Gateway hợp nhất kiểm soát lưu lượng gọi tích hợp (Rate-limiting), ngăn chặn tấn công DDoS API, mã hóa JWT an toàn và phân tích nhật ký lưu vết đầy đủ.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-[#EE0033] text-white py-12 md:py-16 font-sans">
        <div className="ali-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">99.99%</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">SLA cam kết dịch vụ DB</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">&lt; 2ms</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Độ trễ truy xuất cache</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">Multi-AZ</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Nhân bản đồng bộ dự phòng</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">100k+</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">API Requests/Giây tối đa</span>
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
              Sản phẩm Nền tảng Dữ liệu & Tích hợp
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Từ các cụm cơ sở dữ liệu quan hệ được quản lý toàn diện đến hệ thống cache phân tán và API Gateway chuyên sâu cho doanh nghiệp.
            </p>
          </motion.div>

          <div className="space-y-16 text-left">
            
            {/* GROUP 1: MANAGED DATABASES */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Managed Cloud Database (vDBS)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Managed Database (MySQL/PostgreSQL)',
                    badge: 'TIÊU CHUẨN',
                    desc: 'Cơ sở dữ liệu nguồn mở được quản trị hoàn chỉnh 100%, tự động backup, mở rộng phần cứng trực tuyến không gián đoạn dịch vụ.',
                    details: [
                      'Cấu hình đồng bộ dạng Master-Slave trong vài phút tăng tính sẵn sàng cao',
                      'Hệ thống tự động sao lưu tuần hoàn định kỳ lưu giữ tới 30 ngày an toàn',
                      'Giám sát các chỉ số hiệu năng IOPS, bộ nhớ, CPU trực quan trên dashboard'
                    ],
                    specs: [
                      { label: 'Uptime SLA', value: '✓ 99.99%' },
                      { label: 'Engine hỗ trợ', value: '⚡ MySQL, Postgres' }
                    ],
                    pricing: [
                      { planName: 'vDBS Dev-Small', specs: ['1 vCPU, 2GB RAM', '20GB SSD Enterprise', 'Thích hợp môi trường thử nghiệm'], price: '420.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'vDBS Production (Phổ biến)', specs: ['2 vCPU, 4GB RAM', '50GB SSD Enterprise', 'Tích hợp Master-Slave dự phòng'], price: '1.200.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Database
                  },
                  {
                    name: 'Viettel Managed SQL Server Enterprise',
                    badge: 'CHUYÊN SÂU',
                    desc: 'Phiên bản MS SQL Server chính hãng được tối ưu hạ tầng tối đa, cung cấp giải pháp AlwaysOn High Availability đỉnh cao cho Core App.',
                    details: [
                      'Trang bị bản quyền SQL Server Enterprise/Standard đầy đủ pháp lý',
                      'Hỗ trợ cấu hình Multi-AZ tự động chuyển mạch AlwaysOn tức thì',
                      'Tối ưu hóa tài nguyên phần cứng, ổ đĩa NVMe SSD siêu tốc độ'
                    ],
                    specs: [
                      { label: 'Độ sẵn sàng', value: '⚡ AlwaysOn HA' },
                      { label: 'Bản quyền', value: '✓ Microsoft Certified' }
                    ],
                    pricing: [
                      { planName: 'SQL Web Edition', specs: ['2 vCPU, 4GB RAM', '50GB SSD', 'Phù hợp Web App trung tâm'], price: '1.850.000', period: 'tháng', fType: 'F2 Semi' },
                      { planName: 'SQL Enterprise Business', specs: ['4 vCPU, 8GB RAM', '100GB SSD NVMe', 'AlwaysOn Active-Passive'], price: '4.500.000', period: 'tháng', isPopular: true, fType: 'F3 CRM' }
                    ],
                    icon: Cpu
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
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">DBS-0{idx+1}</span>
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

                        {/* Pricing Tiers */}
                        <div className="border-t border-gray-100 pt-4 space-y-3">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Gói cấu hình & Đơn giá</span>
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
                          Đăng ký tư vấn <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* GROUP 2: INTEGRATION & GATEWAY */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Cache & Tích hợp Middleware (Cache & Gateway)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Managed Redis Cache (vCache)',
                    badge: 'TỐC ĐỘ',
                    desc: 'Dịch vụ bộ nhớ đệm phân tán Redis/Memcached được quản trị an toàn trên đám mây, giúp giảm tải dữ liệu và tăng tốc độ tối đa cho ứng dụng.',
                    details: [
                      'Lưu trữ dữ liệu dạng Key-Value In-Memory trên RAM Enterprise siêu tốc',
                      'Hỗ trợ chế độ Redis Cluster phân tán, tự động Failover không mất cache',
                      'Mã hóa bảo vệ dữ liệu truyền tải SSL/TLS và bảo mật mật khẩu truy cập'
                    ],
                    specs: [
                      { label: 'Độ trễ truy xuất', value: '⚡ < 1ms' },
                      { label: 'Cluster Mode', value: '✓ Hỗ trợ' }
                    ],
                    pricing: [
                      { planName: 'vCache Basic', specs: ['1GB RAM Cache chuyên dụng', 'Băng thông rộng 1Gbps', 'Tương thích thư viện Redis tiêu chuẩn'], price: '290.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'vCache Cluster Enterprise', specs: ['4GB RAM (2 Nodes x 2GB Cluster)', 'Khả năng nạp chịu lỗi tự động', 'Tải xử lý cực kỳ bền bỉ'], price: '1.150.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Terminal
                  },
                  {
                    name: 'Viettel Enterprise API Gateway',
                    badge: 'TÍCH HỢP',
                    desc: 'Cổng quản lý API tập trung giúp doanh nghiệp kiểm soát lưu lượng gọi API, bảo vệ xác thực an toàn và lưu vết lịch sử gọi hệ thống.',
                    details: [
                      'Quản lý Rate-limiting thông minh ngăn chặn tràn ngập yêu cầu từ người dùng',
                      'Hỗ trợ các chuẩn xác thực phổ biến OAuth 2.0, API Key và JWT token',
                      'Dashboard phân tích dữ liệu trực quan về số lượng gọi API và lỗi hệ thống'
                    ],
                    specs: [
                      { label: 'Yêu cầu tối đa', value: '⚡ 100k+ req/sec' },
                      { label: 'Bảo vệ xác thực', value: '✓ JWT, OAuth2' }
                    ],
                    pricing: [
                      { planName: 'API Gateway Starter', specs: ['Đến 1.000 requests/phút', 'Hỗ trợ 5 API endpoints', 'Mã hóa kết nối SSL/TLS'], price: '500.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'API Gateway Professional', specs: ['Đến 10.000 requests/phút', 'Không giới hạn endpoints', 'Rate-limiting & ACL đầy đủ'], price: '2.200.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Share2
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
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">DBS-0{idx+3}</span>
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

                        {/* Pricing Tiers */}
                        <div className="border-t border-gray-100 pt-4 space-y-3">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Gói cấu hình & Đơn giá</span>
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
                          Đăng ký tư vấn <ChevronRight className="w-4 h-4" />
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
              Sức mạnh cốt lõi cho mọi giao dịch số
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Chúng tôi cung cấp hạ tầng dữ liệu đạt chuẩn khắt khe, an toàn thông tin tối đa và hỗ trợ giải pháp dịch vụ chuyên biệt cho thị trường Việt Nam.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">An toàn & Bảo mật cao</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tích hợp sẵn tường lửa cơ sở dữ liệu (DB Firewall), ngăn chặn hoàn toàn tấn công SQL Injection và rò rỉ dữ liệu thông qua cơ chế phân quyền thông minh IAM.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Tính sẵn sàng cao HA</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Cơ chế nhân bản dữ liệu tự động giữa các Trung tâm dữ liệu AZ độc lập (Multi-AZ replication) đảm bảo hệ thống không có điểm lỗi duy nhất (Single Point of Failure).
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Tối ưu hiệu năng I/O</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Sử dụng 100% ổ đĩa NVMe SSD Enterprise chuyên dụng kết hợp giải pháp bộ nhớ đệm vCache Redis giúp giảm tải hệ thống tới 85% trong giờ cao điểm.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Kỹ sư hỗ trợ 24/7/365</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Đội ngũ kỹ sư cơ sở dữ liệu (DBA) giàu kinh nghiệm trực tuyến 24/7 sẵn sàng hỗ trợ di chuyển dữ liệu (Migration) từ On-Premises lên đám mây hoàn toàn miễn phí.
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
              Đồng hành cùng sự tăng trưởng doanh số
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các mô hình ứng dụng thực tế giúp tối đa hóa hiệu quả hoạt động, ổn định lưu lượng và bảo mật tuyệt đối thông tin giao dịch của doanh nghiệp số.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Hạ tầng giao dịch cho ví điện tử & Fintech',
                desc: 'Kết hợp cơ sở dữ liệu quan hệ có độ tin cậy giao dịch ACID cao (PostgreSQL Multi-AZ) với cụm bộ nhớ đệm vCache Redis. Đảm bảo xử lý hàng nghìn giao dịch thanh toán đồng thời mỗi giây mà không xảy ra hiện tượng khóa bản ghi (Locking).'
              },
              {
                num: '02',
                title: 'Hợp nhất cổng API cho hệ thống ERP & SaaS',
                desc: 'Sử dụng Viettel API Gateway làm cổng kết nối hợp nhất bảo mật toàn bộ luồng tích hợp với bên thứ ba (Cổng thanh toán, Đơn vị vận chuyển). Áp dụng chính sách xác thực JWT token và phân luồng giới hạn requests để tránh nghẽn Core ERP.'
              },
              {
                num: '03',
                title: 'Quản lý lịch sử truy cập và hóa đơn điện tử',
                desc: 'Ứng dụng giải pháp vDBS tự động phân tách cơ sở dữ liệu: Master cho các hoạt động đọc ghi tức thì (Hot Data) và Slave Read-Only chuyên dụng phục vụ xuất báo cáo thống kê, truy vấn lịch sử hóa đơn (Cold Data) giúp tối ưu hóa tải cho DB chính.'
              },
              {
                num: '04',
                title: 'Microservices Communication',
                desc: 'Cung cấp cổng API Gateway kết hợp vCache làm trung gian trao đổi thông điệp, điều phối cuộc gọi API giữa các microservices bên trong cụm vK8s Kubernetes. Giúp đơn giản hóa kiến trúc mạng nội bộ và giám sát chi tiết lỗi nghiệp vụ.'
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
              Hỏi đáp dịch vụ Nền tảng dữ liệu
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các thông tin kỹ thuật hữu ích nhất giúp giải đáp nhanh chóng các vướng mắc của các lập trình viên và kiến trúc sư hệ thống.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {[
              {
                q: 'Viettel Managed Database (vDBS) hỗ trợ cơ chế sao lưu tự động (Automatic Backup) thế nào?',
                a: 'Hệ thống vDBS tự động thực hiện sao lưu toàn bộ (Full Backup) hàng ngày vào khung giờ thấp tải do khách hàng tự cấu hình, đồng thời lưu trữ log giao dịch liên tục. Chúng tôi cam kết lưu giữ các bản backup an toàn tại phân vùng lưu trữ S3 Object độc lập, cho phép khôi phục về bất kỳ thời điểm nào trong vòng 30 ngày qua (Point-in-Time Recovery).'
              },
              {
                q: 'Tôi có thể tự nâng cấp tài nguyên CPU/RAM/Dung lượng đĩa đệm của vDBS trực tuyến không?',
                a: 'Có. Bạn hoàn toàn có thể chủ động nâng cấp CPU, RAM hoặc nâng dung lượng ổ đĩa SSD Enterprise của database chỉ với 1 click từ dashboard điều khiển. Đối với mô hình High Availability Multi-AZ, quá trình nâng cấp sẽ được thực hiện tuần tự trên node phụ (Slave) trước, sau đó tự động failover để nâng cấp node chính (Master) giúp hệ thống hoạt động liên tục không gián đoạn.'
              },
              {
                q: 'Cổng API Gateway bảo vệ hệ thống Core doanh nghiệp như thế nào trước các cuộc tấn công spam?',
                a: 'API Gateway của Viettel IDC tích hợp thuật toán Token Bucket thông minh hỗ trợ thiết lập chính sách Rate-limiting linh hoạt: theo IP nguồn, theo JWT Token người dùng hoặc theo API Key. Khi số lượng requests vượt ngưỡng cho phép, hệ thống sẽ tự chặn và trả về mã lỗi 429 Too Many Requests tức thời, bảo vệ an toàn cho các ứng dụng Core phía sau không bị quá tải.'
              },
              {
                q: 'Việc bảo mật dữ liệu lưu giữ trên vCache Redis được thực hiện thế nào?',
                a: 'Mặc dù lưu trữ In-Memory ưu tiên tốc độ, vCache vẫn hỗ trợ mã hóa toàn diện dữ liệu truyền tải thông qua kết nối SSL/TLS. Đồng thời, hệ thống nằm hoàn toàn trong phân vùng mạng riêng ảo VPC của khách hàng, cô lập hoàn toàn khỏi mạng Internet công cộng và chỉ cho phép các máy chủ được chỉ định cụ thể truy cập qua ACL.'
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
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="font-extrabold text-sm md:text-base text-gray-950 tracking-tight pr-4">
                      {faq.q}
                    </span>
                    <span className={`shrink-0 p-1 rounded-full bg-gray-50 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-red-50 text-[#EE0033]' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-gray-500 border-t border-gray-100 leading-relaxed bg-gray-50/20">
                      {faq.a}
                    </div>
                  )}
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
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[#FF4D6D] font-bold text-xs uppercase tracking-widest block bg-[#FF4D6D]/10 px-3 py-1 rounded-full w-max">
                DÙNG THỬ MANAGED DATABASE MIỄN PHÍ
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Tối ưu hóa cấu trúc cơ sở dữ liệu của bạn ngay hôm nay
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Đội ngũ chuyên gia cơ sở dữ liệu (DBA) của Viettel IDC sẵn sàng khảo sát hiện trạng, tư vấn kiến trúc SQL/NoSQL tối ưu và lên kế hoạch di chuyển dữ liệu (Database Migration) không gián đoạn dịch vụ của bạn.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Miễn phí 100% công cụ và kỹ sư di chuyển cơ sở dữ liệu lên mây.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Tặng voucher dùng thử dịch vụ vDBS & vCache trị giá tới 5.000.000đ.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
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
                        Cảm ơn bạn đã quan tâm. Kỹ sư giải pháp Dữ liệu Viettel IDC sẽ liên hệ tư vấn trực tiếp trong vòng 15 phút.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="space-y-4 text-left">
                    <div className="text-center mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight">Đăng ký tư vấn giải pháp</h3>
                      <p className="text-xs text-neutral-500 mt-1.5">Kỹ sư Viettel IDC sẽ liên hệ tư vấn trong vòng 15 phút.</p>
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
                            <option value="Viettel Cloud Database Service (vDBS)">Viettel Cloud Database Service (vDBS)</option>
                            <option value="Viettel Enterprise Cache (vCache)">Viettel Enterprise Cache (vCache)</option>
                            <option value="Viettel Enterprise API Gateway">Viettel Enterprise API Gateway</option>
                            <option value="Tư vấn giải pháp thiết kế DB Cluster">Tư vấn giải pháp thiết kế DB Cluster</option>
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
                      <span>Gửi yêu cầu ngay</span>
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
    </div>
  );
}
