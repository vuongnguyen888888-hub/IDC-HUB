'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarket } from '../../hooks/useMarket';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Award, MapPin, Heart, Target, Sparkles, ArrowRight, 
  CheckCircle2, ChevronRight, Briefcase, Server, Globe, Leaf, 
  Users, Scale, Cpu, FileText, CheckCircle, Flame, Building2
} from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScreenSwitcher from '../../components/ScreenSwitcher';

type TabType = 'brand' | 'awards' | 'infrastructure' | 'esg' | 'csr';

export default function AboutPage() {
  const { market, isGlobal, getLocalizedPath } = useMarket();
  const [activeTab, setActiveTab] = useState<TabType>('brand');

  const tabs = [
    { id: 'brand', labelVi: 'Câu chuyện thương hiệu', labelEn: 'Brand Story' },
    { id: 'awards', labelVi: 'Chứng chỉ & Giải thưởng', labelEn: 'Certificates & Awards' },
    { id: 'infrastructure', labelVi: 'Hạ tầng Data Center', labelEn: 'Data Center Infrastructure' },
    { id: 'esg', labelVi: 'Tiêu chuẩn ESG', labelEn: 'ESG Standards' },
    { id: 'csr', labelVi: 'Trách nhiệm xã hội (CSR)', labelEn: 'Social Responsibility (CSR)' },
  ];

  // TAB 1: Brand Story Data
  const milestones = [
    {
      year: '2008',
      titleVi: 'Thành lập liên doanh',
      titleEn: 'Joint Venture Formed',
      descVi: 'Viettel IDC được thành lập, đặt nền móng hạ tầng trung tâm dữ liệu chuẩn Tier III đầu tiên tại Việt Nam.',
      descEn: 'Viettel IDC was established, laying the foundation for Vietnam\'s first Tier III-standard data center infrastructure.'
    },
    {
      year: '2013',
      titleVi: 'Mở rộng quy mô Cloud',
      titleEn: 'Cloud Scale Expansion',
      descVi: 'Trở thành một trong những nhà cung cấp dịch vụ Điện toán Đám mây đầu tiên được cơ quan nhà nước chứng nhận chất lượng.',
      descEn: 'Became one of the first Cloud computing providers certified by governmental authorities for safety standards.'
    },
    {
      year: '2020',
      titleVi: 'Hạ tầng thông minh thế hệ mới',
      titleEn: 'Next-Gen Smart Infrastructure',
      descVi: 'Khởi công Siêu trung tâm dữ liệu xanh thông minh và tích hợp hệ thống AI thông minh thế hệ mới.',
      descEn: 'Broke ground on Green Smart Hyperscale Data Centers integrated with state-of-the-art AI systems.'
    },
    {
      year: '2026',
      titleVi: 'Dẫn đầu làn sóng AI & Edge',
      titleEn: 'Leading AI & Edge Wave',
      descVi: 'Hợp tác toàn diện với Qualcomm, phát triển biên điện toán thông minh, nâng tầm vị thế công nghệ Việt Nam.',
      descEn: 'Formed a comprehensive partnership with Qualcomm, expanding smart edge compute to position Vietnam globally.'
    }
  ];

  const coreValues = [
    {
      icon: Shield,
      titleVi: 'Bảo mật Tuyệt đối',
      titleEn: 'Absolute Security',
      descVi: 'Mọi dữ liệu của khách hàng là tài sản vô giá, được phòng thủ và bảo vệ bằng quy trình chuẩn quốc tế ISO 27001 và SOC 2.',
      descEn: 'Every customer file is a priceless asset, protected by world-class standards including ISO 27001 and SOC 2 audits.'
    },
    {
      icon: Target,
      titleVi: 'Chất lượng Vượt trội',
      titleEn: 'Uncompromising Quality',
      descVi: 'Cam kết SLA lên tới 99.99%, đảm bảo hạ tầng hoạt động liên tục, không gián đoạn trong mọi điều kiện.',
      descEn: '99.99% SLA commitment, guaranteeing continuous server operations and high performance under any conditions.'
    },
    {
      icon: Award,
      titleVi: 'Chứng nhận Quốc tế',
      titleEn: 'Certified Standards',
      descVi: 'Nhà cung cấp Việt Nam duy nhất sở hữu hạ tầng đạt chứng nhận quốc tế danh giá ANSI/TIA-942 Rated 3 Constructed Facilities.',
      descEn: 'The only Vietnamese provider achieving the prestigious ANSI/TIA-942 Rated 3 Constructed Facilities certification.'
    }
  ];

  // TAB 2: Certificates & Awards Data
  const certificates = [
    {
      code: 'ANSI/TIA-942 Rated 3',
      titleVi: 'Chứng nhận hạ tầng phòng máy đạt chuẩn danh giá nhất thế giới',
      titleEn: 'Constructed Facilities - The world\'s most prestigious DC standard',
      descVi: 'Được trao cho trung tâm dữ liệu được xây dựng hoàn thiện đúng tiêu chuẩn thiết kế khắt khe nhất về nguồn điện, làm mát và phòng chống thảm họa.',
      descEn: 'Awarded to data centers built completely in accordance with the strictest design standards for power, cooling, and disaster mitigation.',
      type: 'Technical'
    },
    {
      code: 'PCI DSS v4.0',
      titleVi: 'Tiêu chuẩn Bảo mật Dữ liệu Thẻ thanh toán',
      titleEn: 'Payment Card Industry Data Security Standard',
      descVi: 'Đảm bảo khả năng phòng thủ tuyệt đối cho các giao dịch tài chính, thanh toán trực tuyến của ngân hàng và fintech trên hạ tầng Cloud.',
      descEn: 'Ensures absolute defense capability for financial transactions and online payments of banks and fintechs on the Cloud infrastructure.',
      type: 'Security'
    },
    {
      code: 'ISO/IEC 27001 & 27017 & 27018',
      titleVi: 'Hệ thống Quản lý An toàn thông tin & Bảo mật điện toán đám mây',
      titleEn: 'Information Security & Cloud Privacy Management Systems',
      descVi: 'Chuẩn hóa quy trình vận hành và bảo vệ dữ liệu cá nhân của khách hàng trên môi trường điện toán đám mây công cộng.',
      descEn: 'Standardizes operational procedures and protects client personal data in public cloud environments.',
      type: 'Compliance'
    },
    {
      code: 'ISO 14001 & ISO 50001',
      titleVi: 'Chứng nhận Quản lý Môi trường & Năng lượng',
      titleEn: 'Environmental & Energy Management Certifications',
      descVi: 'Tối ưu hiệu quả sử dụng năng lượng, cắt giảm lượng phát thải carbon, hướng tới mô hình kinh doanh xanh bền vững.',
      descEn: 'Optimizes energy efficiency and cuts carbon emissions, aiming towards a green and sustainable business model.',
      type: 'Green Standard'
    },
    {
      code: 'SOC 1 & SOC 2 Type II',
      titleVi: 'Báo cáo Kiểm toán Kiểm soát Hệ thống và Tổ chức',
      titleEn: 'System and Organization Controls Audit Reports',
      descVi: 'Kiểm toán độc lập định kỳ bởi Big4 chứng minh tính minh bạch, tính toàn vẹn và mức độ an toàn tối đa của hạ tầng.',
      descEn: 'Periodic independent audits by Big4 proving maximum transparency, integrity, and safety levels of the infrastructure.',
      type: 'Audit'
    },
    {
      code: 'Sao Khuê & Vietnam Digital Awards',
      titleVi: 'Giải thưởng Công nghệ danh giá nhất Việt Nam',
      titleEn: 'Vietnam\'s Most Prestigious Technology Awards',
      descVi: 'Đạt danh hiệu Vàng liên tiếp cho các dịch vụ Viettel Cloud Server, Viettel Kubernetes (OKS) và giải pháp đám mây lai xuất sắc.',
      descEn: 'Continuous Gold Awards for Viettel Cloud Server, Viettel Kubernetes (OKS), and outstanding hybrid cloud solutions.',
      type: 'Awards'
    }
  ];

  // TAB 3: Infrastructure Data
  const datacenters = [
    {
      nameVi: 'Trung tâm Dữ liệu Hòa Lạc (Hà Nội)',
      nameEn: 'Hoa Lac Data Center (Hanoi)',
      specs: {
        racks: '3,000+',
        area: '24,000 m²',
        pue: '< 1.4',
        standard: 'ANSI/TIA-942 Rated 3'
      },
      descVi: 'Siêu trung tâm dữ liệu lớn nhất miền Bắc, hạ tầng phòng thủ tối tân bảo vệ hệ thống cơ quan nhà nước và tập đoàn đa quốc gia.',
      descEn: 'The largest hyperscale data center in Northern Vietnam, with advanced defense infrastructure protecting government systems and multinational enterprises.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600'
    },
    {
      nameVi: 'Trung tâm Dữ liệu Bình Dương (TP. HCM / Bình Dương)',
      nameEn: 'Binh Duong Mega Data Center (HCMC / Binh Duong)',
      specs: {
        racks: '10,000+',
        area: '30,000 m²',
        pue: '< 1.35',
        standard: 'ANSI/TIA-942 Rated 3 Ready'
      },
      descVi: 'Siêu dự án Data Center xanh lớn nhất Việt Nam, ứng dụng công nghệ làm mát bằng chất lỏng (Liquid Cooling) sẵn sàng cho hạ tầng AI chuyên sâu.',
      descEn: 'The largest green mega DC project in Vietnam, applying liquid cooling technologies ready for heavy AI workloads.',
      image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=600'
    },
    {
      nameVi: 'Trung tâm Dữ liệu Pháp Vân (Hà Nội)',
      nameEn: 'Phap Van Data Center (Hanoi)',
      specs: {
        racks: '1,500+',
        area: '10,000 m²',
        pue: '< 1.42',
        standard: 'ANSI/TIA-942 Rated 3'
      },
      descVi: 'Nút thắt viễn thông trung tâm cực kỳ quan trọng, kết nối đa mạng lưới trung lập, đảm bảo băng thông và dự phòng truyền dẫn tối đa.',
      descEn: 'A crucial carrier-neutral telecom gateway node connecting multi-networks, ensuring maximum bandwidth and transmission redundancy.',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600'
    },
    {
      nameVi: 'Trung tâm Dữ liệu Hoàng Hoa Thám (Hồ Chí Minh)',
      nameEn: 'Hoang Hoa Tham Data Center (HCMC)',
      specs: {
        racks: '2,000+',
        area: '15,000 m²',
        pue: '< 1.4',
        standard: 'ANSI/TIA-942 Rated 3'
      },
      descVi: 'Hạ tầng kết nối trọng yếu khu vực phía Nam với chứng nhận vận hành Constructed Facility độc quyền từ hiệp hội viễn thông quốc tế.',
      descEn: 'Key interconnect hub in the South with exclusive Constructed Facility operation certification from the international telecom association.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600'
    },
    {
      nameVi: 'Trung tâm Dữ liệu Đà Nẵng',
      nameEn: 'Da Nang Data Center',
      specs: {
        racks: '1,000+',
        area: '8,000 m²',
        pue: '< 1.45',
        standard: 'ANSI/TIA-942 Rated 3'
      },
      descVi: 'Trạm lưu trữ và sao lưu dự phòng thảm họa (Disaster Recovery) trọng yếu khu vực miền Trung, kết nối thông suốt Bắc - Nam.',
      descEn: 'Critical disaster recovery and backup hub in Central Vietnam, ensuring seamless, uninterrupted connectivity between North and South.',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600'
    }
  ];

  // TAB 4: ESG Data
  const esgItems = [
    {
      pillar: 'Environmental',
      titleVi: 'Bảo vệ môi trường (E)',
      titleEn: 'Environmental Responsibility (E)',
      icon: Leaf,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      pointsVi: [
        'Mục tiêu trung hòa Carbon (Net Zero) vào năm 2040 trên toàn bộ hạ tầng điện toán đám mây.',
        'Sử dụng hệ thống làm mát thông minh Chiller thế hệ mới với công nghệ Free Cooling, giảm tiêu thụ điện năng đến 25%.',
        'Tích hợp điện mặt trời áp mái tại tất cả các tổ hợp phòng máy, đóng góp nguồn năng lượng sạch tuần hoàn.',
        'Văn phòng số không giấy tờ (Paperless) và chính sách tái chế 100% rác thải điện tử chuẩn bảo mật.'
      ],
      pointsEn: [
        'Targeting Net Zero Carbon emissions across all cloud infrastructures by 2040.',
        'Utilizing next-gen Chiller cooling systems with Free Cooling, reducing energy consumption by up to 25%.',
        'Integrating rooftop solar systems at all DC facilities, generating clean renewable energy.',
        'Paperless digital workplace and 100% certified secure recycling of retired electronic hardware.'
      ]
    },
    {
      pillar: 'Social',
      titleVi: 'Giá trị xã hội (S)',
      titleEn: 'Social Impact (S)',
      icon: Users,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
      pointsVi: [
        'Hạ tầng số tin cậy nâng đỡ toàn bộ hệ thống dịch vụ công quốc gia, chuyển đổi số hành chính công cho hàng triệu người dân.',
        'Hỗ trợ toàn diện cộng đồng khởi nghiệp công nghệ thông qua các chương trình hỗ trợ tài nguyên đám mây miễn phí.',
        'Cam kết môi trường làm việc công bằng, bình đẳng giới và đào tạo bồi dưỡng liên tục cho đội ngũ kỹ sư Việt.',
        'Bảo mật và an toàn dữ liệu cá nhân tối thượng theo chuẩn quốc tế nhằm bảo vệ người tiêu dùng số Việt Nam.'
      ],
      pointsEn: [
        'Reliable digital infrastructure powering national public services, helping digitize administration for millions.',
        'Empowering tech startups with free cloud resources and technical mentoring programs.',
        'Committing to an inclusive, gender-equal workplace with continuous advanced training for Vietnamese engineers.',
        'Upholding the highest level of personal data security to safeguard digital citizens.'
      ]
    },
    {
      pillar: 'Governance',
      titleVi: 'Quản trị doanh nghiệp (G)',
      titleEn: 'Corporate Governance (G)',
      icon: Scale,
      color: 'bg-amber-50 text-amber-700 border-amber-100',
      pointsVi: [
        'Tuân thủ tuyệt đối chuẩn mực pháp lý Việt Nam và các hiệp định an ninh bảo mật dữ liệu quốc tế.',
        'Cơ chế giám sát rủi ro an ninh mạng độc lập, minh bạch hóa kết quả kiểm toán định kỳ hàng năm bởi kiểm toán độc lập.',
        'Chính sách không khoan nhượng với tham nhũng, hối lộ, duy trì tính minh bạch trong mọi hoạt động thầu và đầu tư hạ tầng.',
        'Hệ thống quản lý dịch vụ IT chuẩn hóa hoàn toàn theo tiêu chuẩn ISO 20000-1 khắt khe nhất.'
      ],
      pointsEn: [
        'Absolute compliance with Vietnamese laws and strict international data privacy agreements.',
        'Independent cyber-risk assessment mechanisms, transparently published through periodic third-party audits.',
        'Zero-tolerance policy towards corruption, maintaining absolute integrity in bidding and infrastructure procurement.',
        'IT service management processes certified under the rigorous ISO 20000-1 standards.'
      ]
    }
  ];

  // TAB 5: CSR Data
  const csrPrograms = [
    {
      titleVi: 'Chương trình "Trái tim cho em"',
      titleEn: '"Heart for Children" Program',
      icon: Heart,
      descVi: 'Viettel IDC đồng hành cùng Tập đoàn công nghiệp - viễn thông Quân đội Viettel tài trợ 100% chi phí phẫu thuật tim bẩm sinh cho trẻ em có hoàn cảnh khó khăn dưới 16 tuổi tại Việt Nam, mang lại cuộc sống mới cho hơn 6,500 em nhỏ.',
      descEn: 'Viettel IDC coordinates with Viettel Group to fully sponsor congenital heart surgeries for disadvantaged children under 16 years old across Vietnam, giving a second chance of life to over 6,500 children.',
      statsVi: 'Hơn 6.500 ca phẫu thuật được tài trợ',
      statsEn: 'Over 6,500 surgeries sponsored'
    },
    {
      titleVi: 'Sóng và máy tính cho em',
      titleEn: 'Signal & Computer for Students',
      icon: Globe,
      descVi: 'Hỗ trợ lắp đặt cơ sở hạ tầng mạng Internet cáp quang tốc độ cao và quyên góp hàng ngàn thiết bị học tập cho các điểm trường tại vùng sâu vùng xa, biên giới, hải đảo nhằm thu hẹp khoảng cách tiếp cận tri thức số.',
      descEn: 'Supporting high-speed fiber-optic network deployments and donating thousands of tablets/laptops to students in remote, mountainous, and border school districts to bridge the digital knowledge gap.',
      statsVi: 'Hạ tầng mạng đến 100% điểm trường khó khăn',
      statsEn: 'Fiber network coverage at 100% targeted remote schools'
    },
    {
      titleVi: 'Học bổng & Hỗ trợ Labs Công nghệ',
      titleEn: 'Academic Scholarships & Cloud Tech Labs',
      icon: Cpu,
      descVi: 'Tài trợ các phòng thí nghiệm nghiên cứu Điện toán đám mây và AI Lab tại các trường đại học hàng đầu (Bách Khoa, Quốc gia, PTIT), cung cấp tài khoản cloud credit miễn phí cho sinh viên và giảng viên làm nghiên cứu.',
      descEn: 'Sponsoring advanced Cloud & AI Lab facilities at top universities (HUST, VNU, PTIT), providing free cloud resource accounts to support academic researchers and engineering students.',
      statsVi: 'Hơn 10 tỷ đồng tài trợ tài nguyên Cloud',
      statsEn: 'Over 10 billion VND in cloud resources sponsored'
    },
    {
      titleVi: 'Ủng hộ Đồng bào vùng bão lũ & Thiên tai',
      titleEn: 'Natural Disasters Relief & Resilient Telecoms',
      icon: Flame,
      descVi: 'Hỗ trợ khẩn cấp nhu yếu phẩm, hạ tầng liên lạc dự phòng và phục hồi hệ thống quản trị dữ liệu đám mây cho các cơ quan địa phương bị tàn phá bởi bão lũ, bảo đảm duy trì kết nối thông suốt thời điểm khủng hoảng.',
      descEn: 'Providing emergency food supplies, emergency backup communication lines, and free cloud server restoration for disaster-stricken local governments to maintain continuity in times of crisis.',
      statsVi: 'Hành động nhanh chóng trong 24h thiên tai',
      statsEn: 'Fast recovery actions within 24h of disaster warnings'
    }
  ];

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
                {isGlobal ? 'About Us' : 'Về Viettel IDC'}
              </span>
            </li>
          </ol>
        </nav>

        {/* HERO HEADER */}
        <div className="mb-10 text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full bg-red-50 text-[#EE0033] border border-[#EE0033]/20 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGlobal ? 'VIETNAM DIGITAL FOUNDATION' : 'HẠ TẦNG SỐ CHO QUỐC GIA SỐ'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 leading-none">
            {isGlobal ? 'About Viettel IDC' : 'Về Viettel IDC'}
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 max-w-2xl leading-relaxed font-sans">
            {isGlobal 
              ? 'Discover our values, world-class certificates, carrier-neutral hyperscale data centers, robust ESG initiatives, and dedicated corporate social responsibilities.' 
              : 'Khám phá hành trình xây dựng lòng tin, hệ thống chứng chỉ bảo mật đỉnh cao, mạng lưới siêu trung tâm dữ liệu thông minh, nỗ lực phát triển bền vững ESG và trách nhiệm xã hội.'}
          </p>
        </div>

        {/* TAB NAVIGATION CONTROLS */}
        <div className="mb-12 border-b border-neutral-100 pb-4">
          <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-2.5 px-5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#EE0033] text-white shadow-sm hover:bg-[#FF1A4E]'
                    : 'bg-neutral-50 border border-neutral-200/60 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {isGlobal ? tab.labelEn : tab.labelVi}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT ANIMATION WRAPPER */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'brand' && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                {/* Brand Story Hero Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-neutral-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#EE0033]/10 w-[400px] h-[400px] rounded-full blur-3xl -mr-20 -mt-20" />
                  
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-4 text-left">
                    <span className="text-[10px] font-extrabold uppercase px-3 py-1 bg-[#EE0033]/30 text-red-200 border border-[#EE0033]/25 tracking-widest rounded-full w-max">
                      {isGlobal ? 'BRAND ESSENCE' : 'BẢN SẮC THƯƠNG HIỆU'}
                    </span>
                    <h2 className="text-xl md:text-3xl font-black tracking-tight text-white leading-tight">
                      {isGlobal ? 'Building Independent, Secure, and Green Infrastructure for Vietnam\'s Sovereignty' : 'Kiến tạo hạ tầng số độc lập, an toàn và bền vững cho chủ quyền Việt Nam'}
                    </h2>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans">
                      {isGlobal 
                        ? 'For nearly two decades, Viettel IDC has stood as the proud leader of Vietnam\'s digital backbone. Starting as a strategic pioneer in telecom-grade data centers, we have evolved into a national cloud powerhouse. We commit to powering governmental platforms and small-to-large corporate digital architectures alike with localized support, green sustainability, and zero security compromise.' 
                        : 'Trong suốt gần 2 thập kỷ, Viettel IDC tự hào là đơn vị thủ lĩnh dẫn dắt hạ tầng số Việt Nam. Bắt đầu từ định vị tiên phong xây dựng phòng máy đạt chuẩn quốc tế, chúng tôi chuyển mình mạnh mẽ trở thành hệ sinh thái Cloud chuẩn quốc tế lớn nhất. Chúng tôi cam kết bảo vệ dữ liệu, đồng hành cùng chính phủ số, doanh nghiệp số bằng chất lượng phụng sự, giải pháp xanh bền vững.'}
                    </p>
                  </div>
                  
                  <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10 space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase font-mono">{isGlobal ? 'OUR VISION' : 'TẦM NHÌN'}</span>
                      <p className="text-xs text-neutral-200 font-sans italic leading-relaxed">
                        {isGlobal 
                          ? '"To serve as the trusted digital anchor, enabling Vietnamese ideas to thrive globally through secure, local cloud innovations."' 
                          : '"Trở thành mỏ neo số đáng tin cậy nhất, nâng đỡ khát vọng số của doanh nghiệp Việt vươn tầm thế giới trên nền tảng hạ tầng bảo mật đỉnh cao."'}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase font-mono">{isGlobal ? 'OUR MISSION' : 'SỨ MỆNH'}</span>
                      <p className="text-xs text-neutral-200 font-sans italic leading-relaxed">
                        {isGlobal 
                          ? '"To democratize advanced cloud compute and cyber defense tools, ensuring data sovereignty for our nation while safeguarding every corporate digital footprint."' 
                          : '"Phổ cập công nghệ điện toán đám mây và phòng thủ an ninh mạng tối tân, bảo vệ chủ quyền số quốc gia và đồng hành cùng mọi dấu chân chuyển đổi số của khách hàng."'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Core Values */}
                <div className="space-y-8">
                  <div className="text-left max-w-xl">
                    <h3 className="text-lg md:text-2xl font-black text-neutral-900 tracking-tight">
                      {isGlobal ? 'Our Core Values' : 'Giá trị cốt lõi'}
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans mt-1">
                      {isGlobal ? 'The foundation of absolute trust, high availability, and certified safety.' : 'Ba giá trị cột trụ vững chắc định nghĩa vị thế dẫn đầu trong lòng hàng triệu đối tác.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {coreValues.map((v, idx) => {
                      const Icon = v.icon;
                      return (
                        <motion.div 
                          key={idx} 
                          whileHover={{ y: -6 }}
                          className="bg-white border border-neutral-150 rounded-2xl p-6 md:p-8 hover:border-[#EE0033]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left"
                        >
                          <div className="space-y-4">
                            <div className="w-11 h-11 rounded-xl bg-red-50 text-[#EE0033] border border-red-100/50 flex items-center justify-center">
                              <Icon className="w-5 h-5" />
                            </div>
                            <h4 className="font-extrabold text-neutral-900 text-sm md:text-base">
                              {isGlobal ? v.titleEn : v.titleVi}
                            </h4>
                            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                              {isGlobal ? v.descEn : v.descVi}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Milestones Timeline */}
                <div className="space-y-8">
                  <div className="text-left max-w-xl">
                    <h3 className="text-lg md:text-2xl font-black text-neutral-900 tracking-tight">
                      {isGlobal ? 'Development Milestones' : 'Chặng đường phát triển'}
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans mt-1">
                      {isGlobal ? 'How we transformed Vietnam\'s high-tech cloud ecosystem.' : 'Hành trình nỗ lực bền bỉ và bứt phá công nghệ qua từng cột mốc lịch sử.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {milestones.map((milestone, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -4 }}
                        className="bg-neutral-50 border border-neutral-150 rounded-2xl p-6 text-left relative"
                      >
                        <div className="text-3xl font-black text-[#EE0033] mb-3 font-mono">{milestone.year}</div>
                        <h4 className="font-extrabold text-neutral-900 text-xs md:text-sm mb-2">
                          {isGlobal ? milestone.titleEn : milestone.titleVi}
                        </h4>
                        <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                          {isGlobal ? milestone.descEn : milestone.descVi}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'awards' && (
              <motion.div
                key="awards"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Awards Introduction */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-neutral-100 pb-8">
                  <div className="text-left max-w-xl space-y-1">
                    <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase px-2.5 py-1 rounded bg-red-50 border border-red-100">{isGlobal ? 'CERTIFICATIONS' : 'CHỨNG CHỈ QUỐC TẾ'}</span>
                    <h2 className="text-xl md:text-3xl font-black text-neutral-900 tracking-tight pt-2">
                      {isGlobal ? 'Unrivaled Security and Quality Standards' : 'Chuẩn mực an toàn và chất lượng số 1'}
                    </h2>
                    <p className="text-xs text-neutral-500 font-sans">
                      {isGlobal 
                        ? 'We hold the most prestigious international security, compliance, and design certifications in Vietnam.' 
                        : 'Viettel IDC là đơn vị duy nhất tại Việt Nam sở hữu đầy đủ bộ chứng chỉ an toàn, vận hành và quản trị năng lượng cao cấp nhất.'}
                    </p>
                  </div>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {certificates.map((cert, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -6 }}
                      className="bg-white border border-neutral-150 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-[#EE0033]/30 hover:shadow-lg transition-all duration-300 text-left"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 uppercase tracking-wider font-mono">
                            {cert.type}
                          </span>
                          <CheckCircle className="w-5 h-5 text-[#EE0033]" />
                        </div>
                        <h3 className="font-extrabold text-[#EE0033] text-sm md:text-base tracking-tight font-mono">
                          {cert.code}
                        </h3>
                        <h4 className="font-bold text-neutral-900 text-xs md:text-sm">
                          {isGlobal ? cert.titleEn : cert.titleVi}
                        </h4>
                        <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                          {isGlobal ? cert.descEn : cert.descVi}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'infrastructure' && (
              <motion.div
                key="infrastructure"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Intro */}
                <div className="text-left max-w-2xl space-y-2">
                  <span className="text-[10px] font-extrabold text-emerald-700 tracking-widest uppercase px-2.5 py-1 rounded bg-emerald-50 border border-emerald-100">{isGlobal ? 'HYPERSCALE DATA NETWORK' : 'HỆ THỐNG PHÒNG MÁY TIÊU CHUẨN TOÀN CẦU'}</span>
                  <h2 className="text-xl md:text-3xl font-black text-neutral-900 tracking-tight pt-1">
                    {isGlobal ? 'Mạng lưới 5 Siêu Trung Tâm Dữ Liệu' : 'Mạng lưới 5 Siêu Trung Tâm Dữ Liệu'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    {isGlobal 
                      ? 'We operate carrier-neutral, green-conscious cloud infrastructures across key economic corridors of Vietnam, delivering unmatched latency, double redundancy power feeds, and continuous physical-defense SOC.' 
                      : 'Mạng lưới 5 trung tâm dữ liệu phân tán trọng điểm trên toàn quốc, tích hợp công nghệ xanh làm mát tối tân, cam kết thời gian hoạt động liên tục tối đa và kết nối trung lập đa nhà mạng.'}
                  </p>
                </div>

                {/* DC Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {datacenters.map((dc, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -4 }}
                      className="bg-white border border-neutral-150 hover:border-[#EE0033]/30 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden text-left flex flex-col md:flex-row h-full items-stretch"
                    >
                      <div className="md:w-5/12 min-h-[200px] relative shrink-0">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${dc.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent md:hidden" />
                      </div>
                      
                      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#EE0033] uppercase tracking-wider font-mono">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span>{isGlobal ? 'ACTIVE NODE' : 'NÚT TRỌNG YẾU'}</span>
                          </div>
                          <h3 className="font-extrabold text-neutral-900 text-sm md:text-base leading-snug">
                            {isGlobal ? dc.nameEn : dc.nameVi}
                          </h3>
                          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                            {isGlobal ? dc.descEn : dc.descVi}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-neutral-100 text-[10px] font-sans">
                          <div className="space-y-0.5">
                            <span className="text-neutral-400 block font-bold uppercase">{isGlobal ? 'RACK CAPACITY' : 'SỨC CHỨA RACK'}</span>
                            <span className="text-neutral-900 font-extrabold font-mono text-xs">{dc.specs.racks}</span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-neutral-400 block font-bold uppercase">{isGlobal ? 'PUE RATING' : 'CHỈ SỐ PUE'}</span>
                            <span className="text-[#EE0033] font-extrabold font-mono text-xs">{dc.specs.pue}</span>
                          </div>
                          <div className="space-y-0.5 col-span-2">
                            <span className="text-neutral-400 block font-bold uppercase">{isGlobal ? 'STANDARD' : 'TIÊU CHUẨN'}</span>
                            <span className="text-neutral-800 font-extrabold text-xs">{dc.specs.standard}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'esg' && (
              <motion.div
                key="esg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Intro */}
                <div className="text-left max-w-2xl space-y-2">
                  <span className="text-[10px] font-extrabold text-emerald-700 tracking-widest uppercase px-2.5 py-1 rounded bg-emerald-50 border border-emerald-100">{isGlobal ? 'SUSTAINABLE INITIATIVES' : 'CAM KẾT PHÁT TRIỂN BỀN VỮNG'}</span>
                  <h2 className="text-xl md:text-3xl font-black text-neutral-900 tracking-tight pt-1">
                    {isGlobal ? 'Tiêu chuẩn ESG (Môi trường - Xã hội - Quản trị)' : 'Mô hình Tăng trưởng Xanh ESG chuẩn quốc tế'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    {isGlobal 
                      ? 'We align our corporate operations with modern global Environmental, Social, and Corporate Governance standards to guarantee a high-integrity ecosystem for our stakeholders.' 
                      : 'Hành động vì tương lai số bền vững. Chúng tôi tích hợp tiêu chuẩn ESG vào mọi chiến lược đầu tư hạ tầng nhằm mang lại lợi ích tốt nhất cho doanh nghiệp, xã hội và môi trường Việt Nam.'}
                  </p>
                </div>

                {/* ESG Pillars Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {esgItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -6 }}
                        className="bg-white border border-neutral-150 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-[#EE0033]/20 hover:shadow-lg transition-all duration-300 text-left"
                      >
                        <div className="space-y-6">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="font-extrabold text-neutral-900 text-sm md:text-base">
                              {isGlobal ? item.titleEn : item.titleVi}
                            </h3>
                            
                            <ul className="space-y-3">
                              {(isGlobal ? item.pointsEn : item.pointsVi).map((point, pIdx) => (
                                <li key={pIdx} className="flex gap-2.5 items-start text-xs text-neutral-600 font-sans leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-[#EE0033] shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'csr' && (
              <motion.div
                key="csr"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Intro */}
                <div className="text-left max-w-2xl space-y-2">
                  <span className="text-[10px] font-extrabold text-[#EE0033] tracking-widest uppercase px-2.5 py-1 rounded bg-red-50 border border-red-100">{isGlobal ? 'GIVING BACK' : 'TRÁCH NHIỆM VỚI CỘNG ĐỒNG'}</span>
                  <h2 className="text-xl md:text-3xl font-black text-neutral-900 tracking-tight pt-1">
                    {isGlobal ? 'Trách nhiệm Xã hội CSR' : 'Trách nhiệm Xã hội (CSR) - Đồng hành Phụng sự'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    {isGlobal 
                      ? 'Leveraging the power of our cloud assets and resources to heal, educate, and empower underrepresented sectors and remote communities of Vietnam.' 
                      : 'Không chỉ dẫn đầu công nghệ, chúng tôi cam kết trích một phần nguồn lực hạ tầng đám mây để hỗ trợ y tế, nâng đỡ giáo dục và cứu hộ xã hội lúc khó khăn.'}
                  </p>
                </div>

                {/* CSR Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {csrPrograms.map((prog, idx) => {
                    const Icon = prog.icon;
                    return (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -4 }}
                        className="bg-white border border-neutral-150 rounded-2xl p-6 md:p-8 hover:border-[#EE0033]/30 hover:shadow-lg transition-all duration-300 text-left flex gap-5 items-start cursor-pointer"
                      >
                        <div className="w-11 h-11 rounded-xl bg-red-50 text-[#EE0033] border border-red-100 flex items-center justify-center shrink-0 mt-1">
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="space-y-3 flex-1">
                          <h3 className="font-extrabold text-neutral-900 text-sm md:text-base leading-snug">
                            {isGlobal ? prog.titleEn : prog.titleVi}
                          </h3>
                          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                            {isGlobal ? prog.descEn : prog.descVi}
                          </p>
                          <div className="text-[10px] font-extrabold uppercase text-[#EE0033] tracking-wider font-mono bg-[#EE0033]/5 border border-[#EE0033]/15 px-3 py-1 rounded-full w-max pt-1.5 pb-1">
                            {isGlobal ? prog.statsEn : prog.statsVi}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RECRUITMENT BANNER */}
        <section className="bg-neutral-50 border border-neutral-200/60 rounded-3xl p-6 md:p-10 mb-8 mt-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-lg md:text-2xl font-black text-neutral-900 tracking-tight leading-tight">
              {isGlobal ? 'Ready to shape the cloud-first future?' : 'Đồng hành xây dựng hạ tầng số tương lai?'}
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-sans">
              {isGlobal 
                ? 'Looking to engineer advanced server infrastructure, cloud systems, or specialized GPU-AI architectures? Join our engineering team.' 
                : 'Bạn muốn làm chủ các giải pháp mây tiên tiến, vận hành hệ thống máy chủ GPU lớn hay thiết kế giải pháp bảo mật? Hãy gửi hồ sơ gia nhập đội ngũ Viettel IDC.'}
            </p>
          </div>
          <Link 
            href={getLocalizedPath('/contact')} 
            className="bg-[#EE0033] hover:bg-[#FF1A4E] text-white px-6 py-3 rounded-[8px] font-bold text-xs md:text-sm flex items-center gap-2 whitespace-nowrap shadow-sm transition-all duration-300 self-start lg:self-center cursor-pointer"
          >
            <span>{isGlobal ? 'Apply Now &rarr;' : 'Gửi hồ sơ Ứng tuyển ngay &rarr;'}</span>
          </Link>
        </section>

      </main>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}
