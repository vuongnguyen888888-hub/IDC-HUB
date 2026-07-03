'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useMarket } from '../../hooks/useMarket';
import { MapPin, Phone, Clock, Mail, ShieldAlert, CheckCircle, ExternalLink, Users } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScreenSwitcher from '../../components/ScreenSwitcher';

function ContactPageContent() {
  const { market, isGlobal, getLocalizedPath } = useMarket();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Công nghệ',
    scale: '10 - 50 nhân sự',
    content: '',
    agree: true
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = isGlobal ? [
    {
      city: 'Global Headquarters (Singapore)',
      address: 'Marina Bay Financial Centre Tower 1, 8 Marina Blvd, Singapore 018981.',
      hotline: '+65 6808 5858'
    },
    {
      city: 'Vietnam Representative (Hanoi)',
      address: '16th Floor, Viettel Building, 268 Tran Nguyen Han St, Hoan Kiem, Hanoi, Vietnam.',
      hotline: '+84 1800 585821 (Ext 1)'
    },
    {
      city: 'Southern Branch (Ho Chi Minh City)',
      address: '5th Floor, Viettel Complex, 285 Cach Mang Thang Tam, Dist 10, HCMC, Vietnam.',
      hotline: '+84 1800 585821 (Ext 2)'
    }
  ] : [
    {
      city: 'Hà Nội (Trụ sở chính)',
      address: 'Tầng 16, Tòa nhà Viettel, Số 268 Trần Nguyên Hãn, Quận Hoàn Kiếm, Hà Nội.',
      hotline: '1800 585821 (Nhánh 1)'
    },
    {
      city: 'Chi nhánh Đà Nẵng',
      address: 'Số 58 Nguyễn Văn Linh, Quận Hải Châu, Thành phố Đà Nẵng.',
      hotline: '1800 585821 (Nhánh 3)'
    },
    {
      city: 'Chi nhánh TP. Hồ Chí Minh',
      address: 'Tầng 5, Tòa nhà Viettel Complex, Số 285 Cách Mạng Tháng Tám, Quận 10, TP.HCM.',
      hotline: '1800 585821 (Nhánh 2)'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#5A5A5A] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-12 py-8" id="main-content">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs text-gray-400 font-sans">
            <li>
              <Link href={getLocalizedPath('/')} className="hover:text-brand-500 transition-all-200">
                {isGlobal ? 'Home' : 'Trang chủ'}
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span className="text-gray-700 font-medium" aria-current="page">
                {isGlobal ? 'Contact Us' : 'Liên hệ tư vấn'}
              </span>
            </li>
          </ol>
        </nav>

        {/* LAYOUT 2-COL */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* LEFT COLUMN: Regional Office info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#FAF5F6] text-[#EE0033] border border-[#FCD9D8] tracking-widest w-max block">
                {isGlobal ? 'CUSTOMER SUPPORT PORTAL' : 'CỔNG KẾT NỐI KHÁCH HÀNG'}
              </span>
              <h1 className="text-3xl md:text-4.5xl font-bold tracking-tight text-gray-905 leading-none">
                {isGlobal ? 'Contact Us' : 'Liên hệ với chúng tôi'}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-md">
                {isGlobal ? (
                  'Viettel IDC is always ready to listen and help set up high-performance computing, reliable storage, and comprehensive cloud transition solutions for your business.'
                ) : (
                  'Viettel IDC Hub luôn sẵn lòng lắng nghe và đồng hành thiết lập hệ thống máy chủ, lưu trữ dung lượng lớn và giải pháp chuyển dịch lên mây toàn diện cho doanh nghiệp bạn.'
                )}
              </p>
            </div>

            {/* Regionals block */}
            <div className="space-y-6">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-100 pb-2">
                {isGlobal ? 'Global Representative Offices' : 'Hệ thống văn phòng đại diện'}
              </span>
              
              {offices.map((off, idx) => (
                <div key={idx} className="flex items-start space-x-3.5 text-xs text-gray-600">
                  <div className="p-2 bg-brand-10 border border-brand-100 text-[#EE0033] rounded-lg shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-gray-900 text-sm">{off.city}</h3>
                    <p className="leading-relaxed font-sans">{off.address}</p>
                    <span className="text-[10px] text-gray-400 block">
                      Hotline trực máy lẻ: <strong className="text-gray-700">{off.hotline}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hotline hours */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-center space-x-2 text-xs text-gray-900 font-bold">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>Khung giờ hỗ trợ khách hàng B2B</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed pl-6">
                - Thứ 2 đến Thứ 6: <strong>8:00 – 17:30</strong> (Ngoại giao ký kết)<br />
                - Thứ 7: <strong>8:00 – 12:00</strong> (Tư vấn kỹ thuật)<br />
                - Kênh hỗ trợ báo hỏng Data Center: <strong>Trực tuyến 24/7/365</strong>
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact HubSpot form */}
          <div className="lg:col-span-7 bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-500/5 w-24 h-24 rounded-full blur-xl" />
            
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-gray-950 font-sans">Đăng ký phiếu khảo sát trực tuyến</h2>
              <p className="text-[11px] text-gray-400">Phiếu thông tin được chuyển trực tiếp tới HubSpot CRM của Giải pháp viên.</p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto text-xl font-bold shadow-xs">
                  ✓
                </div>
                <h3 className="text-base md:text-lg font-extrabold text-gray-950">Gửi yêu cầu Báo giá thành công!</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Chúng tôi đã chuyển trực tiếp khảo sát của bạn tới phòng Giải pháp hạ tầng. Đội ngũ Kỹ sư của Viettel IDC Hub sẽ gọi điện liên hệ tư vấn trong <strong>vòng 2 giờ làm việc</strong>.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#EE0033] font-bold hover:underline py-1 focus:outline-none"
                  >
                    Nộp lại một phiếu yêu cầu khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                
                {/* First and Last names */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Họ *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                      placeholder="Nguyễn" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Tên *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                      placeholder="Văn A" 
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Email liên hệ *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                      placeholder="a.nguyen@congty.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                      placeholder="0911 223 344" 
                    />
                  </div>
                </div>

                {/* Organization and Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Công ty / Cơ quan</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                      placeholder="Công ty Giải pháp mây Việt" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Lĩnh vực hoạt động</label>
                    <select 
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                    >
                      <option>Tài chính / Ngân hàng</option>
                      <option>Chính phủ / Khối công</option>
                      <option>Sản xuất / Logistics</option>
                      <option>Y tế / Bệnh viện</option>
                      <option>Công nghệ / Fintech</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>

                {/* Scope Scale dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Quy mô cơ quan doanh nghiệp</label>
                  <select 
                    value={formData.scale}
                    onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                  >
                    <option>Dưới 10 nhân sự</option>
                    <option>10 - 50 nhân sự</option>
                    <option>50 - 200 nhân sự</option>
                    <option>Trên 200 nhân sự</option>
                  </select>
                </div>

                {/* Content text */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Nội dung chi tiết yêu cầu tư vấn</label>
                  <textarea 
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-200 rounded focus:border-[#EE0033] focus:outline-none text-gray-950 font-semibold"
                    placeholder="Mô tả sơ qua thách thức hiện tại, máy chủ cần khởi tạo..."
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start space-x-2 pt-1">
                  <input 
                    type="checkbox" 
                    id="checkbox-privacy"
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="mt-0.5 rounded border-gray-100 text-[#EE0033] focus:ring-[#EE0033] w-4 h-4 cursor-pointer" 
                  />
                  <label htmlFor="checkbox-privacy" className="text-[10px] text-gray-400 leading-tight cursor-pointer">
                    Tôi đồng ý nhận thông tin phản hồi, tư vấn kỹ thuật sản phẩm và tin tức đám mây định kỳ từ hòm thư Viettel IDC Hub.
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full p-3 bg-[#EE0033] hover:bg-[#FF302D] text-white font-extrabold text-xs uppercase tracking-wider rounded shadow-md focus-ring-brand transition-all-200"
                  >
                    Gửi yêu cầu hảo sát tư vấn
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#EE0033] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Đang tải trang liên hệ...</p>
        </div>
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}
