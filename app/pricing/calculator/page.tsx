'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Calculator, Check, ArrowRight, Printer, RefreshCw, FileText } from 'lucide-react';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScreenSwitcher from '../../../components/ScreenSwitcher';

function PricingCalculatorPageContent() {
  const [vcpu, setVcpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [ssd, setSsd] = useState(100);
  const [bandwidth, setBandwidth] = useState(50);
  const [cycle, setCycle] = useState<1 | 6 | 12>(1);

  // Derived pricing metrics computed directly to avoid rendering cascades
  const cpuCost = vcpu * 80000;
  const ramCost = ram * 45000;
  const ssdCost = ssd * 1500;
  const bandwidthCost = Math.max(0, bandwidth - 10) * 5000;

  const totalCost = cpuCost + ramCost + ssdCost + bandwidthCost;
  
  // Cycle discount metrics
  const discountRate = cycle === 6 ? 0.10 : cycle === 12 ? 0.20 : 0;
  const discountAmount = totalCost * discountRate;
  const finalCost = totalCost - discountAmount;

  const handleReset = () => {
    setVcpu(2);
    setRam(4);
    setSsd(100);
    setBandwidth(50);
    setCycle(1);
  };

  const formattedValue = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#5A5A5A] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-12 py-8" id="main-content">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-gray-400 font-sans">
            <li>
              <Link href="/" className="hover:text-brand-500 transition-all-200">Trang chủ</Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span className="text-gray-700 font-medium font-sans" aria-current="page">Pricing Calculator (Dự toán chi phí)</span>
            </li>
          </ol>
        </nav>

        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <span className="text-[#EE0033] font-bold text-xs uppercase tracking-wider block">CÔNG CỤ LIÊN HOẠT</span>
          <h1 className="text-3xl font-extrabold text-gray-990 font-sans leading-none">
            Tính toán Chi Phí Máy Chủ Đám Mây
          </h1>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Kéo các thanh trượt tài nguyên theo nhu cầu nghiệp vụ để ngay lập tức hiển thị báo cáo dự toán ngân sách chi tiết.
          </p>
        </div>

        {/* CORE CALCULATOR GRAPHICS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* LEFT: Sliders controls (col-span-7) */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-extrabold text-gray-900 uppercase tracking-widest block">Tùy biến tài nguyên ảo hóa</span>
              <button 
                onClick={handleReset}
                className="text-[10px] text-gray-400 font-bold hover:text-[#EE0033] flex items-center space-x-1 focus:outline-none"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Đặt lại mặc định</span>
              </button>
            </div>

            {/* Slider 1: CPU */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-700 font-bold">1. Bộ vi xử lý (vCPU Intel High-perf):</span>
                <span className="text-[#EE0033] font-extrabold">{vcpu} Cores ({formattedValue(cpuCost)} đ)</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={32} 
                step={1}
                value={vcpu}
                onChange={(e) => setVcpu(parseInt(e.target.value))}
                className="w-full accent-[#EE0033] h-1.5 bg-gray-150 rounded-lg cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>1 Core (Min)</span>
                <span>32 Cores (Max)</span>
              </div>
            </div>

            {/* Slider 2: RAM */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-700 font-bold">2. Bộ nhớ đệm (RAM DDR4 ECC):</span>
                <span className="text-[#EE0033] font-extrabold">{ram} GB ({formattedValue(ramCost)} đ)</span>
              </div>
              <input 
                type="range" 
                min={2} 
                max={128} 
                step={2}
                value={ram}
                onChange={(e) => setRam(parseInt(e.target.value))}
                className="w-full accent-[#EE0033] h-1.5 bg-gray-150 rounded-lg cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>2 GB (Min)</span>
                <span>128 GB (Max)</span>
              </div>
            </div>

            {/* Slider 3: SSD Storage */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-700 font-bold">3. Dung lượng lưu trữ (Enterprise SSD RAID 10):</span>
                <span className="text-[#EE0033] font-extrabold">{ssd} GB ({formattedValue(ssdCost)} đ)</span>
              </div>
              <input 
                type="range" 
                min={50} 
                max={2048} 
                step={50}
                value={ssd}
                onChange={(e) => setSsd(parseInt(e.target.value))}
                className="w-full accent-[#EE0033] h-1.5 bg-gray-150 rounded-lg cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-sans">
                <span>50 GB (Min)</span>
                <span>2 TB (Max)</span>
              </div>
            </div>

            {/* Slider 4: Bandwidth */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-700 font-bold">4. Băng thông Internet trong nước (Shared):</span>
                <span className="text-[#EE0033] font-extrabold">{bandwidth} Mbps ({formattedValue(bandwidthCost)} đ)</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={1000} 
                step={10}
                value={bandwidth}
                onChange={(e) => setBandwidth(parseInt(e.target.value))}
                className="w-full accent-[#EE0033] h-1.5 bg-gray-150 rounded-lg cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>10 Mbps (Free)</span>
                <span>1 Gbps (Max)</span>
              </div>
            </div>

            {/* Dropdown 5: Payment Cycle */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 mb-2">5. Chu Kỳ Đăng Ký Thanh Toán (Chiết khấu lỹ kế)</label>
              <select 
                value={cycle}
                onChange={(e) => setCycle(parseInt(e.target.value) as any)}
                className="w-full text-xs p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-905 font-semibold shadow-xs"
              >
                <option value={1}>Thanh toán Từng Tháng (Không chiết khấu)</option>
                <option value={6}>Đăng ký 6 Tháng (Chiết khấu lập tức 10%)</option>
                <option value={12}>Đăng ký 12 Tháng (Chiết khấu lập tức 20%)</option>
              </select>
            </div>
          </div>

          {/* RIGHT: Bill Summary (col-span-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-gray-800">
              <div className="absolute top-0 right-0 bg-[#EE0033]/15 w-32 h-32 rounded-full blur-2xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-brand-500 uppercase tracking-widest block">Báo cáo dự toán hằng tháng</span>
                  <div className="w-2 h-2 rounded-full bg-success animate-ping" />
                </div>

                {/* Grid Item billing review */}
                <div className="space-y-3 font-mono text-[11px] text-gray-300">
                  <div className="flex justify-between">
                    <span>vCPU ({vcpu} Cores) x 80K:</span>
                    <span>{formattedValue(cpuCost)} đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM ({ram} GB) x 45K:</span>
                    <span>{formattedValue(ramCost)} đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SSD ({ssd} GB) x 1.5K:</span>
                    <span>{formattedValue(ssdCost)} đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Băng thông ({bandwidth} Mbps):</span>
                    <span>{formattedValue(bandwidthCost)} đ</span>
                  </div>

                  <div className="border-t border-white/10 pt-3 space-y-2">
                    <div className="flex justify-between font-sans text-xs">
                      <span>Cộng gộp chưa VAT:</span>
                      <span>{formattedValue(totalCost)} đ</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between font-sans text-xs text-brand-500 font-bold">
                        <span>Chiết khấu chu kỳ ({cycle === 6 ? '10%' : '20%'}):</span>
                        <span>-{formattedValue(discountAmount)} đ</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-center space-y-3">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">TỔNG KHAI GIÁ CHO CYCEL</span>
                  <div className="text-3.5xl font-extrabold text-[#EE0033] tracking-tight">
                    {formattedValue(finalCost)} <span className="text-xs text-gray-400 font-medium font-sans">đ/tháng</span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    *Mức giá mang tính tham khảo dự đoán, hỗ trợ thay đổi tức thời trên Console.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex gap-3 relative z-10">
                <a 
                  href="https://console.viettelidc.com.vn"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-[#EE0033] hover:bg-[#FF302D] text-white rounded text-center text-xs font-bold uppercase transition-all-200 shadow-md"
                >
                  Khởi chạy VM
                </a>
                <button 
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-white/10 border border-white/15 hover:bg-white/20 text-white rounded transition-all-200"
                  title="In báo giá dự toán"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Assistance block */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-2 text-xs">
              <span className="font-bold text-gray-950 block">★ Chính sách tài trợ doanh nghiệm B2B</span>
              <p className="text-gray-500 leading-relaxed font-sans">
                Nếu bạn cần cấu trúc cấu hình khối lượng công việc vượt mức 32 vCPUs hoặc có mạng lưới kết nối đa băng thông, vui lòng nộp phiếu khảo sát ở hòm thư liên hệ hoặc gọi Hotline 1800 585821.
              </p>
            </div>
          </div>

        </section>

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}

export default function PricingCalculatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#EE0033] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Đang tải trang dự toán...</p>
        </div>
      </div>
    }>
      <PricingCalculatorPageContent />
    </Suspense>
  );
}
