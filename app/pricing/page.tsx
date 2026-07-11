'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useMarket } from '../../hooks/useMarket';
import { Check, Info, Calculator, Laptop, Phone, HelpCircle, Sparkles } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScreenSwitcher from '../../components/ScreenSwitcher';

function PricingPageContent() {
  const { market, isGlobal, getLocalizedPath } = useMarket();
  const [activeTab, setActiveTab] = useState<'compute' | 'storage' | 'network' | 'security' | 'quote'>('compute');
  const [loading, setLoading] = useState(false);

  // Form states under Enterprise Quote
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', note: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Trigger loading skeleton simulation whenever active tab shifts via handler
  const handleTabChange = (tabId: 'compute' | 'storage' | 'network' | 'security' | 'quote') => {
    setActiveTab(tabId);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const tabs = isGlobal ? [
    { id: 'compute', name: 'Cloud Compute' },
    { id: 'storage', name: 'Object Storage' },
    { id: 'network', name: 'Network & CDN' },
    { id: 'security', name: 'Cloud Security' },
    { id: 'quote', name: 'Enterprise Quote' }
  ] : [
    { id: 'compute', name: 'Điện toán mây' },
    { id: 'storage', name: 'Lưu trữ đối tượng' },
    { id: 'network', name: 'Mạng & CDN' },
    { id: 'security', name: 'An toàn bảo mật' },
    { id: 'quote', name: 'Báo giá DN (Quote)' }
  ];

  // Pricing Data Tiers
  const computePlans = isGlobal ? [
    {
      name: 'Cloud Server Basic',
      price: '8.00',
      specs: ['1 vCPU Intel Xeon', '2 GB DDR4 ECC Ram', '50 GB Enterprise SAS SSD', '1 Public IPv4', '100Mbps Shared Network'],
      isPopular: false,
      ctaText: 'Buy Now'
    },
    {
      name: 'Cloud Server Professional',
      price: '16.00',
      specs: ['2 vCPU Intel Xeon', '4 GB DDR4 ECC Ram', '100 GB Enterprise SAS SSD', '1 Public IPv4', '200Mbps Shared Network'],
      isPopular: true,
      ctaText: 'Buy Now'
    },
    {
      name: 'Cloud Server Custom Premium',
      price: 'Contact Us',
      specs: ['UP TO 128 vCPUs', 'UP TO 512 GB Ram', 'Custom NVMe SSD', 'Dedicated International Bandwidth', '24/7 SOC Cyber Security'],
      isPopular: false,
      ctaText: 'Request Quote'
    }
  ] : [
    {
      name: 'Cloud Server Basic',
      price: '190.000',
      specs: ['1 vCPU Intel Xeon', '2 GB Ram DDR4 ECC', '50 GB SSD SAS Enterprise', '1 IPv4', 'Mạng 100Mbps shared'],
      isPopular: false,
      ctaText: 'Mua ngay'
    },
    {
      name: 'Cloud Server Professional',
      price: '380.000',
      specs: ['2 vCPU Intel Xeon', '4 GB Ram DDR4 ECC', '100 GB SSD SAS Enterprise', '1 IPv4', 'Mạng 200Mbps shared'],
      isPopular: true,
      ctaText: 'Mua ngay'
    },
    {
      name: 'Cloud Server Custom Premium',
      price: 'Liên hệ',
      specs: ['UP TO 128 vCPUs', 'UP TO 512 GB Ram', 'Tùy biến NVMe SSD', 'Băng thông quốc tế Dedicated', 'An toàn giám sát SOC'],
      isPopular: false,
      ctaText: 'Yêu cầu tư vấn'
    }
  ];

  const storagePlans = isGlobal ? [
    {
      name: 'Storage Standard SAS',
      price: '2.00',
      specs: ['From $0.02 / GB / month', 'Minimum 100 GB', '99.99% SLA Guarantee', 'Double Encrypted Security'],
      isPopular: false,
      ctaText: 'Select Pack'
    },
    {
      name: 'Object Storage S3-compatible',
      price: '6.00',
      specs: ['Minimum 500 GB', 'S3 v4 Compatible API', 'Anti-ransomware Object Lock', 'Unlimited Data Transfer Bandwidth'],
      isPopular: true,
      ctaText: 'Select Pack'
    },
    {
      name: 'Cloud Backup Enterprise',
      price: 'Contact Us',
      specs: ['Retain 30 version history', 'Secure End-to-end Encryption', 'Automatic logs & reports'],
      isPopular: false,
      ctaText: 'Request Quote'
    }
  ] : [
    {
      name: 'Storage Standard SAS',
      price: '50.000',
      specs: ['Giá tính từ 500đ/GB/tháng', 'Tối thiểu 100 GB', 'Cam kết SLA 99.99%', 'Chuẩn bảo mật an toàn kép'],
      isPopular: false,
      ctaText: 'Chọn gói'
    },
    {
      name: 'Object Storage S3-compatible',
      price: '150.000',
      specs: ['Tối thiểu 500 GB', 'API tương thích S3 v4', 'Tích hợp Object Lock ransomware', 'Băng thông rộng không giới hạn traffic'],
      isPopular: true,
      ctaText: 'Chọn gói'
    },
    {
      name: 'Cloud Backup Enterprise',
      price: 'Liên hệ',
      specs: ['Bảo lưu lịch sử 30 phiên', 'Mã hóa đầu cuối vững chắc', 'Báo cáo log vận hành tự động'],
      isPopular: false,
      ctaText: 'Yêu cầu tư vấn'
    }
  ];

  const networkPlans = isGlobal ? [
    { name: 'Cloud CDN Lite', price: '19.00', specs: ['High-speed International Bandwidth', '12 global CDN edge nodes', 'Smart cache routing', 'Basic layer 3/4 Anti-DDoS'], isPopular: false, ctaText: 'Select Pack' },
    { name: 'Cloud CDN Pro', price: '49.00', specs: ['HTTP/3 Support', 'Automatic WebP image compression', 'Custom SSL Certificates', '24/7 Direct Engineering Support'], isPopular: true, ctaText: 'Select Pack' },
    { name: 'VPC Connection', price: 'Contact Us', specs: ['Dedicated speed up to 10 Gbps', 'Isolated private VLANs', 'Hybrid secure connectivity'], isPopular: false, ctaText: 'Contact Us' }
  ] : [
    { name: 'Cloud CDN Lite', price: '450.000', specs: ['Băng thông rộng quốc tế', 'Phân phối nhanh 12 POPs VN', 'Caching thông minh', 'Anti-DDoS layer 3/4'], isPopular: false, ctaText: 'Chọn gói' },
    { name: 'Cloud CDN Pro', price: '1.200.000', specs: ['Hỗ trợ giao thức HTTP/3', 'Tối ưu ảnh WebP tự động', 'SSL Custom riêng biệt', 'Hỗ trợ kỹ thuật trực ban'], isPopular: true, ctaText: 'Chọn gói' },
    { name: 'VPC Connection (Kênh riêng)', price: 'Liên hệ', specs: ['Tốc độ bảo chứng tới 10 Gbps', 'Phân tách VLAN biệt lập', 'Kết nối Hybrid an toàn'], isPopular: false, ctaText: 'Liên hệ' }
  ];

  const securityPlans = isGlobal ? [
    { name: 'Cloud WAF Standard', price: '38.00', specs: ['Protect 1 main domain', 'SQL Injection, XSS filtering...', 'Free SSL Included', 'Attack log visual reports'], isPopular: false, ctaText: 'Select Pack' },
    { name: 'DDoS Protection basic', price: '105.00', specs: ['Block up to 50 Gbps attacks', 'AI-assisted threat response', 'Ultra-low packet delivery delay'], isPopular: true, ctaText: 'Select Pack' },
    { name: 'Virtual SOC Monitoring', price: 'Contact Us', specs: ['24/7/365 Centralized Monitoring', 'Experienced SIEM analyst engineers', 'Immediate incident response SLAs'], isPopular: false, ctaText: 'Contact Us' }
  ] : [
    { name: 'Cloud WAF Standard', price: '900.000', specs: ['Bảo vệ 1 Domain chính', 'Lọc SQL Injection, XSS...', 'SSL miễn phí đính kèm', 'Báo cáo biểu đồ tấn công'], isPopular: false, ctaText: 'Chọn gói' },
    { name: 'DDoS Protection basic', price: '2.500.000', specs: ['Chặn đứng tấn công tới 50 Gbps', 'Phòng thủ tự động AI', 'Độ trễ truyền tải không đổi'], isPopular: true, ctaText: 'Chọn gói' },
    { name: 'Virtual SOC Monitoring', price: 'Liên hệ', specs: ['Giám sát tập trung 24/7/365', 'Kỹ sư phân tích SIEM', 'Cam kết ứng cứu sự cố tức thì'], isPopular: false, ctaText: 'Liên hệ' }
  ];

  const currentPlans = activeTab === 'compute' ? computePlans :
                       activeTab === 'storage' ? storagePlans :
                       activeTab === 'network' ? networkPlans : securityPlans;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#5A5A5A] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-12 py-8" id="main-content">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-gray-400 font-sans">
            <li>
              <Link href={getLocalizedPath('/')} className="hover:text-brand-500 transition-all-200">
                {isGlobal ? 'Home' : 'Trang chủ'}
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span className="text-gray-700 font-medium" aria-current="page">
                {isGlobal ? 'Service Pricing' : 'Bảng giá dịch vụ'}
              </span>
            </li>
          </ol>
        </nav>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-[#EE0033] font-bold text-xs uppercase tracking-wider block">
            {isGlobal ? 'TRANSPARENT PRICING' : 'PHÂN LOẠI MINH BẠCH'}
          </span>
          <h1 className="text-3xl md:text-4.5xl font-bold tracking-tight text-gray-900 leading-none">
            {isGlobal ? 'Cloud Service Pricing' : 'Bảng giá dịch vụ đám mây'}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            {isGlobal ? (
              'Automated infrastructure with flexible OPEX pricing. Pay-as-you-go per hour or choose monthly billing cycles for up to a 20% discount.'
            ) : (
              'Hạ tầng tự động hóa, cấu trúc chi phí OPEX linh hoạt theo từng giờ sử dụng hoặc thanh toán chu kỳ tháng để chiết khấu tới 20%.'
            )}
          </p>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex justify-center border-b border-gray-100 mb-10 overflow-x-auto pb-px">
          <div className="flex space-x-6 md:space-x-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`py-3 text-xs md:text-sm font-bold border-b-2 transition-all-200 focus:outline-none whitespace-nowrap ${
                    isActive
                      ? 'border-[#EE0033] text-[#EE0033]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRICING CONTENT PORTION */}
        {activeTab !== 'quote' ? (
          <div className="space-y-12">
            {/* GRIDS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                // SKELETON CARDS DURING TAB SHIFTS
                [1, 2, 3].map((n) => (
                  <div key={n} className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs animate-pulse space-y-6">
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-100 rounded w-1/2" />
                      <div className="h-8 bg-gray-100 rounded w-1/3" />
                    </div>
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="h-3 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-5/6" />
                      <div className="h-3 bg-gray-100 rounded w-4/5" />
                    </div>
                    <div className="h-10 bg-gray-100 rounded w-full mt-4" />
                  </div>
                ))
              ) : (
                currentPlans.map((plan, idx) => (
                  <div 
                    key={idx}
                    className={`bg-white rounded-xl p-6 flex flex-col justify-between hover:scale-102 transition-all-200 relative ${
                      plan.isPopular 
                        ? 'border-2 border-[#EE0033] shadow-md' 
                        : 'border border-gray-100 shadow-xs'
                    }`}
                  >
                    {plan.isPopular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-extrabold bg-[#EE0033] text-white py-1 px-3.5 rounded-full tracking-wider shadow-sm uppercase">
                        {isGlobal ? 'Recommended' : 'Khuyên dùng chính'}
                      </span>
                    )}

                    <div className="space-y-5">
                      <div>
                        <h3 className="font-extrabold text-xs md:text-sm text-gray-950 uppercase tracking-tight block">{plan.name}</h3>
                        <div className="mt-3 flex items-baseline text-gray-900 group">
                          <span className={`font-extrabold text-[#EE0033] tracking-tight ${(plan.price === 'Liên hệ' || plan.price === 'Contact Us') ? 'text-2xl' : 'text-3.5xl'}`}>
                            {plan.price}
                          </span>
                          {(plan.price !== 'Liên hệ' && plan.price !== 'Contact Us') && <span className="text-[11px] text-gray-400 font-medium ml-1.5">{isGlobal ? 'USD / mo' : 'đ / tháng'}</span>}
                        </div>
                        <span className="text-[9px] text-gray-400 block mt-0.5 font-sans">
                          {isGlobal ? 'Price excludes VAT' : 'Giá chưa bao gồm VAT'}
                        </span>
                      </div>

                      <ul className="space-y-2.5 pt-4 border-t border-gray-100">
                        {plan.specs.map((sp, sidx) => (
                          <li key={sidx} className="flex items-start space-x-2 text-xs text-gray-500">
                            <span className="text-[#EE0033] font-bold text-sm leading-none mt-0.5">✓</span>
                            <span>{sp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-50">
                      <a 
                        href="https://console.viettelidc.com.vn" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`w-full block text-center py-2.5 rounded-[8px] text-xs font-bold transition-all-200 uppercase tracking-wider ${
                          plan.isPopular 
                            ? 'bg-[#EE0033] hover:bg-[#FF302D] text-white shadow-md focus-ring-brand' 
                            : 'bg-white border border-gray-100 hover:border-brand-500 text-gray-700 hover:text-[#EE0033]'
                        }`}
                      >
                        {plan.ctaText}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* BANNER FOR CALCULATOR */}
            <div className="bg-brand-10 border border-brand-100 p-6 md:p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-start space-x-3.5 text-left">
                <div className="p-3 bg-white border border-brand-100 text-[#EE0033] rounded-lg">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-sm md:text-base mb-1">Cần máy chủ cấu hình tùy chỉnh?</h3>
                  <p className="text-xs text-gray-500 max-w-xl leading-relaxed font-sans">
                    Sử dụng công cụ tính toán chi phí tùy biến để phân bổ chính xác nguồn CPU, RAM và Disk lưu trữ mong muốn. Nhận ngay báo cáo chi tiết trong vài giây.
                  </p>
                </div>
              </div>
              <Link
                href="/pricing/calculator"
                className="px-5 py-2.5 bg-brand-500 hover:bg-brand-300 text-white font-bold text-xs rounded-[8px] shadow-md transition-all-200 shrink-0"
              >
                Tính chi phí trực tuyến →
              </Link>
            </div>
          </div>
        ) : (
          // ENTERPRISE QUOTE LAYOUT
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#FFE8EC] text-[#8A001D] border border-[#FFBBCA] tracking-wider w-max block">
                BÁO GIÁ CHO DOANH NGHIỆP LỚN
              </span>
              <h2 className="text-2xl font-bold text-gray-900 font-sans">Cấu trúc hạ tầng thiết kế riêng</h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Đối với các nhu cầu triển khai Private Cloud, hệ thống dữ liệu thanh toán ngân hàng (PCI-DSS) hoặc hạ tầng chuyên sâu Rated 3, Viettel IDC sẵn sàng đồng hành khảo sát và cung cấp chính sách giá chiết khấu đặc biệt theo quy mô.
              </p>

              <div className="space-y-4 border-t border-gray-100 pt-6 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-brand-500" />
                  <span>Kênh bàn giao Doanh nghiệp lớn: <strong>1800 585821</strong> (Phím 2)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#EE0033] font-bold text-sm">✓</span>
                  <span>Định danh máy chủ độc lập toàn phần, bảo mật SLA tới 99.995%.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#EE0033] font-bold text-sm">✓</span>
                  <span>Cam kết băng thông truyền tải quốc tế lớn độc quyền không chia sẻ.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto text-lg font-bold">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Yêu cầu báo giá đã được ghi nhận!</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Đội ngũ Kỹ sư giải pháp chuyên ban của Viettel IDC Hub sẽ liên lập và phản hồi báo giá kỹ thuật dự trù qua Email của bạn trong vòng tối tối đa 2 giờ làm việc.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-[#EE0033] font-bold hover:underline pt-2 focus:outline-none"
                  >
                    Gửi lại một yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Họ và tên *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-gray-200 rounded-[8px] focus:border-[#EE0033] focus:outline-none text-gray-900 font-medium" 
                        placeholder="Nộp Văn A" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Email doanh nghiệp *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-gray-200 rounded-[8px] focus:border-[#EE0033] focus:outline-none text-gray-900 font-medium" 
                        placeholder="ten@congty.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Tên công ty / Tổ chức *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-gray-200 rounded-[8px] focus:border-[#EE0033] focus:outline-none text-gray-900 font-medium" 
                        placeholder="Công ty TNHH Giải pháp số" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Số điện thoại liên hệ *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-gray-200 rounded-[8px] focus:border-[#EE0033] focus:outline-none text-gray-900 font-medium" 
                        placeholder="0912 xxx xxx" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Mô tả chi tiết cấu trúc tài nguyên yêu cầu</label>
                    <textarea 
                      rows={4}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-gray-200 rounded-[8px] focus:border-[#EE0033] focus:outline-none text-gray-900 font-medium" 
                      placeholder="Cần bao nhiêu vCPUs, RAM, SSD? Đường truyền ưu tiên thế nào? Mục tiêu bảo mật riêng..."
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full p-3 bg-[#EE0033] hover:bg-[#FF302D] text-white font-bold text-xs uppercase tracking-wider rounded-[8px] transition-all-200 shadow-md focus-ring-brand"
                    >
                      Gửi yêu cầu Báo giá doanh nghiệp lớn
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#EE0033] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Đang tải trang bảng giá...</p>
        </div>
      </div>
    }>
      <PricingPageContent />
    </Suspense>
  );
}
