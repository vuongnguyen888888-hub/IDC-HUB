'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Zap, Layers, Shield, Check, ChevronDown, ChevronRight, HelpCircle, ArrowRight,
  Monitor, Play, Video, Box, Database, HardDrive, Key, Flame
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import ScreenSwitcher from './ScreenSwitcher';

type GPUCardTab = 'l40s' | 't4' | 'a30';

export default function ViettelCloudGpuPage() {
  const [activeTab, setActiveTab] = useState<GPUCardTab>('l40s');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const l40sPlans = [
    {
      name: 'CLOUD GPU L40S_1 DOCX',
      price: '31.000.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Số lượng Card', value: '1 Card NVIDIA L40S 48GB' },
        { label: 'Bộ vi xử lý', value: '16 vCPU' },
        { label: 'Bộ nhớ RAM', value: '48 GB RAM' },
        { label: 'Lưu trữ SSD', value: '500 GB SSD' },
        { label: 'Mạng & IP', value: '300 Mbps Trong nước | 1 IP' }
      ],
      featured: false
    },
    {
      name: 'CLOUD GPU L40S_2 DOCX',
      price: '6.185.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Số lượng Card', value: '2 Card NVIDIA L40S 48GB' },
        { label: 'Bộ vi xử lý', value: '32 vCPU' },
        { label: 'Bộ nhớ RAM', value: '96 GB RAM' },
        { label: 'Lưu trữ SSD', value: '1.000 GB SSD' },
        { label: 'Mạng & IP', value: '300 Mbps Trong nước | 1 IP' }
      ],
      featured: true
    },
    {
      name: 'CLOUD GPU L40S_4 DOCX',
      price: '123.600.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Số lượng Card', value: '4 Card NVIDIA L40S 48GB' },
        { label: 'Bộ vi xử lý', value: '64 vCPU' },
        { label: 'Bộ nhớ RAM', value: '192 GB RAM' },
        { label: 'Lưu trữ SSD', value: '2.000 GB SSD' },
        { label: 'Mạng & IP', value: '300 Mbps Trong nước | 1 IP' }
      ],
      featured: false
    },
    {
      name: 'CLOUD GPU L40S_6 DOCX',
      price: '202.000.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Số lượng Card', value: '6 Card NVIDIA L40S 48GB' },
        { label: 'Bộ vi xử lý', value: '96 vCPU' },
        { label: 'Bộ nhớ RAM', value: '320 GB RAM' },
        { label: 'Lưu trữ SSD', value: '6.000 GB SSD' },
        { label: 'Mạng & IP', value: '300 Mbps Trong nước | 1 IP' }
      ],
      featured: false
    }
  ];

  const t4Plans = [
    {
      name: 'GPU 1 DOCX',
      price: '8.700.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Cấu hình Card', value: '16 GB NVIDIA Tesla T4' },
        { label: 'Bộ vi xử lý', value: '8 vCPU' },
        { label: 'Bộ nhớ RAM', value: '16 GB RAM' },
        { label: 'Lưu trữ SSD', value: '300 GB SSD' },
        { label: 'Lưu lượng mạng', value: '300 Mbps Trong nước | 1 IP' }
      ],
      featured: false
    },
    {
      name: 'GPU 2 DOCX',
      price: '10.320.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Cấu hình Card', value: '16 GB NVIDIA Tesla T4' },
        { label: 'Bộ vi xử lý', value: '16 vCPU' },
        { label: 'Bộ nhớ RAM', value: '32 GB RAM' },
        { label: 'Lưu trữ SSD', value: '300 GB SSD' },
        { label: 'Lưu lượng mạng', value: 'Không giới hạn lưu lượng' }
      ],
      featured: false
    },
    {
      name: 'GPU 3 DOCX',
      price: '14.280.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Cấu hình Card', value: '16 GB NVIDIA Tesla T4' },
        { label: 'Bộ vi xử lý', value: '32 vCPU' },
        { label: 'Bộ nhớ RAM', value: '64 GB RAM' },
        { label: 'Lưu trữ SSD', value: '300 GB SSD' },
        { label: 'Lưu lượng mạng', value: 'Không giới hạn lưu lượng' }
      ],
      featured: true
    },
    {
      name: 'GPU 4 DOCX',
      price: '14.800.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Cấu hình Card', value: '32 GB NVIDIA Tesla T4' },
        { label: 'Bộ vi xử lý', value: '16 vCPU' },
        { label: 'Bộ nhớ RAM', value: '32 GB RAM' },
        { label: 'Lưu trữ SSD', value: '300 GB SSD' },
        { label: 'Lưu lượng mạng', value: 'Không giới hạn lưu lượng' }
      ],
      featured: false
    }
  ];

  const a30Plans = [
    {
      name: 'A30_GPU 1 DOCX',
      price: '14.600.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Thông số Card', value: '1 Card NVIDIA A30 24GB' },
        { label: 'Bộ vi xử lý', value: '8 vCPU' },
        { label: 'Bộ nhớ RAM', value: '16 GB RAM' },
        { label: 'Lưu trữ SSD', value: '500 GB SSD' },
        { label: 'Hạ tầng mạng', value: '300 Mbps Băng thông | 1 IP' }
      ],
      featured: false
    },
    {
      name: 'A30_GPU 2 DOCX',
      price: '16.700.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Thông số Card', value: '1 Card NVIDIA A30 24GB' },
        { label: 'Bộ vi xử lý', value: '16 vCPU' },
        { label: 'Bộ nhớ RAM', value: '32 GB RAM' },
        { label: 'Lưu trữ SSD', value: '500 GB SSD' },
        { label: 'Hạ tầng mạng', value: '300 Mbps Băng thông | 1 IP' }
      ],
      featured: true
    },
    {
      name: 'A30_GPU 3 DOCX',
      price: '31.600.000đ',
      period: 'Tháng',
      specs: [
        { label: 'Thông số Card', value: '2 Card NVIDIA A30 24GB' },
        { label: 'Bộ vi xử lý', value: '32 vCPU' },
        { label: 'Bộ nhớ RAM', value: '64 GB RAM' },
        { label: 'Lưu trữ SSD', value: '1.000 GB SSD' },
        { label: 'Hạ tầng mạng', value: '300 Mbps Băng thông | 1 IP' }
      ],
      featured: false
    }
  ];

  const getPlansData = () => {
    switch (activeTab) {
      case 'l40s':
        return {
          desc: 'Kiến trúc Ada Lovelace thế hệ mới, tích hợp Tensor Cores và Multi-Workload GPU cung cấp tốc độ xử lý nhanh chóng, an toàn cho AI inference quy mô lớn, xử lý đồ họa, dựng hình 3D và điện toán hiệu năng cao HPC. Triển khai tại TTDL Hòa Lạc.',
          plans: l40sPlans,
          isStandardCta: true
        };
      case 't4':
        return {
          desc: 'Kiến trúc Turing mang lại hiệu suất cao cho các khối lượng công việc trên hệ thống điện toán đám mây, tối ưu sâu cho môi trường phổ thông với lõi Turing Tensor và lõi RT mới. Triển khai tại TTDL Pháp Vân & Hoàng Hoa Thám.',
          plans: t4Plans,
          isStandardCta: false
        };
      case 'a30':
        return {
          desc: 'Kiến trúc Ampere cao cấp, hỗ trợ Multi-Instance GPU cung cấp tốc độ xử lý nhanh chóng, an toàn cho các khối lượng công việc đa dạng, AI interface quy mô lớn và điện toán hiệu năng cao. Triển khai tại TTDL Hòa Lạc & Bình Dương.',
          plans: a30Plans,
          isStandardCta: false
        };
      default:
        return {
          desc: '',
          plans: l40sPlans,
          isStandardCta: true
        };
    }
  };

  const currentTabInfo = getPlansData();

  const faqs = [
    {
      q: 'Dịch vụ Viettel Cloud GPU cung cấp những dòng card GPU nào?',
      a: 'Hiện tại hệ thống đang cung cấp dòng card đa dụng NVIDIA Tesla T4 16GB (tích hợp đầy đủ nhân CUDA, Tensor, RT) cùng dòng card hiệu năng cao NVIDIA L40S (kiến trúc Ada Lovelace) và NVIDIA A30 (kiến trúc Ampere). Trong thời gian tới, Viettel IDC dự kiến sẽ tiếp tục bổ sung thêm các dòng card mới như A100 và Quadro A6000.'
    },
    {
      q: 'Tôi muốn thuê máy ảo Cloud GPU chỉ sử dụng một phần năng lực của card GPU để tối ưu chi phí có được không?',
      a: 'Được. Tính năng phân tách ảo hóa vGPU sắp ra mắt sẽ cho phép Khách hàng mua và sử dụng chỉ một phần năng lực trên một card GPU vật lý thay vì phải thuê toàn bộ dưới hình thái dùng riêng (dedicated), giúp doanh nghiệp tối ưu chi phí sử dụng một cách hợp lý nhất.'
    },
    {
      q: 'Phần mềm tôi sử dụng đòi hỏi năng lực GPU rất cao, tôi có thể thuê 01 VM gắn nhiều card GPU không?',
      a: 'Hoàn toàn được. Dịch vụ cho phép Khách hàng cấu hình tích hợp nhiều card GPU trên cùng một máy chủ ảo. Đồng thời, doanh nghiệp có thể kết nối nhiều VM giao tiếp nội bộ tốc độ cao để chạy các tác vụ tính toán phân tán (Distributed Training).'
    },
    {
      q: 'Tôi có thể sử dụng Viettel Cloud GPU kết hợp với các dịch vụ khác trong hệ sinh thái của Viettel IDC được không?',
      a: 'Hoàn toàn được. Dịch vụ dễ dàng liên kết mạng private an toàn với Viettel Cloud Server, Viettel Dedicated Private Cloud hoặc Viettel File Storage để tạo nên một hệ thống hạ tầng hoàn chỉnh cho các ứng dụng Web, hệ thống trí tuệ nhân tạo hoặc quản trị Camera AI.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FA] text-[#333333] font-sans antialiased">
      <Navbar />

      <main className="flex-1">
        
        {/* SECTION 1: HERO (Tĩnh) */}
        <section id="hero-section" className="relative overflow-hidden bg-gradient-to-br from-[#0F0F11] via-[#151518] to-[#25090F] text-white py-20 md:py-28 lg:py-32 px-6 md:px-10 lg:px-12 border-b border-zinc-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
          <div className="absolute top-1/4 right-0 bg-[#EE0033]/15 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -mr-40 -mt-20" />
          <div className="absolute bottom-0 left-0 bg-[#EE0033]/5 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="max-w-7xl mx-auto relative z-10 text-left flex flex-col items-start w-full">
            <div className="space-y-6 max-w-4xl flex flex-col items-start">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#EE0033]/10 border border-[#EE0033]/25 px-4 py-1.5 rounded-full text-[#FF4D73] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#EE0033] animate-pulse" />
                <span>Hạ tầng tính toán tăng tốc đồ họa và trí tuệ nhân tạo</span>
              </div>

              {/* Title Header */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5.5xl lg:text-6.5xl font-black tracking-tight text-white leading-tight font-sans">
                  Viettel Cloud GPU <span className="text-[#FF4D73] block md:inline">(vCGPU)</span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl font-sans">
                Dịch vụ máy chủ ảo tích hợp một, một phần hoặc nhiều card GPU của NVIDIA. Giải pháp hướng tới phục vụ các tổ chức, doanh nghiệp trong hoạt động nghiên cứu, phát triển và triển khai các hệ thống, phần mềm ứng dụng Artificial Intelligence (AI) từ môi trường thử nghiệm (lab) cho đến vận hành thực tế (production), cùng các tác vụ chuyên sâu về kết xuất hình ảnh, đồ họa kiến trúc 3D và chuyển mã video chất lượng cao.
              </p>

              {/* CTA Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#EE0033] hover:bg-[#FF1A4E] text-white font-extrabold text-xs md:text-sm tracking-wider rounded-full shadow-lg shadow-[#EE0033]/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Đăng ký ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://docs.viettelidc.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 hover:border-white text-gray-300 hover:text-white font-bold text-xs md:text-sm tracking-wider rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Xem tài liệu kỹ thuật
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* STICKY BAR SUB-MENU (Visual & navigation anchor, aligned to corporate identity) */}
        <div className="sticky top-0 z-[1010] bg-white/95 backdrop-blur-md border-b border-neutral-200/60 shadow-md transition-all duration-300 py-1.5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-auto md:h-16 py-2 md:py-0">
              
              {/* Sticky Title */}
              <div className="flex items-center gap-2 shrink-0">
                <Cpu className="w-5 h-5 text-[#EE0033]" />
                <span className="font-sans font-black text-xs md:text-sm text-neutral-900 tracking-wider uppercase">
                  VIETTEL CLOUD GPU
                </span>
                <span className="bg-red-50 text-[#EE0033] border border-red-100 text-[9px] font-extrabold px-1.5 py-0.5 rounded ml-1">
                  vCGPU
                </span>
              </div>

              {/* Quick Anchor Navigation */}
              <nav className="flex items-center space-x-6 text-xs font-extrabold text-neutral-500 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                <a href="#advantages" className="hover:text-[#EE0033] whitespace-nowrap transition-colors duration-200">Lợi ích</a>
                <a href="#features" className="hover:text-[#EE0033] whitespace-nowrap transition-colors duration-200">Tính năng</a>
                <a href="#pricing" className="hover:text-[#EE0033] whitespace-nowrap transition-colors duration-200">Bảng giá</a>
                <a href="#usecases" className="hover:text-[#EE0033] whitespace-nowrap transition-colors duration-200">Trường hợp sử dụng</a>
                <a href="#faqs" className="hover:text-[#EE0033] whitespace-nowrap transition-colors duration-200">Câu hỏi</a>
              </nav>

              {/* Console Quick Button */}
              <div className="hidden lg:block">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 bg-[#EE0033] text-white text-[11px] font-black uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-sm"
                >
                  <span>Dùng thử</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 2: LỢI ÍCH VƯỢT TRỘI (Grid 3 Cột) */}
        <section id="advantages" className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left scroll-mt-16">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                LỢI THẾ ĐỘC QUYỀN
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Bứt phá hiệu suất xử lý phần cứng tối đa
              </h2>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full" />
            </div>

            {/* Benefits Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {[
                {
                  title: 'Tăng tốc xử lý, tiết kiệm thời gian',
                  desc: 'Các dòng card đồ họa chuyên dụng giúp tối ưu hiệu năng vượt trội, giảm thời gian xử lý các tác vụ phức tạp từ quy mô nhiều Ngày xuống còn vài Giờ, Phút, Giây ngắn ngủi.',
                  badge: 'Hiệu suất đỉnh cao',
                  icon: Zap
                },
                {
                  title: 'Khởi tạo nhanh chóng, nâng cấp linh hoạt',
                  desc: 'Thừa hưởng trọn vẹn ưu điểm của nền tảng Public Cloud, doanh nghiệp có thể chủ động cấu hình, nâng cấp tài nguyên bất kỳ lúc nào mà không phải chờ đợi quy trình triển khai phần cứng vật lý.',
                  badge: 'Đàn hồi tức thì',
                  icon: Layers
                },
                {
                  title: 'Sẵn sàng sử dụng, tối ưu môi trường',
                  desc: 'Máy chủ ảo được tích hợp sẵn hệ điều hành (Windows/Ubuntu/CentOS), NVIDIA Driver và bộ CUDA Toolkit, giúp kỹ sư công nghệ sẵn sàng triển khai mã nguồn lập trình ngay lập tức.',
                  badge: 'Hệ sinh thái CUDA',
                  icon: Cpu
                }
              ].map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="flex flex-col justify-between p-6 md:p-8 bg-neutral-50 border border-neutral-200/50 rounded-3xl hover:border-[#EE0033]/30 hover:shadow-xl transition-all duration-300 h-full"
                  >
                    <div className="space-y-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EE0033] border border-red-100 flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-base md:text-lg font-extrabold text-neutral-950 leading-snug">
                        {benefit.title}
                      </h3>
                      
                      {/* Desc */}
                      <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                        {benefit.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#EE0033] uppercase tracking-wider font-mono">
                        {benefit.badge}
                      </span>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: TÍNH NĂNG CHÍNH (Layout xen kẽ 2 Cột: Text & UI Mockup) */}
        <section id="features" className="py-20 px-6 md:px-10 lg:px-12 bg-neutral-50 text-left border-y border-neutral-200/60 scroll-mt-16">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header */}
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                TÍNH NĂNG TOÀN DIỆN
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Năng lực liên kết và bảo vệ hệ thống toàn diện
              </h2>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full" />
            </div>

            {/* Layout Xen kẽ 3 Khối */}
            <div className="space-y-12">
              {[
                {
                  title: 'Kết nối nhiều máy chủ ảo mở rộng hiệu suất',
                  content: 'Cho phép khởi tạo và liên kết nhiều máy chủ ảo Cloud GPU lại với nhau để phân chia khối lượng công việc (workload), tăng cường hiệu suất xử lý tối đa cho các tác vụ đặc thù như huấn luyện phân tán (Distributed Training).',
                  code: '> cluster_init --node-gpus=4 --model-parallelism=true\n> torchrun --nproc_per_node=4 train_llm.py\nNodes synced via internal 100G ultra-low latency mesh',
                  tag: 'DISTRIBUTED TRAINING'
                },
                {
                  title: 'Tích hợp cân bằng tải & tường lửa bảo mật',
                  content: 'Hỗ trợ tùy chọn mua tích hợp (add-on) các thành phần Load Balancer (Cân bằng tải) và Firewall (Tường lửa) với mức chi phí hợp lý, đảm bảo duy trì hiệu suất vận hành ổn định và bảo vệ an toàn dữ liệu.',
                  code: '> service_firewall_status --vCGPU\nRules status: ACTIVE\n[ALLOW] TCP port 443 -> Inference server\n[ALLOW] BGP routes encrypted via IPsec tunnel',
                  tag: 'SECURITY & BALANCING'
                },
                {
                  title: 'Khả năng kết hợp đa dịch vụ trong hệ sinh thái',
                  content: 'Kết nối mượt mà Viettel Cloud GPU với các dịch vụ điện toán khác (Viettel Cloud Server, Viettel Virtual Private Cloud), phân hệ lưu trữ (Viettel File Storage) và giải pháp sao lưu (Viettel Cloud Backup) qua kênh truyền nội bộ bảo mật.',
                  code: '> mount_viettel_storage --target=/mnt/shared_model_weights\nConnecting Viettel File Storage via Private Interlink (0 latency)\nReady for instant read/write of checkpoints',
                  tag: 'VIETTEL IDC CLOUD ECOSYSTEM'
                }
              ].map((feat, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-neutral-200/50 p-6 md:p-8 rounded-3xl ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Text block */}
                    <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <span className="text-[10px] font-black text-neutral-400 tracking-wider block font-mono">
                        KHỐI PHÂN HỆ 0{idx + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight leading-snug">
                        {feat.title}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-sans">
                        {feat.content}
                      </p>
                    </div>

                    {/* Illustrative Terminal/UI Mockup */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} h-full min-h-[200px] bg-gradient-to-br from-[#121214] to-[#1D1215] rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-inner`}>
                      <div className="absolute top-0 right-0 bg-[#EE0033]/10 w-32 h-32 rounded-full blur-2xl" />
                      
                      <div className="space-y-3 relative z-10 font-mono text-[10px] text-emerald-400">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 text-[9px] text-zinc-400">
                          <span>{feat.tag}</span>
                          <span className="text-emerald-400 flex items-center gap-1 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ACTIVE
                          </span>
                        </div>
                        <p className="text-zinc-500">{"// Executing high-perf cluster telemetry..."}</p>
                        <pre className="whitespace-pre-wrap font-mono text-zinc-300 select-all leading-relaxed">
                          {feat.code}
                        </pre>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-2 border-t border-zinc-800 relative z-10 text-[9px] text-zinc-400 font-mono">
                        <span>VCGPU CONFIGURATION</span>
                        <span>vCGPU-v3-Core</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: BẢNG GIÁ DỊCH VỤ (Section Pricing - Khối Tab Phân loại) */}
        <section id="pricing" className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left scroll-mt-16">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* Header */}
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                BẢNG GIÁ CHUẨN HOÁ
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Cấu hình các gói dịch vụ đa dạng
              </h2>
              <p className="text-xs md:text-sm text-neutral-500 font-sans leading-relaxed">
                Bảng giá chưa bao gồm thuế VAT (nếu có). Quý khách vui lòng chọn loại card NVIDIA phù hợp để xem bảng giá tương ứng.
              </p>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full" />
            </div>

            {/* TAB SELECTOR FOR CARD DÒNG */}
            <div className="flex flex-wrap items-center gap-3 border-b border-neutral-200/60 pb-4">
              {[
                { id: 'l40s', label: 'DÒNG CARD NVIDIA L40S', spec: 'Thế hệ mới | Ada Lovelace' },
                { id: 't4', label: 'DÒNG CARD NVIDIA TESLA T4', spec: 'Tối ưu | Kiến trúc Turing' },
                { id: 'a30', label: 'DÒNG CARD NVIDIA A30', spec: 'Cao cấp | Kiến trúc Ampere' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as GPUCardTab)}
                    className={`flex flex-col items-start px-6 py-3.5 rounded-2xl transition-all duration-300 text-left border cursor-pointer min-w-[200px] select-none ${
                      isActive 
                        ? 'bg-[#EE0033] text-white border-[#EE0033] shadow-md shadow-[#EE0033]/15' 
                        : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    <span className="text-xs font-black tracking-wide uppercase">{tab.label}</span>
                    <span className={`text-[10px] mt-0.5 font-sans ${isActive ? 'text-red-100' : 'text-neutral-400'}`}>
                      {tab.spec}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* TAB CARD DETAIL DESCRIPTION */}
            <div className="p-6 bg-red-50/40 border border-red-100/60 rounded-2xl text-xs text-neutral-700 leading-relaxed font-sans max-w-4xl">
              <strong className="text-[#EE0033] block mb-1">Đặc tính hạ tầng cụm card:</strong>
              {currentTabInfo.desc}
            </div>

            {/* PRICING PLANS DYNAMIC RENDERING */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <AnimatePresence mode="wait">
                {currentTabInfo.plans.map((plan, idx) => {
                  return (
                    <motion.div
                      key={activeTab + '-' + plan.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.28, delay: idx * 0.05 }}
                      className={`relative rounded-2xl p-6 flex flex-col justify-between border-2 transition-shadow duration-300 bg-white ${
                        plan.featured 
                          ? 'border-neutral-200 bg-gradient-to-b from-neutral-50/50 to-white shadow-none hover:shadow-lg' 
                          : 'border-neutral-200 hover:border-neutral-300 shadow-none hover:shadow-lg'
                      }`}
                    >
                      {plan.featured && (
                        <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#EE0033] text-white text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
                          <Flame className="w-3 h-3" />
                          <span>Khuyên dùng</span>
                        </div>
                      )}

                      <div className="space-y-5 text-left">
                        {/* Title block */}
                        <div>
                          <span className="text-[9px] font-extrabold text-[#EE0033] uppercase tracking-wider block font-mono">
                            VIRTUAL SERVER MACHINE
                          </span>
                          <h3 className="text-sm font-black text-neutral-900 mt-1 line-clamp-1">
                            {plan.name}
                          </h3>
                        </div>

                        {/* Cost block */}
                        <div className="py-2.5 border-y border-neutral-100">
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-xl md:text-2xl font-black text-[#EE0033]">
                              {plan.price}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-bold font-sans">
                              / {plan.period}
                            </span>
                          </div>
                        </div>

                        {/* Specs Checklist */}
                        <div className="space-y-3 pt-1">
                          <ul className="space-y-2.5">
                            {plan.specs.map((spec, sidx) => (
                              <li key={sidx} className="flex flex-col text-[11px] border-b border-neutral-50 pb-1.5 font-sans">
                                <span className="text-neutral-400 text-[10px] leading-tight font-medium">{spec.label}</span>
                                <span className="text-neutral-800 font-extrabold mt-0.5 text-left">
                                  {spec.value}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-4 border-t border-neutral-50 flex flex-col gap-2.5">
                        {currentTabInfo.isStandardCta ? (
                          <>
                            <Link
                              href="/contact"
                              className="w-full text-center py-2.5 px-4 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer bg-[#EE0033] hover:bg-[#FF1A4E] text-white shadow-md shadow-[#EE0033]/25 hover:shadow-[#EE0033]/35 hover:-translate-y-0.5"
                            >
                              Đăng ký
                            </Link>
                            <Link
                              href="/contact"
                              className="w-full text-center py-2 px-4 rounded-full text-[10px] font-black uppercase tracking-wider border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200 cursor-pointer"
                            >
                              Dùng thử
                            </Link>
                          </>
                        ) : (
                          <Link
                            href="/contact"
                            className="w-full text-center py-2.5 px-4 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer bg-[#EE0033] hover:bg-[#FF1A4E] text-white shadow-md shadow-[#EE0033]/25 hover:shadow-[#EE0033]/35 hover:-translate-y-0.5"
                          >
                            Đăng ký
                          </Link>
                        )}
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 5: CÁC TRƯỜNG HỢP SỬ DỤNG ĐIỂN HÌNH (Use Cases) */}
        <section id="usecases" className="py-20 px-6 md:px-10 lg:px-12 bg-neutral-50 text-left border-y border-neutral-200/60 scroll-mt-16">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                ỨNG DỤNG THỰC TẾ
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Phục vụ toàn diện cho các khối lượng công việc phức tạp
              </h2>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full" />
            </div>

            {/* Use Case Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Deep Learning Training & Inference',
                  desc: 'Phù hợp cho các doanh nghiệp, trường Đại học nghiên cứu, phát triển ứng dụng AI như: Chấm công khuôn mặt (FaceID), Định danh điện tử (eKYC), Trợ lý ảo giọng nói (AI Voice Assistant), Camera AI giám sát và Số hóa văn bản (OCR).',
                  tag: 'INTELLIGENT SYSTEMS',
                  icon: Monitor
                },
                {
                  title: 'Chuyển mã video (Video Transcoding)',
                  desc: 'Giải pháp tối ưu cho các đơn vị cung cấp dịch vụ phát sóng trực tiếp (live streaming), nền tảng xem phim trực tuyến (VOD) và đài truyền hình các tỉnh - thành phố.',
                  tag: 'VOD & STREAMING',
                  icon: Video
                },
                {
                  title: 'Đồ họa mô phỏng 3D & Kết xuất hình ảnh (Rendering)',
                  desc: 'Đáp ứng tốt nhu cầu của các studio thiết kế, kiến trúc, studio làm game cần thực hiện mô hình hóa các vật thể phức tạp và render bản vẽ thiết kế hình ảnh chất lượng cao (3DS Max, Maya, Adobe Media Encoder).',
                  tag: 'ARCHITECTURAL RENDERING',
                  icon: Box
                }
              ].map((useCase, idx) => {
                const IconComponent = useCase.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 md:p-8 bg-white border border-neutral-200/50 rounded-3xl flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300"
                  >
                    <div className="space-y-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE0033] flex items-center justify-center border border-red-100/40">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <span className="text-[9px] font-black text-neutral-400 tracking-widest font-mono uppercase block">
                        {useCase.tag}
                      </span>

                      <h3 className="text-base md:text-lg font-extrabold text-neutral-950 leading-snug">
                        {useCase.title}
                      </h3>

                      <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                        {useCase.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-bold text-[#EE0033]">
                      <span>Xem phương án cấu hình</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: CÂU HỎI THƯỜNG GẶP (FAQ Accordion) */}
        <section id="faqs" className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left scroll-mt-16">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-3 text-center">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55 mx-auto w-max block">
                HỎI ĐÁP DỊCH VỤ
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Câu hỏi thường gặp
              </h2>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full mx-auto" />
            </div>

            {/* Accordion list */}
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

        {/* SECTION 7: FINAL CTA BANNER (Full-width) */}
        <section className="bg-[#EE0033] text-white py-16 px-6 md:px-12 lg:px-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-white/5 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 bg-black/10 w-[400px] h-[400px] rounded-full blur-2xl pointer-events-none -mr-20 -mb-20" />

          <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center flex flex-col items-center">
            <h2 className="text-2xl md:text-4.5xl font-black tracking-tight leading-tight text-white max-w-3xl">
              Sẵn sàng bứt phá tốc độ xử lý cho hệ thống của bạn?
            </h2>
            <p className="text-xs md:text-sm text-red-100 max-w-2xl mx-auto leading-relaxed font-sans">
              Khởi tạo máy chủ ảo tích hợp card đồ họa NVIDIA chuyên dụng ngay lập tức, giải quyết triệt để các bài toán đồ họa, kết xuất video và trí tuệ nhân tạo của doanh nghiệp.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#EE0033] font-black text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-neutral-50 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Liên hệ nhận tư vấn cấu hình
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-white text-white font-extrabold text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Đăng ký trải nghiệm hệ thống
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
