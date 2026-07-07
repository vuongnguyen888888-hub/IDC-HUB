'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Sparkles, Zap, Layers, Activity, Network, Database, Settings, 
  Calculator, Shield, Globe, Check, AlertCircle, Clock, Bell, 
  Phone, BookOpen, Lock, ArrowUpRight, ChevronRight, ChevronDown,
  Server, Cpu
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import ScreenSwitcher from './ScreenSwitcher';

export default function ViettelCloudServerPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'vmware' | 'openstack'>('vmware');
  const [selectedPricingPlan, setSelectedPricingPlan] = useState<'saving' | 'payg'>('saving');
  const [selectedRegion, setSelectedRegion] = useState<'north' | 'south'>('north');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const overviewTitle = selectedPlatform === 'vmware' 
    ? 'Hạ tầng ảo hóa VMware vSphere hàng đầu doanh nghiệp'
    : 'Hạ tầng đám mây mã nguồn mở OpenStack tối ưu chi phí';
    
  const overviewDesc = selectedPlatform === 'vmware'
    ? 'Dịch vụ máy chủ ảo Viettel Cloud Server chạy trên nền tảng ảo hóa VMware vSphere chính hãng, cam kết tài nguyên vật lý cô lập, hiệu năng tính toán đỉnh cao và sẵn sàng đáp ứng các ứng dụng doanh nghiệp cốt lõi.'
    : 'Viettel Cloud Server trên nền tảng mã nguồn mở OpenStack chuẩn hóa quốc tế mang lại cho doanh nghiệp khả năng tự động hóa vượt trội, co giãn linh hoạt, tính tương thích API cực cao và giảm tới 30% chi phí bản quyền.';

  const overviewCards = selectedPlatform === 'vmware' ? [
    {
      icon: Layers,
      title: "Hiệu năng VMware tối ưu",
      desc: "Mỗi máy chủ ảo VMware được phân bổ tài nguyên CPU/RAM vật lý chuyên dụng biệt lập hoàn toàn, kết hợp SSD Enterprise SAN RAID 10 cam kết IOPS thực cực cao không nghẽn mạch."
    },
    {
      icon: Settings,
      title: "Quản trị vCenter cao cấp",
      desc: "Tự động hóa hoàn chỉnh thông qua cổng portal hiện đại, hỗ trợ tạo nhanh snapshot, quản lý backup chu kỳ chặt chẽ và cơ chế khôi phục thảm họa DRS/HA tự động."
    },
    {
      icon: Shield,
      title: "Hạ tầng bảo mật tuyệt đối",
      desc: "Triển khai trên các cụm máy chủ Dell, Cisco chính hãng đặt tại Data Center chuẩn Rated 3 cao nhất của Viettel. Đáp ứng chuẩn bảo mật khắt khe như PCI-DSS, ISO 27017."
    }
  ] : [
    {
      icon: Layers,
      title: "Tối ưu chi phí OpenStack",
      desc: "Sử dụng nền tảng ảo hóa mã nguồn mở OpenStack giúp triệt tiêu hoàn toàn chi phí bản quyền phần mềm, mang lại đơn giá tối ưu nhất trên từng đơn vị vCPU/RAM."
    },
    {
      icon: Settings,
      title: "Hệ sinh thái API chuẩn hóa",
      desc: "Hỗ trợ đầy đủ các API tiêu chuẩn OpenStack, giúp lập trình viên và kỹ sư DevOps dễ dàng tích hợp mượt mà với Terraform, Ansible và các công cụ tự động hóa CI/CD."
    },
    {
      icon: Shield,
      title: "Đàn hồi & Cloud-Native",
      desc: "Cơ chế co giãn tự động linh hoạt kết hợp với hệ thống lưu trữ phân tán Distributed Ceph Storage, cực kỳ phù hợp cho kiến trúc microservices và cụm Kubernetes cluster."
    }
  ];

  const pricingPlans = selectedPlatform === 'vmware' ? [
    {
      id: "cs1",
      name: "Gói VM1 (VMware)",
      badge: "CẤU HÌNH TIÊU CHUẨN",
      tag: "Standard VM",
      savingPrice: "614.000 đ",
      paygPrice: "~ 840 đ",
      specs: ["2 vCPU (Dedicated)", "4 GB RAM", "20 GB Enterprise SSD", "300 Mbps Băng thông Internet", "Unlimited Lưu lượng chuyển tải", "1 IPv4 Public mặc định"],
      featured: false
    },
    {
      id: "cs2",
      name: "Gói VM2 (VMware)",
      badge: "ĐƯỢC CHỌN NHIỀU NHẤT",
      tag: "PHỔ BIẾN NHẤT",
      savingPrice: "908.000 đ",
      paygPrice: "~ 1.240 đ",
      specs: ["4 vCPU (Dedicated)", "4 GB RAM", "40 GB Enterprise SSD", "300 Mbps Băng thông Internet", "Unlimited Lưu lượng chuyển tải", "1 IPv4 Public mặc định"],
      featured: true
    },
    {
      id: "cs3",
      name: "Gói VM3 (VMware)",
      badge: "CẤU HÌNH CAO CẤP",
      tag: "Professional VM",
      savingPrice: "1.356.000 đ",
      paygPrice: "~ 1.850 đ",
      specs: ["4 vCPU (Dedicated)", "8 GB RAM", "80 GB Enterprise SSD", "300 Mbps Băng thông Internet", "Unlimited Lưu lượng chuyển tải", "1 IPv4 Public mặc định"],
      featured: false
    },
    {
      id: "cs4",
      name: "Gói VM4 (VMware)",
      badge: "CẤU HÌNH TỐI ĐA",
      tag: "Enterprise VM",
      savingPrice: "2.584.000 đ",
      paygPrice: "~ 3.540 đ",
      specs: ["8 vCPU (Dedicated)", "16 GB RAM", "120 GB Enterprise SSD", "300 Mbps Băng thông Internet", "Unlimited Lưu lượng chuyển tải", "1 IPv4 Public mặc định"],
      featured: false
    }
  ] : [
    {
      id: "os1",
      name: "Gói OS1 (OpenStack)",
      badge: "CẤU HÌNH TIÊU CHUẨN",
      tag: "Standard VM (OpenStack)",
      savingPrice: "522.000 đ",
      paygPrice: "~ 715 đ",
      specs: ["2 vCPU (Shared/Burst)", "4 GB RAM", "20 GB Distributed NVMe", "300 Mbps Băng thông Internet", "Unlimited Lưu lượng chuyển tải", "1 IPv4 Public mặc định"],
      featured: false
    },
    {
      id: "os2",
      name: "Gói OS2 (OpenStack)",
      badge: "ĐƯỢC CHỌN NHIỀU NHẤT",
      tag: "PHỔ BIẾN NHẤT",
      savingPrice: "772.000 đ",
      paygPrice: "~ 1.050 đ",
      specs: ["4 vCPU (Shared/Burst)", "4 GB RAM", "40 GB Distributed NVMe", "300 Mbps Băng thông Internet", "Unlimited Lưu lượng chuyển tải", "1 IPv4 Public mặc định"],
      featured: true
    },
    {
      id: "os3",
      name: "Gói OS3 (OpenStack)",
      badge: "CẤU HÌNH CAO CẤP",
      tag: "Professional VM",
      savingPrice: "1.152.000 đ",
      paygPrice: "~ 1.570 đ",
      specs: ["4 vCPU (Shared/Burst)", "8 GB RAM", "80 GB Distributed NVMe", "300 Mbps Băng thông Internet", "Unlimited Lưu lượng chuyển tải", "1 IPv4 Public mặc định"],
      featured: false
    },
    {
      id: "os4",
      name: "Gói OS4 (OpenStack)",
      badge: "CẤU HÌNH TỐI ĐA",
      tag: "Enterprise VM",
      savingPrice: "2.196.000 đ",
      paygPrice: "~ 3.010 đ",
      specs: ["8 vCPU (Shared/Burst)", "16 GB RAM", "120 GB Distributed NVMe", "300 Mbps Băng thông Internet", "Unlimited Lưu lượng chuyển tải", "1 IPv4 Public mặc định"],
      featured: false
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 80; // subnav offset buffer
      
      const sections = ['overview', 'pricing', 'features', 'benefits', 'platform-selector', 'use-cases', 'faq'];
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
    handleScroll(); // initial call
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

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section id="hero-section" className="relative overflow-hidden bg-[#1A1A1A] text-white py-16 md:py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png')` }}
        />
        
        <div className="ali-container relative z-10 text-left flex flex-col items-start py-6 w-full">
          <div className="space-y-6 max-w-3xl flex flex-col items-start">
            <div className="inline-flex items-center space-x-2 bg-[#EE0033]/10 border border-[#EE0033]/30 px-3 py-1.5 rounded-full text-[#EE0033] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EE0033] mr-1 animate-ping" />
              {selectedPlatform === 'vmware' ? 'ĐIỆN TOÁN ĐÁM MÂY · VMware vSphere' : 'ĐIỆN TOÁN ĐÁM MÂY · OpenStack cloud'}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans">
              <span className="block md:whitespace-nowrap">Viettel Cloud Server</span>
              <span className="text-white block md:whitespace-nowrap">Hiệu năng vượt trội, an toàn tuyệt đối</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {selectedPlatform === 'vmware' 
                ? 'Máy chủ ảo cấu hình cao trên nền tảng ảo hóa VMware vSphere hàng đầu. Tối ưu hiệu năng, nâng cấp tài nguyên tức thì và đảm bảo an toàn dữ liệu chuẩn quốc tế cho mọi hoạt động kinh doanh số.'
                : 'Máy chủ ảo hiệu năng cao vận hành trên nền tảng đám mây mã nguồn mở OpenStack tiêu chuẩn quốc tế. Tự động hóa linh hoạt, co giãn thông minh, tương thích API tối đa và tiết kiệm chi phí bản quyền.'}
            </p>
            
            {/* CTA buttons removed per user request */}
          </div>
        </div>
      </section>

      {/* STICKY TAB NAVIGATION MENU */}
      <div className="sticky top-0 z-[1010] bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm transition-all duration-300">
        <div className="ali-container">
          <div className="flex items-center justify-between h-[64px]">
            
            {/* Left side: Product Name & Tabs */}
            <div className="flex items-center gap-4 lg:gap-6 overflow-hidden h-full">
              
              {/* Platform Switcher Buttons cạnh trái "Tổng quan" */}
              <div className="hidden lg:flex items-center gap-2.5 shrink-0 font-sans my-auto">
                <button
                  onClick={() => setSelectedPlatform('vmware')}
                  className={`flex items-center gap-1.5 h-[36px] px-4 rounded-[8px] text-[13.5px] transition-all duration-300 cursor-pointer ${
                    selectedPlatform === 'vmware'
                      ? 'bg-[#EE0033] text-white font-semibold hover:bg-[#FF302D] shadow-sm'
                      : 'border border-[#D0D0D0] bg-white text-[#344054] font-medium hover:bg-gray-50'
                  }`}
                >
                  <Server className="w-4 h-4" />
                  <span>Nền tảng VMware</span>
                </button>
                <button
                  onClick={() => setSelectedPlatform('openstack')}
                  className={`flex items-center gap-1.5 h-[36px] px-4 rounded-[8px] text-[13.5px] transition-all duration-300 cursor-pointer ${
                    selectedPlatform === 'openstack'
                      ? 'bg-[#EE0033] text-white font-semibold hover:bg-[#FF302D] shadow-sm'
                      : 'border border-[#D0D0D0] bg-white text-[#344054] font-medium hover:bg-gray-50'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>Nền tảng OpenStack</span>
                </button>
              </div>
              
              {/* Desktop Tabs */}
              <div className="hidden md:flex items-center gap-5 lg:gap-7 h-full">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'pricing', label: 'Bảng giá' },
                  { id: 'features', label: 'Tính năng' },
                  { id: 'benefits', label: 'Lợi ích' },
                  { id: 'platform-selector', label: 'Nền tảng' },
                  { id: 'use-cases', label: 'Use cases' },
                  { id: 'faq', label: 'Hỏi đáp' }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`relative h-[64px] px-1 text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center ${
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
                  { id: 'platform-vmware', label: 'VMware ⚡', isPlatform: true, active: selectedPlatform === 'vmware' },
                  { id: 'platform-openstack', label: 'OpenStack 🌐', isPlatform: true, active: selectedPlatform === 'openstack' },
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'pricing', label: 'Bảng giá' },
                  { id: 'features', label: 'Tính năng' },
                  { id: 'use-cases', label: 'Use cases' },
                  { id: 'faq', label: 'Hỏi đáp' }
                ].map((tab) => {
                  const isActive = tab.isPlatform ? tab.active : activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (tab.id === 'platform-vmware') {
                          setSelectedPlatform('vmware');
                        } else if (tab.id === 'platform-openstack') {
                          setSelectedPlatform('openstack');
                        } else {
                          scrollToSection(tab.id);
                        }
                      }}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        isActive 
                          ? tab.isPlatform 
                            ? 'text-white bg-[#EE0033]' 
                            : 'text-[#EE0033] bg-red-50' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => scrollToSection('benefits')}
                className="px-5 py-2 md:py-2.5 bg-white border border-[#D0D5DD] text-[#344054] font-bold text-[10px] md:text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-xs cursor-pointer whitespace-nowrap shrink-0 hover:bg-gray-950 hover:text-white hover:border-gray-950"
              >
                Xem tài liệu
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION OVERVIEW — TỔNG QUAN VIETTEL CLOUD SERVER */}
      <section id="overview" className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">TỔNG QUAN DỊCH VỤ</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              {overviewTitle}
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              {overviewDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {overviewCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033]/30 transition-colors duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE0033] flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-950 mb-3">{card.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section id="pricing" className="py-16 md:py-20 bg-[#FAFAFA] border-y border-gray-200/50">
        <div className="ali-container">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-10"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">CHI PHÍ TỐI ƯU</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Bảng giá dịch vụ Cloud Server
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Lựa chọn mô hình thanh toán linh hoạt phù hợp với định mức ngân sách của dự án. Thanh toán theo giờ sử dụng hoặc gói tiết kiệm dài hạn.
            </p>
          </motion.div>

          {/* SEGMENTED SWITCHERS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">Nền tảng ảo hóa:</span>
              <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/50">
                <button
                  onClick={() => setSelectedPlatform('vmware')}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                    selectedPlatform === 'vmware'
                      ? 'bg-[#EE0033] text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 bg-transparent cursor-pointer'
                  }`}
                >
                  Nền tảng VMware
                </button>
                <button
                  onClick={() => setSelectedPlatform('openstack')}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                    selectedPlatform === 'openstack'
                      ? 'bg-[#EE0033] text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 bg-transparent cursor-pointer'
                  }`}
                >
                  Nền tảng OpenStack
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">Mô hình thanh toán:</span>
              <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/50">
                <button
                  onClick={() => setSelectedPricingPlan('saving')}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                    selectedPricingPlan === 'saving'
                      ? 'bg-[#EE0033] text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 bg-transparent cursor-pointer'
                  }`}
                >
                  Saving Plan (Tháng)
                </button>
                <button
                  onClick={() => setSelectedPricingPlan('payg')}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                    selectedPricingPlan === 'payg'
                      ? 'bg-[#EE0033] text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 bg-transparent cursor-pointer'
                  }`}
                >
                  Pay-as-you-go (Giờ)
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">Khu vực hạ tầng:</span>
              <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/50">
                <button
                  onClick={() => setSelectedRegion('north')}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                    selectedRegion === 'north'
                      ? 'bg-[#EE0033] text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 bg-transparent cursor-pointer'
                  }`}
                >
                  Hạ tầng Miền Bắc
                </button>
                <button
                  onClick={() => setSelectedRegion('south')}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                    selectedRegion === 'south'
                      ? 'bg-[#EE0033] text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 bg-transparent cursor-pointer'
                  }`}
                >
                  Hạ tầng Miền Nam
                </button>
              </div>
            </div>
          </motion.div>

          {/* PRICING CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-left items-stretch">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className={`bg-white rounded-3xl overflow-hidden flex flex-col justify-between transition-colors duration-300 relative p-6 md:p-7 border ${
                  plan.featured 
                    ? 'border-2 border-[#EE0033]/70 shadow-[0_16px_36px_rgba(238,0,51,0.08)] hover:shadow-[0_20px_40px_rgba(238,0,51,0.12)]' 
                    : 'border-gray-200 hover:border-[#EE0033]/40 shadow-xs hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Top section rounded card-within-card background like image */}
                  <div className="bg-[#F8F9FA] border-b border-gray-200/60 -mx-6 -mt-6 md:-mx-7 md:-mt-7 p-6 md:p-7 mb-6 relative rounded-t-[22px] md:rounded-t-[26px]">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-950 tracking-tight">{plan.name}</h3>
                      {plan.featured && (
                        <span className="bg-[#EE0033]/10 text-[#EE0033] text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md flex items-center gap-0.5">
                          ★ BÁN CHẠY
                        </span>
                      )}
                    </div>
                    
                    <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mt-1 mb-3">
                      {plan.tag}
                    </div>
                    
                    <div className="mb-1 flex items-baseline gap-1.5">
                      <span className="text-3xl md:text-4xl font-black text-[#EE0033] tracking-tight">
                        {selectedPricingPlan === 'saving' ? plan.savingPrice.replace(' đ', '') : plan.paygPrice.replace(' đ', '')}
                      </span>
                      <div className="flex flex-col text-[9px] text-gray-400 uppercase tracking-widest font-black leading-tight select-none">
                        <span className="text-gray-950 font-black">VND</span>
                        <span>{selectedPricingPlan === 'saving' ? '/ Tháng' : '/ Giờ'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features section layout */}
                  <div className="mb-4 text-left px-1">
                    <span className="text-xs font-extrabold text-gray-950 uppercase tracking-wider block">Tính năng</span>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">Cấu hình chi tiết bao gồm:</span>
                  </div>

                  <ul className="space-y-3.5 text-[11px] md:text-xs text-gray-650 px-1 mb-6">
                    {plan.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full border border-red-100 bg-red-50/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#EE0033] stroke-[3.5]" />
                        </div>
                        <span className={`${sIdx < 3 ? 'font-bold text-gray-950' : 'text-gray-650'} leading-tight`}>
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 px-1">
                  <a 
                    href="https://console.viettelidc.com.vn" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full block py-3 text-center font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 ${
                      plan.featured
                        ? 'bg-[#EE0033] hover:bg-[#FF1A4E] text-white shadow-[0_4px_14px_rgba(238,0,51,0.25)]'
                        : 'border border-[#EE0033] hover:bg-[#EE0033] text-[#EE0033] hover:text-white bg-transparent'
                    }`}
                  >
                    Đăng ký ngay
                  </a>
                  <a 
                    href="https://console.viettelidc.com.vn" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block py-3 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 text-center font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300"
                  >
                    Dùng thử miễn phí
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom config callout */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto space-y-3.5 mt-8 text-left"
          >
            <div className="bg-slate-950 text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#EE0033_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <h4 className="text-base md:text-lg font-bold">Cấu hình tùy chỉnh — Thiết kế riêng theo nhu cầu</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-2xl">
                  Cần giải pháp lớn hơn? Chúng tôi hỗ trợ may đo cấu hình riêng biệt lên tới 32 vCPU, 128 GB RAM và hàng chục Terabyte SSD Enterprise với cam kết SLA cao nhất.
                </p>
              </div>
              <a 
                href="/contact"
                className="relative z-10 px-6 py-3 bg-[#EE0033] hover:bg-[#FF1A4E] text-white font-bold text-xs uppercase tracking-wider rounded-full text-center transition-all duration-300 hover:shadow-[0_4px_14px_rgba(238,0,51,0.4)] hover:-translate-y-0.5 whitespace-nowrap cursor-pointer self-start sm:self-center"
              >
                Liên hệ nhận báo giá
              </a>
            </div>
            <p className="text-[10px] text-gray-400 italic">
              * Toàn bộ bảng giá dịch vụ chưa bao gồm thuế VAT (10%). Quý khách có thể điều chỉnh cấu hình bất cứ lúc nào trong bảng điều khiển.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — FEATURE HIGHLIGHTS */}
      <section id="features" className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">TÍNH NĂNG VƯỢT TRỘI</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Tính năng của Viettel Cloud Server
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Cung cấp đầy đủ các tính năng của một máy chủ ảo chuyên nghiệp, phục vụ tốt mọi nhu cầu chuyển đổi số của doanh nghiệp.
            </p>
          </motion.div>

          <div className="ali-grid-3">
            {[
              {
                icon: Zap,
                title: "Khởi tạo siêu nhanh",
                desc: "Khởi tạo máy chủ ảo nhanh chóng bằng công nghệ Fast-Provisioning. Tạo 1 hoặc nhiều VM bằng vài click chuột từ catalog có sẵn."
              },
              {
                icon: Layers,
                title: "Co giãn tài nguyên không giới hạn",
                desc: "Nâng cấp tài nguyên nhanh chóng nhờ tính năng hot-add CPU, RAM, Storage. Linh hoạt mở rộng hoặc thu hẹp theo nhu cầu thời gian thực."
              },
              {
                icon: Activity,
                title: "Giám sát thời gian thực",
                desc: "Giám sát hiệu năng dạng biểu đồ của máy chủ ảo theo thời gian thực. Cảnh báo khi hiệu suất hoạt động của VM vượt ngưỡng."
              },
              {
                icon: Network,
                title: "Phân cụm & cân bằng tải",
                desc: "Công nghệ phân cụm Cluster và tính năng DRS cân bằng tài nguyên, đảm bảo hiệu suất ổn định, tránh quá tải và tranh chấp tài nguyên."
              },
              {
                icon: Database,
                title: "Sao lưu & dự phòng",
                desc: "Sao lưu máy chủ ảo theo số bản backup và chu kỳ. Dữ liệu lưu trữ trên hạ tầng SAN với RAID Controller dự phòng mức ổ đĩa."
              },
              {
                icon: Settings,
                title: "Giao diện quản trị Automation",
                desc: "Tự thực hiện bật/tắt/khởi động lại VM, chụp snapshot, theo dõi CPU/RAM/IOPS/Bandwidth trực tiếp trên giao diện. Không cần liên hệ hỗ trợ."
              }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-gray-200/80 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-colors duration-300 group cursor-pointer text-left shadow-xs"
                >
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FAFAFA] text-[#EE0033] border border-gray-100 transition-all duration-300 group-hover:bg-[#FFF0F2] group-hover:border-[#FCD9D8]">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-sm md:text-base text-gray-950 tracking-tight group-hover:text-[#EE0033] transition-colors duration-200">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — KEY BENEFITS */}
      <section id="benefits" className="py-16 md:py-20 bg-[#FAFAFA] border-y border-gray-200/50">
        <div className="ali-container">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ƯU THẾ DOANH NGHIỆP</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Lợi ích chính cho doanh nghiệp
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Tối ưu hóa chi phí vận hành doanh nghiệp với cam kết bảo mật quốc tế và băng thông siêu tốc.
            </p>
          </motion.div>

          <div className="ali-grid-4">
            {[
              {
                icon: Calculator,
                title: "Tiết kiệm chi phí",
                desc: "Giảm đáng kể chi phí xây dựng, đầu tư cơ sở hạ tầng mạng. Pay as you Go cho phép chỉ thanh toán cho những gì mình sử dụng."
              },
              {
                icon: Shield,
                title: "Bảo mật chuẩn ISO 27017",
                desc: "Mức độ bảo mật đạt tiêu chuẩn ISO 27017 dành riêng cho dịch vụ Cloud. Bảo vệ máy chủ khỏi các rủi ro an ninh mạng lớn."
              },
              {
                icon: Server,
                title: "Độ sẵn sàng cao",
                desc: "Hoạt động trên công nghệ phân cụm máy chủ clusters, cơ chế dự phòng — khi VM bị lỗi sẽ được thay thế tại host khác ngay lập tức."
              },
              {
                icon: Globe,
                title: "Băng thông 300 Mbps · Unlimited",
                desc: "Tốc độ băng thông Internet mặc định 300 Mbps với dữ liệu truyền tải không giới hạn. Kết nối mạng 10Gbps giữa các nodes."
              }
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-gray-200/80 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-colors duration-300 group cursor-pointer text-left shadow-xs"
                >
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FAFAFA] text-[#EE0033] border border-gray-100 transition-all duration-300 group-hover:bg-[#FFF0F2] group-hover:border-[#FCD9D8]">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-sm md:text-base text-gray-950 tracking-tight group-hover:text-[#EE0033] transition-colors duration-200">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PLATFORM SELECTOR */}
      <section id="platform-selector" className="py-16 md:py-20 bg-white">
        <div className="ali-container">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">NỀN TẢNG LINH HOẠT</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Tùy chọn nền tảng máy chủ ảo
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Viettel IDC cung cấp 2 tùy chọn công nghệ máy chủ ảo hàng đầu thế giới, đáp ứng tốt từ các hệ thống doanh nghiệp truyền thống đến mô hình cloud-native.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-left">
            {/* VMware Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPlatform('vmware')}
              className={`cursor-pointer rounded-2xl p-6 md:p-8 transition-colors duration-300 border-2 flex flex-col justify-between relative ${
                selectedPlatform === 'vmware' 
                  ? 'border-[#EE0033] bg-white shadow-[0_12px_32px_rgba(238,0,51,0.06)]' 
                  : 'border-gray-200 bg-gray-50/30 hover:bg-gray-50/80 shadow-xs'
              }`}
            >
              <div>
                {selectedPlatform === 'vmware' && (
                  <div className="absolute top-6 right-6 bg-[#EE0033] text-white p-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-950">VMware vSphere</h3>
                  <span className="bg-[#EE0033]/10 text-[#EE0033] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Enterprise Grade
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6">
                  Nền tảng ảo hóa doanh nghiệp mạnh mẽ với độ tin cậy tuyệt đối, tính bảo mật nghiêm ngặt và khả năng tương thích phần cứng cao hàng đầu thế giới.
                </p>
                
                <div className="space-y-3 border-t border-gray-100 pt-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thành phần & Tính năng:</h4>
                  <ul className="space-y-2.5 text-xs text-gray-700">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                      <span>VMware ESXi Server — lớp ảo hóa chạy trực tiếp trên bare-metal</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                      <span>VMware vCenter — hệ thống điều phối, quản trị tập trung tối ưu</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                      <span>Giao diện vSphere Web Client — quản trị trực quan, tiện lợi</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                      <span>Cluster DRS & HA — tự động khôi phục, di chuyển nóng VM</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phù hợp nhất cho:</span>
                <span className="bg-[#FAFAFA] border border-gray-200 text-gray-750 text-[11px] font-bold px-3 py-1 rounded-full">
                  Enterprise · Hybrid Cloud
                </span>
              </div>
            </motion.div>

            {/* OpenStack Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPlatform('openstack')}
              className={`cursor-pointer rounded-2xl p-6 md:p-8 transition-colors duration-300 border-2 flex flex-col justify-between relative ${
                selectedPlatform === 'openstack' 
                  ? 'border-[#EE0033] bg-white shadow-[0_12px_32px_rgba(238,0,51,0.06)]' 
                  : 'border-gray-200 bg-gray-50/30 hover:bg-gray-50/80 shadow-xs'
              }`}
            >
              <div>
                {selectedPlatform === 'openstack' && (
                  <div className="absolute top-6 right-6 bg-[#EE0033] text-white p-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-950">OpenStack</h3>
                  <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Open Source API
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6">
                  Nền tảng điện toán đám mây mã nguồn mở chuẩn công nghiệp toàn cầu, mang lại khả năng tùy biến tuyệt đối, tự động hóa linh hoạt dạng IaaS.
                </p>
                
                <div className="space-y-3 border-t border-gray-100 pt-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thành phần & Tính năng:</h4>
                  <ul className="space-y-2.5 text-xs text-gray-700">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                      <span>Kiến trúc mở hoàn toàn, không lo lock-in nhà cung cấp</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                      <span>Khả năng mở rộng tuyệt vời cho container & K8s</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                      <span>Hệ thống API chuẩn, hỗ trợ tự động hóa hạ tầng (IAC)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                      <span>Lưu trữ phân tán, đảm bảo an toàn dữ liệu 100% tại VN</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phù hợp nhất cho:</span>
                <span className="bg-[#FAFAFA] border border-gray-200 text-gray-750 text-[11px] font-bold px-3 py-1 rounded-full">
                  DevOps · Cloud-native
                </span>
              </div>
            </motion.div>
          </div>

          <div className="w-full bg-amber-50/60 border border-amber-100 rounded-2xl p-5 flex items-center space-x-3 text-left">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs md:text-sm text-amber-800 font-medium">
              <strong>Lưu ý quan trọng:</strong> Để đảm bảo tính toàn vẹn của dữ liệu và hiệu năng phần cứng, Viettel IDC hiện chưa hỗ trợ chuyển đổi trực tiếp giữa 2 công nghệ ảo hóa (VMware và OpenStack) đối với các máy chủ ảo đang hoạt động.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — USE CASES + DỊCH VỤ BỔ SUNG */}
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
              Môi trường máy chủ ảo tối ưu đáp ứng linh hoạt các kịch bản vận hành thực tế của doanh nghiệp, mang lại hiệu năng vượt trội và tính an toàn cao.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {[
              {
                num: "①",
                title: "Triển khai ứng dụng trên ĐTĐM",
                desc: "Môi trường hoàn hảo cho hoạt động Quảng cáo, môi trường Dev/test, Website giới thiệu và các hệ thống quản trị CRM của doanh nghiệp."
              },
              {
                num: "②",
                title: "Private & Security (Ngân hàng, TMĐT)",
                desc: "Cung cấp phân vùng mạng độc lập, an toàn và bảo mật khép kín lý tưởng cho các giao dịch tài chính, thương mại điện tử bảo mật cao."
              },
              {
                num: "③",
                title: "Mission-Critical (Oracle · SAP · ERP)",
                desc: "Đáp ứng tài nguyên tính toán mạnh mẽ, độ trễ cực thấp cho các ứng dụng cơ sở dữ liệu lớn và các hệ thống quản trị nguồn lực doanh nghiệp ERP lõi."
              },
              {
                num: "④",
                title: "Multi-Cloud (VPN · Hybrid Connect)",
                desc: "Thiết lập mô hình đám mây lai linh hoạt, kết nối an toàn bảo mật cao giữa On-premise và Cloud công cộng qua kênh VPN bảo mật."
              }
            ].map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 text-left transition-colors duration-300 hover:border-[#EE0033]/30 shadow-xs hover:shadow-md flex gap-5 cursor-pointer"
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

        {/* SECTION 10 — DOCS & SUPPORT */}
        <section id="docs-support" className="py-16 md:py-20 bg-white">
          <div className="ali-container">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-left w-full space-y-2 mb-12"
            >
              <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">TÀI LIỆU & TRỢ GIÚP</span>
              <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
                Hỗ trợ kỹ thuật & Hướng dẫn sử dụng
              </h2>
              <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
                Dễ dàng làm chủ hạ tầng đám mây với kho tài liệu tự phục vụ phong phú hoặc kết nối trực tiếp với đội ngũ chuyên gia kỹ sư 24/7.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="border border-gray-300/70 rounded-2xl p-6 md:p-8 bg-gray-50/40 hover:bg-gray-100/50 transition-colors duration-300 text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gray-200 text-gray-700 flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-950 mb-2">Tài liệu kỹ thuật Cloud Server</h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                    Khám phá Quickstart guides, hướng dẫn thiết lập hệ điều hành, cấu hình mạng nâng cao và API Reference dành riêng cho lập trình viên.
                  </p>
                </div>
                <a 
                  href="https://docs.viettelidc.com.vn/cloud-server/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider rounded-[8px] transition-all duration-300 shadow-xs hover:shadow-sm self-start cursor-pointer"
                >
                  <span>Truy cập tài liệu</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="border border-[#EE0033]/30 rounded-2xl p-6 md:p-8 bg-[#EE0033]/[0.03] hover:bg-[#EE0033]/[0.06] transition-colors duration-300 text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EE0033]/10 text-[#EE0033] flex items-center justify-center mb-6">
                    <Phone className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-950 mb-2">Hỗ trợ kỹ thuật 24/7/365</h3>
                  <div className="space-y-2.5 mb-6 text-xs md:text-sm text-gray-600 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">Hotline miễn cước:</span>
                      <span className="font-semibold text-[#EE0033]">1800 8088 (Nhánh 1)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">Email hỗ trợ:</span>
                      <span className="font-semibold text-[#EE0033]">sales@viettelidc.com.vn</span>
                    </div>
                  </div>
                </div>
                <a 
                  href="https://support.viettelidc.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#EE0033] hover:bg-[#C8002B] text-white font-bold text-xs uppercase tracking-wider rounded-[8px] transition-all duration-300 shadow-xs hover:shadow-sm self-start cursor-pointer"
                >
                  <span>Gửi yêu cầu hỗ trợ</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 11 — RELATED PRODUCTS */}
        <section id="related-products" className="py-16 md:py-20 bg-gray-50/50 border-t border-gray-200/40">
          <div className="ali-container">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-left w-full space-y-2 mb-12"
            >
              <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">HỆ SINH THÁI</span>
              <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
                Sản phẩm liên quan
              </h2>
              <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
                Mở rộng hệ thống đám mây toàn diện của bạn với các giải pháp bổ trợ cao cấp, tích hợp mượt mà từ Viettel IDC.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                {
                  title: "Viettel Virtual Private Cloud",
                  desc: "Phân vùng đám mây dùng riêng độc lập tuyệt đối, tùy biến dải IP mạng, bảo mật biên cao cấp cho doanh nghiệp.",
                  link: "/services/compute/viettel-virtual-private-cloud"
                },
                {
                  title: "Viettel Cloud Backup",
                  desc: "Hệ thống sao lưu tự động lập lịch theo chu kỳ, cam kết bảo vệ dữ liệu vẹn toàn trước sự cố rò rỉ hoặc ransomware.",
                  link: "/services/storage/viettel-cloud-backup"
                },
                {
                  title: "Viettel Cloud Firewall",
                  desc: "Tường lửa đám mây bảo vệ hạ tầng máy chủ của bạn trước các cuộc xâm nhập trái phép và DDoS thời gian thực.",
                  link: "/services/security/viettel-cloud-firewall"
                },
                {
                  title: "Viettel StartDB",
                  desc: "Cơ sở dữ liệu dạng Managed Service tự động sao lưu, nâng cấp phiên bản và tối ưu tài nguyên tự động.",
                  link: "/services/database/viettel-startdb"
                }
              ].map((prod, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#EE0033]/30 transition-colors duration-300 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <div>
                    <h4 className="text-base font-bold text-gray-950 mb-2">{prod.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-5">
                      {prod.desc}
                    </p>
                  </div>
                  <Link href={prod.link} className="text-[#EE0033] font-bold text-xs hover:text-[#FF1A4E] inline-flex items-center gap-1 cursor-pointer self-start">
                    <span>Tìm hiểu thêm</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 12 — FAQ */}
        <section id="faq" className="py-16 md:py-20 bg-white">
          <div className="ali-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 text-left space-y-2.5"
              >
                <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">GÓC GIẢI ĐÁP</span>
                <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
                  Câu hỏi thường gặp
                </h2>
                <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                  Giải đáp chi tiết các thắc mắc phổ biến về dịch vụ điện toán đám mây Viettel Cloud Server giúp doanh nghiệp yên tâm vận hành.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-4"
              >
                {[
                  {
                    q: "Viettel Cloud Server là gì?",
                    a: "Dịch vụ máy chủ đám mây ảo hiệu năng vượt trội, đáp ứng tức thì các yêu cầu tài nguyên hạ tầng, đảm bảo tính sẵn sàng và tính bảo mật theo chuẩn Tier 3 quốc tế."
                  },
                  {
                    q: "Hệ thống hỗ trợ những tính năng bổ trợ nào?",
                    a: "Sẵn sàng tích hợp mượt mà các công nghệ nâng cao như vLoadbalancer, vFirewall quản lý cổng bảo mật, Snapshot trạng thái tức thì, Cloud Backup và chống tấn công DDoS L4 chuyên sâu."
                  },
                  {
                    q: "Tôi có được hưởng chương trình khuyến mại nào không?",
                    a: "Có, Viettel IDC luôn áp dụng mức chiết khấu cực kỳ hấp dẫn lên tới 20% khi quý khách ký hợp đồng dài hạn (từ 12 tháng trở lên) hoặc nâng cấp tài nguyên theo số lượng lớn."
                  },
                  {
                    q: "Tôi có thể chuyển đổi linh hoạt giữa gói Saving Plan và Pay-as-you-go không?",
                    a: "Hiện tại, để duy trì toàn vẹn dữ liệu phần cứng cũng như phân vùng tài nguyên cố định trên SAN, Viettel IDC chưa áp dụng chuyển đổi trực tiếp trên máy chủ ảo đang hoạt động."
                  },
                  {
                    q: "Làm sao để tôi nhận hỗ trợ khi gặp sự cố khẩn cấp?",
                    a: "Quý khách có thể gọi trực tiếp tới Hotline chăm sóc khách hàng 1800 8088 (Nhánh 1 - miễn phí cước) hoạt động 24/7/365, hoặc truy cập cổng portal để gửi yêu cầu hỗ trợ."
                  }
                ].map((faq, index) => {
                  const isOpen = openFAQ === index;
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => setOpenFAQ(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left transition-all hover:bg-gray-50/50 cursor-pointer"
                      >
                        <span className={`font-bold text-sm md:text-base ${isOpen ? 'text-[#EE0033]' : 'text-gray-950'}`}>
                          {faq.q}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-350 shrink-0 ${isOpen ? 'rotate-180 text-[#EE0033]' : ''}`} />
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 text-xs md:text-sm text-gray-500 leading-relaxed border-t border-gray-100/60 mt-2">
                          <p className="pt-3">{faq.a}</p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 13 — FINAL CTA */}
        <section id="final-cta" className="bg-[#090D1A] text-white py-16 md:py-24 text-left border-t border-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#EE0033_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="ali-container relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  Sẵn sàng nâng cấp doanh nghiệp của bạn lên Đám Mây?
                </h2>
                <p className="text-gray-450 text-sm md:text-base max-w-2xl leading-relaxed">
                  Liên hệ ngay với bộ phận chuyên viên tư vấn của Viettel IDC để khảo sát hệ thống, thiết kế giải pháp và nhận báo giá ưu đãi tốt nhất ngay hôm nay.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto shrink-0"
              >
                <a 
                  href="#pricing"
                  className="px-8 py-3.5 bg-[#EE0033] hover:bg-[#FF1A4E] text-white font-bold text-sm uppercase tracking-wider rounded-full text-center transition-all duration-300 hover:shadow-[0_4px_14px_rgba(238,0,51,0.5)] hover:-translate-y-0.5 cursor-pointer"
                >
                  Đăng ký trải nghiệm
                </a>
                <a 
                  href="#pricing"
                  className="px-8 py-3.5 bg-transparent border border-gray-600 hover:border-white text-gray-300 hover:text-white font-bold text-sm uppercase tracking-wider rounded-full text-center transition-all duration-300 cursor-pointer"
                >
                  Dùng thử miễn phí
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
        <ScreenSwitcher />
    </div>
  );
}
