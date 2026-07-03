'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Sparkles, Zap, Layers, Activity, Network, Database, Settings, 
  Calculator, Shield, Globe, Check, AlertCircle, Clock, Bell, 
  Phone, BookOpen, Lock, ArrowUpRight, ChevronRight, ChevronDown,
  Server, Cpu, Terminal, RefreshCw, BarChart2, HardDrive, ArrowRight,
  User, Mail, CheckCircle2
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import ScreenSwitcher from './ScreenSwitcher';

export default function DataCenterPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Cho thuê chỗ đặt máy chủ (Colocation)'
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
        solution: 'Cho thuê chỗ đặt máy chủ (Colocation)'
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
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2329] via-[#2D3441]/90 to-transparent" />
        
        <div className="ali-container relative z-10 text-left flex flex-col items-start py-6 w-full">
          <div className="space-y-6 max-w-3xl flex flex-col items-start">
            <div className="inline-flex items-center space-x-2 bg-[#EE0033]/15 border border-[#EE0033]/30 px-3 py-1.5 rounded-full text-[#EE0033] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EE0033] mr-1 animate-ping" />
              TIÊU CHUẨN RATED 3 TIA-942 · TRUNG TÂM DỮ LIỆU CỐT LÕI
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Trung tâm dữ liệu<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">An toàn vật lý 5 lớp tối mật</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Không gian đặt tủ rack riêng lẻ, phòng máy cage bảo mật nghiêm ngặt và hệ thống máy chủ vật lý Bare Metal chuyên dụng từ các hãng Dell/HP thế hệ mới nhất. Hệ thống vận hành tại trung tâm dữ liệu chuẩn Rated 3 TIA-942 lớn nhất Việt Nam, cam kết tính liên tục của nguồn điện và hạ tầng làm mát.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToSection('products')}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#EE0033] text-white font-bold text-sm tracking-wider rounded-full shadow-[0_4px_14px_rgba(238,0,51,0.4)] transition-all duration-300 hover:bg-[#FF1A4E] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_6_20px_rgba(238,0,51,0.5)] focus:outline-none text-center cursor-pointer"
              >
                <span>Khám phá dịch vụ</span>
                <span className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center text-[8px] font-bold group-hover:border-white group-hover:scale-110 transition-all duration-300">
                  →
                </span>
              </button>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-3 bg-transparent border border-gray-400 hover:border-white text-gray-300 hover:text-white font-bold text-sm tracking-wider rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Nhận tư vấn thiết kế TTDN
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
            <div className="flex items-center gap-6 lg:gap-8 h-full">
              <span className="text-sm md:text-base font-extrabold text-gray-950 tracking-tight shrink-0 flex items-center h-full border-r border-gray-200/60 pr-4 md:pr-6">
                Trung tâm dữ liệu (Datacenter)
              </span>
              
              {/* Desktop Tabs */}
              <div className="hidden md:flex items-center gap-5 lg:gap-7 h-full">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'products', label: 'Ecosystem sản phẩm' },
                  { id: 'comparison', label: 'Ưu thế Rated 3' },
                  { id: 'use-cases', label: 'Kịch bản ứng dụng' },
                  { id: 'faq', label: 'Hỏi đáp kỹ thuật' }
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
                          layoutId="activeTabUnderline"
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
                Yêu cầu khảo sát
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
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">HẠ TẦNG VẬT LÝ VỮNG CHẮC</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Hệ thống phòng máy tiêu chuẩn cao cấp nhất
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Viettel IDC sở hữu mạng lưới 5 trung tâm dữ liệu xanh quy mô lớn trải dài toàn quốc đạt chuẩn Rated 3 TIA-942 Design & Built cao nhất Việt Nam, cam kết tính dự phòng tối đa và khả năng mở rộng không giới hạn.
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
                <h3 className="text-lg font-bold text-gray-950 mb-3">Cho thuê chỗ đặt Colocation</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Cung cấp không gian máy chủ riêng lẻ (1U/2U) hoặc tủ Rack chuyên dụng (42U) và phòng máy quây Cage riêng tư, đi kèm đường truyền cáp quang băng thông cực rộng không giới hạn dung lượng tải.
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
                  <Server className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Thuê máy chủ vật lý Bare Metal</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Cung cấp phần cứng máy chủ dùng riêng DELL PowerEdge, HPE ProLiant chính hãng thế hệ mới nhất, toàn quyền cấu hình root/administrator và cam kết an toàn vật lý tuyệt đối 100%.
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
                  <Settings className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Tư vấn thiết kế TTDN chuyên nghiệp</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Khảo sát thực tế, quy hoạch thiết kế kỹ thuật kiến trúc hạ tầng nguồn điện, làm mát và phòng cháy chữa cháy chuẩn Rated 3 / Rated 4 cho phòng máy dữ liệu của các tổ chức tài chính lớn.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAND (SECTION DUY NHẤT DÙNG NỀN ĐỎ THEO QUY TẮC) */}
      <section className="bg-[#EE0033] text-white py-12 md:py-16">
        <div className="ali-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">99.995%</span>
              <span className="block text-xs md:text-sm font-medium text-red-100 uppercase tracking-wider">SLA Khả Dụng Nguồn</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">Active-Active</span>
              <span className="block text-xs md:text-sm font-medium text-red-100 uppercase tracking-wider">UPS Dự Phòng 2N+1</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">&lt; 1.4 PUE</span>
              <span className="block text-xs md:text-sm font-medium text-red-100 uppercase tracking-wider">Hiệu Quả Năng Lượng</span>
            </div>
            <div className="space-y-1">
              <span className="block text-3xl md:text-5xl font-black font-sans tracking-tight">Rated 3</span>
              <span className="block text-xs md:text-sm font-medium text-red-100 uppercase tracking-wider">Chuẩn TIA-942 Quốc Tế</span>
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
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">DANH MỤC DỊCH VỤ CHÍNH</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Ecosystem sản phẩm Trung tâm dữ liệu
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các gói dịch vụ được phân loại chi tiết nhằm đáp ứng mọi nhu cầu từ không gian nhỏ lẻ đến cụm máy chủ siêu phân vùng bảo mật vật lý cho ngân hàng.
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* GROUP 1: CHO THUÊ CHỖ ĐẶT */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 text-left">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Cho thuê chỗ đặt máy chủ (Colocation)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
                {[
                  {
                    name: 'Thuê lẻ chỗ đặt 1U Space',
                    badge: 'MÁY CHỦ ĐƠN LẺ',
                    price: '1.500.000',
                    desc: 'Dành cho doanh nghiệp vừa và nhỏ tự trang bị máy chủ kích thước 1U tiêu chuẩn.',
                    details: [
                      'Đặt tại tủ Rack tiêu chuẩn 600x1070mm',
                      'Nguồn cấp điện tối đa 400 Watts nguồn điện kép (A+B)',
                      '1 Cổng mạng Shared Port 1 Gbps kết nối Internet',
                      '1 Địa chỉ IP tĩnh Public WAN bảo mật riêng biệt'
                    ]
                  },
                  {
                    name: 'Thuê Half Rack 20U Space',
                    badge: 'PHỔ BIẾN DOANH NGHIỆP',
                    price: '6.500.000',
                    desc: 'Phù hợp cho doanh nghiệp đang vận hành hệ thống lõi vừa có nhu cầu lắp đặt từ 5-10 thiết bị.',
                    details: [
                      'Phân vùng Half Rack 20U có ổ khóa biệt lập',
                      'Nguồn cấp điện tối đa 1.500 Watts dự phòng 2N+1',
                      'Băng thông mạng trong nước 100 Mbps đối xứng',
                      'Miễn phí 4 Địa chỉ IP tĩnh Public WAN riêng biệt'
                    ]
                  },
                  {
                    name: 'Thuê Trọn Tủ Rack 42U Space',
                    badge: 'DOANH NGHIỆP LỚN',
                    price: '11.500.000',
                    desc: 'Tối ưu mật độ lắp đặt, thích hợp chạy hệ thống Core, lưu trữ SAN vật lý độc lập.',
                    details: [
                      'Trọn tủ Rack tiêu chuẩn 42U 600x1070mm',
                      'Nguồn cấp điện tối đa 3.000 Watts (lên tới 32A kép)',
                      'Băng thông trong nước 150 Mbps, quốc tế 2 Mbps',
                      'Miễn phí 8 Địa chỉ IP tĩnh Public WAN riêng biệt'
                    ]
                  }
                ].map((prod, idx) => {
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">COL-0{idx+1}</span>
                        </div>

                        <div className="space-y-1 text-left">
                          <h4 className="text-base md:text-lg font-bold text-gray-950 leading-snug font-sans tracking-tight">{prod.name}</h4>
                          <div className="flex items-baseline gap-1 pt-1">
                            <span className="text-2xl font-black text-gray-950">{prod.price}</span>
                            <span className="text-xs text-gray-400 font-medium">VND / Tháng</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed font-normal pt-1 min-h-[40px]">{prod.desc}</p>
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2 text-left">
                          {prod.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600">
                              <Check className="w-3.5 h-3.5 text-[#EE0033] shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-gray-100">
                        <Link 
                          href="/contact"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-gray-50 border border-gray-200 hover:bg-[#EE0033] hover:text-white hover:border-[#EE0033] text-gray-700 text-xs font-bold rounded-lg transition-all duration-300"
                        >
                          <span>Liên hệ đặt chỗ</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* GROUP 2: MÁY CHỦ BARE METAL */}
            <div className="space-y-8 pt-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 text-left">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Thuê máy chủ vật lý dùng riêng (Bare Metal)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
                {[
                  {
                    name: 'Bare Metal Server Dell PowerEdge R660',
                    badge: 'HIỆU NĂNG TỐI ƯU',
                    specs: ['2x CPU Intel Xeon Silver 4410Y (24 Cores, 48 Threads)', '128 GB RAM DDR5 RDIMM 4800MT/s', '2x 960GB Enterprise SSD SATA RAID 1', 'Dual-port 10Gbps SFP+ NIC Network', 'SLA sẵn sàng phần cứng vật lý 99.9%'],
                    price: '4.800.000',
                    desc: 'Cấu hình tiêu chuẩn, tối ưu hóa sâu cho ảo hóa VM hoặc chạy ERP vừa.'
                  },
                  {
                    name: 'Bare Metal Server Dell PowerEdge R760',
                    badge: 'XỬ LÝ DỮ LIỆU CỰC HẠN',
                    specs: ['2x CPU Intel Xeon Gold 6430 (64 Cores, 128 Threads)', '256 GB RAM DDR5 RDIMM ECC', '2x 1.92TB Enterprise NVMe SSD RAID 1', 'Dual-port 25Gbps SFP28 NIC Network', 'Kỹ sư trực tiếp đấu nối quang SAN và VLAN'],
                    price: '9.200.000',
                    desc: 'Cấu hình siêu mạnh mẽ, chuyên dụng cho Database nặng và ảo hóa đám mây riêng.'
                  }
                ].map((prod, idx) => {
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF0F2] text-[#EE0033] border border-[#FCD9D8]">
                            {prod.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">SRV-0{idx+1}</span>
                        </div>

                        <div className="space-y-1 text-left">
                          <h4 className="text-base md:text-lg font-bold text-gray-950 leading-snug font-sans tracking-tight">{prod.name}</h4>
                          <div className="flex items-baseline gap-1 pt-1">
                            <span className="text-2xl font-black text-gray-950">{prod.price}</span>
                            <span className="text-xs text-gray-400 font-medium">VND / Tháng</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed font-normal pt-1 min-h-[40px]">{prod.desc}</p>
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2 text-left">
                          {prod.specs.map((spec, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600">
                              <Check className="w-3.5 h-3.5 text-[#EE0033] shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-gray-100">
                        <Link 
                          href="/contact"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#EE0033] text-white hover:bg-[#C8002B] text-xs font-bold rounded-lg transition-all duration-300 shadow-sm"
                        >
                          <span>Thuê ngay máy chủ</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
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
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ĐỘ TIN CẬY TUYỆT ĐỐI</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              An toàn vật lý & Năng lực vận hành quốc tế
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Khác biệt hoàn toàn với các hạ tầng phòng máy tự dựng thô sơ, Viettel IDC mang lại quy chuẩn bảo vệ vững bền tối đa cho các hệ thống máy chủ vật lý chạy production thực tế.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">Chuẩn Rated 3 TIA-942</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Được đánh giá độc lập bởi bên thứ ba, cam kết hạ tầng nguồn điện và làm mát phòng máy có khả năng bảo trì song song (Concurrently Maintainable) không cần dừng máy chủ.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900"> UPS Dự phòng Active-Active</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Hai lộ nguồn độc lập đi từ hai trạm biến áp quốc gia khác biệt kết hợp tủ UPS dự phòng 2N+1 đảm bảo sụt lưới điện bất ngờ không làm máy chủ sập nguồn.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">Bảo mật vật lý nghiêm ngặt 5 lớp</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Từ hàng rào an ninh ngoài, thẻ từ quét sinh trắc học vân tay, camera giám sát AI liên tục đến phòng quây Cage kim loại cô lập hoàn hảo tủ rack của bạn.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">Luồng làm mát Hot/Cold Aisle</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Thiết kế hành lang cô lập luồng khí nóng lạnh chuyên nghiệp giúp tăng gấp rưỡi hiệu quả giải nhiệt, triệt tiêu nguy cơ tĩnh điện gây hư hại vi mạch máy chủ vật lý.
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
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">MÔ HÌNH TRIỂN KHAI</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Kịch bản ứng dụng tiêu biểu tại Datacenter
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các doanh nghiệp lớn ưu tiên chọn đặt tủ rack riêng tại trung tâm dữ liệu Viettel IDC để đáp ứng các quy chuẩn bảo mật vật lý cao nhất.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {[
              {
                num: "①",
                title: "Hạ tầng Core Banking của tổ chức Tài chính",
                desc: "Thiết lập các cụm máy chủ vật lý chuyên dụng đặt trong phân vùng Cage quây thép biệt lập hoàn hảo, kết nối bảo mật lớp 3, đáp ứng tuyệt đối chuẩn PCI-DSS vật lý."
              },
              {
                num: "②",
                title: "Điểm nút phục hồi thảm họa nóng (DR Site)",
                desc: "Đặt cụm máy chủ backup vật lý dự phòng hoạt động tại Trung tâm dữ liệu Hòa Lạc kết nối trực tiếp chuyên biệt với trung tâm dữ liệu dự phòng Bình Dương qua Leased Line."
              },
              {
                num: "③",
                title: "Vận hành hệ thống lõi ERP nặng nề",
                desc: "Thuê máy chủ vật lý DELL PowerEdge thế hệ mới dùng riêng chạy cơ sở dữ liệu SAP/Oracle khổng lồ, triệt tiêu độ trễ nghẽn IOPS nhờ tủ đĩa SAN quang kết nối trực tiếp."
              },
              {
                num: "④",
                title: "Hạ tầng mạng đa hướng chống nghẽn trục quốc gia",
                desc: "Kết nối trực tiếp tới 4 nhà mạng lớn nhất tại Việt Nam bằng dải mạng Anycast DNS và dải địa chỉ IP tĩnh Public độc lập, cam kết đường truyền liên tục và không nghẽn."
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
                  <h4 className="text-base font-bold text-gray-950 leading-snug">{useCase.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{useCase.desc}</p>
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
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">HỎI ĐÁP HẠ TẦNG</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Giải đáp thắc mắc kỹ thuật Datacenter
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các câu hỏi kỹ thuật chuyên môn thường gặp nhất từ phía các quản trị viên hệ thống mạng của khách hàng khi đặt máy chủ tại Viettel IDC.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Yêu cầu Rated 3 TIA-942 mang lại lợi ích thực tế gì cho máy chủ của tôi?",
                a: "Chứng chỉ Rated 3 đảm bảo Datacenter có khả năng bảo trì đồng thời (Concurrently Maintainable). Nghĩa là mọi hệ thống điều hòa giải nhiệt, cáp mạng Core hay tổ UPS đều có lộ nguồn điện thứ hai dự phòng song song để bảo dưỡng sửa chữa mà hoàn toàn không cần tắt nguồn điện của tủ Rack máy chủ đặt thiết bị của bạn."
              },
              {
                q: "Kỹ sư Remote Hands tại chỗ hỗ trợ được những tác vụ cụ thể nào?",
                a: "Bộ phận kỹ sư túc trực 24/7 tại phòng máy hỗ trợ miễn phí: reboot nóng máy chủ vật lý, cắm lại cáp quang mạng LAN, kiểm tra trạng thái đèn LED báo động, hỗ trợ cắm cổng USB KVM để quản trị khách hàng kết nối cấu hình BIOS từ xa."
              },
              {
                q: "Tôi có được cấp thẻ từ ra vào trực tiếp phòng đặt máy chủ của mình không?",
                a: "Có. Với gói thuê trọn tủ Rack (42U) hoặc quây Cage, Viettel IDC sẽ cấp thẻ từ định danh riêng biệt sau khi đã hoàn tất quy trình đăng ký an ninh sinh trắc học khuôn mặt và vân tay của nhân sự quản trị phía khách hàng."
              },
              {
                q: "Hạ tầng điều hòa giải nhiệt phòng máy duy trì độ ẩm thế nào chống tĩnh điện?",
                a: "Chúng tôi tuân thủ nghiêm ngặt tiêu chuẩn ASHRAE của Mỹ, duy trì độ ẩm ổn định ở mức 45% - 55% và nhiệt độ 22 ± 2°C. Kết hợp hệ thống sàn nâng chống rung vật lý phủ lớp sơn tĩnh điện đảm bảo triệt tiêu hoàn toàn rủi ro đoản mạch phần cứng máy chủ."
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
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-xs md:text-sm text-gray-900 hover:text-[#EE0033] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180 text-[#EE0033]' : ''}`} />
                  </button>
                  <div 
                    className={`transition-all duration-300 overflow-hidden text-left ${
                      isOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
                    }`}
                  >
                    <p className="p-6 text-xs md:text-sm text-gray-500 leading-relaxed bg-gray-50/50">
                      {faq.a}
                    </p>
                  </div>
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
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[#FF4D6D] font-bold text-xs uppercase tracking-widest block bg-[#FF4D6D]/10 px-3 py-1 rounded-full w-max">
                KHẢO SÁT HẠ TẦNG VẬT LÝ MIỄN PHÍ HÔM NAY
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Thiết kế đo ni đóng giày riêng cho phòng máy của bạn
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Đội ngũ kỹ sư tư vấn cao cấp của Viettel IDC luôn sẵn sàng hỗ trợ khảo sát trực tiếp tại trụ sở doanh nghiệp, lên bản vẽ sơ đồ bố trí tủ rack (Rack Layout) và quy hoạch băng thông kết nối tối ưu nhất.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">Khảo sát & Lên phương án 0đ</h5>
                    <p className="text-xs text-gray-300">Không tính phí rà soát hiện trạng thực tế hệ thống.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">Cam kết SLA bằng văn bản</h5>
                    <p className="text-xs text-gray-300">Điều khoản bồi hoàn tài chính rõ ràng, minh bạch.</p>
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
                        Cảm ơn bạn đã quan tâm. Kỹ sư giải pháp Datacenter Viettel IDC sẽ liên hệ lại tư vấn trực tiếp trong vòng 15 phút.
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
                            <option value="Cho thuê chỗ đặt máy chủ (Colocation)">Cho thuê chỗ đặt máy chủ (Colocation)</option>
                            <option value="Thuê tủ Rack riêng biệt (Cage/Full Rack)">Thuê tủ Rack riêng biệt (Cage/Full Rack)</option>
                            <option value="Thuê máy chủ vật lý Bare Metal">Thuê máy chủ vật lý Bare Metal</option>
                            <option value="Tư vấn thiết kế & Vận hành TTDN">Tư vấn thiết kế & Vận hành TTDN</option>
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
