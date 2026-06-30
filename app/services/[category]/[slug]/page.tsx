'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, ChevronRight, CheckCircle, HelpCircle, Calculator, Phone, 
  ChevronDown, ArrowUpRight, HelpCircle as FAQIcon, Check, Layers, HardDrive, Shield, Sparkles,
  Server, Zap, Globe, RefreshCw, AlertCircle, Info, Activity, Database, Network,
  Clock, Bell, Lock, BookOpen, Settings, Mail, ArrowRight
} from 'lucide-react';

import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import ScreenSwitcher from '../../../../components/ScreenSwitcher';
import ViettelCloudServerPage from '../../../../components/ViettelCloudServerPage';
import { SERVICE_CATEGORIES } from '../../../../lib/db';

type PageParams = { category: string; slug: string };

interface PageProps {
  params: Promise<PageParams>;
}

function ServiceDetailPageContent({ params }: PageProps) {
  const router = useRouter();
  
  // Resolve the dynamic parameters safely
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  const productSlug = resolvedParams.slug;

  const category = SERVICE_CATEGORIES.find(c => c.slug === categorySlug);
  const product = category?.products.find(p => p.slug === productSlug) || {
    id: 'cloud-server',
    name: 'Viettel Cloud Server',
    slug: 'viettel-cloud-server',
    categorySlug: 'compute',
    description: 'Dịch vụ máy chủ ảo đám mây hiệu năng cao, mở rộng tức thì, cam kết SLA tới 99.99%. Tích hợp ổ cứng SSD Enterprise siêu tốc.',
    features: [
      'Khởi tạo dịch vụ thần tốc dưới 5 phút thông qua dashboard trực quan.',
      'Kết nối Internet băng thông rộng lên tới 10 Gbps không nghẽn mạch.',
      'Cam kết chất lượng dịch vụ SLA tài chính bảo đảm 99.99%.',
      'Tự động sao lưu tuần hoàn hàng tuần, đảm bảo tuyệt đối an toàn dữ liệu.'
    ],
    specs: [
      { label: 'Uptime Cam Kết', value: '✓ 99.99%' },
      { label: 'Khởi tạo', value: '⚡ < 5 phút' },
      { label: 'Bảo mật tiêu chuẩn', value: '🔒 ISO 27001' },
      { label: 'Hỗ trợ kỹ thuật', value: '💬 24/7/365' }
    ],
    pricing: [
      {
        planName: 'Cloud Server Standard 1',
        specs: ['1 vCPU Intel Xeon Gold', '2 GB RAM DDR4', '50 GB SSD Enterprise', '1 IPv4 Public', 'Mạng 100Mbps Shared'],
        price: '190.000',
        period: 'tháng',
        fType: 'F1 Auto'
      },
      {
        planName: 'Cloud Server Professional 2 (Phổ biến)',
        specs: ['2 vCPU Intel Xeon Gold', '4 GB RAM DDR4', '100 GB SSD Enterprise', '1 IPv4 Public', 'Mạng 200Mbps Shared'],
        price: '380.000',
        period: 'tháng',
        isPopular: true,
        fType: 'F1 Auto'
      },
      {
        planName: 'Cloud Server Advanced 4',
        specs: ['4 vCPU Intel Xeon Gold', '8 GB RAM DDR4', '150 GB SSD Enterprise', '1 IPv4 Public', 'Mạng 300Mbps Shared'],
        price: '740.000',
        period: 'tháng',
        fType: 'F1 Auto'
      }
    ],
    faqs: [
      { q: 'SLA 99.99% của Viettel Cloud Server được cam kết như thế nào?', a: 'Viettel IDC cam kết bồi thường tài chính trực tiếp trong trường hợp thời gian uptime của máy chủ sụt giảm dưới ngưỡng 99.99% mỗi tháng, quy định minh bạch trong hợp đồng cấu trúc dịch vụ SLA.' },
      { q: 'Tôi có thể cài đặt hệ điều hành nào trên máy chủ ảo?', a: 'Hệ thống hỗ trợ tự động cài đặt tất cả các hệ điều hành phổ biến: Windows Server, CentOS, Ubuntu, Debian hoặc tải lên file ISO cấu hình riêng của doanh nghiệp.' },
      { q: 'Tốc độ đọc ghi của ổ cứng lưu trữ là bao nhiêu?', a: 'Chúng tôi sử dụng 100% SSD SAS/NVMe Enterprise với công nghệ RAID 10 đem lại tốc độ IOPS tối thiểu 10,000 IOPS đáp ứng mượt mà cả dịch vụ cơ sở dữ liệu lớn.' },
      { q: 'Hệ thống có hỗ trợ mở rộng phần cứng mà không mất dữ liệu không?', a: 'Có, bạn hoàn toàn có thể nâng cấp dung lượng RAM, CPU và Disk trực tuyến chỉ qua vài click ở Trang quản trị Console mà hoàn toàn không ảnh hưởng tới dữ liệu cũ.' },
      { q: 'Làm thế nào để chuyển đổi dữ liệu từ hệ thống cũ về Viettel IDC?', a: 'Đội ngũ kỹ sư giải pháp của chúng tôi hỗ trợ chuyển dịch dữ liệu miễn phí 24/7, cam kết không gây gián đoạn dịch vụ của doanh nghiệp bạn.' }
    ]
  };

  const [pricingLoaded, setPricingLoaded] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'vmware' | 'openstack'>('vmware');
  const [selectedPricingPlan, setSelectedPricingPlan] = useState<'saving' | 'payg'>('saving');
  const [selectedRegion, setSelectedRegion] = useState<'north' | 'south'>('north');

  // --- CLOUD SERVER CALCULATOR STATE ---
  const [calcCpu, setCalcCpu] = useState(4);
  const [calcRam, setCalcRam] = useState(8);
  const [calcSsd, setCalcSsd] = useState(150);
  const [calcIp, setCalcIp] = useState(1);
  const [calcBandwidth, setCalcBandwidth] = useState(100);
  const [calcOs, setCalcOs] = useState<'linux' | 'windows'>('linux');
  const [calcBackup, setCalcBackup] = useState(true);
  const [calcFirewall, setCalcFirewall] = useState(false);
  const [calcPeriod, setCalcPeriod] = useState<1 | 6 | 12 | 24>(12); // months
  const [activePricingTab, setActivePricingTab] = useState<'standard' | 'compute' | 'memory'>('standard');

  // Pricing math for custom calculator
  const calcCpuCost = calcCpu * 85000;
  const calcRamCost = calcRam * 45000;
  const calcSsdCost = calcSsd * 4000;
  const calcIpCost = calcIp * 80000;
  const calcBandwidthCost = Math.max(0, calcBandwidth - 100) * 2000;
  const calcFirewallCost = calcFirewall ? 120000 : 0;

  const calcSubtotal = calcCpuCost + calcRamCost + calcSsdCost + calcIpCost + calcBandwidthCost + calcFirewallCost;
  const calcBackupCost = calcBackup ? Math.round(calcSubtotal * 0.15) : 0;
  const calcMonthlyPreDiscount = calcSubtotal + calcBackupCost;

  const calcDiscountRate = calcPeriod === 6 ? 0.10 : calcPeriod === 12 ? 0.20 : calcPeriod === 24 ? 0.30 : 0;
  const calcDiscountAmount = calcMonthlyPreDiscount * calcDiscountRate;
  const calcFinalMonthlyCost = calcMonthlyPreDiscount - calcDiscountAmount;

  // Simulate pricing API ISR load state
  useEffect(() => {
    const timer = setTimeout(() => {
      setPricingLoaded(true);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const currentCategoryName = category?.name || 'Điện toán & Container';

  // --- SPECIALIZED VIETTEL CLOUD SERVER LAYOUT ---
  if (productSlug === 'viettel-cloud-server') {
    return <ViettelCloudServerPage />;
    const standardSeries = [
      { name: 'Standard S1', cpu: 1, ram: 2, ssd: 50, ip: 1, bandwidth: '100 Mbps', price: '190.000' },
      { name: 'Standard S2', cpu: 2, ram: 4, ssd: 100, ip: 1, bandwidth: '100 Mbps', price: '380.000', isPopular: true },
      { name: 'Standard S4', cpu: 4, ram: 8, ssd: 150, ip: 1, bandwidth: '150 Mbps', price: '740.000' },
      { name: 'Standard S8', cpu: 8, ram: 16, ssd: 250, ip: 1, bandwidth: '200 Mbps', price: '1.480.000' },
    ];

    const computeOptimizedSeries = [
      { name: 'PRO Compute C2', cpu: '2 vCPU Dedicated', ram: '8 GB DDR4 ECC', ssd: '120 GB Enterprise', ip: 1, bandwidth: '150 Mbps', price: '550.000' },
      { name: 'PRO Compute C4', cpu: '4 vCPU Dedicated', ram: '16 GB DDR4 ECC', ssd: '200 GB Enterprise', ip: 1, bandwidth: '200 Mbps', price: '1.100.000', isPopular: true },
      { name: 'PRO Compute C8', cpu: '8 vCPU Dedicated', ram: '32 GB DDR4 ECC', ssd: '300 GB Enterprise', ip: 1, bandwidth: '250 Mbps', price: '2.200.000' },
      { name: 'PRO Compute C16', cpu: '16 vCPU Dedicated', ram: '64 GB DDR4 ECC', ssd: '500 GB Enterprise', ip: 1, bandwidth: '300 Mbps', price: '4.400.000' },
    ];

    const memoryOptimizedSeries = [
      { name: 'MEM Enterprise M4', cpu: '4 vCPU Dedicated', ram: '32 GB DDR4 ECC', ssd: '250 GB Enterprise', ip: 1, bandwidth: '200 Mbps', price: '1.800.000' },
      { name: 'MEM Enterprise M8', cpu: '8 vCPU Dedicated', ram: '64 GB DDR4 ECC', ssd: '400 GB Enterprise', ip: 1, bandwidth: '250 Mbps', price: '3.500.000', isPopular: true },
      { name: 'MEM Enterprise M16', cpu: '16 vCPU Dedicated', ram: '128 GB DDR4 ECC', ssd: '600 GB Enterprise', ip: 1, bandwidth: '300 Mbps', price: '6.900.000' },
      { name: 'MEM Enterprise M24', cpu: '24 vCPU Dedicated', ram: '192 GB DDR4 ECC', ssd: '800 GB Enterprise', ip: 1, bandwidth: '400 Mbps', price: '10.300.000' },
    ];

    const viettelFaqs = [
      { q: 'SLA 99.99% của Viettel Cloud Server được cam kết và bồi thường thế nào?', a: 'Viettel IDC cam kết bồi thường tài chính trực tiếp được quy định chi tiết trong hợp đồng dịch vụ nếu chỉ số sẵn sàng của máy chủ ảo (uptime) sụt giảm dưới ngưỡng 99.99% mỗi tháng. Hệ thống dự phòng kép chủ động N+1 ở cả tầng nguồn điện, làm mát, cáp kết nối và cụm máy chủ vật lý đảm bảo độ ổn định tối đa cho hạ tầng.' },
      { q: 'Tốc độ IOPS và loại ổ cứng sử dụng trên Viettel Cloud Server là gì?', a: 'Viettel IDC sử dụng 100% ổ cứng Enterprise SSD SAS và NVMe chuyên dụng của Samsung/Intel cấu hình RAID 10 bảo vệ dữ liệu ở mức vật lý. Tốc độ đọc ghi của hệ thống cực cao với IOPS cam kết tối thiểu từ 10,000 IOPS đến 30,000 IOPS cho các tác vụ cơ sở dữ liệu lớn.' },
      { q: 'Quá trình nâng cấp cấu hình máy chủ có làm gián đoạn dịch vụ không?', a: 'Không, bạn hoàn toàn có thể nâng cấp CPU, dung lượng RAM, mở rộng ổ đĩa lưu trữ hoặc tăng băng thông Internet trực tiếp trên trang quản trị Console của Viettel IDC chỉ với vài click chuột. Hệ thống sẽ tự động cập nhật tài nguyên nóng (Hot-add) mà hoàn toàn không ảnh hưởng tới tính toàn vẹn của dữ liệu hiện tại.' },
      { q: 'Chi phí truyền tải dữ liệu (Data Transfer) được tính toán như thế nào?', a: 'Khác với AWS, Azure hay Google Cloud vốn tính phí truyền tải dữ liệu ra ngoài (Data Transfer Out / Egress) rất cao lên tới $0.08 - $0.12 mỗi GB, Viettel IDC miễn phí hoàn toàn 100% lưu lượng truyền tải dữ liệu vào/ra (Unlimited Data Transfer). Bạn chỉ trả một mức chi phí băng thông cố định hàng tháng theo cổng mạng kết nối.' },
      { q: 'Dữ liệu lưu trữ có tuân thủ Luật An ninh mạng Việt Nam không?', a: 'Có, toàn bộ máy chủ ảo Viettel Cloud Server được đặt tại các Trung tâm dữ liệu chuẩn Rated 3 TIA-942 trong nước của Viettel IDC (Hà Nội, Đà Nẵng, Bình Dương). Điều này đảm bảo dữ liệu của doanh nghiệp bạn tuân thủ hoàn toàn 100% Luật An ninh mạng và các quy định pháp lý về lưu trữ dữ liệu chủ quyền tại Việt Nam.' }
    ];

    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FA] text-[#333333] font-sans antialiased">
        <Navbar />

        {/* STICKY SUB-MENU (Azure/AWS Style) */}
        <div className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 hidden md:block shadow-xs">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-gray-900 text-sm">Viettel Cloud Server</span>
              <span className="bg-brand-10 text-[#EE0033] border border-brand-100 text-[10px] px-1.5 py-0.5 rounded font-extrabold">F-TYPE v3</span>
            </div>
            <nav className="flex items-center space-x-6 text-xs font-semibold text-gray-500">
              <a href="#overview" className="hover:text-[#EE0033] transition-all-200">Tổng quan</a>
              <a href="#advantages" className="hover:text-[#EE0033] transition-all-200">Ưu điểm so sánh</a>
              <a href="#pricing" className="hover:text-[#EE0033] transition-all-200">Bảng giá đề xuất</a>
              <a href="#calculator" className="hover:text-[#EE0033] transition-all-200">Công cụ tự cấu hình</a>
              <a href="#architecture" className="hover:text-[#EE0033] transition-all-200">Kiến trúc hạ tầng</a>
              <a href="#faqs" className="hover:text-[#EE0033] transition-all-200">Hỏi đáp kỹ thuật</a>
            </nav>
            <a 
              href="https://console.viettelidc.com.vn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-[#EE0033] hover:bg-[#D9002C] text-white font-bold text-xs rounded transition-all-200 shadow-sm"
            >
              Khởi tạo ngay
            </a>
          </div>
        </div>

        <main className="flex-1" id="main-content">
          {/* HERO SECTION */}
          <section id="overview" className="relative overflow-hidden bg-gradient-to-br from-[#121212] via-[#1A1A1A] to-[#251014] text-white py-16 lg:py-24 px-6 md:px-10 lg:px-12">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#EE0033]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#EE0033]/15 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left text column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-[#EE0033]/10 border border-[#EE0033]/30 text-brand-400 py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
                  <span>Đám mây tự chủ công nghệ đạt chuẩn quốc tế</span>
                </div>
                
                <h1 className="text-3.5xl md:text-5xl font-extrabold tracking-tight font-sans leading-tight text-white">
                  Viettel Cloud Server <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-[#FF6B8B]">Hạ tầng vững chắc cho chuyển đổi số</span>
                </h1>
                
                <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl">
                  Trải nghiệm máy chủ ảo thế hệ mới với tài nguyên CPU/RAM chuyên dụng biệt lập, 100% ổ lưu trữ Enterprise SSD NVMe siêu tốc, bảo vệ bởi hệ thống tường lửa đa lớp tiên tiến. Được vận hành trên mạng lưới trung tâm dữ liệu chuẩn Rated 3 TIA-942 rộng khắp Việt Nam.
                </p>

                {/* Badges specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <span className="text-sm font-extrabold text-brand-400 block">SLA 99.99%</span>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">Sẵn sàng dịch vụ</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <span className="text-sm font-extrabold text-brand-400 block">⚡ &lt; 5 Phút</span>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">Khởi tạo tự động</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <span className="text-sm font-extrabold text-brand-400 block">30,000 IOPS</span>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">Ổ cứng SAS/NVMe</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <span className="text-sm font-extrabold text-brand-400 block">ISO 27017</span>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">Bảo mật đám mây</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <a 
                    href="https://console.viettelidc.com.vn"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 bg-[#EE0033] hover:bg-[#D9002C] text-white font-bold text-sm rounded text-center transition-all-200 shadow-lg shadow-[#EE0033]/25 focus-ring-brand"
                  >
                    Bắt đầu dùng thử miễn phí
                  </a>
                  <a 
                    href="#calculator"
                    className="px-7 py-3.5 bg-white/10 border border-white/20 hover:border-brand-500 hover:bg-white/15 text-white font-bold text-sm rounded text-center transition-all-200 shadow-sm"
                  >
                    Tính giá cấu hình tùy chỉnh
                  </a>
                </div>
              </div>

              {/* Right illustrated column */}
              <div className="lg:col-span-5 relative">
                <div className="bg-gradient-to-b from-[#222222] to-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-500/10 w-24 h-24 rounded-full blur-xl" />
                  
                  {/* Visual simulated console */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#EE0033]" />
                      <span className="text-gray-300 font-bold">VIETTEL_CLOUD_SERVER // F3-NODE-4</span>
                    </div>
                    <span className="text-[10px] text-[#22C55E] font-bold flex items-center space-x-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-1" />
                      <span>OPERATIONAL</span>
                    </span>
                  </div>

                  {/* Simulated cloud server layout */}
                  <div className="space-y-4 font-mono text-[11px] text-gray-300">
                    <div className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span>CPU THREADS ALLOCATION</span>
                        <span className="text-brand-400">Intel® Xeon® Gold</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[1, 2, 3, 4].map((t) => (
                          <div key={t} className="bg-white/5 border border-white/10 p-1.5 rounded text-center">
                            <span className="text-[10px] text-brand-300 block font-bold">CORE_{t}</span>
                            <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                              <div className="bg-[#EE0033] h-1 rounded-full" style={{ width: t % 2 === 0 ? '75%' : '40%' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span>DATA REDUNDANCY LAYER</span>
                        <span className="text-emerald-400">Ceph 3-Replica Active</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 flex gap-1">
                          <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px]">OS_VOL: OK</span>
                          <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px]">DATA_VOL: OK</span>
                          <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px]">BACKUP: OK</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">SLA 99.99%</span>
                      </div>
                    </div>

                    {/* Network bandwidth stream simulation */}
                    <div className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span>DOMESTIC TRANSIT PORT</span>
                        <span className="text-brand-300">10 Gbps Uplink Active</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-sans text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-3.5 h-3.5 text-brand-400" />
                          <span>Mạng trong nước</span>
                        </div>
                        <span className="text-[#22C55E] font-bold font-mono">100% Free Transfer</span>
                      </div>
                    </div>

                    <div className="bg-brand-500/10 border border-brand-500/20 p-3 rounded-xl flex items-center justify-between text-xs font-sans">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-[#EE0033]" />
                        <span className="text-gray-200">Cam kết bảo mật Việt Nam</span>
                      </div>
                      <span className="text-gray-400 text-[10px]">Luật ANM 2018</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* COMPETITIVE ADVANTAGES - COMPARISON WITH HYPERSCALERS */}
          <section id="advantages" className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#EE0033] font-extrabold text-xs uppercase tracking-wider block">Ưu điểm so sánh</span>
              <h2 className="text-2.5xl md:text-3.5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Thiết kế tối ưu hóa tốt hơn đám mây quốc tế (AWS, Azure, Google Cloud)
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Được nghiên cứu và thiết kế chuyên sâu nhằm đem lại lợi ích kép cho doanh nghiệp Việt Nam: Tiêu chuẩn kỹ thuật cao cấp ngang hàng toàn cầu kết hợp mức chi phí tối ưu nội địa.
              </p>
            </div>

            {/* Bento-style grid advantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all-200 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-gray-900">Chi phí tối ưu vượt trội</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Tiết kiệm đến <strong>40% - 60%</strong> so với AWS, Azure hay GCP nhờ cơ chế <strong>miễn phí hoàn toàn 100% lưu lượng Data Transfer</strong> vào/ra và thanh toán bằng VNĐ không chịu rủi ro biến động tỷ giá USD.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all-200 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-gray-900">Hiệu năng máy chủ cực hạn</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Tận dụng dòng chip vi xử lý <strong>Intel Xeon Gold / AMD EPYC</strong> thế hệ mới nhất, bộ nhớ RAM DDR4 ECC tốc độ cao cùng hệ thống lưu trữ <strong>Enterprise SSD SAS/NVMe RAID 10</strong> đảm bảo IOPS thực tế cực cao.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all-200 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-gray-900">Chủ quyền & Tuân thủ</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Lưu trữ 100% tại Việt Nam, đáp ứng đầy đủ yêu cầu khắt khe nhất của <strong>Luật An ninh mạng Việt Nam 2018</strong>. Đầy đủ hóa đơn GTGT hợp lệ của nhà nước để khấu trừ thuế doanh nghiệp.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all-200 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-gray-900">Độ trễ siêu thấp &lt; 2ms</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Đường truyền internet kết nối trực tiếp vào hạ tầng xương sống cáp quang lớn nhất Việt Nam của Viettel, triệt tiêu hoàn toàn sự cố đứt cáp quang biển quốc tế vốn làm tê liệt AWS/Azure.
                </p>
              </div>
            </div>

            {/* LATENCY & COST VISUAL COMPARISON CHART */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-lg font-extrabold text-gray-900">Biểu đồ so sánh chất lượng đường truyền & chi phí</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Doanh nghiệp sử dụng dịch vụ tại Việt Nam sẽ cảm nhận rõ rệt sự vượt trội về độ phản hồi (Latency) của trang web, API khi đặt tại các cụm Server trong nước so với Singapore hay HongKong của nhà cung cấp quốc tế.
                </p>
                <div className="bg-[#FFF5F6] border-l-4 border-[#EE0033] p-3 text-[11px] text-[#A6001D] rounded-r-lg space-y-1">
                  <strong>💡 Bạn có biết?</strong>
                  <p>Khi xảy ra sự cố đứt cáp biển (AAG, APG), tốc độ kết nối đến các đám mây quốc tế bị sụt giảm từ 70% đến 90%. Với Viettel Cloud Server, hạ tầng của bạn được bảo toàn 100% nhờ đường truyền nội địa an toàn.</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                {/* Chart 1: Latency */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span>Độ trễ phản hồi (Latency) trung bình tại Việt Nam (Càng thấp càng tốt)</span>
                    <span className="text-gray-400 font-normal">Đơn vị: ms</span>
                  </div>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-gray-900">Viettel Cloud Server (Hà Nội / Bình Dương)</span>
                        <span className="text-[#EE0033] font-bold">1 - 3 ms (Cực nhanh)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                        <div className="bg-[#EE0033] h-full rounded transition-all duration-1000" style={{ width: '4%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-gray-600">
                        <span>AWS / Google Cloud (Khu vực Singapore)</span>
                        <span>35 - 55 ms</span>
                      </div>
                      <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                        <div className="bg-gray-400 h-full rounded" style={{ width: '45%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-gray-600">
                        <span>Microsoft Azure (Khu vực Hong Kong)</span>
                        <span>45 - 65 ms</span>
                      </div>
                      <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                        <div className="bg-gray-400 h-full rounded" style={{ width: '55%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart 2: Cost */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span>Chi phí cấu hình tương đương (2 vCPU, 4GB RAM, 100GB SSD NVMe)</span>
                    <span className="text-gray-400 font-normal">Đơn vị: VNĐ / Tháng</span>
                  </div>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-gray-900">Viettel Cloud Server Standard S2</span>
                        <span className="text-[#EE0033] font-bold">380,000 đ</span>
                      </div>
                      <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                        <div className="bg-[#EE0033] h-full rounded" style={{ width: '38%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-gray-600">
                        <span>AWS EC2 Instance + EBS Storage</span>
                        <span>~ 750,000 đ</span>
                      </div>
                      <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                        <div className="bg-gray-400 h-full rounded" style={{ width: '75%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-gray-600">
                        <span>Azure VM + Managed OS Disk</span>
                        <span>~ 780,000 đ</span>
                      </div>
                      <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                        <div className="bg-gray-400 h-full rounded" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DEDICATED PRODUCT CONFIGURATIONS & PACKAGES */}
          <section id="pricing" className="bg-white border-y border-gray-200 py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 space-y-10">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-[#EE0033] font-extrabold text-xs uppercase tracking-wider block">Bảng giá tiêu chuẩn</span>
                <h2 className="text-2.5xl md:text-3xl font-extrabold text-gray-900">Phân khúc máy chủ chuyên nghiệp đề xuất</h2>
                <p className="text-xs text-gray-500">
                  Chọn một cấu hình máy chủ đóng gói sẵn phù hợp hoàn hảo với quy mô hệ thống của doanh nghiệp bạn. Tất cả các gói đều có sẵn tài nguyên để mở rộng.
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex justify-center">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex space-x-1">
                  <button 
                    onClick={() => setActivePricingTab('standard')}
                    className={`px-4 py-2 rounded text-xs font-bold transition-all-200 ${activePricingTab === 'standard' ? 'bg-white text-[#EE0033] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Standard Series (CPU Shared)
                  </button>
                  <button 
                    onClick={() => setActivePricingTab('compute')}
                    className={`px-4 py-2 rounded text-xs font-bold transition-all-200 ${activePricingTab === 'compute' ? 'bg-white text-[#EE0033] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Compute-Optimized (100% Dedicated CPU)
                  </button>
                  <button 
                    onClick={() => setActivePricingTab('memory')}
                    className={`px-4 py-2 rounded text-xs font-bold transition-all-200 ${activePricingTab === 'memory' ? 'bg-white text-[#EE0033] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Memory-Optimized (High Memory RAM)
                  </button>
                </div>
              </div>

              {/* Render Tab Contents */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activePricingTab === 'standard' && (
                  standardSeries.map((tier, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-white border rounded-xl p-6 relative flex flex-col justify-between transition-all-200 hover:shadow-lg ${tier.isPopular ? 'border-[#EE0033] shadow-md shadow-[#EE0033]/5 ring-1 ring-[#EE0033]' : 'border-gray-200'}`}
                    >
                      {tier.isPopular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EE0033] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          Phổ biến nhất
                        </span>
                      )}
                      <div>
                        <div className="space-y-1 mb-4">
                          <h3 className="font-extrabold text-sm text-gray-900">{tier.name}</h3>
                          <p className="text-[10px] text-gray-400 font-medium">Lý tưởng cho môi trường thử nghiệm, web nhẹ</p>
                        </div>

                        <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                          <div className="flex items-center space-x-2 text-xs">
                            <Cpu className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.cpu} vCPU</strong> Cores</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Activity className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.ram} GB</strong> RAM DDR4 ECC</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <HardDrive className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.ssd} GB</strong> Enterprise SSD</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>Băng thông <strong>{tier.bandwidth}</strong> (Shared)</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>1 IPv4</strong> WAN Public kèm theo</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 border-t border-gray-100 pt-4">
                        <div className="text-center">
                          <span className="text-2xl font-extrabold text-[#EE0033] block">
                            {tier.price} đ
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">/tháng (chưa bao gồm VAT)</span>
                        </div>
                        <a 
                          href="https://console.viettelidc.com.vn"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`w-full block py-2.5 text-center text-xs font-bold uppercase tracking-wider rounded transition-all-200 ${tier.isPopular ? 'bg-[#EE0033] hover:bg-[#D9002C] text-white shadow-md' : 'bg-gray-100 hover:bg-[#EE0033] hover:text-white text-gray-700'}`}
                        >
                          Đăng ký gói
                        </a>
                      </div>
                    </div>
                  ))
                )}

                {activePricingTab === 'compute' && (
                  computeOptimizedSeries.map((tier, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-white border rounded-xl p-6 relative flex flex-col justify-between transition-all-200 hover:shadow-lg ${tier.isPopular ? 'border-[#EE0033] shadow-md shadow-[#EE0033]/5 ring-1 ring-[#EE0033]' : 'border-gray-200'}`}
                    >
                      {tier.isPopular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EE0033] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          Tối ưu hiệu năng
                        </span>
                      )}
                      <div>
                        <div className="space-y-1 mb-4">
                          <h3 className="font-extrabold text-sm text-gray-900">{tier.name}</h3>
                          <p className="text-[10px] text-gray-400 font-medium">CPU Dedicated chuyên sâu, web tải cao, ERP</p>
                        </div>

                        <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                          <div className="flex items-center space-x-2 text-xs">
                            <Cpu className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.cpu}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Activity className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.ram}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <HardDrive className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.ssd} SSD SAS/NVMe</strong></span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>Băng thông <strong>{tier.bandwidth}</strong> (Shared)</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>1 IPv4</strong> Public WAN</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 border-t border-gray-100 pt-4">
                        <div className="text-center">
                          <span className="text-2xl font-extrabold text-[#EE0033] block">
                            {tier.price} đ
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">/tháng (chưa bao gồm VAT)</span>
                        </div>
                        <a 
                          href="https://console.viettelidc.com.vn"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`w-full block py-2.5 text-center text-xs font-bold uppercase tracking-wider rounded transition-all-200 ${tier.isPopular ? 'bg-[#EE0033] hover:bg-[#D9002C] text-white shadow-md' : 'bg-gray-100 hover:bg-[#EE0033] hover:text-white text-gray-700'}`}
                        >
                          Đăng ký gói
                        </a>
                      </div>
                    </div>
                  ))
                )}

                {activePricingTab === 'memory' && (
                  memoryOptimizedSeries.map((tier, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-white border rounded-xl p-6 relative flex flex-col justify-between transition-all-200 hover:shadow-lg ${tier.isPopular ? 'border-[#EE0033] shadow-md shadow-[#EE0033]/5 ring-1 ring-[#EE0033]' : 'border-gray-200'}`}
                    >
                      {tier.isPopular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EE0033] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          Tối ưu dữ liệu
                        </span>
                      )}
                      <div>
                        <div className="space-y-1 mb-4">
                          <h3 className="font-extrabold text-sm text-gray-900">{tier.name}</h3>
                          <p className="text-[10px] text-gray-400 font-medium">Cơ sở dữ liệu lớn, Redis, bộ nhớ đệm Cache</p>
                        </div>

                        <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                          <div className="flex items-center space-x-2 text-xs">
                            <Cpu className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.cpu}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Activity className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.ram}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <HardDrive className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>{tier.ssd} SSD Enterprise</strong></span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>Băng thông <strong>{tier.bandwidth}</strong> (Shared)</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span><strong>1 IPv4</strong> WAN Public</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 border-t border-gray-100 pt-4">
                        <div className="text-center">
                          <span className="text-2xl font-extrabold text-[#EE0033] block">
                            {tier.price} đ
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">/tháng (chưa bao gồm VAT)</span>
                        </div>
                        <a 
                          href="https://console.viettelidc.com.vn"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`w-full block py-2.5 text-center text-xs font-bold uppercase tracking-wider rounded transition-all-200 ${tier.isPopular ? 'bg-[#EE0033] hover:bg-[#D9002C] text-white shadow-md' : 'bg-gray-100 hover:bg-[#EE0033] hover:text-white text-gray-700'}`}
                        >
                          Đăng ký gói
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* INTERACTIVE CUSTOM CONFIGURATOR CALCULATOR */}
          <section id="calculator" className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#EE0033] font-extrabold text-xs uppercase tracking-wider block">Thiết lập tài nguyên</span>
              <h2 className="text-2.5xl md:text-3.5xl font-extrabold tracking-tight text-gray-900">
                Công cụ cấu hình và báo giá đám mây thời gian thực
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tự do thiết kế hệ thống theo định mức tài nguyên riêng. Bảng báo giá được tối ưu tự động dựa theo chu kỳ thanh toán cam kết của doanh nghiệp.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* LEFT: Sliders & options */}
              <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">Cấu hình thông số kỹ thuật</h3>
                  <button 
                    onClick={() => {
                      setCalcCpu(4);
                      setCalcRam(8);
                      setCalcSsd(150);
                      setCalcIp(1);
                      setCalcBandwidth(100);
                      setCalcOs('linux');
                      setCalcBackup(true);
                      setCalcFirewall(false);
                      setCalcPeriod(12);
                    }}
                    className="text-[10px] text-gray-400 hover:text-[#EE0033] font-bold flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Đặt lại mặc định</span>
                  </button>
                </div>

                {/* Slider 1: CPU */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-700 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-gray-400" />
                      Bộ xử lý điện toán (vCPU Cores):
                    </span>
                    <span className="text-[#EE0033] font-extrabold">{calcCpu} vCPUs <span className="text-gray-400 font-normal">({new Intl.NumberFormat('vi-VN').format(calcCpuCost)} đ)</span></span>
                  </div>
                  <input 
                    type="range" 
                    min={1} 
                    max={64} 
                    step={1}
                    value={calcCpu}
                    onChange={(e) => setCalcCpu(parseInt(e.target.value))}
                    className="w-full accent-[#EE0033] h-2 bg-gray-100 rounded-lg cursor-pointer" 
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>1 vCPU (Min)</span>
                    <span>12 vCPUs (Phổ thông)</span>
                    <span>64 vCPUs (Doanh nghiệp)</span>
                  </div>
                </div>

                {/* Slider 2: RAM */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-700 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-gray-400" />
                      Bộ nhớ đệm hiệu năng (RAM ECC):
                    </span>
                    <span className="text-[#EE0033] font-extrabold">{calcRam} GB RAM <span className="text-gray-400 font-normal">({new Intl.NumberFormat('vi-VN').format(calcRamCost)} đ)</span></span>
                  </div>
                  <input 
                    type="range" 
                    min={1} 
                    max={256} 
                    step={1}
                    value={calcRam}
                    onChange={(e) => setCalcRam(parseInt(e.target.value))}
                    className="w-full accent-[#EE0033] h-2 bg-gray-100 rounded-lg cursor-pointer" 
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>1 GB RAM</span>
                    <span>32 GB (Database)</span>
                    <span>256 GB RAM (Max)</span>
                  </div>
                </div>

                {/* Slider 3: SSD Storage */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-700 flex items-center gap-1.5">
                      <HardDrive className="w-4 h-4 text-gray-400" />
                      Dung lượng SSD SAS/NVMe Enterprise:
                    </span>
                    <span className="text-[#EE0033] font-extrabold">{calcSsd} GB SSD <span className="text-gray-400 font-normal">({new Intl.NumberFormat('vi-VN').format(calcSsdCost)} đ)</span></span>
                  </div>
                  <input 
                    type="range" 
                    min={20} 
                    max={2000} 
                    step={10}
                    value={calcSsd}
                    onChange={(e) => setCalcSsd(parseInt(e.target.value))}
                    className="w-full accent-[#EE0033] h-2 bg-gray-100 rounded-lg cursor-pointer" 
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>20 GB SSD</span>
                    <span>500 GB (Enterprise)</span>
                    <span>2,000 GB SSD (Max)</span>
                  </div>
                </div>

                {/* Slider 4: IP Address */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-700 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-gray-400" />
                      Địa chỉ IPv4 WAN Public:
                    </span>
                    <span className="text-[#EE0033] font-extrabold">{calcIp} IP <span className="text-gray-400 font-normal font-sans">({new Intl.NumberFormat('vi-VN').format(calcIpCost)} đ)</span></span>
                  </div>
                  <input 
                    type="range" 
                    min={1} 
                    max={10} 
                    step={1}
                    value={calcIp}
                    onChange={(e) => setCalcIp(parseInt(e.target.value))}
                    className="w-full accent-[#EE0033] h-2 bg-gray-100 rounded-lg cursor-pointer" 
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>1 IP (Mặc định)</span>
                    <span>5 IPs (Multi-service)</span>
                    <span>10 IPs (Mạng phức tạp)</span>
                  </div>
                </div>

                {/* Grid for OS & Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  {/* OS Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-700">Hệ điều hành ảo hóa (OS):</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setCalcOs('linux')}
                        className={`p-3 rounded-lg border text-center text-xs font-bold flex flex-col items-center gap-2 transition-all-200 ${calcOs === 'linux' ? 'border-[#EE0033] bg-[#FFF5F6] text-[#EE0033]' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                      >
                        <Server className="w-5 h-5" />
                        <span>Linux (Ubuntu/CentOS)</span>
                      </button>
                      <button 
                        onClick={() => setCalcOs('windows')}
                        className={`p-3 rounded-lg border text-center text-xs font-bold flex flex-col items-center gap-2 transition-all-200 ${calcOs === 'windows' ? 'border-[#EE0033] bg-[#FFF5F6] text-[#EE0033]' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                      >
                        <Layers className="w-5 h-5" />
                        <span>Windows Server</span>
                      </button>
                    </div>
                  </div>

                  {/* Add-on services */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700">Tiện ích an ninh & sao lưu:</label>
                    
                    <label className="flex items-center space-x-3 text-xs text-gray-700 font-semibold cursor-pointer bg-gray-50 hover:bg-gray-100/70 p-2.5 rounded-lg border border-gray-200">
                      <input 
                        type="checkbox" 
                        checked={calcBackup} 
                        onChange={(e) => setCalcBackup(e.target.checked)}
                        className="accent-[#EE0033] w-4 h-4 rounded"
                      />
                      <div className="flex-1">
                        <span className="block">Dịch vụ sao lưu tuần hoàn (Daily Backup)</span>
                        <span className="text-[9px] text-gray-400 font-normal">Hàng tuần bảo vệ dữ liệu (+15% giá trị VM)</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 text-xs text-gray-700 font-semibold cursor-pointer bg-gray-50 hover:bg-gray-100/70 p-2.5 rounded-lg border border-gray-200">
                      <input 
                        type="checkbox" 
                        checked={calcFirewall} 
                        onChange={(e) => setCalcFirewall(e.target.checked)}
                        className="accent-[#EE0033] w-4 h-4 rounded"
                      />
                      <div className="flex-1">
                        <span className="block">Tường lửa đám mây nâng cao (Cloud Firewall)</span>
                        <span className="text-[9px] text-gray-400 font-normal">Bảo vệ mạng đa tầng nâng cao (+120k/tháng)</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Cycle contract discount selector */}
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 mb-2">Chu kỳ thanh toán & Cam kết (Chiết khấu tăng dần):</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { v: 1, label: 'Từng Tháng', disc: '0%' },
                      { v: 6, label: '6 Tháng', disc: '10%' },
                      { v: 12, label: '12 Tháng', disc: '20%' },
                      { v: 24, label: '24 Tháng', disc: '30%' }
                    ].map((item) => (
                      <button 
                        key={item.v}
                        onClick={() => setCalcPeriod(item.v as any)}
                        className={`p-2.5 rounded border text-center transition-all-200 ${calcPeriod === item.v ? 'border-[#EE0033] bg-[#FFF5F6] text-[#EE0033]' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                      >
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className="text-[9px] font-extrabold text-gray-400 block mt-0.5">Giảm {item.disc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: Báo giá hóa đơn kết quả */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-gray-800 flex flex-col justify-between">
                  <div className="absolute top-0 right-0 bg-[#EE0033]/15 w-40 h-40 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-6 relative z-10">
                    <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#EE0033] uppercase tracking-widest block">Bảng báo giá dự toán</span>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 uppercase font-bold tracking-wider font-sans">Thời gian thực</span>
                    </div>

                    {/* Resources detailed breakdown */}
                    <div className="space-y-3 font-mono text-[11px] text-gray-300">
                      <div className="flex justify-between">
                        <span>vCPU ({calcCpu} Cores) x 85k:</span>
                        <span className="font-bold text-white">{new Intl.NumberFormat('vi-VN').format(calcCpuCost)} đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RAM ({calcRam} GB) x 45k:</span>
                        <span className="font-bold text-white">{new Intl.NumberFormat('vi-VN').format(calcRamCost)} đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SSD ({calcSsd} GB) x 4k:</span>
                        <span className="font-shrink-0 font-bold text-white">{new Intl.NumberFormat('vi-VN').format(calcSsdCost)} đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IPv4 WAN Public ({calcIp} IP) x 80k:</span>
                        <span className="font-bold text-white">{new Intl.NumberFormat('vi-VN').format(calcIpCost)} đ</span>
                      </div>
                      {calcBandwidthCost > 0 && (
                        <div className="flex justify-between">
                          <span>Phụ trội Băng thông ({calcBandwidth} Mbps):</span>
                          <span className="font-bold text-white">{new Intl.NumberFormat('vi-VN').format(calcBandwidthCost)} đ</span>
                        </div>
                      )}
                      {calcFirewall && (
                        <div className="flex justify-between">
                          <span>Dịch vụ Cloud Firewall:</span>
                          <span className="font-bold text-white">120.000 đ</span>
                        </div>
                      )}
                      {calcBackup && (
                        <div className="flex justify-between">
                          <span>Sao lưu Daily Backup (+15%):</span>
                          <span className="font-bold text-white">{new Intl.NumberFormat('vi-VN').format(calcBackupCost)} đ</span>
                        </div>
                      )}

                      <div className="border-t border-white/10 pt-3 space-y-2">
                        <div className="flex justify-between font-sans text-xs">
                          <span>Chi phí nguyên giá hằng tháng:</span>
                          <span>{new Intl.NumberFormat('vi-VN').format(calcMonthlyPreDiscount)} đ</span>
                        </div>
                        {calcDiscountAmount > 0 && (
                          <div className="flex justify-between font-sans text-xs text-brand-400 font-bold">
                            <span>Chiết khấu chu kỳ ({calcPeriod === 6 ? '10%' : calcPeriod === 12 ? '20%' : '30%'}):</span>
                            <span>-{new Intl.NumberFormat('vi-VN').format(calcDiscountAmount)} đ</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 text-center space-y-2">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold block">CHI PHÍ ĐỊNH MỨC HÀNG THÁNG</span>
                      <div className="text-3xl md:text-3.5xl font-extrabold text-[#EE0033] tracking-tight">
                        {new Intl.NumberFormat('vi-VN').format(Math.round(calcFinalMonthlyCost))} <span className="text-xs text-gray-400 font-normal font-sans">đ/tháng</span>
                      </div>
                      <p className="text-[10px] text-gray-400">
                        *Giá tạm tính chưa bao gồm 10% VAT, hỗ trợ thanh toán đa dạng bằng thẻ nội địa, thẻ quốc tế hoặc chuyển khoản doanh nghiệp.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6 flex gap-3 relative z-10 font-sans">
                    <a 
                      href="https://console.viettelidc.com.vn"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-[#EE0033] hover:bg-[#D9002C] text-white rounded text-center text-xs font-bold uppercase transition-all-200 shadow-md"
                    >
                      Đăng ký & Khởi chạy máy chủ
                    </a>
                    <button 
                      onClick={() => window.print()}
                      className="px-3.5 py-3 bg-white/10 border border-white/15 hover:bg-white/20 text-white rounded transition-all-200"
                      title="In báo giá dự toán"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Consultation card */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
                  <span className="font-extrabold text-sm text-gray-900 block">★ Hỗ trợ khảo sát hạ tầng miễn phí</span>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Đối với các kiến trúc mạng đa tầng phức tạp, hệ thống chuyển dịch dữ liệu từ On-Premises hoặc đám mây ngoại quốc về Viettel Cloud Server, đội ngũ Kỹ sư giải pháp cao cấp của chúng tôi sẽ thiết kế topo mạng, dựng sơ đồ kết nối hoàn toàn miễn phí.
                  </p>
                  <Link href="/contact" className="text-xs font-bold text-[#EE0033] hover:underline block">Đăng ký tư vấn giải pháp kỹ thuật →</Link>
                </div>
              </div>
            </div>
          </section>

          {/* CLOUD ARCHITECTURE BLUEPRINTS SECTION */}
          <section id="architecture" className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 space-y-12">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-[#EE0033] font-extrabold text-xs uppercase tracking-wider block">Bản thiết kế kiến trúc</span>
                <h2 className="text-2.5xl md:text-3.5xl font-extrabold text-gray-900 leading-tight">Hạ tầng sẵn sàng cấp doanh nghiệp chuẩn quốc tế</h2>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Làm chủ hoàn toàn công nghệ, vận hành tự động hóa trên hạ tầng phần cứng của các hãng hàng đầu thế giới HP, Dell, Cisco mang lại độ ổn định tối đa cho doanh nghiệp của bạn.
                </p>
              </div>

              {/* Bento grid architecture features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="w-9 h-9 bg-red-50 text-[#EE0033] rounded flex items-center justify-center">
                    <Server className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-gray-900">VMware ESXi & KVM Hypervisor</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Sử dụng các công nghệ ảo hóa hàng đầu thế giới giúp cô lập và phân phối tài nguyên CPU, RAM một cách tuyệt đối giữa các máy chủ ảo. Không xảy ra hiện tượng tranh chấp hay nghẽn tài nguyên chéo.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="w-9 h-9 bg-red-50 text-[#EE0033] rounded flex items-center justify-center">
                    <Database className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-gray-900">Ceph Triple Replication Storage</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Công nghệ lưu trữ phân tán thế hệ mới tự động nhân bản dữ liệu của bạn làm 3 bản lưu trữ trên các cụm ổ đĩa vật lý khác nhau (3-way replica). Dữ liệu hoàn toàn an toàn ngay cả khi có sự cố hỏng hóc ổ đĩa đồng thời.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="w-9 h-9 bg-red-50 text-[#EE0033] rounded flex items-center justify-center">
                    <Network className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-gray-900">Hạ tầng mạng 10Gbps Multi-Ring</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Hệ thống mạng nội bộ cực mạnh kết nối trực tiếp đa điểm giữa các Data Centers của Viettel qua mạng cáp Ring dự phòng kép. Khả năng chống chịu thiên tai và chuyển mạch tự động cực kỳ nhanh chóng.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* DETAILED SPECS TABLE COMPARING TO GLOBALS */}
          <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16 space-y-8 border-t border-gray-200">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-lg font-extrabold text-gray-900">Bảng so sánh thông số kỹ thuật chi tiết</h3>
              <p className="text-xs text-gray-500">Đối chiếu các tiêu chí kỹ thuật lõi giữa Viettel Cloud Server và các nhà cung cấp đám mây quốc tế lớn.</p>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#1A1A1A] text-white">
                      <th className="p-4 font-bold uppercase tracking-wider">Tiêu chí so sánh</th>
                      <th className="p-4 font-bold uppercase tracking-wider">Viettel Cloud Server</th>
                      <th className="p-4 font-bold uppercase tracking-wider text-gray-300">AWS / Azure / GCP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-600">
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">Vị trí phòng máy (Datacenter Location)</td>
                      <td className="p-4 text-gray-900 font-semibold">100% tại Việt Nam (Chuẩn Rated 3 TIA-942)</td>
                      <td className="p-4">Singapore, Hong Kong, Mỹ, Châu Âu</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">Phí truyền tải dữ liệu (Data Transfer / Network Egress)</td>
                      <td className="p-4 text-emerald-600 font-extrabold">MIỄN PHÍ HOÀN TOÀN (Unlimited In/Out)</td>
                      <td className="p-4 text-red-600">Tính phí từ $0.08 - $0.12 trên mỗi GB dữ liệu tải ra ngoài</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">Hỗ trợ kỹ thuật trực tiếp (Support SLA)</td>
                      <td className="p-4 text-gray-900 font-semibold">Native tiếng Việt, 24/7/365 qua điện thoại, email miễn phí</td>
                      <td className="p-4">Tiếng Anh, trả thêm phí tối thiểu $29 - $100/tháng cho gói Support chuyên sâu</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">Tính hóa đơn tài chính (Tax Billing)</td>
                      <td className="p-4 text-gray-900 font-semibold">Xuất hóa đơn GTGT điện tử trực tiếp, thanh toán VNĐ nhanh chóng</td>
                      <td className="p-4">Thanh toán qua thẻ Visa/Mastercard quốc tế, rủi ro chênh lệch tỷ giá USD, không có hóa đơn đỏ</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">Cam kết an toàn pháp lý (Regulatory Compliance)</td>
                      <td className="p-4 text-emerald-600 font-bold">Tuân thủ 100% Luật An ninh mạng Việt Nam 2018</td>
                      <td className="p-4">Chịu ràng buộc luật pháp nước ngoài, không lưu trữ dữ liệu tại chỗ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQS ACCORDION */}
          <section id="faqs" className="max-w-3xl mx-auto px-6 py-16 space-y-8 border-t border-gray-200">
            <div className="text-center space-y-2">
              <span className="text-[#EE0033] font-extrabold text-xs uppercase tracking-wider block">Giải đáp kỹ thuật</span>
              <h2 className="text-2.5xl font-extrabold text-gray-900">Hỏi đáp về Viettel Cloud Server</h2>
              <p className="text-xs text-gray-500">Những thắc mắc thường gặp nhất từ các CTO, Trưởng phòng IT và các Lập trình viên hệ thống.</p>
            </div>

            <div className="border border-gray-200 rounded-xl bg-white p-3 divide-y divide-gray-100 shadow-xs">
              {viettelFaqs.map((faq, idx) => {
                const isOpen = openFAQ === idx;
                return (
                  <div key={idx} className="py-4 px-2 first:pt-2 last:pb-2">
                    <button 
                      onClick={() => toggleFAQ(idx)}
                      className="w-full flex items-center justify-between text-left text-xs md:text-sm font-semibold transition-all-200 focus:outline-none"
                    >
                      <span className={isOpen ? 'text-[#EE0033]' : 'text-gray-900 hover:text-[#EE0033]'}>
                        {idx + 1}. {faq.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#EE0033]' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-gray-500 pl-4 mt-3 leading-relaxed border-l-2 border-[#EE0033]/50">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* LEAD GENERATION FORM / CONTACT FOOTER */}
          <section className="bg-gray-100 border-t border-gray-200 py-16 px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-extrabold uppercase text-[#EE0033] tracking-wider block">YÊU CẦU KHẢO SÁT HẠ TẦNG</span>
              <h2 className="text-2.5xl md:text-3.5xl font-extrabold text-gray-900 leading-tight">Sẵn sàng nâng cấp hạ tầng lên chuẩn đám mây thế hệ mới?</h2>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
                Nhập thông tin yêu cầu của bạn, đội ngũ Chuyên gia giải pháp của Viettel IDC Hub sẽ liên hệ hỗ trợ thiết kế topo mạng và gửi báo giá chi tiết trong vòng 2 giờ làm việc.
              </p>
              <div className="pt-4 max-w-md mx-auto">
                <Link 
                  href="/contact" 
                  className="w-full block text-center py-3.5 bg-[#EE0033] hover:bg-[#D9002C] text-white font-extrabold text-xs uppercase tracking-wider rounded transition-all-200 shadow-md shadow-[#EE0033]/10 focus-ring-brand"
                >
                  Kết nối với Kỹ sư tư vấn & Nhận báo giá
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

  // --- FALLBACK GENERIC SERVICE DETAIL LAYOUT ---
  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-12" id="main-content">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs text-gray-400 font-sans">
            <li>
              <Link href="/" className="hover:text-brand-500 transition-all-200">Trang chủ</Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link href={`/services/${categorySlug}`} className="hover:text-brand-500 transition-all-200">Dịch vụ</Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link href={`/services/${categorySlug}`} className="hover:text-brand-500 transition-all-200">{currentCategoryName}</Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span aria-current="page" className="text-gray-700 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* HERO (2-col Layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-brand-10 border border-brand-100 text-[#EE0033] py-1 px-2.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
              <span>Hạ tầng tự động hóa F-Type</span>
            </div>
            
            <h1 className="text-3xl md:text-4.5xl font-bold tracking-tight text-gray-900 font-sans leading-tight">
              {product.name} – Hiệu năng cao, mở rộng linh hoạt
            </h1>
            
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              {product.description} Sử dụng dòng vi xử lý Intel Xeon Scalable Gold đỉnh cao kết hợp 100% tài nguyên lưu trữ SSD SAS/NVMe Enterprise nhằm cô lập tối đa độ trễ.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <a 
                href={`https://console.viettelidc.com.vn/checkout?product=${product.slug}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#EE0033] hover:bg-[#FF302D] text-white font-bold text-sm rounded text-center transition-all-200 focus-ring-brand shadow-md"
              >
                Mua ngay trên Console
              </a>
              <Link 
                href="/pricing/calculator"
                className="px-6 py-3 bg-white border border-gray-100 hover:border-brand-500 text-gray-700 hover:text-[#EE0033] font-bold text-sm rounded text-center transition-all-200 shadow-xs"
              >
                Tính dự toán chi phí
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-brand-500/5 w-32 h-32 rounded-full blur-xl" />
              
              {/* Illustrated Screenshot container */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs space-y-4 relative z-10 font-mono text-[11px] text-gray-700">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="font-bold text-xs font-sans text-gray-900">Virtual Machine Configurator</span>
                  <span className="text-[10px] text-[#EE0033] font-bold">Standard #2</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>CPU Allocation:</span>
                    <span className="font-bold text-gray-950">2 vCPUs Intel Scalable</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM Performance:</span>
                    <span className="font-bold text-gray-950">4 GB DDR4 Reg ECC</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Disk:</span>
                    <span className="font-bold text-gray-950">100 GB RAID 10 NVMe</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bandwidth Port:</span>
                    <span className="font-bold text-gray-950">100 Mbps Shared</span>
                  </div>
                </div>

                <div className="bg-brand-10 border border-brand-100 p-2.5 rounded-lg text-[10px] text-gray-600 font-sans flex items-center justify-between">
                  <span>Giá tạm tính hàng tháng:</span>
                  <span className="font-extrabold text-[#EE0033] text-xs">380.000 đ/tháng</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK STATS BAR */}
        <section className="bg-brand-10 border-y border-brand-100 py-4 px-6 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {product.specs.map((spec, i) => (
            <div key={i} className="text-center md:text-left space-y-1">
              <span className="text-xs font-extrabold text-[#8A001D] block">{spec.value}</span>
              <span className="text-[10px] text-gray-500 uppercase font-semibold block tracking-wider">{spec.label}</span>
            </div>
          ))}
        </section>

        {/* FEATURES GRID */}
        <section className="mb-16 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Tính năng vượt trội của cấu trúc</h2>
            <p className="text-xs text-gray-500">
              Được thiết kế tỉ mỉ để đáp ứng nhu cầu khắt khe nhất của mọi hệ thống thương mại điện tử, tài chính và logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feat, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded bg-brand-10 text-[#EE0033] flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-950 leading-tight">Tính năng bảo chứng {i+1}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{feat}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE PRICING TABLE WITH SKELETON */}
        <section className="mb-16 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-3 gap-2">
            <div>
              <h2 className="text-xl font-bold text-gray-950 flex items-center">
                <span>Bảng giá ước tính cấu hình</span>
                <span className="ml-2 text-[9px] font-extrabold bg-[#EE0033] text-white py-0.5 px-2 rounded uppercase">ISR Active</span>
              </h2>
              <p className="text-xs text-gray-500">Giá ước tính cập nhật thời gian thực, đã bao gồm tối ưu lực định sẵn.</p>
            </div>
            <span className="text-[10px] text-gray-400">
              Cập nhật lúc: <strong>{new Date().toLocaleDateString('vi-VN')} 12:00</strong>
            </span>
          </div>

          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 font-bold uppercase tracking-wider">Cấu hình gói đề xuất</th>
                    <th className="p-4 font-bold uppercase tracking-wider hidden md:table-cell">Chi tiết thông số</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-right">Chi phí hàng tháng</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-center">Hoạt động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingLoaded ? (
                    product.pricing.map((tier, idx) => (
                      <tr 
                        key={idx} 
                        className={`hover:bg-brand-10/50 transition-all-200 ${idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}
                      >
                        <td className="p-4">
                          <span className="font-bold text-gray-950 block">{tier.planName}</span>
                          {tier.isPopular && (
                            <span className="inline-block text-[9px] font-extrabold bg-brand-500 text-white px-1.5 py-0.2 rounded mt-1">
                              PHỔ BIẾN NHẤT
                            </span>
                          )}
                          <div className="md:hidden mt-2 text-[10px] text-gray-400 space-y-0.5">
                            {tier.specs.join(' · ')}
                          </div>
                        </td>
                        <td className="p-4 text-gray-500 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1.5">
                            {tier.specs.map((sp, sid) => (
                              <span key={sid} className="bg-white border border-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-700">
                                {sp}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-base font-extrabold text-[#EE0033] block">
                            {tier.price} đ
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">/{tier.period} (chưa VAT)</span>
                        </td>
                        <td className="p-4 text-center">
                          <a 
                            href={`https://console.viettelidc.com.vn/checkout?product=${product.slug}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block px-3.5 py-1.5 bg-brand-10 hover:bg-[#EE0033] hover:text-white text-[#EE0033] border border-[#FCD9D8] font-bold text-xs rounded transition-all-200 shadow-xs"
                          >
                            Chọn gói
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Skeleton loaders simulation
                    [1, 2, 3].map((n) => (
                      <tr key={n} className="bg-white animate-pulse">
                        <td className="p-4">
                          <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
                          <div className="h-3 bg-gray-100 rounded w-1/3" />
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="flex gap-2">
                            <div className="h-6 bg-gray-100 rounded w-16" />
                            <div className="h-6 bg-gray-100 rounded w-20" />
                            <div className="h-6 bg-gray-100 rounded w-24" />
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="h-5 bg-gray-100 rounded w-20 ml-auto mb-1" />
                          <div className="h-3 bg-gray-100 rounded w-12 ml-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <div className="h-8 bg-gray-100 rounded w-16 mx-auto" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ROI CALCULATOR CTA BAR */}
        <section className="bg-brand-10 border border-brand-100 p-6 md:p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white border border-[#FFBBCA] text-[#EE0033] rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-950 text-sm md:text-base">Ước tính chi phí hàng tháng của riêng bạn?</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
                Sử dụng công cụ thiết lập tài nguyên ảo trực tuyến của Viettel IDC Hub. Tùy chỉnh dung lượng CPU, RAM, Disk và Băng thông mạng để xem mức báo giá chiết khấu.
              </p>
            </div>
          </div>
          <Link 
            href="/pricing/calculator"
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-300 text-white font-bold text-xs rounded shadow-md transition-all-200"
          >
            Tính chi phi ngay
          </Link>
        </section>

        {/* FAQ ACCORDION */}
        <section className="mb-16 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Giải đáp thắc mắc (FAQ)</h2>
            <p className="text-xs text-gray-500">Mọi câu hỏi xoay quanh SLA, kỹ năng cài đặt và quá trình bàn giao dữ liệu dịch vụ.</p>
          </div>

          <div className="border border-gray-100 rounded-xl bg-white p-3 divide-y divide-gray-100 shadow-xs">
            {product.faqs.map((faq, idx) => {
              const isOpen = openFAQ === idx;
              return (
                <div key={idx} className="py-4 px-2 first:pt-2 last:pb-2">
                  <button 
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between text-left text-xs md:text-sm font-semibold transition-all-200 focus:outline-none"
                  >
                    <span className={isOpen ? 'text-[#EE0033]' : 'text-gray-900 hover:text-brand-500'}>
                      {idx + 1}. {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-brand-500' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-gray-500 pl-4 mt-3 leading-relaxed border-l border-brand-100">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* RELATED SERVICES */}
        <section className="mb-16 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-950">Dịch vụ bổ trợ liên quan</h2>
            <Link href={`/services/${categorySlug}`} className="text-xs font-bold text-[#EE0033] hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-brand-50 transition-all-200">
              <span className="text-[10px] font-extrabold uppercase text-[#EE0033] block mb-2">Trung tâm giám sát</span>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Viettel Kubernetes Service</h3>
              <p className="text-xs text-gray-500 mb-4">Tự động co giãn cụm container an toàn, tối ưu chi phí hạ tầng ảo hóa.</p>
              <Link href="/services/compute" className="text-xs font-bold text-brand-500 hover:text-brand-800">Tìm hiểu thêm →</Link>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-brand-50 transition-all-200">
              <span className="text-[10px] font-extrabold uppercase text-[#EE0033] block mb-2">Bảo vệ vật lý</span>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Dịch vụ Cho thuê chỗ đặt máy chủ</h3>
              <p className="text-xs text-gray-500 mb-4 font-sans">Độ tin cậy tuyệt đối với tủ rack TIA-942 Rated 3 cao cấp mở rộng toàn quốc.</p>
              <Link href="/services/data-center" className="text-xs font-bold text-brand-500 hover:text-brand-800">Tìm hiểu thêm →</Link>
            </div>
          </div>
        </section>

        {/* FINAL HUBSPOT FORM EMBED */}
        <section className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <div className="space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase text-brand-600 tracking-wider">ĐĂNG KÝ BẢNG BÁO GIÁ KỸ THUẬT</span>
            <h2 className="text-2xl font-bold text-gray-950 leading-tight">Yêu cầu liên hệ trực tiếp từ Kỹ sư giải pháp</h2>
            <p className="text-xs text-gray-500">
              Hãy để lại email doanh nghiệp và số điện thoại, đội ngũ Kỹ sư giải pháp của Viettel IDC Hub sẽ liên hệ và thiết kế topo mạng cho bạn trong vòng 2 giờ làm việc.
            </p>
            <div className="pt-4 max-w-md mx-auto">
              <Link 
                href="/contact" 
                className="w-full block text-center py-3 bg-[#EE0033] hover:bg-[#FF302D] text-white font-bold text-xs uppercase tracking-wider rounded transition-all-200 shadow-md focus-ring-brand"
              >
                Gửi yêu cầu Khảo sát & Nhận báo giá
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

export default function ServiceDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#EE0033] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Đang tải chi tiết dịch vụ...</p>
        </div>
      </div>
    }>
      <ServiceDetailPageContent params={params} />
    </Suspense>
  );
}
