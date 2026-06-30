'use client';

import React, { use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, ChevronRight, HelpCircle, Shield, Layers, HelpCircle as HelpIcon, Sparkles } from 'lucide-react';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScreenSwitcher from '../../../components/ScreenSwitcher';
import { SOLUTIONS } from '../../../lib/db';

type PageParams = { slug: string };

interface PageProps {
  params: Promise<PageParams>;
}

function SolutionDetailPageContent({ params }: PageProps) {
  const router = useRouter();
  
  // Resolve the dynamic parameters safely
  const resolvedParams = use(params);
  const solutionSlug = resolvedParams.slug;

  const solution = SOLUTIONS.find(s => s.slug === solutionSlug) || SOLUTIONS[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#5A5A5A] font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-12 py-8" id="main-content">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs text-gray-400 font-sans">
            <li>
              <Link href="/" className="hover:text-brand-500 transition-all-200">Trang chủ</Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span className="text-gray-400">Giải pháp</span>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span aria-current="page" className="text-gray-700 font-medium">{solution.segmentName}</span>
            </li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-14 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#EE0033]/5 w-48 h-48 rounded-full blur-2xl" />
          
          <div className="max-w-3xl space-y-5 relative z-10">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-brand-10 text-brand-600 border border-brand-100 uppercase tracking-widest w-max block">
              CHÚ TRỌNG DOANH NGHIỆP · {solution.segmentName}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {solution.name}
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              {solution.description} Đảm bảo tính sẵn hành kinh doanh vững chắc, tuân thủ pháp luật về dự phòng trung tâm dữ liệu thứ cấp.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#EE0033] hover:bg-[#FF302D] text-white font-bold text-xs uppercase tracking-wider rounded text-center transition-all-200 focus-ring-brand"
              >
                Đặt lịch tư vấn kỹ thuật
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 bg-white border border-gray-100 hover:border-brand-500 text-gray-700 hover:text-brand-700 font-bold text-xs uppercase tracking-wider rounded text-center transition-all-200"
              >
                Xem bảng giá điện toán
              </Link>
            </div>
          </div>
        </section>

        {/* PROBLEM -> SOLUTION (2-col Layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          {/* Left Column: Problem */}
          <div className="bg-brand-10/50 border border-[#FCD9D8] rounded-2xl p-8 space-y-6">
            <div className="flex items-center space-x-2 border-b border-[#FCD9D8] pb-3 text-brand-700">
              <AlertCircle className="w-5 h-5 text-brand-500" />
              <span className="text-sm font-extrabold uppercase tracking-wider">Thách thức & Điểm yếu chí mạng</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-950 font-sans leading-snug">
              {solution.problemHeadline}
            </h3>

            <ul className="space-y-4">
              {solution.painPoints.map((pain, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs leading-relaxed text-gray-700">
                  <span className="text-[#EE0033] font-bold text-sm mt-0.5">✕</span>
                  <p>{pain}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Solution */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 text-success">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-sm font-extrabold uppercase tracking-wider text-gray-900">Giải pháp toàn vẹn Viettel IDC</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-950 leading-snug">
              Thiết kế topo đồng bộ liên tục tối ưu
            </h3>

            <ul className="space-y-4">
              {solution.solutions.map((sol, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs leading-relaxed text-gray-600">
                  <span className="text-success font-extrabold text-sm mt-0.5">✓</span>
                  <p className="font-medium text-gray-900">{sol}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CASE STUDY HIGHLIGHT */}
        <section className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-[10px] font-extrabold uppercase text-[#EE0033] block">BẢO CHỨNG THÀNH CÔNG THỰC TẾ</span>
              <h3 className="font-bold text-gray-950 text-base md:text-lg">
                {solution.caseStudy.client}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
                {solution.caseStudy.result} Nhờ vào đường bảo mật mạng chuyên dụng và các kỹ sư giám sát 24/7 của chúng tôi.
              </p>
            </div>
            <div className="md:col-span-4 bg-white p-6 rounded-xl border border-gray-100 text-center shadow-xs">
              <span className="text-2xl font-extrabold text-[#EE0033] block">RTO &lt; 15 phút</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mt-1">Chuẩn bảo mật quốc gia</span>
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="mb-16 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-gray-990">Các dịch vụ mây tích hợp trong giải pháp này</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.relatedProducts.map((prod, idx) => (
              <div 
                key={idx}
                className="bg-white border border-gray-100 rounded-xl p-5 hover:bg-brand-10 hover:border-brand-100 transition-all-200 flex justify-between items-center group shadow-xs"
              >
                <div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-brand-600 transition-all-200">{prod.name}</h3>
                  <span className="text-[10px] text-gray-400 block mt-1">Cấu hình tự động theo chuẩn Rated 3</span>
                </div>
                <Link 
                  href={`/services/${prod.categorySlug}/${prod.slug}`}
                  className="text-xs font-bold text-brand-500 group-hover:text-brand-800 flex items-center"
                >
                  <span>Tìm hiểu</span>
                  <ChevronRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}

export default function SolutionDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#EE0033] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Đang tải giải pháp đám mây...</p>
        </div>
      </div>
    }>
      <SolutionDetailPageContent params={params} />
    </Suspense>
  );
}
