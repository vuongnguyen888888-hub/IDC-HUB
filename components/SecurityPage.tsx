'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Lock, Key, AlertTriangle, Eye, ShieldAlert, Check, ArrowRight,
  User, Mail, Phone, CheckCircle2, ChevronRight, ChevronDown, 
  Activity, Server, FileLock2, Radio, HeartPulse
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';

export default function SecurityPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Viettel Web Application Firewall (vWAF)'
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
        solution: 'Viettel Web Application Firewall (vWAF)'
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
              BẢO MẬT & AN NINH MẠNG · SECURITY & CYBERSECURITY
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Lá chắn thép bảo vệ<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">Dữ liệu toàn vẹn · Phòng vệ chủ động 24/7</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Hệ thống an ninh thông tin đa lớp tối tân tích hợp trí tuệ nhân tạo, ngăn chặn khống chế 100% tấn công DDoS, mã độc Ransomware tống tiền và giám sát liên tục vSOC bởi chuyên gia an ninh đầu ngành.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToSection('products')}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#EE0033] text-white font-bold text-sm tracking-wider rounded-full shadow-[0_4px_14px_rgba(238,0,51,0.4)] transition-all duration-300 hover:bg-[#FF1A4E] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_6px_20px_rgba(238,0,51,0.5)] focus:outline-none text-center cursor-pointer"
              >
                <span>Khám phá giải pháp bảo mật</span>
                <span className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center text-[8px] font-bold group-hover:border-white group-hover:scale-110 transition-all duration-300">
                  →
                </span>
              </button>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-3 bg-transparent border border-gray-400 hover:border-white text-gray-300 hover:text-white font-bold text-sm tracking-wider rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Yêu cầu Pentest/Audit
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
                Security Solutions
              </span>
              
              <div className="hidden md:flex items-center gap-5 lg:gap-7 h-full">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'products', label: 'Hệ sinh thái bảo mật' },
                  { id: 'comparison', label: 'Ưu thế phòng thủ' },
                  { id: 'use-cases', label: 'Kịch bản ứng dụng' },
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
                          layoutId="activeSecurityTabUnderline"
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
                Liên hệ khẩn cấp
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
              An toàn thông tin toàn diện đạt tiêu chuẩn quốc tế
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Trong kỷ nguyên số, dữ liệu là tài sản vô giá của mỗi doanh nghiệp. Giải pháp bảo mật của Viettel IDC hỗ trợ bảo vệ đa tầng từ máy trạm người dùng đến hạ tầng mạng ảo và máy chủ lưu trữ chính.
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
                  <ShieldAlert className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Tường lửa & Chống DDoS</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Ngăn chặn triệt để các hành vi dò quét, khai thác lỗ hổng bảo mật ứng dụng web và chống chịu các đợt tấn công từ chối dịch vụ DDoS quy mô băng thông cực đại.
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
                  <FileLock2 className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Kháng Ransomware & Mã độc</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Giải pháp bảo vệ điểm cuối (Endpoint Protection) ứng dụng trí tuệ nhân tạo phân tích hành vi bất thường, ngăn ngừa ghi đè mã hóa tống tiền Ransomware.
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
                  <Eye className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Giám sát An ninh vSOC 24/7</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Đội ngũ chuyên gia bảo mật hàng đầu Việt Nam túc trực, phân tích hành vi đe dọa hệ thống trong thời gian thực và xử lý ứng phó sự cố khẩn cấp.
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
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">100%</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Chặn đứng rủi ro OWASP Top 10</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">&gt; 1.5 Tbps</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Khả năng dập DDoS tại biên</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">&lt; 15 Phút</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Thời gian phản ứng ứng phó sự cố</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">24/7/365</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Kỹ sư SOC túc trực liên tục</span>
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
              Sản phẩm Bảo mật & An ninh mạng
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Giải pháp phòng vệ toàn diện tích hợp sâu an ninh đám mây từ biên mạng tới tận lớp lõi dữ liệu.
            </p>
          </motion.div>

          <div className="space-y-16 text-left">
            
            {/* GROUP 1: WEB SECURITY & DDOS */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Tường lửa ứng dụng & Chống DDoS biên (WAF & DDoS)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Web Application Firewall (vWAF)',
                    badge: 'BẢO VỆ WEB',
                    desc: 'Tường lửa bảo vệ ứng dụng Web thế hệ mới, liên tục cập nhật tập luật tự động ngăn chặn hoàn toàn các dạng khai thác OWASP Top 10.',
                    details: [
                      'Lọc bỏ lưu lượng độc hại, ngăn chặn tấn công SQL Injection, Cross-Site Scripting (XSS)',
                      'Tự động kiểm tra chất lượng chứng chỉ số SSL/TLS và mã hóa dữ liệu truyền tải',
                      'Hỗ trợ chế độ thiết lập tập luật tùy chỉnh (Custom Security Rules) linh hoạt tức thì'
                    ],
                    specs: [
                      { label: 'OWASP Protection', value: '⚡ Đầy đủ 100%' },
                      { label: 'Uptime SLA', value: '✓ 99.99%' }
                    ],
                    pricing: [
                      { planName: 'vWAF Starter', specs: ['Lưu lượng đến 50 Mbps', 'Bảo vệ tối đa 3 tên miền độc lập', 'Tập luật bảo vệ OWASP mặc định'], price: '1.200.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'vWAF Professional (Phổ biến)', specs: ['Lưu lượng đến 200 Mbps', 'Không giới hạn tên miền phụ', 'Tích hợp Custom Rules và Hỗ trợ 24/7'], price: '4.500.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Shield
                  },
                  {
                    name: 'Viettel Cloud Anti-DDoS',
                    badge: 'CHỐNG DDOS',
                    desc: 'Giải pháp làm sạch lưu lượng truyền dẫn đám mây bảo vệ tuyệt đối hệ thống trước các đợt tấn công từ chối dịch vụ DDoS cường độ khủng.',
                    details: [
                      'Khả năng dập tắt tấn công lũ lụt Layer 3, Layer 4 (SYN, UDP flood) siêu tốc độ',
                      'Hệ thống tự động phát hiện, chuyển hướng làm sạch lưu lượng không gây lag web',
                      'Báo cáo thống kê chi tiết địa chỉ IP nguồn tấn công và lưu lượng làm sạch'
                    ],
                    specs: [
                      { label: 'Sức chịu DDoS', value: '⚡ Đến 1.5 Tbps' },
                      { label: 'Phản ứng dập dịch', value: '✓ < 10 giây' }
                    ],
                    pricing: [
                      { planName: 'Anti-DDoS Standard', specs: ['Hỗ trợ chống đỡ Layer 3/4', 'Băng thông sạch 50 Mbps', 'Tự động kích hoạt khi có sự cố'], price: '2.500.000', period: 'tháng', fType: 'F2 Semi' },
                      { planName: 'Anti-DDoS Enterprise', specs: ['Hỗ trợ chống đỡ Layer 3/4 và Layer 7', 'Băng thông sạch 200 Mbps', 'Báo cáo nhật ký phân tích độc hại'], price: '8.900.000', period: 'tháng', isPopular: true, fType: 'F3 CRM' }
                    ],
                    icon: ShieldAlert
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
                          <span className="text-xs text-gray-400 font-mono">SEC-0{idx+1}</span>
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

            {/* GROUP 2: HOST SECURITY & SOC */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Bảo vệ điểm cuối & Giám sát vận hành SOC (Endpoint & SOC)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Managed Endpoint Security (EDR)',
                    badge: 'BẢO VỆ MÁY TRẠM',
                    desc: 'Giải pháp bảo vệ toàn diện hệ thống máy trạm và máy chủ doanh nghiệp trước virus, ransomware tống tiền bằng thuật toán AI phân tích hành vi nâng cao.',
                    details: [
                      'Ngăn chặn hành vi ghi đè dữ liệu bất hợp pháp của mã độc Ransomware',
                      'Cách ly khẩn cấp máy chủ bị nhiễm độc khỏi hệ thống mạng LAN nội bộ',
                      'Dashboard theo dõi tập trung mức độ an toàn của toàn bộ máy tính văn phòng'
                    ],
                    specs: [
                      { label: 'Ransomware Shield', value: '⚡ Chống 100%' },
                      { label: 'Phân tích AI', value: '✓ Hỗ trợ' }
                    ],
                    pricing: [
                      { planName: 'EDR Standard Pack', specs: ['Hỗ trợ tối đa 10 Nodes máy chủ/trạm', 'Bảo vệ cập nhật mẫu mã độc thời gian thực', 'Báo cáo bảo mật hàng tháng'], price: '590.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'EDR Enterprise Pack', specs: ['Hỗ trợ tới 50 Nodes máy chủ/trạm', 'Hệ thống AI phân tích hành vi sâu', 'Chế độ cách ly tự động khẩn cấp'], price: '2.400.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Server
                  },
                  {
                    name: 'Viettel Managed SOC (Security Operations Center)',
                    badge: 'GIÁM SÁT SOC',
                    desc: 'Dịch vụ ủy thác giám sát và điều hành an ninh thông tin mạng 24/7 từ xa bởi đội ngũ chuyên gia an ninh mạng Viettel Cyber Security.',
                    details: [
                      'Giám sát log ghi nhận sự kiện toàn diện (SIEM) bảo đảm an toàn toàn thời gian',
                      'Đội ngũ kỹ sư ứng cứu sự cố túc trực ứng phó trực tiếp tại doanh nghiệp',
                      'Hỗ trợ rà quét đánh giá lỗ hổng bảo mật hệ thống định kỳ (Vulnerability Assessment)'
                    ],
                    specs: [
                      { label: 'Giám sát trực tuyến', value: '⚡ 24/7/365' },
                      { label: 'Kỹ sư chuyên trách', value: '✓ Viettel Experts' }
                    ],
                    pricing: [
                      { planName: 'vSOC Light Monitor', specs: ['Giám sát tối đa 50 thiết bị mạng/server', 'Cảnh báo lỗ hổng qua Email/SMS tức thời', 'Hỗ trợ xử lý sự cố giờ hành chính'], price: '5.500.000', period: 'tháng', fType: 'F2 Semi' },
                      { planName: 'vSOC Premium Security', specs: ['Không giới hạn thiết bị giám sát', 'Kỹ sư ứng cứu trực tiếp 24/7 không quản ngày nghỉ', 'Pentest rà quét lỗ hổng mỗi quý'], price: '18.000.000', period: 'tháng', isPopular: true, fType: 'F3 CRM' }
                    ],
                    icon: Eye
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
                          <span className="text-xs text-gray-400 font-mono">SEC-0{idx+3}</span>
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
              Lá chắn an toàn chuyên nghiệp tiêu chuẩn Viettel
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Thừa hưởng kinh nghiệm phòng thủ, nghiên cứu mã độc đỉnh cao từ Công ty An ninh mạng Viettel (Viettel Cyber Security) bảo vệ tối đa các tổ chức tài chính lớn.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Kinh nghiệm chiến trường</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Đội ngũ chuyên gia an ninh mạng liên tục đạt các giải thưởng bảo mật quốc tế lớn (Pwn2Own), trực tiếp rà quét phòng chống hàng ngàn sự cố quy mô quốc gia.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Cam kết chủ động ứng phó</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Khi xuất hiện dấu hiệu tấn công hoặc mã hóa Ransomware, hệ thống tự động cách ly máy trạm và thông báo trực tiếp đến điện thoại quản trị viên dưới 5 phút.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Chứng chỉ bảo mật uy tín</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Đạt chứng chỉ quốc tế uy tín khắt khe ISO 27001 về Quản lý an toàn thông tin và tiêu chuẩn khắt khe PCI-DSS đáp ứng đầy đủ yêu cầu cho Core Banking ngân hàng.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Bảo vệ quyền truy cập IAM</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Quản lý phân quyền truy cập chặt chẽ Multi-Factor Authentication (MFA), loại bỏ hoàn toàn nguy cơ rò rỉ thông tin từ chính mật khẩu nội bộ.
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
              Phòng thủ chủ động trước mọi kịch bản phá hoại
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các mô hình thực tế giúp bảo vệ dòng tiền, uy tín thương hiệu và tránh thất thoát cơ sở dữ liệu quan trọng của doanh nghiệp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Bảo vệ Cổng thanh toán trực tiếp của Doanh nghiệp',
                desc: 'Thiết lập vWAF chắn trước hệ thống website thanh toán hóa đơn. Hệ thống lọc và chặn đứng toàn bộ các requests nạp tham số độc hại nhằm mục tiêu thay đổi giá trị hóa đơn, khai thác SQL injection chiếm đoạt tiền.'
              },
              {
                num: '02',
                title: 'Chống tấn công DDoS sập web trong chiến dịch ra mắt',
                desc: 'Khi đối thủ sử dụng botnet khổng lồ dập sập website trong giờ vàng bán hàng. Hệ thống Anti-DDoS Cloud tự động chuyển hướng lưu lượng truy cập qua phễu làm sạch tại node biên, loại bỏ requests ảo giữ web chạy mượt.'
              },
              {
                num: '03',
                title: 'Phòng ngừa Ransomware khóa mã hóa máy chủ File Server',
                desc: 'Cài đặt EDR trên tất cả các server nội bộ. Khi nhân viên vô tình bấm file chứa mã độc ransomware trong email, EDR lập tức phát hiện hành vi ghi đè file hàng loạt, tự động khóa tiến trình độc và ngắt mạng cô lập server.'
              },
              {
                num: '04',
                title: 'Đăng ký Audit & Rà quét lỗ hổng tuân thủ bảo mật',
                desc: 'Thực hiện Pentest (kiểm thử xâm nhập giả lập) định kỳ kết hợp giải pháp SOC giám sát liên tục để lập báo cáo đánh giá an ninh mạng đáp ứng yêu cầu kiểm toán hàng năm của nhà nước và đối tác nước ngoài.'
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
              Hỏi đáp dịch vụ An ninh mạng
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các thông tin hỗ trợ kỹ thuật về phòng chống tấn công, cài đặt tường lửa và tuân thủ các quy định bảo mật quốc gia.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {[
              {
                q: 'Tường lửa vWAF của Viettel IDC có làm tăng độ trễ tải trang web của tôi không?',
                a: 'Không đáng kể. Hệ thống vWAF được triển khai trên hạ tầng phần cứng xử lý song song chuyên dụng cực mạnh đặt trực tiếp tại các trung tâm dữ liệu chuẩn Rated 3 của Viettel. Độ trễ lọc phân tích gói tin chỉ dao động dưới 1.5ms, hoàn toàn không gây ảnh hưởng tới trải nghiệm người dùng cuối.'
              },
              {
                q: 'Sự khác biệt cốt lõi giữa EDR (Endpoint Detection Response) và phần mềm diệt virus thông thường là gì?',
                a: 'Phần mềm diệt virus truyền thống chỉ hoạt động dựa trên cơ sở dữ liệu mẫu virus đã biết (Signature-based). EDR của Viettel IDC ứng dụng AI phân tích hành vi thời gian thực, có khả năng ngăn chặn cả các cuộc tấn công chưa từng có trong lịch sử (Zero-day attack) thông qua phân tích luồng tiến trình chạy ngầm bất thường.'
              },
              {
                q: 'vSOC có thể tích hợp giám sát các hệ thống máy chủ vật lý đặt tại On-Premises của chúng tôi không?',
                a: 'Hoàn toàn được. vSOC sử dụng các bộ thu thập logs thông tin (Log Collectors) gọn nhẹ cài đặt trực tiếp tại hệ thống mạng của bạn. Dữ liệu logs được mã hóa an toàn truyền về trung tâm SIEM của Viettel để giám sát tập trung toàn bộ hạ tầng Hybrid Cloud của doanh nghiệp.'
              },
              {
                q: 'Quy trình ứng cứu xử cố khẩn cấp của Viettel IDC hoạt động thế nào khi doanh nghiệp bị tấn công?',
                a: 'Khi hệ thống phát hiện có đòn tấn công mạng quy mô lớn vượt ngưỡng kiểm soát tự động, cảnh báo đỏ P0 lập tức được kích hoạt. Đội ngũ kỹ sư phản ứng nhanh của Viettel Cyber Security sẽ tham gia xử lý trực tuyến dưới 15 phút, cô lập dập dịch và đồng hành khôi phục dữ liệu hoạt động bình thường.'
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
                QUÉT QUÉT LỖ HỔNG BẢO MẬT MIỄN PHÍ
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Chủ động bảo vệ hệ thống trước khi quá muộn
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Đội ngũ chuyên gia bảo mật hàng đầu Viettel IDC sẵn sàng đồng hành khảo sát đánh giá lỗ hổng bảo mật bên ngoài miễn phí và tư vấn mô hình an toàn thông tin tối ưu nhất.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Tặng gói rà quét lỗ hổng bảo mật (Vulnerability Assessment) miễn phí lần đầu.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Tặng voucher dùng thử 30 ngày trải nghiệm vWAF Premium & EDR.</p>
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
                        Cảm ơn bạn đã quan tâm. Chuyên gia Bảo mật Viettel IDC sẽ liên hệ tư vấn trực tiếp trong vòng 15 phút.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="space-y-4 text-left">
                    <div className="text-center mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight">Đăng ký tư vấn bảo mật</h3>
                      <p className="text-xs text-neutral-500 mt-1.5">Chuyên gia Viettel IDC sẽ liên hệ tư vấn trong vòng 15 phút.</p>
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
                            <option value="Viettel Web Application Firewall (vWAF)">Viettel Web Application Firewall (vWAF)</option>
                            <option value="Viettel Cloud Anti-DDoS">Viettel Cloud Anti-DDoS</option>
                            <option value="Viettel Managed Endpoint Security (EDR)">Viettel Managed Endpoint Security (EDR)</option>
                            <option value="Viettel Managed SOC (vSOC)">Viettel Managed SOC (vSOC)</option>
                            <option value="Rà quét lỗ hổng bảo mật & Pentest">Rà quét lỗ hổng bảo mật & Pentest</option>
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
