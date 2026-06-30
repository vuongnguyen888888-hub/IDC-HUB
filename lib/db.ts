export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  pricing: {
    planName: string;
    specs: string[];
    price: string;
    period: string;
    isPopular?: boolean;
    fType: 'F1 Auto' | 'F2 Semi' | 'F3 CRM';
  }[];
  faqs: { q: string; a: string }[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  products: Product[];
}

export interface Solution {
  id: string;
  name: string;
  slug: string;
  segment: 'infra-cloud' | 'devops-ai' | 'connectivity';
  segmentName: string;
  problemHeadline: string;
  painPoints: string[];
  solutions: string[];
  description: string;
  relatedProducts: { name: string; slug: string; categorySlug: string }[];
  caseStudy: {
    client: string;
    metric: string;
    result: string;
  };
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'compute',
    name: 'Điện toán & Container',
    slug: 'compute',
    description: 'Dịch vụ máy chủ đám mây ảo hóa hiệu năng cao, GPU phục vụ AI và giải pháp container tự động hóa Kubernetes.',
    iconName: 'Cpu',
    products: [
      {
        id: 'viettel-cloud-server',
        name: 'Viettel Cloud Server',
        slug: 'viettel-cloud-server',
        categorySlug: 'compute',
        description: 'Dịch vụ máy chủ ảo đám mây hiệu năng cao, mở rộng tức thì, cam kết SLA tới 99.99%. Tích hợp ổ cứng SSD Enterprise siêu tốc.',
        features: [
          'Khởi tạo dịch vụ thần tốc dưới 5 phút thông qua dashboard trực quan.',
          'Kết nối Internet băng thông rộng lên tới 10 Gbps không nghẽn mạch.',
          'Cam kết chất lượng dịch vụ SLA tài chính bảo đảm 99.99%.',
          'Tự động sao lưu tuần hoàn hàng tuần, đảm bảo tuyệt đối an toàn dữ liệu.'
        ],
        specs: [
          { label: 'Uptime Cam Kết', value: '✓ 99.99%' },
          { label: 'Khởi tạo', value: '⚡ < 5 phút' },
          { label: 'Bảo mật tiêu chuẩn', value: '🔒 ISO 27001' },
          { label: 'Hỗ trợ kỹ thuật', value: '💬 24/7/365' }
        ],
        pricing: [
          {
            planName: 'Cloud Server Standard 1',
            specs: ['1 vCPU Intel Xeon Gold', '2 GB RAM DDR4', '50 GB SSD Enterprise', '1 IPv4 Public', 'Mạng 100Mbps Shared'],
            price: '190.000',
            period: 'tháng',
            fType: 'F1 Auto'
          },
          {
            planName: 'Cloud Server Professional 2 (Phổ biến)',
            specs: ['2 vCPU Intel Xeon Gold', '4 GB RAM DDR4', '100 GB SSD Enterprise', '1 IPv4 Public', 'Mạng 200Mbps Shared'],
            price: '380.000',
            period: 'tháng',
            isPopular: true,
            fType: 'F1 Auto'
          },
          {
            planName: 'Cloud Server Advanced 4',
            specs: ['4 vCPU Intel Xeon Gold', '8 GB RAM DDR4', '150 GB SSD Enterprise', '1 IPv4 Public', 'Mạng 300Mbps Shared'],
            price: '740.000',
            period: 'tháng',
            fType: 'F1 Auto'
          }
        ],
        faqs: [
          { q: 'SLA 99.99% của Viettel Cloud Server được cam kết như thế nào?', a: 'Viettel IDC cam kết bồi thường tài chính trực tiếp trong trường hợp thời gian uptime của máy chủ sụt giảm dưới ngưỡng 99.99% mỗi tháng, quy định minh bạch trong hợp đồng cấu trúc dịch vụ SLA.' },
          { q: 'Tôi có thể cài đặt hệ điều hành nào trên máy chủ ảo?', a: 'Hệ thống hỗ trợ tự động cài đặt tất cả các hệ điều hành phổ biến: Windows Server, CentOS, Ubuntu, Debian hoặc tải lên file ISO cấu hình riêng của doanh nghiệp.' },
          { q: 'Tốc độ đọc ghi của ổ cứng lưu trữ là bao nhiêu?', a: 'Chúng tôi sử dụng 100% SSD SAS/NVMe Enterprise với công nghệ RAID 10 đem lại tốc độ IOPS tối thiểu 10,000 IOPS đáp ứng mượt mà cả dịch vụ cơ sở dữ liệu lớn.' },
          { q: 'Hệ thống có hỗ trợ mở rộng phần cứng mà không mất dữ liệu không?', a: 'Có, bạn hoàn toàn có thể nâng cấp dung lượng RAM, CPU và Disk trực tuyến chỉ qua vài click ở Trang quản trị Console mà hoàn toàn không ảnh hưởng tới dữ liệu cũ.' },
          { q: 'Làm thế nào để chuyển đổi dữ liệu từ hệ thống cũ về Viettel IDC?', a: 'Đội ngũ kỹ sư giải pháp của chúng tôi hỗ trợ chuyển dịch dữ liệu miễn phí 24/7, cam kết không gây gián đoạn dịch vụ của doanh nghiệp bạn.' }
        ]
      },
      {
        id: 'viettel-kubernetes',
        name: 'Viettel Kubernetes Service (vK8s)',
        slug: 'viettel-kubernetes',
        categorySlug: 'compute',
        description: 'Giải pháp quản lý, vận hành và tự động hóa co giãn cụm Container Kubernetes chuẩn hóa doanh nghiệp.',
        features: [
          'Quản lý vòng đời container tập trung.',
          'Tự động khắc phục lỗi cấu hình (Self-healing).',
          'Tích hợp sẵn tường lửa mạng đám mây.'
        ],
        specs: [
          { label: 'Uptime Control Plane', value: '✓ 99.95%' },
          { label: 'Scalability', value: '⚡ Tự động co giãn' }
        ],
        pricing: [
          { planName: 'vK8s Dev', specs: ['Managed Master Node', 'Up to 3 Worker Nodes Basic'], price: '500.000', period: 'tháng', fType: 'F1 Auto' },
          { planName: 'vK8s Production', specs: ['Managed Master Multi-AZ', 'Unlimited Workers Enterprise'], price: '1.500.000', period: 'tháng', isPopular: true, fType: 'F2 Semi' }
        ],
        faqs: [
          { q: 'vK8s có tự động nâng cấp phiên bản không?', a: 'Có, bạn có thể thiết lập lịch trình cập nhật an toàn và hệ thống sẽ tự động chuyển đổi phiên bản không gián đoạn.' }
        ]
      },
      {
        id: 'viettel-gpu-server',
        name: 'Viettel GPU Server',
        slug: 'viettel-gpu-server',
        categorySlug: 'compute',
        description: 'Tận dụng hiệu năng tính toán đỉnh cao của dòng GPU NVIDIA Tensor Core cho các dự án AI, Deep Learning và kết xuất đồ họa.',
        features: ['Card đồ họa NVIDIA A100/H100 mới nhất', 'Băng thông kết nối GPU siêu tốc NVLink', 'Tối ưu cho kiến trúc AI Frameworks'],
        specs: [{ label: 'GPU vRAM', value: '⚡ Tới 80GB HBM2e' }, { label: 'Tính toán', value: '✓ Chuyên dụng AI' }],
        pricing: [
          { planName: 'GPU Basic (NVIDIA T4)', specs: ['1 vGPU T4 16GB', '8 vCPU v4', '32GB RAM'], price: '3.700.000', period: 'tháng', fType: 'F2 Semi' },
          { planName: 'GPU Advanced (NVIDIA A100)', specs: ['1 GPU A100 40GB', '24 vCPU v4', '128GB RAM'], price: '18.500.000', period: 'tháng', isPopular: true, fType: 'F3 CRM' }
        ],
        faqs: []
      }
    ]
  },
  {
    id: 'data-center',
    name: 'Trung tâm dữ liệu',
    slug: 'data-center',
    description: 'Thuê chỗ đặt tủ rack riêng lẻ, phòng máy cage bảo mật 5 lớp và server Bare Metal chuyên dụng đặt tại chuẩn Rated 3.',
    iconName: 'Database',
    products: [
      {
        id: 'viettel-colocation',
        name: 'Dịch vụ Cho thuê chỗ đặt máy chủ (Colocation)',
        slug: 'viettel-colocation',
        categorySlug: 'data-center',
        description: 'Không gian phòng máy tiêu chuẩn cao cấp, hỗ trợ nguồn điện dự phòng Active-Active kép và làm mát hiện đại đạt chứng chỉ xanh.',
        features: ['Tiêu chuẩn Rated 3 TIA-942 khắt khe.', 'Không gian máy chủ biệt lập bảo đảm vật lý.', 'Nguồn điện kép UPS 2N+1 dự phòng.'],
        specs: [{ label: 'Tiêu chuẩn', value: '✓ Rated 3' }, { label: 'Nguồn điện', value: '⚡ Dự phòng 2N+1' }],
        pricing: [
          { planName: 'Thuê 1U Space', specs: ['1U Space trong tủ Rack tiêu chuẩn', 'Công suất điện tối đa 400W', 'Nguồn điện kép (A+B)', '1 Gbps shared port'], price: '2.500.000', period: 'tháng', fType: 'F2 Semi' },
          { planName: 'Thuê Trọn Tủ Rack 42U', specs: ['Full Rack 42U 600x1070mm', 'Công suất điện tối đa 3kW N+1', 'Nguồn điện kép 32A', 'Băng thông rộng 100Mbps'], price: '12.000.000', period: 'tháng', isPopular: true, fType: 'F3 CRM' }
        ],
        faqs: []
      }
    ]
  },
  {
    id: 'storage',
    name: 'Lưu trữ & Bảo vệ dữ liệu',
    slug: 'storage',
    description: 'Giải pháp Sao lưu khôi phục (BaaS), Lưu trữ đối tượng S3 hiệu năng cao và phòng ngừa thảm họa toàn diện (DRaaS).',
    iconName: 'HardDrive',
    products: []
  },
  {
    id: 'data-platform',
    name: 'Nền tảng dữ liệu & Tích hợp',
    slug: 'data-platform',
    description: 'Dịch vụ cơ sở dữ liệu tự động (vDBS), bộ nhớ đệm cache tốc độ cao và cổng quản lý API tích hợp an toàn.',
    iconName: 'Layers',
    products: []
  },
  {
    id: 'networking',
    name: 'Mạng & Phân phối nội dung',
    slug: 'networking',
    description: 'Băng thông rộng tốc độ cao, kết nối trực tiếp đa đám mây Cloud Connect và mạng phân truyền CDN siêu tải.',
    iconName: 'Globe',
    products: []
  },
  {
    id: 'security',
    name: 'Bảo mật & An ninh mạng',
    slug: 'security',
    description: 'Tường lửa bảo vệ đa lớp, chống mã hóa ransomware độc hại và trung tâm giám sát SOC chuyên nghiệp 24/7.',
    iconName: 'Shield',
    products: []
  },
  {
    id: 'cloud-operations',
    name: 'Vận hành & Giám sát đám mây',
    slug: 'cloud-operations',
    description: 'Quản trị hợp nhất toàn diện và giám sát hiệu năng trực quan ứng dụng từ đầu cuối đến hạ tầng.',
    iconName: 'Activity',
    products: []
  },
  {
    id: 'digital-services',
    name: 'Ứng dụng & Dịch vụ số',
    slug: 'digital-services',
    description: 'Không gian cộng tác số Office 365, giải pháp lưu trữ Viettel Drive và Cloud PC tối ưu hiệu quả doanh nghiệp.',
    iconName: 'Briefcase',
    products: []
  },
  {
    id: 'managed-services',
    name: 'Dịch vụ quản lý & Tư vấn',
    slug: 'managed-services',
    description: 'Giải pháp di trú đám mây an toàn và đội ngũ chuyên gia ủy thác vận hành hệ thống hạ tầng 24/7.',
    iconName: 'HelpCircle',
    products: []
  },
  {
    id: 'hosting',
    name: 'Domain, Hosting & Email',
    slug: 'hosting',
    description: 'Tên miền quốc tế/Việt Nam, Web Hosting ổn định tối ưu cho SEO và giải pháp email chuyên nghiệp.',
    iconName: 'Mail',
    products: []
  }
];

export const SOLUTIONS: Solution[] = [
  {
    id: 'backup-dr',
    name: 'Sao lưu & Phục hồi thảm họa (Backup & Disaster Recovery)',
    slug: 'backup-dr',
    segment: 'infra-cloud',
    segmentName: 'Hạ tầng & Cloud',
    description: 'Giải pháp khôi phục hạ tầng CNTT sau sự cố, đảm bảo RPO dưới 15 giây và RTO dưới 15 phút, tự động bảo vệ trước ransomware.',
    problemHeadline: 'Thời gian gián đoạn hệ thống phá hủy doanh thu và lòng tin khách hàng thế nào?',
    painPoints: [
      'Mất mát dữ liệu quan trọng do tấn công ransomware hoặc mã độc.',
      'Sự cố mất điện hoặc lỗi phần cứng đột xuất làm sập hệ thống hàng giờ liên tục.',
      'Chi phí đầu tư hạ tầng dự phòng vật lý (DR Site) quá cao cho doanh nghiệp vừa và nhỏ.',
      'Thiếu quy trình và con người thử nghiệm kịch bản phục hồi thảm họa định kỳ.'
    ],
    solutions: [
      'Công nghệ nhân bản dữ liệu thời gian thực thông qua cơ chế CDP (Continuous Data Protection).',
      'Đồng bộ hóa an toàn đa trung tâm dữ liệu giữa miền Bắc (Hà Nội) và Nam (Bình Dương).',
      'Khởi tạo giả lập DR Site tức thì trên nền tảng Viettel Cloud chỉ bằng một click.',
      'Tự động tích hợp cơ chế chống ghi đè dữ liệu bất biến (Object Lock) kháng Ransomware.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' },
      { name: 'Cho thuê chỗ đặt máy chủ (Colocation)', slug: 'viettel-colocation', categorySlug: 'data-center' }
    ],
    caseStudy: {
      client: 'Ngân hàng BIDV - Dự án Core Banking Backup',
      metric: '✓ Đạt chuẩn an toàn quốc tế',
      result: 'Chuyển đổi dự phòng thảm họa thành công 100% trong vòng chưa đầy 8 phút, đảm bảo tính liên tục của giao dịch trực tuyến.'
    }
  },
  {
    id: 'cloud-migration',
    name: 'Chuyển đổi lên đám mây (Cloud Migration)',
    slug: 'cloud-migration',
    segment: 'infra-cloud',
    segmentName: 'Hạ tầng & Cloud',
    description: 'Giúp doanh nghiệp chuyển dịch toàn hệ thống phần cứng, cơ sở dữ liệu cũ lên mây an toàn, không gián đoạn dịch vụ.',
    problemHeadline: 'Bài toán hạ tầng vật lý cồng kềnh, chi phí bảo trì khổng lồ biến thành mây linh hoạt.',
    painPoints: ['Mở rộng phần cứng mất vài tháng mua sắm thiết bị.', 'Hạ tầng cũ không đáp ứng lượng truy cập tăng vọt đột ngột.'],
    solutions: ['Khảo sát hạ tầng tổng thể bằng công cụ chuyên dụng.', 'Thiết lập mạng ảo hybrid an toàn kết nối vật lý và đám mây.'],
    relatedProducts: [{ name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }],
    caseStudy: { client: 'Tập đoàn Vingroup', metric: '65% Tiết kiệm', result: 'Giảm 65% chi phí vận hành máy chủ vật lý sau 3 tháng chuyển dịch toàn diện.' }
  },
  {
    id: 'containerization',
    name: 'Giải pháp Container & Microservices',
    slug: 'container',
    segment: 'devops-ai',
    segmentName: 'Dev, Ops & AI',
    description: 'Chuyển đổi kiến trúc ứng dụng từ Monolithic sang Microservices trên nền tảng Kubernetes được quản lý.',
    problemHeadline: 'Nâng cấp tính năng ứng dụng mất quá nhiều thời gian và dễ gây lỗi hệ thống liên đới.',
    painPoints: ['Hệ thống nặng nề, khó cô lập lỗi khi có sự cố.', 'Năng suất bàn giao sản phẩm của đội dev bị giới hạn.'],
    solutions: ['Quy chuẩn cụm Container tự động co giãn thông minh.', 'Tự động CI/CD tối ưu hóa quy trình release phiên bản mới.'],
    relatedProducts: [{ name: 'Viettel Kubernetes Service (vK8s)', slug: 'viettel-kubernetes', categorySlug: 'compute' }],
    caseStudy: { client: 'Ứng dụng TMĐT MyViettel', metric: '⚡ Deploy 10 phút', result: 'Rút ngắn thời gian triển khai ứng dụng từ 2 ngày xuống còn 10 phút.' }
  }
];

export const CLIENT_LOGOS = [
  { name: 'Viettel Group', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Viettel_logo_2021.svg', industry: 'Viễn thông' },
  { name: 'Bộ Thông tin & Truyền thông', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Emblem_of_Vietnam.svg', industry: 'Chính phủ' },
  { name: 'Ngân hàng BIDV', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Logo_Bidv_m%E1%BB%9Bi.svg', industry: 'Tài chính' },
  { name: 'Ngân hàng VPBank', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/VPBank_logo.svg', industry: 'Tài chính' },
  { name: 'Ngân hàng MB Bank', src: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png', industry: 'Tài chính' },
  { name: 'Tập đoàn Vingroup', src: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Vingroup_logo.svg', industry: 'Đa ngành' },
  { name: 'Ngân hàng Vietcombank', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Vietcombank_logo_fixed.svg', industry: 'Tài chính' },
  { name: 'Petrolimex', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_of_Petrolimex.svg', industry: 'Năng lượng' }
];
