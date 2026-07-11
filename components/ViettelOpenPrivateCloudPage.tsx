'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, Server, Shield, Sparkles, ArrowRight, CheckCircle2, 
  ChevronDown, Check, HelpCircle, HardDrive, Cpu, Database, 
  Network, Key, Layers, Award, Terminal, Briefcase, Activity, 
  AlertCircle, Phone, Globe, ChevronRight, CheckCircle, Flame
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import ScreenSwitcher from './ScreenSwitcher';

export default function ViettelOpenPrivateCloudPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeCase, setActiveCase] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const benefits = [
    {
      title: 'Tiết kiệm chi phí & Triển khai linh hoạt',
      desc: 'Tối ưu hóa từ 20% - 30% chi phí nghiên cứu, xây dựng và vận hành hệ thống so với việc tự triển khai. Linh hoạt thiết lập trên hạ tầng của Viettel IDC, của chính khách hàng hoặc bất kỳ trung tâm dữ liệu nào trên thế giới nhằm đáp ứng tính tuân thủ pháp lý tại khu vực sở tại.',
      icon: Cpu,
      stats: 'Tiết kiệm 20% - 30%'
    },
    {
      title: 'Riêng tư & Bảo mật tuyệt đối',
      desc: 'Sở hữu hệ thống tường lửa (Firewall) và phân vùng lưu trữ nội bộ riêng biệt, ngăn chặn hoàn toàn mọi nguy cơ truy cập trái phép từ bên thứ ba. Hệ thống cô lập vật lý độc lập lý tưởng cho các tổ chức Ngân hàng, Chứng khoán, Tín dụng, Thương mại điện tử và các Bộ Ban Ngành Nhà nước.',
      icon: Shield,
      stats: 'Cô lập vật lý 100%'
    },
    {
      title: 'Tự chủ & Khả năng mở rộng',
      desc: 'Xóa bỏ sự phức tạp về mặt công nghệ và tình trạng thiếu hụt nhân lực chuyên trách bằng gói dịch vụ hoàn chỉnh đã được kiểm định chất lượng. Hạ tầng mã nguồn mở đáp ứng năng lực nâng cấp, mở rộng tài nguyên không giới hạn trong tương lai.',
      icon: Layers,
      stats: 'Mở rộng vô hạn'
    }
  ];

  const features = [
    {
      title: 'Tự thiết lập Trung tâm dữ liệu ảo',
      desc: 'Khách hàng chủ động triển khai hệ thống vOPC với các mô-đun tích hợp chuẩn hóa do Viettel IDC thiết kế, đơn giản hóa quy trình cài đặt, quản trị và xử lý sự cố phát sinh.',
      icon: Network
    },
    {
      title: 'Giao diện quản trị chuyên nghiệp',
      desc: 'Cung cấp giao diện đồ họa trực quan trên trình duyệt web. Người dùng có toàn quyền khởi tạo, cấu hình, nâng cấp, xóa máy chủ ảo hoặc thiết lập các bản chụp hệ thống (Snapshot) theo thời gian thực.',
      icon: Terminal
    },
    {
      title: 'Giám sát tài nguyên thời gian thực',
      desc: 'Chủ động theo dõi chính xác các chỉ số hiệu năng bao gồm: RAM, CPU, IOPS và Băng thông (Bandwidth), giúp tối ưu hóa hiệu suất vận hành của từng ứng dụng.',
      icon: Activity
    },
    {
      title: 'Kho thư viện VM Template miễn phí',
      desc: 'Tích hợp sẵn kho tài nguyên mẫu (Template VM) công cộng miễn phí, giúp rút ngắn tối đa thời gian cấu hình và triển khai các lớp ứng dụng mới.',
      icon: Database
    }
  ];

  const useCases = [
    {
      industry: 'Khối Ngân hàng & Tổ chức Tài chính',
      icon: Award,
      challenge: 'Yêu cầu bảo mật nghiêm ngặt, dữ liệu giao dịch nhạy cảm phải lưu trữ bí mật, riêng biệt và tuân thủ các quy trình ATTT khắt khe của Ngân hàng Nhà nước.',
      solution: 'Triển khai cụm hạ tầng độc lập vật lý ngay tại Data Center đạt chuẩn Rated 3 của Viettel IDC. Cách ly hoàn toàn tài nguyên, tích hợp hệ thống tường lửa (Firewall) chuyên dụng để chạy ổn định các ứng dụng Core Banking, Oracle RAC mà không lo ngại rò rỉ dữ liệu sang bên thứ ba.'
    },
    {
      industry: 'Khối Bộ, Ban, Ngành & Doanh nghiệp Nhà nước',
      icon: Briefcase,
      challenge: 'Bắt buộc phải đáp ứng các chỉ tiêu về hạ tầng điện toán đám mây và tính tuân thủ pháp lý theo Thông tư 1145 của Bộ Thông tin và Truyền thông.',
      solution: 'Cung cấp môi trường đám mây riêng dùng riêng biệt được chứng nhận đáp ứng 100% tiêu chí của Bộ TT&TT. Giúp các đơn vị đơn giản hóa bài toán vận hành, quản trị thông tin công mà vẫn tự chủ và kiểm soát toàn diện hệ thống.'
    },
    {
      industry: 'Doanh nghiệp Thương mại điện tử & Fintech',
      icon: Cloud,
      challenge: 'Đòi hỏi hiệu năng xử lý cực cao, độ trễ thấp cho các đợt siêu sale, yêu cầu khả năng tính toán trên bộ nhớ (In-memory) lớn và tối ưu chi phí vận hành hạ tầng.',
      solution: 'Tiết kiệm từ 20% - 30% chi phí bản quyền phần mềm nhờ nền tảng OpenStack mã nguồn mở. Khách hàng chủ động theo dõi tài nguyên thực tế (RAM/CPU/IOPS) qua dashboard, sẵn sàng mở rộng quy mô phần cứng không giới hạn để gánh tải cho các hệ thống ERP, SAP hay cổng thanh toán trực tuyến.'
    }
  ];

  const faqs = [
    {
      q: 'Một hệ thống Private Cloud (vOPC) yêu cầu khoản chi phí đầu tư ban đầu như thế nào?',
      a: 'Chi phí đầu tư phụ thuộc hoàn toàn vào quy mô cấu hình tài nguyên và mô hình triển khai thực tế của doanh nghiệp. Đội ngũ chuyên gia kiến trúc giải pháp của Viettel IDC luôn sẵn sàng khảo sát và tư vấn phương án tối ưu nhất, giúp cân bằng giữa hiệu suất kỹ thuật và ngân sách của tổ chức.'
    },
    {
      q: 'Khi nào doanh nghiệp nên lựa chọn sử dụng Private Cloud (vOPC) thay vì Public Cloud?',
      a: 'Doanh nghiệp nên chuyển dịch sang vOPC khi hệ thống vận hành đòi hỏi một môi trường hạ tầng ảo hóa dùng riêng, có tính độc lập vật lý cao, cam kết hiệu năng khắt khe và yêu cầu tính bảo mật dữ liệu tuyệt đối mà các môi trường Public Cloud chia sẻ tài nguyên không thể đáp ứng được.'
    },
    {
      q: 'Hệ thống Private Cloud (vOPC) nên được đặt ở đâu?',
      a: 'Viettel IDC hỗ trợ hai tùy chọn vị trí linh hoạt:\n\n1. Tại Trung tâm dữ liệu của Khách hàng: Nếu doanh nghiệp đã có sẵn hạ tầng, máy chủ và phòng máy tiêu chuẩn.\n\n2. Tại Trung tâm dữ liệu Viettel IDC: Nếu doanh nghiệp muốn sở hữu hạ tầng dùng riêng nhưng không muốn tốn chi phí vận hành phòng máy, hệ thống sẽ được đặt tại Trung tâm dữ liệu đạt chuẩn quốc tế Rated 3 - TIA 942 của Viettel IDC.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FA] text-neutral-900 font-sans antialiased">
      <Navbar />

      <main className="flex-1" id="main-content">
        
        {/* SECTION 1: HERO */}
        <section id="hero-section" className="relative overflow-hidden bg-gradient-to-br from-[#121212] via-[#1A1A1A] to-[#2B0E13] text-white py-16 md:py-24 lg:py-28 px-6 md:px-10 lg:px-12">
          {/* Decorative background grid and blurs */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] opacity-45 pointer-events-none" />
          <div className="absolute top-0 right-0 bg-[#EE0033]/10 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 bg-[#EE0033]/5 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="max-w-7xl mx-auto relative z-10 text-left flex flex-col items-start py-4 w-full">
            <div className="space-y-6 max-w-4xl flex flex-col items-start">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-[#EE0033]/10 border border-[#EE0033]/25 px-4 py-1.5 rounded-full text-[#FF4D73] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#EE0033] animate-pulse" />
                <span>Điện toán đám mây & Hạ tầng dùng riêng</span>
              </div>

              {/* Title Header matching CSS Selector perfectly */}
              <div>
                <h1 className="text-3.5xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-sans">
                  <span className="block">Viettel Open Private Cloud (vOPC)</span>
                </h1>
              </div>

              {/* Subheading */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
                Dịch vụ đám mây riêng được phát triển trên nền tảng mã nguồn mở OpenStack bởi Viettel IDC. Đáp ứng đầy đủ các tiêu chí khắt khe về Cloud của Bộ Thông tin & Truyền thông, mang đến giải pháp hạ tầng chuyên biệt, tích hợp đồng bộ phần cứng và phần mềm trong các trung tâm dữ liệu không giới hạn địa lý.
              </p>

              {/* CTA Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#EE0033] hover:bg-[#FF1A4E] text-white font-extrabold text-xs md:text-sm tracking-wider rounded-full shadow-lg shadow-[#EE0033]/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Nhận báo giá giải pháp</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://docs.viettelidc.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white/20 hover:border-white text-gray-300 hover:text-white font-bold text-xs md:text-sm tracking-wider rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Xem tài liệu kỹ thuật
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: LỢI ÍCH CỐT LÕI */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                LỢI THẾ VƯỢT TRỘI
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Giá trị thực tiễn cho doanh nghiệp
              </h2>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="flex flex-col justify-between p-6 md:p-8 bg-neutral-50 border border-neutral-200/50 rounded-3xl hover:border-[#EE0033]/30 hover:shadow-xl transition-all duration-300 h-full"
                  >
                    <div className="space-y-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EE0033] border border-red-100 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-base md:text-lg font-extrabold text-neutral-950 leading-snug">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                        {benefit.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#EE0033] uppercase tracking-wider font-mono">
                        {benefit.stats}
                      </span>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: TÍNH NĂNG NỔI BẬT & QUAN TRỊ */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-neutral-50 text-left border-y border-neutral-100">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                QUẢN TRỊ TRỰC QUAN
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Kiểm soát toàn diện hạ tầng từ xa
              </h2>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                Hạ tầng thông minh tích hợp bảng quản trị linh hoạt giúp tinh gọn hóa hoàn toàn gánh nặng vận hành mạng lưới.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="p-6 bg-white border border-neutral-150 rounded-2xl hover:border-[#EE0033]/25 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-[#EE0033]/5 text-[#EE0033] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-neutral-900 text-sm leading-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: THÔNG SỐ KỸ THUẬT & KIẾN TRÚC */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left text area */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                  THÔNG SỐ KỸ THUẬT
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                  Khả năng tương thích ứng dụng doanh nghiệp
                </h2>
                <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-sans">
                  Viettel Open Private Cloud được thiết kế chuyên biệt để đáp ứng các hệ thống đòi hỏi hiệu năng xử lý tốc độ cao, tài nguyên phân phối độc lập và lưu trữ tính toán trên bộ nhớ (In-memory storage).
                </p>

                <div className="h-px bg-neutral-100 w-full" />

                <div className="space-y-4">
                  <p className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest">
                    Các ứng dụng doanh nghiệp tương thích tối ưu:
                  </p>
                  
                  <div className="space-y-3.5">
                    {[
                      { title: 'Hệ quản trị cơ sở dữ liệu lớn', desc: 'Oracle RAC, SQL Server Cluster.', icon: Database },
                      { title: 'Hệ thống hoạch định tài nguyên', desc: 'SAP, ERP, Core Banking.', icon: Cpu },
                      { title: 'Nền tảng giao dịch', desc: 'Thương mại điện tử, Hệ thống thanh toán trực tuyến tốc độ cao.', icon: Server }
                    ].map((app, idx) => {
                      const Icon = app.icon;
                      return (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 text-[#EE0033] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-extrabold text-neutral-900">
                              {app.title}
                            </h4>
                            <p className="text-[11px] text-[#EE0033] font-bold font-sans">
                              {app.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right decorative visual box */}
              <div className="lg:col-span-6 bg-gradient-to-br from-[#1E2329] to-[#121212] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl min-h-[380px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 bg-[#EE0033]/15 w-64 h-64 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 bg-[#EE0033]/5 w-48 h-48 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#EE0033]" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 font-mono">vOPC Platform Architecture</span>
                  </div>
                  
                  <div className="space-y-2 bg-black/40 border border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-emerald-400 leading-relaxed">
                    <p>&gt; openstack hypervisor list</p>
                    <p className="text-zinc-400">+----+---------------------+------------------+-------------+-------+</p>
                    <p className="text-zinc-300">| ID | Hypervisor Hostname | Hypervisor Type  | State       | Status|</p>
                    <p className="text-zinc-400">+----+---------------------+------------------+-------------+-------+</p>
                    <p>|  1 | node-compute-kvm01  | QEMU/KVM (vOPC)  | up          | enabled|</p>
                    <p>|  2 | node-compute-kvm02  | QEMU/KVM (vOPC)  | up          | enabled|</p>
                    <p className="text-zinc-400">+----+---------------------+------------------+-------------+-------+</p>
                    <p className="text-zinc-500">{"// Ceph distributed storage cluster status: OK (Clean)"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800 relative z-10 text-left font-sans">
                  <div>
                    <span className="text-[9px] text-zinc-400 block font-bold uppercase tracking-wider">Ảo hóa</span>
                    <span className="text-xs text-white font-extrabold font-mono block">KVM Hypervisor</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 block font-bold uppercase tracking-wider">Hạ tầng mạng</span>
                    <span className="text-xs text-white font-extrabold font-mono block">Open vSwitch SDN</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 block font-bold uppercase tracking-wider">Lưu trữ</span>
                    <span className="text-xs text-white font-extrabold font-mono block">Ceph SDS Cluster</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: TÌNH HUỐNG SỬ DỤNG THỰC TẾ */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-neutral-900 text-white text-left overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-[#EE0033]/5 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
          
          <div className="max-w-7xl mx-auto space-y-12 relative z-10">
            
            {/* Header */}
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-[#EE0033]/15 px-2.5 py-1 rounded border border-[#EE0033]/25">
                ỨNG DỤNG THỰC TẾ
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                Giải pháp tối ưu cho từng bài toán ngành
              </h2>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Sự linh hoạt vượt trội của vOPC giải quyết triệt để các rào cản đặc thù của từng phân khúc thị trường.
              </p>
            </div>

            {/* Case Selection Tabs */}
            <div className="flex border-b border-zinc-800 overflow-x-auto no-scrollbar">
              {useCases.map((uc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCase(idx)}
                  className={`py-4 px-6 text-xs font-bold whitespace-nowrap border-b-2 transition-all duration-300 cursor-pointer ${
                    activeCase === idx
                      ? 'border-[#EE0033] text-[#FF4D73]'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  {uc.industry}
                </button>
              ))}
            </div>

            {/* Selected Case Content */}
            <div className="min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4"
                >
                  <div className="lg:col-span-5 bg-zinc-800/50 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 text-[10px] font-extrabold text-[#EE0033] uppercase tracking-wider font-mono bg-[#EE0033]/10 border border-[#EE0033]/20 px-3 py-1 rounded-full">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Thách thức ngành</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white">
                        {useCases[activeCase].industry}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {useCases[activeCase].challenge}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-[#EE0033]/5 border border-[#EE0033]/15 rounded-3xl p-6 md:p-8 space-y-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#EE0033]/10 w-32 h-32 rounded-full blur-2xl" />
                    
                    <div className="space-y-4 relative z-10">
                      <div className="inline-flex items-center gap-2 text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider font-mono bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Giải pháp vOPC</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white">
                        Cách tiếp cận toàn diện từ Viettel IDC
                      </h3>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {useCases[activeCase].solution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* SECTION 6: CÂU HỎI THƯỜNG GẶP (FAQ Accordion) */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left border-b border-neutral-100">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-3 text-center">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55 mx-auto w-max block">
                HỎI ĐÁP DỊCH VỤ
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Giải đáp thắc mắc về Viettel Open Private Cloud
              </h2>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full mx-auto" />
            </div>

            {/* Accordion List */}
            <div className="space-y-4 pt-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFAQ === idx;
                return (
                  <div
                    key={idx}
                    className="border border-neutral-200/80 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-xs md:text-sm font-bold bg-neutral-50/50 hover:bg-neutral-50 transition-colors duration-200 cursor-pointer"
                    >
                      <span className={isOpen ? 'text-[#EE0033]' : 'text-neutral-900'}>
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#EE0033]' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-white border-t border-neutral-100"
                        >
                          <div className="p-5 text-xs text-neutral-500 leading-relaxed font-sans whitespace-pre-line">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CTA */}
        <section className="bg-[#EE0033] text-white py-16 px-6 md:px-12 lg:px-16 text-center relative overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute top-0 left-0 bg-white/5 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 bg-black/10 w-[400px] h-[400px] rounded-full blur-2xl pointer-events-none -mr-20 -mb-20" />

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <h2 className="text-2xl md:text-4.5xl font-black tracking-tight leading-tight text-white">
              Khởi tạo Đám mây riêng chuẩn An toàn thông tin của bạn
            </h2>
            <p className="text-xs md:text-base text-red-100 max-w-2xl mx-auto leading-relaxed font-sans">
              Đơn giản hóa bài toán hạ tầng, tuân thủ Thông tư 1145 của Bộ TT&TT cùng các chuyên gia Viettel IDC.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#EE0033] font-black text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-neutral-50 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Kết nối với Chuyên gia
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-white/80 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider rounded-full hover:border-white hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                Yêu cầu khảo sát hạ tầng
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}
