'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useMarket } from '../hooks/useMarket';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const NetworkMap = dynamic(() => import('../components/NetworkMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-gray-400 gap-2 p-6 text-center">
      <div className="w-6 h-6 border-2 border-[#EE0033] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-[10px] font-black text-gray-400 font-mono">ĐANG KHỞI TẠO BẢN ĐỒ...</span>
    </div>
  )
});
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Search, Cpu, Database, HardDrive, Layers, Globe, Shield, 
  Activity, Briefcase, HelpCircle, Mail, ExternalLink, Lock, CheckCircle2, ChevronRight, HelpCircle as HelpIcon, Sparkles,
  Cloud, Server, Network, Settings, FileCheck, GitBranch, RefreshCw, ChevronLeft, ShoppingBag, Heart, GraduationCap, Building2, Check,
  ChevronDown, ArrowLeft, MapPin, User, Phone, Home, Zap, Clock, Wind, Landmark, HeartPulse, Wallet,
  Award, ShieldCheck, Leaf
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScreenSwitcher from '../components/ScreenSwitcher';
import { SERVICE_CATEGORIES, CLIENT_LOGOS } from '../lib/db';

const BUSSINESS_SOLUTIONS = [
  {
    title: "Sao lưu & Phục hồi thảm họa",
    slug: "backup-dr",
    items: [
      "Sao lưu tự động đa vùng",
      "DRaaS với RPO/RTO cam kết",
      "Khôi phục trong < 4 giờ"
    ],
    icon: Cloud,
    bgImage: "https://res.cloudinary.com/dpyizq1m2/image/upload/v1782044058/the_1_yo0bdf.png"
  },
  {
    title: "Chuyển đổi hạ tầng lên Cloud",
    slug: "cloud-migration",
    items: [
      "Khảo sát & lập lộ trình migration",
      "Di chuyển không gián đoạn",
      "Tối ưu chi phí sau di trú"
    ],
    icon: Server,
    bgImage: "https://res.cloudinary.com/dpyizq1m2/image/upload/v1782044058/the_2_hwpdon.png"
  },
  {
    title: "Đám mây hiệu năng cao",
    slug: "hpc",
    items: [
      "GPU H100 / L40S cho AI & ML",
      "Hạ tầng độ trễ thấp <1ms",
      "Mở rộng đàn hồi theo giờ"
    ],
    icon: Cpu,
    bgImage: "https://res.cloudinary.com/dpyizq1m2/image/upload/v1782044059/the_3_axnetp.png"
  },
  {
    title: "An toàn TT & Tuân thủ",
    slug: "digital-gov",
    items: [
      "Tuân thủ Nghị định 13 / ISO 27001",
      "SOC vận hành 24/7",
      "Audit log & báo cáo compliance"
    ],
    icon: Shield,
    bgImage: "https://res.cloudinary.com/dpyizq1m2/image/upload/v1782044059/the_4_yb5vpq.png"
  },
  {
    title: "DevSecOps",
    slug: "devsecops",
    items: [
      "Pipeline CI/CD an toàn",
      "Quét bảo mật tự động (SAST/DAST)",
      "Hạ tầng dạng mã (IaC)"
    ],
    icon: Settings
  },
  {
    title: "Container hóa ứng dụng",
    slug: "container",
    items: [
      "Kubernetes quản trị (vOKS)",
      "Container Registry riêng",
      "GitOps & rolling deployment"
    ],
    icon: Layers
  },
  {
    title: "Mạng phân phối nội dung",
    slug: "cdn",
    items: [
      "CDN tốc độ cao trong nước",
      "Multi-CDN dự phòng",
      "Tối ưu trải nghiệm UX"
    ],
    icon: Network
  },
  {
    title: "Digital Workplace",
    slug: "mobile-work",
    items: [
      "Cloud PC / DaaS",
      "M365, Email & collaboration",
      "Quản lý thiết bị tập trung"
    ],
    icon: Briefcase
  }
];

const INDUSTRIES_DATA = [
  {
    id: "finance",
    slug: "fintech",
    title: "Tài chính-ngân hàng",
    title_en: "Finance & Banking",
    subtitle: "Thiết kế tối ưu theo đặc thù từng kịch bản vận hành",
    desc: "Hạ tầng tính toán tối ưu, bảo mật đa phòng vệ được may đo chuẩn xác để giải quyết triệt độ bài toán khó nhất của riêng ngành bạn.",
    desc_en: "Tận dụng giải pháp hạ tầng điện toán đám mây cấp độ cao để đảm bảo tuyệt mật quy trình giao dịch số và nâng cao độ an toàn dữ liệu khách hàng.",
    bullets: [
      "Hạ tầng Cloud an toàn phục vụ giao dịch lớn",
      "Đạt chứng chỉ uy tín PCI DSS Level 1 bảo mật tối đa toàn cầu",
      "Tuân thủ Thông tư 09/2020/TT-NHNN của Ngân hàng Nhà nước"
    ],
    bgGradient: "from-black/90 via-black/60 to-transparent",
    bgPattern: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(13, 18, 34, 0.82)",
    stories: ["BIDV Card", "VietinBank Cloud"],
    products: ["Sovereign Cloud", "High-Perf DB"],
    bottomIcon: Wallet,
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "Thương mại điện tử",
    title_en: "E-Commerce Web",
    subtitle: "Thiết kế tối ưu theo đặc thù từng kịch bản vận hành",
    desc: "Tự động giãn nở tài nguyên, tối ưu hóa tốc độ tải trang giúp doanh nghiệp bứt phá doanh số mùa Mega Sale mượt mà không độ trễ.",
    desc_en: "Nâng cấp mượt mà tốc độ phản hồi trang web và tối ưu hóa thời gian tải dưới 1 giây để thu hút khách hàng và bảo vệ tỷ lệ chuyển đổi đơn hàng.",
    bullets: [
      "Tự động giãn nở tài nguyên, tối ưu hóa tốc độ tải trang",
      "Chịu tải cao, vượt bão truy cập mùa Mega Sale mượt mà",
      "Hệ thống Auto-scaling thông minh tự tăng giảm tài nguyên chuẩn xác"
    ],
    bgGradient: "from-black/90 via-black/60 to-transparent",
    bgPattern: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(16, 17, 26, 0.82)",
    stories: ["MyViettel Sale", "Voso E-Store"],
    products: ["Auto Scaling K8s", "Viettel Premium CDN"],
    bottomIcon: ShoppingBag,
  },
  {
    id: "healthcare",
    slug: "healthtech",
    title: "Y tế-bệnh viện",
    title_en: "Digital Healthcare",
    subtitle: "Thiết kế tối ưu theo đặc thù từng kịch bản vận hành",
    desc: "Lưu giữ hồ sơ bệnh án, chẩn đoán hình ảnh thông suốt với kiến trúc Cloud biệt lập, an toàn bảo mật thông tin tuyệt đối.",
    desc_en: "Vận hành hoàn hảo dòng dữ liệu chẩn đoán hình ảnh dung lượng lớn trên các kết nối truyền dẫn an toàn và bảo mật thông tin theo tiêu chuẩn quốc tế.",
    bullets: [
      "Lưu giữ hồ sơ bệnh án, chẩn đoán hình ảnh thông suốt",
      "Lưu trữ hồ sơ EHR điện tử & hệ thống hình ảnh PACS dung lượng lớn",
      "Kiến trúc Cloud biệt lập, tuân thủ chặt chẽ tiêu chuẩn của Bộ Y tế"
    ],
    bgGradient: "from-black/90 via-black/60 to-transparent",
    bgPattern: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(2, 31, 24, 0.85)",
    stories: ["National EHR DB", "Smart Hospital"],
    products: ["Dedicated Cloud", "Secure Storage"],
    bottomIcon: HeartPulse,
  },
  {
    id: "education",
    slug: "edtech",
    title: "Giáo dục",
    title_en: "EdTech Platform",
    subtitle: "Thiết kế tối ưu theo đặc thù từng kịch bản vận hành",
    desc: "Hạ tầng trực tuyến vững chãi nâng bước tri thức Việt với sức tải băng thông cực rộng, đón nhận hàng triệu học sinh đồng thời.",
    desc_en: "Tạo dựng những lớp học tương tự trực quan thời gian thực với chất lượng hình ảnh sắc nét, đồng thời mã hóa thông tin chống sao chép tài nguyên giảng dạy.",
    bullets: [
      "Hạ tầng trực tuyến trực quan tương tác thực tế ảo VR",
      "Nền tảng lớp học ảo Live-class tương tác HD không độ trễ nghẽn mạng",
      "Sức tải băng thông cực rộng, đón nhận hàng triệu học sinh cùng lúc"
    ],
    bgGradient: "from-black/90 via-black/60 to-transparent",
    bgPattern: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(17, 14, 32, 0.85)",
    stories: ["Viettel Study", "K12 Online National"],
    products: ["Live-Stream CDN", "High-Bandwidth VM"],
    bottomIcon: GraduationCap,
  },
  {
    id: "government",
    slug: "digital-gov",
    title: "Chính phủ số",
    title_en: "Smart Government",
    subtitle: "Thiết kế tối ưu theo đặc thù từng kịch bản vận hành",
    desc: "Sovereign Cloud bảo đảm chủ quyền dữ liệu quốc gia tuyệt đối, cách ly vật lý hoàn toàn tùy chọn tuyệt mật an toàn.",
    desc_en: "Đảm bảo tối mật thông tin hành chính công quốc gia thông qua giải pháp mây cách ly vật lý hoàn toàn, đáp ứng nghiêm ngặt bộ quy tắc an ninh nội bộ.",
    bullets: [
      "Sovereign Cloud bảo đảm chủ quyền dữ liệu quốc gia",
      "Đáp ứng nghiêm ngặt Luật An ninh mạng & Nghị định 13 bảo vệ dữ liệu",
      "Hạ tầng Cloud cách ly vật lý hoàn toàn tùy chọn tuyệt mật an toàn"
    ],
    bgGradient: "from-black/90 via-black/60 to-transparent",
    bgPattern: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(8, 13, 25, 0.85)",
    stories: ["National Identity", "Command Command SOC"],
    products: ["Sovereign Private", "SOC Cyber Security"],
    bottomIcon: Landmark,
  }
];

const DATA_CENTERS = [
  {
    id: 'overview',
    name: 'Hệ thống TTDL',
    tag: 'NATIONWIDE CLOUD MESH',
    desc: 'Viettel IDC hiện sở hữu hệ thống phòng máy trung tâm dữ liệu lớn nhất Việt Nam, được chuẩn hóa đồng bộ theo tiêu chuẩn cao cấp quốc tế Rated 3 - TIA 942.',
    pue: '1.40 (Trung bình)',
    area: '57,250 m²',
    racks: '10,000+ Racks',
    standards: ['Rated 3 TIA-942', 'ISO 27001', 'ISO 27017', 'PCI-DSS v4.0', 'SOC 2 Type II'],
    x: 188,
    y: 130,
    city: 'Toàn quốc',
    image: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1783680776/dc4_htko3y.jpg',
    detailSpecs: {
      power: 'Hạ tầng nguồn điện song hành quốc gia kết hợp hệ thống điện dự phòng độc lập UPS 2N+1',
      cooling: 'Công nghệ làm lạnh Chilled Water tuần hoàn thông minh, tối ưu hóa chỉ số PUE hàng đầu Đông Nam Á',
      security: 'Kiểm soát an ninh 6 lớp nghiêm ngặt kết hợp Trung tâm điều vận giám sát độc lập SOC trực 24/7/365',
    }
  },
  {
    id: 'hl1',
    name: 'TTDL Hòa Lạc 1',
    tag: 'RATED-III STANDARD',
    desc: 'Data Center tại Hòa Lạc, hỗ trợ colocation linh hoạt, vận hành với hiệu suất năng lượng tối ưu, hạ tầng nguồn dự phòng và kết nối trung lập cho doanh nghiệp.',
    pue: '1.4',
    area: '6,000 m²',
    racks: '8kW/rack',
    standards: ['ISO 9001', 'ISO 20000-1', 'ISO 22301', 'ISO 27001', 'PCI DSS'],
    x: 188,
    y: 125,
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Công suất nguồn 3.3MW với hạ tầng nguồn dự phòng tối ưu',
      cooling: 'Hệ thống làm mát hiện đại đạt chỉ số PUE 1.4',
      security: 'Hệ thống bảo vệ nghiêm ngặt cùng chứng chỉ bảo mật quốc tế',
    }
  },
  {
    id: 'hl2',
    name: 'TTDL Hòa Lạc 2',
    tag: 'RATED-III STANDARD',
    desc: 'Data Center Hòa Lạc 2 được thiết kế cho nhu cầu colocation và hạ tầng CNTT doanh nghiệp, với hệ thống nguồn ổn định, kết nối linh hoạt và tiêu chuẩn vận hành quốc tế.',
    pue: '1.5',
    area: '2,500 m²',
    racks: '4.5kW/rack',
    standards: ['ISO 9001', 'ISO 20000-1', 'ISO 22301', 'ISO 27001', 'PCI DSS'],
    x: 188,
    y: 125,
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Công suất nguồn 2.4MW đảm bảo vận hành an toàn liên tục',
      cooling: 'Giải pháp làm mát chính xác, PUE đạt mức 1.5 ổn định',
      security: 'Chứng nhận bảo mật chuẩn quốc tế vận hành nghiêm ngặt',
    }
  },
  {
    id: 'hl3',
    name: 'TTDL Hòa Lạc 3',
    tag: 'RATED-III STANDARD',
    desc: 'Data Center thế hệ mới tại Hòa Lạc, tối ưu cho cloud, colocation và hệ thống CNTT trọng yếu với công suất lớn, hiệu quả năng lượng cao và hệ sinh thái kết nối trung lập.',
    pue: '1.4',
    area: '6,500 m²',
    racks: '4–5kW/rack',
    standards: ['TVRA', 'SOC 2', 'ISO 14064', 'ISO 27001', 'PCI DSS'],
    x: 188,
    y: 130,
    city: 'Hà Nội',
    image: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201714/banner2_eiuoqr.png',
    detailSpecs: {
      power: 'Tổng công suất nguồn cực lớn lên tới 30MW',
      cooling: 'Vận hành tối ưu năng lượng với PUE 1.4 chuẩn xanh',
      security: 'Đáp ứng đánh giá rủi ro TVRA và tiêu chuẩn bảo mật SOC 2',
    }
  },
  {
    id: 'pv',
    name: 'TTDL Pháp Vân',
    tag: 'URBAN INTERCONNECTION',
    desc: 'Data Center tại Pháp Vân, phù hợp cho colocation và hạ tầng CNTT doanh nghiệp với diện tích lớn, kết nối đa nhà mạng, vận hành 24/7 và hệ thống dự phòng an toàn.',
    pue: '1.5',
    area: '9,500 m²',
    racks: '3kW/rack',
    standards: ['ISO 9001', 'ISO 20000-1', 'ISO 22301', 'ISO 27001', 'PCI DSS'],
    x: 195,
    y: 138,
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Công suất nguồn 2.9MW kết hợp nguồn dự phòng tin cậy',
      cooling: 'Giải pháp điều hòa tối ưu hóa nhiệt độ, PUE 1.5',
      security: 'Hệ thống giám sát đa lớp vận hành ổn định 24/7/365',
    }
  },
  {
    id: 'dn',
    name: 'TTDL Đà Nẵng',
    tag: 'REGIONAL GREEN NODE',
    desc: 'Bảo bối hạ tầng kỹ thuật đắc thủy miền Trung Việt Nam, thiết kế kháng chấn bão nhiệt đới cấp độ siêu quy chuẩn và kết nối trực tiếp đến các nhà mạng cáp quang biển.',
    pue: '1.45',
    area: '3,200 m²',
    racks: '3-4kW/rack',
    standards: ['ISO 9001', 'ISO 27001', 'PCI DSS', 'SOC 1', 'SOC 2 Type II'],
    x: 244,
    y: 285,
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22530dd78a?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Công suất nguồn 2.5MW từ đường điện kép song hành',
      cooling: 'Hệ thống Chilled Water điều hòa không khí tối ưu',
      security: 'An ninh 4 lớp bảo mật và camera kiểm soát trực SOC 24/7',
    }
  },
  {
    id: 'hht1',
    name: 'TTDL Hoàng Hoa Thám 1',
    tag: 'METROPOLITAN CLOUD NODE',
    desc: 'Trọng điểm hạ tầng thông tin nội đô tại TP. Hồ Chí Minh, phân khu 1 sở hữu vị trí kết nối trực tiếp và độ trễ siêu thấp đến các trung tâm giao dịch lớn.',
    pue: '1.44',
    area: '2,800 m²',
    racks: '4–5kW/rack',
    standards: ['TVRA', 'SOC 2', 'ISO 14064', 'ISO 27001', 'PCI DSS'],
    x: 212,
    y: 442,
    city: 'TP. HCM',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Hệ thống điện an toàn cao UPS 2N kết hợp máy phát điện dự phòng độc lập',
      cooling: 'Kiểm soát nhiệt độ chính xác với hiệu năng PUE 1.44',
      security: 'Bảo mật đa lớp sinh trắc học và quản lý truy cập điện tử tập trung',
    }
  },
  {
    id: 'hht2',
    name: 'TTDL Hoàng Hoa Thám 2',
    tag: 'METROPOLITAN CLOUD NODE',
    desc: 'Phân khu 2 của cụm TTDL Hoàng Hoa Thám, tăng cường hạ tầng điện lưới kép và mở rộng thêm không gian tủ rack cho doanh nghiệp vừa và lớn.',
    pue: '1.43',
    area: '2,500 m²',
    racks: '3.5kW/rack',
    standards: ['ISO 9001', 'ISO 20000-1', 'ISO 22301', 'ISO 27001', 'PCI DSS'],
    x: 213,
    y: 443,
    city: 'TP. HCM',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Công suất nguồn 1.5MW với trạm điện trung thế nội khu dự phòng N+1',
      cooling: 'Hệ thống điều hòa tối ưu hơi nước giảm tiêu thụ điện',
      security: 'Zone kiểm soát cửa từ đa tầng và camera AI giám sát liên tục',
    }
  },
  {
    id: 'hht3',
    name: 'TTDL Hoàng Hoa Thám 3',
    tag: 'METROPOLITAN CLOUD NODE',
    desc: 'Mảnh ghép công nghệ hoàn hảo trong lòng TP. HCM, TTDL Hoàng Hoa Thám 3 tiên phong áp dụng hệ thống pin mặt trời phụ trợ kết hợp giải pháp Green DC.',
    pue: '1.42',
    area: '3,000 m²',
    racks: '4.5kW/rack',
    standards: ['TVRA', 'SOC 2', 'ISO 14064', 'ISO 27001', 'PCI DSS'],
    x: 214,
    y: 444,
    city: 'TP. HCM',
    image: 'https://images.unsplash.com/photo-1551703599-6b3dbb57b235?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Nguồn điện xanh phụ trợ từ pin mặt trời áp mái công suất cao',
      cooling: 'Tường làm mát hấp thụ nhiệt giảm chỉ số PUE tối ưu',
      security: 'Bảo mật sinh trắc học vân tay và võng mạc độ an toàn cao nhất',
    }
  },
  {
    id: 'bd',
    name: 'TTDL Bình Dương',
    tag: 'HYPERSCALE TECH HUB',
    desc: 'Data Center quy mô lớn tại Bình Dương, được thiết kế cho colocation, hạ tầng cloud và hệ thống doanh nghiệp với công suất cao, không gian mở rộng và kết nối đa tuyến.',
    pue: '6.5MW (Nguồn)',
    area: '10,000 m²',
    racks: '3.5kW/rack',
    standards: ['ISO 9001', 'ISO 20000-1', 'ISO 22301', 'ISO 27001', 'PCI DSS'],
    x: 210,
    y: 445,
    city: 'Bình Dương (HCM)',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Công suất nguồn 6.5MW with tải IT lớn lên tới 4MW',
      cooling: 'Hệ thống Chilled Water làm mát hiệu năng tối ưu',
      security: 'Bảo mật vật lý đa lớp tiêu chuẩn trung tâm dữ liệu thế hệ mới',
    }
  }
];

const DATACENTER_VIEWS = [
  {
    id: 'overview',
    name: 'Hệ thống TTDL',
    tag: 'TỔNG QUAN HỆ THỐNG',
    desc: 'Mạng lưới hạ tầng điện toán đám mây thế hệ mới của Viettel IDC, phân bổ chiến lược tại Bắc - Trung - Nam, đáp ứng tiêu chuẩn khắt khe nhất toàn cầu.',
    image: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1783680776/dc4_htko3y.jpg',
    type: 'overview',
    thumbnail: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1783680776/dc4_htko3y.jpg',
    metrics: [
      { label: 'Quy mô facility', value: '57,250 m²' },
      { label: 'Công suất nguồn', value: '350 MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.40' },
      { label: 'Mật độ công suất rack', value: '10,000+ Racks' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N / N+2' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200 - VESDA' }
    ],
    subText: 'ISO 9001 · ISO 27001 · ISO 27017 · PCI DSS · SOC 2 Type II'
  },
  {
    id: 'hl1',
    name: 'TTDL Hòa Lạc 1',
    tag: 'TTDL HÒA LẠC 1',
    desc: 'Data Center tại Hòa Lạc, hỗ trợ colocation linh hoạt, vận hành với hiệu suất năng lượng tối ưu, hạ tầng nguồn dự phòng và kết nối trung lập cho doanh nghiệp.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { label: 'Quy mô facility', value: '6,000 m²' },
      { label: 'Công suất nguồn', value: '3.3MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.4' },
      { label: 'Mật độ công suất rack', value: '8kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200' }
    ],
    subText: 'ISO 9001 · ISO 20000-1 · ISO 22301 · ISO 27001 · ISO 27017 · ISO 27018 · PCI DSS'
  },
  {
    id: 'hl2',
    name: 'TTDL Hòa Lạc 2',
    tag: 'TTDL HÒA LẠC 2',
    desc: 'Data Center Hòa Lạc 2 được thiết kế cho nhu cầu colocation và hạ tầng CNTT doanh nghiệp, với hệ thống nguồn ổn định, kết nối linh hoạt và tiêu chuẩn vận hành quốc tế.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { label: 'Quy mô facility', value: '2,500 m²' },
      { label: 'Công suất nguồn', value: '2.4MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.5' },
      { label: 'Mật độ công suất rack', value: '4.5kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200' }
    ],
    subText: 'ISO 9001 · ISO 20000-1 · ISO 22301 · ISO 27001 · ISO 27017 · ISO 27018 · PCI DSS'
  },
  {
    id: 'hl3',
    name: 'TTDL Hòa Lạc 3',
    tag: 'TTDL HÒA LẠC 3',
    desc: 'Data Center thế hệ mới tại Hòa Lạc, được thiết kế cho colocation, cloud và hệ thống CNTT trọng yếu với công suất lớn, hiệu quả năng lượng tối ưu, kiến trúc dự phòng cao và hệ sinh thái kết nối trung lập.',
    image: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201714/banner2_eiuoqr.png',
    type: 'dc',
    thumbnail: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201714/banner2_eiuoqr.png',
    metrics: [
      { label: 'Quy mô facility', value: '6,500 m²' },
      { label: 'Công suất nguồn', value: '30MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.4' },
      { label: 'Mật độ công suất rack', value: '4–5kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N / N+2' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200 - VESDA' }
    ],
    subText: 'ISO 27001 · ISO 27017 · ISO 27018 · PCI DSS · SOC 2 · TVRA · ISO 14064'
  },
  {
    id: 'pv',
    name: 'TTDL Pháp Vân',
    tag: 'TTDL PHÁP VÂN',
    desc: 'Data Center tại Pháp Vân, phù hợp cho colocation và hạ tầng CNTT doanh nghiệp với diện tích lớn, kết nối đa nhà mạng, vận hành 24/7 và hệ thống dự phòng an toàn.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { label: 'Quy mô facility', value: '9,500 m²' },
      { label: 'Công suất nguồn', value: '2.9MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.5' },
      { label: 'Mật độ công suất rack', value: '3kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200' }
    ],
    subText: 'ISO 9001 · ISO 20000-1 · ISO 22301 · ISO 27001 · ISO 27017 · ISO 27018 · PCI DSS'
  },
  {
    id: 'dn',
    name: 'TTDL Đà Nẵng',
    tag: 'TTDL ĐÀ NẴNG',
    desc: 'Bảo bối hạ tầng kỹ thuật đắc thủy miền Trung Việt Nam, thiết kế kháng chấn bão nhiệt đới cấp độ siêu quy chuẩn và kết nối trực tiếp đến các nhà mạng cáp quang biển.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22530dd78a?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22530dd78a?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { label: 'Quy mô facility', value: '3,200 m²' },
      { label: 'Công suất nguồn', value: '2.5MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.45' },
      { label: 'Mật độ công suất rack', value: '3-4kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200' }
    ],
    subText: 'ISO 9001 · ISO 27001 · PCI DSS · SOC 1 · SOC 2 Type II'
  },
  {
    id: 'hht1',
    name: 'TTDL Hoàng Hoa Thám 1',
    tag: 'TTDL HOÀNG HOA THÁM 1',
    desc: 'Trọng điểm hạ tầng thông tin nội đô tại TP. Hồ Chí Minh, phân khu 1 sở hữu vị trí kết nối trực tiếp và độ trễ siêu thấp đến các trung tâm giao dịch lớn.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { label: 'Quy mô facility', value: '2,800 m²' },
      { label: 'Công suất nguồn', value: '1.2MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.48' },
      { label: 'Mật độ công suất rack', value: '4–5kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200' }
    ],
    subText: 'TVRA · SOC 2 · ISO 14064 · ISO 27001 · ISO 27017 · ISO 27018 · PCI DSS'
  },
  {
    id: 'hht2',
    name: 'TTDL Hoàng Hoa Thám 2',
    tag: 'TTDL HOÀNG HOA THÁM 2',
    desc: 'Phân khu 2 của cụm TTDL Hoàng Hoa Thám, tăng cường hạ tầng điện lưới kép và mở rộng thêm không gian tủ rack cho doanh nghiệp vừa và lớn.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { label: 'Quy mô facility', value: '2,500 m²' },
      { label: 'Công suất nguồn', value: '1.5MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.43' },
      { label: 'Mật độ công suất rack', value: '3.5kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200' }
    ],
    subText: 'ISO 9001 · ISO 20000-1 · ISO 22301 · ISO 27001 · ISO 27017 · ISO 27018 · PCI DSS'
  },
  {
    id: 'hht3',
    name: 'TTDL Hoàng Hoa Thám 3',
    tag: 'TTDL HOÀNG HOA THÁM 3',
    desc: 'Mảnh ghép công nghệ hoàn hảo trong lòng TP. HCM, TTDL Hoàng Hoa Thám 3 tiên phong áp dụng hệ thống pin mặt trời phụ trợ kết hợp giải pháp Green DC.',
    image: 'https://images.unsplash.com/photo-1551703599-6b3dbb57b235?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1551703599-6b3dbb57b235?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { label: 'Quy mô facility', value: '3,000 m²' },
      { label: 'Công suất nguồn', value: '1.8MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.42' },
      { label: 'Mật độ công suất rack', value: '4.5kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N / N+2' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200 - VESDA' }
    ],
    subText: 'TVRA · SOC 2 · ISO 14064 · ISO 27001 · ISO 27017 · ISO 27018 · PCI DSS'
  },
  {
    id: 'bd',
    name: 'TTDL Bình Dương',
    tag: 'TTDL BÌNH DƯƠNG',
    desc: 'Data Center quy mô lớn tại Bình Dương, được thiết kế cho colocation, hạ tầng cloud và hệ thống doanh nghiệp với công suất cao, không gian mở rộng và kết nối đa tuyến.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { label: 'Quy mô facility', value: '10,000 m²' },
      { label: 'Công suất nguồn', value: '6.5MW' },
      { label: 'Hiệu suất năng lượng', value: 'PUE 1.40' },
      { label: 'Mật độ công suất rack', value: '3.5kW/rack' },
      { label: 'Dự phòng nguồn & làm mát', value: 'N+1 / 2N / N+2' },
      { label: 'Kết nối', value: 'Carrier & Cloud Neutral' },
      { label: 'Tiêu chuẩn Data Center', value: 'Rated III – TIA-942/C' },
      { label: 'An toàn & vận hành', value: '24/7 - FM200 - VESDA' }
    ],
    subText: 'ISO 9001 · ISO 20000-1 · ISO 22301 · ISO 27001 · ISO 27017 · ISO 27018 · PCI DSS'
  }
];

const PARTNER_CATEGORIES = [
  { id: 'all', name: 'Tất cả đối tác' },
  { id: 'cloud', name: 'Cloud & Ảo hóa' },
  { id: 'hardware', name: 'Phần cứng & Thiết bị' },
  { id: 'security', name: 'An ninh & Bảo mật' }
];

const PARTNERS = [
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'cloud',
    role: 'Gold Certified Partner',
    desc: 'Hợp tác cung cấp các giải pháp điện toán đám mây lai (Hybrid Cloud), Azure Stack và dịch vụ năng suất văn phòng hiện đại Office 365.',
    logoText: 'MS',
    logoBg: 'bg-blue-50 text-blue-600',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    icon: Cloud
  },
  {
    id: 'vmware',
    name: 'VMware by Broadcom',
    category: 'cloud',
    role: 'Principal Partner',
    desc: 'Nền tảng ảo hóa máy chủ cao cấp và công nghệ mạng ảo hóa chuyển mạch thông minh, làm xương sống cho hệ thống Viettel Cloud.',
    logoText: 'VM',
    logoBg: 'bg-orange-50 text-orange-600',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Vmware.svg',
    icon: Layers
  },
  {
    id: 'cisco',
    name: 'Cisco Systems',
    category: 'security',
    role: 'Strategic Technology Partner',
    desc: 'Cung cấp hệ thống chuyển mạch lõi SDN tốc độ cao và các thiết bị định tuyến, tường lửa thế hệ mới phân tán đa vùng bảo mật.',
    logoText: 'CS',
    logoBg: 'bg-cyan-50 text-cyan-600',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
    icon: Network
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'cloud',
    role: 'Advanced Technology Partner',
    desc: 'Hỗ trợ kết nối AWS Direct Connect trực tiếp đến trung tâm dữ liệu Viettel IDC, tối ưu chi phí truyền tải và độ trễ đường truyền.',
    logoText: 'AWS',
    logoBg: 'bg-amber-50 text-amber-700',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    icon: Globe
  },
  {
    id: 'intel',
    name: 'Intel Corporation',
    category: 'hardware',
    role: 'Strategic Silicon Partner',
    desc: 'Tích hợp các dòng vi xử lý Intel Xeon Scalable thế hệ mới nhất và công nghệ tăng tốc AI phần cứng vượt trội tại các máy chủ đám mây.',
    logoText: 'INT',
    logoBg: 'bg-indigo-50 text-indigo-600',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Intel_logo_%282020%29.svg',
    icon: Cpu
  },
  {
    id: 'dell',
    name: 'Dell Technologies',
    category: 'hardware',
    role: 'Titanium Partner',
    desc: 'Đồng hành cung cấp hệ thống máy chủ vật lý độ tin cậy cao, tủ lưu trữ SAN băng thông siêu tốc và giải pháp sao lưu hợp nhất.',
    logoText: 'DELL',
    logoBg: 'bg-sky-50 text-sky-600',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg',
    icon: Database
  },
  {
    id: 'fortinet',
    name: 'Fortinet',
    category: 'security',
    role: 'Authorized Fabric Partner',
    desc: 'Tích hợp tường lửa Next-Generation Firewall (NGFW) và dịch vụ lọc mã độc, chống tấn công DDoS chủ động từ cấp độ mạng viễn thông.',
    logoText: 'FT',
    logoBg: 'bg-red-50 text-red-600',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Fortinet_logo.svg',
    icon: Shield
  },
  {
    id: 'veeam',
    name: 'Veeam Software',
    category: 'cloud',
    role: 'Platinum Cloud & Service Provider',
    desc: 'Cung cấp giải pháp sao lưu bất biến (Immutable Backup) chống ghi đè dữ liệu, đảm bảo phục hồi thảm họa trước tấn công Ransomware.',
    logoText: 'VE',
    logoBg: 'bg-emerald-50 text-emerald-600',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Veeam_Software_logo.svg',
    icon: FileCheck
  }
];

const CERTIFICATIONS_DATA = [
  {
    title: "Tiêu chuẩn Data Center",
    tag: "ANSI/TIA-942 R3",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/TIA_logo.svg/320px-TIA_logo.svg.png",
    desc: "Đạt chuẩn quốc tế cao nhất về thiết kế, vận hành hạ tầng trung tâm dữ liệu dự phòng kép bảo mật."
  },
  {
    title: "An toàn thông tin",
    tag: "ISO 27001",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/ISO_Logotype.svg/320px-ISO_Logotype.svg.png",
    desc: "Hệ thống quản lý bảo mật thông tin toàn diện và nghiêm ngặt nhất thế giới."
  },
  {
    title: "Bảo mật thanh toán",
    tag: "PCI-DSS",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/PCI-DSS-logo.png/320px-PCI-DSS-logo.png",
    desc: "Đảm bảo an toàn dữ liệu và tuân thủ tuyệt đối cho các giao dịch tài chính, thanh toán số."
  },
  {
    title: "Quản lý năng lượng",
    tag: "ISO 50001",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/ISO_Logotype.svg/320px-ISO_Logotype.svg.png",
    desc: "Hệ thống quản lý năng lượng xanh tối ưu, giảm thiểu tối đa khí thải các-bon ra môi trường."
  },
  {
    title: "Quản lý chất lượng",
    tag: "ISO 9001",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Logo_ISO_9001.png/320px-Logo_ISO_9001.png",
    desc: "Kiểm soát quy trình cung cấp dịch vụ xuất sắc, đảm bảo sự hài lòng tuyệt đối của khách hàng."
  },
  {
    title: "Dịch vụ CNTT",
    tag: "ISO 20000",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/ISO_Logotype.svg/320px-ISO_Logotype.svg.png",
    desc: "Tiêu chuẩn quản lý chất lượng dịch vụ CNTT chuẩn xác và nâng cao chất lượng liên tục."
  },
  {
    title: "Bảo mật đám mây",
    tag: "ISO 27017",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/ISO_Logotype.svg/320px-ISO_Logotype.svg.png",
    desc: "Xác thực bảo mật hạ tầng Cloud và phòng tránh mọi nguy cơ mất an toàn thông tin đám mây."
  },
  {
    title: "Bảo vệ thông tin cá nhân",
    tag: "ISO 27018",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/ISO_Logotype.svg/320px-ISO_Logotype.svg.png",
    desc: "Hành lang pháp lý chuẩn hóa bảo mật thông tin cá nhân trên môi trường public cloud."
  },
  {
    title: "Kinh doanh liên tục",
    tag: "ISO 22301",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/ISO_Logotype.svg/320px-ISO_Logotype.svg.png",
    desc: "Khôi phục thảm họa, đảm bảo hoạt động kinh doanh diễn ra xuyên suốt không gián đoạn."
  },
  {
    title: "Bảo mật y tế",
    tag: "HIPAA COMPLIANT",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/HIPAA_Compliance_Logo.svg/320px-HIPAA_Compliance_Logo.svg.png",
    desc: "Tiêu chuẩn khắt khe về bảo vệ thông tin sức khỏe và hồ sơ bệnh án điện tử số hóa."
  }
];

const AWARDS_DATA = [
  {
    title: "Nhà cung cấp dịch vụ Cloud",
    tag: "FROST & SULLIVAN",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Frost_and_Sullivan_logo.svg/320px-Frost_and_Sullivan_logo.svg.png",
    desc: "Được vinh danh là Nhà cung cấp dịch vụ Đám mây xuất sắc nhất năm tại Việt Nam."
  },
  {
    title: "Doanh nghiệp Chuyển đổi số",
    tag: "VIETNAM DIGITAL AWARDS",
    image: "https://vdca.org.vn/wp-content/uploads/2021/04/vda.png",
    desc: "Được ghi nhận là đơn vị tiên phong kiến tạo các nền tảng chuyển đổi số quốc gia."
  },
  {
    title: "Dịch vụ Cloud xuất sắc",
    tag: "SAO KHUÊ 2023",
    image: "https://vinasa.org.vn/wp-content/uploads/2020/04/Logo-Sao-Khue.png",
    desc: "Sản phẩm Viettel Cloud Server xuất sắc đạt điểm tuyệt đối từ hội đồng bình chọn."
  },
  {
    title: "Giải Kinh doanh quốc tế",
    tag: "STEVIE AWARDS",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Stevie_Awards_Logo.svg/320px-Stevie_Awards_Logo.svg.png",
    desc: "Đạt giải vàng Stevie Awards cho hệ thống hạ tầng trung tâm dữ liệu hiện đại Hòa Lạc III."
  },
  {
    title: "DN Công nghệ số xuất sắc",
    tag: "BỘ THÔNG TIN & TRUYỀN THÔNG",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/National_Emblem_of_Vietnam.svg/320px-National_Emblem_of_Vietnam.svg.png",
    desc: "Bằng khen đơn vị có thành tích xuất sắc đóng góp vào sự phát triển công nghệ nước nhà."
  },
  {
    title: "Top 10 Doanh nghiệp CNTT",
    tag: "VINASA",
    image: "https://vinasa.org.vn/wp-content/uploads/2020/03/Logo-Vinasa.png",
    desc: "Liên tiếp lọt top doanh nghiệp cung cấp hạ tầng số và đám mây lớn nhất Việt Nam."
  },
  {
    title: "Đối tác Đám mây Sáng tạo",
    tag: "QUALCOMM ACCELERATE",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Qualcomm_logo.svg/320px-Qualcomm_logo.svg.png",
    desc: "Giải thưởng hợp tác quốc tế đột phá về tăng tốc trí tuệ nhân tạo trên đám mây."
  },
  {
    title: "Thương hiệu Quốc gia VN",
    tag: "HỘI ĐỒNG THƯƠNG HIỆU",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Vietnam_Value_Logo.svg/320px-Vietnam_Value_Logo.svg.png",
    desc: "Thương hiệu quốc gia duy nhất trong lĩnh vực Trung tâm dữ liệu và Điện toán đám mây."
  },
  {
    title: "Sản phẩm Công nghệ xanh",
    tag: "VIETNAM GREEN IT",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Leaf_icon_1.svg/320px-Leaf_icon_1.svg.png",
    desc: "Chứng nhận nỗ lực tối ưu năng lượng và bảo vệ môi trường của các TTDL thế hệ mới."
  },
  {
    title: "An ninh thông tin xuất sắc",
    tag: "CYBER SECURITY AWARD",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Open-source-security-logo.svg/320px-Open-source-security-logo.svg.png",
    desc: "Nhà cung cấp giải pháp bảo mật đám mây và phòng chống tấn công DDoS tốt nhất."
  }
];

function SafeCertImage({ src, alt, tag }: { src: string; alt: string; tag: string }) {
  const normTag = tag.toUpperCase().trim();

  // 1. ISO 27001
  if (normTag === "ISO 27001") {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F0F5FF"/>
          <circle cx="24" cy="24" r="18" stroke="#1E3A8A" strokeWidth="2.5"/>
          <rect x="11" y="19" width="26" height="7" rx="1.5" fill="#1E3A8A"/>
          <text x="24" y="24.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">ISO</text>
          <text x="24" y="34.5" fill="#1E3A8A" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">27001</text>
        </svg>
      </div>
    );
  }

  // 2. ISO 9001
  if (normTag === "ISO 9001") {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#EFF6FF"/>
          <circle cx="24" cy="24" r="18" stroke="#00529B" strokeWidth="2.5"/>
          <rect x="11" y="19" width="26" height="7" rx="1.5" fill="#00529B"/>
          <text x="24" y="24.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">ISO</text>
          <text x="24" y="34.5" fill="#00529B" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">9001</text>
        </svg>
      </div>
    );
  }

  // 3. ISO 50001
  if (normTag === "ISO 50001") {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F0FDF4"/>
          <circle cx="24" cy="24" r="18" stroke="#15803D" strokeWidth="2.5"/>
          <rect x="11" y="19" width="26" height="7" rx="1.5" fill="#15803D"/>
          <text x="24" y="24.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">ISO</text>
          <text x="24" y="34.5" fill="#15803D" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">50001</text>
        </svg>
      </div>
    );
  }

  // 4. ISO 20000
  if (normTag === "ISO 20000") {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F8FAFC"/>
          <circle cx="24" cy="24" r="18" stroke="#334155" strokeWidth="2.5"/>
          <rect x="11" y="19" width="26" height="7" rx="1.5" fill="#334155"/>
          <text x="24" y="24.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">ISO</text>
          <text x="24" y="34.5" fill="#334155" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">20000</text>
        </svg>
      </div>
    );
  }

  // 5. ISO 27017
  if (normTag === "ISO 27017") {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#ECFDF5"/>
          <circle cx="24" cy="24" r="18" stroke="#047857" strokeWidth="2.5"/>
          <rect x="11" y="19" width="26" height="7" rx="1.5" fill="#047857"/>
          <text x="24" y="24.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">ISO</text>
          <text x="24" y="34.5" fill="#047857" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">27017</text>
        </svg>
      </div>
    );
  }

  // 6. ISO 27018
  if (normTag === "ISO 27018") {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#FAF5FF"/>
          <circle cx="24" cy="24" r="18" stroke="#6D28D9" strokeWidth="2.5"/>
          <rect x="11" y="19" width="26" height="7" rx="1.5" fill="#6D28D9"/>
          <text x="24" y="24.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">ISO</text>
          <text x="24" y="34.5" fill="#6D28D9" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">27018</text>
        </svg>
      </div>
    );
  }

  // 7. ISO 22301
  if (normTag === "ISO 22301") {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#FFFBEB"/>
          <circle cx="24" cy="24" r="18" stroke="#B45309" strokeWidth="2.5"/>
          <rect x="11" y="19" width="26" height="7" rx="1.5" fill="#B45309"/>
          <text x="24" y="24.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">ISO</text>
          <text x="24" y="34.5" fill="#B45309" fontSize="6" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">22301</text>
        </svg>
      </div>
    );
  }

  // 8. ANSI/TIA-942 R3
  if (normTag.includes("TIA-942") || normTag.includes("TIA 942")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F0F9FF"/>
          <path d="M12 14h24v4H12zM12 22h24v4H12zM12 30h24v4H12z" fill="#0284C7"/>
          <circle cx="16" cy="16" r="1" fill="#FFFFFF"/>
          <circle cx="16" cy="24" r="1" fill="#FFFFFF"/>
          <circle cx="16" cy="32" r="1" fill="#FFFFFF"/>
          <text x="32" y="17" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">942</text>
          <text x="32" y="25" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">TIA</text>
          <text x="32" y="33" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">R3</text>
          <rect x="6" y="38" width="36" height="6" rx="1" fill="#0369A1"/>
          <text x="24" y="42.5" fill="#FFFFFF" fontSize="3.5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">ANSI/TIA-942</text>
        </svg>
      </div>
    );
  }

  // 9. PCI-DSS
  if (normTag.includes("PCI")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#FEF2F2"/>
          <rect x="8" y="20" width="32" height="20" rx="3" fill="#0F172A"/>
          <path d="M16 20v-6a8 8 0 1116 0v6" stroke="#475569" strokeWidth="3" fill="none"/>
          <circle cx="24" cy="28" r="2.5" fill="#EF4444"/>
          <rect x="22.5" y="29" width="3" height="6" rx="1" fill="#EF4444"/>
          <text x="24" y="39" fill="#FFFFFF" fontSize="5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">PCI-DSS</text>
        </svg>
      </div>
    );
  }

  // 10. HIPAA COMPLIANT
  if (normTag.includes("HIPAA")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F0FDF4"/>
          <path d="M24 6L10 11v13c0 8.2 6 15.8 14 18.6 8-2.8 14-10.4 14-18.6V11L24 6z" fill="#059669"/>
          <path d="M24 14v16M16 22h16" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round"/>
          <text x="24" y="42" fill="#064E3B" fontSize="4.5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">HIPAA</text>
        </svg>
      </div>
    );
  }

  // --- AWARDS ---

  // 11. FROST & SULLIVAN
  if (normTag.includes("FROST") || normTag.includes("SULLIVAN")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#FFFBEB"/>
          <circle cx="24" cy="22" r="14" stroke="#D97706" strokeWidth="1.5" strokeDasharray="2 2"/>
          <path d="M24 10l3.5 7.5 8 1-6 5.5 1.5 8-7-4.5-7 4.5 1.5-8-6-5.5 8-1 3.5-7.5z" fill="#D97706"/>
          <text x="24" y="43" fill="#78350F" fontSize="4.5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">FROST</text>
        </svg>
      </div>
    );
  }

  // 12. VIETNAM DIGITAL AWARDS
  if (normTag.includes("DIGITAL") || normTag.includes("VDA")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#FAF5FF"/>
          <path d="M24 6l14 24H10L24 6z" fill="#6D28D9"/>
          <path d="M24 12l9 15H15l9-15z" fill="#A78BFA"/>
          <circle cx="24" cy="21" r="3.5" fill="#FFFFFF"/>
          <text x="24" y="42" fill="#581C87" fontSize="5.5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">VDA</text>
        </svg>
      </div>
    );
  }

  // 13. SAO KHUÊ
  if (normTag.includes("SAO KHUÊ") || normTag.includes("SAO KHUE")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#FFFDF0"/>
          <path d="M24 5l4.5 10 10.5 1.5-7.5 7 2 10.5-9.5-5-9.5 5 2-10.5-7.5-7 10.5-1.5L24 5z" fill="url(#goldGradient)"/>
          <circle cx="24" cy="22" r="4" fill="#EE0033"/>
          <text x="24" y="43" fill="#EE0033" fontSize="5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">SAO KHUÊ</text>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24"/>
              <stop offset="100%" stopColor="#D97706"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 14. STEVIE AWARDS
  if (normTag.includes("STEVIE")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#FFFBEB"/>
          <path d="M24 15a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM24 18c-3 0-5.5 2.5-5.5 5.5v7h11v-7c0-3-2.5-5.5-5.5-5.5z" fill="#D97706"/>
          <path d="M15 19s4-3 9-3 9 3 9 3M24 30.5v8h-5v2h10v-2h-5v-8" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
          <text x="24" y="45" fill="#78350F" fontSize="5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">STEVIE</text>
        </svg>
      </div>
    );
  }

  // 15. BỘ THÔNG TIN & TRUYỀN THÔNG (Vietnam National Emblem / Red star)
  if (normTag.includes("THÔNG TIN") || normTag.includes("BỘ") || normTag.includes("NATIONAL EMBLEM")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#FEF2F2"/>
          <circle cx="24" cy="24" r="17" fill="#EE0033"/>
          <path d="M24 11l3.5 8.5h9l-7 5.5 2.5 9-8-6-8 6 2.5-9-7-5.5h9L24 11z" fill="#FBBF24"/>
        </svg>
      </div>
    );
  }

  // 16. VINASA
  if (normTag.includes("VINASA")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F0F9FF"/>
          <circle cx="24" cy="22" r="14" stroke="#0284C7" strokeWidth="2"/>
          <path d="M16 22h16M24 14v16" stroke="#0284C7" strokeWidth="1.5"/>
          <circle cx="24" cy="22" r="4.5" fill="#0284C7"/>
          <text x="24" y="43" fill="#0C4A6E" fontSize="5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">VINASA</text>
        </svg>
      </div>
    );
  }

  // 17. QUALCOMM ACCELERATE
  if (normTag.includes("QUALCOMM")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F0F9FF"/>
          <circle cx="24" cy="20" r="11" stroke="#0284C7" strokeWidth="3.5"/>
          <path d="M28 24l8 8" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round"/>
          <text x="24" y="44" fill="#0C4A6E" fontSize="4.5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">QUALCOMM</text>
        </svg>
      </div>
    );
  }

  // 18. HỘI ĐỒNG THƯƠNG HIỆU (Vietnam Value Logo)
  if (normTag.includes("HỘI ĐỒNG") || normTag.includes("THƯƠNG HIỆU") || normTag.includes("VALUE")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#ECFDF5"/>
          <path d="M11 15l13 22 13-22h-6l-7 11-7-11H11z" fill="#10B981"/>
          <path d="M17 9l7 11 7-11h-4l-3 5-3-5h-4z" fill="#059669"/>
          <text x="24" y="44" fill="#064E3B" fontSize="4.5" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">VIETNAM VALUE</text>
        </svg>
      </div>
    );
  }

  // 19. VIETNAM GREEN IT
  if (normTag.includes("GREEN") || normTag.includes("LEAF") || normTag.includes("GREEN IT")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F0FDF4"/>
          <path d="M24 38c7.7 0 14-6.3 14-14 0-11-14-20-14-20S10 13 10 24c0 7.7 6.3 14 14 14z" fill="#22C55E"/>
          <path d="M24 12v26M24 20c4 0 6 2 6 4M24 26c-4 0-6 2-6 4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  // 20. CYBER SECURITY AWARD
  if (normTag.includes("SECURITY") || normTag.includes("CYBER")) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
        <svg viewBox="0 0 48 48" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#F8FAFC"/>
          <path d="M24 6L10 11v13c0 8.2 6 15.8 14 18.6 8-2.8 14-10.4 14-18.6V11L24 6z" fill="#334155"/>
          <circle cx="24" cy="22" r="5" fill="#06B6D4"/>
          <path d="M21 22v4h6v-4" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
    );
  }

  // Default fallback if some other tag is parsed
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-1.5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl shadow-inner text-center`}>
      <Award className="w-5 h-5 mb-0.5 text-gray-500" />
      <span className="text-[9px] font-black tracking-tighter leading-none uppercase truncate max-w-full px-0.5 text-gray-700">
        {tag}
      </span>
    </div>
  );
}

function SafePartnerImage({ src, alt, logoText, logoBg }: { src: string; alt: string; logoText: string; logoBg: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wider shadow-sm select-none border border-current/10 ${logoBg}`}>
        {logoText}
      </div>
    );
  }

  return (
    <Image 
      src={src} 
      alt={alt}
      width={120}
      height={40}
      onError={() => setHasError(true)}
      className="max-w-[85%] max-h-[85%] object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      referrerPolicy="no-referrer"
    />
  );
}

function HomepageContent() {
  const searchParams = useSearchParams();
  const { market, isGlobal, getLocalizedPath } = useMarket();
  
  // Simulated force navigation parameters from Panel Switcher
  const forceServicesOpen = searchParams.get('forceServicesOpen') === 'true';
  const forceMobileDrawer = searchParams.get('forceMobileDrawer') === 'true';

  // Solution Carousel States and Actions
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [activeCertTab, setActiveCertTab] = useState<'cert' | 'award'>('cert');
  const [activePartnerTab, setActivePartnerTab] = useState<string>('all');

  // Consultation form states
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: 'Cloud Computing (Viettel Cloud Server)'
  });
  const [ctaSuccess, setCtaSuccess] = useState(false);

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaForm.name || !ctaForm.email || !ctaForm.phone) {
      return;
    }
    setCtaSuccess(true);
    setTimeout(() => {
      setCtaSuccess(false);
      setCtaForm({
        name: '',
        email: '',
        phone: '',
        solution: 'Cloud Computing (Viettel Cloud Server)'
      });
    }, 4500);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardElement = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = cardElement ? cardElement.offsetWidth + 24 : clientWidth / 2;
      // Range 0 to 1 since there are exactly 2 slides of 4 cards
      const currentActive = scrollLeft >= (cardWidth * 2) ? 1 : 0;
      setActiveDot(currentActive);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardElement = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = cardElement ? cardElement.offsetWidth + 24 : clientWidth / 2;
      const scrollAmount = direction === 'left' ? -(cardWidth * 4) : (cardWidth * 4);
      
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };



  // State for Solution Finder
  const [industry, setIndustry] = useState('Tài chính');
  const [need, setNeed] = useState('Tối ưu hóa bảo mật & tuân thủ');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [isHoveringIndustry, setIsHoveringIndustry] = useState(false);

  useEffect(() => {
    if (isHoveringIndustry) return;
    const timer = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % INDUSTRIES_DATA.length);
    }, 7000); // Cycle every 7 seconds
    return () => clearInterval(timer);
  }, [isHoveringIndustry]);
  const [activeServicePage, setActiveServicePage] = useState(0);
  const [activeDCIndex, setActiveDCIndex] = useState(0);
  const [showDCModal, setShowDCModal] = useState(false);
  const [selectedDCData, setSelectedDCData] = useState<any>(null);
  const [dcViewMode, setDcViewMode] = useState<'image' | 'map'>('image');

  const nextSlide = () => {
    setActiveIndustry((prev) => (prev + 1) % INDUSTRIES_DATA.length);
  };

  const prevSlide = () => {
    setActiveIndustry((prev) => (prev - 1 + INDUSTRIES_DATA.length) % INDUSTRIES_DATA.length);
  };

  const industries = ['Tài chính', 'Chính phủ', 'TMĐT', 'Sản xuất', 'Giáo dục', 'Y tế', 'Công nghệ', 'Khác'];
  const needs = [
    'Tăng hiệu năng vận hành',
    'Giảm thiểu chi phí vật lý CAPEX',
    'Tối ưu hóa bảo mật & tuân thủ',
    'Mở rộng quy mô tức thời',
    'Thiết lập DevOps & Kubernetes',
    'Triển khai Backup & Khôi phục thảm họa (Disaster Recovery)'
  ];

  const handleFindSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch('/api/solution-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, need })
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      } else {
        setReport("### Xuất hiện lỗi\nKhông thể tạo kết nối đến mô hình Gemini.");
      }
    } catch (err) {
      console.error(err);
      setReport("### Xuất hiện lỗi kết nối\nVui lòng kiểm tra lại cấu hình API hoặc API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-white text-[#5A5A5A]">
      <Navbar forceServicesOpen={forceServicesOpen} forceMobileDrawer={forceMobileDrawer} />

      {/* SECTION 1: HERO SECTION */}
      <section className="relative overflow-hidden bg-[#1A1A1A] text-white py-16 md:py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png')` }}
        />
        
        <div className="ali-container relative z-10 text-left flex flex-col items-start py-6 w-full">
          <div className="space-y-6 max-w-3xl flex flex-col items-start">
            <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 px-3 py-1.5 rounded-full text-brand-500 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EE0033] mr-1 animate-ping" />
              {isGlobal ? 'GLOBAL CLOUD PLATFORM' : 'VIETTEL IDC x QUALCOMM'}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans">
              {isGlobal ? (
                <>
                  <span className="block md:whitespace-nowrap">Empowering Global Enterprises</span>
                  <span className="text-[#EE0033] block md:whitespace-nowrap">To Accelerate AI Innovation</span>
                </>
              ) : (
                <>
                  <span className="block md:whitespace-nowrap">Đồng hành cùng doanh nghiệp</span>
                  <span className="text-white block md:whitespace-nowrap">Việt Nam đưa AI vào thực chiến</span>
                </>
              )}
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {isGlobal ? (
                'Realize your AI initiatives globally with high-performance computing infrastructure, low-latency networking, and robust international cloud security standards backed by Qualcomm\'s acceleration ecosystem.'
              ) : (
                'Hiện thực hóa ý tưởng AI của bạn với sức mạnh từ nền tảng tăng tốc AI của Qualcomm trên hệ sinh thái đám mây của Viettel IDC. Đăng ký tham gia để bắt đầu trải nghiệm hạ tầng chuyên biệt và nhận hỗ trợ kỹ thuật chuyên sâu ngay hôm nay!'
              )}
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Link 
                href={getLocalizedPath('/contact')} 
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#EE0033] text-white font-bold text-sm tracking-wider rounded-[8px] shadow-[0_4px_14px_rgba(238,0,51,0.4)] transition-all duration-300 hover:bg-[#FF1A4E] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_6px_20px_rgba(238,0,51,0.5)] focus:outline-none focus:ring-2 focus:ring-[#EE0033]/50 focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
              >
                <span>{isGlobal ? 'Get Started' : 'Xem thêm'}</span>
                <span className="inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </Link>
            </div>
            

          </div>
        </div>
      </section>



      {/* SECTION 2: SOCIAL PROOF BAR */}
      <section className="bg-white border-y border-gray-100 py-5 overflow-hidden">
        <div id="social-proof-section" className="ali-container">
          <p className="text-left text-xs font-bold text-gray-400 mb-3 font-sans">
            {isGlobal ? 'Trusted by leading enterprises globally' : 'Thương hiệu được tin dùng bởi các doanh nghiệp hàng đầu Việt nam'}
          </p>
          <div className="relative w-full overflow-hidden">
            {/* Elegant Gradient Fade Masks on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex whitespace-nowrap items-center py-3">
              {/* First copy */}
              <div className="flex space-x-16 items-center shrink-0 pr-16 bg-white">
                {CLIENT_LOGOS.map((logo, index) => (
                  <div 
                    key={`logo-a-${index}`} 
                    className="flex items-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 group cursor-pointer"
                    title={logo.name}
                  >
                    <Image 
                      src={logo.src} 
                      alt={logo.name} 
                      width={130}
                      height={32}
                      className="h-7 md:h-8 max-w-[130px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate copy for a seamless, continuous marquee */}
              <div className="flex space-x-16 items-center shrink-0 pr-16 bg-white" aria-hidden="true">
                {CLIENT_LOGOS.map((logo, index) => (
                  <div 
                    key={`logo-b-${index}`} 
                    className="flex items-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 group cursor-pointer"
                    title={logo.name}
                  >
                    <Image 
                      src={logo.src} 
                      alt={logo.name} 
                      width={130}
                      height={32}
                      className="h-7 md:h-8 max-w-[130px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 10 NHÓM DỊCH VỤ - GRIDS */}
      <section className="py-16 md:py-20 bg-[#FAFAFA] border-b border-gray-200/50">
        <div className="ali-container space-y-12">
          
          {/* Section Header */}
          <div className="text-left space-y-3 max-w-3xl mb-8">
            <span className="text-[#EE0033] font-black text-[10px] uppercase tracking-[0.18em] block bg-[#EE0033]/8 px-3.5 py-1.5 rounded-full w-max leading-none">
              {isGlobal ? 'SERVICE PORTFOLIO' : 'DANH MỤC TOÀN DIỆN'}
            </span>
            <h2 id="services-section-title" className="text-3xl md:text-[42px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              {isGlobal ? 'Standard International Service Portfolio' : 'Danh mục dịch vụ chuẩn quốc tế'}
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              {isGlobal ? (
                'Discover our ecosystem of 10 unified, secure, and high-performance digital infrastructure service groups at international standards.'
              ) : (
                'Khám phá hệ sinh thái 10 nhóm giải pháp hạ tầng số đồng bộ, bảo mật và hiệu năng cao hàng đầu từ Viettel IDC.'
              )}
            </p>
          </div>

          {/* Header Control Bar */}
          <div className="flex items-center justify-between mb-3 pr-2">
            {/* Elegant link on the left */}
            <div className="text-[13px] font-bold text-[#EE0033] hover:text-[#D0002D] transition-colors cursor-pointer flex items-center gap-1.5 pl-1 select-none group">
              <span>{isGlobal ? 'Explore all services' : 'Xem tất cả nhóm dịch vụ'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            {/* Elegant compact Pagination Controllers */}
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 px-2.5 rounded-[14px] border border-gray-200/60 shadow-xs">
              <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 mr-1.5 pl-1.5 select-none">
                0{activeServicePage + 1} / 02
              </span>
              
              <button
                onClick={() => setActiveServicePage((prev) => (prev === 0 ? 1 : 0))}
                className="w-8 h-8 rounded-[8px] border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#EE0033] hover:border-[#EE0033] active:scale-95 transition-all outline-none cursor-pointer"
                aria-label="Previous page"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
              </button>

              <button
                onClick={() => setActiveServicePage((prev) => (prev === 0 ? 1 : 0))}
                className="w-8 h-8 rounded-[8px] border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#EE0033] hover:border-[#EE0033] active:scale-95 transition-all outline-none cursor-pointer"
                aria-label="Next page"
              >
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Cards with smooth slide transition using AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeServicePage}
              initial={{ opacity: 0, x: activeServicePage === 0 ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeServicePage === 0 ? 15 : -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="ali-grid-4"
            >
              {(activeServicePage === 0 ? SERVICE_CATEGORIES.slice(0, 8) : SERVICE_CATEGORIES.slice(8, 10)).map((cat, i) => {
                // Map icons precisely matching the mockup
                let IconComponent = Cpu;
                if (cat.slug === 'compute') IconComponent = Cloud;
                else if (cat.slug === 'data-center') IconComponent = Server;
                else if (cat.slug === 'storage') IconComponent = Database;
                else if (cat.slug === 'data-platform') IconComponent = Cpu;
                else if (cat.slug === 'networking') IconComponent = Network;
                else if (cat.slug === 'security') IconComponent = Shield;
                else if (cat.slug === 'cloud-operations') IconComponent = Settings;
                else if (cat.slug === 'digital-services') IconComponent = FileCheck;
                else if (cat.slug === 'managed-services') IconComponent = GitBranch;
                else IconComponent = RefreshCw; // 'domain' standard fallback

                return (
                  <Link 
                    key={cat.id}
                    href={`/services/${cat.slug}`}
                    className="bg-white rounded-[14px] p-6 md:p-8 flex flex-col justify-between border border-gray-200/80 hover:border-[#EE0033]/60 hover:shadow-[0_8px_30px_rgba(238,0,51,0.15)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="space-y-6">
                      {/* Icon container styled exactly like mockup */}
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FAFAFA] text-[#EE0033] border border-gray-100 transition-all duration-300 group-hover:bg-[#FFF0F2] group-hover:border-[#FCD9D8]">
                        <IconComponent className="w-5 h-5 stroke-[1.8]" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-bold text-sm md:text-base text-gray-950 tracking-tight">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Footers of cards matching the mockup layout */}
                    <div className="pt-6 mt-6">
                      <span className="text-xs font-bold text-[#EE0033] inline-flex items-center gap-1.5 transition-all duration-300">
                        <span className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap">
                          {isGlobal ? 'Details' : 'Xem chi tiết'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 4: 8 BỘ GIẢI PHÁP CAROUSEL */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100 relative">
        
        <div className="ali-container relative z-10 space-y-12">
          
          {/* Section Header */}
          <div className="text-left space-y-3 max-w-3xl mb-8">
            <span className="text-[#EE0033] font-black text-[10px] uppercase tracking-[0.18em] block bg-[#EE0033]/8 px-3.5 py-1.5 rounded-full w-max leading-none">
              TỐI ƯU VẬN HÀNH
            </span>
            <h2 className="text-3xl md:text-[42px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Giải pháp chuyên sâu cho doanh nghiệp
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Kiến tạo hạ tầng số an toàn, bảo mật và đáp ứng đầy đủ tiêu chuẩn khắt khe nhất của mọi doanh nghiệp.
            </p>
          </div>

          <div className="flex items-center justify-between mb-3 pr-2">
            {/* Elegant link on the left */}
            <Link
              href="/solutions"
              className="text-[13px] font-bold text-[#EE0033] hover:text-[#D0002D] transition-colors cursor-pointer flex items-center gap-1.5 pl-1 select-none group"
            >
              <span>Xem tất cả giải pháp</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Elegant compact Pagination Controllers - placed close to the card */}
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 px-2.5 rounded-[14px] border border-gray-200/60 shadow-xs">
              <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 mr-1.5 pl-1.5 select-none">
                0{activeDot + 1} / 02
              </span>
              
              <button
                id="btn-prev-slide"
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-[8px] border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#EE0033] hover:border-[#EE0033] active:scale-95 transition-all outline-none cursor-pointer"
                aria-label="Slide trước"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
              </button>

              <button
                id="btn-next-slide"
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-[8px] border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#EE0033] hover:border-[#EE0033] active:scale-95 transition-all outline-none cursor-pointer"
                aria-label="Slide tiếp theo"
              >
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Carousel Track container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-4 pb-6 -my-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {BUSSINESS_SOLUTIONS.map((sol, index) => {
              return (
                <Link 
                  key={index}
                  href={`/solutions/${sol.slug}`}
                  className="min-w-[280px] sm:min-w-[325px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] flex-shrink-0 snap-start bg-white rounded-[14px] pt-8 px-8 pb-5 flex flex-col justify-between h-[420px] relative overflow-hidden hover:shadow-[0_8px_30px_rgba(238,0,51,0.2)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer transform-gpu"
                >
                  {/* Premium Border Overlay to prevent the scaled image from covering the border on hover */}
                  <div className="absolute inset-0 rounded-[14px] border border-gray-200/80 group-hover:border-[#EE0033]/60 transition-colors duration-300 pointer-events-none z-20" />

                  {/* Real design background image from Cloudinary */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 opacity-90 group-hover:scale-105 group-hover:opacity-100 pointer-events-none z-0"
                    style={{ 
                      backgroundImage: `url('${sol.bgImage || 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782023092/1_dcrhes.png'}')` 
                    }}
                  />
 
                  {/* Top content */}
                  <div className="space-y-4 relative z-10 w-full">
                    <h3 className="font-extrabold text-base text-gray-900 tracking-tight leading-snug pt-2">
                      {sol.title}
                    </h3>
                    
                    <ul className="space-y-2.5">
                      {sol.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-650">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EE0033]/90 flex-shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom button alignment wrapper */}
                  <div className="relative z-10 w-full pb-0">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#EE0033] group-hover:bg-[#D0002D] transition-all duration-300 select-none py-2 px-4 rounded-[8px] shadow-xs">
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 5: GIẢI PHÁP ĐA LĨNH VỰC - SYSTEM CLOUD SCENARIOS */}
      <section className="py-16 md:py-20 text-gray-950 overflow-hidden relative border-t border-gray-100">
        {/* Real-world high aesthetic background image requested by user */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1782045831/BANNER_zvcj7o.png')` }}
        />
        
        {/* Header container aligned to max-w-7xl content columns */}
        <div className="ali-container space-y-10 relative z-10 animate-fade-in">
          
          {/* Header section styled to match user request */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
            <div className="space-y-4">
              <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded w-max">GIẢI PHÁP ĐA LĨNH VỰC</span>
              <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight font-sans text-gray-950 leading-tight">
                Thiết kế tối ưu theo đặc thù từng kịch bản vận hành
              </h2>
              <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
                Hạ tầng tính toán tối ưu, bảo mật đa phòng vệ được may đo chuẩn xác để giải quyết triệt độ bài toán khó nhất của riêng ngành bạn.
              </p>
            </div>
          </div>
        </div>

        {/* FULL BLEED MULTI-CARD VERTICAL EXPANDING ACCORDION (Enhanced premium edition) */}
        <div 
          className="ali-container my-4 relative z-10 text-gray-950"
          onMouseEnter={() => setIsHoveringIndustry(true)}
          onMouseLeave={() => setIsHoveringIndustry(false)}
        >
          
          {/* Desktop view: side-by-side horizontal cards with dynamic flexible widths & Framer Motion layout spring expansion */}
          <div className="hidden md:flex flex-row gap-2 h-[600px] w-full relative">
            {INDUSTRIES_DATA.map((item, index) => {
              const isActive = activeIndustry === index;
              const IconComponent = item.bottomIcon;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndustry(index)}
                  onClick={() => setActiveIndustry(index)}
                  className={`relative h-full rounded-[14px] overflow-hidden cursor-pointer select-none border transition-all duration-500 min-w-0 group ${
                    isActive 
                      ? "flex-[3.5] border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.08)]" 
                      : "flex-1 border-gray-200/40 hover:flex-[1.1] hover:border-gray-300/60"
                  }`}
                >
                  {/* High quality background image corresponding to the service */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center scale-100"
                    style={{ backgroundImage: `url('${item.bgPattern}')` }}
                  />

                  {/* Dark gradient overlay covering bottom 2/3 with 60% to 0% opacity from bottom to top */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-[1]" />

                  {/* Active glowing accent border overlay */}
                  <div className={`absolute inset-0 border-[1.5px] rounded-[14px] pointer-events-none z-[2] transition-opacity duration-500 ${
                    isActive ? "border-white/30 opacity-100" : "border-transparent opacity-0"
                  }`} />

                  {/* Main card interface interior with absolute/relative positioning for high control */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between items-start w-full">
                    
                    {/* ACTIVE EXPANDED VIEW LAYOUT (Richly styled, clean & responsive) */}
                    <div className={`absolute left-6 bottom-6 top-6 flex flex-col justify-between items-start text-left h-[calc(100%-48px)] w-[320px] lg:w-[450px] xl:w-[480px] ${
                      isActive 
                        ? "opacity-100 pointer-events-auto" 
                        : "opacity-0 pointer-events-none"
                    }`}>
                      {/* Top sector-meta row */}
                      <div className="flex items-center justify-end w-full min-h-8">
                        {/* Number removed */}
                      </div>

                      {/* Grouped bottom content, pulled all the way down with an elegant frosted-glass container */}
                      <div className="w-full mt-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-[14px] p-6.5 space-y-4 shadow-2xl">
                        {/* Title & Description & Bullets */}
                        <div className="space-y-2 max-w-2xl">
                          <div className="space-y-0.5">
                            <h2 className="text-2xl md:text-3xl text-white font-extrabold tracking-tight leading-tight">
                              {item.title}
                            </h2>
                          </div>

                          {/* Dynamic Paragraph narrative */}
                          <p className="text-xs md:text-sm font-normal text-white/90 leading-relaxed max-w-xl">
                            {item.desc}
                          </p>

                          {/* Bullet points styled as list items with custom checks */}
                          <div className="space-y-2 pt-1 max-w-xl">
                            {item.bullets.slice(0, 3).map((bullet, idx) => (
                              <div key={idx} className="flex items-start gap-2.5">
                                <span className="w-4 h-4 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                                </span>
                                <span className="text-[12px] md:text-[13px] font-medium text-white/90 leading-normal">
                                  {bullet}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Red capsule button positioned at bottom left of active card */}
                        <div className="pt-1 flex justify-between items-center w-full">
                          <Link 
                            href={`/solutions/${item.slug}`}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#EE0033] hover:bg-[#D0002D] transition-all duration-300 select-none py-2 px-4 rounded-[8px] shadow-xs active:scale-95 cursor-pointer group"
                          >
                            <span>Tìm hiểu thêm</span>
                            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* INACTIVE COLLAPSED VIEW LAYOUT (Sophisticated vertical presentation) */}
                    <div className={`absolute inset-0 p-8 flex flex-col justify-between items-center text-center h-full w-full ${
                      isActive 
                        ? "opacity-0 pointer-events-none" 
                        : "opacity-100 pointer-events-auto"
                    }`}>
                      {/* Top: Domain-specific Icon in circled red/white-outline */}
                      <div className="w-13 h-13 rounded-full border border-white/20 flex items-center justify-center text-white/95 bg-black/40 backdrop-blur-md transition-all">
                        <IconComponent className="w-5.5 h-5.5 text-white stroke-[1.8]" />
                      </div>

                      {/* Bottom: Large title text at the bottom edge of the card */}
                      <div className="mt-auto pt-4">
                        <h3 className="text-xl md:text-2xl font-extrabold text-white/95 uppercase tracking-tight leading-tight select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile view: Stacked collapsible accordion blocks for tactile usability with Framer Motion layout transitions */}
          <div className="flex md:hidden flex-col gap-2 w-full">
            {INDUSTRIES_DATA.map((item, index) => {
              const isActive = activeIndustry === index;
              const IconComponent = item.bottomIcon;

              return (
                <motion.div
                  key={item.id}
                  layout="position"
                  onClick={() => setActiveIndustry(index)}
                  className={`relative rounded-[14px] overflow-hidden cursor-pointer select-none border transition-all duration-500 ${
                    isActive 
                      ? "border-white/30 shadow-lg" 
                      : "border-gray-200/40"
                  }`}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.bgPattern}')` }}
                  />

                  {/* Dark gradient overlay covering bottom 2/3 with 60% to 0% opacity from bottom to top */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-[1]" />

                  {/* Inner relative content */}
                  <div className="relative z-10 p-6 flex flex-col justify-between items-start w-full">
                    
                    <div className="w-full flex justify-between items-center gap-2">
                      <div className="flex items-center gap-3">
                        <h2 className="text-base text-white font-extrabold leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {item.title}
                        </h2>
                      </div>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isActive ? "border-[#EE0033] bg-[#EE0033] text-white" : "border-white/25 bg-black/30 text-white"
                      }`}>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {isActive && (
                      <div className="w-full space-y-4 animate-fade-in mt-4">
                        <p className="text-[12.5px] text-white/95 leading-relaxed bg-white/12 backdrop-blur-lg p-4 rounded-[14px] border border-white/10 shadow-inner">
                          {item.desc}
                        </p>
                        
                        {/* Red capsule button on mobile active as well */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <Link 
                            href={`/solutions/${item.slug}`}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#EE0033] hover:bg-[#D0002D] transition-all duration-300 select-none py-2 px-4 rounded-[8px] shadow-xs active:scale-95 cursor-pointer group"
                          >
                            <span>Tìm hiểu thêm</span>
                            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </Link>
                          
                          <div className="flex items-center gap-2 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                            <IconComponent className="w-4 h-4 text-[#EE0033]" />
                            <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Standard Cloud</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>


      </section>

      {/* SECTION: NETWORK OF DATA CENTERS (MẠNG LƯỚI TRUNG TÂM DỮ LIỆU) */}
      <section id="datacenter-network-section" className="bg-[#FAF9F9] py-16 md:py-20 relative overflow-hidden">
        <div className="ali-container relative z-10">
          
          {/* Section Header */}
          <div className="text-left space-y-3 max-w-3xl mb-8">
            <span className="text-[#EE0033] font-black text-[10px] uppercase tracking-[0.18em] block bg-[#EE0033]/8 px-3.5 py-1.5 rounded-full w-max leading-none">
              HẠ TẦNG SỐ KHẮT KHE NHẤT
            </span>
            <h2 className="text-3xl md:text-[42px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Hệ thống Trung tâm Dữ liệu chuẩn quốc tế
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Mạng lưới hạ tầng điện toán đám mây thế hệ mới của Viettel IDC, phân bổ chiến lược tại các vùng kinh tế trọng điểm, đáp ứng tiêu chuẩn khắt khe nhất toàn cầu.
            </p>
          </div>

          <div className="flex items-center justify-between mb-3 pr-2">
            {/* Elegant link on the left */}
            <div className="text-[13px] font-bold text-[#EE0033] hover:text-[#D0002D] transition-colors cursor-pointer flex items-center gap-1.5 pl-1 select-none group">
              <span>Xem tất cả Trung tâm dữ liệu</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            {/* Elegant compact Pagination Controllers - placed close to the card */}
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 px-2.5 rounded-[14px] border border-gray-200/60 shadow-xs">
              <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 mr-1.5 pl-1.5 select-none">
                {activeDCIndex + 1 < 10 ? `0${activeDCIndex + 1}` : activeDCIndex + 1} / {DATACENTER_VIEWS.length < 10 ? `0${DATACENTER_VIEWS.length}` : DATACENTER_VIEWS.length}
              </span>
              
              <button
                id="btn-view-prev"
                onClick={() => {
                  const nextIndex = (activeDCIndex - 1 + DATACENTER_VIEWS.length) % DATACENTER_VIEWS.length;
                  setActiveDCIndex(nextIndex);
                  const matchingDC = DATA_CENTERS.find(dc => dc.id === DATACENTER_VIEWS[nextIndex].id);
                  if (matchingDC) setSelectedDCData(matchingDC);
                }}
                className="w-8 h-8 rounded-[8px] border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#EE0033] hover:border-[#EE0033] active:scale-95 transition-all outline-none cursor-pointer"
                aria-label="Previous view"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
              </button>

              <button
                id="btn-view-next"
                onClick={() => {
                  const nextIndex = (activeDCIndex + 1) % DATACENTER_VIEWS.length;
                  setActiveDCIndex(nextIndex);
                  const matchingDC = DATA_CENTERS.find(dc => dc.id === DATACENTER_VIEWS[nextIndex].id);
                  if (matchingDC) setSelectedDCData(matchingDC);
                }}
                className="w-8 h-8 rounded-[8px] border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#EE0033] hover:border-[#EE0033] active:scale-95 transition-all outline-none cursor-pointer"
                aria-label="Next view"
              >
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Interactive Bento Split Panel - Unified in 1 Block */}
          <div className="grid grid-cols-1 lg:grid-cols-10 border border-gray-200/50 shadow-[0_24px_65px_rgba(0,0,0,0.04)] rounded-[14px] overflow-hidden bg-white items-stretch mb-10 transition-all duration-300">
            
            {/* Left: Beautiful Image Showcase / Map Toggle Panel - Unified borderless design */}
            <div className="lg:col-span-4 relative h-[450px] sm:h-[520px] lg:h-[560px] flex flex-col bg-slate-50 group rounded-[14px] overflow-hidden">
              
              {/* Card Header with Glass Toggle buttons */}
              <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-end pointer-events-auto">
                {/* Switcher Button */}
                <div className="flex bg-white/95 backdrop-blur-md p-1 rounded-full border border-gray-200/45 shadow-md">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDcViewMode('image');
                    }}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      dcViewMode === 'image'
                        ? 'bg-[#EE0033] text-white shadow-sm'
                        : 'text-gray-400 hover:text-gray-800'
                    }`}
                  >
                    Hình ảnh
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDcViewMode('map');
                    }}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      dcViewMode === 'map'
                        ? 'bg-[#EE0033] text-white shadow-sm'
                        : 'text-gray-400 hover:text-gray-800'
                    }`}
                  >
                    Bản đồ
                  </button>
                </div>
              </div>

              {/* Card Body content */}
              <div className="relative w-full h-full flex-grow flex items-center justify-center rounded-[14px] overflow-hidden">
                {dcViewMode === 'image' ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={DATACENTER_VIEWS[activeDCIndex].id}
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full rounded-[14px] overflow-hidden"
                    >
                      <Image 
                        src={DATACENTER_VIEWS[activeDCIndex].image} 
                        alt={DATACENTER_VIEWS[activeDCIndex].name} 
                        fill
                        className="absolute inset-0 w-full h-full object-cover rounded-[14px]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent pointer-events-none" />
                      
                      {/* Beautiful glassmorphic blurred overlay layer floating at the bottom of the image */}
                      <div className="absolute left-5 right-5 bottom-5 bg-white/10 backdrop-blur-lg border border-white/15 rounded-[14px] px-6 py-4 flex items-center justify-between z-10 shadow-lg">
                        <div className="text-left">
                          <span className="text-[10px] font-mono font-bold tracking-[0.15em] text-[#EE0033] block mb-0.5">VIETTEL IDC CORE FACILITY</span>
                          <h4 className="text-lg md:text-xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            {DATACENTER_VIEWS[activeDCIndex].name}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <NetworkMap
                    activeId={DATACENTER_VIEWS[activeDCIndex].id}
                    onSelectDC={(id) => {
                      const idx = DATACENTER_VIEWS.findIndex((view) => view.id === id);
                      if (idx !== -1) {
                        setActiveDCIndex(idx);
                        setDcViewMode('map');
                        const matchingDC = DATA_CENTERS.find((dc) => dc.id === id);
                        if (matchingDC) {
                          setSelectedDCData(matchingDC);
                        }
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* Right: Premium Spec & Control Card */}
            <div className="lg:col-span-6 bg-transparent p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-[520px] lg:h-[560px] relative overflow-hidden">
              <div className="space-y-4">
                
                {/* Active DC Header with Uptime badge */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.15em] block mb-1">DATA CENTER PROFILE</span>
                    <h3 className="text-2xl lg:text-[28px] font-extrabold text-gray-950 font-sans tracking-tight leading-none">
                      {DATACENTER_VIEWS[activeDCIndex].name}
                    </h3>
                  </div>
                  {/* Status badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/50 rounded-full text-[9px] font-extrabold text-emerald-700 uppercase tracking-widest shrink-0 leading-none shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>READY</span>
                  </div>
                </div>
                
                <p className="text-xs lg:text-sm text-gray-500 leading-relaxed font-normal min-h-[44px] font-sans">
                  {DATACENTER_VIEWS[activeDCIndex].desc}
                </p>
                
                {/* Exquisite Certificates row (moved up near standard specifications with soft red styled badges) */}
                <div className="pt-4 space-y-2">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">CHỨNG CHỈ SỞ HỮU</span>
                  <div className="flex flex-wrap gap-1.5">
                    {DATACENTER_VIEWS[activeDCIndex].subText.split(' · ').map((cert, certIdx) => (
                      <span 
                        key={certIdx} 
                        className="bg-[#EE0033]/5 border border-[#EE0033]/12 hover:bg-[#EE0033]/8 rounded-lg px-2.5 py-1 text-[11px] lg:text-[12px] font-mono font-bold text-[#EE0033] shadow-[0_1px_2px_rgba(238,0,51,0.01)] transition-all duration-200 cursor-default"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 space-y-3">
                  <h4 className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Thông số kỹ thuật tiêu chuẩn</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-2">
                    {DATACENTER_VIEWS[activeDCIndex].metrics.map((metric, index) => {
                      const isArea = metric.label.includes('Quy mô') || metric.label.includes('diện tích');
                      const isPower = metric.label.includes('nguồn') || metric.label.includes('suất nguồn');
                      const isPue = metric.label.includes('năng lượng') || metric.label.includes('PUE');
                      const isRacks = metric.label.includes('rack') || metric.label.includes('Racks') || metric.label.includes('Mật độ');
                      const isBackup = metric.label.includes('Dự phòng');
                      const isConn = metric.label.includes('Kết nối');
                      const isStd = metric.label.includes('Tiêu chuẩn');
                      
                      const MetricIcon = 
                        isArea ? Home :
                        isPower ? Zap : 
                        isPue ? Activity :
                        isRacks ? Layers :
                        isBackup ? Shield :
                        isConn ? Network :
                        isStd ? FileCheck : Clock;

                      return (
                        <div key={index} className="flex items-center justify-between py-1.5 border-b border-gray-100/70 hover:border-[#EE0033]/20 transition-all duration-300 group/item">
                          <div className="flex items-center gap-2 pr-2">
                            <MetricIcon className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-[#EE0033] group-hover/item:scale-105 transition-all duration-300 shrink-0" />
                            <span className="text-xs font-medium text-gray-500 group-hover/item:text-gray-800 transition-colors duration-300 block">{metric.label}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs lg:text-[13px] font-bold text-gray-900 font-sans tracking-tight block">
                              {metric.value}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Specs Detailed Trigger Button Footer */}
              <div className="pt-4 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-1.5 text-gray-400 text-left">
                  <Shield className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                  <span className="text-[9.5px] font-black uppercase tracking-widest text-slate-400">Vận hành chuẩn quốc tế</span>
                </div>
                
                {/* Button to open specs modal for active item, styled like service card "Xem chi tiết" */}
                <button
                  onClick={() => {
                    const matchingDC = DATA_CENTERS.find(dc => dc.id === DATACENTER_VIEWS[activeDCIndex].id);
                    if (matchingDC) {
                      setSelectedDCData(matchingDC);
                      setShowDCModal(true);
                    }
                  }}
                  className="group inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#EE0033] hover:bg-[#D0002D] cursor-pointer transition-all duration-300 select-none py-2 px-4 rounded-[12px] shadow-xs active:scale-98 shrink-0 self-start sm:self-auto"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* New Standards & Awards Section */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="ali-container">
          
          <div className="text-left space-y-2 max-w-3xl mb-8">
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">UY TÍN ĐƯỢC KIỂM CHỨNG</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Tiêu chuẩn & Giải thưởng quốc tế
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Viettel IDC nắm giữ các chứng nhận quốc tế hàng đầu và liên tiếp được vinh danh bởi các tổ chức uy tín toàn cầu — minh chứng vững chắc cho chất lượng hạ tầng và dịch vụ.
            </p>
          </div>

          <div className="flex items-center justify-between mb-4 pr-1">
            {/* Elegant link on the left */}
            <a href="#" className="text-[13px] font-bold text-[#EE0033] hover:text-[#D0002D] transition-colors cursor-pointer flex items-center gap-1.5 pl-1 select-none group">
              <span>Xem toàn bộ {activeCertTab === 'cert' ? 'chứng nhận' : 'giải thưởng'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Controls Row */}
            <div className="flex items-center bg-white p-1 rounded-[6px] border border-gray-200">
              <button 
                onClick={() => setActiveCertTab('cert')}
                className={`font-bold py-1.5 px-4 rounded-[6px] text-xs transition-all duration-300 cursor-pointer ${
                  activeCertTab === 'cert' 
                    ? 'bg-[#EE0033] text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 bg-transparent'
                }`}
              >
                Chứng nhận
              </button>
              <button 
                onClick={() => setActiveCertTab('award')}
                className={`font-bold py-1.5 px-4 rounded-[6px] text-xs transition-all duration-300 cursor-pointer ${
                  activeCertTab === 'award' 
                    ? 'bg-[#EE0033] text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 bg-transparent'
                }`}
              >
                Giải thưởng
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCertTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
            >
              {(activeCertTab === 'cert' ? CERTIFICATIONS_DATA : AWARDS_DATA).map((item, i) => (
                <div 
                  key={i} 
                  className="bg-slate-50/40 hover:bg-white p-5 rounded-[14px] border border-gray-200/60 flex flex-col h-full hover:border-[#EE0033]/60 hover:shadow-[0_8px_30px_rgba(238,0,51,0.15)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                >
                  {/* Top Row: Image & Tag */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100/60 shrink-0">
                      <SafeCertImage 
                        src={item.image} 
                        alt={item.title} 
                        tag={item.tag}
                      />
                    </div>
                    <div className="px-2 py-1 bg-gray-100 rounded text-[9px] font-mono font-bold text-gray-600 tracking-wide uppercase max-w-[120px] truncate shrink-0">
                      {item.tag}
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs md:text-sm text-gray-950 mb-1.5 leading-snug group-hover:text-[#EE0033] transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    </div>

                    {/* Footer styled identical to services section card */}
                    <div className="pt-4 mt-4 border-t border-gray-100/80">
                      <span className="text-xs font-bold text-[#EE0033] inline-flex items-center gap-1.5 transition-all duration-300 pointer-events-none">
                        <span className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap">
                          Xem chi tiết
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </motion.div>
          </AnimatePresence>



        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="ali-container">
            <div className="text-left w-full space-y-2 mb-10">
                <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ĐỒNG HÀNH CÙNG PHÁT TRIỂN</span>
                <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
                  Đối tác công nghệ
                </h2>
                <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
                    Viettel IDC liên kết chặt chẽ với các tập đoàn công nghệ hàng đầu thế giới để mang đến những giải pháp hạ tầng tiên tiến, tin cậy và tối ưu nhất cho doanh nghiệp Việt Nam.
                </p>
            </div>

            {/* Partners Grid - Running infinite marquee from right to left */}
            <div className="relative w-full overflow-hidden py-4">
              <style>{`
                @keyframes marqueePartners {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee-partners {
                  display: flex;
                  width: max-content;
                  animation: marqueePartners 35s linear infinite;
                }
                .animate-marquee-partners:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="animate-marquee-partners gap-4 md:gap-5 flex">
                {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                  <div 
                    key={`${partner.id}-${index}`} 
                    className="bg-white border border-gray-100 p-5 rounded-[14px] flex flex-col items-center justify-center gap-3 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer text-center h-[140px] w-[160px] md:w-[180px] flex-shrink-0"
                    title={`${partner.name} - ${partner.role}`}
                  >
                    {/* Brand Logo Container */}
                    <div className="w-full h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <SafePartnerImage 
                        src={partner.logoUrl} 
                        alt={partner.name}
                        logoText={partner.logoText}
                        logoBg={partner.logoBg}
                      />
                    </div>
                    <span className="font-extrabold text-[11px] md:text-xs text-gray-500 group-hover:text-[#EE0033] transition-colors uppercase tracking-wider">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* MODAL: STUNNING DETAIL DATA CENTER SPECTSHEET SPECIFICATION OVERLAY */}
      <AnimatePresence>
        {showDCModal && selectedDCData && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDCModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white text-gray-900 w-full max-w-2xl rounded-[14px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden z-10 border border-gray-100 flex flex-col"
            >
              {/* Image banner inside details */}
              <div className="relative h-48 md:h-56 bg-neutral-900 overflow-hidden shrink-0">
                <Image 
                  src={selectedDCData.image} 
                  alt={selectedDCData.name} 
                  fill
                  className="w-full h-full object-cover opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Image labels inside banner */}
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono text-[#EE0033] bg-[#EE0033]/15 border border-[#EE0033]/25 px-2 py-0.5 rounded uppercase font-extrabold tracking-widest">{selectedDCData.tag}</span>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{selectedDCData.name}</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 whitespace-nowrap rounded-lg px-3 py-1.5 text-center text-white shrink-0">
                    <p className="text-[9px] font-mono opacity-80 uppercase leading-none">PUE TIÊU CHUẨN</p>
                    <p className="text-sm font-bold font-mono text-[#FF3E6C]">{selectedDCData.pue}</p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowDCModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur text-white flex items-center justify-center transition-all border border-white/10 active:scale-95"
                  aria-label="Close Specs modal"
                >
                  ✕
                </button>
              </div>

              {/* Dynamic Specifications core values list */}
              <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto max-h-[60vh] text-left">
                {/* Basic Intro */}
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
                  {selectedDCData.desc}
                </p>

                {/* Main Specs Bento layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-[14px] text-center space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Tổng diện tích sàn</span>
                    <span className="text-base font-black text-gray-900 font-sans block">{selectedDCData.area}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-[14px] text-center space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Quy mô tải trọng</span>
                    <span className="text-base font-black text-gray-900 font-sans block">{selectedDCData.racks}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-[14px] text-center space-y-1 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Khu vực khai thác</span>
                    <span className="text-base font-black text-gray-900 font-sans block">{selectedDCData.city}</span>
                  </div>
                </div>

                {/* Infrastructure Standards and Certifications list */}
                <div className="space-y-3">
                  <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider font-sans border-b border-gray-100 pb-2">CHỨNG CHỈ QUỐC TẾ KHÁT KHE</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedDCData.standards.map((cert: string) => (
                      <div key={cert} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EE0033]/5 text-neutral-800 text-[11px] font-bold uppercase tracking-wider rounded border border-[#EE0033]/10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#EE0033]" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Spec Bullet items */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider font-sans border-b border-gray-100 pb-2">THÔNG SỐ KỸ THUẬT CHI TIẾT</h4>
                  <ul className="space-y-3.5 text-xs text-gray-600 font-semibold leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 text-[#EE0033] text-[9px] font-bold font-mono mt-0.5 shrink-0">⚡</span>
                      <div>
                        <strong className="text-gray-900 block font-bold">Hạ tầng năng lượng (Power Grid):</strong>
                        <span className="text-gray-500 font-semibold">{selectedDCData.detailSpecs.power}</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 text-[#EE0033] text-[9px] font-bold font-mono mt-0.5 shrink-0">❄️</span>
                      <div>
                        <strong className="text-gray-900 block font-bold">Làm mát chính xác (Cooling precision):</strong>
                        <span className="text-gray-500 font-semibold">{selectedDCData.detailSpecs.cooling}</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 text-[#EE0033] text-[9px] font-bold font-mono mt-0.5 shrink-0">🛡️</span>
                      <div>
                        <strong className="text-gray-900 block font-bold">Hệ thống an ninh giám sát (Security):</strong>
                        <span className="text-gray-500 font-semibold">{selectedDCData.detailSpecs.security}</span>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Action buttons footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  onClick={() => setShowDCModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-250 hover:bg-gray-50 rounded-[14px] text-xs font-bold font-sans tracking-wide transition-all uppercase outline-none cursor-pointer"
                >
                  Đóng lại
                </button>
                <Link
                  href="/contact"
                  onClick={() => setShowDCModal(false)}
                  className="px-6 py-2.5 bg-[#EE0033] hover:bg-[#CC002B] text-white rounded-[14px] text-xs font-bold font-sans tracking-wide transition-all uppercase inline-flex items-center gap-1.5 hover:-translate-y-0.5 shadow-sm active:translate-y-0 cursor-pointer"
                >
                  Đăng ký tham quan phòng máy
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECTION 6: CTA BANNER */}
      <section id="consultation-form-section" className="relative py-16 md:py-20 bg-gradient-to-br from-[#8A001A] via-[#660011] to-[#3B0007] overflow-hidden text-white font-sans">
        {/* Subtle grid and decorative glow spots */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#EE0033]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#EE0033]/20 blur-[150px] pointer-events-none" />

        <div className="ali-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[#FF4D6D] font-bold text-xs uppercase tracking-widest block bg-[#FF4D6D]/10 px-3 py-1 rounded-full w-max">
                BỨT PHÁ KINH DOANH TRÊN NỀN TẢNG SỐ VỮNG CHẮC
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Tư vấn chuyên sâu cùng chuyên gia
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Nhận cố vấn chuyên sâu về hạ tầng đám mây tự chủ, an toàn và bảo mật cao chuẩn quốc tế. Đội ngũ Kiến trúc sư giải pháp của chúng tôi sẽ khảo sát, thiết kế hệ thống tối ưu chi phí và hỗ trợ dịch chuyển dữ liệu miễn phí.
              </p>

              <div className="pt-4 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-white/90 text-sm font-semibold leading-relaxed">
                    Tư vấn 1-1 chuyên sâu cùng chuyên gia cấp cao
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EE0033]/20 border border-[#FF4D6D]/30 flex items-center justify-center text-[#FF4D6D] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-white/90 text-sm font-semibold leading-relaxed">
                    Bảo đảm an toàn dữ liệu và cam kết chất lượng dịch vụ SLA
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[14px] p-6 md:p-8 lg:p-10 shadow-2xl text-neutral-900 max-w-lg mx-auto lg:ml-auto relative border border-neutral-100">
                
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight">
                    Đăng ký tư vấn giải pháp số
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1.5">
                    Cung cấp phương thức liên hệ chính xác
                  </p>
                </div>

                {ctaSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-neutral-900">Gửi yêu cầu thành công!</h4>
                      <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                        Chuyên gia giải pháp của Viettel IDC sẽ liên hệ lại qua số điện thoại của bạn trong vòng 15 phút tới.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="space-y-4 text-left">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700">Họ và tên của bạn</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                          <User className="w-4 h-4" />
                        </span>
                        <input 
                          type="text"
                          required
                          value={ctaForm.name}
                          onChange={(e) => setCtaForm({ ...ctaForm, name: e.target.value })}
                          placeholder="Ví dụ: Nguyễn Văn Vương"
                          className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-[14px] pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                        />
                      </div>
                    </div>

                    {/* Email and Phone inputs row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-neutral-700">Email</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input 
                            type="email"
                            required
                            value={ctaForm.email}
                            onChange={(e) => setCtaForm({ ...ctaForm, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-[14px] pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-neutral-700">Số điện thoại</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input 
                            type="tel"
                            required
                            value={ctaForm.phone}
                            onChange={(e) => setCtaForm({ ...ctaForm, phone: e.target.value })}
                            placeholder="Ví dụ: 098xxxxx7"
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-[14px] pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Solutions dropdown select */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700">Hạ tầng / Giải pháp quan tâm</label>
                      <div className="relative">
                        <select
                          value={ctaForm.solution}
                          onChange={(e) => setCtaForm({ ...ctaForm, solution: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-[14px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] appearance-none font-medium transition-all"
                        >
                          <option value="">Chọn dịch vụ quan tâm</option>
                          <option value="Cloud Computing (Viettel Cloud Server)">Cloud Computing (Viettel Cloud Server)</option>
                          <option value="Colocation / Thuê chỗ đặt thiết bị">Colocation / Thuê chỗ đặt thiết bị</option>
                          <option value="Private Cloud / Đám mây dùng riêng">Private Cloud / Đám mây dùng riêng</option>
                          <option value="Kubernetes Service / Hạ tầng Container">Kubernetes Service / Hạ tầng Container</option>
                          <option value="Cyber Security / Giải pháp bảo mật">Cyber Security / Giải pháp bảo mật</option>
                        </select>
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#EE0033] hover:bg-[#D0002A] text-white font-bold py-3.5 px-6 rounded-[14px] shadow-lg shadow-[#EE0033]/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 text-xs md:text-sm mt-6 cursor-pointer"
                    >
                      <span>Gửi yêu cầu tư vấn ngay</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>

                    <span className="text-[10px] text-neutral-400 text-center mt-4 leading-relaxed font-medium block">
                      Bằng việc đăng ký, bạn đồng ý với Chính sách Bảo vệ và Xử lý dữ liệu cá nhân của Viettel.
                    </span>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <ScreenSwitcher />
    </div>
  );
}

export default function Homepage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#EE0033] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400">Đang khởi tạo Viettel IDC Hub...</p>
        </div>
      </div>
    }>
      <HomepageContent />
    </Suspense>
  );
}
