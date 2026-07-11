'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Zap, Layers, Activity, Network, Database, Settings, 
  Calculator, Shield, Globe, Check, AlertCircle, Clock, Bell, 
  Phone, BookOpen, Lock, ArrowUpRight, ChevronRight, ChevronDown,
  Server, Cpu, HelpCircle, HardDrive, Box, Eye, BarChart, FileText,
  ArrowRight, RefreshCw
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import { getFallbackServiceData } from '../lib/fallbackServicesData';

interface CustomServiceData {
  title: string;
  subtitle: string;
  badge: string;
  desc: string;
  bgImage: string;
  iconBgClass: string;
  iconColorClass: string;
  stats: { label: string; value: string; desc: string }[];
  advantages: { title: string; desc: string; icon: React.ReactNode }[];
  platformTitle: string;
  platformDesc: string;
  platforms: {
    id: string;
    name: string;
    desc: string;
    specs: string[];
  }[];
  pricingPlans: {
    id: string;
    name: string;
    badge: string;
    tag: string;
    price: string;
    period: string;
    specs: string[];
    featured: boolean;
  }[];
  customConfigTitle: string;
  customConfigDesc: string;
  features: {
    title: string;
    desc: string;
    icon: React.ReactNode;
  }[];
  useCases: {
    title: string;
    desc: string;
    metrics: string;
    icon: React.ReactNode;
  }[];
  faqs: { q: string; a: string }[];
}

interface ViettelCustomServicePageProps {
  slug: string;
}

export default function ViettelCustomServicePage({ slug }: ViettelCustomServicePageProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Router-like state scroll helper
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 80; // subnav offset buffer
      const sections = ['overview', 'pricing', 'features', 'benefits', 'platform-selector', 'use-cases', 'faq'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveTab(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const subnavHeight = 56;
      const offsetPosition = element.offsetTop - subnavHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  // Content databases based on Slug
  const getServiceData = (): CustomServiceData => {
    switch (slug) {
      case 'viettel-private-cloud':
        return {
          title: 'Viettel Private Cloud',
          subtitle: 'Hạ tầng điện toán đám mây dùng riêng tối cao cho doanh nghiệp',
          badge: 'DOANH NGHIỆP · VMware Software-Defined Data Center',
          desc: 'Giải pháp đám mây dùng riêng được thiết kế, xây dựng và vận hành độc lập. Đảm bảo an toàn bảo mật tuyệt đối, tuân thủ tiêu chuẩn khắt khe và toàn quyền kiểm soát tài nguyên phần cứng.',
          bgImage: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png',
          iconBgClass: 'bg-red-50',
          iconColorClass: 'text-[#EE0033]',
          stats: [
            { label: 'SLA Dịch Vụ', value: '✓ 99.99%', desc: 'Cam kết chất lượng cao nhất' },
            { label: 'Cơ Chế Dự Phòng', value: '⚡ Active-Active', desc: 'Không gián đoạn hoạt động' },
            { label: 'Ảo Hóa', value: '💎 VMware SDDC', desc: 'Hạ tầng toàn diện' },
            { label: 'Bảo Mật', value: '🔒 ISO 27017', desc: 'An toàn dữ liệu tuyệt đối' }
          ],
          advantages: [
            { title: 'Toàn quyền kiểm soát tài nguyên', desc: 'Tài nguyên vCPU, RAM, Storage biệt lập vật lý và ảo hóa 100%, không bị ảnh hưởng bởi hành vi của khách hàng khác.', icon: <Layers className="w-5 h-5" /> },
            { title: 'Tối ưu bảo mật đa phân vùng', desc: 'Xây dựng phân vùng mạng LAN độc lập kết nối an toàn bảo mật với hệ thống tường lửa cứng thế hệ mới (Next-Gen Firewall).', icon: <Shield className="w-5 h-5" /> },
            { title: 'Tích hợp vCloud Director', desc: 'Giao diện quản lý trực quan tự phục vụ (Self-service portal) cho phép tạo, quản lý và vận hành máy chủ, mạng ảo linh hoạt.', icon: <Settings className="w-5 h-5" /> },
            { title: 'Dữ liệu chủ quyền lưu trữ tại VN', desc: 'Đặt tại các TTDN chuẩn Rated 3 TIA-942 trong nước của Viettel, tuân thủ hoàn toàn 100% Luật An ninh mạng.', icon: <Globe className="w-5 h-5" /> }
          ],
          platformTitle: 'Hạ tầng ảo hóa hàng đầu',
          platformDesc: 'Chọn kiến trúc nền tảng tối ưu nhất cho hiệu năng quản trị doanh nghiệp của bạn.',
          platforms: [
            { id: 'vmware', name: 'VMware Cloud Provider', desc: 'Nền tảng chuẩn hóa doanh nghiệp toàn cầu', specs: ['Hỗ trợ vSphere Enterprise Plus', 'Tích hợp vCloud Director quản trị trực quan', 'Cơ chế NSX-T định nghĩa mạng thông minh', 'Dễ dàng di chuyển từ On-premise VMware'] },
            { id: 'custom', name: 'Dedicated Resource Pool', desc: 'Tùy biến tài nguyên độc quyền cấp độ host', specs: ['Hạ tầng server chuyên dụng HP/Dell', 'Hỗ trợ SAN Storage SSD SAS tốc độ cao', 'Cam kết băng thông mạng không chia sẻ', 'Có thể nâng cấp CPU/RAM nóng (Hot-add)'] }
          ],
          pricingPlans: [
            { id: 'p1', name: 'Private Bronze', badge: 'MÔI TRƯỜNG DEV/TEST', tag: 'Private SDDC S', price: '8.500.000', period: 'Tháng', specs: ['16 vCPU Cores Intel Xeon Gold', '64 GB RAM DDR4 ECC', '2.000 GB Enterprise SSD SAS', 'Mạng 1 Gbps LAN biệt lập', '1 IP Public WAN miễn phí', 'Hỗ trợ kỹ thuật 24/7/365'], featured: false },
            { id: 'p2', name: 'Private Silver', badge: 'DOANH NGHIỆP PHỔ BIẾN', tag: 'PHỔ BIẾN NHẤT', price: '16.200.000', period: 'Tháng', specs: ['32 vCPU Cores Intel Xeon Gold', '128 GB RAM DDR4 ECC', '5.000 GB Enterprise SSD SAS', 'Mạng 2 Gbps LAN biệt lập', '2 IP Public WAN miễn phí', 'Hỗ trợ quản trị hệ thống miễn phí'], featured: true },
            { id: 'p3', name: 'Private Gold', badge: 'HỆ THỐNG SẢN XUẤT LỚN', tag: 'Private SDDC L', price: '31.500.000', period: 'Tháng', specs: ['64 vCPU Cores Intel Xeon Gold', '256 GB RAM DDR4 ECC', '10.000 GB Enterprise SSD SAS', 'Mạng 5 Gbps LAN biệt lập', '5 IP Public WAN miễn phí', 'Cam kết khôi phục thảm họa DRaaS'], featured: false }
          ],
          customConfigTitle: 'Cấu hình Private Cloud quy mô lớn hơn?',
          customConfigDesc: 'Nếu hệ thống của bạn yêu cầu hàng trăm CPU cores, hàng Terabyte RAM và dung lượng SAN Storage khổng lồ, vui lòng liên hệ đội ngũ chuyên gia của Viettel IDC để được khảo sát và may đo giải pháp phù hợp nhất.',
          features: [
            { title: 'Ảo hóa tính toán chuyên sâu', desc: 'Hỗ trợ công nghệ VMware vSphere cấp độ doanh nghiệp giúp phân bổ CPU và bộ nhớ thông minh, tối ưu hóa năng suất hoạt động.', icon: <Cpu className="w-5 h-5" /> },
            { title: 'Lưu trữ đám mây hợp nhất', desc: 'Cơ chế Storage vMotion cho phép chuyển dịch dữ liệu lưu trữ trực tuyến không cần tắt hệ thống, đảm bảo liên tục dịch vụ.', icon: <HardDrive className="w-5 h-5" /> },
            { title: 'Tường lửa NSX Edge', desc: 'Thiết lập cân bằng tải (Load Balancer), tường lửa bảo mật, định tuyến động NAT/DHCP chỉ trong vài giây thông qua cấu hình phần mềm.', icon: <Shield className="w-5 h-5" /> },
            { title: 'Báo cáo & Giám sát chi tiết', desc: 'Tích hợp vRealize Operations Manager cung cấp biểu đồ trực quan, phân tích hiệu suất và dự báo trước nhu cầu sử dụng tài nguyên.', icon: <Activity className="w-5 h-5" /> }
          ],
          useCases: [
            { title: 'Hạ tầng ERP/CRM doanh nghiệp', desc: 'Triển khai các hệ thống SAP ERP, Oracle CRM cốt lõi đòi hỏi tính sẵn sàng ổn định cao nhất và bảo mật tuyệt đối dữ liệu khách hàng.', metrics: 'Hiệu suất tăng 40%', icon: <Database className="w-5 h-5" /> },
            { title: 'Khách hàng Tài chính - Ngân hàng', desc: 'Đám mây dùng riêng an toàn bảo mật, giúp cách ly lớp mạng vật lý, tuân thủ tiêu chuẩn an ninh thanh toán thẻ PCI-DSS.', metrics: 'Bảo mật 100% cách ly', icon: <Lock className="w-5 h-5" /> },
            { title: 'Dữ liệu y tế và cơ quan Nhà nước', desc: 'Yêu cầu tối cao về chủ quyền dữ liệu trong nước, tuân thủ Luật An ninh mạng và các quy định pháp luật lưu trữ dữ liệu chính phủ.', metrics: '100% Tuân thủ Luật ANM', icon: <Shield className="w-5 h-5" /> }
          ],
          faqs: [
            { q: 'Sự khác biệt lớn nhất giữa Viettel Private Cloud và Public Cloud là gì?', a: 'Với Public Cloud, tài nguyên phần cứng vật lý được chia sẻ (multi-tenant) giữa nhiều khách hàng. Còn với Viettel Private Cloud, doanh nghiệp của bạn sở hữu độc quyền toàn bộ lớp hạ tầng ảo hóa và phần cứng vật lý (single-tenant), cách ly hoàn toàn, mang lại mức độ bảo mật dữ liệu và hiệu năng tối ưu tối cao.' },
            { q: 'Tôi có thể tự quản trị hệ thống Private Cloud này không?', a: 'Có. Viettel IDC cung cấp giao diện quản trị vCloud Director giúp bạn toàn quyền quản lý, khởi tạo, xóa máy chủ ảo và cấu hình mạng. Ngoài ra, chúng tôi có tùy chọn gói "Managed Services" để đội ngũ kỹ sư chuyên gia Viettel IDC thay bạn vận hành 24/7.' },
            { q: 'Hệ thống Private Cloud được triển khai tại trung tâm dữ liệu nào?', a: 'Hạ tầng được vận hành tại các trung tâm dữ liệu đạt chứng chỉ Rated 3 TIA-942 lớn nhất Việt Nam của Viettel tại Hà Nội và Bình Dương, đảm bảo dự phòng nguồn điện kép, làm mát và mạng liên tục không gián đoạn.' }
          ]
        };
      case 'viettel-open-private-cloud':
        return {
          title: 'Viettel Open Private Cloud',
          subtitle: 'Hạ tầng điện toán đám mây mã nguồn mở trên nền tảng OpenStack',
          badge: 'LINH HOẠT · OpenStack Cloud Platform',
          desc: 'Nền tảng điện toán đám mây dùng riêng trên kiến trúc OpenStack chuẩn quốc tế. Cung cấp khả năng điều phối bằng API mạnh mẽ, tự động hóa linh hoạt và tối ưu hóa tối đa chi phí đầu tư.',
          bgImage: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png',
          iconBgClass: 'bg-emerald-50',
          iconColorClass: 'text-[#10B981]',
          stats: [
            { label: 'Hệ điều hành ảo', value: '🌐 KVM Hypervisor', desc: 'Tốc độ phản hồi cực nhanh' },
            { label: 'Quản trị', value: '⚡ API-Driven', desc: 'Tương thích 100% API OpenStack' },
            { label: 'Ảo hóa mạng', value: '🛡️ Open vSwitch SDN', desc: 'Bảo mật linh hoạt' },
            { label: 'Chi phí bản quyền', value: '💰 0 VNĐ', desc: 'Tiết kiệm tối đa chi phí' }
          ],
          advantages: [
            { title: 'Không khóa nhà cung cấp', desc: 'Tránh hoàn toàn việc bị phụ thuộc bản quyền vào một nhà phát triển phần mềm cụ thể (No vendor lock-in), tự do chuyển dịch hạ tầng.', icon: <Globe className="w-5 h-5" /> },
            { title: 'Quản lý bằng code (IaC)', desc: 'Tương thích hoàn hảo với các công cụ Devops hàng đầu thế giới như Terraform, Ansible để tự động hóa triển khai hạ tầng.', icon: <FileText className="w-5 h-5" /> },
            { title: 'Tối ưu chi phí bản quyền', desc: 'Tiết kiệm lên tới 50% chi phí so với VMware nhờ sử dụng công nghệ ảo hóa mã nguồn mở KVM tiên tiến, ổn định và mạnh mẽ.', icon: <Calculator className="w-5 h-5" /> },
            { title: 'Cơ chế lưu trữ phân tán Ceph', desc: 'Hạ tầng lưu trữ SDS (Software-Defined Storage) phân tán đảm bảo an toàn dữ liệu kép và mở rộng dung lượng linh hoạt.', icon: <Database className="w-5 h-5" /> }
          ],
          platformTitle: 'Hệ sinh thái mã nguồn mở toàn cầu',
          platformDesc: 'Vận hành dựa trên các tiêu chuẩn công nghệ Open-source an toàn, minh bạch và mạnh mẽ nhất.',
          platforms: [
            { id: 'openstack', name: 'OpenStack Yoga/Zed Release', desc: 'Phiên bản OpenStack ổn định tối ưu doanh nghiệp', specs: ['Dịch vụ điện toán Nova tính toán mạnh mẽ', 'Dịch vụ mạng Neutron bảo mật SDN', 'Lưu trữ khối Cinder tốc độ cao', 'Giao diện Horizon điều khiển trực quan'] },
            { id: 'ceph', name: 'Ceph Storage Cluster', desc: 'Nền tảng lưu trữ phân tán hiệu năng cao', specs: ['Lưu trữ đối tượng, khối và file thống nhất', 'Cơ chế 3-Replica nhân bản dữ liệu an toàn', 'Tự động phục hồi khi có lỗi ổ cứng', 'Tốc độ IOPS cao tối ưu cơ sở dữ liệu'] }
          ],
          pricingPlans: [
            { id: 'op1', name: 'Open Bronze', badge: 'TIẾT KIỆM TỐI ĐA', tag: 'OpenStack Pool S', price: '9.800.000', period: 'Tháng', specs: ['32 vCPU Cores KVM', '128 GB RAM DDR4 ECC', '3.000 GB Ceph Distributed Storage', 'Mạng 2 Gbps LAN biệt lập', '1 IP Public WAN miễn phí', 'Hỗ trợ kỹ thuật 24/7/365'], featured: false },
            { id: 'op2', name: 'Open Silver', badge: 'PHÙ HỢP DEVOPS', tag: 'PHỔ BIẾN NHẤT', price: '18.500.000', period: 'Tháng', specs: ['64 vCPU Cores KVM', '256 GB RAM DDR4 ECC', '8.000 GB Ceph Distributed Storage', 'Mạng 4 Gbps LAN biệt lập', '2 IP Public WAN miễn phí', 'Tương thích hoàn toàn Terraform API'], featured: true },
            { id: 'op3', name: 'Open Gold', badge: 'DÀNH CHO SAAS/TECH COMPANY', tag: 'OpenStack Pool L', price: '35.800.000', period: 'Tháng', specs: ['128 vCPU Cores KVM', '512 GB RAM DDR4 ECC', '15.000 GB Ceph Distributed Storage', 'Mạng 10 Gbps LAN biệt lập', '5 IP Public WAN miễn phí', 'Hỗ trợ thiết lập CI/CD pipeline miễn phí'], featured: false }
          ],
          customConfigTitle: 'Tùy biến OpenStack Cluster cho doanh nghiệp?',
          customConfigDesc: 'Bạn muốn xây dựng một cụm đám mây OpenStack dùng riêng tích hợp Kubernetes hay cấu hình mạng đặc biệt? Đội ngũ kỹ sư giải pháp giàu kinh nghiệm của Viettel IDC sẵn sàng tư vấn, cấu trúc và vận hành hệ thống cùng bạn.',
          features: [
            { title: 'Tự động co giãn Auto-scaling', desc: 'Tự động thêm hoặc bớt máy chủ ảo dựa trên chỉ số sử dụng thực tế như CPU, RAM giúp ứng dụng không bị nghẽn tải.', icon: <Zap className="w-5 h-5" /> },
            { title: 'Phân vùng mạng ảo hóa SDN', desc: 'Sử dụng công nghệ Open vSwitch linh hoạt, tạo cấu trúc mạng riêng ảo Subnet, tường lửa mềm ACL bảo mật từng phân vùng.', icon: <Network className="w-5 h-5" /> },
            { title: 'Tích hợp Kubernetes trực tiếp', desc: 'Khởi tạo cụm Kubernetes nhanh chóng thông qua dịch vụ OpenStack Magnum, tối ưu hóa quy trình release container.', icon: <Box className="w-5 h-5" /> },
            { title: 'API RESTful toàn diện', desc: 'Quản trị mọi dịch vụ từ khởi tạo, sao lưu, định tuyến qua API REST, đơn giản hóa quy trình tích hợp với hệ thống bên ngoài.', icon: <Settings className="w-5 h-5" /> }
          ],
          useCases: [
            { title: 'Các công ty Công nghệ & Software SaaS', desc: 'Môi trường phát triển và vận hành linh hoạt bậc nhất, dễ dàng deploy hạ tầng tự động qua mã code mà không lo tốn phí bản quyền phần mềm ảo hóa.', metrics: 'Giảm 50% TCO hạ tầng', icon: <Cpu className="w-5 h-5" /> },
            { title: 'Hạ tầng Microservices & Container', desc: 'Nền tảng vững chắc để xây dựng các ứng dụng microservices phân tán lớn, dễ dàng tích hợp Kubernetes, CI/CD Jenkins/Gitlab.', metrics: 'Deploy nhanh gấp 5 lần', icon: <Box className="w-5 h-5" /> },
            { title: 'Hệ thống xử lý Dữ liệu lớn (Big Data)', desc: 'Vận hành Hadoop, Spark, Kafka hiệu quả nhờ tận dụng công cụ phân bổ tài nguyên mã nguồn mở linh hoạt và hệ lưu trữ phân tán Ceph khổng lồ.', metrics: 'IOPS ổn định > 25,000', icon: <Database className="w-5 h-5" /> }
          ],
          faqs: [
            { q: 'Hạ tầng Open Private Cloud có hỗ trợ giao diện đồ họa không?', a: 'Có. Bên cạnh việc điều khiển qua API hay CLI, chúng tôi cung cấp giao diện quản trị OpenStack Horizon đầy đủ tính năng bằng tiếng Việt/tiếng Anh giúp thao tác trực quan, dễ sử dụng.' },
            { q: 'Chất lượng ảo hóa KVM có ổn định bằng VMware không?', a: 'Ảo hóa KVM là nền tảng cốt lõi của các siêu đám mây hàng đầu toàn cầu (như AWS, Google Cloud). KVM mang lại hiệu năng tính toán xuất sắc, độ phản hồi trễ cực thấp và cực kỳ ổn định trong môi trường tải cao.' },
            { q: 'Viettel IDC hỗ trợ những gì khi tôi sử dụng Open Private Cloud?', a: 'Chúng tôi hỗ trợ tư vấn thiết kế giải pháp mạng, hỗ trợ di dời hệ thống cũ lên đám mây, cam kết uptime SLA 99.95% và bảo trì hệ thống hạ tầng vật lý bên dưới 24/7.' }
          ]
        };
      case 'viettel-cloud-npu':
        return {
          title: 'Viettel Cloud NPU',
          subtitle: 'Đám mây tăng tốc AI Inference hiệu năng cao, tối ưu hóa chi phí',
          badge: 'CÔNG NGHỆ MỚI · Neural Processing Unit Cloud',
          desc: 'Hạ tầng máy chủ ảo được trang bị bộ xử lý thần kinh (NPU) chuyên biệt. Tăng tốc xử lý các tác vụ suy luận trí tuệ nhân tạo (Inference) như nhận dạng hình ảnh, giọng nói, NLP và chatbot với chi phí cực kỳ tiết kiệm.',
          bgImage: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png',
          iconBgClass: 'bg-pink-50',
          iconColorClass: 'text-[#DB2777]',
          stats: [
            { label: 'Kiến Trúc AI', value: '⚡ Tối ưu Inference', desc: 'Chuyên suy luận mô hình AI' },
            { label: 'Chi Phí Vận Hành', value: '💰 Giảm tới 70%', desc: 'So với chạy bằng GPU' },
            { label: 'Khởi Tạo', value: '⏱️ < 5 Phút', desc: 'Tự động trên Portal' },
            { label: 'Kết Nối', value: '🚀 NVLink Băng Thông Lớn', desc: 'Xử lý mượt mà' }
          ],
          advantages: [
            { title: 'Tối ưu chi phí chuyên sâu cho AI', desc: 'NPU được thiết kế tối ưu hóa dành riêng cho các phép tính toán ma trận suy luận AI, mang lại hiệu suất vượt trội và tiết kiệm điện năng hơn GPU.', icon: <Calculator className="w-5 h-5" /> },
            { title: 'Hỗ trợ các Framework AI lớn', desc: 'Tương thích hoàn hảo 100% với các thư viện phổ biến như TensorFlow, PyTorch, Caffe và đặc biệt là định dạng tối ưu ONNX.', icon: <Sparkles className="w-5 h-5" /> },
            { title: 'Độ trễ xử lý cực thấp (Microseconds)', desc: 'Xử lý các dòng dữ liệu trực tiếp theo thời gian thực (Real-time data stream) như phân tích video camera, giọng nói tổng đài tức thì.', icon: <Zap className="w-5 h-5" /> },
            { title: 'Dễ dàng mở rộng cấu hình', desc: 'Khởi tạo linh hoạt từ 1 vNPU Core cho các dự án nhỏ đến hàng chục NPU Cores phục vụ ứng dụng quy mô lớn của doanh nghiệp.', icon: <Layers className="w-5 h-5" /> }
          ],
          platformTitle: 'Bộ xử lý thần kinh thế hệ mới',
          platformDesc: 'Kiến trúc phần cứng được thiết kế dành riêng cho kỷ nguyên trí tuệ nhân tạo đột phá.',
          platforms: [
            { id: 'npu-asic', name: 'AI ASIC / NPU Hardware', desc: 'Chip chuyên dụng tối ưu thuật toán mạng nơ-ron', specs: ['Hỗ trợ tính toán ma trận ma sát thấp', 'Tiêu thụ năng lượng cực thấp, bảo vệ môi trường', 'Băng thông bộ nhớ đệm On-chip siêu rộng', 'Hỗ trợ định dạng số thực thấp FP16, INT8'] },
            { id: 'npu-sdk', name: 'NPU Compiler & SDK Toolkit', desc: 'Bộ công cụ biên dịch mô hình AI lên NPU nhanh chóng', specs: ['Tự động chuyển đổi mô hình PyTorch/TensorFlow', 'Bộ tối ưu hóa lượng tử hóa mô hình (Quantization)', 'Hỗ trợ API Python và C++ thân thiện', 'Hệ thống giám sát hiệu năng sử dụng NPU thực tế'] }
          ],
          pricingPlans: [
            { id: 'n1', name: 'NPU Entry', badge: 'CHO THỬ NGHIỆM AI', tag: 'NPU Instance S', price: '2.200.000', period: 'Tháng', specs: ['1 vNPU Core Dedicated', '8 vCPU Cores Intel Xeon', '16 GB RAM DDR4', '100 GB SSD NVMe Enterprise', 'Băng thông mạng trong nước 200 Mbps', 'Hỗ trợ cài đặt AI Frameworks miễn phí'], featured: false },
            { id: 'n2', name: 'NPU Pro', badge: 'ỨNG DỤNG AI THỰC TẾ', tag: 'PHỔ BIẾN NHẤT', price: '4.100.000', period: 'Tháng', specs: ['2 vNPU Cores Dedicated', '16 vCPU Cores Intel Xeon', '32 GB RAM DDR4', '200 GB SSD NVMe Enterprise', 'Băng thông mạng trong nước 300 Mbps', 'Tích hợp sẵn Docker Container AI'], featured: true },
            { id: 'n3', name: 'NPU Enterprise', badge: 'DỰ ÁN CAMERA / VOICE LỚN', tag: 'NPU Instance L', price: '7.900.000', period: 'Tháng', specs: ['4 vNPU Cores Dedicated', '32 vCPU Cores Intel Xeon', '64 GB RAM DDR4', '400 GB SSD NVMe Enterprise', 'Băng thông mạng trong nước 500 Mbps', 'Hỗ trợ chuyên gia tối ưu mô hình AI'], featured: false }
          ],
          customConfigTitle: 'Yêu cầu Cụm Tính Toán NPU quy mô lớn?',
          customConfigDesc: 'Nếu doanh nghiệp của bạn đang phát triển các mô hình AI nhận diện khuôn mặt đô thị thông minh, tổng đài AI đàm thoại hàng vạn cuộc gọi đồng thời, hãy liên hệ với chúng tôi để xây dựng cụm máy chủ NPU chuyên sâu chuyên biệt.',
          features: [
            { title: 'Tăng tốc thị giác máy tính', desc: 'Xử lý nhận dạng biển số xe, theo dõi đối tượng, phát hiện hành vi bất thường từ hàng trăm luồng camera IP thời gian thực.', icon: <Eye className="w-5 h-5" /> },
            { title: 'Xử lý ngôn ngữ tự nhiên (NLP)', desc: 'Tăng tốc tốc độ sinh từ của Chatbot LLM, phân tích sắc thái văn bản, dịch thuật tự động với tốc độ phản hồi cực nhanh.', icon: <FileText className="w-5 h-5" /> },
            { title: 'Nhận diện & Tổng hợp giọng nói', desc: 'Chuyển đổi văn bản thành giọng nói (TTS) tự nhiên và nhận dạng giọng nói (ASR) độ chính xác cao cho tổng đài tự động.', icon: <Phone className="w-5 h-5" /> },
            { title: 'Tối ưu hóa lượng tử hóa mô hình', desc: 'Chuyển đổi mô hình từ số thực 32-bit sang 8-bit (INT8) giúp tăng tốc độ suy luận gấp 4 lần mà vẫn giữ nguyên độ chính xác.', icon: <BarChart className="w-5 h-5" /> }
          ],
          useCases: [
            { title: 'Đô thị thông minh & Camera giám sát', desc: 'Kết nối hàng nghìn camera an ninh, truyền tải dữ liệu trực tiếp về đám mây và phân tích nhận diện khuôn mặt, đám đông tự động.', metrics: 'Độ trễ xử lý < 10ms', icon: <Eye className="w-5 h-5" /> },
            { title: 'Hệ thống Call Center Voicebot AI', desc: 'Vận hành các trợ lý ảo đàm thoại tự động chăm sóc khách hàng, trả lời thông tin đơn hàng theo thời gian thực mượt mà.', metrics: 'Xử lý 1,000 cuộc gọi cùng lúc', icon: <Phone className="w-5 h-5" /> },
            { title: 'Thương mại điện tử & Gợi ý sản phẩm', desc: 'Suy luận hành vi mua sắm của hàng triệu người dùng trực tuyến để đưa ra gợi ý sản phẩm phù hợp ngay lập tức.', metrics: 'Tăng 15% tỷ lệ chuyển đổi', icon: <Sparkles className="w-5 h-5" /> }
          ],
          faqs: [
            { q: 'NPU khác với GPU như thế nào?', a: 'GPU là bộ xử lý đồ họa đa năng, có thể dùng cả cho đồ họa, training mô hình lẫn suy luận. NPU (Neural Processing Unit) là chip được thiết kế "đo ni đóng giày" riêng cho các phép tính suy luận AI (Inference). NPU hoạt động cực kỳ hiệu quả, xử lý nhanh hơn và tiêu thụ ít điện năng hơn, mang lại chi phí rẻ hơn nhiều so với GPU.' },
            { q: 'Làm thế nào để chuyển mô hình PyTorch của tôi chạy trên NPU?', a: 'Chúng tôi cung cấp sẵn bộ công cụ compiler SDK. Bạn chỉ cần nạp file mô hình (.pt hoặc .onnx) vào công cụ, nó sẽ tự động biên dịch và tối ưu hóa cấu trúc mô hình để chạy mượt mà trên phần cứng NPU.' },
            { q: 'Viettel Cloud NPU có cam kết SLA không?', a: 'Có. Chúng tôi cam kết SLA tính sẵn sàng của máy chủ đạt 99.99% và có đội ngũ chuyên gia công nghệ AI đồng hành hỗ trợ doanh nghiệp tối ưu hóa mô hình.' }
          ]
        };
      case 'viettel-virtual-private-cloud':
        return {
          title: 'Viettel Virtual Private Cloud (VPC)',
          subtitle: 'Phân vùng đám mây dùng riêng ảo hóa, bảo mật tối đa cấp độ mạng',
          badge: 'AN TOÀN · Software-Defined Networking',
          desc: 'Thiết lập phân vùng tài nguyên máy chủ và mạng ảo hóa biệt lập hoàn toàn trên hạ tầng đám mây công cộng của Viettel IDC. Tự do cấu hình địa chỉ IP, chia mạng con, định tuyến và thiết lập tường lửa mềm.',
          bgImage: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png',
          iconBgClass: 'bg-blue-50',
          iconColorClass: 'text-[#2E90FA]',
          stats: [
            { label: 'Cách Ly Mạng', value: '🛡️ L3 SDN Isolation', desc: 'Biệt lập logic hoàn toàn' },
            { label: 'VPN Kết Nối', value: '⚡ IPSec / Leased Line', desc: 'Kết nối mạng an toàn' },
            { label: 'Cấu Hình Mạng', value: '🔧 Tùy biến Subnet', desc: 'Tự do phân chia dải IP' },
            { label: 'Bảo Mật Tường Lửa', value: '🔒 Security Groups', desc: 'Kiểm soát cổng truy cập' }
          ],
          advantages: [
            { title: 'Biệt lập hoàn toàn về logic', desc: 'Mỗi VPC là một dải mạng biệt lập tuyệt đối ở lớp 3 mạng bằng công nghệ SDN. Không một lưu lượng mạng bên ngoài nào có thể xâm nhập nếu không được cấp phép.', icon: <Shield className="w-5 h-5" /> },
            { title: 'Tự do thiết kế cấu trúc mạng', desc: 'Tự thiết lập dải địa chỉ IP (CIDR), tạo mạng con công cộng (Public Subnet) cho Web server và mạng con bảo mật (Private Subnet) cho Database.', icon: <Network className="w-5 h-5" /> },
            { title: 'Kết nối Hybrid Cloud dễ dàng', desc: 'Hỗ trợ kết nối kênh truyền bảo mật cao thông qua VPN IPSec hoặc đường truyền vật lý dùng riêng Leased Line kết nối thẳng về văn phòng của bạn.', icon: <Globe className="w-5 h-5" /> },
            { title: 'Kiểm soát truy cập đa tầng', desc: 'Tích hợp sẵn cơ chế bảo mật kép: Network ACL bảo vệ cấp độ Subnet và Security Group bảo vệ cấp độ từng máy chủ ảo riêng lẻ.', icon: <Lock className="w-5 h-5" /> }
          ],
          platformTitle: 'Hạ tầng mạng định nghĩa bằng phần mềm',
          platformDesc: 'Quản trị toàn bộ hạ tầng mạng phức tạp chỉ bằng vài click chuột trên dashboard điều khiển.',
          platforms: [
            { id: 'sdn-router', name: 'Software-Defined Router & Gateway', desc: 'Hệ thống định tuyến và cổng kết nối ảo mạnh mẽ', specs: ['Hỗ trợ định tuyến tĩnh và định tuyến động BGP', 'NAT Gateway quản lý truy cập Internet ra ngoài an toàn', 'Cổng kết nối Internet (Internet Gateway) chịu tải cao', 'Tích hợp tường lửa chặn lọc gói tin độc hại'] },
            { id: 'hybrid-connect', name: 'Direct Connect & Virtual Private Network', desc: 'Các tùy chọn kết nối đám mây lai an toàn', specs: ['VPN Gateway hỗ trợ IPSec VPN mã hóa mạnh mẽ', 'Direct Connect kết nối vật lý Leased Line băng thông lớn', 'Độ trễ thấp, ổn định vượt trội không gián đoạn', 'Tương thích tốt với mọi thiết bị mạng Cisco, Juniper, Fortinet'] }
          ],
          pricingPlans: [
            { id: 'v1', name: 'VPC Starter', badge: 'DÀNH CHO STARTUP', tag: 'VPC Package S', price: '450.000', period: 'Tháng', specs: ['1 Phân vùng VPC mạng biệt lập', 'Tự do tạo tối đa 3 Subnets', '1 Internet Gateway tốc độ cao', '1 NAT Gateway (Hỗ trợ tối đa 50 VM)', 'Hỗ trợ định tuyến tĩnh', 'Hỗ trợ Security Groups cơ bản'], featured: false },
            { id: 'v2', name: 'VPC Business', badge: 'DOANH NGHIỆP VỪA & LỚN', tag: 'PHỔ BIẾN NHẤT', price: '1.200.000', period: 'Tháng', specs: ['1 Phân vùng VPC mạng biệt lập', 'Tự do tạo tối đa 10 Subnets', '1 Internet Gateway tốc độ cao', '1 NAT Gateway (Không giới hạn VM)', '1 VPN Gateway (Kết nối On-premise)', 'Đầy đủ Network ACL & Security Groups'], featured: true },
            { id: 'v3', name: 'VPC Enterprise', badge: 'HẠ TẦNG HYBRID PHỨC TẠP', tag: 'VPC Package L', price: '3.500.000', period: 'Tháng', specs: ['2 Phân vùng VPC mạng biệt lập', 'Không giới hạn số lượng Subnets', '2 Cổng kết nối Internet Gateway', '2 NAT Gateways cấu hình dự phòng', 'Hỗ trợ Direct Connect Port 10Gbps', 'Hỗ trợ định tuyến động BGP'], featured: false }
          ],
          customConfigTitle: 'Yêu cầu Kiến trúc Mạng Đám mây phức tạp?',
          customConfigDesc: 'Nếu hệ thống của bạn yêu cầu kết nối đa vùng địa lý, thiết lập cụm tường lửa cứng chuyên biệt của Palo Alto/Fortinet, hay định tuyến tải phân tán, hãy để các chuyên gia giải pháp mạng CCIE của Viettel IDC hỗ trợ thiết kế miễn phí.',
          features: [
            { title: 'Địa chỉ IP tĩnh Elastic IP', desc: 'Cung cấp các địa chỉ IP public tĩnh có thể linh hoạt gán từ máy chủ ảo này sang máy chủ ảo khác khi xảy ra sự cố phần mềm.', icon: <Check className="w-5 h-5" /> },
            { title: 'NAT Gateway bảo mật', desc: 'Cho phép các máy chủ trong mạng riêng Private Subnet truy cập ra Internet để cập nhật phần mềm nhưng ngăn chặn hoàn toàn chiều ngược lại.', icon: <Lock className="w-5 h-5" /> },
            { title: 'Tường lửa bảo mật đa tầng', desc: 'Thiết lập các bộ lọc cổng (Port), địa chỉ IP nguồn/đích chi tiết để bảo vệ tuyệt đối các lớp ứng dụng nhạy cảm.', icon: <Shield className="w-5 h-5" /> },
            { title: 'VPC Peering kết nối', desc: 'Kết nối an toàn hai phân vùng VPC khác nhau của bạn thông qua đường truyền nội bộ của Viettel IDC mà không cần đi qua mạng Internet public.', icon: <Network className="w-5 h-5" /> }
          ],
          useCases: [
            { title: 'Ứng dụng Web 3 lớp (3-Tier Web App)', desc: 'Phân tách rõ ràng: Lớp ngoài (Public Subnet) chạy Web Server; lớp giữa (Private Subnet) chạy App Server; lớp trong cùng (Bảo mật cao) chạy Database.', metrics: 'Bảo mật tuyệt đối 3 lớp', icon: <Layers className="w-5 h-5" /> },
            { title: 'Môi trường Hybrid Cloud doanh nghiệp', desc: 'Mở rộng hạ tầng CNTT hiện tại của văn phòng lên mây bằng kênh truyền Leased Line chuyên biệt an toàn, dữ liệu đồng bộ liên tục.', metrics: 'Độ trễ truyền tải < 1ms', icon: <Globe className="w-5 h-5" /> },
            { title: 'Môi trường chạy thử nghiệm độc lập', desc: 'Tạo một phân vùng VPC hoàn toàn độc lập với hệ thống đang vận hành (Production) để đội dev thoải mái thử nghiệm code mới không lo ảnh hưởng.', metrics: 'Cách ly hoàn toàn 100%', icon: <Box className="w-5 h-5" /> }
          ],
          faqs: [
            { q: 'Sử dụng VPC có làm ảnh hưởng tới tốc độ mạng của máy chủ ảo không?', a: 'Không hề. Công nghệ ảo hóa mạng SDN thế hệ mới xử lý gói tin trực tiếp ở cấp độ phần cứng chuyển mạch vật lý, đảm bảo băng thông tối đa của card mạng và độ trễ gần như bằng không.' },
            { q: 'Tôi có thể thay đổi dải IP sau khi đã khởi tạo VPC không?', a: 'Bạn không thể thay đổi dải IP chính (CIDR block) của VPC sau khi khởi tạo, nhưng bạn hoàn toàn có thể tạo thêm các dải IP phụ hoặc chia nhỏ dải IP chính thành các Subnet mới linh hoạt.' },
            { q: 'Tôi có phải trả phí cho lưu lượng truyền tải nội bộ giữa các máy chủ ảo trong cùng VPC không?', a: 'Không. Viettel IDC hoàn toàn miễn phí 100% chi phí truyền tải dữ liệu nội bộ (Data Transfer) giữa các máy chủ ảo nằm trong cùng một phân vùng mạng VPC.' }
          ]
        };
      case 'viettel-dedicated-private-cloud':
        return {
          title: 'Viettel Dedicated Private Cloud',
          subtitle: 'Đám mây dùng riêng thiết lập trên máy chủ vật lý chuyên dụng biệt lập',
          badge: 'ĐỘC QUYỀN · Dedicated Physical Hosts',
          desc: 'Giải pháp đám mây dùng riêng tối cao, vận hành trên cụm máy chủ vật lý Dell/HP chuyên dụng hoàn toàn. Đảm bảo không chia sẻ tài nguyên phần cứng với bất kỳ khách hàng nào khác, triệt tiêu mọi rủi ro an ninh.',
          bgImage: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png',
          iconBgClass: 'bg-gray-100',
          iconColorClass: 'text-gray-700',
          stats: [
            { label: 'Cách Ly Hạ Tầng', value: '🛡️ Biệt lập Vật lý', desc: '100% Dedicated Hardware' },
            { label: 'Uptime Phần Cứng', value: '✓ SLA 99.99%', desc: 'Thay thế thiết bị hỏng cực nhanh' },
            { label: 'Hệ Ảo Hóa', value: '💎 Tự Do Cài Đặt', desc: 'VMware, Nutanix, Hyper-V' },
            { label: 'Bảo Trì Vật Lý', value: '🔧 Viettel IDC Vận Hành', desc: 'Đầy đủ linh kiện dự phòng' }
          ],
          advantages: [
            { title: 'Không chia sẻ tài nguyên vật lý', desc: 'Sở hữu trọn vẹn sức mạnh phần cứng của CPU vật lý, bộ nhớ RAM thực tế và card mạng mạng LAN riêng biệt, không chịu rủi ro "noisy neighbor".', icon: <Server className="w-5 h-5" /> },
            { title: 'Tự do lựa chọn hệ ảo hóa', desc: 'Tự cài đặt và quản trị bất kỳ hệ điều hành hypervisor nào bạn muốn (VMware ESXi, Nutanix AHV, Microsoft Hyper-V, Proxmox) với toàn quyền quản trị.', icon: <Settings className="w-5 h-5" /> },
            { title: 'Tối ưu chi phí bản quyền phần mềm', desc: 'Rất nhiều phần mềm doanh nghiệp (như Oracle Database, SQL Server) tính phí bản quyền dựa trên số lượng Socket vật lý. Dedicated Host giúp bạn tối ưu hóa điều này.', icon: <Calculator className="w-5 h-5" /> },
            { title: 'Đáp ứng tiêu chuẩn khắt khe nhất', desc: 'Giải pháp lý tưởng đáp ứng các quy định khắt khe của Chính phủ, ngành Ngân hàng, chứng khoán về kiểm soát thiết bị vật lý lưu trữ.', icon: <Shield className="w-5 h-5" /> }
          ],
          platformTitle: 'Hạ tầng vật lý chuyên biệt cao cấp',
          platformDesc: 'Toàn bộ trang thiết bị máy chủ được kiểm định nghiêm ngặt trước khi bàn giao độc quyền cho khách hàng.',
          platforms: [
            { id: 'dell-emc', name: 'Dell PowerEdge Enterprise Class', desc: 'Dòng máy chủ chuyên dụng tối ưu mật độ ảo hóa cao', specs: ['Bộ vi xử lý Dual Intel Xeon Gold thế hệ mới nhất', 'Bộ nhớ RAM DDR4 ECC có cơ chế tự sửa lỗi', 'Ổ cứng lưu trữ Enterprise SSD SAS/NVMe RAID 10', 'Card mạng kép 10/25 Gbps hỗ trợ dự phòng cổng kết nối'] },
            { id: 'nutanix-sddc', name: 'Nutanix Hyperconverged Infrastructure', desc: 'Kiến trúc siêu hội tụ tiên tiến cho Private Cloud', specs: ['Tích hợp ảo hóa tính toán và lưu trữ phân tán', 'Dễ dàng mở rộng tuyến tính bằng cách cắm thêm node', 'Hệ điều hành quản trị Prism trực quan, tự động hóa cao', 'Cơ chế khôi phục dữ liệu tự động thông minh'] }
          ],
          pricingPlans: [
            { id: 'd1', name: 'Dedicated Silver', badge: 'DÀNH CHO HỆ THỐNG VỪA', tag: 'Dell PowerEdge Host S', price: '18.500.000', period: 'Tháng', specs: ['Dual Intel Xeon Gold (32 Cores Vật lý)', '256 GB RAM DDR4 ECC', '4.800 GB Enterprise SSD SAS RAID 10', 'Card mạng kép 10 Gbps Active-Active', 'Miễn phí chỗ đặt tại TTDN Rated 3', 'Hỗ trợ thay thế linh kiện lỗi trong < 2 giờ'], featured: false },
            { id: 'd2', name: 'Dedicated Gold', badge: 'PHỔ BIẾN DOANH NGHIỆP', tag: 'PHỔ BIẾN NHẤT', price: '34.000.000', period: 'Tháng', specs: ['Dual Intel Xeon Gold (64 Cores Vật lý)', '512 GB RAM DDR4 ECC', '9.600 GB Enterprise SSD SAS RAID 10', 'Card mạng kép 25 Gbps Active-Active', 'Miễn phí chỗ đặt tại TTDN Rated 3', 'Hỗ trợ kỹ thuật hiện trường 24/7/365'], featured: true },
            { id: 'd3', name: 'Dedicated Platinum', badge: 'HỆ THỐNG CỰC LỚN', tag: 'Dell PowerEdge Host L', price: '62.000.000', period: 'Tháng', specs: ['Dual AMD EPYC (128 Cores Vật lý)', '1.024 GB RAM DDR4 ECC', '19.200 GB NVMe Enterprise SSD', 'Card mạng kép 40 Gbps Active-Active', 'Miễn phí chỗ đặt tại TTDN Rated 3', 'Hệ thống SAN Storage chuyên biệt kèm theo'], featured: false }
          ],
          customConfigTitle: 'Xây dựng Private Cloud Hyperconverged?',
          customConfigDesc: 'Nếu hệ thống của bạn yêu cầu một cụm máy chủ siêu hội tụ (HCI) từ 3 đến hàng chục nodes vật lý kết hợp giải pháp lưu trữ SAN chuyên sâu, hãy để đội ngũ kỹ sư hạ tầng chuyên nghiệp của Viettel IDC đồng hành thiết kế giải pháp.',
          features: [
            { title: 'Cách ly vật lý tuyệt đối', desc: 'Máy chủ vật lý được gắn tag riêng biệt trong tủ rack, không chia sẻ bất kỳ linh kiện, bộ nhớ đệm hay cổng mạng nào với bên ngoài.', icon: <Lock className="w-5 h-5" /> },
            { title: 'Hỗ trợ thay phần cứng nóng', desc: 'Cơ chế dự phòng nguồn điện kép, quạt làm mát và ổ cứng Hot-swap giúp kỹ thuật viên thay thế thiết bị hỏng mà không gây tắt máy chủ.', icon: <RefreshCw className="w-5 h-5" /> },
            { title: 'SLA cam kết phần cứng', desc: 'Viettel IDC chịu hoàn toàn trách nhiệm đầu tư, bảo trì và cam kết thay thế linh kiện lỗi hỏng trong vòng tối đa 2 giờ làm việc.', icon: <Check className="w-5 h-5" /> },
            { title: 'Kết nối mạng tốc độ cực cao', desc: 'Card mạng kép hỗ trợ băng thông lên tới 100 Gbps kết nối trực tiếp vào hệ thống lõi Core Switch, triệt tiêu nút thắt cổ chai truyền dữ liệu.', icon: <Network className="w-5 h-5" /> }
          ],
          useCases: [
            { title: 'Hệ thống Core Banking & Ví Điện Tử', desc: 'Đòi hỏi sự biệt lập tuyệt đối ở cấp độ vật lý để bảo mật thông tin tài khoản, xử lý hàng triệu giao dịch tài chính nhạy cảm mỗi giây.', metrics: 'Cách ly vật lý an toàn 100%', icon: <Database className="w-5 h-5" /> },
            { title: 'Doanh nghiệp sở hữu bản quyền đắt đỏ', desc: 'Doanh nghiệp chạy cơ sở dữ liệu lớn của Oracle, Microsoft SQL Server cần kiểm soát chính xác số lượng nhân vật lý để tối ưu phí mua license.', metrics: 'Tiết kiệm tới 45% phí license', icon: <Calculator className="w-5 h-5" /> },
            { title: 'Cơ quan Tư pháp & Chính phủ', desc: 'Yêu cầu khắt khe từ luật pháp về việc dữ liệu quốc gia phải được đặt trên các thiết bị lưu trữ chuyên dụng riêng biệt, không chia sẻ.', metrics: 'Đáp ứng 100% chuẩn Pháp lý VN', icon: <Shield className="w-5 h-5" /> }
          ],
          faqs: [
            { q: 'Ai chịu trách nhiệm khi máy chủ vật lý bị hỏng ổ cứng hay RAM?', a: 'Viettel IDC chịu trách nhiệm toàn quyền 100% về phần cứng vật lý. Khi có bất kỳ cảnh báo lỗi linh kiện nào, đội ngũ kỹ sư hiện trường trực 24/7 của chúng tôi sẽ lập tức thay thế phần cứng mới trong vòng tối đa 2 giờ mà không tính thêm bất kỳ chi phí nào.' },
            { q: 'Tôi có thể cài đặt hệ ảo hóa Proxmox hay KVM tự do không?', a: 'Hoàn toàn được. Chúng tôi bàn giao máy chủ vật lý ở cấp độ "Bare Metal" kèm quyền truy cập quản trị phần cứng từ xa (IPMI/iDRAC). Bạn có thể cài đặt bất kỳ hệ điều hành Hypervisor nào theo nhu cầu.' },
            { q: 'Thời gian bàn giao máy chủ Dedicated Host là bao lâu?', a: 'Đối với các cấu hình máy chủ Dell/HP phổ biến có sẵn tại kho, thời gian thiết lập và bàn giao độc quyền cho khách hàng là từ 24 đến 48 giờ làm việc.' }
          ]
        };
      case 'viettel-cloud-gpu':
        return {
          title: 'Viettel Cloud GPU',
          subtitle: 'Đám mây tăng tốc tính toán đồ họa NVIDIA hiệu năng đỉnh cao cho AI/ML',
          badge: 'TỐI ƯU AI · NVIDIA Tensor Core GPUs',
          desc: 'Máy chủ ảo trang bị card đồ họa chuyên dụng NVIDIA thế hệ mới nhất (H100, A100, L40S). Cung cấp sức mạnh tính toán song song vượt trội tối ưu cho Huấn luyện AI, Deep Learning và kết xuất đồ họa nặng.',
          bgImage: 'https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png',
          iconBgClass: 'bg-purple-50',
          iconColorClass: 'text-[#7C3AED]',
          stats: [
            { label: 'Dòng GPU', value: '⚡ NVIDIA H100 / A100', desc: 'Thế hệ Tensor Core đỉnh cao' },
            { label: 'Băng Thông GPU', value: '🚀 NVLink 900 GB/s', desc: 'Kết nối liên card siêu tốc' },
            { label: 'Khởi Tạo Dịch Vụ', value: '⏱️ < 5 Phút', desc: 'Tự động kích hoạt nhanh chóng' },
            { label: 'Băng thông truyền tải', value: '🌐 100% Free Domestic', desc: 'Không giới hạn Data Transfer' }
          ],
          advantages: [
            { title: 'Sức mạnh tính toán song song cực đại', desc: 'Trang bị hàng nghìn nhân CUDA và Tensor Core giúp xử lý đồng thời hàng triệu phép tính ma trận, rút ngắn thời gian huấn luyện AI từ vài tháng xuống vài ngày.', icon: <Cpu className="w-5 h-5" /> },
            { title: 'Công nghệ liên kết NVLink siêu tốc', desc: 'Băng thông giao tiếp nội bộ giữa các card GPU đạt tới 900 GB/s thông qua cầu nối NVLink, loại bỏ hoàn toàn hiện tượng nghẽn cổ chai PCIe.', icon: <Zap className="w-5 h-5" /> },
            { title: 'Môi trường phát triển AI tích hợp sẵn', desc: 'Hỗ trợ cài đặt nhanh các bộ thư viện CUDA, cuDNN, PyTorch, TensorFlow giúp các nhà khoa học dữ liệu bắt tay vào việc ngay lập tức.', icon: <Sparkles className="w-5 h-5" /> },
            { title: 'Tiết kiệm chi phí Data Transfer', desc: 'Khác với AWS hay GCP tính phí tải dữ liệu ra rất cao, Viettel IDC miễn phí hoàn toàn lưu lượng truyền tải dữ liệu nội địa Việt Nam.', icon: <Calculator className="w-5 h-5" /> }
          ],
          platformTitle: 'Hạ tầng tăng tốc AI hàng đầu thế giới',
          platformDesc: 'Trải nghiệm sức mạnh xử lý vượt trội từ các kiến trúc đồ họa chuyên sâu tối tân nhất.',
          platforms: [
            { id: 'nvidia-h100', name: 'NVIDIA H100 Tensor Core GPU', desc: 'GPU mạnh mẽ nhất thế giới chuyên dụng cho mô hình ngôn ngữ lớn LLM', specs: ['Kiến trúc Hopper đột phá với công nghệ Transformer Engine', 'Bộ nhớ vRAM cực đại 80GB HBM3 tốc độ cao', 'Hiệu năng xử lý AI nhanh gấp 9 lần thế hệ trước', 'Tối ưu tuyệt đối cho việc huấn luyện GPT-4, LLaMA'] },
            { id: 'nvidia-l40s', name: 'NVIDIA L40S GPU Accelerator', desc: 'Dòng GPU đa năng tối ưu cho cả Inference AI và Đồ họa 3D', specs: ['Kiến trúc Ada Lovelace mạnh mẽ với nhân Ray Tracing thế hệ 3', 'Bộ nhớ vRAM 48GB GDDR6 ECC có cơ chế tự sửa lỗi', 'Hiệu suất render đồ họa 3D và biên tập video xuất sắc', 'Tối ưu chi phí chạy suy luận mô hình AI quy mô vừa'] }
          ],
          pricingPlans: [
            { id: 'g1', name: 'GPU L4S-1', badge: 'TỐI ƯU CHO ĐỒ HỌA & INFERENCE AI', tag: 'NVIDIA L40S Instance', price: '9.500.000', period: 'Tháng', specs: ['1x GPU NVIDIA L40S (48GB vRAM)', '12 vCPU Cores Intel Xeon', '48 GB RAM DDR5 High Speed', '500 GB NVMe SSD Enterprise', 'Băng thông mạng Internet 200 Mbps', 'Miễn phí 100% Data Transfer'], featured: false },
            { id: 'g2', name: 'GPU A100-1', badge: 'HUẤN LUYỆN AI CHUYÊN NGHIỆP', tag: 'PHỔ BIẾN NHẤT', price: '19.500.000', period: 'Tháng', specs: ['1x GPU NVIDIA A100 (80GB vRAM)', '24 vCPU Cores Intel Xeon', '96 GB RAM DDR4 ECC', '1.000 GB NVMe SSD Enterprise', 'Băng thông mạng Internet 300 Mbps', 'Hệ điều hành tích hợp sẵn Docker CUDA'], featured: true },
            { id: 'g3', name: 'GPU H100-1', badge: 'SỨC MẠNH CỰC HẠN CHO LLM', tag: 'NVIDIA H100 Instance', price: '42.000.000', period: 'Tháng', specs: ['1x GPU NVIDIA H100 (80GB vRAM)', '32 vCPU Cores Intel Xeon', '128 GB RAM DDR5 High Speed', '2.000 GB NVMe SSD Enterprise', 'Băng thông mạng Internet 500 Mbps', 'Hỗ trợ kỹ sư AI chuyên nghiệp đồng hành'], featured: false }
          ],
          customConfigTitle: 'Xây dựng Siêu Cụm Tính Toán GPU (Multi-Node GPU)?',
          customConfigDesc: 'Doanh nghiệp của bạn đang huấn luyện các mô hình AI tiếng Việt quy mô hàng tỷ tham số hoặc kết xuất phim 3D Hollywood? Chúng tôi hỗ trợ thiết lập siêu cụm máy chủ GPU liên kết InfiniBand tốc độ cao chuyên nghiệp.',
          features: [
            { title: 'Tối ưu hóa huấn luyện AI', desc: 'Rút ngắn thời gian training nhờ nhân Tensor Core thế hệ mới tự động tối ưu hóa các phép tính toán dấu phẩy động phức tạp.', icon: <Cpu className="w-5 h-5" /> },
            { title: 'Kết xuất đồ họa 3D chuyên sâu', desc: 'Hỗ trợ công nghệ Ray Tracing thời gian thực giúp dựng hình kiến trúc, thiết kế kỹ thuật, làm phim hoạt hình 3D mượt mà.', icon: <Sparkles className="w-5 h-5" /> },
            { title: 'Lưu trữ NVMe siêu tốc độ', desc: 'Sử dụng 100% ổ đĩa NVMe SSD Enterprise giúp tốc độ nạp dữ liệu huấn luyện vào GPU đạt hàng chục GB/s, loại bỏ độ trễ IOPS.', icon: <HardDrive className="w-5 h-5" /> },
            { title: 'Hệ sinh thái AI Docker sẵn sàng', desc: 'Kích hoạt nhanh chóng các container AI đóng gói sẵn môi trường từ NVIDIA NGC Catalog giúp lập trình viên tiết kiệm thời gian cài đặt.', icon: <Box className="w-5 h-5" /> }
          ],
          useCases: [
            { title: 'Huấn luyện Mô hình Ngôn ngữ lớn (LLM)', desc: 'Xây dựng trợ lý ảo Chatbot thông minh tự học, phân tích ngữ nghĩa, tự động dịch thuật và xử lý văn bản quy mô hàng tỷ tham số.', metrics: 'Rút ngắn 85% thời gian training', icon: <Database className="w-5 h-5" /> },
            { title: 'Xử lý hình ảnh & Deep Learning', desc: 'Huấn luyện mô hình nhận diện khuôn mặt, chuẩn đoán hình ảnh y tế tự động qua phim X-quang, MRI với độ chính xác tuyệt đối.', metrics: 'Độ chính xác mô hình > 99%', icon: <Eye className="w-5 h-5" /> },
            { title: 'Dựng phim hoạt hình & Render 3D', desc: 'Giải pháp tuyệt vời cho các studio đồ họa kết xuất (render) phim hoạt hình 3D, mô phỏng vật lý kiến trúc nặng đô.', metrics: 'Tốc độ render nhanh gấp 12 lần', icon: <Sparkles className="w-5 h-5" /> }
          ],
          faqs: [
            { q: 'Tôi có thể thuê GPU theo giờ hay chỉ có thể thuê theo tháng?', a: 'Viettel IDC hỗ trợ đầy đủ cả hai hình thức thanh toán linh hoạt: Trả phí theo giờ sử dụng thực tế (Pay-as-you-go) cho các dự án ngắn hạn hoặc đăng ký thuê bao tháng để nhận mức chiết khấu cực sâu lên tới 40%.' },
            { q: 'Hệ thống có hỗ trợ kết nối nhiều card GPU trong cùng một máy chủ không?', a: 'Có. Chúng tôi hỗ trợ cấu hình máy chủ ảo tích hợp từ 1 GPU, 2 GPU, 4 GPU cho đến tối đa 8 card GPU NVIDIA H100/A100 liên kết trực tiếp bằng cầu nối NVLink tốc độ cao.' },
            { q: 'Tôi có được quyền truy cập sâu vào phần cứng GPU không?', a: 'Có. Bạn có toàn quyền quản trị Root/Administrator của máy chủ ảo và truy cập trực tiếp vào card đồ họa GPU để cài đặt phần mềm, kiểm tra nhiệt độ, xung nhịp thông qua công cụ nvidia-smi.' }
          ]
        };
      default:
        return getFallbackServiceData(slug);
    }
  };

  const data = getServiceData();

  // --- SPECIALIZED CALCULATOR STATES & FORMULAS PER SLUG ---
  const getCalculatorGroup = (targetSlug: string) => {
    if (targetSlug === 'viettel-private-cloud') return 'private-cloud';
    if (targetSlug === 'viettel-open-private-cloud') return 'open-private-cloud';
    if (targetSlug === 'viettel-cloud-npu') return 'cloud-npu';
    if (targetSlug === 'viettel-virtual-private-cloud') return 'virtual-private-cloud';
    if (targetSlug === 'viettel-dedicated-private-cloud') return 'dedicated-private-cloud';
    if (targetSlug === 'viettel-cloud-gpu') return 'cloud-gpu';
    
    // Categorize standard slugs
    if (targetSlug.includes('kubernetes') || targetSlug.includes('voks') || targetSlug.includes('vdks') || targetSlug.includes('vcr')) return 'k8s';
    if (targetSlug.includes('colocation') || targetSlug.includes('bare-metal') || targetSlug.includes('consulting')) return 'datacenter';
    if (targetSlug.includes('storage') || targetSlug.includes('file') || targetSlug.includes('backup') || targetSlug.includes('disaster') || targetSlug.includes('archiving')) return 'storage';
    if (targetSlug.includes('database') || targetSlug.includes('caching') || targetSlug.includes('search') || targetSlug.includes('api-gateway') || targetSlug.includes('messaging') || targetSlug.includes('vkqs') || targetSlug.includes('vdbs') || targetSlug.includes('vse') || targetSlug.includes('vcas')) return 'database';
    if (targetSlug.includes('leased-line') || targetSlug.includes('connect') || targetSlug.includes('sd-wan') || targetSlug.includes('cdn')) return 'network';
    if (targetSlug.includes('firewall') || targetSlug.includes('ddos') || targetSlug.includes('endpoint') || targetSlug.includes('ssl') || targetSlug.includes('vcloudrity') || targetSlug.includes('soc') || targetSlug.includes('threat') || targetSlug.includes('security') || targetSlug.includes('vcsmp')) return 'security';
    if (targetSlug.includes('microsoft') || targetSlug.includes('drive') || targetSlug.includes('pc') || targetSlug.includes('desktop') || targetSlug.includes('license') || targetSlug.includes('voice') || targetSlug.includes('camera')) return 'saas';
    if (targetSlug.includes('domain') || targetSlug.includes('dns') || targetSlug.includes('hosting') || targetSlug.includes('email')) return 'hosting';
    
    return 'saas'; // default
  };

  // helper to get initial slider values based on slug
  const getInitialValue = (param: 'val1' | 'val2' | 'val3' | 'val4') => {
    if (slug === 'viettel-private-cloud') {
      if (param === 'val1') return 32;
      if (param === 'val2') return 128;
      if (param === 'val3') return 2000;
      return 1;
    }
    if (slug === 'viettel-open-private-cloud') {
      if (param === 'val1') return 64;
      if (param === 'val2') return 256;
      if (param === 'val3') return 5000;
      return 2;
    }
    if (slug === 'viettel-cloud-npu') {
      if (param === 'val1') return 2;
      if (param === 'val2') return 16;
      if (param === 'val3') return 32;
      return 200;
    }
    if (slug === 'viettel-virtual-private-cloud') {
      if (param === 'val1') return 1;
      if (param === 'val2') return 2;
      if (param === 'val3') return 2;
      return 300;
    }
    if (slug === 'viettel-dedicated-private-cloud') {
      if (param === 'val1') return 1;
      if (param === 'val2') return 1;
      if (param === 'val3') return 4000;
      return 10;
    }
    if (slug === 'viettel-cloud-gpu') {
      if (param === 'val1') return 1;
      if (param === 'val2') return 0;
      if (param === 'val3') return 96;
      return 1000;
    }
    
    // Group-based fallbacks
    const group = getCalculatorGroup(slug);
    if (group === 'k8s') {
      if (param === 'val1') return 3; // 3 worker nodes
      if (param === 'val2') return 4; // 4 vCPU per node
      if (param === 'val3') return 8; // 8 GB RAM per node
      return 100; // 100 GB SSD per node
    }
    if (group === 'datacenter') {
      if (param === 'val1') return 1; // 1 U
      if (param === 'val2') return 400; // 400 Watts
      if (param === 'val3') return 100; // 100 Mbps
      return 1; // 1 IP
    }
    if (group === 'storage') {
      if (param === 'val1') return 500; // 500 GB
      if (param === 'val2') return 30; // 30 days retention
      if (param === 'val3') return 100; // 100 Mbps bandwidth
      return 2; // 2 VMs protected
    }
    if (group === 'database') {
      if (param === 'val1') return 1; // 1 node
      if (param === 'val2') return 2; // 2 vCPUs
      if (param === 'val3') return 4; // 4 GB RAM
      return 100; // 100 GB SSD
    }
    if (group === 'network') {
      if (param === 'val1') return 100; // 100 Mbps port
      if (param === 'val2') return 5; // 5 km
      if (param === 'val3') return 0; // /29 subnet
      return 0; // Backup link: No
    }
    if (group === 'security') {
      if (param === 'val1') return 5; // 5 assets
      if (param === 'val2') return 100; // 100 Mbps traffic
      if (param === 'val3') return 1; // SLA tier 1 (Professional)
      return 90; // 90 days logs
    }
    if (group === 'saas') {
      if (param === 'val1') return 10; // 10 users
      if (param === 'val2') return 50; // 50 GB storage
      if (param === 'val3') return 0; // Security level standard
      return 500; // 500 CPaaS minutes
    }
    if (group === 'hosting') {
      if (param === 'val1') return 1; // 1 website
      if (param === 'val2') return 10; // 10 GB SSD
      if (param === 'val3') return 10; // 10 email accounts
      return 0; // Anti-spam standard
    }
    
    return 1;
  };

  // Sliders
  const [calcVal1, setCalcVal1] = useState(() => getInitialValue('val1')); // Resource 1
  const [calcVal2, setCalcVal2] = useState(() => getInitialValue('val2')); // Resource 2
  const [calcVal3, setCalcVal3] = useState(() => getInitialValue('val3')); // Resource 3
  const [calcVal4, setCalcVal4] = useState(() => getInitialValue('val4')); // Resource 4
  const [calcPeriod, setCalcPeriod] = useState<1 | 6 | 12 | 24>(12); // Discount months

  // Pricing calculation math
  const getCalculatorResults = () => {
    let subtotal = 0;
    let desc1 = '', desc2 = '', desc3 = '', desc4 = '';
    
    const group = getCalculatorGroup(slug);
    
    if (slug === 'viettel-private-cloud') {
      const cpuCost = calcVal1 * 85000;
      const ramCost = calcVal2 * 45000;
      const storageCost = calcVal3 * 3500;
      const ipCost = calcVal4 * 80000;
      subtotal = cpuCost + ramCost + storageCost + ipCost;
      desc1 = `${calcVal1} vCPU Cores`;
      desc2 = `${calcVal2} GB RAM DDR4`;
      desc3 = `${calcVal3.toLocaleString()} GB SSD Enterprise`;
      desc4 = `${calcVal4} IP Public WAN`;
    } else if (slug === 'viettel-open-private-cloud') {
      const cpuCost = calcVal1 * 75000;
      const ramCost = calcVal2 * 40000;
      const storageCost = calcVal3 * 2800;
      const ipCost = calcVal4 * 80000;
      subtotal = cpuCost + ramCost + storageCost + ipCost;
      desc1 = `${calcVal1} vCPU OpenStack`;
      desc2 = `${calcVal2} GB RAM DDR4`;
      desc3 = `${calcVal3.toLocaleString()} GB Ceph Storage`;
      desc4 = `${calcVal4} IP Public WAN`;
    } else if (slug === 'viettel-cloud-npu') {
      const npuCost = calcVal1 * 1500000;
      const cpuCost = calcVal2 * 80000;
      const ramCost = calcVal3 * 45000;
      const storageCost = calcVal4 * 4000;
      subtotal = npuCost + cpuCost + ramCost + storageCost;
      desc1 = `${calcVal1} Dedicated vNPU Cores`;
      desc2 = `${calcVal2} vCPU Cores`;
      desc3 = `${calcVal3} GB RAM`;
      desc4 = `${calcVal4} GB NVMe SSD`;
    } else if (slug === 'viettel-virtual-private-cloud') {
      const vpcCost = calcVal1 * 150000;
      const natCost = calcVal2 * 150000;
      const vpnCost = calcVal3 * 200000;
      const bandwidthCost = calcVal4 * 1500;
      subtotal = vpcCost + natCost + vpnCost + bandwidthCost;
      desc1 = `${calcVal1} VPC Network`;
      desc2 = `${calcVal2} NAT Gateways`;
      desc3 = `${calcVal3} VPN Gateways`;
      desc4 = `${calcVal4} Mbps Internet Bandwidth`;
    } else if (slug === 'viettel-dedicated-private-cloud') {
      const baseHostPrice = calcVal2 === 0 ? 14000000 : calcVal2 === 1 ? 28000000 : 55000000;
      const hostCost = calcVal1 * baseHostPrice;
      const storageCost = calcVal3 * 3500;
      const uplinkCost = calcVal4 === 10 ? 500000 : calcVal4 === 25 ? 1200000 : 2500000;
      subtotal = hostCost + storageCost + uplinkCost;
      const hostName = calcVal2 === 0 ? 'Silver Host (32 Cores)' : calcVal2 === 1 ? 'Gold Host (64 Cores)' : 'Platinum Host (128 Cores)';
      desc1 = `${calcVal1}x ${hostName}`;
      desc2 = `Cấu hình phần cứng chuyên biệt`;
      desc3 = `${calcVal3.toLocaleString()} GB SAN Storage`;
      desc4 = `Uplink Card ${calcVal4} Gbps`;
    } else if (slug === 'viettel-cloud-gpu') {
      const baseGpuPrice = calcVal2 === 0 ? 8500000 : calcVal2 === 1 ? 17000000 : 38000000;
      const gpuCost = calcVal1 * baseGpuPrice;
      const virtualCpuCost = calcVal1 * 12 * 80000;
      const ramCost = calcVal3 * 45000;
      const storageCost = calcVal4 * 4500;
      subtotal = gpuCost + virtualCpuCost + ramCost + storageCost;
      const gpuName = calcVal2 === 0 ? 'NVIDIA L40S' : calcVal2 === 1 ? 'NVIDIA A100' : 'NVIDIA H100';
      desc1 = `${calcVal1}x GPU ${gpuName}`;
      desc2 = `${calcVal1 * 12} vCPU Cores AI`;
      desc3 = `${calcVal3} GB RAM DDR5`;
      desc4 = `${calcVal4.toLocaleString()} GB NVMe SSD`;
    } else if (group === 'k8s') {
      const nodeCost = calcVal1 * (calcVal2 * 80000 + calcVal3 * 40000 + calcVal4 * 3500);
      subtotal = nodeCost + 500000;
      desc1 = `${calcVal1}x Worker Nodes`;
      desc2 = `${calcVal1 * calcVal2} vCPU Cores tổng`;
      desc3 = `${calcVal1 * calcVal3} GB RAM DDR4`;
      desc4 = `${calcVal1 * calcVal4} GB SSD Enterprise`;
    } else if (group === 'datacenter') {
      subtotal = (calcVal1 * 2000000) + (Math.max(0, calcVal2 - 400) * 3000) + (calcVal3 * 15000) + (calcVal4 * 80000);
      desc1 = `${calcVal1}U Rack Space`;
      desc2 = `${calcVal2}W Power Capacity`;
      desc3 = `${calcVal3} Mbps Shared Port`;
      desc4 = `${calcVal4} IP WAN Public`;
    } else if (group === 'storage') {
      subtotal = (calcVal1 * 1200) + (calcVal2 * 50) + (calcVal3 * 1000) + (calcVal4 * 100000);
      desc1 = `${calcVal1.toLocaleString()} GB Capacity`;
      desc2 = `Chu kỳ giữ lại ${calcVal2} ngày`;
      desc3 = `${calcVal3} Mbps Bandwidth`;
      desc4 = `${calcVal4} Servers Bảo Vệ`;
    } else if (group === 'database') {
      subtotal = calcVal1 * (calcVal2 * 90000 + calcVal3 * 50000 + calcVal4 * 400) + 200000;
      desc1 = `${calcVal1} Cụm DB Nodes`;
      desc2 = `${calcVal1 * calcVal2} vCPU Cores DB`;
      desc3 = `${calcVal1 * calcVal3} GB RAM ECC`;
      desc4 = `${calcVal1 * calcVal4} GB Storage SSD`;
    } else if (group === 'network') {
      const lineCost = calcVal1 * 1500 + calcVal2 * 200000;
      const subnetCost = calcVal3 === 0 ? 300000 : calcVal3 === 1 ? 600000 : 1200000;
      subtotal = (lineCost + subnetCost) * (calcVal4 === 1 ? 1.5 : 1);
      desc1 = `${calcVal1} Mbps Line Speed`;
      desc2 = `${calcVal2} km Fiber Distance`;
      desc3 = `Dải IP: /${32 - (calcVal3 + 3)}`;
      desc4 = `Dự phòng Backup: ${calcVal4 === 1 ? 'Active-Backup' : 'Single Line'}`;
    } else if (group === 'security') {
      const slaFee = calcVal3 === 0 ? 500000 : calcVal3 === 1 ? 1500000 : 4000000;
      subtotal = (calcVal1 * 150000) + (calcVal2 * 3000) + slaFee + (calcVal4 * 2000);
      desc1 = `${calcVal1} Assets Giám Sát`;
      desc2 = `${calcVal2} Mbps Traffic`;
      desc3 = `SLA: ${calcVal3 === 0 ? 'Standard' : calcVal3 === 1 ? 'Professional' : 'Critical 24/7'}`;
      desc4 = `Giữ nhật ký Log ${calcVal4} ngày`;
    } else if (group === 'saas') {
      const secFee = calcVal3 === 0 ? 0 : calcVal3 === 1 ? 30000 : 80000;
      subtotal = (calcVal1 * 45000) + (calcVal1 * calcVal2 * 100) + (secFee * calcVal1) + (calcVal4 * 400);
      desc1 = `${calcVal1} User Licenses`;
      desc2 = `${calcVal2} GB Space/user`;
      desc3 = `An toàn: ${calcVal3 === 0 ? 'Tiêu chuẩn' : calcVal3 === 1 ? 'Mã hóa' : 'Chống rò rỉ DLP'}`;
      desc4 = `CPaaS Call: ${calcVal4} mins`;
    } else if (group === 'hosting') {
      subtotal = (calcVal1 * 50000) + (calcVal2 * 8000) + (calcVal3 * 12000) + (calcVal4 === 1 ? 95000 : 0);
      desc1 = `${calcVal1} Websites/Domains`;
      desc2 = `${calcVal2} GB SSD Hosting`;
      desc3 = `${calcVal3} Corporate Mailboxes`;
      desc4 = `Anti-Spam Premium: ${calcVal4 === 1 ? 'Kích hoạt' : 'Tiêu chuẩn'}`;
    }

    const discountRate = calcPeriod === 6 ? 0.10 : calcPeriod === 12 ? 0.20 : calcPeriod === 24 ? 0.30 : 0;
    const discountAmount = subtotal * discountRate;
    const finalMonthly = subtotal - discountAmount;

    return {
      subtotal,
      discountAmount,
      finalMonthly,
      desc1,
      desc2,
      desc3,
      desc4
    };
  };

  const results = getCalculatorResults();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section id="hero-section" className="relative overflow-hidden bg-[#1A1A1A] text-white py-16 md:py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40"
          style={{ backgroundImage: `url('${data.bgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#1A1A1A]/90 to-transparent" />
        
        <div className="ali-container relative z-10 text-left flex flex-col items-start py-6 w-full">
          <div className="space-y-6 max-w-3.5xl flex flex-col items-start">
            <div className="inline-flex items-center space-x-2 bg-[#EE0033]/15 border border-[#EE0033]/45 px-3 py-1.5 rounded-full text-[#EE0033] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EE0033] mr-1 animate-ping" />
              {data.badge}
            </div>
            
            <h1 className="text-3.5xl md:text-5xl lg:text-5.5xl font-bold tracking-tight text-white leading-[1.1] font-sans">
              <span className="block">{data.title}</span>
              <span className="text-[#FF4D73] block text-2xl md:text-3xl lg:text-4xl mt-2 font-medium tracking-normal">
                {data.subtitle}
              </span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2.5xl">
              {data.desc}
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <a 
                href="/contact" 
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#EE0033] text-white font-bold text-sm tracking-wider rounded-full shadow-[0_4px_14px_rgba(238,0,51,0.4)] transition-all duration-300 hover:bg-[#FF1A4E] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_6px_20px_rgba(238,0,51,0.5)] focus:outline-none"
              >
                <span>Đăng ký ngay</span>
                <span className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center text-[8px] font-bold group-hover:border-white group-hover:scale-110 transition-all duration-300">
                  ○
                </span>
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-3 bg-white/10 border border-white/20 hover:border-white text-gray-300 hover:text-white font-bold text-sm tracking-wider rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Dùng thử miễn phí
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY TAB NAVIGATION MENU */}
      <div className="sticky top-0 z-[1010] bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm transition-all duration-300">
        <div className="ali-container">
          <div className="flex items-center justify-between h-14 md:h-16">
            
            {/* Left side: Product Name & Tabs */}
            <div className="flex items-center gap-6 lg:gap-8 overflow-hidden h-full">
              <span className="text-sm md:text-base font-extrabold text-gray-950 tracking-tight shrink-0 flex items-center h-full border-r border-gray-200/60 pr-4 md:pr-6">
                {data.title}
              </span>
              
              {/* Desktop Tabs */}
              <div className="hidden md:flex items-center gap-5 lg:gap-7 h-full">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'pricing', label: 'Bảng giá' },
                  { id: 'features', label: 'Tính năng' },
                  { id: 'benefits', label: 'Lợi ích' },
                  { id: 'platform-selector', label: 'Nền tảng' },
                  { id: 'use-cases', label: 'Use cases' },
                  { id: 'faq', label: 'Hỏi đáp' }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`relative h-14 md:h-16 px-1 text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center ${
                        isActive ? 'text-[#EE0033]' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE0033]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center">
              <a 
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-[#EE0033] hover:bg-[#FF1A4E] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-sm shadow-[#EE0033]/15"
              >
                Yêu cầu báo giá
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* OVERVIEW SECTION (Key Stats) */}
      <section id="overview" className="py-12 md:py-16 bg-white border-b border-gray-100">
        <div className="ali-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 p-5 rounded-2xl text-left space-y-2 hover:border-[#EE0033]/20 transition-all duration-300 shadow-xs">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">{stat.label}</span>
                <span className="text-lg md:text-2xl font-black text-gray-950 tracking-tight block">{stat.value}</span>
                <p className="text-[11px] text-gray-500 leading-normal">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVE ADVANTAGES SECTION */}
      <section id="benefits" className="py-16 md:py-20 bg-gray-25/50 border-b border-gray-100">
        <div className="ali-container space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ƯU ĐIỂM NỔI BẬT</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Tại sao nên chọn dịch vụ từ Viettel IDC?
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Được vận hành trên mạng lưới Trung tâm dữ liệu tiêu chuẩn Rated 3 cao cấp rộng khắp Việt Nam, mang lại hiệu suất đỉnh cao và bảo mật chủ quyền dữ liệu tuyệt đối.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
            {data.advantages.map((adv, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 flex gap-5 shadow-xs hover:border-[#EE0033]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#EE0033] flex items-center justify-center shrink-0">
                  {adv.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-gray-950 tracking-tight">{adv.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{adv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="ali-container space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">BẢNG GIÁ DỊCH VỤ</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Các gói cấu hình đề xuất
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Tất cả các gói đều hỗ trợ mở rộng tài nguyên nóng và cam kết băng thông thực tế tốc độ cao nhất.
            </p>
          </motion.div>

          {/* PRICING CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left items-stretch max-w-5xl mx-auto">
            {data.pricingPlans.map((plan, idx) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-shadow duration-300 relative p-6 border ${
                  plan.featured 
                    ? 'border-gray-200 shadow-none hover:shadow-lg z-10' 
                    : 'border-gray-200 hover:border-[#EE0033]/40 shadow-none hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="bg-[#F8F9FA] border border-gray-100 rounded-2xl p-5 mb-6 relative">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-base font-bold text-gray-950 tracking-tight">{plan.name}</h3>
                      {plan.featured && (
                        <span className="bg-[#EE0033]/10 text-[#EE0033] text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                          ★ KHUYÊN DÙNG
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mt-1 mb-3">
                      {plan.badge}
                    </div>
                    <div className="mb-1 flex items-baseline gap-1.5">
                      <span className="text-2.5xl md:text-3xl font-black text-[#EE0033] tracking-tight">
                        {plan.price}
                      </span>
                      <div className="flex flex-col text-[9px] text-gray-400 uppercase tracking-widest font-black leading-tight">
                        <span className="text-gray-950 font-black">VND</span>
                        <span>/ {plan.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 text-left px-1">
                    <span className="text-xs font-extrabold text-gray-950 uppercase tracking-wider block">Chi tiết bao gồm</span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-gray-650 px-1 mb-6">
                    {plan.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full border border-red-100 bg-red-50/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#EE0033] stroke-[3.5]" />
                        </div>
                        <span className={`${sIdx < 3 ? 'font-bold text-gray-950' : 'text-gray-600'} leading-tight`}>
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 px-1">
                  <a 
                    href="/contact" 
                    className="w-full block py-3 text-center font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 bg-[#EE0033] hover:bg-[#FF1A4E] text-white shadow-[0_4px_14px_rgba(238,0,51,0.25)] hover:shadow-[0_6px_20px_rgba(238,0,51,0.35)] hover:-translate-y-0.5"
                  >
                    Đăng ký ngay
                  </a>
                  <a 
                    href="/contact" 
                    className="w-full block py-3 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 text-center font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300"
                  >
                    Yêu cầu cuộc gọi tư vấn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CALLOUT FOR DEDICATED CONSULTANCY */}
          <div className="max-w-5xl mx-auto mt-8 text-left">
            <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#EE0033_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              <div className="relative z-10 space-y-1">
                <h4 className="text-base md:text-lg font-bold">{data.customConfigTitle}</h4>
                <p className="text-xs text-gray-400 max-w-2xl">
                  {data.customConfigDesc}
                </p>
              </div>
              <a 
                href="/contact" 
                className="relative z-10 shrink-0 inline-flex items-center gap-1 bg-[#EE0033] hover:bg-[#FF1A4E] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-lg shadow-[#EE0033]/15 transition-all duration-300"
              >
                <span>Liên hệ chuyên gia</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CALCULATOR SECTION */}
      <section id="benefits" className="py-16 bg-[#111111] text-white overflow-hidden relative border-y border-zinc-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#EE0033]/5 blur-3xl pointer-events-none" />
        
        <div className="ali-container relative z-10 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/15 px-3 py-1 rounded-full w-max">CÔNG CỤ TỰ CẤU HÌNH</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-white font-sans leading-tight">
              Tính toán chi phí may đo tối ưu
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-3xl leading-relaxed">
              Kéo thả thay đổi thông số để tính nhanh giá cước dự phóng hàng tháng và ưu đãi giảm giá theo chu kỳ cam kết thanh toán.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch text-left">
            {/* Left sliders side */}
            <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-8">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-3">Cấu hình tham số</h3>
              
              {/* Dynamic sliders rendering based on Slug */}
              {slug === 'viettel-private-cloud' && (
                <div className="space-y-6">
                  {/* Slider 1: vCPU */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Tài nguyên vCPU Cores:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Cores</span>
                    </div>
                    <input type="range" min="16" max="256" step="8" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>16 Cores</span><span>256 Cores</span></div>
                  </div>

                  {/* Slider 2: RAM */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Bộ nhớ RAM DDR4:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} GB RAM</span>
                    </div>
                    <input type="range" min="64" max="1024" step="32" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>64 GB</span><span>1024 GB</span></div>
                  </div>

                  {/* Slider 3: Storage */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng SSD Storage SAS:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3.toLocaleString()} GB</span>
                    </div>
                    <input type="range" min="500" max="20000" step="500" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>500 GB</span><span>20 TB (20.000 GB)</span></div>
                  </div>

                  {/* Slider 4: IP WAN */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Địa chỉ IP Public WAN thêm:</span>
                      <span className="text-[#EE0033] font-black">+{calcVal4} IPs</span>
                    </div>
                    <input type="range" min="1" max="10" step="1" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 IP</span><span>10 IPs</span></div>
                  </div>
                </div>
              )}

              {slug === 'viettel-open-private-cloud' && (
                <div className="space-y-6">
                  {/* Slider 1: vCPU */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Tài nguyên vCPU KVM Cores:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Cores</span>
                    </div>
                    <input type="range" min="32" max="512" step="16" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>32 Cores</span><span>512 Cores</span></div>
                  </div>

                  {/* Slider 2: RAM */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Bộ nhớ RAM DDR4:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} GB RAM</span>
                    </div>
                    <input type="range" min="128" max="2048" step="64" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>128 GB</span><span>2048 GB</span></div>
                  </div>

                  {/* Slider 3: Storage */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng Ceph Storage:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3.toLocaleString()} GB</span>
                    </div>
                    <input type="range" min="1000" max="50000" step="1000" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 TB (1000 GB)</span><span>50 TB (50.000 GB)</span></div>
                  </div>

                  {/* Slider 4: IP WAN */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Địa chỉ IP Public WAN thêm:</span>
                      <span className="text-[#EE0033] font-black">+{calcVal4} IPs</span>
                    </div>
                    <input type="range" min="1" max="15" step="1" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 IP</span><span>15 IPs</span></div>
                  </div>
                </div>
              )}

              {slug === 'viettel-cloud-npu' && (
                <div className="space-y-6">
                  {/* Slider 1: NPU Cores */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng vNPU Cores chuyên AI:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} NPU Cores</span>
                    </div>
                    <input type="range" min="1" max="16" step="1" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Core</span><span>16 Cores</span></div>
                  </div>

                  {/* Slider 2: vCPU */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng vCPU Cores phụ trợ:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} vCPU Cores</span>
                    </div>
                    <input type="range" min="4" max="64" step="4" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>4 Cores</span><span>64 Cores</span></div>
                  </div>

                  {/* Slider 3: RAM */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng bộ nhớ RAM:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3} GB RAM</span>
                    </div>
                    <input type="range" min="16" max="256" step="16" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>16 GB</span><span>256 GB</span></div>
                  </div>

                  {/* Slider 4: Storage NVMe */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Lưu trữ NVMe SSD Enterprise:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4} GB SSD</span>
                    </div>
                    <input type="range" min="100" max="2000" step="100" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>100 GB</span><span>2.000 GB (2 TB)</span></div>
                  </div>
                </div>
              )}

              {slug === 'viettel-virtual-private-cloud' && (
                <div className="space-y-6">
                  {/* Slider 1: VPC networks */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng VPC Phân vùng độc lập:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} VPCs</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 VPC</span><span>5 VPCs</span></div>
                  </div>

                  {/* Slider 2: NAT Gateways */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng NAT Gateways bảo mật:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} NAT Gateways</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Gateway</span><span>5 Gateways</span></div>
                  </div>

                  {/* Slider 3: VPN Gateways */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng kênh truyền VPN IPSec kết nối:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3} VPN Gateways</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Gateway</span><span>5 Gateways</span></div>
                  </div>

                  {/* Slider 4: Internet Bandwidth */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Tổng băng thông Internet Public WAN:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4} Mbps WAN</span>
                    </div>
                    <input type="range" min="100" max="5000" step="100" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>100 Mbps</span><span>5.000 Mbps (5 Gbps)</span></div>
                  </div>
                </div>
              )}

              {slug === 'viettel-dedicated-private-cloud' && (
                <div className="space-y-6">
                  {/* Slider 1: Hosts count */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng Dedicated Hosts vật lý:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Hosts</span>
                    </div>
                    <input type="range" min="1" max="16" step="1" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Host</span><span>16 Hosts</span></div>
                  </div>

                  {/* Resource 2: Host Type selector */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Lớp cấu hình máy chủ vật lý:</span>
                      <span className="text-[#EE0033] font-black uppercase">
                        {calcVal2 === 0 ? 'Dedicated Silver' : calcVal2 === 1 ? 'Dedicated Gold' : 'Dedicated Platinum'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 0, label: 'Silver' },
                        { id: 1, label: 'Gold' },
                        { id: 2, label: 'Platinum' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setCalcVal2(item.id)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
                            calcVal2 === item.id
                              ? 'bg-[#EE0033] text-white border-[#EE0033]'
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slider 3: SAN Storage */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng SAN Storage SSD RAID 10 thêm:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3.toLocaleString()} GB</span>
                    </div>
                    <input type="range" min="1000" max="30000" step="1000" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 TB</span><span>30 TB (30.000 GB)</span></div>
                  </div>

                  {/* Resource 4: Card speed selector */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Card mạng kết nối tủ Rack vật lý:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4} Gbps Port</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[10, 25, 40].map((v) => (
                        <button
                          key={v}
                          onClick={() => setCalcVal4(v)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
                            calcVal4 === v
                              ? 'bg-[#EE0033] text-white border-[#EE0033]'
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                          }`}
                        >
                          {v} Gbps
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* standard groups */}
              {getCalculatorGroup(slug) === 'k8s' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng Worker Nodes:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Nodes</span>
                    </div>
                    <input type="range" min="1" max="20" step="1" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Node</span><span>20 Nodes</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Cấu hình CPU mỗi Node:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} vCPUs</span>
                    </div>
                    <input type="range" min="2" max="32" step="2" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>2 Cores</span><span>32 Cores</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Bộ nhớ RAM mỗi Node:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3} GB RAM</span>
                    </div>
                    <input type="range" min="4" max="64" step="4" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>4 GB</span><span>64 GB</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng ổ đĩa SSD mỗi Node:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4} GB SSD</span>
                    </div>
                    <input type="range" min="50" max="500" step="50" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>50 GB</span><span>500 GB</span></div>
                  </div>
                </div>
              )}

              {getCalculatorGroup(slug) === 'datacenter' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Không gian thuê chỗ đặt:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} U (Rack Units)</span>
                    </div>
                    <input type="range" min="1" max="42" step="1" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 U</span><span>42 U (Full Rack)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Giới hạn công suất nguồn điện:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} Watts</span>
                    </div>
                    <input type="range" min="400" max="10000" step="400" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>400 W</span><span>10.000 W</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Băng thông mạng Internet:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3} Mbps WAN</span>
                    </div>
                    <input type="range" min="10" max="1000" step="10" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>10 Mbps</span><span>1.000 Mbps (1 Gbps)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng địa chỉ IP Public WAN thêm:</span>
                      <span className="text-[#EE0033] font-black">+{calcVal4} IPs</span>
                    </div>
                    <input type="range" min="1" max="16" step="1" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 IP</span><span>16 IPs</span></div>
                  </div>
                </div>
              )}

              {getCalculatorGroup(slug) === 'storage' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng lưu trữ yêu cầu:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1.toLocaleString()} GB</span>
                    </div>
                    <input type="range" min="50" max="50000" step="50" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>50 GB</span><span>50.000 GB (50 TB)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Chu kỳ giữ lại bản sao lưu (Retention):</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} Ngày</span>
                    </div>
                    <input type="range" min="7" max="365" step="7" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>7 Ngày</span><span>365 Ngày (1 Năm)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Băng thông truyền tải sao lưu:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3} Mbps WAN</span>
                    </div>
                    <input type="range" min="10" max="1000" step="10" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>10 Mbps</span><span>1.000 Mbps</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng máy chủ cần bảo vệ:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4} Servers</span>
                    </div>
                    <input type="range" min="1" max="50" step="1" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Server</span><span>50 Servers</span></div>
                  </div>
                </div>
              )}

              {getCalculatorGroup(slug) === 'database' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng Nodes trong cụm DB Cluster:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Nodes</span>
                    </div>
                    <input type="range" min="1" max="3" step="1" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Node (Single)</span><span>3 Nodes (Cluster)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Cấu hình vCPU mỗi Node:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} vCPUs</span>
                    </div>
                    <input type="range" min="2" max="16" step="2" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>2 Cores</span><span>16 Cores</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Bộ nhớ RAM mỗi Node:</span>
                      <span className="text-[#EE0033] font-black">{calcVal3} GB RAM ECC</span>
                    </div>
                    <input type="range" min="4" max="64" step="4" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>4 GB</span><span>64 GB</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng ổ đĩa SSD lưu cơ sở dữ liệu:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4} GB SSD</span>
                    </div>
                    <input type="range" min="50" max="2000" step="50" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>50 GB</span><span>2.000 GB (2 TB)</span></div>
                  </div>
                </div>
              )}

              {getCalculatorGroup(slug) === 'network' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Tốc độ cổng truyền dữ liệu:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Mbps Port</span>
                    </div>
                    <input type="range" min="10" max="10000" step="10" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>10 Mbps</span><span>10.000 Mbps (10 Gbps)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Cự ly kết nối vật lý (km):</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} km</span>
                    </div>
                    <input type="range" min="1" max="50" step="1" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 km</span><span>50 km</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dải IP tĩnh Public bổ sung:</span>
                      <span className="text-[#EE0033] font-black">
                        {calcVal3 === 0 ? '/29 (8 IPs)' : calcVal3 === 1 ? '/28 (16 IPs)' : '/27 (32 IPs)'}
                      </span>
                    </div>
                    <input type="range" min="0" max="2" step="1" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>/29 (8 IPs)</span><span>/27 (32 IPs)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Kênh truyền dự phòng Backup Leased Line:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4 === 1 ? 'Đã trang bị (Dự phòng)' : 'Không sử dụng'}</span>
                    </div>
                    <input type="range" min="0" max="1" step="1" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>Không dùng</span><span>Có Backup</span></div>
                  </div>
                </div>
              )}

              {getCalculatorGroup(slug) === 'security' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng tài sản số cần bảo vệ:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Assets (IPs/Domains)</span>
                    </div>
                    <input type="range" min="1" max="50" step="1" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Asset</span><span>50 Assets</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Băng thông lưu lượng lọc sạch tối đa:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} Mbps Traffic</span>
                    </div>
                    <input type="range" min="10" max="1000" step="10" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>10 Mbps</span><span>1.000 Mbps</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Gói cam kết vận hành kỹ thuật (SLA):</span>
                      <span className="text-[#EE0033] font-black">
                        {calcVal3 === 0 ? 'Tiêu Chuẩn (Standard)' : calcVal3 === 1 ? 'Chuyên Nghiệp (Professional)' : 'Khẩn Cấp 24/7 (Critical)'}
                      </span>
                    </div>
                    <input type="range" min="0" max="2" step="1" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>Tiêu chuẩn</span><span>Khẩn cấp 24/7</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Thời gian lưu trữ nhật ký Log hệ thống:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4} Ngày lưu trữ</span>
                    </div>
                    <input type="range" min="30" max="365" step="30" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>30 Ngày</span><span>365 Ngày (1 Năm)</span></div>
                  </div>
                </div>
              )}

              {getCalculatorGroup(slug) === 'saas' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng tài khoản / Licenses:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Users</span>
                    </div>
                    <input type="range" min="5" max="500" step="5" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>5 Users</span><span>500 Users</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng ổ đĩa dùng chung mỗi người:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} GB Storage</span>
                    </div>
                    <input type="range" min="10" max="1000" step="10" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>10 GB</span><span>1.000 GB (1 TB)</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Cấp độ bảo mật an toàn tài khoản:</span>
                      <span className="text-[#EE0033] font-black">
                        {calcVal3 === 0 ? 'Tiêu chuẩn' : calcVal3 === 1 ? 'Mã hóa đầu cuối' : 'Chống rò rỉ DLP'}
                      </span>
                    </div>
                    <input type="range" min="0" max="2" step="1" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>Tiêu chuẩn</span><span>Chống rò rỉ DLP</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số phút gọi CPaaS VoIP định danh hàng tháng:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4} Phút</span>
                    </div>
                    <input type="range" min="100" max="5000" step="100" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>100 Phút</span><span>5.000 Phút</span></div>
                  </div>
                </div>
              )}

              {getCalculatorGroup(slug) === 'hosting' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng Website/Tên miền chạy:</span>
                      <span className="text-[#EE0033] font-black">{calcVal1} Websites</span>
                    </div>
                    <input type="range" min="1" max="10" step="1" value={calcVal1} onChange={(e) => setCalcVal1(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>1 Web</span><span>10 Webs</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Dung lượng SSD Hosting:</span>
                      <span className="text-[#EE0033] font-black">{calcVal2} GB SSD</span>
                    </div>
                    <input type="range" min="5" max="100" step="5" value={calcVal2} onChange={(e) => setCalcVal2(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>5 GB</span><span>100 GB</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Số lượng hộp thư điện tử (Corporate Mail):</span>
                      <span className="text-[#EE0033] font-black">{calcVal3} Accounts</span>
                    </div>
                    <input type="range" min="5" max="100" step="5" value={calcVal3} onChange={(e) => setCalcVal3(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>5 Accounts</span><span>100 Accounts</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-300">Hệ thống lọc thư rác Anti-Spam Premium:</span>
                      <span className="text-[#EE0033] font-black">{calcVal4 === 1 ? 'Đã kích hoạt' : 'Tiêu chuẩn'}</span>
                    </div>
                    <input type="range" min="0" max="1" step="1" value={calcVal4} onChange={(e) => setCalcVal4(parseInt(e.target.value))} className="w-full accent-[#EE0033]" />
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold"><span>Tiêu chuẩn</span><span>Kích hoạt Premium</span></div>
                  </div>
                </div>
              )}

              {/* Cam kết thanh toán chu kỳ */}
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <span className="text-xs font-bold text-zinc-400 block">Chu kỳ thanh toán & Cam kết giảm giá:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 1, text: 'Hàng tháng', desc: 'Giá gốc' },
                    { val: 6, text: '6 Tháng', desc: 'Giảm 10%' },
                    { val: 12, text: '12 Tháng', desc: 'Giảm 20%' },
                    { val: 24, text: '24 Tháng', desc: 'Giảm 30%' }
                  ].map((p) => (
                    <button
                      key={p.val}
                      onClick={() => setCalcPeriod(p.val as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all duration-200 ${
                        calcPeriod === p.val
                          ? 'border-[#EE0033] bg-[#EE0033]/10 text-[#FF4D73]'
                          : 'border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      <span className="text-xs font-black block">{p.text}</span>
                      <span className="text-[9px] block mt-0.5 opacity-80">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right output side */}
            <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative shadow-2xl">
              <div className="absolute top-0 right-0 bg-[#EE0033]/5 w-32 h-32 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-3">Chi tiết cấu hình</h3>
                
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-start justify-between text-zinc-300">
                    <span className="text-zinc-500">Resource 01:</span>
                    <span className="font-bold text-right text-[#FF4D73]">{results.desc1}</span>
                  </div>
                  <div className="flex items-start justify-between text-zinc-300">
                    <span className="text-zinc-500">Resource 02:</span>
                    <span className="font-bold text-right">{results.desc2}</span>
                  </div>
                  <div className="flex items-start justify-between text-zinc-300">
                    <span className="text-zinc-500">Resource 03:</span>
                    <span className="font-bold text-right">{results.desc3}</span>
                  </div>
                  <div className="flex items-start justify-between text-zinc-300">
                    <span className="text-zinc-500">Resource 04:</span>
                    <span className="font-bold text-right">{results.desc4}</span>
                  </div>
                  <div className="flex items-start justify-between text-zinc-300 border-t border-dashed border-zinc-800 pt-3">
                    <span className="text-zinc-500">Chu kỳ cam kết:</span>
                    <span className="font-bold text-emerald-400">Cam kết {calcPeriod} Tháng</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5 pt-8 border-t border-zinc-800 mt-8">
                {calcPeriod !== 1 && (
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                    <span>Giá gốc ban đầu:</span>
                    <span className="line-through">{Math.round(results.subtotal).toLocaleString()} đ/Tháng</span>
                  </div>
                )}
                
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-extrabold block">GIÁ CƯỚC THỰC TẾ DỰ PHÓNG:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3.5xl md:text-4xl font-black text-[#EE0033] tracking-tight">
                      {Math.round(results.finalMonthly).toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-zinc-400">VND / Tháng</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 block">*Chưa bao gồm thuế VAT 10%. Giá cước chính xác theo từng dải cấu hình thực tế.</span>
                </div>

                <div className="space-y-3 pt-2">
                  <a 
                    href="/contact"
                    className="w-full block py-3.5 bg-[#EE0033] hover:bg-[#FF1A4E] text-white text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-[#EE0033]/15"
                  >
                    Đăng ký cấu hình này
                  </a>
                  <a 
                    href="/contact"
                    className="w-full block py-3.5 bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-350 hover:text-white text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300"
                  >
                    Tải bảng báo giá (.PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL FEATURES SECTION */}
      <section id="features" className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="ali-container space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">TÍNH NĂNG KỸ THUẬT</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Giải pháp tính năng tích hợp toàn diện
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Không chỉ đơn thuần cung cấp tài nguyên tính toán, chúng tôi mang đến hệ sinh thái quản lý tiện ích đồng bộ.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {data.features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-gray-200/80 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-350 group cursor-pointer"
              >
                <div className="space-y-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FAFAFA] text-[#EE0033] border border-gray-100 transition-all duration-300 group-hover:bg-[#FFF0F2] group-hover:border-[#FCD9D8]">
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm md:text-base text-gray-950 tracking-tight group-hover:text-[#EE0033] transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED NATIVE PLATFORM SELECTOR (VMware vs Openstack / Hardware Specifications) */}
      <section id="platform-selector" className="py-16 md:py-20 bg-gray-25/50 border-b border-gray-100 text-left">
        <div className="ali-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">CÔNG NGHỆ CỐT LÕI</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              {data.platformTitle}
            </h2>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              {data.platformDesc}
            </p>
            <div className="bg-[#FFF5F6] border-l-4 border-[#EE0033] p-4 text-[11px] text-[#A6001D] rounded-r-lg space-y-1 leading-normal">
              <strong>💡 Cam kết tối cao của Viettel IDC:</strong>
              <p>Toàn bộ cơ sở hạ tầng mạng lưới tủ Rack, cáp kết nối vật lý, thiết bị chuyển mạch được đặt tại các Trung tâm dữ liệu của Viettel IDC, bảo vệ an toàn vật lý và logic bởi quy chuẩn an ninh khắt khe bậc nhất.</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.platforms.map((plat) => (
              <motion.div 
                key={plat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md hover:border-[#EE0033]/30 transition-all duration-300 relative"
              >
                <div className="space-y-3">
                  <h3 className="font-extrabold text-base text-gray-950 tracking-tight">{plat.name}</h3>
                  <p className="text-[11px] text-[#EE0033] font-bold">{plat.desc}</p>
                  <ul className="space-y-2 pt-2 border-t border-gray-100">
                    {plat.specs.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#EE0033] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET USE CASES SECTION */}
      <section id="use-cases" className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="ali-container space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">KỊCH BẢN ÁP DỤNG</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Giải pháp kịch bản tối ưu ứng dụng thực tế
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Thách thức từ hoạt động của doanh nghiệp bạn được giải quyết triệt để nhờ cấu trúc giải pháp linh hoạt của chúng tôi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            {data.useCases.map((uc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-lg hover:border-[#EE0033]/30 transition-all duration-300 shadow-sm relative overflow-hidden text-left"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#EE0033] flex items-center justify-center">
                    {uc.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-gray-950 tracking-tight">{uc.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between items-center text-xs font-bold text-[#EE0033]">
                  <span>{uc.metrics}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL FAQ SECTION */}
      <section id="faq" className="py-16 md:py-20 bg-gray-25/50">
        <div className="ali-container max-w-4xl space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">HỎI ĐÁP KỸ THUẬT</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Giải đáp các câu hỏi thường gặp
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các thông tin hỗ trợ kỹ thuật chi tiết nhất từ đội ngũ chuyên gia hạ tầng mạng lưới của chúng tôi.
            </p>
          </motion.div>

          <div className="space-y-4 text-left">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFAQ === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs"
                >
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left font-bold text-sm md:text-base text-gray-950 gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#EE0033]' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
