'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, TrendingUp, Handshake, Check, HelpCircle, ArrowUpRight, Sparkles } from 'lucide-react';

import NavbarStandard from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScreenSwitcher from '../../components/ScreenSwitcher';

function PartnersPageContent() {
  const [activeFormTab, setActiveFormTab] = useState<'agency' | 'reseller' | 'affiliate'>('agency');
  const [submitted, setSubmitted] = useState(false);

  // Form fields
  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '', company: '', memo: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    { label: 'Hoa hồng chiết khấu doanh thu', reseller: '10% - 15%', solution: '15% - 20%', pinnacle: 'Tới 25% +' },
    { label: 'Khóa đào tạo kỹ thuật đám mây', reseller: '✓ Cơ bản', solution: '✓ Chuyên sâu (Free)', pinnacle: '✓ Chuyên sâu & Chứng chỉ' },
    { label: 'Quản lý cơ hội bán hàng (Deal Registration)', reseller: '✕ Chưa hỗ trợ', solution: '✓ Cổng Portal riêng', pinnacle: '✓ Đồng hành bán hàng chuyên sâu' },
    { label: 'Quỹ đồng truyền thông (Co-marketing)', reseller: '✕ Không', solution: '✓ Hỗ trợ 50%', pinnacle: '✓ Trài ngân sách 100%' },
    { label: 'Mức độ ưu tiên kỹ sư hỗ trợ', reseller: 'Standard 24/7', solution: 'L1 Fast-track', pinnacle: 'Đại diện Kỹ sư riêng (Dedicated)' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#5A5A5A] font-sans">
      <NavbarStandard />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-12 py-8" id="main-content">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-gray-400 font-sans">
            <li>
              <Link href="/" className="hover:text-brand-500 transition-all-200">Trang chủ</Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span className="text-gray-700 font-medium" aria-current="page">Chương trình đối tác</span>
            </li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden text-center max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 bg-brand-500/5 w-40 h-40 rounded-full blur-xl" />
          
          <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#FFE8EC] text-[#8A001D] border border-[#FFBBCA] tracking-widest w-max mx-auto block">
              HỢP TÁC VỮNG BỀN · ĐỒNG HÀNH PHÁT TRIỂN
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-950 leading-tight">
              Chương trình Đối tác Viettel IDC Hub
            </h1>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">
              Chúng tôi cung cấp chính sách hoa hồng lũy kế dẫn đầu thị trường kết hợp năng lực hạ tầng số tuyệt đối an toàn vững chắc, giải quyết triệt để rào cản triển khai ứng dụng của đối tác.
            </p>
            
            {/* KPI Metrics */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-gray-100 max-w-xl mx-auto">
              <div>
                <span className="block text-2xl font-extrabold text-[#EE0033]">+500</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Doanh nghiệp tham gia</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#EE0033]">63</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Tỉnh thành toàn quốc</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="block text-2xl font-extrabold text-[#EE0033]">Tới 25%</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Chiết khấu hoa hồng</span>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNER TIERS (3-col cards) */}
        <section className="mb-16 space-y-8">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h2 className="text-xl font-bold text-gray-950 font-sans">Phân cấp hạng chương trình</h2>
            <p className="text-xs text-gray-500">Mô hình phân cấp rõ ràng tương xứng với đóng góp hạ tầng của Đại lý.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reseller */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[9px] font-extrabold bg-gray-200 text-gray-700 py-0.5 px-2.5 rounded uppercase tracking-wider w-max block">Reseller Tier</span>
                <h3 className="font-bold text-gray-900 text-sm">Đối Tác Đại Lý Tên Miền & Hosting</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Tuyệt vời cho các SME thiết kế Website, cá nhân Freelance mong muốn bán kèm tên miền miền quốc gia VN, Hosting SSD tốc độ cao và hòm Mail chuyên nghiệp.
                </p>
              </div>
              <div className="border-t border-gray-200/60 pt-4 text-xs font-semibold text-gray-700">
                Chiết khấu cơ bản bắt đầu từ: <strong className="text-brand-500">10% doanh thu</strong>
              </div>
            </div>

            {/* Solution Partner */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-5 flex flex-col justify-between relative">
              <div className="space-y-3">
                <span className="text-[9px] font-extrabold bg-brand-10 text-brand-600 py-0.5 px-2.5 rounded border border-brand-100 uppercase tracking-wider w-max block">Solution Partner</span>
                <h3 className="font-bold text-gray-900 text-sm">Đối tác Tích hợp & Chuyển đổi số</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Dành cho các đơn vị kinh doanh phần mềm ERP, Core banking, SaaS hoặc Hệ điều hành có cấu trúc hạ tầng máy chủ ảo Cloud Server dồi dào.
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4 text-xs font-semibold text-gray-700">
                Chính sách chiết khấu trung bình: <strong className="text-brand-500">15% - 20% doanh thu</strong>
              </div>
            </div>

            {/* Pinnacle */}
            <div className="bg-brand-10 border-2 border-[#EE0033] rounded-xl p-6 shadow-md space-y-5 flex flex-col justify-between relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-extrabold bg-[#EE0033] text-white py-0.5 px-2.5 rounded uppercase tracking-wider shadow-sm">
                Cao cấp nhất
              </span>
              
              <div className="space-y-3">
                <span className="text-[9px] font-extrabold bg-[#FFE8EC] text-[#8A001D] py-0.5 px-2.5 rounded border border-[#FFBBCA] uppercase tracking-wider w-max block">Pinnacle Alliance</span>
                <h3 className="font-bold text-gray-900 text-sm">Liên minh Hạ tầng số Bán buôn</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Quan hệ đối tác quy mô lớn chiến lược sở hữu tủ rack riêng hoặc cụm phòng máy Private Cloud độc lập, cam kết doanh thu hằng quý lớn.
                </p>
              </div>
              <div className="border-t border-[#FCD9D8] pt-4 text-xs font-semibold text-gray-700">
                Chiết khấu kịch khung đặc biệt: <strong className="text-brand-500">Lên tới 25% +</strong>
              </div>
            </div>
          </div>
        </section>

        {/* VIETTEL IDC × QUALCOMM SPOTLIGHT */}
        <section className="bg-[#1A1A1A] text-white border border-gray-800 rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#EE0033]/10 w-48 h-48 rounded-full blur-3xl animate-pulse" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded text-[#EE0033] text-[9px] font-extrabold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Liên minh chiến lược Toàn cầu</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                Viettel IDC × Qualcomm Strategic Alliance
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-xl font-sans">
                Hợp tác chiến lược thiết lập cụm máy chủ Tính toán biên AI (AI Edge Computing Nodes) đầu tiên tại Việt Nam, tối ưu hóa các ứng dụng quét phân tích khuôn mặt, chuyển phát tự động và IoT có độ trễ cực thấp.
              </p>
            </div>
            
            <div className="lg:col-span-4 bg-white/5 border border-white/10 p-6 rounded-xl text-center space-y-2">
              <span className="text-xs text-gray-300 block">Sức mạnh tính toán tối ưu AI</span>
              <span className="text-2xl font-extrabold text-[#EE0033] block">Qualcomm Edge</span>
              <span className="text-[10px] text-success block">✓ Deploy diện rộng 2024</span>
            </div>
          </div>
        </section>

        {/* BENEFITS COMPARISON TABLE */}
        <section className="mb-16 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-950 font-sans">Bảng so sánh quyền lợi chi tiết</h2>
          </div>

          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 font-bold uppercase tracking-wider">Hạng mục quyền lợi</th>
                    <th className="p-4 font-bold bg-gray-900/50">Reseller</th>
                    <th className="p-4 font-bold">Solution Partner</th>
                    <th className="p-4 font-bold">Pinnacle Alliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans text-gray-600">
                  {benefits.map((ben, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">{ben.label}</td>
                      <td className="p-4 bg-gray-50">{ben.reseller}</td>
                      <td className="p-4 font-medium text-gray-900">{ben.solution}</td>
                      <td className="p-4 font-extrabold text-[#EE0033]">{ben.pinnacle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* REGISTRATION TABS & FORMS */}
        <section className="max-w-3xl mx-auto bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-2xl">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-extrabold uppercase text-[#EE0033] tracking-widest block">NỘP FORM KHẢO SÁT CHƯƠNG TRÌNH</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-950">Đăng ký trở thành Đối tác chiến lược</h2>
          </div>

          {/* Form tab switcher */}
          <div className="flex justify-center space-x-2 border-b border-gray-200 mb-6">
            <button 
              onClick={() => setActiveFormTab('agency')}
              className={`py-2 px-4 text-xs font-bold border-b-2 transition-all-200 focus:outline-none ${
                activeFormTab === 'agency' ? 'border-[#EE0033] text-[#EE0033]' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Cổng Đại Lý (Agency)
            </button>
            <button 
              onClick={() => setActiveFormTab('reseller')}
              className={`py-2 px-4 text-xs font-bold border-b-2 transition-all-200 focus:outline-none ${
                activeFormTab === 'reseller' ? 'border-[#EE0033] text-[#EE0033]' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Nhà Phân Phối (Reseller)
            </button>
            <button 
              onClick={() => setActiveFormTab('affiliate')}
              className={`py-2 px-4 text-xs font-bold border-b-2 transition-all-200 focus:outline-none ${
                activeFormTab === 'affiliate' ? 'border-[#EE0033] text-[#EE0033]' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Tiếp thị liên kết (Affiliate)
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-success/15 text-success rounded-full flex items-center justify-center text-lg font-bold mx-auto">
                ✓
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">Chúng tôi đã nhận được thông tin đối tác!</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Hệ thống HubSpot đã lưu trữ tự động dữ liệu khảo sát. Chuyên viên phát triển đối tác sẽ liên lập và gửi tài liệu chiết khấu tới bạn trong vòng 2 giờ làm việc.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#EE0033] font-bold hover:underline focus:outline-none"
              >
                Đăng ký một hòm hồ sơ khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Họ &amp; Tên đại diện *</label>
                  <input 
                    type="text" 
                    required
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                    placeholder="Nguyễn Văn Đại diện" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email liên hệ *</label>
                  <input 
                    type="email" 
                    required
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                    placeholder="partner@doanhnghiep.com" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Số điện thoại *</label>
                  <input 
                    type="tel" 
                    required
                    value={formValues.phone}
                    onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                    placeholder="0911 xxx xxx" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Tên công ty hoặc Website đại lý *</label>
                  <input 
                    type="text" 
                    required
                    value={formValues.company}
                    onChange={(e) => setFormValues({ ...formValues, company: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                    placeholder="www.daonhanghiep.com" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Sơ bộ thế mạnh tệp khách hàng hoặc doanh số cam kết</label>
                <textarea 
                  rows={3}
                  value={formValues.memo}
                  onChange={(e) => setFormValues({...formValues, memo: e.target.value})}
                  className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                  placeholder="Cam kết doanh thọ 50tr/tháng, chuyên cung cấp Website TMĐT..."
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full p-3 bg-[#EE0033] hover:bg-[#FF302D] text-white font-extrabold text-xs uppercase tracking-wider rounded shadow-md focus-ring-brand transition-all-200"
                >
                  Gửi hồ sơ đăng ký đối tác (Tab: {activeFormTab === 'agency' ? 'Đại Lý' : activeFormTab === 'reseller' ? 'Nhà Phân Phối' : 'Tiếp Thị'})
                </button>
              </div>
            </form>
          )}
        </section>

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}

export default function PartnersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#EE0033] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Đang tải trang đối tác...</p>
        </div>
      </div>
    }>
      <PartnersPageContent />
    </Suspense>
  );
}
