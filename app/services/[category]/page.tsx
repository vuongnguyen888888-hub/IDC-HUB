'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cpu, ChevronRight, Phone, CheckCircle2, ArrowRight, BookOpen, Headphones } from 'lucide-react';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScreenSwitcher from '../../../components/ScreenSwitcher';
import ComputeAndContainerPage from '../../../components/ComputeAndContainerPage';
import { SERVICE_CATEGORIES } from '../../../lib/db';

type PageParams = { category: string };

interface PageProps {
  params: Promise<PageParams>;
}

function ServiceCategoryPageContent({ params }: PageProps) {
  const router = useRouter();
  
  // Resolve the dynamic parameters safely
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;

  if (categorySlug === 'compute') {
    return <ComputeAndContainerPage />;
  }

  const category = SERVICE_CATEGORIES.find(c => c.slug === categorySlug) || {
    id: categorySlug,
    name: categorySlug === 'data-center' ? 'Trung tâm dữ liệu' : 'Dịch vụ Đám mây hợp nhất',
    slug: categorySlug,
    description: 'Nền tảng hạ tầng số toàn vẹn, bảo mật cao cấp phục vụ vận hành ứng dụng quy mô doanh nghiệp Việt.',
    products: []
  };

  // Generate fallback products if the category doesn't have initialized items
  const displayProducts = category.products.length > 0 ? category.products : [
    {
      id: `${categorySlug}-basic`,
      name: `Bộ Giải Pháp Standard - ${category.name}`,
      slug: `${categorySlug}-standard`,
      categorySlug: categorySlug,
      description: `Hạ tầng ${category.name} trọn gói hiệu năng vượt trội, tối ưu 40% chi phí cho doanh nghiệp Start-up và SME.`,
      specs: [{ label: 'Uptime', value: '✓ 99.99%' }, { label: 'Bảo mật', value: '🔒 ISO 27001' }]
    },
    {
      id: `${categorySlug}-enterprise`,
      name: `Hạ Tầng Enterprise - ${category.name}`,
      slug: `${categorySlug}-enterprise`,
      categorySlug: categorySlug,
      description: `Kiến trúc chuyên sâu, bảo mật phân tách vật lý (Private/Hybrid) có kết nối truyền dẫn kênh thuê riêng tốc độ cao VPC.`,
      specs: [{ label: 'Uptime', value: '✓ 99.995%' }, { label: 'Hỗ trợ', value: '💬 Premium 24/7' }]
    }
  ];

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
              <span className="text-gray-400">Dịch vụ</span>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span aria-current="page" className="text-gray-700 font-medium">{category.name}</span>
            </li>
          </ol>
        </nav>

        {/* HEADER SECTION */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-10 text-brand-600 border border-brand-100 uppercase tracking-widest w-max block">
              DANH MỤC DỊCH VỤ CỐT LÕI
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-sans leading-none">
              {category.name}
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              {category.description}
            </p>
          </div>
          
          <div className="hidden md:block p-4 bg-white border border-gray-100 rounded-xl max-w-xs shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">TRỢ GIÚP DỊCH VỤ</span>
            <span className="text-xs font-bold text-gray-900 block">Cần tư vấn nhanh trong 5 phút?</span>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Bộ phận kỹ sư giải pháp Viettel IDC luôn túc trực hỗ trợ thiết kế ảo hóa phù hợp.</p>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-900">Danh sách sản phẩm dịch vụ</h2>
            <span className="text-xs text-gray-400">Hiển thị {displayProducts.length} dịch vụ tiêu biểu</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white border border-gray-100 rounded-xl p-6 hover:bg-brand-10 hover:border-brand-100 hover:shadow-md transition-all-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded bg-[#FAF5F6] border border-[#FCD9D8] text-brand-500 flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {prod.specs?.map((spec, sidx) => (
                        <span key={sidx} className="text-[9px] font-semibold bg-gray-50 px-2 py-0.5 rounded border border-gray-100 text-gray-600">
                          {spec.value}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-gray-950 group-hover:text-brand-500 transition-all-200">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 mt-6 flex justify-between items-center">
                  <span className="text-[11px] text-gray-400 uppercase tracking-widest font-extrabold">F-TYPE AUTO READY</span>
                  <Link 
                    href={`/services/${categorySlug}/${prod.slug}`}
                    className="text-xs font-bold text-brand-500 group-hover:text-brand-800 transition-all-200 flex items-center"
                  >
                    <span>Xem chi tiết</span>
                    <ChevronRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* STICKY CONSULT BAR */}
      <div className="fixed bottom-6 right-6 z-40 bg-white rounded-xl border border-gray-100 shadow-xl p-4 flex items-center space-x-3 max-w-sm">
        <div className="p-2 bg-brand-10 border border-brand-100 text-brand-500 rounded-lg">
          <Phone className="w-5 h-5 animate-bounce" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider leading-none">HOTLINE TƯ VẤN</span>
          <span className="text-sm font-extrabold text-gray-900 block hover:text-[#EE0033]">1800 585821</span>
        </div>
        <Link 
          href="/contact"
          className="px-3.5 py-2 bg-brand-500 hover:bg-brand-300 text-white text-xs font-bold rounded transition-all-200 shadow-sm"
        >
          Gọi ngay
        </Link>
      </div>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}

export default function ServiceCategoryPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#EE0033] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Đang tải danh mục dịch vụ...</p>
        </div>
      </div>
    }>
      <ServiceCategoryPageContent params={params} />
    </Suspense>
  );
}
