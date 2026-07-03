'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, Laptop, HardDrive, Mail, Cloud, Shield, Check, ArrowRight,
  User, Phone, CheckCircle2, ChevronRight, ChevronDown, Lock,
  Users, Share2, FolderHeart, Globe, FileSpreadsheet
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';

export default function DigitalServicesPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Viettel Cloud PC'
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
        solution: 'Viettel Cloud PC'
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
              ỨNG DỤNG & DỊCH VỤ SỐ · DIGITAL WORKSPACE
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Không gian cộng tác số<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">Làm việc linh hoạt · Bảo mật dữ liệu tuyệt đối</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Cung cấp giải pháp máy tính ảo đám mây (Cloud PC) cho nhân viên làm việc từ xa an toàn, không gian lưu trữ tài liệu hợp tác doanh nghiệp (Viettel Drive) và gói văn phòng số Microsoft 365, Google Workspace bản quyền đầy đủ pháp lý.
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
                Yêu cầu dùng thử Cloud PC
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
                Digital Workspace
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
                          layoutId="activeDigitalTabUnderline"
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
              Kiến tạo văn phòng số làm việc linh hoạt
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Giúp doanh nghiệp tối ưu hóa năng suất cộng tác làm việc của nhân sự ở bất cứ đâu. Đồng thời, giải quyết triệt để rủi ro rò rỉ dữ liệu tài liệu mật ra khỏi biên giới thông qua các giải pháp đám mây lưu trữ nội địa an toàn.
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
                  <Laptop className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Máy tính ảo Cloud PC</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Thiết lập nhanh các máy trạm ảo hóa (VDI) chạy mượt mà hệ điều hành Windows/Linux. Nhân viên truy cập làm việc từ xa mượt mà trên iPad, điện thoại hoặc máy tính cũ.
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
                <h3 className="text-lg font-bold text-gray-950 mb-3">Lưu trữ chia sẻ vDrive</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Giải pháp lưu trữ, đồng bộ và phân quyền chia sẻ tệp tin doanh nghiệp tập trung đặt tại trung tâm dữ liệu Việt Nam, tuân thủ tuyệt đối quy định pháp lý an ninh mạng.
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
                  <Briefcase className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Workspace số Bản quyền</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Cung cấp dịch vụ Workspace chính hãng Microsoft 365, Google Workspace. Đầy đủ pháp lý bản quyền, hỗ trợ cài đặt kỹ thuật và xuất hóa đơn tài chính trong nước.
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
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">99.95%</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">SLA cam kết Uptime Cloud PC</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">100%</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Dữ liệu lưu giữ tại Việt Nam</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">Zero-Data-Loss</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Không sợ thất thoát khi mất máy</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">10k+</span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/80">Tài khoản doanh nghiệp đang sử dụng</span>
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
              Hệ sinh thái Văn phòng số & Ứng dụng
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các giải pháp giúp thay đổi toàn diện trải nghiệm làm việc hiện đại, đồng bộ hóa năng suất nhân sự.
            </p>
          </motion.div>

          <div className="space-y-16 text-left">
            
            {/* GROUP 1: VIRTUAL PC & DRIVE */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Máy tính ảo & Lưu trữ an toàn (Cloud PC & Drive)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Viettel Cloud PC (vCloudPC)',
                    badge: 'MÁY TÍNH ẢO',
                    desc: 'Giải pháp máy tính ảo hóa hạ tầng VDI chuyên dụng, giúp quản lý tập trung và bảo mật 100% dữ liệu tài sản số của doanh nghiệp.',
                    details: [
                      'Dữ liệu nằm tập trung hoàn toàn tại Datacenter Viettel, tránh rò rỉ khi nhân viên làm việc tại nhà',
                      'Hỗ trợ cài đặt nhanh chóng hàng loạt máy ảo theo mẫu định cấu hình có sẵn',
                      'Nhân viên dễ dàng truy cập mượt mà từ xa thông qua ứng dụng Client cài trên Windows/iOS/Android'
                    ],
                    specs: [
                      { label: 'Uptime SLA', value: '⚡ 99.95%' },
                      { label: 'Kết nối băng thông', value: '✓ Đến 1 Gbps' }
                    ],
                    pricing: [
                      { planName: 'vCloudPC Standard', specs: ['2 vCPU, 4GB RAM', '50GB SSD OS, 100GB Data', 'Phù hợp nhân viên văn phòng hành chính'], price: '390.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'vCloudPC Professional (Phổ biến)', specs: ['4 vCPU, 8GB RAM', '100GB SSD OS, 200GB Data', 'Thích hợp kỹ sư lập trình, phân tích dữ liệu'], price: '750.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Laptop
                  },
                  {
                    name: 'Viettel Drive (vDrive)',
                    badge: 'LƯU TRỮ DOANH NGHIỆP',
                    desc: 'Không gian lưu trữ đám mây hợp nhất nội địa, cho phép lưu giữ đồng bộ tài liệu, chia sẻ nhóm dự án an toàn tốc độ cực cao.',
                    details: [
                      'Đồng bộ hóa dữ liệu thời gian thực giữa máy tính cá nhân và đám mây',
                      'Phân quyền chia sẻ tài liệu chặt chẽ trong/ngoài tổ chức đầy đủ tính năng',
                      'Tự động sao lưu tuần hoàn hàng tuần, đảm bảo tuyệt đối an toàn tránh mã độc tống tiền'
                    ],
                    specs: [
                      { label: 'Lưu trữ trong nước', value: '⚡ 100% Viettel DC' },
                      { label: 'Giao diện web/app', value: '✓ Trực quan dễ dùng' }
                    ],
                    pricing: [
                      { planName: 'vDrive Starter 500GB', specs: ['500 GB Dung lượng chung', 'Hỗ trợ tối đa 10 thành viên', 'Tính năng phân quyền chia sẻ an toàn'], price: '250.000', period: 'tháng', fType: 'F1 Auto' },
                      { planName: 'vDrive Business 2TB', specs: ['2 TB Dung lượng chung', 'Không giới hạn thành viên', 'Hỗ trợ đồng bộ hóa tự động app PC'], price: '850.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
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
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">DIG-0{idx+1}</span>
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

            {/* GROUP 2: GLOBAL WORKSPACE */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Giải pháp Văn phòng số Toàn cầu (Microsoft 365 & Google Workspace)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    name: 'Microsoft 365 Business',
                    badge: 'VĂN PHÒNG SỐ MS',
                    desc: 'Cung cấp đầy đủ bộ công cụ Word, Excel, PowerPoint, Outlook, Teams chính hãng Microsoft. Bản quyền đầy đủ pháp lý và hỗ trợ xuất hóa đơn VAT trong nước.',
                    details: [
                      'Gồm phiên bản cài đặt trực tiếp trên máy tính và bản web linh hoạt',
                      'Đính kèm 1 TB dung lượng lưu trữ OneDrive doanh nghiệp bảo mật an toàn',
                      'Hỗ trợ tích hợp email doanh nghiệp dạng name@company.com chuyên nghiệp'
                    ],
                    specs: [
                      { label: 'OneDrive Storage', value: '⚡ 1 TB/User' },
                      { label: 'Bản quyền', value: '✓ Microsoft Authorized' }
                    ],
                    pricing: [
                      { planName: 'M365 Business Basic', specs: ['Các ứng dụng bản Web (Word, Excel)', 'Email doanh nghiệp 50GB', 'Hỗ trợ Teams họp online'], price: '140.000', period: 'tháng/user', fType: 'F1 Auto' },
                      { planName: 'M365 Business Standard', specs: ['Đầy đủ ứng dụng cài đặt PC/Mac', 'Email doanh nghiệp 50GB', 'Lưu trữ OneDrive 1TB'], price: '320.000', period: 'tháng/user', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: FileSpreadsheet
                  },
                  {
                    name: 'Google Workspace Enterprise',
                    badge: 'VĂN PHÒNG SỐ GOOGLE',
                    desc: 'Không gian cộng tác số hiện đại của Google. Gồm Gmail doanh nghiệp, Google Drive chia sẻ và Google Meet hội thảo trực tuyến chất lượng cao.',
                    details: [
                      'Gmail doanh nghiệp theo đuôi riêng biệt có bộ lọc spam tối tân bảo mật',
                      'Chức năng cùng soạn thảo chỉnh sửa văn bản, bảng tính thời gian thực tiện lợi',
                      'Hệ quản trị bảng điều khiển Admin Console bảo mật chặt chẽ thiết bị'
                    ],
                    specs: [
                      { label: 'Google Drive', value: '⚡ Tới 2 TB/User' },
                      { label: 'Bản quyền', value: '✓ Google Cloud Partner' }
                    ],
                    pricing: [
                      { planName: 'Workspace Business Starter', specs: ['30 GB Dung lượng Google Drive', 'Gmail doanh nghiệp', 'Meet tối đa 100 người tham gia'], price: '165.000', period: 'tháng/user', fType: 'F1 Auto' },
                      { planName: 'Workspace Business Standard', specs: ['2 TB Dung lượng lưu trữ', 'Meet tối đa 150 người + Ghi âm', 'Google Shared Drives chung cho nhóm'], price: '345.000', period: 'tháng/user', isPopular: true, fType: 'F2 Semi' }
                    ],
                    icon: Mail
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
                          <span className="text-xs text-gray-400 font-mono">DIG-0{idx+3}</span>
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
              Không gian cộng tác số chuyên nghiệp an toàn nhất
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Giải pháp tích hợp giúp doanh nghiệp tăng hiệu quả cộng tác nhóm trong khi vẫn kiểm soát hoàn hảo tính toàn vẹn của dữ liệu tổ chức.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Tuyệt đối không lộ dữ liệu</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Khi sử dụng Cloud PC, toàn bộ dữ liệu chỉ được lưu giữ tại hệ thống lưu trữ Datacenter của Viettel, tránh hoàn toàn rủi ro nhân viên tải tài liệu mật về máy tính cá nhân.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Cộng tác trực tuyến tức thì</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                vDrive và Google/MS Workspace hỗ trợ soạn thảo văn bản, bảng tính, slide trình bày đồng thời thời gian thực giúp thúc đẩy năng suất và rút ngắn thời gian làm việc nhóm.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Tuân thủ an ninh mạng</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                vDrive lưu trữ dữ liệu 100% tại Việt Nam, đáp ứng đầy đủ điều kiện pháp lý nghiêm ngặt của Luật An ninh mạng về việc lưu giữ thông tin người dùng trong nước.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-gray-950 font-sans tracking-tight">Hỗ trợ xuất hóa đơn nước nhà</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Viettel IDC cung cấp hợp đồng pháp lý đầy đủ và hỗ trợ xuất hóa đơn tài chính VAT chính hãng đối với các dịch vụ Microsoft 365, Google Workspace cho doanh nghiệp.
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
              Hiện thực hóa mô hình làm việc hiện đại Hybrid
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các giải pháp giúp tối đa hóa hiệu quả hoạt động, an toàn tài nguyên số cho doanh nghiệp hiện đại.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Hạ tầng làm việc bảo mật cho lập trình viên (Dev Cloud)',
                desc: 'Khởi tạo Cloud PC cấu hình cao làm môi trường viết mã nguồn cho đội tuyển dev. Lập trình viên kết nối từ xa để viết code nhưng không thể copy hay sao chép mã nguồn ra máy tính cá nhân bên ngoài, bảo đảm bản quyền.'
              },
              {
                num: '02',
                title: 'Số hóa và chia sẻ hồ sơ thầu, tài liệu kỹ thuật lớn',
                desc: 'Sử dụng vDrive tạo các thư mục dự án dùng chung. Các phòng ban trong công ty cùng tải lên bản vẽ kỹ thuật, hồ sơ thầu dung lượng hàng GigaBytes và phân quyền chỉ cho đối tác xem trực tuyến mà không thể tải về.'
              },
              {
                num: '03',
                title: 'Chuyển đổi số Email nội bộ cho Doanh nghiệp vừa & nhỏ',
                desc: 'Tích hợp gói văn phòng Microsoft 365 Business Standard. Thiết lập hệ thống email doanh nghiệp name@company.com và di chuyển toàn bộ hộp thư cũ lên đám mây Outlook an toàn, loại bỏ spam mail quảng cáo rác.'
              },
              {
                num: '04',
                title: 'Cắt giảm chi phí mua sắm thiết bị phần cứng PC',
                desc: 'Thay vì bỏ khoản ngân sách lớn mua sắm máy tính PC đắt đỏ cho nhân sự telesale/hỗ trợ khách hàng. Doanh nghiệp mua sắm màn hình Thin Client giá rẻ kết hợp giải pháp Cloud PC cấu hình chuẩn để tối ưu chi phí khấu hao.'
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
              Hỏi đáp dịch vụ Văn phòng số
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các thông tin hỗ trợ kỹ thuật về cài đặt kết nối Cloud PC, cấu hình đồng bộ vDrive và tư vấn chuyển đổi bản quyền.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {[
              {
                q: 'Tôi có thể kết nối âm thanh và thiết bị ngoại vi (USB, Máy in) từ máy cá nhân vào Cloud PC không?',
                a: 'Có. Ứng dụng Client vCloudPC hỗ trợ cơ chế chuyển tiếp cổng kết nối (Port Redirection). Cho phép bạn truyền tín hiệu âm thanh microphone, webcam và sử dụng trực tiếp USB, máy in vật lý kết nối với máy tính cá nhân bên ngoài vào trong môi trường ảo hóa.'
              },
              {
                q: 'vDrive của Viettel IDC có cơ chế chống ransomware tấn công ghi đè file lưu trữ không?',
                a: 'Có, vDrive tích hợp công nghệ quản lý phiên bản (File Versioning). Khi máy của người dùng bị dính mã độc tống tiền mã hóa dữ liệu cục bộ và đồng bộ lên vDrive, admin có thể dễ dàng khôi phục ngược lại toàn bộ trạng thái tệp tin về phiên bản an toàn trước thời điểm xảy ra sự cố.'
              },
              {
                q: 'Doanh nghiệp đang dùng email rác khác muốn di chuyển sang Google Workspace có bị mất dữ liệu không?',
                a: 'Không. Kỹ sư giải pháp của Viettel IDC sẽ hỗ trợ sử dụng công cụ chuyên dụng của Google/Microsoft để chuyển dịch toàn bộ dữ liệu email, lịch hẹn, danh bạ cũ sang môi trường Workspace an toàn 100%, hoàn toàn không mất mát hay gián đoạn việc gửi nhận mail.'
              },
              {
                q: 'Tôi có thể tự tạo cấu hình phân chia dung lượng lưu trữ vDrive cho từng nhân viên không?',
                a: 'Có. Trang Admin Console của vDrive cung cấp cho quản trị viên doanh nghiệp bảng điều khiển đầy đủ để tự cấu hình hạn mức lưu trữ (Quota) cho từng nhân sự hoặc thiết lập thư mục nhóm dự án dùng chung không tính dung lượng cá nhân.'
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
                DÙNG THỬ CLOUD PC MIỄN PHÍ 30 NGÀY
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Nâng tầm năng suất văn phòng số của bạn ngay hôm nay
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Đội ngũ kỹ sư văn phòng số (Workspace Experts) của Viettel IDC sẵn sàng khảo sát, thiết lập tài khoản dùng thử Cloud PC & vDrive trải nghiệm thực tế hoàn toàn miễn phí.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Tặng miễn phí tài khoản dùng thử 30 ngày trải nghiệm vCloudPC & vDrive.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Hỗ trợ kỹ thuật cấu hình đồng bộ hóa thư mục và Email doanh nghiệp 24/7 miễn phí.</p>
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
                        Cảm ơn bạn đã quan tâm. Kỹ sư văn phòng số Viettel IDC sẽ liên hệ tư vấn trực tiếp trong vòng 15 phút.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="space-y-4 text-left">
                    <div className="text-center mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight">Đăng ký tư vấn văn phòng số</h3>
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
                            <option value="Viettel Cloud PC">Viettel Cloud PC (vCloudPC)</option>
                            <option value="Viettel Drive (vDrive)">Viettel Drive (vDrive)</option>
                            <option value="Microsoft 365 Business">Microsoft 365 Business</option>
                            <option value="Google Workspace Enterprise">Google Workspace Enterprise</option>
                            <option value="Tư vấn giải pháp VDI diện rộng">Tư vấn giải pháp VDI diện rộng</option>
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
