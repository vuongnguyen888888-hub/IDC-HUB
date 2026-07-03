'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, Eye, Terminal, Key, Shield, RefreshCw, Check, ArrowRight,
  User, Mail, Phone, CheckCircle2, ChevronRight, ChevronDown, Lock,
  Cloud, Cpu, Share2, BarChart3, Bell, Settings2
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';

export default function CloudOperationsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Viettel Cloud Watch (vWatch)'
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
        solution: 'Viettel Cloud Watch (vWatch)'
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
              VẬN HÀNH & GIÁM SÁT ĐÁM MÂY · CLOUD OPERATIONS
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Quản trị hợp nhất<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">Giám sát trực quan · Tối ưu hóa chi phí</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Cung cấp cổng điều khiển hợp nhất đa đám mây (Multi-Cloud CMP), hệ thống giám sát hạ tầng thời gian thực tự động cảnh báo sự cố khẩn cấp và công cụ phân tích sâu hiệu năng ứng dụng (APM).
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
                Yêu cầu demo quản trị CMP
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
                Cloud Operations
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
                          layoutId="activeOperationsTabUnderline"
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
                Nhận tư vấn
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
              Kiểm soát tuyệt đối tài nguyên đám mây toàn diện
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Giải quyết bài toán phân mảnh tài nguyên, khó kiểm soát chi phí hóa đơn và thiếu cơ chế cảnh báo tự động khi gặp sự cố thắt nút cổ chai hệ thống đám mây lai Hybrid Cloud.
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
                  <BarChart3 className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Giám sát hạ tầng 360°</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Thu thập và hiển thị trực quan mọi thông số hoạt động của máy chủ ảo, bộ nhớ đĩa cứng, băng thông luồng truyền dẫn thời gian thực với độ chính xác cực cao.
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
                  <Bell className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Cảnh báo đa kênh thông minh</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Thiết lập tự động các ngưỡng cảnh báo tài nguyên tùy biến và nhận thông tin cảnh báo tức thời qua các kênh phổ biến: Email, SMS và ứng dụng Telegram.
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
                  <Settings2 className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">CMP Đa Đám Mây Độc lập</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Cổng hợp nhất quản trị tài nguyên đặt tại AWS, Azure, Google Cloud và Viettel Cloud trên một màn hình dashboard duy nhất, tối ưu hóa tới 35% chi phí.
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
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">10 Giây</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Tần suất lấy mẫu giám sát tối đa</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">35%</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Tiết kiệm chi phí Multi-Cloud trung bình</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">&lt; 3 Giây</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Tốc độ gửi tin nhắn cảnh báo đỏ</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">Single Pane</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Hợp nhất quản trị đa đám mây</span>
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
              Sản phẩm Vận hành & Giám sát thông minh
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các công cụ quản trị cấp cao giúp đội ngũ vận hành hệ thống Dev, Ops kiểm soát hoàn hảo tính ổn định của hệ thống.
            </p>
          </motion.div>

          <div className="space-y-16 text-left">
            
            {/* GROUP 1: INFRASTRUCTURE MONITORING */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Giám sát hạ tầng & Cảnh báo đỏ (Monitoring & Alarm)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Cloud Watch (vWatch)',
                    badge: 'GIÁM SÁT HẠ TẦNG',
                    desc: 'Dịch vụ thu thập thông số hoạt động của máy chủ ảo ảo hóa tự động. Cung cấp bảng điều khiển trực quan và thiết lập báo động thông minh.',
                    details: [
                      'Lấy mẫu đo lường CPU, RAM, IOPS đĩa cứng, Lưu lượng mạng ra vào',
                      'Cài đặt các ngưỡng cảnh báo linh hoạt (Ví dụ: CPU > 85% trong 5 phút)',
                      'Tích hợp gửi cảnh báo khẩn cấp tức thời đến Email, Telegram và SMS điện thoại'
                    ],
                    specs: [
                      { label: 'Tần suất đo', value: '⚡ Đến 10 giây/lần' },
                      { label: 'Cảnh báo SMS', value: '✓ Hỗ trợ trực tiếp' }
                    ],
                    pricing: [
                      { planName: 'vWatch Starter Free', specs: ['Lấy mẫu đo 5 phút/lần', 'Hỗ trợ tối đa 5 máy chủ ảo', 'Cảnh báo qua Email mặc định'], price: '0', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'vWatch Enterprise Pro (Phổ biến)', specs: ['Lấy mẫu đo 1 phút/lần', 'Không giới hạn máy chủ ảo', 'Cảnh báo Email, Telegram và 50 tin SMS'], price: '350.000', period: 'tháng', isPopular: true, fType: 'F1 Auto' }
                    ],
                    icon: Activity
                  },
                  {
                    name: 'Viettel Application Performance Monitoring (vAPM)',
                    badge: 'PHÂN TÍCH HIỆU NĂNG',
                    desc: 'Giải pháp giám sát hiệu năng ứng dụng cấp cao, giúp truy vết lỗi code, thắt nút cổ chai hiệu năng của database hoặc API.',
                    details: [
                      'Phân tích chi tiết hành trình phản hồi request từ frontend đến backend',
                      'Truy vết các câu truy vấn cơ sở dữ liệu bị chậm trễ kéo dài (Slow Queries)',
                      'Tự động lập bản đồ cấu trúc liên kết các microservices của hệ thống'
                    ],
                    specs: [
                      { label: 'Truy vết mã nguồn', value: '⚡ PHP, Java, Node, Go' },
                      { label: 'Bản đồ kiến trúc', value: '✓ Tự động vẽ' }
                    ],
                    pricing: [
                      { planName: 'vAPM Light Monitor', specs: ['Lưu trữ logs truy vết 3 ngày', 'Giám sát tối đa 2 ứng dụng độc lập', 'Phân tích lỗi API cơ bản'], price: '950.000', period: 'tháng', fType: 'F2 Semi' },
                      { planName: 'vAPM Professional Max', specs: ['Lưu trữ logs truy vết 15 ngày', 'Không giới hạn số lượng ứng dụng', 'Phân tích SQL Slow query chi tiết'], price: '3.200.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: BarChart3
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
                          <span className="text-xs text-gray-400 font-mono">OPS-0{idx+1}</span>
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

            {/* GROUP 2: MULTI-CLOUD CMP */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Hợp nhất quản trị đa đám mây (Multi-Cloud Console)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Multi-Cloud Management Platform (vCMP)',
                    badge: 'QUẢN TRỊ ĐA ĐÁM MÂY',
                    desc: 'Cổng thông tin quản trị hợp nhất toàn diện, cho phép kết nối điều hành tài nguyên chạy trên Viettel Cloud, AWS, GCP và Microsoft Azure.',
                    details: [
                      'Quản lý vòng đời khởi tạo, co giãn, xóa tài nguyên của nhiều nhà cung cấp đám mây',
                      'Hợp nhất báo cáo hóa đơn chi tiết tài chính giúp doanh nghiệp kiểm soát ngân sách dễ dàng',
                      'Thuật toán thông minh tự động gợi ý tắt bỏ máy chủ ảo lãng phí không sử dụng'
                    ],
                    specs: [
                      { label: 'Hỗ trợ kết nối', value: '⚡ AWS, Azure, GCP, VT' },
                      { label: 'Tối ưu hóa chi phí', value: '✓ Lên tới 35%' }
                    ],
                    pricing: [
                      { planName: 'vCMP Starter Multi', specs: ['Kết nối tối đa 2 Cloud accounts', 'Báo cáo hóa đơn chi phí cơ bản', 'Hỗ trợ thiết lập lịch tắt máy tự động'], price: '1.500.000', period: 'tháng', fType: 'F2 Semi' },
                      { planName: 'vCMP Enterprise (Phổ biến)', specs: ['Không giới hạn số tài khoản Cloud', 'Hệ gợi ý tối ưu chi phí thông minh AI', 'Phân tích chi phí chuyên sâu cho từng team'], price: '5.800.000', period: 'tháng', isPopular: true, fType: 'F3 CRM' }
                    ],
                    icon: Cloud
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
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between md:col-span-2 max-w-2xl mx-auto w-full"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">OPS-03</span>
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
              Làm chủ mọi thông số vận hành đám mây lai
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Giải pháp vận hành của chúng tôi được thiết kế tối ưu, giúp đơn giản hóa quy trình giám sát hệ thống DevOps và tiết kiệm chi tiêu tài nguyên tối đa cho doanh nghiệp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Trực quan hóa thời gian thực</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Biểu đồ đo lường chi tiết hiển thị trực tiếp theo giây các thông số tải lượng phần cứng giúp bạn dễ dàng đưa ra quyết định co giãn (Scaling) tài nguyên.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Cảnh báo khẩn cấp tức thời</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Khi máy chủ gặp sự cố quá tải, hệ thống tự động gọi/gửi SMS cảnh báo đến số điện thoại của quản trị viên dưới 3 giây để nhanh chóng can thiệp xử lý.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Settings2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Tối ưu hóa chi phí AI</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Thuật toán thông minh liên tục theo dõi tải lượng sử dụng máy chủ ảo, tự động khuyến nghị hạ cấp hoặc tắt bớt các cụm tài nguyên lãng phí.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Hỗ trợ thiết lập tự động hóa</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Dễ dàng tích hợp với các bộ công cụ CI/CD (Jenkins, GitLab CI) và phần mềm điều phối hạ tầng (Terraform, Ansible) thông qua các API mở đầy đủ tài liệu.
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
              Luôn kiểm soát được hiệu năng hệ thống của doanh nghiệp
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các kịch bản ứng dụng thực tế giúp đơn giản hóa quy trình DevOps, ổn định luồng hoạt động ứng dụng số.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Giám sát sự cố quá tải RAM/CPU máy chủ Core',
                desc: 'Thiết lập quy trình đo vWatch lấy mẫu 10 giây/lần. Khi CPU của máy chủ cơ sở dữ liệu chính vượt quá 90% liên tục trong 3 phút, hệ thống tự động bắn cảnh báo khẩn cấp Telegram để kỹ sư kịp thời nạp thêm tài nguyên.'
              },
              {
                num: '02',
                title: 'Kiểm soát chi phí hạ tầng Multi-Cloud của Startup',
                desc: 'Kết nối tài nguyên chạy trên AWS và Viettel Cloud qua cổng vCMP. Hệ thống tự động vẽ biểu đồ phân tích chi tiêu chi tiết từng phòng ban, giúp loại bỏ các tài nguyên thử nghiệm quên tắt, tiết kiệm tới 30% ngân sách.'
              },
              {
                num: '03',
                title: 'Tìm kiếm lỗi nghẽn truy vấn chậm trễ của ứng dụng web',
                desc: 'Sử dụng công cụ vAPM để theo dõi luồng phản hồi API người dùng. Hệ thống tự động chỉ ra câu lệnh SQL SELECT chậm chạp kéo dài do thiếu lập chỉ mục (Missing Index) trong DB giúp lập trình viên tối ưu code tức thì.'
              },
              {
                num: '04',
                title: 'Tự động co giãn theo lịch trình thấp tải đêm muộn',
                desc: 'Ứng dụng CMP thiết lập quy chế tự động tắt bớt 50% số lượng máy chủ ảo của môi trường thử nghiệm (Development Environment) từ 22h đêm đến 6h sáng hôm sau, tránh phát sinh chi tiêu hóa đơn dư thừa lãng phí.'
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
              Hỏi đáp dịch vụ Vận hành đám mây
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các thông tin hỗ trợ kỹ thuật về cài đặt Agent đo lường, cấu hình API Key tích hợp đa đám mây và tối ưu hóa tài nguyên.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {[
              {
                q: 'Việc cài đặt vWatch giám sát máy chủ ảo có cần phải khởi động lại máy chủ (Reboot) không?',
                a: 'Hoàn toàn không cần thiết. Bạn chỉ cần thực hiện nạp gói cài đặt Agent vWatch siêu nhẹ trực tiếp từ giao diện dòng lệnh (Command Line) bằng một dòng lệnh duy nhất. Hệ thống sẽ ngay lập tức tự khởi chạy và truyền dữ liệu giám sát về console mà không cần reboot máy.'
              },
              {
                q: 'vCMP kết nối đến các tài khoản AWS/GCP của tôi thông qua phương thức bảo mật nào?',
                a: 'Chúng tôi sử dụng cơ chế định danh an toàn IAM Role Delegation của AWS hoặc Service Account của GCP để phân quyền kết nối Read-Only tài nguyên của bạn. Chúng tôi cam kết tuyệt đối không lưu giữ mật khẩu hay tài khoản root của bạn, đảm bảo an toàn bảo mật tuyệt đối.'
              },
              {
                q: 'vAPM hỗ trợ giám sát các framework ứng dụng nguồn mở nào hiện nay?',
                a: 'vAPM hỗ trợ đầy đủ các ngôn ngữ lập trình và frameworks phổ biến nhất hiện nay bao gồm: Java (Spring Boot), PHP (Laravel), Node.js (Express), Go (Gin), Python (Django) và .NET Core giúp lập trình viên dễ dàng tích hợp thư viện đo lường chỉ với vài dòng code cấu hình.'
              },
              {
                q: 'Tôi có thể thiết lập phân quyền quản lý (RBAC) chi tiết cho từng team trong CMP không?',
                a: 'Có. Hệ thống vCMP tích hợp sẵn bộ quản lý phân quyền (Role-Based Access Control) cho phép admin phân chia tài nguyên, phân quyền xem hóa đơn chi phí chi tiết cho từng phòng ban hoặc chỉ định rõ team Dev nào chỉ được thao tác trên Cloud của dự án đó.'
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
                DÙNG THỬ CLOUD WATCH MIỄN PHÍ
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Làm chủ mọi thông số vận hành đám mây lai ngay hôm nay
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Đội ngũ chuyên gia vận hành hệ thống đám mây (Cloud Operators) của Viettel IDC sẵn sàng khảo sát, tích hợp bộ CMP quản lý tài nguyên đa đám mây thử nghiệm hoàn toàn miễn phí.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Tặng miễn phí gói dùng thử vCMP Enterprise quản trị đa đám mây trong vòng 30 ngày.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Tặng voucher 1.000 tin nhắn SMS cảnh báo đỏ sự cố từ vWatch.</p>
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
                        Cảm ơn bạn đã quan tâm. Kỹ sư vận hành Viettel IDC sẽ liên hệ tư vấn trực tiếp trong vòng 15 phút.
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
                            <option value="Viettel Cloud Watch (vWatch)">Viettel Cloud Watch (vWatch)</option>
                            <option value="Viettel Application Performance Monitoring (vAPM)">Viettel Application Performance Monitoring (vAPM)</option>
                            <option value="Viettel Multi-Cloud Management Platform (vCMP)">Viettel Multi-Cloud Management Platform (vCMP)</option>
                            <option value="Tư vấn mô hình giám sát an toàn DevOps">Tư vấn mô hình giám sát an toàn DevOps</option>
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
