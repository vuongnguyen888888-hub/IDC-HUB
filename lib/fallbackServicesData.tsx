import React from 'react';
import { 
  Sparkles, Zap, Layers, Activity, Network, Database, Settings, 
  Calculator, Shield, Globe, Check, AlertCircle, Clock, Bell, 
  Phone, BookOpen, Lock, ArrowUpRight, ChevronRight, ChevronDown,
  Server, Cpu, HelpCircle, HardDrive, Box, Eye, BarChart, FileText,
  ArrowRight, RefreshCw
} from 'lucide-react';

export interface CustomServiceData {
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

interface ServiceMeta {
  name: string;
  category: string;
  tagline: string;
  desc: string;
}

const SERVICE_METAS: Record<string, ServiceMeta> = {
  'viettel-open-kubernetes-service-voks': {
    name: 'Viettel Open Kubernetes Service (vOKS)',
    category: 'Điện toán & Container',
    tagline: 'Quản trị Kubernetes tự động trên đám mây',
    desc: 'Hệ thống tự động hóa triển khai, mở rộng và quản lý các ứng dụng dạng container dựa trên nền tảng Kubernetes mã nguồn mở cao cấp.'
  },
  'viettel-dedicated-kubernetes-service-vdks': {
    name: 'Viettel Dedicated Kubernetes Service (vDKS)',
    category: 'Điện toán & Container',
    tagline: 'Cụm Kubernetes vật lý chuyên dụng',
    desc: 'Giải pháp Kubernetes chạy trên hạ tầng máy chủ vật lý chuyên dụng (Bare Metal), đảm bảo hiệu năng tối đa và tính cô lập bảo mật tuyệt đối.'
  },
  'viettel-container-registry-vcr': {
    name: 'Viettel Container Registry (vCR)',
    category: 'Điện toán & Container',
    tagline: 'Lưu trữ và quản lý Docker Images an toàn',
    desc: 'Dịch vụ lưu trữ, quản lý và quét lỗ hổng bảo mật cho các container images, tích hợp chặt chẽ với quy trình CI/CD của doanh nghiệp.'
  },
  'viettel-colocation': {
    name: 'Colocation (Rack / Cage / Suite)',
    category: 'Trung tâm dữ liệu',
    tagline: 'Thuê chỗ đặt máy chủ chuẩn Rated 3 TIA-942',
    desc: 'Cung cấp không gian, nguồn điện, điều hòa và kết nối Internet tốc độ cao để khách hàng tự đặt hệ thống máy chủ của mình.'
  },
  'dedicated-server-leasing-bare-metal': {
    name: 'Dedicated Server Leasing (Bare Metal)',
    category: 'Trung tâm dữ liệu',
    tagline: 'Thuê máy chủ vật lý dùng riêng hiệu năng cao',
    desc: 'Dịch vụ cho thuê máy chủ vật lý chuyên dụng riêng biệt từ các hãng Dell, HP, Lenovo thế hệ mới nhất, toàn quyền quản trị root.'
  },
  'viettel-data-center-consulting': {
    name: 'Viettel Data Center Consulting',
    category: 'Trung tâm dữ liệu',
    tagline: 'Tư vấn, thiết kế trung tâm dữ liệu tiêu chuẩn',
    desc: 'Dịch vụ tư vấn quy hoạch, thiết kế kiến trúc kỹ thuật và vận hành Trung tâm dữ liệu theo tiêu chuẩn quốc tế Rated 3/Rated 4.'
  },
  'viettel-cloud-object-storage': {
    name: 'Viettel Cloud Object Storage',
    category: 'Lưu trữ & Sao lưu',
    tagline: 'Lưu trữ đối tượng chuẩn S3 bảo mật cao',
    desc: 'Lưu trữ dữ liệu phi cấu trúc không giới hạn dung lượng với chuẩn giao tiếp S3 API, tối ưu hóa chi phí và đảm bảo độ bền dữ liệu 99.9999999%.'
  },
  'viettel-cloud-file-storage': {
    name: 'Viettel Cloud File Storage',
    category: 'Lưu trữ & Sao lưu',
    tagline: 'Hệ thống lưu trữ tệp tin chia sẻ dùng chung',
    desc: 'Dịch vụ lưu trữ tệp tin có khả năng chia sẻ đồng thời cho nhiều máy chủ ảo (VMs) qua các giao thức mạng phổ biến NFS/CIFS/SMB.'
  },
  'viettel-cloud-backup-baas': {
    name: 'Viettel Cloud Backup (BaaS)',
    category: 'Lưu trữ & Sao lưu',
    tagline: 'Sao lưu dữ liệu tự động lên đám mây',
    desc: 'Giải pháp sao lưu và phục hồi dữ liệu tự động cho máy chủ, cơ sở dữ liệu và ứng dụng giúp bảo vệ an toàn trước ransomware.'
  },
  'viettel-cloud-disaster-recovery-draas': {
    name: 'Viettel Cloud Disaster Recovery (DRaaS)',
    category: 'Lưu trữ & Sao lưu',
    tagline: 'Khôi phục thảm họa CNTT toàn diện',
    desc: 'Đảm bảo hoạt động kinh doanh liên tục (BCP) thông qua cơ chế nhân bản thời gian thực toàn bộ hạ tầng lên trung tâm dữ liệu dự phòng.'
  },
  'viettel-cloud-data-archiving': {
    name: 'Viettel Cloud Data Archiving',
    category: 'Lưu trữ & Sao lưu',
    tagline: 'Lưu trữ lạnh dữ liệu lịch sử tối ưu chi phí',
    desc: 'Lưu trữ dữ liệu ít truy cập trong thời gian dài (lưu trữ tuân thủ pháp lý, nhật ký hệ thống) với mức chi phí cực rẻ.'
  },
  'viettel-database-service-vdbs': {
    name: 'Viettel Database Service (vDBS)',
    category: 'Cơ sở dữ liệu & Nền tảng',
    tagline: 'Cơ sở dữ liệu quản trị hoàn toàn (Managed DB)',
    desc: 'Dịch vụ tự động hóa cấu hình, sao lưu và vận hành các cơ sở dữ liệu phổ biến như PostgreSQL, MySQL, SQL Server trên đám mây.'
  },
  'viettel-caching-service-vcas': {
    name: 'Viettel Caching Service (vCAS)',
    category: 'Cơ sở dữ liệu & Nền tảng',
    tagline: 'Bộ nhớ đệm Redis/Memcached siêu tốc độ',
    desc: 'Tăng tốc ứng dụng của bạn bằng cách lưu trữ dữ liệu đệm tạm thời trên bộ nhớ RAM tốc độ cao, giảm tải tối đa cho DB chính.'
  },
  'viettel-search-engine-service-vse': {
    name: 'Viettel Search Engine Service (vSE)',
    category: 'Cơ sở dữ liệu & Nền tảng',
    tagline: 'Công cụ tìm kiếm Elasticsearch chuyên sâu',
    desc: 'Dịch vụ quản trị Elasticsearch giúp doanh nghiệp triển khai tính năng tìm kiếm văn bản đầy đủ (Full-text search) và phân tích log thời gian thực.'
  },
  'viettel-api-gateway': {
    name: 'Viettel API Gateway',
    category: 'Cơ sở dữ liệu & Nền tảng',
    tagline: 'Quản lý, bảo mật và phân phối APIs tập trung',
    desc: 'Cổng kết nối API bảo mật cao giúp quản lý lưu lượng, kiểm soát quyền truy cập, giới hạn tần suất gọi (rate-limiting) cho microservices.'
  },
  'viettel-queue-messaging-vkqs': {
    name: 'Viettel Queue & Messaging (vKQS)',
    category: 'Cơ sở dữ liệu & Nền tảng',
    tagline: 'Hàng đợi tin nhắn RabbitMQ/Kafka tin cậy',
    desc: 'Giải pháp truyền tin nhắn trung gian giữa các dịch vụ trong hệ thống phân tán, đảm bảo tin nhắn không bị mất mát.'
  },
  'viettel-interconnection-leased-line': {
    name: 'Viettel Interconnection (Leased Line)',
    category: 'Kết nối mạng & CDN',
    tagline: 'Kênh truyền internet dùng riêng đối xứng',
    desc: 'Cung cấp đường truyền Internet dùng riêng trực tiếp, băng thông cam kết đối xứng, kết nối trực tiếp tới các ISP quốc tế lớn.'
  },
  'viettel-cloud-connect': {
    name: 'Viettel Cloud Connect',
    category: 'Kết nối mạng & CDN',
    tagline: 'Kết nối trực tiếp tới AWS, Azure, Google Cloud',
    desc: 'Giải pháp thiết lập kênh truyền chuyên dụng tốc độ cao, độ trễ thấp nối trực tiếp từ On-Premise của bạn tới các public cloud toàn cầu.'
  },
  'viettel-hybrid-connect': {
    name: 'Viettel Hybrid Connect',
    category: 'Kết nối mạng & CDN',
    tagline: 'Mạng lai kết nối mượt mà đa nền tảng',
    desc: 'Liên kết hạ tầng tại chỗ (On-Premise) với đám mây Viettel Cloud thông qua kết nối VPN MPLS hoặc IPSec an toàn tuyệt đối.'
  },
  'viettel-sd-wan': {
    name: 'Viettel SD-WAN',
    category: 'Kết nối mạng & CDN',
    tagline: 'Giải pháp mạng diện rộng định nghĩa bằng phần mềm',
    desc: 'Quản lý tập trung toàn bộ kết nối WAN của doanh nghiệp có nhiều chi nhánh, tối ưu hóa đường truyền thông minh và tiết kiệm chi phí.'
  },
  'viettel-media-cdn': {
    name: 'Viettel Media CDN',
    category: 'Kết nối mạng & CDN',
    tagline: 'Phân phối nội dung video, livestream mượt mà',
    desc: 'Tối ưu hóa truyền tải nội dung đa phương tiện, video streaming chất lượng cao, giảm tải giật lag nhờ hạ tầng mạng Edge phủ rộng toàn quốc.'
  },
  'viettel-multi-cdn-vmcdn': {
    name: 'Viettel Multi-CDN (vMCDN)',
    category: 'Kết nối mạng & CDN',
    tagline: 'Hệ thống Multi-CDN điều hướng thông minh',
    desc: 'Kết hợp sức mạnh của nhiều mạng CDN hàng đầu để tự động điều hướng người dùng tới máy chủ CDN có tốc độ tốt nhất.'
  },
  'viettel-cloud-firewall': {
    name: 'Viettel Cloud Firewall',
    category: 'An toàn thông tin',
    tagline: 'Tường lửa thế hệ mới bảo vệ hạ tầng đám mây',
    desc: 'Kiểm soát, giám sát và lọc toàn bộ lưu lượng mạng ra vào hệ thống Cloud ảo hóa của doanh nghiệp dựa trên các quy tắc bảo mật thông minh.'
  },
  'viettel-cwaf-web-app-firewall': {
    name: 'Viettel CWAF (Web App Firewall)',
    category: 'An toàn thông tin',
    tagline: 'Tường lửa bảo vệ ứng dụng Web chuyên sâu',
    desc: 'Chặn đứng các cuộc tấn công khai thác lỗ hổng Web phổ biến (OWASP Top 10) như SQL Injection, Cross-Site Scripting (XSS), Botnet.'
  },
  'viettel-anti-ddos': {
    name: 'Viettel Anti-DDoS',
    category: 'An toàn thông tin',
    tagline: 'Lọc sạch tấn công từ chối dịch vụ DDoS',
    desc: 'Hệ thống phát hiện và giảm thiểu các cuộc tấn công DDoS quy mô lớn ở cả tầng mạng (L3/L4) và tầng ứng dụng (L7) theo thời gian thực.'
  },
  'viettel-endpoint-security': {
    name: 'Viettel Endpoint Security',
    category: 'An toàn thông tin',
    tagline: 'Bảo mật thiết bị đầu cuối toàn diện',
    desc: 'Bảo vệ máy tính cá nhân, máy chủ và thiết bị di động của doanh nghiệp khỏi virus, ransomware và mã độc nâng cao thông qua công cụ EDR.'
  },
  'viettel-ssl-pki': {
    name: 'Viettel SSL / PKI',
    category: 'An toàn thông tin',
    tagline: 'Chứng chỉ bảo mật SSL/TLS doanh nghiệp',
    desc: 'Cung cấp chứng chỉ SSL chính hãng (DigiCert, Sectigo) giúp mã hóa toàn bộ thông tin truyền tải giữa trình duyệt người dùng và máy chủ.'
  },
  'viettel-vcloudrity': {
    name: 'Viettel vCloudrity',
    category: 'An toàn thông tin',
    tagline: 'Giám sát an ninh mạng thế hệ mới',
    desc: 'Nền tảng tự động phát hiện, phân tích và phản ứng nhanh với các sự cố an ninh thông tin, tối ưu hóa khả năng phòng thủ số.'
  },
  'viettel-virtual-soc': {
    name: 'Viettel Virtual SOC',
    category: 'An toàn thông tin',
    tagline: 'Trung tâm giám sát an ninh mạng ảo 24/7',
    desc: 'Dịch vụ vận hành bởi đội ngũ chuyên gia bảo mật hàng đầu của Viettel, liên tục giám sát và xử lý các nguy cơ tấn công mạng cho doanh nghiệp.'
  },
  'viettel-threat-intelligence': {
    name: 'Viettel Threat Intelligence',
    category: 'An toàn thông tin',
    tagline: 'Cơ sở tri thức tình báo mối đe dọa mạng',
    desc: 'Cập nhật liên tục thông tin về các chiến dịch tấn công, hacker, và các lỗ hổng zero-day giúp doanh nghiệp chủ động phòng ngự trước.'
  },
  'viettel-threat-hunting': {
    name: 'Viettel Threat Hunting',
    category: 'An toàn thông tin',
    tagline: 'Chủ động săn lùng mối đe dọa ẩn sâu',
    desc: 'Sử dụng các công cụ phân tích hành vi nâng cao để tìm kiếm các mã độc, cuộc tấn công tinh vi đã vượt qua hệ thống phòng thủ thông thường.'
  },
  'viettel-cyber-security-maturity-vcsmp': {
    name: 'Viettel Cyber Security Maturity (vCSMP)',
    category: 'An toàn thông tin',
    tagline: 'Đánh giá mức độ trưởng thành an toàn thông tin',
    desc: 'Khảo sát, đo lường và cấp chứng nhận đánh giá năng lực bảo mật CNTT toàn diện của doanh nghiệp theo các bộ tiêu chuẩn quốc tế.'
  },
  'viettel-application-performance-monitoring-apm': {
    name: 'Viettel Application Performance Monitoring (APM)',
    category: 'Giám sát & Quản lý',
    tagline: 'Giám sát hiệu năng ứng dụng chuyên sâu',
    desc: 'Phân tích trải nghiệm người dùng, thời gian phản hồi của database, và các đoạn code nghẽn cổ chai để tối ưu ứng dụng đạt tốc độ đỉnh cao.'
  },
  'viettel-cloudwatch': {
    name: 'Viettel CloudWatch',
    category: 'Giám sát & Quản lý',
    tagline: 'Hệ thống thu thập log và cảnh báo tài nguyên',
    desc: 'Cung cấp cái nhìn toàn cảnh về tài nguyên hạ tầng CPU, RAM, Network, thiết lập ngưỡng cảnh báo tức thì qua Telegram/Email/SMS.'
  },
  'viettel-cloud-management-platform': {
    name: 'Viettel Cloud Management Platform',
    category: 'Giám sát & Quản lý',
    tagline: 'Cổng quản trị đa đám mây tập trung',
    desc: 'Một bảng điều khiển hợp nhất giúp doanh nghiệp dễ dàng khởi tạo, quản lý và kiểm soát chi phí trên cả Viettel Cloud và Private Cloud.'
  },
  'microsoft-365-doi-tac': {
    name: 'Microsoft 365 (đối tác)',
    category: 'SaaS & Ứng dụng',
    tagline: 'Bộ công cụ văn phòng đám mây Microsoft chính hãng',
    desc: 'Cung cấp bản quyền Microsoft Word, Excel, Teams, Outlook chính hãng đi kèm dịch vụ hỗ trợ kỹ thuật 24/7 từ chuyên gia Viettel IDC.'
  },
  'viettel-drive': {
    name: 'Viettel Drive',
    category: 'SaaS & Ứng dụng',
    tagline: 'Lưu trữ và đồng bộ hóa tệp tin doanh nghiệp',
    desc: 'Giải pháp lưu trữ tệp tin đám mây riêng cho doanh nghiệp, dễ dàng chia sẻ, cộng tác tài liệu thời gian thực và bảo mật tối đa.'
  },
  'viettel-cloud-pc': {
    name: 'Viettel Cloud PC',
    category: 'SaaS & Ứng dụng',
    tagline: 'Máy tính ảo hóa cá nhân hiệu năng cao',
    desc: 'Máy tính cá nhân chạy trên đám mây, cho phép nhân viên truy cập làm việc an toàn từ bất kỳ thiết bị nào (Thin Client, Laptop, Phone).'
  },
  'viettel-cloud-desktop-daas': {
    name: 'Viettel Cloud Desktop (DaaS)',
    category: 'SaaS & Ứng dụng',
    tagline: 'Hạ tầng máy tính ảo quản trị tập trung',
    desc: 'Triển khai hàng loạt hàng nghìn máy tính văn phòng ảo chỉ trong vài phút, giúp phòng IT dễ dàng quản lý phần mềm và dữ liệu tập trung.'
  },
  'viettel-license-leasing': {
    name: 'Viettel License Leasing',
    category: 'SaaS & Ứng dụng',
    tagline: 'Cho thuê bản quyền phần mềm chính hãng',
    desc: 'Cung cấp giấy phép bản quyền Windows Server, SQL Server, Oracle, VMware, cPanel với hình thức thuê bao tháng linh hoạt.'
  },
  'viettel-voice-brandname-cpaas': {
    name: 'Viettel Voice Brandname (CPaaS)',
    category: 'SaaS & Ứng dụng',
    tagline: 'Cuộc gọi thương hiệu định danh khách hàng',
    desc: 'Hiển thị tên thương hiệu doanh nghiệp khi thực hiện cuộc gọi chăm sóc khách hàng hoặc quảng cáo, nâng cao 80% tỷ lệ bắt máy.'
  },
  'viettel-cloud-camera-vsaas': {
    name: 'Viettel Cloud Camera (VSaaS)',
    category: 'SaaS & Ứng dụng',
    tagline: 'Giám sát camera an ninh thông minh AI',
    desc: 'Dịch vụ lưu trữ dữ liệu camera trực tiếp lên đám mây, tích hợp AI nhận diện khuôn mặt, cảnh báo xâm nhập và đếm lưu lượng.'
  },
  'viettel-managed-services-msp': {
    name: 'Viettel Managed Services (MSP)',
    category: 'Dịch vụ Managed',
    tagline: 'Dịch vụ quản trị hạ tầng CNTT thuê ngoài',
    desc: 'Ủy thác toàn bộ hoạt động giám sát, vận hành, tối ưu hóa và xử lý sự cố hệ thống CNTT cho đội ngũ kỹ sư chuyên gia của Viettel IDC.'
  },
  'viettel-multi-cloud-management': {
    name: 'Viettel Multi-cloud Management',
    category: 'Dịch vụ Managed',
    tagline: 'Quản trị hạ tầng đa đám mây chuyên nghiệp',
    desc: 'Hỗ trợ thiết kế, di chuyển dữ liệu và tối ưu chi phí vận hành đồng thời trên Viettel Cloud, AWS, GCP và Azure.'
  },
  'viettel-cloud-migration': {
    name: 'Viettel Cloud Migration',
    category: 'Dịch vụ Managed',
    tagline: 'Dịch chuyển hạ tầng lên đám mây không gián đoạn',
    desc: 'Chuyên gia Viettel thực hiện di dời toàn bộ dữ liệu, database và ứng dụng của bạn từ On-Premise lên Cloud an toàn, zero-downtime.'
  },
  'viettel-domain-dns': {
    name: 'Viettel Domain (DNS)',
    category: 'Tên miền & Web Hosting',
    tagline: 'Đăng ký tên miền quốc gia và quốc tế',
    desc: 'Đại lý chính thức của VNNIC cung cấp tên miền .VN và quốc tế đi kèm hệ thống quản lý Anycast DNS tốc độ phân giải siêu tốc.'
  },
  'viettel-web-hosting': {
    name: 'Viettel Web Hosting',
    category: 'Tên miền & Web Hosting',
    tagline: 'Lưu trữ website doanh nghiệp tốc độ cao',
    desc: 'Không gian lưu trữ website tối ưu, hỗ trợ PHP, Node.js, cơ sở dữ liệu SSD siêu tốc, miễn phí chứng chỉ SSL và sao lưu hàng tuần.'
  },
  'viettel-email-hosting': {
    name: 'Viettel Email Hosting',
    category: 'Tên miền & Web Hosting',
    tagline: 'Email doanh nghiệp theo tên miền riêng',
    desc: 'Nâng tầm uy tín thương hiệu với địa chỉ email dạng name@domain.com, tích hợp lọc thư rác SpamAssassin chuyên sâu.'
  }
};

export const getFallbackServiceData = (slug: string): CustomServiceData => {
  // Check if we have defined metadata for this slug
  const meta = SERVICE_METAS[slug] || {
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: 'Dịch vụ đám mây',
    tagline: 'Giải pháp hạ tầng đám mây tối ưu cho doanh nghiệp',
    desc: 'Dịch vụ đám mây thế hệ mới của Viettel IDC, tối ưu chi phí và nâng cao năng lực cạnh tranh số của doanh nghiệp.'
  };

  const name = meta.name;
  const category = meta.category;
  const tagline = meta.tagline;
  const desc = meta.desc;

  // Initialize defaults
  let iconBgClass = 'bg-[#EE0033]/10';
  let iconColorClass = 'text-[#EE0033]';
  let primaryIcon = <Sparkles className="w-5 h-5" />;
  let secondaryIcon = <Zap className="w-5 h-5" />;
  let tertiaryIcon = <Layers className="w-5 h-5" />;

  let stats = [
    { label: 'Cam kết SLA', value: '99.99%', desc: 'Hoạt động liên tục, bảo đảm bằng tài chính.' },
    { label: 'Hỗ trợ kỹ thuật', value: '24/7/365', desc: 'Đội ngũ kỹ sư giàu kinh nghiệm hỗ trợ trực tiếp.' },
    { label: 'Hạ tầng mạng', value: '10 Gbps', desc: 'Băng thông kết nối đường trục siêu tốc độ, ổn định.' },
    { label: 'An toàn dữ liệu', value: 'ISO 27001', desc: 'Tuân thủ nghiêm ngặt các tiêu chuẩn bảo mật quốc tế.' }
  ];

  let advantages = [
    { title: 'Tối ưu hóa hiệu năng vượt trội', desc: `Được vận hành trên hạ tầng phần cứng thế hệ mới nhất, đảm bảo dịch vụ ${name} luôn chạy ở trạng thái tốt nhất.`, icon: primaryIcon },
    { title: 'An toàn thông tin đa lớp', desc: 'Tích hợp hệ thống phòng chống tấn công DDoS, mã hóa kênh truyền bảo vệ toàn vẹn tài sản số của doanh nghiệp.', icon: <Shield className="w-5 h-5" /> },
    { title: 'Quản trị tập trung, tinh gọn', desc: 'Sở hữu giao diện quản lý trực quan tự động hóa tới 90% các tác vụ vận hành cấu hình hàng ngày.', icon: <Settings className="w-5 h-5" /> },
    { title: 'Hỗ trợ kỹ thuật chuyên sâu 24/7', desc: 'Kỹ sư CNTT hỗ trợ trực tiếp bằng tiếng Việt, phản hồi sự cố trong vòng 15 phút cam kết đồng hành.', icon: <Clock className="w-5 h-5" /> }
  ];

  let platforms = [
    {
      id: 'viettel-hcl',
      name: 'Viettel Enterprise Hardware Layer',
      desc: 'Hệ thống hạ tầng vật lý chính hãng được thiết kế chuyên dụng cho môi trường vận hành lớn.',
      specs: [
        'Máy chủ Dell PowerEdge Intel Xeon Scalable thế hệ mới nhất',
        'Ổ đĩa SSD Enterprise chuyên dụng với độ bền gấp 10 lần SSD thông thường',
        'Cáp quang kết nối dự phòng 2x 25 Gbps Active-Active lên tủ mạng Core',
        'Hệ thống lưu trữ tập trung SAN lưu trữ SAN qua giao thức Fibre Channel'
      ]
    },
    {
      id: 'viettel-scl',
      name: 'Software-Defined & Cloud Stack',
      desc: 'Lớp ảo hóa thông minh tối ưu hóa phân phối tài nguyên và quản lý tự động.',
      specs: [
        'Hệ điều hành ảo hóa Enterprise hàng đầu thế giới bảo mật cao',
        'Hệ thống giám sát tài nguyên thông minh thời gian thực',
        'Mạng ảo hóa Software-Defined Network (SDN) cô lập băng thông độc lập',
        'Cơ chế sao lưu nhanh tự động (Snapshot) bảo vệ trước sự cố đột xuất'
      ]
    }
  ];

  let pricingPlans = [
    {
      id: 'plan-basic',
      name: 'Gói Cơ Bản (Basic)',
      badge: 'Khởi đầu',
      tag: 'Tối ưu chi phí cho cá nhân & doanh nghiệp nhỏ',
      price: '450.000',
      period: 'Tháng',
      specs: [
        'Cấu hình tài nguyên tiêu chuẩn',
        'Băng thông kết nối trong nước 100 Mbps',
        'Hỗ trợ kỹ thuật qua Ticket & Email',
        'Cam kết chất lượng dịch vụ SLA 99.9%',
        'Chu kỳ sao lưu dữ liệu: Hàng tuần (Weekly Snapshot)'
      ],
      featured: false
    },
    {
      id: 'plan-pro',
      name: 'Gói Chuyên Nghiệp (Pro)',
      badge: 'Phổ biến nhất',
      tag: 'Phù hợp cho các hệ thống đang tăng trưởng mạnh',
      price: '1.200.000',
      period: 'Tháng',
      specs: [
        'Cấu hình tài nguyên nhân đôi mạnh mẽ',
        'Băng thông kết nối trong nước 150 Mbps, quốc tế 5 Mbps',
        'Hỗ trợ kỹ thuật ưu tiên qua Điện thoại & Hotline 24/7',
        'Cam kết chất lượng dịch vụ SLA 99.99%',
        'Chu kỳ sao lưu dữ liệu: Hàng ngày (Daily Backup)',
        'Tặng kèm IP tĩnh Public bảo mật'
      ],
      featured: true
    },
    {
      id: 'plan-enterprise',
      name: 'Gói Doanh Nghiệp (Enterprise)',
      badge: 'Cao cấp nhất',
      tag: 'Thiết kế riêng cho hệ thống cốt lõi quy mô lớn',
      price: '4.500.000',
      period: 'Tháng',
      specs: [
        'Cấu hình tài nguyên tùy biến không giới hạn',
        'Băng thông kết nối trong nước 300 Mbps, quốc tế 10 Mbps',
        'Đội ngũ kỹ sư hỗ trợ riêng biệt (Dedicated Tech Account)',
        'Cam kết chất lượng dịch vụ SLA tối đa 99.995%',
        'Chu kỳ sao lưu dữ liệu: Thời gian thực (Real-time Mirroring)',
        'Hỗ trợ thiết lập VPN/Leased Line kết nối On-Premise'
      ],
      featured: false
    }
  ];

  let features = [
    { title: 'Khởi tạo tức thì chỉ trong vài phút', desc: `Toàn bộ hạ tầng phục vụ ${name} được khởi tạo hoàn toàn tự động thông qua cổng portal quản lý thông minh.`, icon: <Zap className="w-5 h-5" /> },
    { title: 'Tương thích tuyệt đối và liền mạch', desc: 'Hỗ trợ các chuẩn kết nối API tiêu chuẩn toàn cầu giúp dễ dàng tích hợp dịch vụ vào các hệ thống sẵn có của bạn.', icon: <Layers className="w-5 h-5" /> },
    { title: 'Bảo mật đa lớp tường lửa an toàn', desc: 'Bảo vệ tài sản số trước các cuộc tấn công quét cổng, khai thác lỗ hổng bằng tường lửa tích hợp sẵn có bảo mật cực cao.', icon: <Shield className="w-5 h-5" /> },
    { title: 'Sao lưu phục hồi dữ liệu thông minh', desc: 'Cơ chế chụp ảnh hệ thống nhanh tự động giúp doanh nghiệp dễ dàng phục hồi nguyên trạng trước các sự cố ransomware phá hoại.', icon: <RefreshCw className="w-5 h-5" /> }
  ];

  let useCases = [
    { title: `Ứng dụng cho hệ thống thương mại điện tử`, desc: 'Giải quyết triệt để bài toán tải lượng truy cập tăng vọt trong các dịp khuyến mãi mà không lo nghẽn mạng.', metrics: 'Khả năng đáp ứng > 500k CCU', icon: <Globe className="w-5 h-5" /> },
    { title: `Hạ tầng số cho chuyển đổi tài chính`, desc: 'Sự lựa chọn đáng tin cậy của các tổ chức ngân hàng, Fintech để lưu giữ và bảo vệ thông tin giao dịch tối mật.', metrics: 'Bảo mật chuẩn ngân hàng PCI-DSS', icon: <Lock className="w-5 h-5" /> },
    { title: `Nền tảng ERP doanh nghiệp toàn diện`, desc: 'Vận hành trơn tru các ứng dụng quản lý doanh nghiệp ERP, CRM nặng nề, đòi hỏi thông lượng và tốc độ ổ đĩa cực lớn.', metrics: 'Tăng tốc độ truy xuất cơ sở dữ liệu 300%', icon: <Activity className="w-5 h-5" /> }
  ];

  let faqs = [
    { q: `Dịch vụ ${name} của Viettel IDC có được hỗ trợ kỹ thuật trực tiếp không?`, a: `Có. Tất cả các khách hàng sử dụng dịch vụ ${name} của Viettel IDC đều nhận được sự hỗ trợ trực tiếp 24/7/365 bằng tiếng Việt từ phòng kỹ thuật giàu kinh nghiệm thông qua Hotline, Email hoặc Hệ thống Ticket Portal.` },
    { q: 'Hạ tầng máy chủ cung cấp dịch vụ được đặt ở đâu?', a: 'Dịch vụ của chúng tôi được phân bổ trên 5 Trung tâm dữ liệu lớn của Viettel IDC tại Hà Nội (Hòa Lạc, Pháp Vân), Đà Nẵng và TP. Hồ Chí Minh (Hoàng Hoa Thám, Bình Dương). Tất cả đều đạt chuẩn quốc tế Rated 3 TIA-942 cao nhất.' },
    { q: 'Tôi có thể nâng cấp tài nguyên cấu hình trong quá trình sử dụng không?', a: 'Có. Bạn có thể chủ động nâng cấp dung lượng lưu trữ, băng thông mạng, số lượng tài khoản sử dụng bất kỳ lúc nào trực tiếp ngay trên giao diện portal quản lý. Hệ thống tự động nâng cấp thời gian thực và không gây gián đoạn dịch vụ của bạn.' }
  ];

  // Apply customizations depending on category
  if (category.includes('Trung tâm')) {
    iconBgClass = 'bg-red-50';
    iconColorClass = 'text-[#EE0033]';
    primaryIcon = <Database className="w-5 h-5" />;
    secondaryIcon = <Server className="w-5 h-5" />;
    tertiaryIcon = <Activity className="w-5 h-5" />;

    stats = [
      { label: 'SLA Sẵn Sàng', value: '99.995%', desc: 'Độ khả dụng nguồn điện và làm mát phòng máy cực cao.' },
      { label: 'Dự Phòng Nguồn', value: '⚡ Active-Active', desc: 'Hai nhánh nguồn UPS độc lập 2N+1 cho mỗi tủ Rack.' },
      { label: 'Hiệu Quả Năng Lượng', value: 'PUE < 1.4', desc: 'Hệ thống tối ưu năng lượng đạt chuẩn phòng máy xanh.' },
      { label: 'Tiêu Chuẩn Phòng Máy', value: 'Rated 3', desc: 'Đạt chứng chỉ quốc tế Rated 3 TIA-942 khắt khe nhất.' }
    ];

    advantages = [
      { title: 'Phòng máy chuẩn Rated 3 quốc tế', desc: 'Hệ thống tủ rack tiêu chuẩn quốc tế đặt tại trung tâm dữ liệu Hòa Lạc và Bình Dương lớn nhất Việt Nam.', icon: <Database className="w-5 h-5" /> },
      { title: 'Nguồn điện dự phòng 2N+1', desc: 'Hệ thống máy phát điện Caterpillar, UPS Emerson đảm bảo máy chủ hoạt động liên tục không mất nguồn điện.', icon: <Zap className="w-5 h-5" /> },
      { title: 'Hệ thống làm mát luồng khí Hot/Cold', desc: 'Tối ưu nhiệt độ phòng máy ổn định 22 ± 2°C, nâng cao tối đa tuổi thọ và độ bền phần cứng máy chủ.', icon: <RefreshCw className="w-5 h-5" /> },
      { title: 'Bảo mật vật lý nghiêm ngặt 5 lớp', desc: 'Kiểm soát truy cập sinh trắc học thẻ từ, camera giám sát AI và lực lượng bảo vệ túc trực hiện trường 24/7.', icon: <Shield className="w-5 h-5" /> }
    ];

    platforms = [
      {
        id: 'power-infra',
        name: 'Hạ tầng Nguồn điện & UPS dự phòng',
        desc: 'Mạng lưới phân phối nguồn điện kép an toàn tuyệt đối đạt chuẩn Rated 3 khắt khe.',
        specs: [
          'Hai nhánh nguồn điện lưới quốc gia đi từ 2 trạm biến áp độc lập',
          'Tủ UPS Emerson/APC cấu hình dự phòng nóng Active-Active 2N+1',
          'Hệ thống máy phát điện Caterpillar dự trữ dầu vận hành tải tối đa 72 giờ liên tục',
          'Công tắc chuyển mạch tự động ATS phản ứng dưới 10 mili-giây'
        ]
      },
      {
        id: 'safety-infra',
        name: 'Hệ thống An toàn & Phòng cháy chữa cháy',
        desc: 'Đảm bảo môi trường vật lý an toàn tuyệt đối cho toàn bộ thiết bị phần cứng của khách hàng.',
        specs: [
          'Hệ thống phát hiện khói sớm Vesda siêu nhạy bén',
          'Giải pháp chữa cháy bằng khí FM200 thân thiện môi trường, không dẫn điện',
          'Sàn nâng chịu tải trọng cao tới 1.500 kg/m² chống rung vật lý',
          'Hệ thống kiểm soát độ ẩm ASHRAE tránh hiện tượng tĩnh điện'
        ]
      }
    ];

    pricingPlans = [
      {
        id: 'coloc-1u',
        name: 'Cho thuê chỗ đặt 1U Space',
        badge: 'TIÊU CHUẨN DOANH NGHIỆP',
        tag: 'Dành cho máy chủ đơn lẻ kích thước 1U',
        price: '1.500.000',
        period: 'Tháng',
        specs: [
          'Không gian lắp đặt: 1U Space trong tủ Rack tiêu chuẩn',
          'Nguồn điện cấp: tối đa 400 Watts nguồn điện kép (A+B)',
          '1 Cổng mạng Shared Port 1 Gbps kết nối Internet',
          '1 IP tĩnh Public WAN bảo mật',
          'Hỗ trợ cắm cáp và reboot máy từ xa (Remote Hands) miễn phí'
        ],
        featured: false
      },
      {
        id: 'coloc-half-rack',
        name: 'Thuê Half Rack (20U)',
        badge: 'DOANH NGHIỆP VỪA',
        tag: 'Dành cho các doanh nghiệp tự chủ hạ tầng vừa',
        price: '6.500.000',
        period: 'Tháng',
        specs: [
          'Không gian lắp đặt: Half Rack 20U biệt lập khóa riêng',
          'Nguồn điện cấp: tối đa 1.500 Watts (2N+1 dự phòng)',
          'Băng thông mạng trong nước 100 Mbps đối xứng',
          '4 IP tĩnh Public WAN miễn phí',
          'Hỗ trợ cài đặt đấu nối vật lý chuyên nghiệp'
        ],
        featured: true
      },
      {
        id: 'coloc-full-rack',
        name: 'Thuê Trọn Tủ Rack 42U',
        badge: 'ĐỘC QUYỀN CAO CẤP',
        tag: 'Tối ưu mật độ cho hệ thống cốt lõi lớn',
        price: '11.500.000',
        period: 'Tháng',
        specs: [
          'Không gian lắp đặt: Full Rack 42U 600x1070mm',
          'Nguồn điện cấp: tối đa 3.000 Watts (đến 32A kép)',
          'Băng thông mạng trong nước 150 Mbps, quốc tế 2 Mbps',
          '8 IP tĩnh Public WAN miễn phí',
          'Cam kết chất lượng đường truyền SLA mạng 99.99%',
          'Hỗ trợ thiết kế sơ đồ mạng VLAN biệt lập miễn phí'
        ],
        featured: false
      }
    ];

    features = [
      { title: 'Hệ thống làm mát In-Row thông minh', desc: 'Tự động điều chỉnh luồng gió mát trực tiếp vào khe máy chủ, duy trì nhiệt độ ổn định hoàn hảo.', icon: <RefreshCw className="w-5 h-5" /> },
      { title: 'Hạ tầng mạng đa hướng chống nghẽn', desc: 'Kết nối trực tiếp tới 4 nhà mạng lớn tại Việt Nam, cam kết tính liên tục và băng thông rộng.', icon: <Network className="w-5 h-5" /> },
      { title: 'Portal giám sát điện năng thực tế', desc: 'Cung cấp biểu đồ trực quan theo dõi chính xác mức tiêu thụ điện năng (Amps/Watts) của tủ Rack từ xa.', icon: <Activity className="w-5 h-5" /> },
      { title: 'Dịch vụ Remote Hands trực chiến 24/7', desc: 'Kỹ sư tại chỗ hỗ trợ kiểm tra đèn cảnh báo, reboot thiết bị, cắm lại cáp quang tức thì.', icon: <Clock className="w-5 h-5" /> }
    ];

    useCases = [
      { title: 'Hạ tầng Core vật lý của tổ chức Tài chính', desc: 'Xây dựng phân vùng máy chủ vật lý cô lập tuyệt đối, đáp ứng mọi quy định khắt khe của ngân hàng.', metrics: 'Đạt 100% chuẩn PCI-DSS vật lý', icon: <Shield className="w-5 h-5" /> },
      { title: 'Hạ tầng ERP & CRM doanh nghiệp cốt lõi', desc: 'Lưu trữ máy chủ vật lý chạy hệ thống phần mềm quản lý ERP nặng tại Datacenter chuẩn quốc tế.', metrics: 'Uptime hoạt động liên tục 99.995%', icon: <Database className="w-5 h-5" /> },
      { title: 'Điểm nút phục hồi thảm họa (DR Site)', desc: 'Đặt cụm máy chủ backup vật lý dự phòng nóng kết nối trực tiếp mượt mà với môi trường Cloud chính.', metrics: 'Khôi phục thảm họa an toàn kép', icon: <Server className="w-5 h-5" /> }
    ];

    faqs = [
      { q: 'Yêu cầu Rated 3 TIA-942 mang lại lợi ích gì cho máy chủ của tôi?', a: 'Chứng chỉ Rated 3 đảm bảo Datacenter có khả năng bảo trì đồng thời (Concurrently Maintainable). Nghĩa là mọi thiết bị điện, điều hòa hay cáp mạng đều có thể bảo dưỡng, sửa chữa mà không cần tắt nguồn điện hay gây gián đoạn hoạt động của tủ Rack đặt máy chủ của bạn.' },
      { q: 'Kỹ sư Remote Hands hỗ trợ những tác vụ nào?', a: 'Hỗ trợ miễn phí các tác vụ cơ bản như: nhấn nút reboot máy chủ vật lý, cắm lại cáp mạng, kiểm tra trạng thái đèn LED, cắm cổng USB KVM để kỹ thuật khách hàng cấu hình BIOS từ xa.' }
    ];
  } else if (category.includes('Lưu trữ') || category.includes('Sao lưu')) {
    iconBgClass = 'bg-blue-50';
    iconColorClass = 'text-[#2E90FA]';
    primaryIcon = <HardDrive className="w-5 h-5" />;
    secondaryIcon = <Database className="w-5 h-5" />;
    tertiaryIcon = <RefreshCw className="w-5 h-5" />;

    stats = [
      { label: 'SLA Lưu Trữ', value: '99.99%', desc: 'Cam kết độ sẵn sàng cao nhất cho ứng dụng.' },
      { label: 'Độ Bền Dữ Liệu', value: '99.9999999%', desc: 'Cơ chế Erasure Coding chống mất mát dữ liệu.' },
      { label: 'Giao Diện API', value: 'Chuẩn S3 API', desc: 'Dễ dàng kết nối và tích hợp ứng dụng.' },
      { label: 'Kháng Ransomware', value: '🔒 Object Lock', desc: 'Ngăn chặn tuyệt đối việc xóa/mã hóa dữ liệu.' }
    ];

    advantages = [
      { title: 'Kháng Ransomware với Object Lock', desc: 'Dữ liệu lưu trữ ở trạng thái bất biến (WORM), ngăn chặn hoàn toàn việc mã hóa phá hoại từ ransomware độc hại.', icon: <Lock className="w-5 h-5" /> },
      { title: 'Tương thích 100% chuẩn S3 API', desc: 'Dễ dàng cấu hình kết nối trực tiếp với các phần mềm backup hàng đầu như Veeam, Veritas, Commvault.', icon: <Database className="w-5 h-5" /> },
      { title: 'Cơ chế Erasure Coding an toàn kép', desc: 'Phân rã tệp tin thành các mảnh dữ liệu độc lập lưu trữ phân tán trên hàng chục tủ đĩa khác nhau.', icon: <Layers className="w-5 h-5" /> },
      { title: 'Sao lưu tự động không gián đoạn', desc: 'Hệ thống tự động thực hiện sao lưu ngầm theo chu kỳ, bảo đảm máy chủ sản xuất hoạt động trơn tru 100%.', icon: <RefreshCw className="w-5 h-5" /> }
    ];

    platforms = [
      {
        id: 'ceph-storage',
        name: 'Hệ thống Lưu trữ Phân tán Ceph SDS',
        desc: 'Kiến trúc lưu trữ định nghĩa bằng phần mềm tiên tiến, khả năng co giãn không giới hạn.',
        specs: [
          'Kiến trúc lưu trữ phân tán loại bỏ hoàn toàn điểm lỗi đơn lẻ (No single point of failure)',
          'Cơ chế Erasure Coding 8+4 đảm bảo dữ liệu toàn vẹn ngay cả khi mất 4 tủ đĩa vật lý đồng thời',
          'Tự động cân bằng tải IOPS và tự phục hồi dữ liệu khi phát hiện hỏng ổ đĩa',
          'Tương thích hoàn hảo 100% giao thức S3 và Swift API'
        ]
      },
      {
        id: 'enterprise-san',
        name: 'Mảng tủ đĩa SAN Enterprise SSD SAS',
        desc: 'Hạ tầng lưu trữ khối tốc độ cao chuyên dụng cho các máy chủ ảo hiệu năng cao.',
        specs: [
          'Ổ đĩa SSD Enterprise chuyên dụng từ Samsung/Intel với độ bền đọc ghi cực cao',
          'Kết nối quang Fibre Channel tốc độ 16/32 Gbps dự phòng đường truyền Active-Active',
          'Bộ nhớ đệm (NVMe Cache) siêu tốc độ giúp triệt tiêu độ trễ IOPS',
          'Tính năng Thin Provisioning tối ưu hóa không gian lưu trữ thực tế'
        ]
      }
    ];

    pricingPlans = [
      {
        id: 'st-s3',
        name: 'Viettel Cloud Object Storage S3',
        badge: 'TỐI ƯU LƯU TRỮ WEB/APP',
        tag: 'Lưu trữ đối tượng chuẩn S3 không giới hạn',
        price: '450.000',
        period: 'Tháng',
        specs: [
          'Dung lượng lưu trữ: 500 GB Storage',
          'Miễn phí hoàn toàn băng thông tải dữ liệu lên (Data Ingest)',
          'Miễn phí không giới hạn số lượng cuộc gọi API GET/POST',
          'Tương thích hoàn hảo chuẩn giao tiếp AWS S3 API',
          'Tính năng Object Lock kháng Ransomware miễn phí'
        ],
        featured: false
      },
      {
        id: 'st-backup',
        name: 'Viettel Cloud Backup (BaaS)',
        badge: 'BẢO VỆ MÁY CHỦ TOÀN DIỆN',
        tag: 'Sao lưu tự động an toàn lên đám mây',
        price: '1.200.000',
        period: 'Tháng',
        specs: [
          'Dung lượng sao lưu: 1.000 GB Storage',
          'Bảo vệ tối đa 5 máy chủ ảo (VMs/VPCs) đồng thời',
          'Tự động giữ lại bản sao trong vòng 30 ngày gần nhất',
          'Mã hóa dữ liệu tại chỗ an toàn thuật toán AES-256',
          'Báo cáo lịch trình sao lưu hàng ngày qua Email'
        ],
        featured: true
      },
      {
        id: 'st-dr',
        name: 'Cloud Disaster Recovery (DRaaS)',
        badge: 'AN TOÀN DOANH NGHIỆP TỐI CAO',
        tag: 'Duy trì hoạt động liên tục khi có thảm họa',
        price: '4.500.000',
        period: 'Tháng',
        specs: [
          'Dung lượng sao lưu dự phòng: 2.000 GB Storage',
          'Cơ chế nhân bản thời gian thực (Real-time Replication)',
          'Cam kết chỉ số RTO dưới 15 phút, RPO dưới 15 giây',
          'Hỗ trợ diễn tập phục hồi thảm họa miễn phí 2 lần/năm',
          'Băng thông kết nối mạng dự phòng riêng biệt'
        ],
        featured: false
      }
    ];

    features = [
      { title: 'Tự động hóa vòng đời dữ liệu', desc: 'Thiết lập quy tắc tự động di chuyển dữ liệu cũ ít truy cập xuống lớp lưu trữ lạnh để tiết kiệm chi phí.', icon: <RefreshCw className="w-5 h-5" /> },
      { title: 'Mã hóa AES-256 đầu cuối', desc: 'Mã hóa dữ liệu an toàn ngay trước khi truyền tải lên đám mây, bảo đảm tính tuyệt mật tuyệt đối.', icon: <Lock className="w-5 h-5" /> },
      { title: 'Báo cáo dung lượng trực quan', desc: 'Theo dõi chi tiết tốc độ tăng trưởng dung lượng và lập kế hoạch sử dụng ngân sách tối ưu.', icon: <Activity className="w-5 h-5" /> },
      { title: 'Tích hợp bảo vệ VM không cần Agent', desc: 'Sao lưu máy chủ ảo ở cấp độ ảo hóa Hypervisor, không làm hao tốn tài nguyên hệ điều hành.', icon: <Database className="w-5 h-5" /> }
    ];

    useCases = [
      { title: 'Lưu trữ dữ liệu tĩnh Website & Mobile App', desc: 'Lưu trữ hàng triệu bức ảnh, video, tệp PDF phục vụ ứng dụng TMĐT tải nhanh và tiết kiệm băng thông.', metrics: 'Giảm tải máy chủ gốc tới 70%', icon: <Globe className="w-5 h-5" /> },
      { title: 'Sao lưu cơ sở dữ liệu tài chính an toàn', desc: 'Tự động sao lưu dữ liệu giao dịch nhạy cảm hàng giờ, phòng ngừa thảm họa mất mát thông tin.', metrics: 'Cam kết toàn vẹn dữ liệu 100%', icon: <Lock className="w-5 h-5" /> },
      { title: 'Khôi phục thảm họa hạ tầng liên tục (BCP)', desc: 'Xây dựng trung tâm dữ liệu dự phòng nóng trên Cloud sẵn sàng tiếp quản dịch vụ khi có sự cố thiên tai vật lý.', metrics: 'Kích hoạt dự phòng hoạt động dưới 10 phút', icon: <Server className="w-5 h-5" /> }
    ];

    faqs = [
      { q: 'Tính năng Object Lock hoạt động thế nào chống Ransomware?', a: 'Object Lock sử dụng cơ chế Write Once Read Many (WORM). Khi được thiết lập, dữ liệu trong khoảng thời gian khóa sẽ không thể bị xóa hoặc sửa đổi bởi bất kỳ ai, kể cả tài khoản Root hay mã độc tống tiền Ransomware.' },
      { q: 'Chi phí băng thông tải dữ liệu ra (Data Retrieval) được tính thế nào?', a: 'Khác với các đám mây ngoại quốc tính phí Egress rất cao, Viettel IDC miễn phí hoàn toàn băng thông tải lên và chỉ áp dụng mức phí tải ra cực rẻ hoặc miễn phí theo gói dung lượng Pro.' }
    ];
  } else if (category.includes('Cơ sở dữ liệu') || category.includes('Nền tảng')) {
    iconBgClass = 'bg-emerald-50';
    iconColorClass = 'text-[#10B981]';
    primaryIcon = <Database className="w-5 h-5" />;
    secondaryIcon = <Server className="w-5 h-5" />;
    tertiaryIcon = <Settings className="w-5 h-5" />;

    stats = [
      { label: 'Database SLA', value: '99.99%', desc: 'Cam kết cụm cơ sở dữ liệu High-Availability hoạt động liên tục.' },
      { label: 'Engine Hỗ Trợ', value: 'PostgreSQL / MySQL', desc: 'Chạy các phiên bản cơ sở dữ liệu tối ưu, chuẩn hóa.' },
      { label: 'Tự Động Sao Lưu', value: 'Daily PITR', desc: 'Hỗ trợ khôi phục dữ liệu chính xác về từng giây trong quá khứ.' },
      { label: 'Hiệu Năng Ổ Đĩa', value: '⚡ NVMe SSD', desc: 'Đảm bảo tốc độ IOPS cực đại cho xử lý giao dịch đồng thời.' }
    ];

    advantages = [
      { title: 'Managed DB quản trị hoàn toàn', desc: 'Quên đi gánh nặng cài đặt hệ điều hành, vá lỗi bảo mật, cấu hình tối ưu. Toàn bộ quy trình được tự động hóa.', icon: <Settings className="w-5 h-5" /> },
      { title: 'Hỗ trợ khôi phục theo thời điểm (PITR)', desc: 'Sao lưu liên tục nhật ký giao dịch, cho phép khôi phục cơ sở dữ liệu chính xác về bất kỳ giây nào trong quá khứ.', icon: <RefreshCw className="w-5 h-5" /> },
      { title: 'Cụm cơ sở dữ liệu High-Availability', desc: 'Thiết lập cụm Master-Standby HA, tự động chuyển đổi dự phòng trong vòng dưới 30 giây khi có sự cố.', icon: <Database className="w-5 h-5" /> },
      { title: 'Bảo mật và cách ly lớp 3 tuyệt đối', desc: 'Cách ly hoàn toàn trong dải mạng VPC của riêng doanh nghiệp, tích hợp tường lửa bảo mật cổng DB riêng.', icon: <Lock className="w-5 h-5" /> }
    ];

    platforms = [
      {
        id: 'vdbs-engine',
        name: 'Hệ thống Quản lý Nền tảng DB Engine',
        desc: 'Trình điều khiển thông minh tự động hóa vòng đời cơ sở dữ liệu.',
        specs: [
          'Hỗ trợ các engine DB phổ biến nhất: PostgreSQL (v13-v16) và MySQL (v8.0)',
          'Tự động phát hiện lỗi phần cứng và thực hiện chuyển đổi dự phòng nóng tự động (Auto-Failover)',
          'Tối ưu hóa các tham số kernel hệ điều hành chuyên sâu cho cơ sở dữ liệu',
          'Đồng bộ hóa bảo mật liên tục dữ liệu sang node Standby độc lập'
        ]
      },
      {
        id: 'nvme-io',
        name: 'Hạ tầng Đọc ghi NVMe SSD Siêu tốc',
        desc: 'Hệ thống lưu trữ ổ đĩa thể rắn thế hệ mới loại bỏ nút thắt cổ chai IOPS.',
        specs: [
          '100% ổ cứng NVMe SSD Enterprise chuyên dụng cho máy chủ Database',
          'Cam kết tốc độ đọc ghi IOPS tối thiểu 25,000 IOPS cho các gói lớn',
          'Công nghệ RAID bảo vệ dữ liệu vật lý toàn vẹn',
          'Băng thông kết nối card mạng LAN lên tới 25 Gbps'
        ]
      }
    ];

    pricingPlans = [
      {
        id: 'db-starter',
        name: 'Gói DB Starter (Single Node)',
        badge: 'DÀNH CHO DEV/TEST',
        tag: 'Lý tưởng cho môi trường thử nghiệm ứng dụng',
        price: '850.000',
        period: 'Tháng',
        specs: [
          'Cấu hình tài nguyên: 2 vCPU Cores & 4 GB RAM',
          'Lưu trữ: 100 GB SSD Enterprise tốc độ cao',
          'Cơ sở dữ liệu Single Node (Không HA)',
          'Sao lưu dữ liệu tự động hàng ngày (Giữ trong 7 ngày)',
          'Hỗ trợ PostgreSQL hoặc MySQL Engine tùy chọn'
        ],
        featured: false
      },
      {
        id: 'db-pro',
        name: 'Gói DB Pro (High-Availability)',
        badge: 'PHỔ BIẾN HỆ THỐNG CHẠY THẬT',
        tag: 'Cụm cơ sở dữ liệu an toàn chạy production',
        price: '2.200.000',
        period: 'Tháng',
        specs: [
          'Cấu hình tài nguyên: 4 vCPU Cores & 8 GB RAM',
          'Lưu trữ: 200 GB SSD Enterprise tốc độ cao',
          'Cấu hình cụm HA: Master-Standby Active-Passive',
          'Tự động chuyển đổi Failover khi xảy ra sự cố dưới 30s',
          'Sao lưu dữ liệu tự động hàng ngày (Giữ trong 14 ngày)',
          'Hỗ trợ khôi phục theo thời điểm chính xác PITR'
        ],
        featured: true
      },
      {
        id: 'db-ent',
        name: 'Gói DB Enterprise (Siêu cụm DB)',
        badge: 'ĐÁP ỨNG TẢI KHỔNG LỒ',
        tag: 'Dành cho hệ thống cốt lõi quy mô lớn',
        price: '5.800.000',
        period: 'Tháng',
        specs: [
          'Cấu hình tài nguyên: 16 vCPU Cores & 32 GB RAM',
          'Lưu trữ: 500 GB NVMe SSD Enterprise siêu tốc',
          'Cấu hình cụm HA: Master + 2 Standby + 1 Read Replica',
          'Xử lý tải đọc ghi phân tán cực rộng',
          'Sao lưu dữ liệu tự động hàng ngày (Giữ trong 30 ngày)',
          'Đội ngũ kỹ sư cơ sở dữ liệu hỗ trợ cấu hình tối ưu 24/7'
        ],
        featured: false
      }
    ];

    features = [
      { title: 'Tạo bản sao đọc (Read Replicas)', desc: 'Tách lưu lượng truy vấn đọc ra các node Standby phụ, tăng tốc độ phản hồi cho website.', icon: <RefreshCw className="w-5 h-5" /> },
      { title: 'Phân tích truy vấn chậm Slow Query', desc: 'Báo cáo chi tiết các câu lệnh SQL chạy chậm, giúp nhà phát triển dễ dàng tối ưu hóa index.', icon: <Activity className="w-5 h-5" /> },
      { title: 'Mở rộng ổ cứng tự động', desc: 'Tự co giãn mở rộng dung lượng ổ đĩa khi phát hiện sắp đầy, tránh rủi ro sập DB do tràn ổ đĩa.', icon: <Database className="w-5 h-5" /> },
      { title: 'Cam kết tương thích tuyệt đối 100%', desc: 'Sử dụng các phiên bản gốc chuẩn hóa, tương thích mượt mà với mọi thư viện Driver kết nối có sẵn.', icon: <Check className="w-5 h-5" /> }
    ];

    useCases = [
      { title: 'Hạ tầng dữ liệu cho ứng dụng TMĐT', desc: 'Bảo đảm an toàn tuyệt đối cho giỏ hàng, thông tin thanh toán của hàng vạn người mua sắm đồng thời.', metrics: 'Khả năng đáp ứng > 10,000 giao dịch/giây', icon: <Globe className="w-5 h-5" /> },
      { title: 'Hệ thống ERP & CRM doanh nghiệp', desc: 'Vận hành ổn định các phần mềm quản trị doanh nghiệp nặng nề, đòi hỏi tính toàn vẹn dữ liệu ở mức cao nhất.', metrics: 'Uptime cơ sở dữ liệu đạt 99.99%', icon: <Database className="w-5 h-5" /> },
      { title: 'Bộ nhớ đệm tăng tốc ứng dụng siêu tốc', desc: 'Sử dụng dịch vụ Redis Managed làm bộ đệm cache lưu session, giảm tải 80% truy vấn trực tiếp xuống DB chính.', metrics: 'Tốc độ phản hồi truy vấn đệm < 1ms', icon: <Zap className="w-5 h-5" /> }
    ];

    faqs = [
      { q: 'Cơ chế tự động Failover của vDBS hoạt động thế nào?', a: 'Hệ thống giám sát liên tục gửi tín hiệu heartbeat tới node Master. Nếu node Master ngừng phản hồi quá 10 giây, Standby node có dữ liệu đồng bộ mới nhất sẽ được tự động nâng lên làm Master mới và cập nhật địa chỉ IP kết nối của ứng dụng trong vòng dưới 30 giây.' },
      { q: 'Tôi có thể tải về bản sao lưu cơ sở dữ liệu của mình không?', a: 'Hoàn toàn được. Bạn có thể chủ động tải về các tệp sao lưu nén (.sql hoặc định dạng binary) trực tiếp từ trang portal quản lý bất kỳ lúc nào để lưu trữ ngoại tuyến.' }
    ];
  } else if (category.includes('Kết nối') || category.includes('Mạng') || category.includes('CDN')) {
    iconBgClass = 'bg-sky-50';
    iconColorClass = 'text-[#0284C7]';
    primaryIcon = <Network className="w-5 h-5" />;
    secondaryIcon = <Globe className="w-5 h-5" />;
    tertiaryIcon = <Activity className="w-5 h-5" />;

    stats = [
      { label: 'Băng Thông Trục', value: '100 Gbps', desc: 'Mạng lưới cáp quang đường trục siêu tốc độ kết nối đa vùng.' },
      { label: 'SLA Đường Truyền', value: '99.99%', desc: 'Cam kết chất lượng kết nối mạng, độ trễ tối thiểu.' },
      { label: 'Điểm Biên CDN', value: '24+ Edge Nodes', desc: 'Phủ khắp các tỉnh thành trọng điểm Việt Nam.' },
      { label: 'Tải Máy Chủ Gốc', value: 'Giảm 85% - 95%', desc: 'Nhờ cơ chế lưu trữ đệm (Edge Caching) tại biên cực kỳ thông minh.' }
    ];

    advantages = [
      { title: 'Tài trang siêu tốc độ với CDN', desc: 'Hệ thống CDN phân phối tệp tin thông minh, giảm độ trễ phản hồi trang tới 80% từ điểm biên gần nhất.', icon: <Globe className="w-5 h-5" /> },
      { title: 'Kết nối Private trực tiếp đa đám mây', desc: 'Liên kết trực tiếp chuyên biệt tốc độ cao từ On-premise tới AWS, Azure, Google Cloud an toàn tuyệt đối.', icon: <Network className="w-5 h-5" /> },
      { title: 'Tối ưu hóa video streaming mượt mà', desc: 'Hỗ trợ công nghệ phát video thích ứng băng thông, triệt tiêu hoàn toàn giật lag cho người xem.', icon: <Zap className="w-5 h-5" /> },
      { title: 'Bảo mật biên tích hợp sẵn', desc: 'Ngăn chặn sớm các đợt quét botnet độc hại, tấn công tại biên mạng trước khi chạm tới cụm máy chủ gốc.', icon: <Shield className="w-5 h-5" /> }
    ];

    platforms = [
      {
        id: 'backbone-net',
        name: 'Mạng lưới Cáp quang Đường trục Quốc gia',
        desc: 'Kiến trúc mạng truyền tải dung lượng cực lớn của Viettel.',
        specs: [
          'Hệ thống mạch vòng sợi quang dự phòng vật lý liên tỉnh tự động định tuyến lại khi đứt cáp',
          'Kết nối trực tiếp tốc độ cao tới tất cả các trạm cập bờ cáp quang biển quốc tế lớn',
          'Độ trễ truyền dẫn nội địa cực thấp (Hà Nội - TP.HCM dưới 30ms)',
          'Thiết bị chuyển mạch quang DWDM thế hệ mới hỗ trợ băng thông Terabit'
        ]
      },
      {
        id: 'cdn-edge-stack',
        name: 'Hạ tầng Máy chủ Biên Edge CDN',
        desc: 'Mạng lưới máy chủ biên phân phối nội dung đặt sát người dùng thực tế.',
        specs: [
          'Máy chủ biên RAM/SSD chuyên dụng xử lý hàng chục vạn yêu cầu đồng thời (RPS)',
          'Cơ chế điều hướng Anycast DNS tự động dẫn đường truyền tới Edge gần nhất',
          'Hỗ trợ chuẩn giao thức truyền tải hiện đại HTTP/2 và HTTP/3',
          'Băng thông kết nối mạng cục bộ tại mỗi điểm Edge tối thiểu 20 Gbps'
        ]
      }
    ];

    pricingPlans = [
      {
        id: 'net-cdn',
        name: 'Gói Web CDN Standard',
        badge: 'TỐI ƯU TRUY CẬP WEBSITE',
        tag: 'Tăng tốc website tĩnh và hình ảnh hiệu quả',
        price: '390.000',
        period: 'Tháng',
        specs: [
          'Dung lượng truyền tải: 1.000 GB Traffic',
          'Số lượng tên miền (Domains) hỗ trợ: tối đa 3',
          'Băng thông cổng Edge: 100 Mbps',
          'Tích hợp sẵn chứng chỉ SSL Let\'s Encrypt miễn phí',
          'Tính năng Instant Purge xóa cache trong dưới 2 giây'
        ],
        featured: false
      },
      {
        id: 'net-cloudconnect',
        name: 'Viettel Cloud Connect',
        badge: 'KẾT NỐI ĐA ĐÁM MÂY CHUYÊN BIỆT',
        tag: 'Đường truyền riêng nối thẳng AWS/GCP/Azure',
        price: '2.500.000',
        period: 'Tháng',
        specs: [
          'Băng thông kênh truyền riêng: 100 Mbps chuyên dụng',
          'Kết nối trực tiếp (Direct Connect/ExpressRoute/Interconnect)',
          'Độ trễ truyền tải cực thấp, không đi qua Internet công cộng',
          'Đảm bảo băng thông cam kết đối xứng 100%',
          'Hỗ trợ cấu hình định tuyến định nghĩa bằng phần mềm'
        ],
        featured: true
      },
      {
        id: 'net-multicdn',
        name: 'Enterprise Multi-CDN',
        badge: 'HỆ THỐNG TRUYỀN HÌNH & STREAMING',
        tag: 'Điều hướng lưu lượng thông minh chịu tải khổng lồ',
        price: '6.900.000',
        period: 'Tháng',
        specs: [
          'Dung lượng truyền tải: 5.000 GB Traffic',
          'Hỗ trợ truyền tải video streaming và livestream chất lượng cao',
          'Tự động điều phối chuyển mạch giữa nhiều mạng CDN lớn',
          'Giao diện cấu hình luật phân bổ Rule Engine chuyên sâu',
          'Đội ngũ kỹ sư mạng cao cấp hỗ trợ trực chiến 24/7/365'
        ],
        featured: false
      }
    ];

    features = [
      { title: 'Edge Caching thông minh', desc: 'Tự động lưu đệm các tệp tĩnh, hỗ trợ thuật toán nén tối ưu Brotli giúp dung lượng tải nhẹ hơn.', icon: <RefreshCw className="w-5 h-5" /> },
      { title: 'Chứng chỉ SSL Let\'s Encrypt', desc: 'Kích hoạt và tự động gia hạn hoàn toàn miễn phí, bảo vệ an toàn kênh truyền thông tin.', icon: <Lock className="w-5 h-5" /> },
      { title: 'Rule Engine điều hướng linh hoạt', desc: 'Tự tạo luật cache, chuyển hướng URL, chặn IP trực tiếp chỉ qua vài click ở portal quản trị.', icon: <Settings className="w-5 h-5" /> },
      { title: 'Biểu đồ Cache Hit Rate thực tế', desc: 'Báo cáo chi tiết phần trăm yêu cầu được đáp ứng ngay tại biên mạng, tối ưu hóa hiệu quả lưu đệm.', icon: <Activity className="w-5 h-5" /> }
    ];

    useCases = [
      { title: 'Tăng tốc trang báo điện tử & TMĐT lớn', desc: 'Giải quyết triệt để bài toán sập trang do quá tải truy cập trong các khung giờ vàng khuyến mãi.', metrics: 'Uptime tải trang nhanh gấp 5 lần', icon: <Globe className="w-5 h-5" /> },
      { title: 'Truyền tải Livestream & Video độ nét cao', desc: 'Phát trực tuyến các trận bóng đá, sự kiện âm nhạc quy tụ hàng vạn người xem mượt mà, không giật hình.', metrics: 'Khả năng đáp ứng > 1 triệu CCU đồng thời', icon: <Zap className="w-5 h-5" /> },
      { title: 'Kết nối mạng đa văn phòng chi nhánh SD-WAN', desc: 'Sử dụng mạng riêng ảo để liên kết an toàn toàn bộ chi nhánh văn phòng về máy chủ trung tâm.', metrics: 'Tiết kiệm tới 40% chi phí Leased Line vật lý', icon: <Network className="w-5 h-5" /> }
    ];

    faqs = [
      { q: 'CDN giúp cải thiện điểm số SEO của website thế nào?', a: 'Tốc độ tải trang là một trong những chỉ số xếp hạng quan trọng nhất của Google (Core Web Vitals). CDN rút ngắn thời gian phản hồi máy chủ (TTFB) giúp website đạt điểm tối ưu hiển thị nhanh, nâng hạng SEO.' },
      { q: 'Khi cập nhật tệp tin mới lên server gốc, CDN mất bao lâu để đồng bộ?', a: 'CDN tự động đồng bộ theo thời gian hết hạn cache (TTL) bạn cấu hình. Ngoài ra, tính năng Instant Purge cho phép bạn ép buộc xóa và cập nhật cache mới trên toàn cầu chỉ trong dưới 2 giây.' }
    ];
  } else if (category.includes('An toàn') || category.includes('Bảo mật')) {
    iconBgClass = 'bg-amber-50';
    iconColorClass = 'text-amber-500';
    primaryIcon = <Shield className="w-5 h-5" />;
    secondaryIcon = <Lock className="w-5 h-5" />;
    tertiaryIcon = <Eye className="w-5 h-5" />;

    stats = [
      { label: 'SLA Khả Dụng', value: '99.99%', desc: 'Cam kết hệ thống tường lửa WAF và Anti-DDoS luôn hoạt động thông suốt.' },
      { label: 'Sức Mạnh Lọc DDoS', value: 'Tới 500 Gbps', desc: 'Hạ tầng Clean Pipe lọc sạch lưu lượng tấn công cực đại.' },
      { label: 'Đội Ngũ Chuyên Gia', value: 'OSCP / CEH', desc: 'Các kỹ sư an ninh thông tin hàng đầu Việt Nam trực chiến.' },
      { label: 'Giám Sát SOC', value: '24/7/365', desc: 'Theo dõi liên tục mọi hành vi bất thường trên hạ tầng đám mây.' }
    ];

    advantages = [
      { title: 'Tường lửa ứng dụng WAF chuyên sâu', desc: 'Chặn lọc hoàn hảo các cuộc tấn công phá hoại SQL Injection, Cross-Site Scripting (XSS), botnet độc hại.', icon: <Shield className="w-5 h-5" /> },
      { title: 'Lọc DDoS thông minh tại biên', desc: 'Hệ thống tự động phát hiện và chuyển hướng lưu lượng bẩn sang trung tâm làm sạch Clean Pipe thời gian thực.', icon: <Zap className="w-5 h-5" /> },
      { title: 'Trung tâm giám sát an ninh SOC ảo', desc: 'Đội ngũ chuyên gia túc trực giám sát, liên kết phân tích log sự kiện và ứng cứu xử lý sự cố lập tức.', icon: <Eye className="w-5 h-5" /> },
      { title: 'Chủ động dò quét lỗ hổng định kỳ', desc: 'Khảo sát, rà soát mã độc và phát hiện sớm các điểm yếu bảo mật của hệ thống để khắc phục trước.', icon: <Lock className="w-5 h-5" /> }
    ];

    platforms = [
      {
        id: 'ddos-cleanpipe',
        name: 'Hệ thống Lọc DDoS Clean Pipe vật lý',
        desc: 'Hạ tầng phần cứng chịu tải cực lớn bảo vệ cổng mạng kết nối.',
        specs: [
          'Thiết bị phần cứng lọc DDoS chuyên dụng đặt tại 3 trạm cổng quốc tế lớn nhất',
          'Khả năng hấp thụ và làm sạch lưu lượng tấn công lên tới 500 Gbps',
          'Thuật toán phân tích hành vi gói tin thông minh bóc tách chính xác lưu lượng ảo',
          'Tự động chuyển hướng lưu lượng thông qua giao thức BGP định tuyến nhanh'
        ]
      },
      {
        id: 'sec-siem',
        name: 'Nền tảng Giám sát An ninh SIEM & SOC',
        desc: 'Trí tuệ nhân tạo liên kết và phân tích mối đe dọa mạng.',
        specs: [
          'Thu thập log tập trung từ hàng nghìn máy chủ ảo, tường lửa và thiết bị mạng',
          'Hệ thống AI tự động phát hiện hành vi quét cổng, truy cập brute-force bất thường',
          'Cập nhật tri thức tình báo mối đe dọa (Threat Intelligence) liên tục theo thời gian thực',
          'Giao diện hiển thị trạng thái an ninh mạng trực quan cho doanh nghiệp'
        ]
      }
    ];

    pricingPlans = [
      {
        id: 'sec-waf',
        name: 'Gói Cloud WAF (Bảo vệ Website)',
        badge: 'TIÊU CHUẨN AN TOÀN WEB',
        tag: 'Bảo vệ ứng dụng web trước OWASP Top 10',
        price: '750.000',
        period: 'Tháng',
        specs: [
          'Bảo vệ: 1 Website/Domain ứng dụng',
          'Lọc sạch các cuộc tấn công SQL Injection, XSS, Spam form',
          'Tự động chặn lọc quét Bot độc hại tự động',
          'Tích hợp chứng chỉ bảo mật mã hóa SSL',
          'Báo cáo các cuộc tấn công bị chặn hàng tuần'
        ],
        featured: false
      },
      {
        id: 'sec-antiddos',
        name: 'Gói Anti-DDoS hạ tầng',
        badge: 'BẢO VỆ ĐƯỜNG TRUYỀN KHÔNG SẬP',
        tag: 'Ngăn chặn từ chối dịch vụ DDoS quy mô lớn',
        price: '3.500.000',
        period: 'Tháng',
        specs: [
          'Bảo vệ: Tối đa 5 IP Public của doanh nghiệp',
          'Khả năng lọc sạch tấn công DDoS tối đa 50 Gbps',
          'Lọc sạch tấn công ở cả tầng mạng (L3/L4) và tầng ứng dụng (L7)',
          'Hỗ trợ kỹ thuật ứng cứu khẩn cấp 24/7/365',
          'Cam kết thời gian phản ứng xử lý < 10 phút'
        ],
        featured: true
      },
      {
        id: 'sec-soc',
        name: 'Gói Managed SOC & Threat Detection',
        badge: 'TRUNG TÂM GIÁM SÁT AN NINH 24/7',
        tag: 'Giải pháp phòng ngự số toàn diện ủy thác chuyên gia',
        price: '9.800.000',
        period: 'Tháng',
        specs: [
          'Giám sát an ninh liên tục 24/7 từ phòng SOC chuyên dụng',
          'Thu thập và phân tích liên kết log SIEM tối đa 10 Assets máy chủ',
          'Phát hiện sớm các hành vi rò rỉ dữ liệu hoặc mã độc ẩn sâu',
          'Tổ chức diễn tập và rà soát điểm yếu bảo mật định kỳ',
          'Đội ngũ chuyên gia ứng cứu sự cố bảo mật chuyên biệt hỗ trợ riêng'
        ],
        featured: false
      }
    ];

    features = [
      { title: 'Chặn IP theo quốc gia (Geoblocking)', desc: 'Ngăn chặn nhanh chóng toàn bộ lưu lượng truy cập từ các quốc gia không nằm trong dải phục vụ khách hàng.', icon: <Globe className="w-5 h-5" /> },
      { title: 'Tự học hành vi phát hiện Zero-day', desc: 'Sử dụng máy học tự động nhận biết lưu lượng bình thường để phát hiện các cuộc tấn công chưa có chữ ký bảo mật.', icon: <Sparkles className="w-5 h-5" /> },
      { title: 'Thiết lập luật ACL tùy biến linh hoạt', desc: 'Tự tạo các luật chặn cổng dịch vụ, giới hạn tần suất truy cập API trực tiếp trên giao diện portal quản trị.', icon: <Settings className="w-5 h-5" /> },
      { title: 'Quét rà soát lỗ hổng hệ điều hành', desc: 'Chủ động dò tìm các tệp tin nhiễm mã độc, trojan và các điểm yếu phần mềm định kỳ tự động.', icon: <Lock className="w-5 h-5" /> }
    ];

    useCases = [
      { title: 'Bảo vệ website thương mại điện tử & ví điện tử', desc: 'Ngăn chặn nỗ lực tấn công phá hoại của đối thủ cạnh tranh, giữ cho luồng thanh toán luôn mượt mà.', metrics: 'Chặn đứng 99.99% cuộc tấn công Web', icon: <Globe className="w-5 h-5" /> },
      { title: 'Giám sát an toàn hệ thống Y tế & Giáo dục', desc: 'Lưu giữ bảo mật tuyệt đối hồ sơ bệnh án, thông tin cá nhân học sinh trước nguy cơ rò rỉ dữ liệu.', metrics: 'Đạt 100% tuân thủ tiêu chuẩn an toàn y tế', icon: <Shield className="w-5 h-5" /> },
      { title: 'Chống mã hóa tống tiền ransomware doanh nghiệp', desc: 'Quản lý bảo mật thiết bị đầu cuối EDR giúp ngăn chặn triệt để mã độc tống tiền lây lan sang cụm máy chủ.', metrics: 'Phát hiện mã độc trong dưới 5 giây', icon: <Lock className="w-5 h-5" /> }
    ];

    faqs = [
      { q: 'Sử dụng Cloud WAF có làm tăng độ trễ tải trang của khách hàng?', a: 'Không hề. Mạng lưới WAF của chúng tôi sử dụng công nghệ định tuyến chuyển mạch gói tin tốc độ cao tại biên mạng, bóc tách và phân tích gói tin ngầm song song nên hoàn toàn giữ nguyên tốc độ truy cập mượt mà.' },
      { q: 'Tôi có cần chỉnh sửa mã nguồn ứng dụng để sử dụng bảo mật không?', a: 'Hoàn toàn không cần can thiệp code. Bạn chỉ cần thực hiện thay đổi bản ghi DNS (trỏ về IP của Cloud WAF). Toàn bộ luồng truy cập sẽ được đi qua WAF để lọc sạch trước khi gửi về máy chủ gốc.' }
    ];
  } else if (category.includes('Giám sát') || category.includes('Vận hành') || category.includes('Managed')) {
    iconBgClass = 'bg-rose-50';
    iconColorClass = 'text-rose-500';
    primaryIcon = <Activity className="w-5 h-5" />;
    secondaryIcon = <Settings className="w-5 h-5" />;
    tertiaryIcon = <Clock className="w-5 h-5" />;

    stats = [
      { label: 'Thời Gian Cảnh Báo', value: '< 30 Giây', desc: 'Phát hiện sự cố tức thì và gửi cảnh báo ngay lập tức.' },
      { label: 'Kênh Cảnh Báo', value: 'Telegram / Email', desc: 'Không giới hạn số lượng tin nhắn thông báo cảnh báo.' },
      { label: 'Kỹ Sư Vận Hành', value: '100% Đạt Chứng Chỉ', desc: 'Kỹ sư CNTT giàu kinh nghiệm trực tiếp hỗ trợ, xử lý.' },
      { label: 'SLA Dịch Vụ', value: '✓ 99.95%', desc: 'Cam kết chất lượng vận hành hạ tầng ổn định nhất.' }
    ];

    advantages = [
      { title: 'Cảnh báo tài nguyên tức thì thời gian thực', desc: 'Nhận thông báo ngay lập tức qua Telegram/Email khi các chỉ số CPU, RAM, Disk vượt ngưỡng cấu hình.', icon: <Clock className="w-5 h-5" /> },
      { title: 'May đo giải pháp & Tư vấn miễn phí', desc: 'Đội ngũ kỹ sư đám mây cao cấp trực tiếp khảo sát thực tế và may đo phương án chuyển đổi hạ tầng tối ưu.', icon: <Settings className="w-5 h-5" /> },
      { title: 'Ủy thác vận hành an tâm tuyệt đối', desc: 'Bàn giao toàn bộ công tác cài đặt, vá lỗi bảo mật, tối ưu hóa hệ điều hành và xử lý sự cố cho kỹ sư Viettel.', icon: <Activity className="w-5 h-5" /> },
      { title: 'Đề xuất tối ưu hóa chi phí định kỳ', desc: 'Nhận phân tích và đề xuất đóng gói, tắt bớt các tài nguyên không dùng để tiết kiệm tối đa ngân sách IT.', icon: <Calculator className="w-5 h-5" /> }
    ];

    platforms = [
      {
        id: 'watch-engine',
        name: 'Hệ thống Giám sát Viettel CloudWatch',
        desc: 'Nền tảng thu thập số liệu và log hệ thống tập trung mạnh mẽ.',
        specs: [
          'Hệ thống thu thập số liệu (Monitoring Agent) siêu nhẹ hoạt động không hao tốn tài nguyên',
          'Chu kỳ thu thập thông số tài nguyên cực nhanh lên tới 1 phút/lần',
          'Khả năng liên kết log ứng dụng phục vụ công tác gỡ lỗi nhanh chóng',
          'Lưu trữ dữ liệu lịch sử tài nguyên trong vòng tối đa 90 ngày phục vụ phân tích'
        ]
      },
      {
        id: 'cmp-platform',
        name: 'Cổng Quản trị Đa đám mây CMP Platform',
        desc: 'Hợp nhất toàn bộ tài nguyên đám mây về một bảng điều khiển duy nhất.',
        specs: [
          'Quản lý tập trung tài nguyên cả trên Viettel Cloud và Private Cloud',
          'Báo cáo và phân tích chi phí tiêu thụ tài nguyên chi tiết từng phòng ban',
          'Hỗ trợ thiết lập chính sách tự động khởi chạy, tắt máy chủ theo lịch trình',
          'Phân quyền truy cập tài nguyên chi tiết theo cơ chế phân vai Role-Based IAM'
        ]
      }
    ];

    pricingPlans = [
      {
        id: 'op-watch',
        name: 'Gói CloudWatch Premium',
        badge: 'GIÁM SÁT TÀI NGUYÊN',
        tag: 'Theo dõi chỉ số máy chủ ảo thời gian thực',
        price: '190.000',
        period: 'Tháng',
        specs: [
          'Số lượng máy chủ giám sát: tối đa 10 VMs',
          'Chu kỳ thu thập thông số tài nguyên: 1 phút',
          'Gửi cảnh báo không giới hạn qua Telegram, Email, SMS',
          'Tùy biến bảng điều khiển Dashboard hiển thị trực quan',
          'Lưu giữ lịch sử thông số tài nguyên trong 30 ngày'
        ],
        featured: false
      },
      {
        id: 'op-managed',
        name: 'Gói Managed VM (Ủy thác vận hành)',
        badge: 'AN TÂM 100% VẬN HÀNH',
        tag: 'Kỹ sư chuyên gia Viettel thay bạn chăm sóc máy chủ',
        price: '850.000',
        period: 'Tháng',
        specs: [
          'Quản trị: 1 máy chủ ảo (Windows/Linux VM)',
          'Tự động theo dõi giám sát trạng thái hoạt động 24/7/365',
          'Cập nhật các bản vá lỗi bảo mật hệ điều hành hàng tháng',
          'Hỗ trợ cài đặt và tối ưu hóa Web Server, DB Server cơ bản',
          'Cấu hình lịch trình tự động sao lưu dữ liệu hàng ngày'
        ],
        featured: true
      },
      {
        id: 'op-migration',
        name: 'Gói Cloud Migration (Di trú hạ tầng)',
        badge: 'DỰ ÁN DI TRÚ MƯỢT MÀ',
        tag: 'Dịch chuyển toàn bộ hệ thống lên Cloud an toàn',
        price: '2.500.000',
        period: 'Dự án',
        specs: [
          'Khảo sát và rà soát tổng thể kiến trúc hệ thống cũ hiện tại',
          'Lên kế hoạch chuyển dịch chi tiết bảo đảm an toàn dữ liệu',
          'Thực hiện di chuyển Terabyte dữ liệu, database lên Viettel Cloud',
          'Hỗ trợ đấu nối mạng lai VPN/Leased Line kết nối an toàn',
          'Cam kết quá trình chuyển dịch zero-downtime, không gián đoạn'
        ],
        featured: false
      }
    ];

    features = [
      { title: 'Dashboard theo dõi tùy biến', desc: 'Tự do thiết kế các biểu đồ hiển thị CPU, RAM, Disk IOPS theo phong cách riêng của phòng IT.', icon: <Activity className="w-5 h-5" /> },
      { title: 'Thiết lập ngưỡng cảnh báo động', desc: 'Sử dụng thuật toán thông minh phát hiện bất thường tự động dựa trên dữ liệu lịch sử.', icon: <Clock className="w-5 h-5" /> },
      { title: 'Lưu trữ và phân tích log tập trung', desc: 'Giúp lập trình viên nhanh chóng truy vết nguyên nhân lỗi ứng dụng bằng cách lục tìm log lịch sử.', icon: <FileText className="w-5 h-5" /> },
      { title: 'Tự động kích hoạt hành động co giãn', desc: 'Tự động chạy script khởi động lại dịch vụ web, DB hoặc thêm máy chủ mới khi quá tải.', icon: <Settings className="w-5 h-5" /> }
    ];

    useCases = [
      { title: 'Phát hiện nhanh nghẽn cổ chai ứng dụng', desc: 'Đội kỹ thuật tìm ra chính xác đoạn code hoặc câu lệnh SQL làm chậm ứng dụng nhờ hệ thống giám sát.', metrics: 'Rút ngắn 90% thời gian xử lý sự cố', icon: <Activity className="w-5 h-5" /> },
      { title: 'Ủy thác vận hành cho startup tinh gọn', desc: 'Doanh nghiệp không cần tuyển dụng và duy trì đội ngũ IT vận hành tốn kém, tập trung phát triển sản phẩm.', metrics: 'Tiết kiệm tới 60% chi phí nhân sự IT', icon: <Settings className="w-5 h-5" /> },
      { title: 'Chuyển đổi hạ tầng On-premise lên mây', desc: 'Di dời mượt mà hàng Terabyte dữ liệu và database của hệ thống cũ lên đám mây Viettel IDC an toàn.', metrics: 'Chuyển dịch dữ liệu zero-downtime', icon: <RefreshCw className="w-5 h-5" /> }
    ];

    faqs = [
      { q: 'Hệ thống CloudWatch Monitoring Agent có làm tốn tài nguyên máy chủ?', a: 'Không hề. Bộ công cụ thu thập thông số (Monitoring Agent) siêu nhẹ được tối ưu hóa sâu, chỉ tiêu tốn dưới 0.5% CPU và vài Megabyte RAM của máy chủ.' },
      { q: 'Viettel IDC hỗ trợ những công việc cụ thể nào trong gói Managed Services?', a: 'Chúng tôi hỗ trợ cài đặt hệ điều hành, cấu hình web server (Nginx/Apache), cài đặt DB, thiết lập sao lưu định kỳ, cập nhật các bản vá lỗi bảo mật định kỳ và túc trực xử lý sự cố hệ thống 24/7/365.' }
    ];
  } else if (category.includes('SaaS') || category.includes('Ứng dụng') || category.includes('Hosting') || category.includes('Tên miền')) {
    iconBgClass = 'bg-indigo-50';
    iconColorClass = 'text-indigo-500';
    primaryIcon = <Box className="w-5 h-5" />;
    secondaryIcon = <Globe className="w-5 h-5" />;
    tertiaryIcon = <Lock className="w-5 h-5" />;

    stats = [
      { label: 'Uptime Cam Kết', value: '99.9%', desc: 'Cam kết mức độ sẵn sàng cao nhất cho không gian cộng tác số.' },
      { label: 'Dung Lượng Lưu Trữ', value: 'Tới 1 TB / User', desc: 'Lưu trữ tài liệu tệp tin công việc không giới hạn.' },
      { label: 'Bản Quyền Phần Mềm', value: 'Chính Hãng CSP', desc: 'Đại lý phân quyền chính thức trực tiếp của Microsoft tại VN.' },
      { label: 'Bảo Mật Dữ Liệu', value: 'ISO 27001', desc: 'Tuân thủ nghiêm ngặt các tiêu chuẩn an toàn thông tin quốc tế.' }
    ];

    advantages = [
      { title: 'Máy tính ảo Cloud PC di động mượt mà', desc: 'Làm việc an toàn từ bất kỳ đâu, trên mọi thiết bị nhờ hệ thống máy tính ảo hóa chạy hoàn toàn trên Cloud.', icon: <Cpu className="w-5 h-5" /> },
      { title: 'Bản quyền phần mềm chính hãng tiết kiệm', desc: 'Cho thuê giấy phép Windows Server, SQL Server, Office theo tháng linh hoạt, không lo chi phí đầu tư lớn.', icon: <Calculator className="w-5 h-5" /> },
      { title: 'Lưu trữ và chia sẻ tài liệu Viettel Drive', desc: 'Đồng bộ hóa tài liệu tức thì, cộng tác sửa file thời gian thực mượt mà và bảo mật phân quyền chi tiết.', icon: <Box className="w-5 h-5" /> },
      { title: 'Giám sát an ninh camera AI thông minh', desc: 'Lưu giữ dữ liệu camera trực tiếp lên Cloud, tích hợp trí tuệ nhân tạo nhận diện khuôn mặt và cảnh báo đột nhập.', icon: <Shield className="w-5 h-5" /> }
    ];

    platforms = [
      {
        id: 'vdi-infra',
        name: 'Hạ tầng Ảo hóa Máy tính để bàn VDI',
        desc: 'Công nghệ ảo hóa màn hình tiên tiến mang lại trải nghiệm làm việc mượt mà.',
        specs: [
          'Công nghệ ảo hóa hàng đầu thế giới VMware Horizon / Citrix',
          'Trang bị card đồ họa GPU ảo hóa (vGPU) giúp xử lý các tác vụ đồ họa mượt mà',
          'Độ trễ truyền tải hiển thị màn hình cực thấp nhờ giao thức nén tối ưu',
          'Khởi tạo và cấu hình hàng loạt máy tính ảo chỉ trong vài phút từ trang quản trị'
        ]
      },
      {
        id: 'saas-storage',
        name: 'Hạ tầng Lưu trữ Tài liệu Doanh nghiệp bảo mật',
        desc: 'Mảng đĩa SAN SSD Enterprise an toàn tối đa cho dữ liệu.',
        specs: [
          'Ổ đĩa SSD Enterprise chuyên dụng được cấu hình RAID an toàn vật lý',
          'Cơ chế mã hóa tệp tin tại chỗ bảo vệ dữ liệu văn phòng',
          'Tích hợp tính năng rà quét mã độc virus trên toàn bộ tệp tải lên',
          'Khả năng khôi phục tệp tin lịch sử (Version History) lên tới 30 ngày'
        ]
      }
    ];

    pricingPlans = [
      {
        id: 'saas-pc',
        name: 'Máy tính ảo Cloud PC Starter',
        badge: 'LÀM VIỆC TỪ XA LINH HOẠT',
        tag: 'Máy tính văn phòng ảo hiệu năng tiêu chuẩn',
        price: '290.000',
        period: 'Tháng',
        specs: [
          'Cấu hình: 2 vCPU Cores & 4 GB RAM',
          'Lưu trữ: 50 GB SSD Enterprise siêu tốc',
          'Hệ điều hành: Bản quyền Windows 10/11 cài sẵn',
          'Hỗ trợ phần mềm truy cập từ xa mượt mà trên mọi thiết bị',
          'Không giới hạn dung lượng truyền tải dữ liệu'
        ],
        featured: false
      },
      {
        id: 'saas-drive',
        name: 'Viettel Drive Business',
        badge: 'CỘNG TÁC SỐ TIẾT KIỆM',
        tag: 'Không gian lưu trữ đám mây dùng riêng doanh nghiệp',
        price: '49.000',
        period: 'User/Tháng',
        specs: [
          'Dung lượng lưu trữ riêng biệt: 100 GB / User',
          'Đồng bộ hóa tài liệu thời gian thực trên PC/Mobile',
          'Chia sẻ liên kết file an toàn với mật khẩu và hạn dùng',
          'Quản trị phân quyền thư mục tập trung theo phòng ban',
          'Tích hợp chỉnh sửa tài liệu Office trực tuyến mượt mà'
        ],
        featured: true
      },
      {
        id: 'saas-camera',
        name: 'Cloud Camera AI (1 Mắt)',
        badge: 'GIÁM SÁT AN NINH AI',
        tag: 'Lưu trữ camera an ninh trực tiếp lên đám mây',
        price: '150.000',
        period: 'Mắt/Tháng',
        specs: [
          'Lưu trữ video camera liên tục trong vòng 30 ngày gần nhất',
          'Hỗ trợ độ phân giải hình ảnh sắc nét Full HD 1080p',
          'Nhận diện khuôn mặt khách hàng và đếm lưu lượng người ra vào',
          'Tự động gửi cảnh báo xâm nhập ngoài giờ làm việc qua Telegram',
          'Xem trực tiếp mượt mà qua ứng dụng iOS/Android/Web'
        ],
        featured: false
      }
    ];

    features = [
      { title: 'Truy cập mượt mà đa nền tảng', desc: 'Hỗ trợ đầy đủ ứng dụng client cho Windows, macOS, iOS, Android và cả trình duyệt web HTML5.', icon: <Globe className="w-5 h-5" /> },
      { title: 'Phân quyền tập trung chặt chẽ', desc: 'Phòng IT dễ dàng quản lý quyền cài đặt phần mềm, hạn chế rò rỉ thông tin tài liệu ra ngoài mạng.', icon: <Lock className="w-5 h-5" /> },
      { title: 'Tích hợp sẵn ứng dụng văn phòng', desc: 'Tích hợp sẵn bản quyền Microsoft Word, Excel, PowerPoint chính hãng cập nhật phiên bản mới.', icon: <Box className="w-5 h-5" /> },
      { title: 'Camera nhận diện AI thông minh', desc: 'Phát hiện hành vi xâm nhập trái phép, gửi cảnh báo tức thì kèm hình ảnh chụp hiện trường.', icon: <Shield className="w-5 h-5" /> }
    ];

    useCases = [
      { title: 'Làm việc từ xa an toàn cho nhân sự', desc: 'Cung cấp máy tính ảo Cloud PC đầy đủ công cụ làm việc cho nhân sự làm tại nhà, tránh rủi ro lây nhiễm virus.', metrics: 'Bảo mật thông tin nội bộ 100%', icon: <Cpu className="w-5 h-5" /> },
      { title: 'Cộng tác tài liệu nội bộ tập trung', desc: 'Đội nhóm dự án cùng đồng thời chỉnh sửa bảng tính báo cáo doanh thu, tài liệu thiết kế trực tuyến thời gian thực.', metrics: 'Tăng 35% hiệu quả làm việc nhóm', icon: <Box className="w-5 h-5" /> },
      { title: 'Giám sát chuỗi cửa hàng bán lẻ lớn', desc: 'Kết nối tập trung camera an ninh của hàng chục cửa hàng bán lẻ về một trang dashboard portal để quản lý tập trung.', metrics: 'Nhận diện khách hàng thân thiết chính xác > 98%', icon: <Shield className="w-5 h-5" /> }
    ];

    faqs = [
      { q: 'Dữ liệu làm việc trên Cloud PC có bị mất nếu mất điện hay rớt mạng?', a: 'Không hề. Phiên làm việc của bạn chạy độc lập trên máy chủ ảo ở Datacenter. Khi thiết bị cá nhân bị hỏng hay mất mạng, toàn bộ tiến trình làm việc của bạn vẫn được giữ nguyên trạng thái, chỉ cần đăng nhập lại là làm tiếp.' },
      { q: 'Sử dụng Viettel Drive có thể thay thế hoàn toàn máy chủ file truyền thống?', a: 'Hoàn toàn được. Viettel Drive linh hoạt hơn rất nhiều, hỗ trợ đồng bộ hóa tệp tin nhanh, tìm kiếm tệp bằng AI và an toàn sao lưu dữ liệu tuyệt đối.' }
    ];
  }

  return {
    title: name,
    subtitle: tagline,
    badge: `DỊCH VỤ CHUYÊN NGHIỆP · ${category.toUpperCase()}`,
    desc: desc,
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
    iconBgClass: iconBgClass,
    iconColorClass: iconColorClass,
    stats: stats,
    advantages: advantages,
    platformTitle: `Nền tảng hạ tầng công nghệ đằng sau ${name}`,
    platformDesc: `Tìm hiểu các tiêu chuẩn công nghệ, kiến trúc phần cứng và giải pháp an ninh tối tân được áp dụng để đảm bảo độ tin cậy tuyệt đối của dịch vụ.`,
    platforms: platforms,
    pricingPlans: pricingPlans,
    customConfigTitle: `Bạn cần giải pháp thiết kế đo ni đóng giày riêng cho ${name}?`,
    customConfigDesc: `Kết nối trực tiếp ngay với đội ngũ kỹ sư giải pháp giàu kinh nghiệm của Viettel IDC để khảo sát thực tế và lên phương án chi tiết nhất.`,
    features: features,
    useCases: useCases,
    faqs: faqs
  };
};
