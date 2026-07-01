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

export default function ComputeAndContainerPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Cloud Computing (Viettel Cloud Server)'
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
        solution: 'Cloud Computing (Viettel Cloud Server)'
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
      <section id="hero-section" className="relative overflow-hidden bg-[#1A1A1A] text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png')` }}
        />
        
        <div className="ali-container relative z-10 text-left flex flex-col items-start py-6 w-full">
          <div className="space-y-6 max-w-3xl flex flex-col items-start">
            <div className="inline-flex items-center space-x-2 bg-[#EE0033]/15 border border-[#EE0033]/30 px-3 py-1.5 rounded-full text-[#EE0033] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EE0033] mr-1 animate-ping" />
              DANH MỤC CỐT LÕI · COMPUTE & CONTAINER
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Điện toán & Container<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">Hạ tầng số siêu tốc độ</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Nền tảng ảo hóa đám mây, Container Kubernetes tự chủ và máy chủ tăng tốc GPU tiên tiến nhất. Được triển khai trên mạng lưới trung tâm dữ liệu chuẩn Rated 3 TIA-942 cam kết an toàn chủ quyền dữ liệu, hiệu năng tuyệt đỉnh và tiết kiệm tối đa chi phí.
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
                Điện toán & Container
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
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">TỔNG QUAN DỊCH VỤ</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Hệ sinh thái điện toán đám mây toàn diện
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Viettel IDC đáp ứng toàn bộ các nhu cầu từ tính toán cơ bản, ảo hóa ứng dụng truyền thống, co giãn cụm microservices Kubernetes, đến hạ tầng huấn luyện AI hiệu năng cực hạn.
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
                  <Server className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Hiệu năng máy chủ biệt lập</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Máy chủ đám mây ảo hóa VMware/OpenStack sử dụng 100% tài nguyên CPU vật lý chuyên dụng, kết hợp lưu trữ Enterprise SSD NVMe RAID 10 đảm bảo IOPS thực tế cực cao không nghẽn mạch.
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
                  <Layers className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">Tự động co giãn Container</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Quản trị Kubernetes cluster hoàn toàn tự động, co giãn tự do số lượng worker node dựa trên lưu lượng người dùng, tích hợp sẵn Ingress Controller, cân bằng tải đám mây cao cấp.
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
                  <Cpu className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950 mb-3">NVIDIA GPU chuyên AI</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Cung cấp các máy chủ tăng tốc tính toán đồ họa chuyên dụng dựa trên dòng GPU NVIDIA A100/H100 mới nhất. Tối ưu hoàn hảo cho các tác vụ deep learning, kết xuất đồ họa và xử lý AI.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION PRODUCTS DEEP DIVE */}
      <section id="products" className="py-16 md:py-20 bg-gray-50/50 border-y border-gray-200/40 relative overflow-hidden">
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">DANH MỤC SẢN PHẨM</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Danh mục dịch vụ Điện toán và Container
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Hệ sinh thái Điện toán & Container của Viettel IDC đáp ứng toàn diện mọi quy mô triển khai, cam kết hiệu năng mạnh mẽ, bảo mật tối đa và tối ưu hóa chi phí.
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* GROUP 1: ĐIỆN TOÁN ĐÁM MÂY */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 text-left">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Điện toán đám mây (Cloud Compute)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
                {[
                  {
                    name: 'Viettel Cloud Server (VM)',
                    badge: 'HOT',
                    desc: 'Máy chủ ảo hiệu năng cao, cấu hình linh hoạt, pay-as-you-go',
                    details: [
                      'Khởi tạo tức thì trong dưới 5 phút',
                      'Ảo hóa VMware vSphere tiêu chuẩn doanh nghiệp toàn cầu',
                      'Lưu trữ SSD Enterprise RAID 10 siêu tốc không nghẽn'
                    ],
                    icon: Server,
                    link: '/services/compute/viettel-cloud-server'
                  },
                  {
                    name: 'Viettel Virtual Private Cloud (VPC)',
                    badge: '',
                    desc: 'Mạng riêng ảo, phân vùng tài nguyên an toàn',
                    details: [
                      'Môi trường mạng hoàn toàn cô lập bảo mật',
                      'Tự do cấu hình Subnet, Route Table, Firewall riêng',
                      'Kết nối an toàn về văn phòng hoặc DC On-Premise'
                    ],
                    icon: Network,
                    link: '/contact'
                  },
                  {
                    name: 'Viettel Private Cloud',
                    badge: '',
                    desc: 'Hạ tầng cloud riêng tư, tài nguyên dành riêng',
                    details: [
                      'Tài nguyên điện toán được tách biệt ở tầng vật lý',
                      'Phù hợp cho các doanh nghiệp yêu cầu khắt khe bảo mật',
                      'Toàn quyền kiểm soát và cấp phát tài nguyên nội bộ'
                    ],
                    icon: Lock,
                    link: '/contact'
                  },
                  {
                    name: 'Viettel Dedicated Private Cloud',
                    badge: '',
                    desc: 'Private cloud chuyên biệt, phần cứng độc lập',
                    details: [
                      'Sử dụng phần cứng Dell, Cisco chính hãng chuyên dụng',
                      'Cam kết 100% tài nguyên vật lý không chia sẻ',
                      'Đặt tại trung tâm dữ liệu chuẩn Rated 3 an toàn nhất'
                    ],
                    icon: Shield,
                    link: '/contact'
                  },
                  {
                    name: 'Viettel Open Private Cloud',
                    badge: '',
                    desc: 'Private cloud trên nền tảng OpenStack',
                    details: [
                      'Xây dựng trên nền tảng ảo hóa mã nguồn mở OpenStack',
                      'Tương thích API tiêu chuẩn giúp tích hợp mượt mà',
                      'Tiết kiệm tối đa chi phí bản quyền cho doanh nghiệp'
                    ],
                    icon: Settings,
                    link: '/contact'
                  },
                  {
                    name: 'Viettel Cloud GPU',
                    badge: 'NEW',
                    desc: 'GPU NVIDIA A100/H100 cho AI/ML và xử lý đồ họa',
                    details: [
                      'Card tăng tốc NVIDIA Tensor Core mạnh mẽ bậc nhất',
                      'Tối ưu hóa sâu cho huấn luyện mô hình ngôn ngữ lớn LLM',
                      'Kết nối mạng GPU siêu tốc qua NVLink băng thông lớn'
                    ],
                    icon: Cpu,
                    link: '/services/compute/viettel-gpu-server'
                  },
                  {
                    name: 'Viettel Cloud NPU',
                    badge: 'BETA',
                    desc: 'Neural Processing Unit cho inference AI tốc độ cao',
                    details: [
                      'Tối ưu hóa chuyên dụng cho suy luận AI (Inference)',
                      'Hiệu suất vượt trội trên mỗi Watt điện và đơn vị chi phí',
                      'Đáp ứng thời gian phản hồi siêu tốc độ cho Chatbot, Vision'
                    ],
                    icon: Activity,
                    link: '/contact'
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
                      whileHover={{ y: -4 }}
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <Link href={prod.link} className="flex flex-col justify-between h-full w-full">
                        <div className="space-y-6">
                          <div className="flex justify-between items-start">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FAFAFA] text-[#EE0033] border border-gray-100 transition-all duration-300 group-hover:bg-[#FFF0F2] group-hover:border-[#FCD9D8]">
                              <IconComponent className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            {prod.badge && (
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                prod.badge === 'HOT' ? 'bg-[#EE0033] text-white' : 
                                prod.badge === 'NEW' ? 'bg-emerald-500 text-white' : 
                                'bg-amber-500 text-white'
                              }`}>
                                {prod.badge}
                              </span>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-base md:text-lg font-bold text-gray-950 leading-snug font-sans tracking-tight">{prod.name}</h4>
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-normal min-h-[40px]">{prod.desc}</p>
                          </div>

                          <div className="border-t border-gray-100 pt-4 space-y-2">
                            {prod.details.map((detail, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600">
                                <Check className="w-3.5 h-3.5 text-[#EE0033] shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-gray-100">
                          <span className="text-xs font-bold text-[#EE0033] inline-flex items-center gap-1.5 transition-all duration-300">
                            <span className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap">
                              Khám phá dịch vụ
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* GROUP 2: CONTAINER & KUBERNETES */}
            <div className="space-y-8 pt-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 text-left">
                <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                  Container & Kubernetes
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
                {[
                  {
                    name: 'Viettel Open Kubernetes Service (vOKS)',
                    badge: 'NEW',
                    desc: 'Kubernetes managed, auto-scaling, multi-tenant',
                    details: [
                      'Tự động khởi tạo, vận hành và sao lưu cụm Control Plane',
                      'Hỗ trợ auto-scaling tự động tăng giảm Worker Nodes theo tải thực tế',
                      'Tích hợp hoàn hảo Cloud Load Balancer và Ingress Controller'
                    ],
                    icon: Layers,
                    link: '/services/compute/viettel-kubernetes'
                  },
                  {
                    name: 'Viettel Dedicated Kubernetes Service (vDKS)',
                    badge: '',
                    desc: 'Kubernetes cluster chuyên biệt, tài nguyên độc lập',
                    details: [
                      'Phần cứng và cụm Master/Worker Nodes biệt lập hoàn toàn',
                      'Cam kết bảo mật tối đa, không chia sẻ dùng chung tài nguyên',
                      'Lựa chọn hoàn hảo cho Ngân hàng, Tài chính và Doanh nghiệp lớn'
                    ],
                    icon: HardDrive,
                    link: '/contact'
                  },
                  {
                    name: 'Viettel Container Registry (vCR)',
                    badge: '',
                    desc: 'Kho lưu trữ Docker image, bảo mật và quản lý tập trung',
                    details: [
                      'Lưu trữ và quản lý tập trung các Container Images doanh nghiệp',
                      'Quét bảo mật và rà soát mã độc tự động trước khi triển khai',
                      'Phân quyền truy cập IAM chi tiết, kết nối siêu tốc tới cụm K8s'
                    ],
                    icon: Database,
                    link: '/contact'
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
                      whileHover={{ y: -4 }}
                      className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <Link href={prod.link} className="flex flex-col justify-between h-full w-full">
                        <div className="space-y-6">
                          <div className="flex justify-between items-start">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FAFAFA] text-[#EE0033] border border-gray-100 transition-all duration-300 group-hover:bg-[#FFF0F2] group-hover:border-[#FCD9D8]">
                              <IconComponent className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            {prod.badge && (
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                prod.badge === 'HOT' ? 'bg-[#EE0033] text-white' : 
                                prod.badge === 'NEW' ? 'bg-emerald-500 text-white' : 
                                'bg-amber-500 text-white'
                              }`}>
                                {prod.badge}
                              </span>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-base md:text-lg font-bold text-gray-950 leading-snug font-sans tracking-tight">{prod.name}</h4>
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-normal min-h-[40px]">{prod.desc}</p>
                          </div>

                          <div className="border-t border-gray-100 pt-4 space-y-2">
                            {prod.details.map((detail, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600">
                                <Check className="w-3.5 h-3.5 text-[#EE0033] shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-gray-100">
                          <span className="text-xs font-bold text-[#EE0033] inline-flex items-center gap-1.5 transition-all duration-300">
                            <span className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap">
                              Khám phá dịch vụ
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
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
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ƯU ĐIỂM SO SÁNH</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Chất lượng quốc tế · Chi phí thuần Việt
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Hạ tầng đám mây Viettel IDC được tối ưu sâu để đem lại giải pháp hiệu quả tối đa cho hoạt động kinh doanh trực tuyến tại thị trường Việt Nam.
            </p>
          </motion.div>

          {/* Bento-style grid advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">Tiết kiệm 40% - 60%</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Nhờ cơ chế <strong>miễn phí hoàn toàn 100% Data Transfer</strong> (Băng thông quốc tế và trong nước vào/ra không tính phí dung lượng) và thanh toán cố định không lo biến động tỷ giá.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">Uptime tối ưu đến 99.99%</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Các node vật lý liên kết dạng Cluster dự phòng chủ động kép N+1 trên hệ thống lưu trữ phân tán Ceph và ảo hóa VMware vSphere, tự động khôi phục dịch vụ cực nhanh.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">Chủ quyền & Tuân thủ pháp lý</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Đặt tại cụm DC Rated 3 trong nước, đáp ứng đầy đủ yêu cầu của <strong>Luật An ninh mạng Việt Nam 2018</strong>. Cung cấp đầy đủ hóa đơn chứng từ khấu trừ thuế hợp lệ.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">Đường truyền siêu tốc &lt; 2ms</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tích hợp trực tiếp với hạ tầng cáp quang xương sống tốc độ cao của Viettel, triệt tiêu hoàn toàn nỗi lo gián đoạn kết nối do đứt cáp quang biển quốc tế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION USE CASES */}
      <section id="use-cases" className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ỨNG DỤNG THỰC TẾ</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Các kịch bản ứng dụng tiêu biểu
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Hạ tầng tính toán mây an toàn đáp ứng linh hoạt từ kiến trúc máy chủ đơn giản đến cấu trúc microservices lớn.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {[
              {
                num: "①",
                title: "Vận hành hệ thống lõi ERP / CRM",
                desc: "Triển khai các hệ thống SAP, Oracle hoặc phần mềm quản lý nội bộ trên Viettel Cloud Server sử dụng CPU Dedicated chuyên sâu cam kết hiệu năng."
              },
              {
                num: "②",
                title: "Kiến trúc Microservices & DevOps",
                desc: "Sử dụng vK8s đóng gói ứng dụng linh hoạt. Tự động co giãn theo lưu lượng truy cập thực tế, đơn giản hóa hoạt động CI/CD cho kỹ sư phần mềm."
              },
              {
                num: "③",
                title: "Huấn luyện AI & Deep Learning",
                desc: "Tận dụng cụm GPU A100/H100 hiệu năng cực mạnh để huấn luyện dữ liệu, xử lý mô hình LLM lớn, phục vụ nhận diện khuôn mặt, chatbot thông minh."
              },
              {
                num: "④",
                title: "Hệ thống thương mại điện tử quy mô lớn",
                desc: "Đảm bảo trang web TMĐT hoạt động mượt mà trong các đợt mở bán flash-sale tải cao bằng cách phân luồng tải tự động qua hệ thống Load Balancer."
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
      <section id="faq" className="py-16 md:py-20 bg-gray-50/50 border-t border-gray-200/40 relative overflow-hidden">
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">HỎI ĐÁP DỊCH VỤ</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Giải đáp thắc mắc kỹ thuật
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Những câu hỏi thường gặp nhất từ khách hàng khi tìm hiểu hệ sinh thái Điện toán & Container của Viettel IDC.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Uptime SLA 99.99% của Cloud Server được đảm bảo và bồi thường ra sao?",
                a: "Viettel IDC cam kết chỉ số uptime (thời gian sẵn sàng phục vụ) đạt 99.99% hàng tháng trực tiếp trong hợp đồng dịch vụ. Nếu chỉ số này sụt giảm dưới ngưỡng quy định, chúng tôi cam kết bồi hoàn tài chính trực tiếp bằng cách giảm trừ hóa đơn tháng tiếp theo một cách minh bạch."
              },
              {
                q: "Tôi có thể cài đặt hệ điều hành riêng của tôi lên Viettel Cloud Server không?",
                a: "Có, hệ thống hỗ trợ sẵn kho ảnh đĩa tự động cài đặt tất cả các hệ điều hành phổ biến nhất (Windows Server, Ubuntu, CentOS, Rocky Linux, Debian). Ngoài ra, bạn hoàn toàn có thể tự tải lên tập tin ảnh đĩa ISO cấu hình riêng biệt của doanh nghiệp mình để cài đặt."
              },
              {
                q: "Viettel Kubernetes Service (vK8s) có tự động nâng cấp phiên bản không?",
                a: "Hệ thống vK8s hỗ trợ cập nhật an toàn không gây gián đoạn cụm ứng dụng (Zero-downtime rolling update). Bạn có thể tự chọn thời điểm bảo trì thích hợp để hệ thống tự động cập nhật phiên bản Control plane và worker nodes."
              },
              {
                q: "Lưu lượng truyền tải dữ liệu (Data Transfer) được tính phí thế nào?",
                a: "Khác với các nhà cung cấp đám mây quốc tế tính phí Egress Data Transfer rất đắt đỏ, Viettel IDC miễn phí hoàn toàn 100% lưu lượng truyền tải dữ liệu vào/ra cả băng thông trong nước lẫn quốc tế. Bạn chỉ thanh toán một mức băng thông cố định theo cổng kết nối."
              },
              {
                q: "Làm cách nào để chuyển dữ liệu cũ từ AWS/Azure về Viettel IDC?",
                a: "Đội ngũ kỹ sư giải pháp mạng và hệ thống của Viettel IDC túc trực 24/7 hỗ trợ tư vấn thiết kế kiến trúc và di chuyển dữ liệu (Migration) miễn phí. Cam kết bảo toàn dữ liệu tuyệt đối và không gián đoạn hoạt động kinh doanh trực tuyến của bạn."
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
      <section id="consultation" className="relative py-20 lg:py-28 bg-gradient-to-br from-[#8A001A] via-[#660011] to-[#3B0007] overflow-hidden text-white font-sans">
        {/* Subtle grid and decorative glow spots */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#EE0033]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#EE0033]/20 blur-[150px] pointer-events-none" />

        <div className="ali-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[#FF4D6D] font-bold text-xs uppercase tracking-widest block bg-[#FF4D6D]/10 px-3 py-1 rounded-full w-max">
                BỨT PHÁ KINH DOANH TRÊN NỀN TẢNG SỐ VỮNG CHẮC
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Tư vấn chuyên sâu Điện toán & Container
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Nhận cố vấn chuyên sâu về hạ tầng đám mây tự chủ, an toàn và bảo mật cao chuẩn quốc tế. Đội ngũ Kiến trúc sư giải pháp của chúng tôi sẽ khảo sát, thiết kế hệ thống tối ưu chi phí và hỗ trợ dịch chuyển dữ liệu miễn phí.
              </p>

              <div className="pt-4 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-white/90 text-sm font-semibold leading-relaxed">
                    Tư vấn 1-1 chuyên sâu cùng chuyên gia cấp cao
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-white/90 text-sm font-semibold leading-relaxed">
                    Bảo đảm an toàn dữ liệu và cam kết chất lượng dịch vụ SLA 99.99%
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl text-neutral-900 max-w-lg mx-auto lg:ml-auto relative border border-neutral-100">
                
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight">
                    Đăng ký tư vấn giải pháp
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1.5">
                    Cung cấp phương thức liên hệ chính xác
                  </p>
                </div>

                {ctaSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-neutral-900">Gửi yêu cầu thành công!</h4>
                      <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                        Chuyên gia giải pháp của Viettel IDC sẽ liên hệ lại qua số điện thoại của bạn trong vòng 15 phút tới.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="space-y-4 text-left">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700">Họ và tên của bạn</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                          <User className="w-4 h-4" />
                        </span>
                        <input 
                          type="text"
                          required
                          value={ctaForm.name}
                          onChange={(e) => setCtaForm({ ...ctaForm, name: e.target.value })}
                          placeholder="Ví dụ: Nguyễn Văn Vương"
                          className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                        />
                      </div>
                    </div>

                    {/* Email and Phone inputs row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-neutral-700">Email</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input 
                            type="email"
                            required
                            value={ctaForm.email}
                            onChange={(e) => setCtaForm({ ...ctaForm, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-neutral-700">Số điện thoại</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input 
                            type="tel"
                            required
                            value={ctaForm.phone}
                            onChange={(e) => setCtaForm({ ...ctaForm, phone: e.target.value })}
                            placeholder="Ví dụ: 098xxxxx7"
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Solutions dropdown select */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700">Hạ tầng / Giải pháp quan tâm</label>
                      <div className="relative">
                        <select
                          value={ctaForm.solution}
                          onChange={(e) => setCtaForm({ ...ctaForm, solution: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] appearance-none font-medium transition-all"
                        >
                          <option value="Cloud Computing (Viettel Cloud Server)">Viettel Cloud Server</option>
                          <option value="Viettel Kubernetes Service (vK8s)">Viettel Kubernetes Service (vK8s)</option>
                          <option value="Viettel Private Cloud">Viettel Private Cloud</option>
                          <option value="Viettel Dedicated Private Cloud">Viettel Dedicated Private Cloud</option>
                          <option value="Viettel GPU Cloud">Viettel GPU Cloud</option>
                        </select>
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
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

      {/* FOOTER */}
      <Footer />
      <ScreenSwitcher />
    </div>
  );
}
