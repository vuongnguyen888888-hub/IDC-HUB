'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useMarket } from '../../hooks/useMarket';
import { 
  BookOpen, FileText, Newspaper, Award, Search, ArrowRight, 
  Sparkles, Cpu, ChevronLeft, ChevronRight 
} from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScreenSwitcher from '../../components/ScreenSwitcher';

interface ResourceItem {
  id: string;
  category: 'blog' | 'casestudy' | 'whitepaper' | 'news';
  categoryLabelVi: string;
  categoryLabelEn: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  date: string;
  readTimeVi: string;
  readTimeEn: string;
  icon: React.ComponentType<any>;
  image: string;
}

const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'case-study-vpbank',
    category: 'casestudy',
    categoryLabelVi: 'Case Study',
    categoryLabelEn: 'Case Study',
    titleVi: 'Hành trình di chuyển hạ tầng lõi VPBank lên Viettel Hybrid Cloud',
    titleEn: 'VPBank\'s Journey Migrating Core Infrastructure to Viettel Hybrid Cloud',
    descVi: 'Khám phá giải pháp tối ưu hóa chi phí đến 35% và đảm bảo an ninh bảo mật cấp độ cao nhất cho hệ thống ngân hàng số.',
    descEn: 'Discover the solution that optimized costs by 35% and guaranteed the highest level of security for the digital banking system.',
    date: '2026-06-15',
    readTimeVi: '10 phút đọc',
    readTimeEn: '10 min read',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800'
  },
  {
    id: 'blog-kubernetes-autoscaling',
    category: 'blog',
    categoryLabelVi: 'Blog Kỹ thuật',
    categoryLabelEn: 'Tech Blog',
    titleVi: 'Tối ưu hóa khả năng tự động mở rộng (Autoscaling) trên Viettel OKS',
    titleEn: 'Optimizing Autoscaling Capability on Viettel OKS (Kubernetes)',
    descVi: 'Hướng dẫn cấu hình Horizontal Pod Autoscaler (HPA) kết hợp Vertical Pod Autoscaler để giải quyết lưu lượng tăng đột biến.',
    descEn: 'A guide to configuring Horizontal Pod Autoscaler (HPA) combined with Vertical Pod Autoscaler to handle sudden traffic spikes.',
    date: '2026-06-10',
    readTimeVi: '8 phút đọc',
    readTimeEn: '8 min read',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'
  },
  {
    id: 'whitepaper-hybrid-cloud-vietnam',
    category: 'whitepaper',
    categoryLabelVi: 'Whitepaper',
    categoryLabelEn: 'Whitepaper',
    titleVi: 'Báo cáo Xu hướng Điện toán Đám mây Lai (Hybrid Cloud) tại Việt Nam 2026',
    titleEn: 'Vietnam Hybrid Cloud Trend Report 2026',
    descVi: 'Khảo sát và phân tích toàn diện nhu cầu, rào cản pháp lý và kiến trúc hạ tầng đám mây tối ưu cho doanh nghiệp Việt Nam.',
    descEn: 'Comprehensive survey and analysis of demands, legal compliance barriers, and optimal cloud architectures for Vietnamese businesses.',
    date: '2026-05-28',
    readTimeVi: '25 trang',
    readTimeEn: '25 pages',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800'
  },
  {
    id: 'news-edge-computing',
    category: 'news',
    categoryLabelVi: 'Tin Công nghệ',
    categoryLabelEn: 'Tech News',
    titleVi: 'Viettel IDC hợp tác Qualcomm ra mắt hạ tầng Điện toán Biên thông minh',
    titleEn: 'Viettel IDC partners with Qualcomm to launch Smart Edge Computing infrastructure',
    descVi: 'Sự kết hợp bứt phá mở ra hệ sinh thái AI Edge, camera giám sát thông minh và các giải pháp đô thị thông minh chuẩn quốc tế.',
    descEn: 'A breakthrough combination opening up the AI Edge ecosystem, smart security cameras, and international standard smart city solutions.',
    date: '2026-05-20',
    readTimeVi: '5 phút đọc',
    readTimeEn: '5 min read',
    icon: Newspaper,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800'
  },
  {
    id: 'case-study-kidsplaza',
    category: 'casestudy',
    categoryLabelVi: 'Case Study',
    categoryLabelEn: 'Case Study',
    titleVi: 'Hệ thống bán lẻ KidsPlaza tự động vượt bão Black Friday nhờ Cloud Server',
    titleEn: 'KidsPlaza Retail System Auto-scales to Survive Black Friday traffic',
    descVi: 'Giải quyết bài toán thắt nút cổ chai băng thông và tải máy chủ trong các khung giờ vàng mua sắm với chi phí cực kỳ tiết kiệm.',
    descEn: 'Solving the bandwidth bottleneck and server load issues during peak shopping hours with extreme cost efficiency.',
    date: '2026-04-12',
    readTimeVi: '6 phút đọc',
    readTimeEn: '6 min read',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800'
  },
  {
    id: 'blog-ddos-protection',
    category: 'blog',
    categoryLabelVi: 'Blog Kỹ thuật',
    categoryLabelEn: 'Tech Blog',
    titleVi: 'Xây dựng lá chắn phòng thủ 5 lớp chống tấn công Anti-DDoS quy mô lớn',
    titleEn: 'Building a 5-layer Shield against Large-scale Anti-DDoS Attacks',
    descVi: 'Phân tích kỹ thuật chuyên sâu về các kịch bản tấn công Lớp 3, Lớp 4 và Lớp 7 và cách hệ thống Viettel Cloudrity tự động ngăn chặn.',
    descEn: 'Deep technical analysis of Layer 3, 4, and 7 attack scenarios and how the Viettel Cloudrity system auto-mitigates them.',
    date: '2026-03-30',
    readTimeVi: '12 phút đọc',
    readTimeEn: '12 min read',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800'
  }
];

export default function ResourcesPage() {
  const { market, isGlobal, getLocalizedPath } = useMarket();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'blog' | 'casestudy' | 'whitepaper' | 'news'>('all');

  const filteredItems = useMemo(() => {
    return RESOURCE_ITEMS.filter(item => {
      const matchFilter = activeFilter === 'all' || item.category === activeFilter;
      const title = isGlobal ? item.titleEn : item.titleVi;
      const desc = isGlobal ? item.descEn : item.descVi;
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery, isGlobal]);

  const categories = isGlobal 
    ? [
        { id: 'all', name: 'All Resources' },
        { id: 'blog', name: 'Tech Blogs' },
        { id: 'casestudy', name: 'Case Studies' },
        { id: 'whitepaper', name: 'Whitepapers' },
        { id: 'news', name: 'News & Events' }
      ]
    : [
        { id: 'all', name: 'Tất cả tài nguyên' },
        { id: 'blog', name: 'Blog kỹ thuật' },
        { id: 'casestudy', name: 'Case Studies' },
        { id: 'whitepaper', name: 'Whitepapers' },
        { id: 'news', name: 'Sự kiện & Tin tức' }
      ];

  // Helper variables for mockup layout
  const featuredItem = filteredItems[0];
  const latestItems = filteredItems.slice(1, 5); // next 4 items

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F5F0EA] text-[#1A1A1A] font-sans antialiased">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16 my-8 md:my-12 bg-white rounded-[32px] md:rounded-[40px] shadow-[0_24px_64px_rgba(0,0,0,0.03)] border border-neutral-100/80 text-left" id="main-content">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs text-gray-400 font-sans">
            <li>
              <Link href={getLocalizedPath('/')} className="hover:text-[#EE0033] transition-all duration-150">
                {isGlobal ? 'Home' : 'Trang chủ'}
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <span className="text-gray-700 font-medium" aria-current="page">
                {isGlobal ? 'Resources' : 'Trung tâm Tài nguyên'}
              </span>
            </li>
          </ol>
        </nav>

        {/* HERO TITLE BLOCK */}
        <div className="mb-10 text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full bg-red-50 text-[#EE0033] border border-[#EE0033]/20 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGlobal ? 'KNOWLEDGE CENTER' : 'TRUNG TÂM TRI THỨC SỐ'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 leading-none">
            {isGlobal ? 'Resources & Insights' : 'Trung tâm Tài nguyên & Tri thức'}
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 max-w-2xl leading-relaxed font-sans">
            {isGlobal 
              ? 'Stay updated with our latest deep tech blogs, customer success stories, official whitepapers, and comprehensive industry reports.' 
              : 'Thư viện tổng hợp kiến thức chuyên sâu, tài liệu chuyên môn, case study chuyển đổi số và các cập nhật công nghệ mới nhất từ Viettel IDC.'}
          </p>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b border-neutral-100 pb-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id as any)}
                className={`py-2 px-5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-[#EE0033] text-white shadow-sm hover:bg-[#FF1A4E]'
                    : 'bg-neutral-50 border border-neutral-200/60 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder={isGlobal ? 'Search resources...' : 'Tìm kiếm tài nguyên...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 focus:border-[#EE0033] focus:bg-white rounded-full text-xs outline-none transition-all placeholder-neutral-400 text-neutral-900 font-medium"
            />
          </div>
        </div>

        {/* LAYOUT GRID: FEATURED & LATEST */}
        {featuredItem ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-stretch">
            {/* LEFT FEATURED HERO CARD (60%) */}
            <div className="lg:col-span-7 flex flex-col">
              <Link 
                href={getLocalizedPath('/contact')}
                className="group relative flex-1 flex flex-col justify-end min-h-[380px] md:min-h-[440px] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg border border-neutral-100 transition-all duration-500 cursor-pointer"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${featuredItem.image})` }}
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/40 to-transparent" />
                
                <div className="relative z-10 p-6 md:p-8 space-y-4 text-left">
                  <span className="inline-block text-[10px] font-bold text-neutral-900 bg-white/95 px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-xs font-sans">
                    {isGlobal ? featuredItem.categoryLabelEn : featuredItem.categoryLabelVi}
                  </span>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-red-200 transition-colors">
                    {isGlobal ? featuredItem.titleEn : featuredItem.titleVi}
                  </h2>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-2">
                    {isGlobal ? featuredItem.descEn : featuredItem.descVi}
                  </p>
                  <div className="text-[10px] text-neutral-400 font-bold tracking-wide uppercase flex items-center gap-2 pt-2 border-t border-white/10 w-max">
                    <span>{featuredItem.date}</span>
                    <span>•</span>
                    <span>{isGlobal ? featuredItem.readTimeEn : featuredItem.readTimeVi}</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* RIGHT LATEST LIST (40%) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-base md:text-lg font-black text-neutral-900 tracking-tight font-sans text-left border-b border-neutral-100 pb-2 mb-4">
                  {isGlobal ? 'Latest resources' : 'Tài nguyên mới nhất'}
                </h2>
                
                <div className="space-y-4 divide-y divide-neutral-100">
                  {latestItems.map((item) => (
                    <Link 
                      href={getLocalizedPath('/contact')}
                      key={item.id}
                      className="flex gap-4 items-start pt-4 first:pt-0 first:border-none group cursor-pointer text-left"
                    >
                      <div className="w-20 h-20 bg-neutral-100 rounded-2xl overflow-hidden shrink-0 relative border border-neutral-150 shadow-xs">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-xs md:text-sm font-bold text-neutral-900 group-hover:text-[#EE0033] transition-colors leading-snug line-clamp-2">
                          {isGlobal ? item.titleEn : item.titleVi}
                        </h3>
                        <p className="text-[11px] text-neutral-400 font-bold font-sans flex items-center gap-1.5 pt-1">
                          <span className="text-[#EE0033]/90">{isGlobal ? item.categoryLabelEn : item.categoryLabelVi}</span>
                          <span>•</span>
                          <span>{isGlobal ? item.readTimeEn : item.readTimeVi}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                  
                  {/* If latestItems is empty, render nice fallback list items */}
                  {latestItems.length === 0 && (
                    <div className="text-neutral-400 text-xs py-8 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                      {isGlobal ? 'Check back soon for more updates!' : 'Đang tải thêm tài nguyên mới nhất...'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* FOUNDERS CORNER STYLE GRID SECTION */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-8 mt-16">
          <h2 className="text-lg md:text-2xl font-black text-neutral-900 tracking-tight font-sans">
            {isGlobal ? 'Knowledge Hub Directory' : 'Thư mục tài nguyên tri thức'}
          </h2>
          
          {/* Circular Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-300 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all duration-300 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-COLUMN CARDS GRID */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredItems.map((item) => (
              <Link 
                key={item.id}
                href={getLocalizedPath('/contact')}
                className="group flex flex-col justify-between bg-white hover:bg-[#FAF8F5]/30 rounded-3xl p-5 border border-neutral-150 hover:border-[#EE0033]/30 hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="space-y-4">
                  {/* Card image with aspect 16/10, highly rounded 2xl */}
                  <div className="aspect-[16/10] w-full bg-neutral-100 rounded-2xl overflow-hidden relative border border-neutral-100">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {/* Category tag with bullet dot indicator */}
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#EE0033]" />
                      <span className="text-[10px] font-bold text-[#EE0033] uppercase tracking-wider font-sans">
                        {isGlobal ? item.categoryLabelEn : item.categoryLabelVi}
                      </span>
                    </div>
                    
                    <h3 className="font-extrabold text-neutral-900 text-sm md:text-base group-hover:text-[#EE0033] transition-colors leading-snug line-clamp-2">
                      {isGlobal ? item.titleEn : item.titleVi}
                    </h3>
                    
                    <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 font-sans">
                      {isGlobal ? item.descEn : item.descVi}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-neutral-100 pt-4 mt-6 flex items-center justify-between text-[11px] text-neutral-400 font-bold font-sans">
                  <span>{item.date}</span>
                  <span className="text-[#EE0033] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>{isGlobal ? item.readTimeEn : item.readTimeVi}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-50 border border-dashed border-neutral-200 rounded-3xl mb-16">
            <BookOpen className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="font-bold text-neutral-900 text-sm">
              {isGlobal ? 'No resources found' : 'Không tìm thấy tài nguyên'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 font-sans">
              {isGlobal ? 'Try adjusting your filter or search query.' : 'Vui lòng thử từ khóa khác hoặc đổi bộ lọc.'}
            </p>
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-8 mt-8">
          <button className="flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors duration-200 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            <span>{isGlobal ? 'Previous' : 'Trước'}</span>
          </button>
          
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center cursor-pointer">
              1
            </button>
            <button className="w-8 h-8 rounded-full text-neutral-500 hover:bg-neutral-100 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer">
              2
            </button>
            <button className="w-8 h-8 rounded-full text-neutral-500 hover:bg-neutral-100 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer">
              3
            </button>
            <button className="w-8 h-8 rounded-full text-neutral-500 hover:bg-neutral-100 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer">
              4
            </button>
            <button className="w-8 h-8 rounded-full text-neutral-500 hover:bg-neutral-100 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer">
              5
            </button>
          </div>
          
          <button className="flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-[#EE0033] transition-colors duration-200 cursor-pointer">
            <span>{isGlobal ? 'Next' : 'Tiếp'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* TECHNICAL DOCUMENTATION PREVIEW BANNER */}
        <section className="bg-neutral-50 border border-neutral-200/60 rounded-3xl p-6 md:p-10 mb-8 mt-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-lg md:text-2xl font-black text-neutral-900 tracking-tight leading-tight">
              {isGlobal ? 'Need developer integration docs?' : 'Cần tài liệu tích hợp cho lập trình viên?'}
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-sans">
              {isGlobal 
                ? 'Access our comprehensive API references, developer command-line interfaces (CLI), and official SDK libraries to deploy on Viettel IDC.' 
                : 'Khám phá cổng tài liệu kỹ thuật chuyên nghiệp, hệ quản trị API, hướng dẫn lệnh CLI và các bộ thư viện SDK tối ưu dành cho nhà phát triển.'}
            </p>
          </div>
          <a 
            href="https://docs.viettelidc.com.vn" 
            target="_blank" 
            rel="noreferrer" 
            className="bg-[#EE0033] hover:bg-[#FF1A4E] text-white px-6 py-3 rounded-full font-bold text-xs md:text-sm flex items-center gap-2 whitespace-nowrap shadow-sm transition-all duration-300 self-start lg:self-center cursor-pointer"
          >
            <span>docs.viettelidc.com.vn ↗</span>
          </a>
        </section>

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}
