'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, Server, Shield, Sparkles, ArrowRight, CheckCircle2, 
  ChevronDown, Check, HelpCircle, HardDrive, Cpu, Database, 
  Network, Key, Layers, Lock, Award, Terminal, Briefcase, Activity, 
  AlertCircle, Phone, Globe, ChevronRight, CheckCircle, Flame,
  Share2, ArrowUpRight, Zap
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import ScreenSwitcher from './ScreenSwitcher';

type ServiceType = 'vopc' | 'hpc' | 'hybrid';

export default function ViettelDedicatedPrivateCloudPage() {
  const [activeService, setActiveService] = useState<ServiceType>('vopc');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Auto-scroll update on active navigation
  useEffect(() => {
    // If we switch services, we can scroll to the top of the main area or let the user experience it fluidly.
  }, [activeService]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // 1. VIETTEL OPEN PRIVATE CLOUD (vOPC) DATA
  const vopcData = {
    hero: {
      badge: 'Hạ tầng điện toán đám mây mã nguồn mở',
      title: 'Điện Toán Đám Mây Riêng Ảo Phân Hệ Mở',
      subTitle: '(Viettel Open Private Cloud - vOPC)',
      desc: 'Giải pháp đám mây riêng được xây dựng hoàn toàn trên nền tảng công nghệ mã nguồn mở chuẩn quốc tế, mang lại năng lực tự chủ công nghệ tuyệt đối, tối ưu hóa chi phí bản quyền phần mềm tối đa và khả năng tích hợp mở rộng không giới hạn cho mọi hệ thống doanh nghiệp lớn.',
      ctaPrimary: 'Đăng ký tư vấn giải pháp',
      ctaSecondary: 'Tài liệu API vOPC',
      ctaPrimaryHref: '/contact',
      ctaSecondaryHref: 'https://docs.viettelidc.com.vn'
    },
    benefits: [
      {
        title: 'Tự chủ công nghệ & Tránh rủi ro Vendor Lock-in',
        desc: 'Khách hàng không bị phụ thuộc vào các nhà cung cấp giải pháp độc quyền. Toàn quyền kiểm soát mã nguồn, quy trình nâng cấp và cấu hình sâu hệ thống lõi.',
        icon: Key,
        stats: '100% Mã nguồn mở'
      },
      {
        title: 'Tối ưu chi phí đầu tư (TCO)',
        desc: 'Loại bỏ hoàn toàn chi phí mua bản quyền phần mềm ảo hóa (hypervisor) định kỳ, chuyển dịch ngân sách tập trung vào nâng cấp năng lực tính toán vật lý thuần túy.',
        icon: Cpu,
        stats: 'Tiết kiệm 30% TCO'
      },
      {
        title: 'Linh hoạt tùy biến theo kiến trúc riêng',
        desc: 'Hệ sinh thái mở cho phép doanh nghiệp thoải mái cài đặt, chỉnh sửa và tích hợp các module quản lý, giám sát bên thứ ba một cách dễ dàng qua hệ thống API mở.',
        icon: Layers,
        stats: 'Khả năng mở rộng vô hạn'
      }
    ],
    features: [
      {
        title: 'Quản trị tài nguyên phân lớp tự động',
        desc: 'Khởi tạo, phân bổ linh hoạt vCPU, RAM và Block Storage theo nhu cầu dự án thông qua giao diện Portal thân thiện, tự động hóa toàn diện quy trình cấp phát.',
        icon: Network
      },
      {
        title: 'Công nghệ ảo hóa Open-source hiệu năng cao',
        desc: 'Tận dụng tối đa sức mạnh phần cứng vật lý thông qua nền tảng ảo hóa KVM chuẩn hóa, giảm thiểu tối đa hao hụt tài nguyên và cam kết tốc độ xử lý dữ liệu lớn.',
        icon: Server
      },
      {
        title: 'Hệ thống mạng số hóa tự do tùy biến',
        desc: 'Hỗ trợ quy hoạch dải mạng nội bộ riêng (VLAN/VxLAN), thiết lập định tuyến phân tách thông minh và kết nối đa tầng bảo mật bằng tường lửa mềm (Software Firewall) tích hợp sẵn.',
        icon: Shield
      }
    ],
    pricing: {
      subDesc: 'Quý khách hàng lựa chọn gói tài nguyên mở hoặc cấu hình theo yêu cầu thực tế. Bảng giá chưa bao gồm thuế VAT.',
      plans: [
        {
          name: 'vOPC STANDARD',
          price: '3.990.000',
          period: 'Tháng',
          specs: [
            { label: 'vCPU lõi mở', value: '8 vCPU' },
            { label: 'Bộ nhớ (RAM)', value: '16 GB RAM' },
            { label: 'Lưu trữ mặc định', value: '200 GB SSD Standard' },
            { label: 'Băng thông kết nối', value: '300 Mbps Shared' },
            { label: 'Hệ thống API', value: 'Toàn quyền khai thác' }
          ],
          featured: false
        },
        {
          name: 'vOPC PREMIUM',
          price: '6.500.000',
          period: 'Tháng',
          specs: [
            { label: 'vCPU lõi mở', value: '16 vCPU' },
            { label: 'Bộ nhớ (RAM)', value: '32 GB RAM' },
            { label: 'Lưu trữ mặc định', value: '400 GB SSD High-IOPS' },
            { label: 'Băng thông kết nối', value: '500 Mbps Shared' },
            { label: 'Hệ thống API', value: 'Toàn quyền khai thác' }
          ],
          featured: true
        }
      ]
    }
  };

  // 2. VIETTEL DEDICATED PRIVATE CLOUD (HPC) DATA
  const hpcData = {
    hero: {
      badge: 'Hạ tầng dùng riêng & Tính toán hiệu năng cao',
      title: 'Điện Toán Đám Mây Riêng Dùng Riêng Cao Cấp',
      subTitle: '(Viettel Dedicated Private Cloud)',
      desc: 'Giải pháp thiết lập một hạ tầng điện toán đám mây hoàn toàn độc lập, sở hữu riêng thiết bị phần cứng vật lý (Dedicated Compute & Storage) đặt tại TTDL Viettel IDC. Đáp ứng các bài toán tính toán hiệu năng cao (HPC), xử lý dữ liệu cực lớn (Big Data) và tuân thủ các quy định bảo mật nghiêm ngặt nhất của ngành tài chính, ngân hàng, chính phủ.',
      ctaPrimary: 'Khảo sát & Nhận báo giá',
      ctaSecondary: 'Xem thông số phần cứng',
      ctaPrimaryHref: '/contact',
      ctaSecondaryHref: '#hardware-specs'
    },
    benefits: [
      {
        title: 'Bảo mật vật lý cô lập tuyệt đối',
        desc: 'Loại bỏ hoàn toàn rủi ro chia sẻ tài nguyên phần cứng (No noisy neighbors). Dữ liệu của doanh nghiệp được lưu trữ và xử lý trên các ổ đĩa và máy chủ vật lý chuyên biệt, có tường lửa lớp cứng bảo vệ.',
        icon: Shield,
        stats: 'Cô lập vật lý 100%'
      },
      {
        title: 'Sức mạnh xử lý vô song (HPC)',
        desc: 'Trang bị các dòng chip xử lý chuyên dụng Intel Xeon Gold thế hệ mới nhất, kết hợp card tăng tốc đồ họa (GPU) phục vụ hoàn hảo cho các tác vụ dựng hình, AI, Deep Learning và phân tích Big Data.',
        icon: Zap,
        stats: 'NVIDIA GPU Accelerated'
      },
      {
        title: 'Đạt chuẩn tuân thủ quốc tế khắt khe',
        desc: 'Thỏa mãn hoàn toàn các bộ tiêu chuẩn khắt khe phục vụ Chính phủ điện tử, chứng chỉ an toàn thanh toán thẻ PCI DSS, ISO 27017 (an toàn thông tin Cloud), đáp ứng yêu cầu thanh tra hạ tầng số.',
        icon: Award,
        stats: 'PCI DSS & ISO 27017'
      }
    ],
    features: [
      {
        title: 'Quản trị tài nguyên phần cứng chuyên sâu',
        desc: 'Cung cấp quyền can thiệp sâu vào tầng kiến trúc máy chủ vật lý, cho phép tùy biến cấu hình phần cứng tối đa từ CPU, RAM cho tới thiết lập RAID ổ cứng linh hoạt.',
        icon: HardDrive
      },
      {
        title: 'Kết nối Hybrid Connect tốc độ cao cực đại',
        desc: 'Tích hợp sẵn kênh truyền vật lý riêng, đấu nối trực tiếp (Dark Fibre, MPLS) từ văn phòng doanh nghiệp/hạ tầng On-premise đến cụm máy chủ Dedicated Cloud với băng thông không giới hạn và độ trễ tiệm cận bằng 0.',
        icon: Network
      },
      {
        title: 'Tự động hóa giám sát chuyên sâu (IAM & SIEM)',
        desc: 'Tích hợp công cụ phân quyền nâng cao, cho phép đẩy logs hệ thống về các trung tâm an ninh mạng (SOC/SIEM) của doanh nghiệp để giám sát 24/7 một cách bảo mật.',
        icon: Activity
      }
    ],
    pricing: {
      subDesc: 'Mô hình cấu hình phần cứng vật lý chuyên dụng. Chi phí thanh toán linh hoạt theo chu kỳ dài hạn để tối ưu ngân sách vận hành.',
      plans: [
        {
          name: 'DEDICATED COMPUTE NODE H1',
          price: 'Liên hệ báo giá',
          period: 'Giá tối ưu',
          specs: [
            { label: 'Dòng CPU Vật lý', value: 'Intel® Xeon® Gold (Độc quyền lõi thực)' },
            { label: 'Năng lực tính toán', value: 'Tối ưu xử lý ứng dụng Core Enterprise' },
            { label: 'Bộ nhớ RAM vật lý', value: 'Từ 128 GB RAM (Mở rộng không giới hạn)' },
            { label: 'Hệ thống Lưu trữ', value: 'Phân vùng SAS/SSD Enterprise RAID 10' },
            { label: 'Băng thông kết nối', value: '10 Gbps Internal Dedicated' },
            { label: 'Vị trí hạ tầng', value: 'Phòng VIP riêng tại TTDL Rated 3' }
          ],
          featured: false
        },
        {
          name: 'DEDICATED HPC NODE H2',
          price: 'Liên hệ báo giá',
          period: 'Giá tối ưu',
          specs: [
            { label: 'Dòng CPU Vật lý', value: 'Song song Intel® Xeon® Gold High-Core' },
            { label: 'Năng lực tính toán', value: 'Tích hợp NVIDIA GPU Acceleration (AI/Deep Learning)' },
            { label: 'Bộ nhớ RAM vật lý', value: 'Từ 512 GB RAM Tốc độ cao' },
            { label: 'Hệ thống Lưu trữ', value: 'Toàn bộ NVMe SSD Siêu siêu tốc' },
            { label: 'Băng thông kết nối', value: 'Up to 40 Gbps Uplink Dedicated' },
            { label: 'Vị trí hạ tầng', value: 'Phòng VIP riêng tại TTDL Rated 3' }
          ],
          featured: true
        }
      ]
    }
  };

  // 3. VIETTEL HYBRID CONNECT L3 DATA
  const hybridData = {
    hero: {
      badge: 'Giải pháp kết nối mạng liên kết hỗn hợp',
      title: 'Kết Nối Đa Đám Mây & Hạ Tầng Hỗn Hợp',
      subTitle: '(Viettel Hybrid Connect L3)',
      desc: 'Dịch vụ kết nối liên mạng chuyên dụng cho phép doanh nghiệp thiết lập kênh truyền bảo mật cao, băng thông cố định từ hạ tầng On-premise (hoặc các đám mây toàn cầu AWS, Azure, Google Cloud) trực tiếp đến hệ sinh thái Cloud của Viettel IDC, tối ưu dòng chảy dữ liệu thông suốt.',
      ctaPrimary: 'Tư vấn phương án đấu nối',
      ctaSecondary: 'Xem ma trận kết nối',
      ctaPrimaryHref: '/contact',
      ctaSecondaryHref: '#connection-matrix'
    },
    benefits: [
      {
        title: 'An toàn tuyệt đối, bỏ qua Internet công cộng',
        desc: 'Dữ liệu kinh doanh nhạy cảm được truyền tải hoàn toàn trên kênh truyền trục độc lập (MPLS, WAN, Dark Fibre), triệt tiêu hoàn toàn nguy cơ bị tấn công mạng, nghe lén hay nghẽn mạng băng thông công cộng.',
        icon: Lock,
        stats: 'Cách ly Internet 100%'
      },
      {
        title: 'Độ trễ cực thấp & Ổn định tối đa',
        desc: 'Đảm bảo hiệu suất hoạt động liên tục cho các hệ thống yêu cầu đồng bộ dữ liệu thời gian thực (Real-time Database Replication) giữa trung tâm dữ liệu chính và trung tâm dự phòng thảm họa (Disaster Recovery).',
        icon: Activity,
        stats: 'Độ trễ < 2ms'
      },
      {
        title: 'Hiện thực hóa chiến lược Multi-Cloud',
        desc: 'Giúp doanh nghiệp dễ dàng vận hành mô hình Đa đám mây (Multi-cloud) hoặc Đám mây hỗn hợp (Hybrid Cloud), kết hợp linh hoạt thế mạnh của hạ tầng dùng riêng nội địa và hạ tầng public quốc tế.',
        icon: Cloud,
        stats: 'Sẵn sàng Multi-Cloud'
      }
    ],
    features: [
      {
        title: 'Hỗ trợ định tuyến nâng cao (BGP, OSPF)',
        desc: 'Kết nối Layer 3 cho phép cấu hình định tuyến thông minh, tự động chuyển mạch dự phòng tức thì khi có sự cố đường truyền vật lý xảy ra.',
        icon: Network
      },
      {
        title: 'Tương thích hoàn toàn hệ sinh thái Viettel',
        desc: 'Kết nối trực tiếp private vào các cụm vVPC, vOPC, Viettel Object Storage, Viettel File Storage mà không cần cấu hình IP Public, giữ an toàn tối đa cho hệ thống.',
        icon: Database
      },
      {
        title: 'Giám sát băng thông chi tiết trực tuyến',
        desc: 'Cung cấp biểu đồ trực quan giúp quản trị viên theo dõi chính xác lưu lượng thực tế, tải đường truyền và trạng thái kết nối mạng thời gian thực 24/7.',
        icon: Terminal
      }
    ],
    pricing: {
      subDesc: 'Lựa chọn gói băng thông kết nối phù hợp với nhu cầu luân chuyển dữ liệu của tổ chức.',
      plans: [
        {
          name: 'CONNECT STANDARD (L3)',
          price: 'Khảo sát báo giá',
          period: 'Theo khoảng cách',
          specs: [
            { label: 'Băng thông cam kết', value: 'Từ 100 Mbps đến 1 Gbps' },
            { label: 'Hình thức đấu nối', value: 'WAN / MPLS VPN L3' },
            { label: 'Độ ổn định đường truyền', value: 'Cam kết SLA 99.95%' },
            { label: 'Kết nối Quốc tế', value: 'Sẵn sàng AWS Direct Connect / Azure ExpressRoute' }
          ],
          featured: false
        },
        {
          name: 'CONNECT ENTERPRISE (L3)',
          price: 'Khảo sát báo giá',
          period: 'Theo khoảng cách',
          specs: [
            { label: 'Băng thông cam kết', value: 'Từ 1 Gbps đến 100 Gbps (Đột phá hiệu suất)' },
            { label: 'Hình thức đấu nối', value: 'Dark Fibre (Cáp quang tối) / Kết nối trực tiếp liên vùng' },
            { label: 'Độ ổn định đường truyền', value: 'Cam kết SLA 99.99% (Cơ chế dự phòng kép Dual-active)' },
            { label: 'Kết nối Quốc tế', value: 'Sẵn sàng AWS Direct Connect / Azure ExpressRoute' }
          ],
          featured: true
        }
      ]
    }
  };

  const getServiceData = () => {
    switch (activeService) {
      case 'vopc':
        return vopcData;
      case 'hpc':
        return hpcData;
      case 'hybrid':
        return hybridData;
      default:
        return vopcData;
    }
  };

  const data = getServiceData();

  const faqs = [
    {
      q: 'Hạ tầng Viettel Dedicated Private Cloud được đặt tại đâu?',
      a: 'Toàn bộ hạ tầng đám mây dùng riêng được đặt tại các Trung tâm Dữ liệu đạt chuẩn quốc tế Rated 3 của Viettel IDC tại Hà Nội và Bình Dương, đảm bảo nghiêm ngặt về nguồn điện dự phòng, điều hòa chính xác, phòng cháy chữa cháy và an ninh vật lý 5 lớp.'
    },
    {
      q: 'Viettel IDC hỗ trợ triển khai hệ ảo hóa nào trên Private Cloud?',
      a: 'Chúng tôi hỗ trợ đa dạng mọi công nghệ ảo hóa hàng đầu bao gồm VMware vSphere, Nutanix AHV, Microsoft Hyper-V cũng như các giải pháp mã nguồn mở KVM / OpenStack tùy theo định hướng kiến trúc và bản quyền của doanh nghiệp.'
    },
    {
      q: 'Kênh truyền Hybrid Connect L3 kết nối trực tiếp đến các đám mây công cộng quốc tế như thế nào?',
      a: 'Viettel IDC hợp tác với các nhà cung cấp kết nối đám mây lớn trên thế giới để thiết lập đường truyền chuyên biệt trực tiếp (Direct Connect / ExpressRoute) từ trung tâm dữ liệu của chúng tôi sang AWS, Azure và Google Cloud, mang lại băng thông ổn định cao và giảm tới 40% chi phí chuyển tải dữ liệu (egress charge) quốc tế.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FA] text-neutral-900 font-sans antialiased">
      <Navbar />

      <main className="flex-1" id="main-content">
        
        {/* SECTION 1: HERO */}
        <section id="hero-section" className="relative overflow-hidden bg-gradient-to-br from-[#0F0F11] via-[#151518] to-[#25090F] text-white py-20 md:py-28 lg:py-32 px-6 md:px-10 lg:px-12">
          {/* Grid and dynamic gradient background blurs */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
          <div className="absolute top-1/4 right-0 bg-[#EE0033]/15 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -mr-40 -mt-20" />
          <div className="absolute bottom-0 left-0 bg-[#EE0033]/5 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="max-w-7xl mx-auto relative z-10 text-left flex flex-col items-start py-4 w-full">
            <div className="space-y-6 max-w-4xl flex flex-col items-start">
              
              {/* Dynamic Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService + '-badge'}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 bg-[#EE0033]/10 border border-[#EE0033]/25 px-4 py-1.5 rounded-full text-[#FF4D73] text-xs font-bold uppercase tracking-wider"
                >
                  <span className="w-2 h-2 rounded-full bg-[#EE0033] animate-pulse" />
                  <span>{data.hero.badge}</span>
                </motion.div>
              </AnimatePresence>

              {/* Title Header with smooth transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService + '-title'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <h1 className="text-3.5xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-sans">
                    <span className="block">{data.hero.title}</span>
                    <span className="block text-[#FF4D73] text-2xl md:text-3.5xl lg:text-4xl font-extrabold mt-2">
                      {data.hero.subTitle}
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeService + '-desc'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl font-sans"
                >
                  {data.hero.desc}
                </motion.p>
              </AnimatePresence>

              {/* CTA Buttons */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService + '-ctas'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto"
                >
                  <Link
                    href={data.hero.ctaPrimaryHref}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#EE0033] hover:bg-[#FF1A4E] text-white font-extrabold text-xs md:text-sm tracking-wider rounded-full shadow-lg shadow-[#EE0033]/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>{data.hero.ctaPrimary}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={data.hero.ctaSecondaryHref}
                    target={data.hero.ctaSecondaryHref.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white/20 hover:border-white text-gray-300 hover:text-white font-bold text-xs md:text-sm tracking-wider rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    {data.hero.ctaSecondary}
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* STICKY TAB NAVIGATION SWITCHER FOR DEDICATED PRIVATE CLOUD */}
        <div className="sticky top-0 z-[1010] bg-white/95 backdrop-blur-md border-b border-neutral-200/60 shadow-md transition-all duration-300 py-1">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-auto md:h-[68px] py-3 md:py-0">
              
              {/* Sticky Title */}
              <div className="flex items-center gap-2 shrink-0">
                <Server className="w-5 h-5 text-[#EE0033]" />
                <span className="font-sans font-black text-xs md:text-sm text-neutral-900 tracking-wider uppercase">
                  DEDICATED PRIVATE CLOUD
                </span>
              </div>

              {/* Service Navigation Selector Tabs - Fully functional */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                {[
                  { id: 'vopc', label: '1. Viettel Open Private Cloud', labelShort: 'vOPC Cloud Mở' },
                  { id: 'hpc', label: '2. Dedicated Private Cloud', labelShort: 'Dedicated HPC' },
                  { id: 'hybrid', label: '3. Hybrid Connect L3', labelShort: 'Hybrid Connect' }
                ].map((item) => {
                  const isActive = activeService === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveService(item.id as ServiceType)}
                      className={`relative h-[38px] px-4 rounded-full text-[11px] md:text-xs font-black transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center ${
                        isActive
                          ? 'bg-[#EE0033] text-white shadow-md shadow-[#EE0033]/20'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 2: LỢI ÍCH VƯỢT TRỘI */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                LỢI THẾ CỐT LÕI
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Giá trị thực tiễn cho doanh nghiệp
              </h2>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full" />
            </div>

            {/* Benefits Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {data.benefits.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={activeService + '-benefit-' + idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="flex flex-col justify-between p-6 md:p-8 bg-neutral-50 border border-neutral-200/50 rounded-3xl hover:border-[#EE0033]/30 hover:shadow-xl transition-all duration-300 h-full"
                    >
                      <div className="space-y-4">
                        {/* Icon Container */}
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
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 3: TÍNH NĂNG CHÍNH (Alternating Layout) */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-neutral-50 text-left border-y border-neutral-150">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header */}
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                TÍNH NĂNG ĐỘC QUYỀN
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Năng lực hạ tầng chuyên biệt và tối tân
              </h2>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full" />
            </div>

            {/* Alternating Features */}
            <div className="space-y-12">
              <AnimatePresence mode="popLayout">
                {data.features.map((feat, idx) => {
                  const Icon = feat.icon;
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={activeService + '-feat-' + idx}
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isEven ? 20 : -20 }}
                      transition={{ duration: 0.35, delay: idx * 0.1 }}
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-neutral-200/50 p-6 md:p-8 rounded-3xl ${
                        isEven ? '' : 'lg:flex-row-reverse'
                      }`}
                    >
                      {/* Text block */}
                      <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="w-10 h-10 rounded-xl bg-[#EE0033]/5 text-[#EE0033] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-neutral-900">
                          {feat.title}
                        </h3>
                        <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-sans">
                          {feat.desc}
                        </p>
                      </div>

                      {/* Illustrative design block matching high-fidelity "viettel cloud server" style */}
                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} h-full min-h-[180px] bg-gradient-to-br from-[#121214] to-[#1D1215] rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-inner`}>
                        <div className="absolute top-0 right-0 bg-[#EE0033]/10 w-32 h-32 rounded-full blur-2xl" />
                        
                        <div className="space-y-2 relative z-10 font-mono text-[10px] text-emerald-400">
                          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 text-[9px] text-zinc-400">
                            <span>SYSTEM DEPLOYMENT STATUS</span>
                            <span className="text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              ONLINE
                            </span>
                          </div>
                          <p>&gt; sysctl -w net.ipv4.ip_forward=1</p>
                          <p className="text-zinc-500">{"// Provisioning optimized hypervisor stack..."}</p>
                          <p className="text-zinc-300">&gt; core_module_status --active-routes</p>
                          <p className="text-zinc-400">Routes: BGP Established | Priority High</p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-2 border-t border-zinc-800 relative z-10 text-[9px] text-zinc-400">
                          <span>Service ID: {activeService.toUpperCase()}-F0{idx + 1}</span>
                          <span>Viettel IDC Enterprise</span>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* SECTION 4: BẢNG GIÁ DỊCH VỤ */}
        <section id="pricing-section" className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* Header */}
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55">
                BẢNG GIÁ ĐÀN HỒI
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Chi phí đầu tư hạ tầng tối ưu
              </h2>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                {data.pricing.subDesc}
              </p>
              <div className="h-1 w-16 bg-[#EE0033] rounded-full" />
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
              <AnimatePresence mode="popLayout">
                {data.pricing.plans.map((plan, idx) => (
                  <motion.div
                    key={activeService + '-plan-' + plan.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={`relative rounded-3xl p-8 flex flex-col justify-between border-2 transition-all duration-300 ${
                      plan.featured 
                        ? 'border-[#EE0033] bg-[#EE0033]/5 shadow-xl shadow-[#EE0033]/10' 
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    {plan.featured && (
                      <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#EE0033] text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Được đề xuất nhiều nhất</span>
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Name & Title */}
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-extrabold text-[#EE0033] uppercase tracking-wider block">
                          PHIÊN BẢN DOANH NGHIỆP
                        </span>
                        <h3 className="text-xl font-black text-neutral-900">
                          {plan.name}
                        </h3>
                      </div>

                      {/* Cost Info */}
                      <div className="text-left py-2 border-y border-neutral-200/50">
                        {plan.price.includes('Liên hệ') || plan.price.includes('Khảo sát') ? (
                          <div className="space-y-1">
                            <span className="text-2xl md:text-3xl font-black text-neutral-900">
                              {plan.price}
                            </span>
                            <span className="text-xs text-neutral-500 block font-sans">
                              {plan.period}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl md:text-4xl font-black text-[#EE0033]">
                              {plan.price}
                            </span>
                            <span className="text-xs text-neutral-500 font-bold font-sans">
                              đ / {plan.period}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Specs Checklist */}
                      <div className="space-y-4">
                        <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">
                          Thông số cấu hình kỹ thuật:
                        </p>
                        <ul className="space-y-3">
                          {plan.specs.map((spec, sidx) => (
                            <li key={sidx} className="flex items-start justify-between text-xs font-sans">
                              <span className="text-neutral-500 font-medium">{spec.label}</span>
                              <span className="text-neutral-900 font-extrabold text-right ml-4">
                                {spec.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3">
                      <Link
                        href="/contact"
                        className={`w-full text-center py-3 px-6 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                          plan.featured
                            ? 'bg-[#EE0033] hover:bg-[#FF1A4E] text-white shadow-lg shadow-[#EE0033]/25'
                            : 'bg-neutral-900 hover:bg-neutral-950 text-white'
                        }`}
                      >
                        Đăng ký dịch vụ
                      </Link>
                      
                      {!plan.price.includes('Liên hệ') && !plan.price.includes('Khảo sát') && (
                        <Link
                          href="/contact"
                          className="w-full text-center py-2.5 px-6 rounded-full text-xs font-bold border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-200"
                        >
                          Dùng thử miễn phí
                        </Link>
                      )}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 5: ĐÁNH GIÁ CHUẨN KỸ THUẬT & TRUNG TÂM DỮ LIỆU */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-neutral-900 text-white text-left overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-[#EE0033]/5 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-[#EE0033]/15 px-2.5 py-1 rounded border border-[#EE0033]/25 w-max block">
                TIÊU CHUẨN QUỐC TẾ
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                Trung tâm Dữ liệu đạt chuẩn Rated 3 TIA-942
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">
                Viettel IDC sở hữu hệ thống phòng máy đạt tiêu chuẩn khắt khe nhất tại Việt Nam. Đảm bảo năng lượng dự phòng (N+1), điều hòa chính xác liên tục và hệ thống phòng chống đột nhập tuyệt đối an toàn.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: 'Uptime Cam Kết', val: '99.99%' },
                  { label: 'Hỗ Trợ Kỹ Thuật', val: '24/7/365' },
                  { label: 'Tiêu Chuẩn Bảo Mật', val: 'PCI DSS' },
                  { label: 'Chứng Chỉ Vận Hành', val: 'ISO 27017' }
                ].map((st, idx) => (
                  <div key={idx} className="border-l-2 border-[#EE0033] pl-4">
                    <span className="text-[10px] text-zinc-400 block font-sans font-semibold uppercase">{st.label}</span>
                    <span className="text-base md:text-lg font-black text-white font-mono">{st.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustrative Right visual card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#1E2329] to-[#121212] rounded-3xl p-8 border border-zinc-800 text-white relative min-h-[350px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#EE0033]" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                    Real-time NOC telemetry
                  </span>
                </div>

                <div className="space-y-2 bg-black/40 border border-zinc-800/80 rounded-xl p-4 font-mono text-[10px] text-emerald-400 leading-relaxed">
                  <p>&gt; telemetry_monitor --target rack_cluster_dedicated</p>
                  <p className="text-zinc-500">{"// Checking server nodes power status..."}</p>
                  <p className="text-zinc-300">PDU_01: Nominal | PDU_02: Nominal (A-B Redundancy)</p>
                  <p className="text-zinc-300">Cooling_System: 21.8°C | Relative Humidity: 45.2%</p>
                  <p className="text-[#EE0033] font-bold">Alert Level: Safe</p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-zinc-500 block">KẾT NỐI TRỤC CHÍNH</span>
                  <span className="font-extrabold text-white">Full-Mesh Topology</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-zinc-500 block">KIỂM DUYỆT BỞI</span>
                  <span className="font-extrabold text-[#EE0033]">Viettel IDC Security</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ ACCORDION */}
        <section className="py-20 px-6 md:px-10 lg:px-12 bg-white text-left border-b border-neutral-100">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="space-y-3 text-center">
              <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-100/55 mx-auto w-max block">
                HỎI ĐÁP DỊCH VỤ
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Giải đáp thắc mắc về Dedicated Private Cloud
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

        {/* SECTION 7: FINAL CTA */}
        <section className="bg-[#EE0033] text-white py-16 px-6 md:px-12 lg:px-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-white/5 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 bg-black/10 w-[400px] h-[400px] rounded-full blur-2xl pointer-events-none -mr-20 -mb-20" />

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <h2 className="text-2xl md:text-4.5xl font-black tracking-tight leading-tight text-white">
              Cùng chuyên gia thiết kế hạ tầng Private Cloud cho riêng bạn
            </h2>
            <p className="text-xs md:text-base text-red-100 max-w-2xl mx-auto leading-relaxed font-sans">
              Cam kết an toàn dữ liệu, tuân thủ pháp lý và năng lực xử lý hiệu năng cao vượt bậc cho mọi nghiệp vụ số.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#EE0033] font-black text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-neutral-50 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Nhận tư vấn ngay
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-white/80 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider rounded-full hover:border-white hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Khảo sát hạ tầng hiện tại
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
