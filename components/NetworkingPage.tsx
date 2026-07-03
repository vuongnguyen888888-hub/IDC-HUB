'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Radio, Shield, Zap, RefreshCw, Check, ArrowRight,
  User, Mail, Phone, CheckCircle2, ChevronRight, ChevronDown, Lock,
  Cloud, Terminal, Cpu, Share2, Activity, Network
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';

export default function NetworkingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Viettel CDN (Content Delivery Network)'
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
        solution: 'Viettel CDN (Content Delivery Network)'
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
              MẠNG & PHÂN PHỐI NỘI DUNG · NETWORK & CDN
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Mạng tốc độ cực đỉnh<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">Phân truyền toàn quốc · Kết nối siêu xa lộ</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Cung cấp xa lộ thông tin siêu tốc kết nối trực tiếp đa đám mây (Direct Connect), định tuyến mạng ảo VPC thông minh bảo mật tối đa và mạng phân truyền CDN thế hệ mới phủ sóng rộng 63 tỉnh thành Việt Nam.
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
                Network & CDN
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
                          layoutId="activeNetworkTabUnderline"
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
              Mạng truyền tải dữ liệu thế hệ mới tốc độ cực cao
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Tối ưu hóa hành trình trải nghiệm người dùng cuối bằng cách loại bỏ độ trễ mạng, thiết lập kết nối an toàn bảo mật cao và tận dụng băng thông trực tiếp trong nước siêu rộng của tập đoàn Viettel.
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
                  <Globe className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Tốc độ truyền tải vượt trội</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Với cụm máy chủ đệm (Edge Cache) rộng khắp cả nước, dữ liệu tĩnh, hình ảnh, video tải trực tiếp từ máy chủ gần nhất với người dùng giúp tốc độ phản hồi cực kỳ tức thì.
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
                  <Network className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Kết nối đa đám mây</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Thiết lập đường truyền cáp quang dùng riêng (Leased Line) kết nối trực tiếp hệ thống On-Premises hoặc đám mây trong nước đến các nhà cung cấp đám mây quốc tế lớn.
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
                <h3 className="text-lg font-bold text-gray-950 mb-3">Phân luồng & Bảo mật mạng</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Quản lý cách ly luồng dữ liệu an toàn thông qua Virtual Private Cloud (VPC), chống tấn công từ chối dịch vụ (DDoS) mạng và quản lý định tuyến VPN linh hoạt.
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
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">&gt; 12 Tbps</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Tổng dung lượng hạ tầng CDN</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">&lt; 5ms</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Độ trễ trung bình Edge Node</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">100 Gbps</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Băng thông kết nối Direct Cloud</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">63 Tỉnh</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Diện bao phủ Edge cache tại VN</span>
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
              Giải pháp Mạng & Phân truyền Nội dung
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các hạ tầng siêu kết nối được đầu tư bài bản và quản trị chuyên nghiệp bởi tập đoàn viễn thông hàng đầu Việt Nam.
            </p>
          </motion.div>

          <div className="space-y-16 text-left">
            
            {/* GROUP 1: CDN & WEB ACCELERATION */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Phân truyền nội dung & Tăng tốc Web (CDN)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Content Delivery Network (CDN)',
                    badge: 'TỐC ĐỘ',
                    desc: 'Mạng lưới máy chủ Edge Cache phủ khắp Việt Nam giúp phân truyền hình ảnh, file cài đặt, trang tĩnh và nội dung đa phương tiện tức thì.',
                    details: [
                      'Lưu trữ đệm đĩa NVMe siêu tốc, đáp ứng lượng truy cập đồng thời lên tới hàng triệu người dùng',
                      'Hỗ trợ công nghệ bảo mật SSL/TLS miễn phí, kiểm soát truy xuất dạng token an toàn',
                      'Rút ngắn thời gian phản hồi máy chủ gốc (Origin Server) giảm tải hạ tầng tới 90%'
                    ],
                    specs: [
                      { label: 'Dung lượng Edge', value: '⚡ 12+ Tbps' },
                      { label: 'Bao phủ', value: '✓ 63 Tỉnh Thành' }
                    ],
                    pricing: [
                      { planName: 'CDN Starter 1TB', specs: ['1 TB Băng thông quốc nội', 'Truy vấn không giới hạn', 'Dashboard giám sát thời gian thực'], price: '690.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'CDN Enterprise 10TB', specs: ['10 TB Băng thông quốc nội', 'Bao gồm hỗ trợ cấu hình TLS chuyên dụng', 'Cam kết Uptime SLA 99.9%'], price: '5.200.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Globe
                  },
                  {
                    name: 'Viettel Video Streaming Cloud',
                    badge: 'TRUYỀN THÔNG',
                    desc: 'Giải pháp nén, chuyển mã video trực tuyến thời gian thực và truyền tải chất lượng Ultra-HD 4K mượt mà nhất trên mọi thiết bị di động.',
                    details: [
                      'Tự động tối ưu luồng video theo tốc độ băng thông người dùng (Adaptive Bitrate)',
                      'Độ trễ truyền tải phát sóng trực tuyến (Live Streaming) cực thấp dưới 3 giây',
                      'Mã hóa luồng dữ liệu DRM chống sao chép và tải lậu video bản quyền'
                    ],
                    specs: [
                      { label: 'Độ phân giải', value: '⚡ Tới 4K Ultra-HD' },
                      { label: 'Độ trễ live', value: '✓ < 3 giây' }
                    ],
                    pricing: [
                      { planName: 'Streaming Basic', specs: ['100 giờ live stream', 'Chuyển mã tối đa HD 720p', 'Tích hợp web player mặc định'], price: '1.900.000', period: 'tháng', fType: 'F2 Semi' },
                      { planName: 'Streaming Pro Max', specs: ['500 giờ live stream', 'Chuyển mã 4K Ultra-HD', 'Tích hợp DRM bản quyền cao cấp'], price: '7.800.000', period: 'tháng', isPopular: true, fType: 'F3 CRM' }
                    ],
                    icon: Radio
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
                          <span className="text-xs text-gray-400 font-mono">NET-0{idx+1}</span>
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

            {/* GROUP 2: CONNECTIVITY & HYBRID CLOUD */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Kết nối trực tiếp & Mạng riêng ảo (Hybrid Network)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Cloud Connect',
                    badge: 'KẾT NỐI',
                    desc: 'Giải pháp đường truyền cáp quang Leased Line dành riêng kết nối trực tiếp từ Data Center vật lý của khách hàng đến các đám mây công cộng bảo mật nhất.',
                    details: [
                      'Sử dụng các kênh truyền cáp dùng riêng không đi qua Internet công cộng',
                      'Kết nối trực tiếp tốc độ cực nhanh đến Amazon Web Services, Microsoft Azure và Google Cloud',
                      'Hỗ trợ băng thông kết nối linh hoạt tùy biến co giãn từ 10 Mbps đến 100 Gbps'
                    ],
                    specs: [
                      { label: 'Uptime kênh truyền', value: '⚡ 99.99%' },
                      { label: 'Tốc độ cực đại', value: '✓ 100 Gbps' }
                    ],
                    pricing: [
                      { planName: 'Connect Core 50M', specs: ['Băng thông riêng 50 Mbps', 'Mã hóa định tuyến bảo vệ', 'Kết nối trực tiếp tới AZ trong nước'], price: '3.500.000', period: 'tháng', fType: 'F2 Semi' },
                      { planName: 'Connect Global Pro (Phổ biến)', specs: ['Băng thông riêng 200 Mbps', 'Kênh truyền kết nối quốc tế AWS/GCP', 'SLA cam kết kỹ thuật 24/7'], price: '12.800.000', period: 'tháng', isPopular: true, fType: 'F3 CRM' }
                    ],
                    icon: Network
                  },
                  {
                    name: 'Viettel Virtual Private Cloud (VPC)',
                    badge: 'BẢO MẬT',
                    desc: 'Thiết lập hạ tầng mạng riêng ảo cô lập hoàn toàn trên đám mây của Viettel IDC, tự cấu hình dải IP, phân mạng con và kiểm soát tường lửa.',
                    details: [
                      'Tự do định cấu hình định tuyến tĩnh, thiết lập VPN Site-to-Site mã hóa bảo mật cao',
                      'Tích hợp sẵn bộ cân bằng tải ứng dụng thông minh (Application Load Balancer)',
                      'Quản lý chặt chẽ lưu lượng truy xuất cổng Internet thông qua NAT Gateway an toàn'
                    ],
                    specs: [
                      { label: 'NAT Gateway', value: '⚡ Hỗ trợ' },
                      { label: 'Cân bằng tải', value: '✓ Load Balancer' }
                    ],
                    pricing: [
                      { planName: 'VPC Starter Pack', specs: ['Hỗ trợ 5 mạng con Subnets', '1 NAT Gateway', 'Tự cấu hình Security Group'], price: '450.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'VPC Enterprise Network', specs: ['Không giới hạn Subnets', 'High-Speed NAT Gateway', 'Tích hợp IPSec VPN Gateway'], price: '1.950.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
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
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">NET-0{idx+3}</span>
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
              Sức mạnh hạ tầng cáp viễn thông huyết mạch
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Chúng tôi sở hữu và làm chủ 100% trục đường cáp quang kết nối từ trong nước ra quốc tế, đảm bảo an ninh thông tin tuyệt đối cho doanh nghiệp bạn.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Hạ tầng cáp quang tự chủ</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tận dụng thế mạnh của Tập đoàn Viettel về cáp quang trục biển và đất liền, cam kết không phụ thuộc vào đường truyền trung gian bên thứ ba.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Cân bằng tải tải cao</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tự động phân phối tải lượng truy cập, dự phòng định tuyến đa kênh bảo đảm đường truyền luôn thông suốt kể cả khi có đứt cáp biển quốc tế.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Tối ưu hóa SEO & Bounce Rate</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Rút ngắn thời gian Time-To-First-Byte (TTFB) giúp website doanh nghiệp đạt điểm số tối ưu tối đa trên công cụ tìm kiếm Google Core Web Vitals.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Peering Trực Tiếp Toàn Cầu</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tích hợp liên minh kết nối Peering trực tiếp với các hãng công nghệ lớn: Google, Facebook, Microsoft, Netflix bảo đảm trải nghiệm dịch vụ tốc độ nhanh nhất.
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
              Sẵn sàng cho các siêu chiến dịch lưu lượng lớn
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Từ các chiến dịch khuyến mại bán lẻ trực tuyến đến các nền tảng phát sóng trực tiếp, chúng tôi giữ vững đường truyền luôn hoạt động mượt mà nhất.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Tăng tốc tải trang Thương mại điện tử (E-commerce)',
                desc: 'Tận dụng Viettel CDN phân truyền tức thì toàn bộ ảnh sản phẩm tĩnh, CSS/JS xuống các node cache địa phương gần người mua nhất. Đảm bảo trang web tải dưới 1.5 giây trong dịp săn sale lớn, giảm tỷ lệ bỏ giỏ hàng.'
              },
              {
                num: '02',
                title: 'Mạng liên kết đa văn phòng Hybrid Cloud',
                desc: 'Tích hợp kết nối mạng Leased Line từ trụ sở chính của doanh nghiệp đến hạ tầng Viettel VPC thông qua VPN Site-to-Site mã hóa IPSec. Giúp chia sẻ dữ liệu nhân sự nội bộ bảo mật, an toàn tuyệt đối khỏi hacker.'
              },
              {
                num: '03',
                title: 'Hạ tầng Streaming & Tổ chức Hội thảo trực tuyến',
                desc: 'Sử dụng Video Streaming Cloud để truyền trực tiếp các sự kiện ra mắt sản phẩm hoặc cuộc họp cổ đông lớn của tập đoàn với số lượng người xem đồng thời lên tới hàng vạn tài khoản, chất lượng hình ảnh HD ổn định cực kỳ.'
              },
              {
                num: '04',
                title: 'Phát hành File Game & Bản cập nhật phần mềm lớn',
                desc: 'Phân phối tải lượng tải file dung lượng lớn (GigaBytes) qua hệ thống CDN diện rộng. Hệ thống tự động chia nhỏ tệp tin và lưu trữ đệm tối ưu để hàng triệu thiết bị cùng tải xuống đồng thời mà không bị ngắt quãng giữa chừng.'
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
              Hỏi đáp dịch vụ Mạng & Phân truyền
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các giải đáp nhanh chóng về mặt kỹ thuật giúp doanh nghiệp tối ưu hóa chi phí băng thông và thiết lập hạ tầng mạng hiệu quả.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {[
              {
                q: 'Hệ thống CDN của Viettel IDC hỗ trợ bảo vệ website chống tấn công DDoS cơ bản thế nào?',
                a: 'Viettel CDN tích hợp sẵn bộ lọc lưu lượng (Traffic scrubbing) tại các node biên, tự động lọc bỏ các requests độc hại, tấn công dạng HTTP Flood, Slowloris và bảo vệ website gốc ở tầng 3 và tầng 4 trước các cuộc tấn công từ chối dịch vụ quy mô lớn.'
              },
              {
                q: 'Lợi ích của việc sử dụng Viettel Cloud Connect so với kết nối VPN qua mạng Internet công cộng?',
                a: 'Đường truyền qua Internet công cộng có độ trễ dao động lớn và dễ bị ảnh hưởng bởi đứt cáp quang biển. Viettel Cloud Connect sử dụng đường truyền riêng vật lý cô lập nên cam kết độ trễ cực thấp ổn định dưới 1ms trong nước, băng thông cam kết 100% không bị bóp và không lo lắng việc rò rỉ dữ liệu trên mạng công cộng.'
              },
              {
                q: 'Tôi có thể thiết lập cấu hình định tuyến thông minh DNS trên hệ thống không?',
                a: 'Có, hệ thống hỗ trợ tích hợp Geo-DNS thông minh, tự động phân tích IP người dùng cuối để định tuyến yêu cầu truy cập đến node cache CDN gần nhất hoặc cụm máy chủ gốc trong khu vực địa lý tương ứng để tối ưu hóa thời gian tải trang.'
              },
              {
                q: 'Băng thông CDN được tính phí như thế nào sau khi dùng hết gói cố định?',
                a: 'Khi vượt quá dung lượng gói băng thông hàng tháng đã đăng ký, hệ thống sẽ tự động chuyển sang hình thức thanh toán theo lưu lượng thực tế phát sinh thêm (Pay-as-you-go) với mức đơn giá ưu đãi được quy định rõ trong hợp đồng, đảm bảo dịch vụ không bị ngắt đột ngột.'
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
                BĂNG THÔNG CDN MIỄN PHÍ DÙNG THỬ
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Đẩy nhanh trải nghiệm số của khách hàng ngay hôm nay
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Đội ngũ kỹ sư mạng (Network Experts) của Viettel IDC sẵn sàng đồng hành khảo sát cấu trúc hệ thống, cài đặt và tối ưu hóa hệ thống lưu trữ cache hoàn toàn miễn phí.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Tặng miễn phí gói dùng thử 500GB băng thông rộng CDN quốc nội.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Khảo sát và tư vấn mô hình định tuyến VPC và kết nối cáp quang trực tiếp miễn phí.</p>
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
                        Cảm ơn bạn đã quan tâm. Kỹ sư hạ tầng Mạng Viettel IDC sẽ liên hệ tư vấn trực tiếp trong vòng 15 phút.
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
                        <label className="block text-xs font-bold text-neutral-700">Giải pháp mạng cần tư vấn</label>
                        <div className="relative">
                          <select 
                            value={ctaForm.solution}
                            onChange={(e) => setCtaForm({...ctaForm, solution: e.target.value})}
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] appearance-none font-medium transition-all"
                          >
                            <option value="Viettel CDN (Content Delivery Network)">Viettel CDN (Content Delivery Network)</option>
                            <option value="Viettel Video Streaming Cloud">Viettel Video Streaming Cloud</option>
                            <option value="Viettel Cloud Connect">Viettel Cloud Connect</option>
                            <option value="Viettel Virtual Private Cloud (VPC)">Viettel Virtual Private Cloud (VPC)</option>
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
