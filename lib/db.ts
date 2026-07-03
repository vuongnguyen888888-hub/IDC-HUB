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
  segment: string;
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
    name: 'Sao lưu & Dự phòng dữ liệu (Backup & Disaster Recovery)',
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
    name: 'Chuyển đổi hạ tầng Cloud (Cloud Migration)',
    slug: 'cloud-migration',
    segment: 'infra-cloud',
    segmentName: 'Hạ tầng & Cloud',
    description: 'Giúp doanh nghiệp chuyển dịch toàn hệ thống phần cứng, cơ sở dữ liệu cũ lên mây an toàn, không gián đoạn dịch vụ.',
    problemHeadline: 'Bài toán hạ tầng vật lý cồng kềnh, chi phí bảo trì khổng lồ biến thành mây linh hoạt.',
    painPoints: [
      'Mở rộng phần cứng mất vài tháng mua sắm và lắp đặt thiết bị.',
      'Hạ tầng tại chỗ cũ kỹ, không đáp ứng được lượng truy cập tăng vọt đột ngột của doanh nghiệp.',
      'Rủi ro gián đoạn vận hành kinh doanh trong quá trình chuyển dịch dữ liệu khổng lồ.'
    ],
    solutions: [
      'Khảo sát hạ tầng tổng thể tự động bằng công cụ chuyên dụng, lập lộ trình chi tiết.',
      'Thiết lập mạng ảo hybrid an toàn kết nối vật lý on-premise và đám mây Viettel Cloud.',
      'Di chuyển dữ liệu bằng phương pháp nhân bản không ảnh hưởng hiệu năng hệ thống hiện hành.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Tập đoàn Vingroup',
      metric: '65% Tiết kiệm',
      result: 'Giảm 65% chi phí vận hành máy chủ vật lý sau 3 tháng chuyển dịch toàn diện hệ thống SAP HANA lên đám mây.'
    }
  },
  {
    id: 'multi-az',
    name: 'Triển khai Multi-Availability Zone',
    slug: 'multi-az',
    segment: 'infra-cloud',
    segmentName: 'Hạ tầng & Cloud',
    description: 'Kiến trúc phân tán đa vùng khả dụng (Multi-AZ) giúp loại bỏ điểm lỗi đơn lẻ (SPOF), đảm bảo ứng dụng hoạt động liên tục 99.99%.',
    problemHeadline: 'Làm sao để hệ thống giao dịch trực tuyến đứng vững trước các sự cố tủ rack, mất điện toàn trạm hoặc thảm họa thiên tai?',
    painPoints: [
      'Thời gian chết (Downtime) tính bằng phút cũng có thể gây thiệt hại hàng tỷ đồng và hủy hoại danh tiếng doanh nghiệp.',
      'Cơ chế đồng bộ cơ sở dữ liệu phức tạp dễ gây mất mát hoặc bất nhất dữ liệu khi chuyển vùng (failover).',
      'Thiếu đường truyền tải mạng băng thông rộng độ trễ cực thấp giữa các phòng máy biệt lập.'
    ],
    solutions: [
      'Thiết lập topo Active-Active giữa 3 trung tâm dữ liệu chuẩn Rated 3 độc lập hoàn toàn về địa lý và nguồn điện.',
      'Kết nối cáp quang ngầm chuyên dụng tốc độ cao với độ trễ truyền phản hồi cực thấp dưới 1ms.',
      'Tích hợp bộ cân bằng tải phân tán (Cloud Load Balancer) tự động phát hiện lỗi và chuyển hướng thông minh.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Ví điện tử VNPAY',
      metric: '✓ SLA 99.99%',
      result: 'Duy trì hệ thống xử lý 50.000 giao dịch/giây ổn định hoàn hảo ngay cả khi giả lập ngắt điện đột ngột tại một vùng khả dụng.'
    }
  },
  {
    id: 'iac-hub',
    name: 'Viettel IaC Hub',
    slug: 'iac-hub',
    segment: 'devops-ai',
    segmentName: 'Dev, Ops & AI',
    description: 'Tự động hóa toàn bộ vòng đời hạ tầng thông qua Terraform templates, Ansible playbook và GitOps, giảm thời gian provisioning từ nhiều tuần xuống dưới 10 phút.',
    problemHeadline: 'Hạ tầng mở rộng thủ công bằng tay kéo dài thời gian ra mắt tính năng và phát sinh hàng loạt lỗi cấu hình an ninh.',
    painPoints: [
      'Kỹ sư hệ thống mất hàng giờ click chọn cấu hình trên console cho mỗi môi trường Dev/Staging/Prod.',
      'Sự sai lệch cấu hình (Configuration Drift) giữa các môi trường gây ra những lỗi ứng dụng cực kỳ khó bắt vết.',
      'Không thể theo dõi lịch sử thay đổi hạ tầng và khôi phục nhanh về trạng thái an toàn trước đó khi có lỗi phát sinh.'
    ],
    solutions: [
      'Chuyển đổi toàn bộ tài nguyên VM, Mạng, Tường lửa thành mã nguồn khai báo Infrastructure as Code.',
      'Cung cấp kho thư viện Terraform Templates chuẩn hóa cao được kiểm thử tự động (tflint, tfsec) nghiêm ngặt.',
      'Áp dụng quy trình GitOps, tự động triển khai thay đổi hạ tầng ngay khi pull request được phê duyệt.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Sở Thông tin và Truyền thông Hà Nội',
      metric: '⚡ Khởi tạo < 10 phút',
      result: 'Tự động hóa toàn bộ quy trình khởi dựng môi trường cổng dịch vụ công trực tuyến đồng loạt cho 30 quận huyện, giảm sai lỗi 98%.'
    }
  },
  {
    id: 'containerization',
    name: 'Giải pháp Container (Containerization)',
    slug: 'container',
    segment: 'devops-ai',
    segmentName: 'Dev, Ops & AI',
    description: 'Chuyển đổi kiến trúc ứng dụng từ Monolithic sang Microservices trên nền tảng Kubernetes được quản lý và bảo mật tối đa.',
    problemHeadline: 'Nâng cấp tính năng ứng dụng mất quá nhiều thời gian và dễ gây lỗi hệ thống liên đới.',
    painPoints: [
      'Hệ thống cồng kềnh, khó cô lập lỗi khi xảy ra sự cố đột xuất ở một phân hệ.',
      'Tốn kém tài nguyên máy chủ vật lý do không thể chia nhỏ và tối ưu hóa mật độ ứng dụng.',
      'Năng suất bàn giao sản phẩm của đội ngũ phát triển bị giới hạn bởi quy trình deploy thủ công.'
    ],
    solutions: [
      'Chuẩn hóa ứng dụng thành các Container gọn nhẹ, chạy độc lập và nhất quán trên mọi môi trường.',
      'Quy chuẩn cụm Kubernetes tự động co giãn thông minh theo tải thực tế (Horizontal Pod Autoscaler).',
      'Tích hợp CI/CD tự động build, test và rolling-update ứng dụng không gây downtime gián đoạn người dùng.'
    ],
    relatedProducts: [
      { name: 'Viettel Kubernetes Service (vK8s)', slug: 'viettel-kubernetes', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Ứng ứng dụng MyViettel',
      metric: '⚡ Deploy 10 phút',
      result: 'Rút ngắn thời gian phát hành tính năng mới từ 2 ngày xuống còn 10 phút, tự động co giãn đáp ứng vượt bão 10 triệu người dùng.'
    }
  },
  {
    id: 'devsecops',
    name: 'DevSecOps',
    slug: 'devsecops',
    segment: 'devops-ai',
    segmentName: 'Dev, Ops & AI',
    description: 'Tích hợp bảo mật tự động vào mọi giai đoạn của vòng đời phát triển phần mềm (CI/CD Pipeline), đảm bảo an toàn tuyệt đối mà không kìm hãm tốc độ release.',
    problemHeadline: 'Yêu cầu kiểm thử an toàn thông tin thủ công cuối dự án trở thành nút thắt cổ chai kìm hãm tốc độ phát hành ứng dụng.',
    painPoints: [
      'Lỗ hổng bảo mật được phát hiện quá muộn dẫn đến việc phải thiết kế lại lượng lớn kiến trúc mã nguồn.',
      'Thư viện mã nguồn mở bên thứ ba chứa mã độc liên tục bị lọt vào môi trường Production mà không được kiểm soát.',
      'Xung đột thường xuyên giữa mục tiêu phát triển nhanh của Dev và yêu cầu an toàn tuyệt mật của Security.'
    ],
    solutions: [
      'Tích hợp các bước kiểm thử bảo mật tĩnh (SAST) và kiểm thử động (DAST) tự động trực tiếp vào luồng build.',
      'Tự động quét lỗ hổng thư viện nguồn mở (SCA) và quét malware trong Docker images trước khi đóng gói.',
      'Thiết lập chính sách an ninh dưới dạng mã (Policy as Code), tự động chặn deploy nếu không đạt chuẩn bảo mật.'
    ],
    relatedProducts: [
      { name: 'Viettel Kubernetes Service (vK8s)', slug: 'viettel-kubernetes', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Công ty Chứng khoán VPS',
      metric: '✓ 100% Quét tự động',
      result: 'Phát hiện và ngăn chặn thành công 95% lỗ hổng bảo mật nghiêm trọng trước khi deploy, đẩy nhanh tốc độ release lên gấp 3 lần.'
    }
  },
  {
    id: 'monitoring-ai',
    name: 'Giám sát & Ứng dụng AI (AIOps)',
    slug: 'monitoring-ai',
    segment: 'devops-ai',
    segmentName: 'Dev, Ops & AI',
    description: 'Giải pháp giám sát hiệu năng ứng dụng toàn diện (APM) kết hợp trí tuệ nhân tạo (AIOps) tự động phát hiện bất thường và cảnh báo sớm sự cố.',
    problemHeadline: 'Hàng triệu log và metric đổ về mỗi giây khiến việc tìm kiếm nguyên nhân sự cố như mò kim đáy bể.',
    painPoints: [
      'Chỉ phát hiện hệ thống lỗi sau khi người dùng cuối phản hồi tiêu cực hoặc hệ thống đã sập hoàn toàn.',
      'Mất hàng giờ họp khẩn giữa các đội Dev, Ops, DB để phân định trách nhiệm khi có lỗi không rõ nguyên nhân.',
      'Cảnh báo giả quá nhiều gây loãng (Alert Fatigue), làm kỹ sư vận hành bỏ qua các sự cố thực sự nghiêm trọng.'
    ],
    solutions: [
      'Thu thập vết giao dịch từ đầu cuối (Tracing end-to-end) xuyên suốt qua hàng trăm dịch vụ Microservices.',
      'Mô hình học máy AI tự động phân tích và thiết lập ngưỡng hiệu năng động thích ứng theo thời gian thực.',
      'Tự động gom nhóm các cảnh báo liên quan, phân tích tương quan để chỉ ra chính xác nguyên nhân gốc rễ.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Hệ thống tính cước viễn thông Viettel',
      metric: '⏰ MTTR giảm 80%',
      result: 'Rút ngắn thời gian trung bình phát hiện và cô lập lỗi từ 45 phút xuống dưới 9 phút thông qua cơ chế tự phân tích của AI.'
    }
  },
  {
    id: 'hpc',
    name: 'Đám mây hiệu năng cao (HPC Cloud)',
    slug: 'hpc',
    segment: 'devops-ai',
    segmentName: 'Dev, Ops & AI',
    description: 'Hạ tầng tính toán hiệu năng cao được trang bị các dòng GPU NVIDIA Tensor Core mạnh mẽ nhất, phục vụ huấn luyện mô hình AI lớn và nghiên cứu khoa học dữ liệu.',
    problemHeadline: 'Chi phí đầu tư cụm siêu máy tính vật lý quá đắt đỏ và chu kỳ nâng cấp công nghệ phần cứng quá nhanh.',
    painPoints: [
      'Huấn luyện mô hình học sâu kéo dài hàng tuần hoặc hàng tháng do thiếu hụt tài nguyên GPU chuyên dụng.',
      'Nghẽn cổ chai băng thông truyền tải dữ liệu giữa máy chủ và lưu trữ làm giảm hiệu năng xử lý tính toán.',
      'Phòng máy thông thường không đáp ứng được nguồn điện cực lớn và mật độ tỏa nhiệt khổng lồ của dòng chip AI.'
    ],
    solutions: [
      'Cung cấp máy chủ GPU NVIDIA A100 / H100 chuyên dụng kết nối mạng lưới Infiniband siêu tốc 400 Gbps.',
      'Tận dụng siêu trung tâm dữ liệu Bình Dương với công nghệ làm mát bằng chất lỏng trực tiếp tiên tiến nhất.',
      'Tích hợp sẵn các thư viện tối ưu hóa AI hàng đầu như CUDA, cuDNN, PyTorch, TensorFlow hoạt động mượt mà.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Viện Nghiên cứu Trí tuệ nhân tạo Viettel',
      metric: '⚡ Huấn luyện x15 lần',
      result: 'Rút ngắn thời gian huấn luyện mô hình ngôn ngữ lớn tiếng Việt (LLM) từ 30 ngày xuống còn 48 giờ trên cụm HPC chuyên dụng.'
    }
  },
  {
    id: 'cdn',
    name: 'Mạng phân phối nội dung (CDN)',
    slug: 'cdn',
    segment: 'connectivity',
    segmentName: 'Kết nối & Workspace',
    description: 'Mạng lưới phân phối nội dung phủ sóng rộng khắp cả nước với băng thông cực lớn, giúp tăng tốc website, ứng dụng di động và truyền phát video chất lượng cao.',
    problemHeadline: 'Website tải chậm, video giật lag khi truy cập tăng vọt khiến khách hàng lập tức rời bỏ dịch vụ.',
    painPoints: [
      'Máy chủ gốc bị quá tải nghiêm trọng khi có lượng truy cập đột biến (Mega Sale, livestream sự kiện hot).',
      'Người dùng ở xa trung tâm dữ liệu gặp độ trễ cao khi tải các tài nguyên hình ảnh, video tĩnh nặng.',
      'Chi phí băng thông máy chủ gốc tăng phi mã khi truyền phát nội dung trực tuyến quy mô lớn.'
    ],
    solutions: [
      'Hệ thống POP CDN phủ rộng khắp 63 tỉnh thành, đặt trực tiếp tại các điểm nút biên mạng viễn thông Viettel.',
      'Tự động lưu trữ (cache) và phân phối thông minh nội dung từ điểm biên gần người dùng nhất với độ trễ tối thiểu.',
      'Tích hợp các công nghệ tối ưu hóa nén ảnh tự động và bảo vệ máy chủ gốc trước các cuộc tấn công DDoS biên.'
    ],
    relatedProducts: [
      { name: 'Cho thuê chỗ đặt máy chủ (Colocation)', slug: 'viettel-colocation', categorySlug: 'data-center' }
    ],
    caseStudy: {
      client: 'Nền tảng truyền hình số TV360',
      metric: '✓ Chịu tải 10 Triệu CCU',
      result: 'Truyền phát trực tiếp mượt mà các trận đấu bóng đá đỉnh cao Euro đạt độ phân giải Full HD không gián đoạn cho hàng triệu người xem đồng thời.'
    }
  },
  {
    id: 'mobile-work',
    name: 'Làm việc di động (Digital Workplace)',
    slug: 'mobile-work',
    segment: 'connectivity',
    segmentName: 'Kết nối & Workspace',
    description: 'Giải pháp văn phòng số di động hợp nhất, kết hợp máy tính ảo Cloud PC độ bảo mật cao và bộ công cụ cộng tác trực tuyến Microsoft 365.',
    problemHeadline: 'Làm việc từ xa làm tăng rủi ro rò rỉ dữ liệu nhạy cảm của doanh nghiệp ra các thiết bị cá nhân.',
    painPoints: [
      'Nhân viên sao chép thông tin khách hàng, mã nguồn dự án ra thiết bị cá nhân mà không có sự kiểm soát của IT.',
      'Khó khăn trong việc cấp phát, quản lý đồng bộ và thu hồi tài nguyên làm việc cho nhân viên thuê ngoài (outsource).',
      'Hệ thống email nội bộ cũ liên tục bị spam, mã độc và tấn công giả mạo đe dọa an toàn thông tin.'
    ],
    solutions: [
      'Triển khai máy tính ảo Viettel Cloud PC, toàn bộ dữ liệu lưu trữ tập trung tại phòng máy IDC bảo mật vật lý.',
      'Thiết lập chính sách an ninh chặn chụp màn hình, chặn cắm USB và copy-paste dữ liệu ra ngoài thiết bị ảo.',
      'Cung cấp bộ công cụ Microsoft 365 chính hãng tích hợp Exchange Email, Teams, OneDrive đồng bộ hoàn hảo.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Tập đoàn Bảo hiểm PTI',
      metric: '🔒 100% An toàn dữ liệu',
      result: 'Chuyển đổi thành công môi trường làm việc từ xa bảo mật cao cho hơn 2.000 giám định viên và đại lý trên toàn quốc.'
    }
  },
  {
    id: 'website',
    name: 'Xây dựng Website doanh nghiệp',
    slug: 'website',
    segment: 'connectivity',
    segmentName: 'Kết nối & Workspace',
    description: 'Gói giải pháp trọn bộ tối ưu bao gồm Web Hosting tốc độ cao, tên miền quốc tế/Việt Nam và chứng chỉ bảo mật SSL tin cậy.',
    problemHeadline: 'Doanh nghiệp loay hoay thiết lập website từ con số 0 với chi phí đắt đỏ và thiếu tính ổn định.',
    painPoints: [
      'Website hoạt động chập chờn, thường xuyên bị sập do hosting kém chất lượng hoặc thiếu sao lưu tự động.',
      'Không có chứng chỉ SSL khiến trình duyệt hiện cảnh báo nguy hiểm, làm suy giảm uy tín nghiêm trọng trong mắt khách hàng.',
      'Tốc độ phản hồi tên miền chậm do hệ thống phân giải DNS không được tối ưu hóa địa lý tại Việt Nam.'
    ],
    solutions: [
      'Cung cấp Web Hosting sử dụng 100% ổ cứng SSD SAS Enterprise tốc độ cao và máy chủ web LiteSpeed siêu tốc.',
      'Tự động tích hợp và gia hạn chứng chỉ bảo mật SSL miễn phí, bảo vệ thông tin giao dịch trực tuyến.',
      'Hệ thống Anycast DNS toàn cầu của Viettel giúp giảm thời gian phân giải tên miền xuống dưới 10ms.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Chuỗi cửa hàng Mẹ & Bé Con Cưng',
      metric: '⚡ Tải trang < 1.2s',
      result: 'Khởi tạo và vận hành mượt mà website giới thiệu sản phẩm mới, chịu tải ổn định hơn 100.000 lượt truy cập mua sắm mỗi ngày.'
    }
  },
  {
    id: 'fintech',
    name: 'Tài chính - Ngân hàng (Fintech & Banking)',
    slug: 'fintech',
    segment: 'industry',
    segmentName: 'Giải pháp theo ngành',
    description: 'Hạ tầng điện toán đám mây chuyên biệt cho ngành tài chính ngân hàng, đáp ứng nghiêm ngặt chứng chỉ PCI DSS Level 1 v4.0 và các quy chuẩn bảo mật tối cao của Ngân hàng Nhà nước.',
    problemHeadline: 'Áp lực tuân thủ pháp lý khắt khe và rủi ro tấn công mạng liên tục đe dọa các giao dịch số.',
    painPoints: [
      'Yêu cầu bảo mật tuyệt đối thông tin thẻ thanh toán và dữ liệu nhạy cảm cá nhân của hàng triệu khách hàng.',
      'Hệ thống Core Banking cũ cồng kềnh khó mở rộng linh hoạt để tích hợp mượt mà với các dịch vụ số mới.',
      'Phải đáp ứng thông tư khắt khe về an toàn thông tin hệ thống của Ngân hàng Nhà nước Việt Nam.'
    ],
    solutions: [
      'Xây dựng phân vùng đám mây dùng riêng (Private Cloud) cách ly vật lý hoàn toàn ở cấp độ phần cứng máy chủ.',
      'Duy trì chứng chỉ bảo mật thanh toán thẻ quốc tế PCI DSS v4.0 Level 1 cao nhất toàn cầu.',
      'Giám sát an ninh mạng thời gian thực thông qua Trung tâm điều hành SOC chuyên nghiệp liên tục 24/7.'
    ],
    relatedProducts: [
      { name: 'Cho thuê chỗ đặt máy chủ (Colocation)', slug: 'viettel-colocation', categorySlug: 'data-center' }
    ],
    caseStudy: {
      client: 'Ngân hàng Thương mại Cổ phần Quân đội (MB)',
      metric: '✓ Đạt chuẩn PCI DSS v4.0',
      result: 'Triển khai phân vùng đám mây an toàn phục vụ ứng dụng ngân hàng số MB Bank với SLAs 99.99%, đáp ứng 100% quy định kiểm toán bảo mật.'
    }
  },
  {
    id: 'ecommerce',
    name: 'Thương mại điện tử & Bán lẻ (Retail & E-commerce)',
    slug: 'ecommerce',
    segment: 'industry',
    segmentName: 'Giải pháp theo ngành',
    description: 'Hạ tầng đám mây co giãn tự động (Auto Scaling) và mạng phân phối nội dung tốc độ cao, giúp các trang thương mại điện tử vượt bão truy cập mùa Mega Sale mượt mà.',
    problemHeadline: 'Hệ thống nghẽn mạng, sập trang thanh toán đúng thời điểm vàng Mega Sale gây thất thoát hàng tỷ đồng doanh thu.',
    painPoints: [
      'Lượng truy cập tăng đột biến gấp 50-100 lần bình thường trong thời gian cực ngắn (Flash Sale).',
      'Trải nghiệm người dùng bị ảnh hưởng nặng nề do hình ảnh sản phẩm tải chậm, giỏ hàng phản hồi trễ.',
      'Chi phí hạ tầng bị lãng phí do phải duy trì máy chủ cấu hình cao suốt cả năm chỉ để phục vụ vài ngày sale lớn.'
    ],
    solutions: [
      'Sử dụng cụm Kubernetes (vK8s) tự động co giãn số lượng container (HPA) theo tải truy cập thời gian thực.',
      'Tối ưu hóa phân phối hình ảnh sản phẩm tĩnh thông qua mạng lưới biên phân phối Viettel CDN.',
      'Tích hợp bộ nhớ đệm cơ sở dữ liệu tốc độ cao vCAS (Redis managed) giúp giảm tải trực tiếp cho DB gốc.'
    ],
    relatedProducts: [
      { name: 'Viettel Kubernetes Service (vK8s)', slug: 'viettel-kubernetes', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Nền tảng thương mại điện tử Voso',
      metric: '⚡ Phản hồi < 500ms',
      result: 'Vận hành ổn định chiến dịch sale nông sản toàn quốc với hơn 3 triệu lượt truy cập cùng thời điểm, không xảy ra bất kỳ sự cố nghẽn mạch nào.'
    }
  },
  {
    id: 'healthtech',
    name: 'Y tế số (HealthTech & PACS Cloud)',
    slug: 'healthtech',
    segment: 'industry',
    segmentName: 'Giải pháp theo ngành',
    description: 'Giải pháp lưu trữ hình ảnh y khoa PACS đám mây dung lượng lớn, truyền tải siêu tốc và bảo mật hồ sơ bệnh án điện tử (EHR) theo tiêu chuẩn của Bộ Y tế.',
    problemHeadline: 'Hạ tầng lưu trữ tại chỗ quá tải do dữ liệu hình ảnh MRI, CT dung lượng lớn tăng lên không ngừng.',
    painPoints: [
      'Bác sĩ mất nhiều thời gian chờ đợi tải phim chẩn đoán từ hệ thống lưu trữ cũ lắp đặt tại bệnh viện.',
      'Nguy cơ mất mát dữ liệu bệnh án cực kỳ quý giá khi gặp sự cố phần cứng hỏng hóc vật lý tại chỗ.',
      'Khó khăn trong việc liên thông và chia sẻ dữ liệu phim chụp an toàn giữa các bệnh viện để hội chẩn từ xa.'
    ],
    solutions: [
      'Lưu trữ đối tượng Viettel Object Storage không giới hạn dung lượng với chi phí tối ưu hóa vượt trội.',
      'Đường truyền chuyên dụng tốc độ cao giúp truyền tải phim chụp DICOM sắc nét trong dưới 2 giây.',
      'Cơ chế tự động sao lưu dữ liệu bảo vệ thảm họa (BaaS) đảm bảo an toàn an ninh dữ liệu y khoa tuyệt đối.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Bệnh viện Đa khoa Quốc tế Vinmec',
      metric: '✓ Truyền phim chụp < 2s',
      result: 'Số hóa thành công hệ thống lưu trữ hình ảnh PACS đám mây cho toàn chuỗi bệnh viện, giúp bác sĩ hội chẩn từ xa tức thì hiệu quả.'
    }
  },
  {
    id: 'edtech',
    name: 'Giáo dục trực tuyến (EdTech & LMS)',
    slug: 'edtech',
    segment: 'industry',
    segmentName: 'Giải pháp theo ngành',
    description: 'Hạ tầng truyền phát bài giảng Live-class trực tuyến không độ trễ, hệ thống quản lý học tập (LMS) chịu tải đồng thời hàng triệu học sinh.',
    problemHeadline: 'Lớp học ảo bị giật lag, rớt kết nối khi hàng vạn học sinh đồng thời đăng nhập vào giờ cao điểm học trực tuyến.',
    painPoints: [
      'Chi phí băng thông tăng vọt mất kiểm soát khi truyền phát hàng ngàn luồng video học trực tiếp đồng thời.',
      'Hệ thống thi trắc nghiệm trực tuyến bị sập nghẽn do hàng ngàn truy vấn gửi bài thi tập trung cùng một giây.',
      'Rủi ro bị sao chép trái phép, đánh cắp bản quyền bài giảng và tài nguyên giáo dục độc quyền của giáo viên.'
    ],
    solutions: [
      'Truyền dẫn video thông qua mạng biên CDN tối ưu hóa cho livestreaming truyền phát chất lượng HD mượt mà.',
      'Sử dụng máy chủ ảo cấu hình mạnh mẽ, tự động mở rộng tài nguyên tính toán tức thì khi tới giờ học.',
      'Mã hóa chống tải xuống trái phép video bài giảng bằng giải pháp bảo vệ DRM bản quyền số chuyên nghiệp.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Hệ thống học tập trực tuyến K12Online',
      metric: '✓ Đón 2.5 Triệu Học sinh',
      result: 'Vận hành thành công nền tảng giáo dục trực tuyến trực quan quy mô quốc gia, hỗ trợ hàng triệu lớp học ảo hoạt động trơn tru.'
    }
  },
  {
    id: 'digital-gov',
    name: 'Chính phủ số & Hành chính công',
    slug: 'digital-gov',
    segment: 'industry',
    segmentName: 'Giải pháp theo ngành',
    description: 'Hạ tầng điện toán đám mây dùng riêng (Sovereign Cloud) biệt lập hoàn toàn, đạt chứng chỉ an toàn thông tin cấp độ 4 của Bộ Thông tin & Truyền thông.',
    problemHeadline: 'Yêu cầu tuyệt mật thông tin công vụ và chủ quyền dữ liệu quốc gia trước mọi nguy cơ tấn công mạng từ bên ngoài.',
    painPoints: [
      'Nguy cơ bị tấn công gián điệp, rò rỉ thông tin hành chính chính phủ nhạy cảm ra ngoài biên giới.',
      'Hệ thống dịch vụ công bị sập nghẽn do quá tải hồ sơ trực tuyến tập trung, gây bức xúc dư luận.',
      'Yêu cầu dữ liệu bắt buộc phải được lưu trữ 100% trong nước dưới tầm kiểm soát bảo hộ pháp lý của nhà nước.'
    ],
    solutions: [
      'Xây dựng phân vùng đám mây Sovereign Cloud độc lập vật lý tuyệt đối, vận hành hoàn toàn bởi nhân sự Việt Nam.',
      'Tuân thủ 100% Luật An ninh mạng, Luật An toàn thông tin mạng và Nghị định 13 bảo vệ dữ liệu cá nhân.',
      'Trung tâm điều hành SOC chuyên nghiệp trực chiến 24/7 phát hiện và chủ động ngăn chặn mã độc APT.'
    ],
    relatedProducts: [
      { name: 'Cho thuê chỗ đặt máy chủ (Colocation)', slug: 'viettel-colocation', categorySlug: 'data-center' }
    ],
    caseStudy: {
      client: 'Cổng Dịch vụ công Quốc gia',
      metric: '✓ Đạt An ninh Cấp độ 4',
      result: 'Đảm bảo hạ tầng vận hành an toàn bảo mật tuyệt đối cho các giao dịch hành chính công trực tuyến của hàng triệu người dân mỗi ngày.'
    }
  },
  {
    id: 'smart-manufacturing',
    name: 'Sản xuất thông minh & IoT Logistics',
    slug: 'smart-manufacturing',
    segment: 'industry',
    segmentName: 'Giải pháp theo ngành',
    description: 'Nền tảng kết nối IoT biên (Edge IoT), lưu trữ dữ liệu chuỗi cảm biến thời gian thực, phục vụ tự động hóa nhà máy và giám sát vận tải thông minh.',
    problemHeadline: 'Hàng vạn thiết bị cảm biến truyền dữ liệu liên tục gây nghẽn đường truyền và chậm trễ trong việc ra quyết định điều phối.',
    painPoints: [
      'Độ trễ truyền tải dữ liệu từ nhà máy lên mây quá cao khiến việc xử lý dừng dây chuyền lỗi bị chậm trễ.',
      'Khó khăn trong việc kết nối đồng bộ hàng chục ngàn thiết bị IoT sử dụng nhiều giao thức công nghiệp khác nhau.',
      'Mất mát dữ liệu hành trình xe vận tải do mất kết nối mạng di động ở vùng sâu vùng xa.'
    ],
    solutions: [
      'Triển khai máy chủ biên Edge Compute xử lý dữ liệu tức thì ngay tại nhà máy, giảm độ trễ phản hồi xuống dưới 10ms.',
      'Cổng kết nối IoT hỗ trợ tự động đồng bộ hóa các giao thức công nghiệp (MQTT, Modbus, CoAP).',
      'Ứng dụng bản đồ số định vị thời gian thực kết hợp mạng di động băng thông rộng 4G/5G phủ sóng của Viettel.'
    ],
    relatedProducts: [
      { name: 'Viettel Cloud Server', slug: 'viettel-cloud-server', categorySlug: 'compute' }
    ],
    caseStudy: {
      client: 'Nhà máy thông minh Pegatron Hải Phòng',
      metric: '⚡ Độ trễ < 10ms',
      result: 'Kết nối thành công hơn 15.000 cảm biến và cánh tay robot tự động hóa lắp ráp linh kiện, nâng cao 25% hiệu suất vận hành.'
    }
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
