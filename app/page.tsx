'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Search, Cpu, Database, HardDrive, Layers, Globe, Shield, 
  Activity, Briefcase, HelpCircle, Mail, ExternalLink, Lock, CheckCircle2, ChevronRight, HelpCircle as HelpIcon, Sparkles,
  Cloud, Server, Network, Settings, FileCheck, GitBranch, RefreshCw, ChevronLeft, ShoppingBag, Heart, GraduationCap, Building2, Check,
  ChevronDown, ArrowLeft, MapPin, User, Phone
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScreenSwitcher from '../components/ScreenSwitcher';
import { SERVICE_CATEGORIES, CLIENT_LOGOS } from '../lib/db';

const BUSSINESS_SOLUTIONS = [
  {
    title: "Sao lưu & Phục hồi thảm họa",
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
    items: [
      "Pipeline CI/CD an toàn",
      "Quét bảo mật tự động (SAST/DAST)",
      "Hạ tầng dạng mã (IaC)"
    ],
    icon: Settings
  },
  {
    title: "Container hóa ứng dụng",
    items: [
      "Kubernetes quản trị (vOKS)",
      "Container Registry riêng",
      "GitOps & rolling deployment"
    ],
    icon: Layers
  },
  {
    title: "Mạng phân phối nội dung",
    items: [
      "CDN tốc độ cao trong nước",
      "Multi-CDN dự phòng",
      "Tối ưu trải nghiệm UX"
    ],
    icon: Network
  },
  {
    title: "Digital Workplace",
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
    title: "Tài chính-ngân hàng",
    title_en: "Finance & Banking",
    subtitle: "Thiết kế tối ưu theo đặc thù từng kịch bản vận hành",
    desc: "Hạ tầng tính toán tối ưu, bảo mật đa phòng vệ được may đo chuẩn xác để giải quyết triệt để bài toán khó nhất của riêng ngành bạn.",
    desc_en: "Tận dụng giải pháp hạ tầng điện toán đám mây cấp độ cao để đảm bảo tuyệt mật quy trình giao dịch số và nâng cao độ an toàn dữ liệu khách hàng.",
    bullets: [
      "Hạ tầng Cloud an toàn phục vụ giao dịch lớn",
      "Đạt chứng chỉ uy tín PCI DSS Level 1 bảo mật tối đa toàn cầu",
      "Tuân thủ Thông tư 09/2020/TT-NHNN của Ngân hàng Nhà nước"
    ],
    bgGradient: "from-black/90 via-black/60 to-transparent",
    bgPattern: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(13, 18, 34, 0.82)",
    stories: ["BIDV Card", "VietinBank Cloud"],
    products: ["Sovereign Cloud", "High-Perf DB"],
    bottomIcon: Shield,
  },
  {
    id: "ecommerce",
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
    bgPattern: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(16, 17, 26, 0.82)",
    stories: ["MyViettel Sale", "Voso E-Store"],
    products: ["Auto Scaling K8s", "Viettel Premium CDN"],
    bottomIcon: ShoppingBag,
  },
  {
    id: "healthcare",
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
    bgPattern: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(2, 31, 24, 0.85)",
    stories: ["National EHR DB", "Smart Hospital"],
    products: ["Dedicated Cloud", "Secure Storage"],
    bottomIcon: Heart,
  },
  {
    id: "education",
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
    bgPattern: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(17, 14, 32, 0.85)",
    stories: ["Viettel Study", "K12 Online National"],
    products: ["Live-Stream CDN", "High-Bandwidth VM"],
    bottomIcon: GraduationCap,
  },
  {
    id: "government",
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
    bgPattern: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    overlayColor: "rgba(8, 13, 25, 0.85)",
    stories: ["National Identity", "Command Command SOC"],
    products: ["Sovereign Private", "SOC Cyber Security"],
    bottomIcon: Building2,
  }
];

const DATA_CENTERS = [
  {
    id: 'overview',
    name: 'Mạng lưới Toàn quốc',
    tag: 'NATIONWIDE CLOUD MESH',
    desc: 'Viettel IDC hiện sở hữu hệ thống phòng máy trung tâm dữ liệu lớn nhất Việt Nam, được chuẩn hóa đồng bộ theo tiêu chuẩn cao cấp quốc tế Rated 3 - TIA 942.',
    pue: '1.40 (Trung bình)',
    area: '57,250 m²',
    racks: '10,000+ Racks',
    standards: ['Rated 3 TIA-942', 'ISO 27001', 'ISO 27017', 'PCI-DSS v4.0', 'SOC 2 Type II'],
    x: 188,
    y: 130,
    city: 'Toàn quốc',
    image: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201373/TTDL-2_jp8san.png',
    detailSpecs: {
      power: 'Hạ tầng nguồn điện song hành quốc gia kết hợp hệ thống điện dự phòng độc lập UPS 2N+1',
      cooling: 'Công nghệ làm lạnh Chilled Water tuần hoàn thông minh, tối ưu hóa chỉ số PUE hàng đầu Đông Nam Á',
      security: 'Kiểm soát an ninh 6 lớp nghiêm ngặt kết hợp Trung tâm điều vận giám sát độc lập SOC trực 24/7/365',
    }
  },
  {
    id: 'hn',
    name: 'TTDL Hòa Lạc III',
    tag: 'RATED-III STANDARD',
    desc: 'Được thiết kế siêu tối ưu hiệu năng với PUE 1.4, diện tích 6,550 m2 đạt tiêu chuẩn Rated III cao cấp cùng khả năng kiểm soát carbon báo cáo ISO 14064, kiểm soát rủi ro TVRA và bảo mật SOC 2 hoàn hảo.',
    pue: '1.40',
    area: '6,550 m²',
    racks: '1,600 Racks',
    standards: ['Rated III', 'ISO 14064', 'TVRA', 'SOC 2 Type II', 'ISO 5001'],
    x: 188,
    y: 130,
    city: 'Hà Nội',
    image: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201714/banner2_eiuoqr.png',
    detailSpecs: {
      power: 'Công suất nguồn 2N+1 UPS dự phòng liên tục',
      cooling: 'In-Row Cooling chính xác cao tiết kiệm năng lượng',
      security: 'Kiểm soát ra vào sinh trắc học 6 lớp bảo mật tuyệt mật',
    }
  },
  {
    id: 'dn',
    name: 'TTDL Đà Nẵng',
    tag: 'REGIONAL GREEN NODE',
    desc: 'Bảo bối hạ tầng kỹ thuật đắc thủy miền Trung Việt Nam, thiết kế kháng chấn bão nhiệt đới cấp độ siêu quy chuẩn và kết nối trực tiếp đến các nhà mạng cáp quốc tế tại cáp quang biển.',
    pue: '1.45',
    area: '3,200 m²',
    racks: '800 Racks',
    standards: ['Rated III', 'ISO 27001', 'PCI-DSS v4.0', 'SOC 1'],
    x: 244,
    y: 285,
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Cấp điện kép song lập từ 2 trạm biến áp trung thế',
      cooling: 'Chilled Water làm lạnh chìm thông minh thích ứng khí hậu',
      security: 'Camera giám sát góc quét AI thời gian thực trực SOC 24/7',
    }
  },
  {
    id: 'bd',
    name: 'TTDL Bình Dương',
    tag: 'HYPERSCALE TECH HUB',
    desc: 'Tổ hợp siêu trung tâm dữ liệu thế hệ mới phía Nam với quy mô hàng chục nghìn mét vuông, cung cấp hạ tầng kết nối vượt trội kết hợp các giải pháp làm mát thông minh hàng đầu khu vực.',
    pue: '1.42',
    area: '10,000 m²',
    racks: '2,400 Racks',
    standards: ['Rated III', 'Tier IV Ready', 'ISO 14001', 'ISO 20000'],
    x: 210,
    y: 445,
    city: 'Bình Dương (HCM)',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Hệ thống điện dự phòng độc lập, máy phát điện khởi động < 10 giây',
      cooling: 'Giải pháp làm mát bằng chất lỏng trực tiếp cho dòng HPC chip AI',
      security: 'Zone cách ly vật lý chuẩn quân sự tuần tra nghiêm mật liên tục',
    }
  },
  {
    id: 'hl',
    name: 'TTDL Hòa Lạc I & II',
    tag: 'SECURITY ZONE 6',
    desc: 'Tọa lạc tại Khu Công nghệ cao Hòa Lạc với hệ thống an ninh 6 lớp an toàn tuyệt mật, trực SOC liên tục 24/7/365, đảm bảo SLAs 99.99%.',
    pue: '1.43',
    area: '5,000 m²',
    racks: '1,200 Racks',
    standards: ['Rated III', 'ISO 27001', 'ISO 9001', 'ISO 20000'],
    x: 188,
    y: 125,
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Nguồn điện song hành N+1 cung cấp năng lượng tủ rack không gián đoạn',
      cooling: 'Giải pháp làm mát điều hòa chính xác Chilled Water tiên tiến toàn cụm',
      security: 'Hệ thống an ninh vật lý vòng ngoài 6 lớp kết hợp nhận dạng thông minh',
    }
  },
  {
    id: 'vp',
    name: 'TTDL Vĩnh Phúc',
    tag: 'HIGH AVAILABILITY NODE',
    desc: 'TTDL được xây dựng hiện đại phục vụ hạ tầng đám mây dự phòng cấp cao vùng kinh tế trọng điểm phía Bắc, sẵn sàng đáp ứng mọi nhu cầu công nghệ mới.',
    pue: '1.43',
    area: '4,500 m²',
    racks: '1,000 Racks',
    standards: ['Rated III', 'ISO 27001', 'ISO 14001'],
    x: 180,
    y: 110,
    city: 'Vĩnh Phúc',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    detailSpecs: {
      power: 'Hệ thống lưu điện UPS 2N bảo vệ liên tục nguồn năng lượng tủ rack',
      cooling: 'Giải pháp thông gió tự nhiên thông minh kết hợp điều hòa luồng gió',
      security: 'Hệ thống camera an ninh giám sát trung tâm BMS kiểm soát chặt chẽ 24/7',
    }
  }
];

const DATACENTER_VIEWS = [
  {
    id: 'overview',
    name: 'Mạng lưới Toàn quốc',
    tag: 'TỔNG QUAN HỆ THỐNG',
    desc: 'Mạng lưới hạ tầng điện toán đám mây thế hệ mới của Viettel IDC, phân bổ chiến lược tại Bắc - Trung - Nam, đáp ứng tiêu chuẩn khắt khe nhất toàn cầu.',
    image: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201373/TTDL-2_jp8san.png',
    type: 'overview',
    thumbnail: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201373/TTDL-2_jp8san.png',
    metrics: [
      { value: '09', unit: 'DC', desc: 'Đạt chuẩn quốc tế Rated 3 - TIA 942' },
      { value: '57.250m2', unit: '', desc: 'Diện tích mặt sàn phòng máy' },
      { value: '350 MW', unit: '', desc: 'Tổng công suất' }
    ]
  },
  {
    id: 'hn',
    name: 'TTDL Hòa Lạc III',
    tag: 'TTDL HÒA LẠC III',
    desc: 'Được thiết kế siêu tối ưu hiệu năng với PUE 1.4, diện tích 6,550 m2 đạt tiêu chuẩn Rated III cao cấp cùng khả năng kiểm soát carbon báo cáo ISO 14064, kiểm soát rủi ro TVRA và bảo mật SOC 2 hoàn hảo.',
    image: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201714/banner2_eiuoqr.png',
    type: 'dc',
    thumbnail: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1782201714/banner2_eiuoqr.png',
    metrics: [
      { value: '1.600', unit: 'RACKS', desc: 'Quy mô tủ rack tiêu chuẩn quốc tế' },
      { value: '1.40', unit: 'PUE', desc: 'Hiệu năng sử dụng điện năng tối ưu' },
      { value: 'RATED-III', unit: 'STANDARD', desc: 'Chứng chỉ khắt khe của quốc tế' }
    ]
  },
  {
    id: 'dn',
    name: 'TTDL Đà Nẵng',
    tag: 'TTDL ĐÀ NẴNG',
    desc: 'Bảo bối hạ tầng kỹ thuật đắc thủy miền Trung Việt Nam, thiết kế kháng chấn bão nhiệt đới cấp độ siêu quy chuẩn và kết nối trực tiếp đến các nhà mạng cáp quốc tế tại cáp quang biển.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22530dd78a?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22530dd78a?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { value: '800', unit: 'RACKS', desc: 'Quy mô phục vụ vùng kinh tế trọng điểm miền Trung' },
      { value: '1.45', unit: 'PUE', desc: 'Hệ thống Chilled Water làm mát xanh' },
      { value: 'RATED-III', unit: 'TIA 942', desc: 'Khả năng vận hành liên tục không gián đoạn' }
    ]
  },
  {
    id: 'bd',
    name: 'TTDL Bình Dương',
    tag: 'TTDL BÌNH DƯƠNG',
    desc: 'Tổ hợp siêu trung tâm dữ liệu thế hệ mới phía Nam với quy mô hàng chục nghìn mét vuông, cung cấp hạ tầng kết nối vượt trội kết hợp các giải pháp làm mát thông minh hàng đầu khu vực.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { value: '2.400', unit: 'RACKS', desc: 'Hạ tầng kết nối mật độ siêu cao' },
      { value: '1.42', unit: 'PUE', desc: 'Giải pháp làm mát thông minh bằng chất lỏng' },
      { value: 'TIER-IV', unit: 'READY', desc: 'Chuẩn độc lập an toàn bảo mật cao nhất' }
    ]
  },
  {
    id: 'hl',
    name: 'TTDL Hòa Lạc I & II',
    tag: 'TTDL HÒA LẠC I & II',
    desc: 'Tọa lạc tại Khu Công nghệ cao Hòa Lạc với hệ thống an ninh 6 lớp an toàn tuyệt mật, trực SOC liên tục 24/7/365, đảm bảo SLAs 99.99%.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { value: '1.200', unit: 'RACKS', desc: 'Dung lượng phòng máy và dự phòng cấp cao' },
      { value: '1.43', unit: 'PUE', desc: 'Kiểm soát vi khí hậu khu vực liên tục' },
      { value: 'RATED-III', unit: 'TIA 942', desc: 'Trung tâm dữ liệu lịch sử uy tín hàng đầu' }
    ]
  },
  {
    id: 'vp',
    name: 'TTDL Vĩnh Phúc',
    tag: 'TTDL VĨNH PHÚC',
    desc: 'TTDL mới nhất, đáp ứng các tiêu chuẩn cao cấp, hỗ trợ hạ tầng cho các nhu cầu công nghệ mới.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    type: 'dc',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80',
    metrics: [
      { value: '1.000', unit: 'RACKS', desc: 'Dung lượng phòng máy và dự phòng cấp cao' },
      { value: '1.43', unit: 'PUE', desc: 'Kiểm soát vi khí hậu khu vực liên tục' },
      { value: 'RATED-III', unit: 'TIA 942', desc: 'Trung tâm dữ liệu lịch sử uy tín hàng đầu' }
    ]
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
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80",
    desc: "Đạt chuẩn quốc tế cao nhất về thiết kế, vận hành hạ tầng trung tâm dữ liệu dự phòng kép bảo mật."
  },
  {
    title: "An toàn thông tin",
    tag: "ISO 27001",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80",
    desc: "Hệ thống quản lý bảo mật thông tin toàn diện và nghiêm ngặt nhất thế giới."
  },
  {
    title: "Bảo mật thanh toán",
    tag: "PCI-DSS",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=300&q=80",
    desc: "Đảm bảo an toàn dữ liệu và tuân thủ tuyệt đối cho các giao dịch tài chính, thanh toán số."
  },
  {
    title: "Quản lý năng lượng",
    tag: "ISO 50001",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=300&q=80",
    desc: "Hệ thống quản lý năng lượng xanh tối ưu, giảm thiểu tối đa khí thải các-bon ra môi trường."
  },
  {
    title: "Quản lý chất lượng",
    tag: "ISO 9001",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80",
    desc: "Kiểm soát quy trình cung cấp dịch vụ xuất sắc, đảm bảo sự hài lòng tuyệt đối của khách hàng."
  },
  {
    title: "Dịch vụ CNTT",
    tag: "ISO 20000",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=300&q=80",
    desc: "Tiêu chuẩn quản lý chất lượng dịch vụ CNTT chuẩn xác và nâng cao chất lượng liên tục."
  },
  {
    title: "Bảo mật đám mây",
    tag: "ISO 27017",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=300&q=80",
    desc: "Xác thực bảo mật hạ tầng Cloud và phòng tránh mọi nguy cơ mất an toàn thông tin đám mây."
  },
  {
    title: "Bảo vệ thông tin cá nhân",
    tag: "ISO 27018",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=300&q=80",
    desc: "Hành lang pháp lý chuẩn hóa bảo mật thông tin cá nhân trên môi trường public cloud."
  },
  {
    title: "Kinh doanh liên tục",
    tag: "ISO 22301",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80",
    desc: "Khôi phục thảm họa, đảm bảo hoạt động kinh doanh diễn ra xuyên suốt không gián đoạn."
  },
  {
    title: "Bảo mật y tế",
    tag: "HIPAA COMPLIANT",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80",
    desc: "Tiêu chuẩn khắt khe về bảo vệ thông tin sức khỏe và hồ sơ bệnh án điện tử số hóa."
  }
];

const AWARDS_DATA = [
  {
    title: "Nhà cung cấp dịch vụ Cloud",
    tag: "FROST & SULLIVAN",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=300&q=80",
    desc: "Được vinh danh là Nhà cung cấp dịch vụ Đám mây xuất sắc nhất năm tại Việt Nam."
  },
  {
    title: "Doanh nghiệp Chuyển đổi số",
    tag: "VIETNAM DIGITAL AWARDS",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80",
    desc: "Được ghi nhận là đơn vị tiên phong kiến tạo các nền tảng chuyển đổi số quốc gia."
  },
  {
    title: "Dịch vụ Cloud xuất sắc",
    tag: "SAO KHUÊ 2023",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&q=80",
    desc: "Sản phẩm Viettel Cloud Server xuất sắc đạt điểm tuyệt đối từ hội đồng bình chọn."
  },
  {
    title: "Giải Kinh doanh quốc tế",
    tag: "STEVIE AWARDS",
    image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&w=300&q=80",
    desc: "Đạt giải vàng Stevie Awards cho hệ thống hạ tầng trung tâm dữ liệu hiện đại Hòa Lạc III."
  },
  {
    title: "DN Công nghệ số xuất sắc",
    tag: "BỘ THÔNG TIN & TRUYỀN THÔNG",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=300&q=80",
    desc: "Bằng khen đơn vị có thành tích xuất sắc đóng góp vào sự phát triển công nghệ nước nhà."
  },
  {
    title: "Top 10 Doanh nghiệp CNTT",
    tag: "VINASA",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&q=80",
    desc: "Liên tiếp lọt top doanh nghiệp cung cấp hạ tầng số và đám mây lớn nhất Việt Nam."
  },
  {
    title: "Đối tác Đám mây Sáng tạo",
    tag: "QUALCOMM ACCELERATE",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80",
    desc: "Giải thưởng hợp tác quốc tế đột phá về tăng tốc trí tuệ nhân tạo trên đám mây."
  },
  {
    title: "Thương hiệu Quốc gia VN",
    tag: "HỘI ĐỒNG THƯƠNG HIỆU",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80",
    desc: "Thương hiệu quốc gia duy nhất trong lĩnh vực Trung tâm dữ liệu và Điện toán đám mây."
  },
  {
    title: "Sản phẩm Công nghệ xanh",
    tag: "VIETNAM GREEN IT",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=300&q=80",
    desc: "Chứng nhận nỗ lực tối ưu năng lượng và bảo vệ môi trường của các TTDL thế hệ mới."
  },
  {
    title: "An ninh thông tin xuất sắc",
    tag: "CYBER SECURITY AWARD",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&q=80",
    desc: "Nhà cung cấp giải pháp bảo mật đám mây và phòng chống tấn công DDoS tốt nhất."
  }
];

function HomepageContent() {
  const searchParams = useSearchParams();
  
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
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeDCIndex, setActiveDCIndex] = useState(0);
  const [showDCModal, setShowDCModal] = useState(false);
  const [selectedDCData, setSelectedDCData] = useState<any>(null);

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
              VIETTEL IDC x QUALCOMM
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans">
              <span className="block md:whitespace-nowrap">Đồng hành cùng doanh nghiệp</span>
              <span className="text-white block md:whitespace-nowrap">Việt Nam đưa AI vào thực chiến</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Hiện thực hóa ý tưởng AI của bạn với sức mạnh từ nền tảng tăng tốc AI của Qualcomm trên hệ sinh thái đám mây của Viettel IDC. Đăng ký tham gia để bắt đầu trải nghiệm hạ tầng chuyên biệt và nhận hỗ trợ kỹ thuật chuyên sâu ngay hôm nay!
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href="/contact" 
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#EE0033] text-white font-bold text-sm tracking-wider rounded-full shadow-[0_4px_14px_rgba(238,0,51,0.4)] transition-all duration-300 hover:bg-[#FF1A4E] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_6px_20px_rgba(238,0,51,0.5)] focus:outline-none focus:ring-2 focus:ring-[#EE0033]/50 focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
              >
                <span>Xem thêm</span>
                <span className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center text-[8px] font-bold group-hover:border-white group-hover:scale-110 transition-all duration-300">
                  ○
                </span>
              </a>
            </div>
            

          </div>
        </div>
      </section>



      {/* SECTION 2: SOCIAL PROOF BAR */}
      <section className="bg-white border-y border-gray-100 py-5 overflow-hidden">
        <div id="social-proof-section" className="ali-container">
          <p className="text-left text-xs font-bold text-gray-400 mb-3 font-sans">
            Thương hiệu được tin dùng bởi các doanh nghiệp hàng đầu Việt nam
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
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className="h-7 md:h-8 max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-105"
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
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className="h-7 md:h-8 max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-105"
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
          
          {/* Header styled exactly like mockup */}
          <div className="text-left w-full space-y-2 mb-10">
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">DANH MỤC TOÀN DIỆN</span>
            <h2 id="services-section-title" className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Danh mục dịch vụ chuẩn quốc tế
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Khám phá hệ sinh thái 10 nhóm giải pháp hạ tầng số đồng bộ, bảo mật và hiệu năng cao hàng đầu từ Viettel IDC.
            </p>
          </div>

          {/* 4 Cards per Row exactly as the mockup */}
          <div className="ali-grid-4">
            {SERVICE_CATEGORIES.slice(0, showAllServices ? undefined : 8).map((cat, i) => {
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
                  className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-gray-200/80 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
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
                        Xem chi tiết
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* VIEW MORE / SHOW LESS BUTTON WITH ULTRA HIGH POLISHED INTERACTION */}
          <div className="flex justify-end pt-8">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 py-3 px-8 rounded-full font-bold text-sm shadow-sm hover:shadow transition-all duration-300 active:scale-95 outline-none cursor-pointer group"
            >
              <span>{showAllServices ? 'Thu gọn danh mục' : 'Xem thêm nhóm dịch vụ'}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${showAllServices ? 'rotate-180 text-[#EE0033]' : 'group-hover:translate-y-0.5 group-hover:text-[#EE0033]'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: 8 BỘ GIẢI PHÁP CAROUSEL */}
      <section className="py-16 bg-white border-b border-gray-100 relative overflow-hidden">
        {/* Subtle grid elements matching design theme */}
        <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        
        <div className="ali-container relative z-10 space-y-12">
          
          {/* Header block with next/prev buttons aligned to the right! */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[#EE0033] font-bold text-xs uppercase tracking-wider block">TỐI ƯU VẬN HÀNH</span>
              <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight md:whitespace-nowrap">
                Giải pháp chuyên sâu cho doanh nghiệp
              </h2>
              <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
                Kiến tạo hạ tầng số an toàn, bảo mật và đáp ứng đầy đủ tiêu chuẩn khắt khe nhất của mọi doanh nghiệp.
              </p>
            </div>
          </div>

          {/* Carousel Track container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {BUSSINESS_SOLUTIONS.map((sol, index) => {
              return (
                <div 
                  key={index}
                  className="min-w-[280px] sm:min-w-[325px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] flex-shrink-0 snap-start bg-white rounded-2xl p-8 flex flex-col justify-between h-[420px] relative overflow-hidden border border-gray-200/80 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer transform-gpu"
                >
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
                  <div className="relative z-10 w-full pb-2">
                    <div className="relative flex items-center h-[42px] w-full">
                      {/* The pill wrapper */}
                      <div className="relative flex items-center bg-white border border-gray-200 rounded-full h-[42px] w-[42px] transition-all duration-300 ease-in-out group-hover:w-[175px] group-hover:border-[#EE0033] overflow-hidden">
                        {/* Text is only visible on hover */}
                        <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap pl-5 text-[13px] font-bold text-gray-900 transition-opacity duration-200 group-hover:delay-150 pointer-events-none">
                          Khám phá ngay
                        </span>
                      </div>
                      {/* The circle overlay on the right */}
                      <div className="absolute left-0 w-[42px] h-[42px] rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#EE0033] pointer-events-none z-10 transition-all duration-300 group-hover:border-[#EE0033] group-hover:translate-x-[133px]">
                        <ArrowRight className="w-5 h-5 text-[#EE0033] stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 pt-2">
            {[0, 1].map((idx) => (
              <button 
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardElement = scrollRef.current.firstElementChild as HTMLElement;
                    const cardWidth = cardElement ? cardElement.offsetWidth + 24 : 0;
                    scrollRef.current.scrollTo({
                      left: idx * (cardWidth * 4),
                      behavior: 'smooth'
                    });
                    setActiveDot(idx);
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDot === idx ? 'w-6 bg-[#EE0033]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: GIẢI PHÁP ĐA LĨNH VỰC - SYSTEM CLOUD SCENARIOS */}
      <section className="py-16 text-gray-950 overflow-hidden relative border-t border-gray-100">
        {/* Real-world high aesthetic background image requested by user */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1782045831/BANNER_zvcj7o.png')` }}
        />
        {/* Abstract dark tech dots or stripes in background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(238,0,51,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
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

        {/* FULL BLEED MULTI-CARD VERTICAL EXPANDING ACCORDION (Matches screenshot style perfectly) */}
        <div className="ali-container my-8 relative z-10 text-gray-950">
          
          {/* Desktop view: side-by-side horizontal cards with dynamic flexible widths */}
          <div className="hidden md:flex flex-row gap-4 h-[490px] w-full relative">
            {INDUSTRIES_DATA.map((item, index) => {
              const isActive = activeIndustry === index;
              const IconComponent = item.bottomIcon;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndustry(index)}
                  onClick={() => setActiveIndustry(index)}
                  className={`relative h-full rounded-xl overflow-hidden transition-all duration-700 ease-out border cursor-pointer select-none group min-w-0 ${
                    isActive 
                      ? "flex-[3.2] border-[#EE0033]/20" 
                      : "flex-1 border-white/5 hover:flex-[1.1] hover:border-white/10"
                  }`}
                >
                  {/* High quality background image corresponding to the service */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.bgPattern}')` }}
                  />

                  {/* Gradient overlay: fading from 80% black at the top to transparent at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[1]" />

                  {/* Main card interface interior with absolute/relative positioning for high control */}
                  <div className="relative z-10 p-7 md:p-8 h-full flex flex-col justify-between items-start w-full">
                    
                    {isActive ? (
                      // ACTIVE EXPANDED VIEW LAYOUT
                      <div className="absolute inset-7 md:inset-8 flex flex-col justify-between items-start text-left">
                        {/* Title & Description & Bullets */}
                        <div className="space-y-4 max-w-xl">
                          <h2 className="text-2.5xl text-white font-bold tracking-tight leading-tight">
                            {item.title}
                          </h2>

                          {/* Dynamic Paragraph narrative */}
                          <p className="text-[12.5px] font-normal text-white/85 leading-relaxed max-w-lg mt-1">
                            {item.desc}
                          </p>

                          {/* Bullet points styled as list items with custom checks */}
                          <div className="space-y-3 pt-3 max-w-lg">
                            {item.bullets.slice(0, 3).map((bullet, idx) => (
                              <div key={idx} className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full border border-white/55 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-2.5 h-2.5 text-white stroke-[4.5]" />
                                </span>
                                <span className="text-[12.5px] font-medium text-white/95 leading-normal">
                                  {bullet}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Red capsule button positioned at bottom left of active card */}
                        <div className="mt-auto">
                          <button className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#EE0033] hover:bg-[#CC002B] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95">
                            <span>Tìm hiểu thêm</span>
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#EE0033]">
                              <ArrowRight className="w-3 h-3 stroke-[3]" />
                            </div>
                          </button>
                        </div>
                      </div>
                    ) : (
                      // INACTIVE COLLAPSED VIEW LAYOUT - matching mockup with increased icon/circle sizes
                      <div className="absolute inset-7 md:inset-8 flex flex-col justify-between items-start text-left">
                        {/* Title at the top-left */}
                        <h2 className="text-xl md:text-2xl text-white font-bold tracking-tight leading-tight break-words max-w-[150px]">
                          {item.title}
                        </h2>

                        {/* Domain-specific Icon in circled white-outline at bottom center (increased sizes) */}
                        <div className="mt-auto w-full flex justify-center pb-2">
                          <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center text-white/95 bg-black/40 backdrop-blur-xs group-hover:scale-110 group-hover:border-white transition-all duration-300">
                            <IconComponent className="w-7 h-7 text-white stroke-[1.5]" />
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile view: Stacked collapsible accordion blocks for tactile usability */}
          <div className="flex md:hidden flex-col gap-3.5 w-full">
            {INDUSTRIES_DATA.map((item, index) => {
              const isActive = activeIndustry === index;
              const IconComponent = item.bottomIcon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndustry(index)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-500 border ease-out cursor-pointer select-none ${
                    isActive 
                      ? "h-[360px] border-[#EE0033]/40" 
                      : "h-[80px] border-white/5"
                  }`}
                >
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.bgPattern}')` }}
                  />

                  {/* Gradient overlay: fading from 80% black at the top to transparent at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[1]" />

                  {/* Inner relative content */}
                  <div className="relative z-10 p-5 h-full flex flex-col justify-between items-start w-full">
                    
                    <div className="w-full flex justify-between items-center gap-2">
                      <div className="space-y-0.5">
                        <h2 className="text-base text-white font-extrabold leading-tight">
                          {item.title}
                        </h2>
                      </div>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isActive ? "border-white/20 bg-white/10 text-white" : "border-white/10 text-white/40"
                      }`}>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {isActive && (
                      <div className="w-full space-y-4 animate-fade-in mt-2 flex-grow flex flex-col justify-end">
                        <p className="text-[11.5px] text-white/90 leading-relaxed bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-white/5">
                          {item.desc}
                        </p>
                        
                        {/* Red capsule button on mobile active as well */}
                        <div className="flex items-center justify-between">
                          <button className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EE0033] text-white text-[10px] font-bold uppercase tracking-wider">
                            <span>Tìm hiểu</span>
                            <ArrowRight className="w-3 h-3 text-white" />
                          </button>
                          
                          <div className="flex items-center gap-2 pt-1">
                            <IconComponent className="w-4 h-4 text-[#EE0033]" />
                            <span className="text-[9px] font-mono text-white/55 uppercase tracking-widest">Viettel Cloud Standard</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

        </div>


      </section>

      {/* SECTION: NETWORK OF DATA CENTERS (MẠNG LƯỚI TRUNG TÂM DỮ LIỆU) */}
      <section id="datacenter-network-section" className="bg-white py-16 relative overflow-hidden">
        <div className="ali-container relative z-10">
          
          {/* Section Header */}
          <div className="text-left space-y-2.5 max-w-3xl mb-8">
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">
              HẠ TẦNG SỐ KHẮT KHE NHẤT
            </span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Hệ thống Trung tâm Dữ liệu chuẩn quốc tế toàn quốc
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Mạng lưới hạ tầng điện toán đám mây thế hệ mới của Viettel IDC, phân bổ chiến lược tại các vùng kinh tế trọng điểm, đáp ứng tiêu chuẩn khắt khe nhất toàn cầu.
            </p>
          </div>

          {/* Interactive Stats Panel - Redesigned to match mockup */}
          <div className="w-full h-[600px] relative rounded-[32px] overflow-hidden border border-neutral-800 flex items-center mb-4" 
               style={{ backgroundImage: `url(${DATACENTER_VIEWS[activeDCIndex].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            
            {/* Dark gradient overlay covering left 2/3 with 80% to 0% opacity */}
            <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/80 to-transparent z-0" />
            
            <div className="relative z-10 p-12 max-w-2xl text-white space-y-6">
              <h2 className="text-5xl font-extrabold">
                {DATACENTER_VIEWS[activeDCIndex].name}
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                {DATACENTER_VIEWS[activeDCIndex].desc}
              </p>
              
              <div className="space-y-4 pt-4">
                <h4 className="text-lg font-semibold text-white">Thông số kỹ thuật:</h4>
                <div className="flex flex-col gap-3">
                  {DATACENTER_VIEWS[activeDCIndex].metrics.map((metric, index) => (
                    <div key={index} className="flex items-baseline gap-2">
                      <span className="font-bold text-lg">{metric.desc}:</span>
                      <span className="text-2xl font-black">{metric.value} {metric.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => {
                  const matchingDC = DATA_CENTERS.find(dc => dc.id === DATACENTER_VIEWS[activeDCIndex].id);
                  if (matchingDC) {
                    setSelectedDCData(matchingDC);
                    setShowDCModal(true);
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-3 border border-white hover:bg-white hover:text-black transition-all rounded-full font-bold text-sm uppercase tracking-wider mt-4"
              >
                <span>Xem chi tiết</span>
              </button>
            </div>
          </div>

          {/* Slider Row of the 5 preview thumbnails matching the mockup */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4.5 mt-0 w-full animate-fadeIn">
            {DATACENTER_VIEWS.map((view, index) => {
              const isActive = activeDCIndex === index;
              return (
                <div
                  key={view.id}
                  id={`dc-view-card-${view.id}`}
                  onClick={() => {
                    setActiveDCIndex(index);
                    const matchingDC = DATA_CENTERS.find(dc => dc.id === view.id);
                    if (matchingDC) {
                      setSelectedDCData(matchingDC);
                    }
                  }}
                  className={`group relative overflow-hidden aspect-[16/10.5] w-full rounded-2xl cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'ring-2 ring-[#EE0033] shadow-[0_8px_25px_rgba(238,0,51,0.25)] scale-[1.02]' 
                      : 'border border-gray-200/80 hover:border-gray-400 hover:shadow-sm'
                  }`}
                >
                  <img 
                    src={view.thumbnail} 
                    alt={view.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  {/* Backdrop Filter */}
                  <div className="absolute inset-0 bg-neutral-950/25 group-hover:bg-neutral-950/15 transition-colors duration-300" />
                  
                  {/* Interactive Red Capsule Badge at bottom left */}
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#EE0033] text-white text-[8px] md:text-[9.5px] font-extrabold uppercase tracking-wide rounded-md shadow-md leading-none whitespace-nowrap">
                    {view.tag}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Slide Navigation Pagination and Detailed Modal trigger aligned bottom */}
          <div className="hidden sm:flex items-center justify-between mt-4">
            
            {/* Left Action Button to open fully detailed specs if specific center selected */}
            {activeDCIndex > 0 ? (
              <button
                id="btn-active-spec-trigger"
                onClick={() => {
                  const matchingDC = DATA_CENTERS.find(dc => dc.id === DATACENTER_VIEWS[activeDCIndex].id);
                  if (matchingDC) {
                    setSelectedDCData(matchingDC);
                    setShowDCModal(true);
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE0033] hover:bg-[#D0002D] active:scale-95 text-white font-extrabold tracking-wider rounded-full text-xs transition-all uppercase outline-none cursor-pointer shadow-md"
              >
                <span>Xem Chi Tiết {DATACENTER_VIEWS[activeDCIndex].name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div />
            )}

            {/* Right Pagination Controllers */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-black tracking-widest text-gray-400 uppercase mr-1">
                0{activeDCIndex + 1} / 0{DATACENTER_VIEWS.length} VIEWS
              </span>
              
              <button
                id="btn-view-prev"
                onClick={() => setActiveDCIndex((prev) => (prev - 1 + DATACENTER_VIEWS.length) % DATACENTER_VIEWS.length)}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#EE0033] hover:border-[#EE0033] active:scale-95 transition-all outline-none cursor-pointer shadow-sm"
                aria-label="Previous view"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                id="btn-view-next"
                onClick={() => setActiveDCIndex((prev) => (prev + 1) % DATACENTER_VIEWS.length)}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#EE0033] hover:border-[#EE0033] active:scale-95 transition-all outline-none cursor-pointer shadow-sm"
                aria-label="Next view"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* New Standards & Awards Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-b border-gray-100">
        <div className="ali-container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="text-left space-y-2">
              <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">UY TÍN ĐƯỢC KIỂM CHỨNG</span>
              <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
                Tiêu chuẩn & Giải thưởng quốc tế
              </h2>
              <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
                Viettel IDC nắm giữ các chứng nhận quốc tế hàng đầu và liên tiếp được vinh danh bởi các tổ chức uy tín toàn cầu — minh chứng vững chắc cho chất lượng hạ tầng và dịch vụ.
              </p>
            </div>

            {/* Controls Row */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200/50">
                <button 
                  onClick={() => setActiveCertTab('cert')}
                  className={`font-bold py-2 px-5 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                    activeCertTab === 'cert' 
                      ? 'bg-[#EE0033] text-white shadow-none' 
                      : 'text-gray-500 hover:text-gray-900 bg-transparent'
                  }`}
                >
                  Chứng nhận
                </button>
                <button 
                  onClick={() => setActiveCertTab('award')}
                  className={`font-bold py-2 px-5 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                    activeCertTab === 'award' 
                      ? 'bg-[#EE0033] text-white shadow-none' 
                      : 'text-gray-500 hover:text-gray-900 bg-transparent'
                  }`}
                >
                  Giải thưởng
                </button>
              </div>
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
                  className="bg-white p-5 rounded-2xl border border-gray-200/80 flex flex-col h-full hover:border-[#EE0033] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                >
                  {/* Top Row: Image & Tag */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100/60 shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
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

          <div className="mt-10 text-right">
            <a href="#" className="text-[#EE0033] font-bold inline-flex items-center gap-1 hover:underline text-sm">
              Xem toàn bộ {activeCertTab === 'cert' ? 'chứng nhận' : 'giải thưởng'} <ChevronRight className="w-4 h-4" />
            </a>
          </div>

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
                    className="bg-white border border-gray-100 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer text-center h-[140px] w-[160px] md:w-[180px] flex-shrink-0"
                    title={`${partner.name} - ${partner.role}`}
                  >
                    {/* Brand Logo Container */}
                    <div className="w-full h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <img 
                        src={partner.logoUrl} 
                        alt={partner.name}
                        className="max-w-[85%] max-h-[85%] object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        referrerPolicy="no-referrer"
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
              className="relative bg-white text-gray-900 w-full max-w-2xl rounded-2xl md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden z-10 border border-gray-100 flex flex-col"
            >
              {/* Image banner inside details */}
              <div className="relative h-48 md:h-56 bg-neutral-900 overflow-hidden shrink-0">
                <img 
                  src={selectedDCData.image} 
                  alt={selectedDCData.name} 
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
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Tổng diện tích sàn</span>
                    <span className="text-base font-black text-gray-900 font-sans block">{selectedDCData.area}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Quy mô tải trọng</span>
                    <span className="text-base font-black text-gray-900 font-sans block">{selectedDCData.racks}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center space-y-1 col-span-2 sm:col-span-1">
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
                  className="px-5 py-2.5 bg-white border border-gray-250 hover:bg-gray-50 rounded-full text-xs font-bold font-sans tracking-wide transition-all uppercase outline-none cursor-pointer"
                >
                  Đóng lại
                </button>
                <Link
                  href="/contact"
                  onClick={() => setShowDCModal(false)}
                  className="px-6 py-2.5 bg-[#EE0033] hover:bg-[#CC002B] text-white rounded-full text-xs font-bold font-sans tracking-wide transition-all uppercase inline-flex items-center gap-1.5 hover:-translate-y-0.5 shadow-sm active:translate-y-0 cursor-pointer"
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
      <section id="consultation-form-section" className="relative py-20 lg:py-28 bg-gradient-to-br from-[#8A001A] via-[#660011] to-[#3B0007] overflow-hidden text-white font-sans">
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
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl text-neutral-900 max-w-lg mx-auto lg:ml-auto relative border border-neutral-100">
                
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
                          className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
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
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
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
                            className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] transition-all font-medium placeholder-neutral-400"
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
                          className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#EE0033] focus:border-[#EE0033] appearance-none font-medium transition-all"
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
                      className="w-full bg-[#EE0033] hover:bg-[#D0002A] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#EE0033]/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 text-xs md:text-sm mt-6 cursor-pointer"
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
