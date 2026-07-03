'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Zap, Layers, Activity, Network, Database, Settings, 
  Calculator, Shield, Globe, Check, AlertCircle, Clock, Bell, 
  Phone, BookOpen, Lock, ArrowUpRight, ChevronRight, ChevronDown,
  Server, Cpu, Terminal, RefreshCw, BarChart2, HardDrive, ArrowRight,
  User, Mail, CheckCircle2, Laptop, Monitor, GraduationCap, Building2,
  ShoppingCart, DollarSign, Factory, FileText, Code, Box, Users, Eye
} from 'lucide-react';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScreenSwitcher from '../../../components/ScreenSwitcher';
import { SOLUTIONS } from '../../../lib/db';

type PageParams = { slug: string };

interface PageProps {
  params: Promise<PageParams>;
}

// 17 Solutions Extended Details Mapping for high precision alignment with /services/compute layout
const EXTENDED_DETAILS: Record<string, {
  slogan: string;
  heroBadge: string;
  overviewTitle: string;
  overviewDesc: string;
  overviewCards: { title: string; desc: string; icon: any }[];
  componentsTitle: string;
  componentsGroups: {
    title: string;
    items: { name: string; desc: string; details: string[]; icon: any; link: string }[];
  }[];
  advantages: { title: string; desc: string; icon: any }[];
  useCases: { num: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}> = {
  "backup-dr": {
    slogan: "Bảo vệ dữ liệu tối mật · Duy trì kinh doanh liên tục",
    heroBadge: "HẠ TẦNG & CLOUD · BACKUP & DISASTER RECOVERY",
    overviewTitle: "Hệ thống bảo vệ dữ liệu toàn vẹn, đa vùng độc lập",
    overviewDesc: "Duy trì hoạt động kinh doanh vững vàng trước mọi sự cố hư hỏng phần cứng, thảm họa thiên tai hay các cuộc tấn công mã hóa dữ liệu ransomware tống tiền.",
    overviewCards: [
      { title: "Sao lưu tự động BaaS", desc: "Tự động sao lưu dữ liệu máy chủ lên Cloud Object Storage đa vùng khả dụng độc lập địa lý, mã hóa AES-256 đầu cuối.", icon: Database },
      { title: "Dự phòng thảm họa DRaaS", desc: "Đồng bộ dữ liệu real-time cross-DC với cam kết RTO < 15 phút, RPO < 1 giờ, thiết lập topo Active-Active dự phòng hoàn hảo.", icon: Zap },
      { title: "Bảo mật Ransomware", desc: "Bảo mật lưu trữ Immutable Storage, ngăn chặn kẻ tấn công sửa hoặc xóa bản sao lưu, phục hồi tức thì về trạng thái an toàn.", icon: Shield }
    ],
    componentsTitle: "Các phân hệ trong giải pháp Sao lưu & Dự phòng dữ liệu",
    componentsGroups: [
      {
        title: "Các dịch vụ cốt lõi",
        items: [
          { name: "Viettel Cloud Backup (BaaS)", desc: "Sao lưu dữ liệu tự động theo lịch, quản trị tập trung qua Portal.", details: ["Mã hóa dữ liệu AES-256 an toàn tuyệt đối", "Nén và chống trùng lặp dữ liệu giúp tiết kiệm dung lượng", "Hỗ trợ đa dạng hệ điều hành, cơ sở dữ liệu và ảo hóa"], icon: Server, link: "/services/storage/viettel-cloud-backup" },
          { name: "Viettel Disaster Recovery (DRaaS)", desc: "Giải pháp dự phòng thảm họa mây kết nối tốc độ cao giữa các DC.", details: ["Khôi phục hoạt động kinh doanh (failover) tự động trong vài phút", "Đồng bộ dữ liệu thời gian thực không gây ảnh hưởng hiệu năng", "Đội ngũ kỹ sư hỗ trợ diễn tập DR định kỳ chuyên nghiệp"], icon: Zap, link: "/services/storage/viettel-cloud-disaster-recovery" }
        ]
      }
    ],
    advantages: [
      { title: "An toàn dữ liệu tuyệt đối", desc: "Hệ thống lưu trữ phân tán đa điểm, bảo đảm an toàn dữ liệu 99.999999999% không lo rủi ro phần cứng.", icon: Shield },
      { title: "RTO & RPO cam kết chặt chẽ", desc: "RTO < 15 phút, RPO < 1 giờ, tối thiểu hóa thiệt hại tài chính và gián đoạn dịch vụ khi thảm họa xảy ra.", icon: Clock },
      { title: "Tiết kiệm 50% chi phí", desc: "Không cần đầu tư xây dựng trung tâm dữ liệu dự phòng vật lý tốn kém, thanh toán linh hoạt theo dung lượng thực dùng.", icon: Calculator },
      { title: "Đường truyền chuyên dụng", desc: "Kết nối cáp quang ngầm tốc độ cao kết hợp Anycast DNS, đảm bảo đồng bộ mượt mà không độ trễ nghẽn mạng.", icon: Globe }
    ],
    useCases: [
      { num: "①", title: "Phòng chống và Khôi phục sau tấn công Ransomware", desc: "Phục hồi toàn bộ dữ liệu máy chủ và cơ sở dữ liệu về thời điểm an toàn trước khi bị mã độc xâm nhập một cách nhanh chóng." },
      { num: "②", title: "Dự phòng thảm họa cho cơ sở dữ liệu lõi tài chính", desc: "Đồng bộ liên tục cơ sở dữ liệu giao dịch tài chính sang trung tâm dữ liệu dự phòng, sẵn sàng gánh tải tức thì khi DC chính gặp sự cố." },
      { num: "③", title: "Tuân thủ quy định lưu trữ dữ liệu ngành", desc: "Lưu trữ an toàn các báo cáo, tài liệu kiểm toán, hồ sơ khách hàng dài hạn lên tới 5-10 năm với chi phí tối ưu hóa vượt trội." },
      { num: "④", title: "Diễn tập phục hồi hệ thống không gián đoạn", desc: "Thiết lập môi trường Sandbox độc lập để diễn tập phục hồi thảm họa định kỳ, bảo đảm tính sẵn sàng của quy trình vận hành thực tế." }
    ],
    faqs: [
      { q: "RTO và RPO trong giải pháp DRaaS của Viettel IDC là bao nhiêu?", a: "Viettel IDC cam kết chỉ số RTO (Thời gian phục hồi hệ thống) dưới 15 phút và RPO (Điểm khôi phục dữ liệu tối đa) dưới 1 giờ nhờ hạ tầng kết nối cáp quang chuyên dụng băng thông rộng giữa các DC." },
      { q: "Dữ liệu sao lưu có được mã hóa an toàn không?", a: "Toàn bộ dữ liệu sao lưu được mã hóa tự động từ máy chủ nguồn bằng khóa AES-256 và truyền tải qua đường truyền VPN mã hóa an toàn trước khi lưu trữ dưới dạng Immutable (không thể sửa xóa)." }
    ]
  },
  "cloud-migration": {
    slogan: "Dịch chuyển mượt mà lên Cloud · Không gián đoạn kinh doanh",
    heroBadge: "HẠ TẦNG & CLOUD · CLOUD MIGRATION",
    overviewTitle: "Chuyển đổi hạ tầng lên đám mây toàn diện",
    overviewDesc: "Đưa toàn bộ hệ thống công nghệ thông tin truyền thống từ On-Premise lên đám mây Viettel Cloud an toàn, mượt mượt, đảm bảo SLAs cao nhất.",
    overviewCards: [
      { title: "Khảo sát Assessment chuyên sâu", desc: "Đội ngũ chuyên gia tiến hành đánh giá chi tiết kiến trúc hiện tại, lập phương án dịch chuyển tối ưu chi phí.", icon: FileText },
      { title: "Replication không gián đoạn", desc: "Áp dụng các công nghệ replication dữ liệu liên tục dưới nền giúp hệ thống cũ vẫn vận hành mượt mà khi di chuyển.", icon: RefreshCw },
      { title: "Tối ưu hóa tài nguyên", desc: "Cấu hình lại kích thước tài nguyên (Right-sizing), áp dụng mô hình pay-as-you-go giúp giảm lãng phí phần cứng.", icon: Calculator }
    ],
    componentsTitle: "Hệ sinh thái hỗ trợ chuyển đổi đám mây",
    componentsGroups: [
      {
        title: "Dịch vụ và Hạ tầng mây chuyển đổi",
        items: [
          { name: "Viettel Cloud Migration Service", desc: "Dịch vụ di dời dữ liệu và ảo hóa mượt mà từ On-Premise lên mây.", details: ["Tư vấn thiết kế kiến trúc mây tối ưu hoàn toàn miễn phí", "Cam kết bảo toàn toàn vẹn dữ liệu hệ thống 100%", "Hỗ trợ kỹ thuật trực tiếp từ các chuyên gia Cloud giàu kinh nghiệm"], icon: Server, link: "/contact" }
        ]
      }
    ],
    advantages: [
      { title: "Zero Downtime thực tế", desc: "Hệ thống cũ vẫn chạy song hành mượt mà, chỉ cần một cửa sổ bảo trì rất ngắn tính bằng phút để chuyển vùng DNS.", icon: Zap },
      { title: "Bảo đảm an toàn 100%", desc: "Mã hóa dữ liệu trong quá trình truyền tải, kiểm tra tính toàn vẹn (integrity check) chặt chẽ trước khi go-live.", icon: Shield },
      { title: "Tối ưu chi phí CAPEX", desc: "Chuyển đổi hoàn toàn chi phí đầu tư phần cứng vật lý ban đầu sang chi phí vận hành OPEX linh hoạt hàng tháng.", icon: Calculator },
      { title: "Độ trễ cực thấp trong nước", desc: "Đặt tại cụm DC Rated 3 Viettel IDC, triệt tiêu hoàn toàn nỗi lo gián đoạn kết nối do sự cố cáp quang biển.", icon: Globe }
    ],
    useCases: [
      { num: "①", title: "Dịch chuyển hệ thống Core cũ lên mây", desc: "Chuyển đổi toàn bộ ứng dụng từ máy chủ vật lý hết hạn khấu hao tại văn phòng lên đám mây hiệu năng cao." },
      { num: "②", title: "Hiện đại hóa ứng dụng (Modernization)", desc: "Chuyển đổi ứng dụng dạng Monolithic cũ sang container hóa chạy trên cụm Kubernetes sau khi di trú thành công." },
      { num: "③", title: "Xây dựng mô hình Hybrid Cloud", desc: "Kết nối chặt chẽ hạ tầng Private Cloud tại chỗ của doanh nghiệp với Public Cloud của Viettel IDC phục vụ co giãn tải linh hoạt." },
      { num: "④", title: "Dịch chuyển Cơ sở dữ liệu lớn an toàn", desc: "Chuyển đổi an toàn cơ sở dữ liệu Oracle, SQL Server sang nền tảng cơ sở dữ liệu mây được quản lý toàn diện vDBS." }
    ],
    faqs: [
      { q: "Hệ thống có bị dừng hoạt động khi thực hiện chuyển đổi lên Cloud không?", a: "Chúng tôi sử dụng cơ chế Replication dữ liệu liên tục dưới nền, hệ thống gốc vẫn chạy bình thường. Chỉ cần một cửa sổ bảo trì rất ngắn (tính bằng phút) để chuyển hướng kết nối DNS sang mây mới." },
      { q: "Viettel IDC có hỗ trợ kỹ thuật trong quá trình chuyển đổi không?", a: "Có, đội ngũ Kiến trúc sư giải pháp của chúng tôi sẽ đồng hành cùng bạn từ bước khảo sát, lập thiết kế topo, thực hiện di chuyển mẫu, kiểm thử hiệu năng cho đến khi hệ thống golive hoàn tất." }
    ]
  },
  "multi-az": {
    slogan: "Hạ tầng sẵn sàng cao tối đa · Loại bỏ điểm lỗi đơn lẻ (SPOF)",
    heroBadge: "HẠ TẦNG & CLOUD · MULTI-AVAILABILITY ZONE",
    overviewTitle: "Kiến trúc phân tán đa vùng khả dụng mượt mà",
    overviewDesc: "Thiết lập hệ thống phân tán giữa 3 trung tâm dữ liệu chuẩn Rated 3 độc lập hoàn toàn về địa lý và nguồn điện, đảm bảo ứng dụng hoạt động liên tục 99.99%.",
    overviewCards: [
      { title: "Active-Active kép", desc: "Các phân hệ hoạt động song hành tại nhiều vùng, tự động cân bằng tải và chịu lỗi tức thì khi có sự cố.", icon: Layers },
      { title: "Kết nối quang siêu tốc", desc: "Đường truyền cáp quang ngầm chuyên dụng tốc độ cao giữa các DC bảo đảm độ trễ phản hồi cực thấp <1ms.", icon: Network },
      { title: "Cân bằng tải Cloud LB", desc: "Tích hợp bộ cân bằng tải phân tán (Cloud Load Balancer) tự động phát hiện lỗi và chuyển hướng thông minh.", icon: Zap }
    ],
    componentsTitle: "Thành phần kiến trúc Multi-Availability Zone",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng tích hợp",
        items: [
          { name: "Viettel Virtual Private Cloud (VPC)", desc: "Phân vùng tài nguyên mây an toàn, thiết lập topo mạng ảo hóa đa vùng.", details: ["Kết nối an toàn giữa các vùng khả dụng qua mạng cáp quang riêng", "Cấu hình tường lửa ảo hóa bảo vệ đa phòng vệ từng lớp", "Khởi tạo tài nguyên linh hoạt theo yêu cầu tải thực tế"], icon: Network, link: "/services/compute/viettel-virtual-private-cloud" }
        ]
      }
    ],
    advantages: [
      { title: "SLA 99.99% Thực tế", desc: "Đảm bảo hệ thống giao dịch của bạn luôn online ngay cả khi toàn bộ một trung tâm dữ liệu lớn gặp thảm họa mất nguồn điện.", icon: Shield },
      { title: "Độ trễ truyền tải <1ms", desc: "Mạng lưới cáp kết nối vật lý ngầm chất lượng cao, đồng bộ dữ liệu thời gian thực không làm tăng độ trễ dịch vụ.", icon: Clock },
      { title: "Tự động Failover thông minh", desc: "Hệ thống Cloud Load Balancer tự động loại bỏ node lỗi ra khỏi luồng xử lý trong dưới 5 giây mà người dùng không hề hay biết.", icon: Zap },
      { title: "Chứng chỉ Rated 3 danh giá", desc: "Toàn bộ hạ tầng đặt tại các DC chuẩn Rated 3 - TIA 942 cao nhất Việt Nam, bảo đảm an ninh vật lý tuyệt mật.", icon: Server }
    ],
    useCases: [
      { num: "①", title: "Cổng thanh toán & Core Banking trực tuyến", desc: "Bảo đảm các giao dịch chuyển tiền tài chính của khách hàng hoạt động thông suốt 24/7 không gặp lỗi gián đoạn." },
      { num: "②", title: "Cơ sở dữ liệu giao dịch thời gian thực", desc: "Thiết lập cụm Database Cluster phân tán ghi đồng bộ (Synchronous Replication) bảo đảm nhất quán dữ liệu hoàn hảo." },
      { num: "③", title: "Hệ thống đặt vé tàu xe & Sự kiện tải lớn", desc: "Cân bằng tải người dùng đồng thời, ngăn ngừa tình trạng nghẽn mạch cục bộ khi lượng mua vé tăng vọt đột biến." },
      { num: "④", title: "Ứng dụng lõi vận hành nhà máy sản xuất", desc: "Duy trì hoạt động giám sát dây chuyền lắp ráp tự động liên tục, hạn chế tối đa rủi ro dừng chuyền gây thất thoát tài chính." }
    ],
    faqs: [
      { q: "Làm thế nào để dữ liệu đồng bộ mượt mà giữa các AZ mà không bị trễ?", a: "Viettel IDC trang bị đường truyền cáp quang kết nối chuyên dụng riêng giữa các DC với độ trễ phản hồi cực thấp dưới 1ms, hỗ trợ cơ chế đồng bộ cơ sở dữ liệu thời gian thực mượt mà." },
      { q: "Hệ thống cân bằng tải (Load Balancer) phát hiện sự cố bằng cách nào?", a: "Cloud Load Balancer liên tục thực hiện các truy vấn kiểm tra sức khỏe (Health Check) tới từng máy chủ ở các AZ. Khi phát hiện một node không phản hồi, nó sẽ ngay lập tức ngắt luồng truy cập và chuyển hướng sang node an toàn." }
    ]
  },
  "iac-hub": {
    slogan: "Hạ tầng dạng mã (IaC) · Tự động hóa toàn diện vòng đời mây",
    heroBadge: "DEV, OPS & AI · VIETTEL IAC HUB",
    overviewTitle: "Tự động hóa provisioning hạ tầng mây siêu tốc",
    overviewDesc: "Quản lý tài nguyên VM, mạng, tường lửa an toàn thông qua code khai báo Terraform, Ansible playbook và quy trình GitOps hiện đại, rút ngắn thời gian khởi tạo.",
    overviewCards: [
      { title: "Provisioning trong 10 phút", desc: "Cung cấp hạ tầng phức tạp đồng loạt chỉ bằng một dòng lệnh, giảm sai sót cấu hình thủ công.", icon: Terminal },
      { title: "Hạ tầng dạng mã (IaC)", desc: "Lưu trữ cấu hình hệ thống dưới dạng file code khai báo, dễ dàng kiểm soát lịch sử thay đổi qua Git.", icon: Code },
      { title: "Templates chuẩn hóa", desc: "Cung cấp kho thư viện Terraform templates phong phú được kiểm tra bảo mật nghiêm ngặt.", icon: BookOpen }
    ],
    componentsTitle: "Kiến trúc giải pháp Viettel IaC Hub",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng cốt lõi",
        items: [
          { name: "Viettel Cloud Server", desc: "Máy chủ ảo hiệu năng cao tương thích hoàn hảo với Terraform provider chính thức.", details: ["Tự động tăng giảm cấu hình CPU/RAM thông qua IaC scripts", "Tích hợp sẵn cloud-init cấu hình hệ điều hành tự động", "Quản trị an toàn qua API bảo mật"], icon: Server, link: "/services/compute/viettel-cloud-server" }
        ]
      }
    ],
    advantages: [
      { title: "Tốc độ triển khai vượt trội", desc: "Rút ngắn thời gian khởi tạo môi trường thử nghiệm (Sandbox, Dev, Staging) từ nhiều tuần xuống dưới 10 phút.", icon: Zap },
      { title: "Loại bỏ sai lệch cấu hình", desc: "Triệt tiêu hoàn toàn lỗi Configuration Drift, bảo đảm tính đồng nhất tuyệt đối giữa môi trường Dev và Prod.", icon: Check },
      { title: "An ninh dạng mã hóa", desc: "Tự động quét lỗi an ninh cấu hình tường lửa, phân quyền IAM bằng các công cụ quét mã tự động (tfsec, tflint) trước khi chạy.", icon: Shield },
      { title: "Quản trị lịch sử thay đổi", desc: "Dễ dàng roll-back hạ tầng về trạng thái hoạt động an toàn gần nhất khi gặp sự cố, tương tự như quản lý mã nguồn phần mềm.", icon: Clock }
    ],
    useCases: [
      { num: "①", title: "Khởi dựng đồng loạt môi trường cổng dịch vụ công", desc: "Tự động hóa quy trình khởi dựng tài nguyên mây đồng loạt cho hàng chục đơn vị hành chính trực thuộc không sai sót." },
      { num: "②", title: "Triển khai luồng CI/CD hạ tầng tự động", desc: "Tự động tạo ra môi trường kiểm thử tạm thời khi có pull request mới, sau đó tự động hủy tài nguyên để tiết kiệm chi phí." },
      { num: "③", title: "Mở rộng tài nguyên đàn hồi mùa Mega Sale", desc: "Kích hoạt script tăng cấu hình máy chủ, bổ sung node Kubernetes tức thì trước giờ vàng và thu gọn lại ngay sau đó." },
      { num: "④", title: "Sao chép toàn bộ hệ thống sang vùng dự phòng", desc: "Tái tạo nhanh chóng cấu trúc mạng và máy chủ phức tạp sang vùng DC dự phòng phục vụ mục tiêu Disaster Recovery." }
    ],
    faqs: [
      { q: "Viettel IaC Hub có hỗ trợ Terraform Provider chính thức không?", a: "Có, Viettel IDC cung cấp Terraform Provider chính thức được chứng thực, giúp bạn dễ dàng khai báo và quản trị tài nguyên mây Viettel Cloud trực tiếp bằng mã nguồn." },
      { q: "Làm thế nào để kiểm soát an ninh các file cấu hình hạ tầng?", a: "Hệ thống tích hợp sẵn luồng quét tự động tfsec và tflint, rà soát toàn bộ các chính sách bảo mật, luật tường lửa, phân quyền cổng port để cảnh báo sớm rủi ro an ninh." }
    ]
  },
  "container": {
    slogan: "Microservices linh hoạt · Vận hành Kubernetes tự động hóa",
    heroBadge: "DEV, OPS & AI · CONTAINER & KUBERNETES",
    overviewTitle: "Container hóa ứng dụng, co giãn tự chủ thông minh",
    overviewDesc: "Chuyển đổi kiến trúc Monolithic cồng kềnh sang Microservices linh động chạy trên nền tảng Kubernetes được quản lý chuyên nghiệp, an toàn tuyệt đối.",
    overviewCards: [
      { title: "Kubernetes managed vK8s", desc: "Tự động hóa hoàn toàn quy trình khởi tạo, vận hành và nâng cấp Control Plane cụm Kubernetes.", icon: Layers },
      { title: "Auto-scaling linh hoạt", desc: "Tự động tăng giảm số lượng container (Pod) và worker node theo tải thực tế giúp tối ưu hóa hiệu năng.", icon: Zap },
      { title: "Bảo mật Container Registry", desc: "Kho lưu trữ Docker image riêng tư vCR, tích hợp quét mã độc tự động trước khi triển khai.", icon: Database }
    ],
    componentsTitle: "Hệ sinh thái sản phẩm Container và Kubernetes",
    componentsGroups: [
      {
        title: "Các phân hệ sản phẩm",
        items: [
          { name: "Viettel Kubernetes Service (vK8s)", desc: "Nền tảng Kubernetes managed an toàn, tương thích hoàn toàn tiêu chuẩn CNCF.", details: ["Tự động phục hồi node lỗi (Self-healing) trong dưới 10 giây", "Tích hợp sẵn Cloud Load Balancer cân bằng tải thông minh", "Giao diện quản trị Portal trực quan, dễ dàng thao tác"], icon: Box, link: "/services/compute/viettel-kubernetes" }
        ]
      }
    ],
    advantages: [
      { title: "Tối ưu hóa 50% tài nguyên", desc: "Tăng mật độ triển khai ứng dụng trên cùng một tài nguyên máy chủ vật lý, triệt tiêu lãng phí RAM/CPU nhàn rỗi.", icon: Calculator },
      { title: "Rút ngắn 90% thời gian deploy", desc: "Kết hợp luồng CI/CD triển khai rolling update mượt mà, phát hành tính năng mới không gây gián đoạn downtime.", icon: Zap },
      { title: "Bảo mật đa phòng vệ", desc: "Quét lỗ hổng an ninh Docker image tự động trực tiếp từ registry, chặn đứng các container chứa mã độc lọt vào Prod.", icon: Shield },
      { title: "Không lo phụ thuộc công nghệ", desc: "Chuẩn Kubernetes tiêu chuẩn quốc tế giúp bạn dễ dàng di chuyển ứng dụng qua lại giữa các nhà cung cấp đám mây.", icon: Globe }
    ],
    useCases: [
      { num: "①", title: "Hiện đại hóa ứng dụng thương mại điện tử", desc: "Chia tách hệ thống bán hàng thành các microservices độc lập: Giỏ hàng, Thanh toán, Khuyến mãi hoạt động mượt mà." },
      { num: "②", title: "Triển khai ứng dụng di động tải cao", desc: "Tự động tăng gấp 10 lần số lượng container xử lý chỉ trong 5 phút để đón nhận hàng triệu người dùng truy cập cùng lúc." },
      { num: "③", title: "Hạ tầng an toàn cho đội ngũ Dev phát triển", desc: "Cấp phát nhanh chóng các cụm Kubernetes thử nghiệm biệt lập cho từng dự án của lập trình viên." },
      { num: "④", title: "Hệ thống xử lý nền tác vụ dung lượng lớn", desc: "Vận hành các container xử lý ảnh, encode video chạy song hành tự động co giãn theo số lượng hàng đợi công việc." }
    ],
    faqs: [
      { q: "Viettel Kubernetes Service (vK8s) có tự động nâng cấp phiên bản không?", a: "Có, vK8s hỗ trợ cập nhật phiên bản an toàn không gây gián đoạn (Zero-downtime rolling update). Bạn có thể chọn lịch bảo trì thích hợp để hệ thống tự động cập nhật Control plane và worker nodes." },
      { q: "Tôi có thể tự mang cụm Kubernetes riêng của tôi lên Viettel Cloud Server được không?", a: "Hoàn toàn được. Tuy nhiên, sử dụng dịch vụ vK8s managed của chúng tôi sẽ giúp bạn tiết kiệm thời gian vận hành Control Plane và được tích hợp sẵn các driver lưu trữ CSI, cân bằng tải mây tự động." }
    ]
  },
  "devsecops": {
    slogan: "Pipeline an toàn tuyệt đối · Tốc độ phát hành tối đa",
    heroBadge: "DEV, OPS & AI · DEVSECOPS PIPELINE",
    overviewTitle: "Tích hợp an toàn thông tin vào mọi khâu phát triển",
    overviewDesc: "Xây dựng quy trình CI/CD tích hợp quét bảo mật tự động tĩnh (SAST), động (DAST) và rà soát lỗ hổng thư viện, bảo đảm ứng dụng an toàn trước khi golive.",
    overviewCards: [
      { title: "Pipeline CI/CD an toàn", desc: "Tự động hóa hoàn toàn các bước build, test và quét bảo mật trước khi đóng gói ứng dụng.", icon: RefreshCw },
      { title: "Quét lỗ hổng SAST/DAST", desc: "Rà soát lỗi cú pháp mã nguồn nhạy cảm và giả lập tấn công ứng dụng tự động dưới nền.", icon: Shield },
      { title: "Bảo mật nguồn mở SCA", desc: "Tự động phát hiện và cảnh báo các thư viện bên thứ ba chứa lỗ hổng bảo mật nghiêm trọng.", icon: Database }
    ],
    componentsTitle: "Kiến trúc luồng DevSecOps an toàn",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng tích hợp",
        items: [
          { name: "Viettel Kubernetes Service (vK8s)", desc: "Triển khai an toàn các container sau khi vượt qua các bước kiểm duyệt bảo mật nghiêm ngặt.", details: ["Tích hợp chính sách an ninh mạng dạng mã Policy as Code", "Tự động cập nhật bản vá bảo mật cho container dưới nền", "Giám sát an ninh container thời gian thực"], icon: Box, link: "/services/compute/viettel-kubernetes" }
        ]
      }
    ],
    advantages: [
      { title: "Phát hiện sớm 95% lỗ hổng", desc: "Tìm ra lỗi an ninh ngay trong quá trình gõ code (Shift-Left Security), tránh tốn kém sửa đổi kiến trúc ở giai đoạn cuối.", icon: Shield },
      { title: "Release nhanh gấp 3 lần", desc: "Tự động hóa hoàn toàn quy trình kiểm thử và rà duyệt bảo mật, triệt tiêu tình trạng nghẽn cổ chai duyệt thủ công.", icon: Zap },
      { title: "Bảo vệ chuỗi cung ứng phần mềm", desc: "Bảo đảm mọi Docker image, thư viện mã nguồn mở đều được kiểm duyệt sạch mã độc trước khi đưa lên Production.", icon: Lock },
      { title: "Đồng thuận liên phòng ban", desc: "Hòa hợp mục tiêu phát triển nhanh của đội ngũ Dev và yêu cầu an toàn tuyệt đối của đội ngũ Security vận hành.", icon: Check }
    ],
    useCases: [
      { num: "①", title: "Luồng phát hành ứng dụng Fintech an toàn", desc: "Tự động quét lỗ hổng OWASP Top 10 trong mã nguồn trước khi deploy ứng dụng ví điện tử thanh toán." },
      { num: "②", title: "Quản trị an toàn thư viện mã nguồn mở", desc: "Tự động phát hiện và ngăn chặn lập trình viên sử dụng các thư viện Node.js, Python đã bị lỗi thời hoặc nhiễm mã độc." },
      { num: "③", title: "Tự động hóa cấu hình chính sách bảo mật", desc: "Thiết lập các ranh giới mạng cô lập an toàn tự động cho container mỗi khi deploy ứng dụng mới." },
      { num: "④", title: "Audit log & Báo cáo an ninh tự động", desc: "Tự động xuất báo cáo chứng nhận an toàn thông tin sau mỗi phiên bản phát hành phục vụ mục tiêu kiểm toán nội bộ." }
    ],
    faqs: [
      { q: "Quét bảo mật tĩnh (SAST) và động (DAST) hoạt động như thế nào trong pipeline?", a: "SAST rà soát trực tiếp mã nguồn của bạn để tìm lỗi cú pháp nguy hiểm (như SQL Injection, Hardcoded Secrets). DAST tiến hành chạy thử ứng dụng trong môi trường Staging và giả lập các cuộc tấn công biên để tìm lỗ hổng vận hành." },
      { q: "Làm thế nào để pipeline tự động chặn deploy khi phát hiện lỗi bảo mật nghiêm trọng?", a: "Bạn có thể định nghĩa các quy tắc ngưỡng (Quality Gates). Nếu phát hiện lỗ hổng có điểm CVSS từ 7.0 trở lên, pipeline sẽ tự động báo lỗi, dừng luồng deploy và gửi cảnh báo khẩn tới nhóm phát triển." }
    ]
  },
  "monitoring-ai": {
    slogan: "APM thông suốt toàn diện · Trí tuệ nhân tạo AIOps cảnh báo sớm",
    heroBadge: "DEV, OPS & AI · APM & AIOPS SYSTEM",
    overviewTitle: "Giám sát hiệu năng ứng dụng, phân tích thông minh",
    overviewDesc: "Thu thập vết giao dịch (tracing), log và metric thời gian thực xuyên suốt hệ thống microservices. Mô hình AI tự động phát hiện bất thường và tìm ra nguyên nhân gốc rễ.",
    overviewCards: [
      { title: "Giám sát hiệu năng APM", desc: "Theo dõi trải nghiệm người dùng cuối, đo lường thời gian phản hồi giao dịch chi tiết tới từng dòng code.", icon: Activity },
      { title: "Học máy AI phân tích", desc: "Tự động thiết lập ngưỡng hiệu năng động (dynamic baseline), triệt tiêu cảnh báo giả loãng alert fatigue.", icon: Cpu },
      { title: "Tracing Microservices", desc: "Vẽ bản đồ luồng đi giao dịch xuyên suốt qua hàng trăm container độc lập, dễ dàng cô lập điểm nghẽn.", icon: Network }
    ],
    componentsTitle: "Kiến thức giải pháp Giám sát & Ứng dụng AI",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng tích hợp",
        items: [
          { name: "Viettel Cloud Watch", desc: "Cung cấp biểu đồ dashboard trực quan giám sát cấu hình RAM/CPU và băng thông máy chủ ảo.", details: ["Thiết lập cảnh báo tự động qua Email, SMS, Telegram", "Hỗ trợ thu thập log tập trung dung lượng lớn an toàn", "Báo cáo hiệu năng định kỳ thông minh"], icon: Server, link: "/services/compute/viettel-cloud-server" }
        ]
      }
    ],
    advantages: [
      { title: "Giảm 80% thời gian sửa lỗi", desc: "Rút ngắn chỉ số MTTR từ hàng giờ xuống dưới 10 phút nhờ AI chỉ ra chính xác dòng code hoặc truy vấn DB gây chậm trễ.", icon: Clock },
      { title: "Phát hiện lỗi trước người dùng", desc: "Chủ động cảnh báo các xu hướng sụt giảm hiệu năng trước khi hệ thống sập hoàn toàn gây ảnh hưởng tới khách hàng.", icon: Bell },
      { title: "Triệt tiêu Alert Fatigue", desc: "Hệ thống thông minh tự động gom nhóm các cảnh báo liên quan, chỉ gửi đi các thông báo thực sự quan trọng.", icon: Shield },
      { title: "Tối ưu hóa năng lực hệ thống", desc: "Phát hiện các tài nguyên máy chủ đang bị lãng phí hoặc cấu hình quá tay để thực hiện thu hẹp tối ưu chi phí.", icon: Calculator }
    ],
    useCases: [
      { num: "①", title: "Giám sát hệ thống ERP doanh nghiệp lớn", desc: "Đảm bảo các yêu cầu truy xuất dữ liệu kế toán, kho bãi luôn phản hồi dưới 1 giây, chủ động cảnh báo khi DB quá tải." },
      { num: "②", title: "Truy vết giao dịch ví điện tử lỗi", desc: "Tìm ra chính xác phân hệ microservices (như trừ tiền, gửi SMS, cộng điểm) bị gián đoạn khi người dùng thanh toán lỗi." },
      { num: "③", title: "Dự báo dung lượng lưu trữ cạn kiệt", desc: "Mô hình AI tự động phân tích tốc độ phình to của dữ liệu để đưa ra thời điểm chính xác cần nâng cấp đĩa cứng trước 30 ngày." },
      { num: "④", title: "Phát hiện tấn công dò quét mật khẩu", desc: "Phân tích log đăng nhập thời gian thực, chủ động khóa IP khi phát hiện tần suất đăng nhập sai tăng đột biến một cách bất thường." }
    ],
    faqs: [
      { q: "Ngưỡng cảnh báo động (Dynamic Baseline) hoạt động thế nào?", a: "AI liên tục học hỏi thói quen tải hệ thống của bạn (ví dụ: tải thường tăng cao vào 20h và thấp vào 3h sáng). Từ đó tự động điều chỉnh ngưỡng cảnh báo thích ứng, không báo động giả khi hệ thống tăng tải bình thường vào giờ cao điểm." },
      { q: "Hệ thống có gây ảnh hưởng làm chậm ứng dụng chính không?", a: "Các Agent thu thập dữ liệu được thiết kế siêu tối ưu, chỉ chiếm dụng dưới 1% CPU và RAM của máy chủ, bảo đảm không gây ra bất kỳ tác động tiêu cực nào tới trải nghiệm người dùng." }
    ]
  },
  "hpc": {
    slogan: "Siêu tính toán GPU NVIDIA · Huấn luyện mô hình AI tốc độ cực hạn",
    heroBadge: "DEV, OPS & AI · HIGH-PERFORMANCE COMPUTING",
    overviewTitle: "Hạ tầng tính toán hiệu năng cao chuyên AI & ML",
    overviewDesc: "Được trang bị các dòng GPU NVIDIA Tensor Core mạnh mẽ bậc nhất kết hợp kết nối mạng lưới Infiniband 400 Gbps, đặt tại cụm siêu DC Bình Dương làm mát bằng chất lỏng trực tiếp.",
    overviewCards: [
      { title: "GPU NVIDIA Tensor Core", desc: "Cung cấp cụm GPU NVIDIA A100 / H100 / L40S chuyên dụng cho huấn luyện mô hình ngôn ngữ lớn LLM.", icon: Cpu },
      { title: "Kết nối Infiniband 400G", desc: "Đường truyền truyền dẫn dữ liệu siêu tốc độ, triệt tiêu hoàn toàn nghẽn cổ chai băng thông truyền tải dữ liệu.", icon: Network },
      { title: "Làm mát bằng chất lỏng", desc: "Hạ tầng siêu phòng máy hiện đại, đảm bảo hiệu suất vận hành liên tục 100% công suất chip AI.", icon: Server }
    ],
    componentsTitle: "Kiến trúc hạ tầng tính toán siêu hiệu năng HPC",
    componentsGroups: [
      {
        title: "Máy chủ GPU chuyên dụng",
        items: [
          { name: "Viettel Cloud GPU", desc: "Cho thuê máy chủ tăng tốc tính toán đồ họa chuyên sâu với cấu hình linh động.", details: ["Card tăng tốc NVIDIA Tensor Core mạnh mẽ bậc nhất", "Hỗ trợ đầy đủ thư viện tối ưu hóa AI hàng đầu như CUDA, PyTorch, TensorFlow", "Cam kết SLAs uptime máy chủ đạt 99.99%"], icon: Cpu, link: "/services/compute/viettel-cloud-gpu" }
        ]
      }
    ],
    advantages: [
      { title: "Rút ngắn 15 lần thời gian training", desc: "Đưa thời gian huấn luyện mô hình AI phức tạp từ hàng tháng xuống còn vài mươi giờ trên cụm siêu máy tính mây.", icon: Zap },
      { title: "Hạ tầng phòng máy hiện đại", desc: "Đáp ứng đầy đủ nguồn điện công suất lớn và giải pháp làm mát chất lỏng trực tiếp tân tiến hàng đầu khu vực.", icon: Server },
      { title: "Chi phí linh hoạt pay-as-you-go", desc: "Không cần chi hàng triệu USD đầu tư thiết bị ban đầu, dễ dàng thuê và nâng cấp cấu hình theo tiến độ dự án.", icon: Calculator },
      { title: "Bảo mật dữ liệu tối cao", desc: "Hạ tầng đặt 100% trong nước, bảo đảm chủ quyền dữ liệu và tuân thủ nghiêm ngặt quy định bảo mật thông tin.", icon: Shield }
    ],
    useCases: [
      { num: "①", title: "Huấn luyện Mô hình Ngôn ngữ tiếng Việt (LLM)", desc: "Xây dựng các trợ lý AI thông minh, chatbot tự động phân tích và thấu hiểu ngôn ngữ tiếng Việt bản địa sâu sắc." },
      { num: "②", title: "Xử lý Thị giác máy tính nhận diện camera", desc: "Phân tích hàng ngàn luồng camera giám sát giao thông thời gian thực để nhận diện biển số, phát hiện vi phạm tự động." },
      { num: "③", title: "Mô phỏng 3D & Kết xuất đồ họa điện ảnh", desc: "Thực hiện các tác vụ dựng hình, kết xuất hiệu ứng kỹ xảo 3D kiến trúc phức tạp tốn tài nguyên tính toán lớn." },
      { num: "④", title: "Phân tích cấu trúc Gene & Nghiên cứu sinh học", desc: "Xử lý các mô hình giả lập chuỗi xoắn gene DNA, hỗ trợ nghiên cứu bào chế dược phẩm y khoa thế hệ mới." }
    ],
    faqs: [
      { q: "Tôi có được toàn quyền truy cập ở cấp độ Root vào máy chủ GPU không?", a: "Có, bạn hoàn toàn sở hữu đặc quyền truy cập Root (SSH) cao nhất vào máy chủ bare metal GPU để cài đặt các phiên bản driver, thư viện tính toán và phần mềm chuyên dụng theo nhu cầu." },
      { q: "Mạng lưới kết nối Infiniband đem lại lợi ích gì cho việc huấn luyện AI?", a: "Infiniband cung cấp đường truyền băng thông siêu rộng 400 Gbps với độ trễ truyền dữ liệu cực thấp cấp độ micro-second, giúp các card GPU trao đổi tham số mô hình (All-Reduce) cực nhanh khi huấn luyện phân tán đa máy chủ." }
    ]
  },
  "cdn": {
    slogan: "Tăng tốc website · Phân phối nội dung mượt mà toàn quốc",
    heroBadge: "KẾT NỐI & WORKSPACE · CONTENT DELIVERY NETWORK",
    overviewTitle: "Mạng biên phân phối nội dung dung lượng cực lớn",
    overviewDesc: "Hệ thống POP CDN phủ rộng khắp 63 tỉnh thành đặt trực tiếp tại các điểm nút viễn thông xương sống của Viettel, giúp tăng tốc website và truyền phát video HD không gián đoạn.",
    overviewCards: [
      { title: "Hệ thống POP 63 tỉnh thành", desc: "Mạng lưới máy chủ biên phủ rộng khắp đất nước, tiếp cận người dùng cuối với khoảng cách vật lý ngắn nhất.", icon: Globe },
      { title: "Tự động nén tối ưu ảnh", desc: "Tối ưu hóa định dạng hình ảnh tự động, giúp tăng 50% tốc độ tải trang web và tiết kiệm băng thông.", icon: Settings },
      { title: "Bảo vệ DDoS biên an toàn", desc: "Chặn đứng các cuộc tấn công DDoS ứng dụng độc hại ngay tại lớp biên mạng phân phối trước khi tới máy chủ gốc.", icon: Shield }
    ],
    componentsTitle: "Các thành phần dịch vụ CDN thế hệ mới",
    componentsGroups: [
      {
        title: "Dịch vụ phân phối nội dung",
        items: [
          { name: "Viettel Media CDN", desc: "Dịch vụ tăng tốc truyền phát video livestreaming và nội dung tĩnh website.", details: ["Hỗ trợ các giao thức truyền phát hiện đại HLS, DASH, RTMP", "Tỷ lệ lưu bộ đệm (Cache Hit Rate) thực tế vượt trội đạt trên 95%", "Cấu hình dễ dàng qua giao diện Portal trực quan"], icon: Network, link: "/services/networking/viettel-media-cdn" }
        ]
      }
    ],
    advantages: [
      { title: "Tải trang dưới 1 giây", desc: "Nâng cao trải nghiệm người dùng cuối rõ rệt, thúc đẩy tỷ lệ chuyển đổi đơn hàng và tăng thứ hạng SEO Google.", icon: Zap },
      { title: "Giảm 90% tải máy chủ gốc", desc: "Giải phóng băng thông máy chủ gốc khỏi các yêu cầu tải file tĩnh nặng (hình ảnh, CSS, JS), tránh sập hệ thống.", icon: Server },
      { title: "Chịu tải hàng triệu CCU", desc: "Sẵn sàng đón nhận lưu lượng truy cập khổng lồ đột biến trong các đợt mở bán Mega Sale hoặc livestream sự kiện cực hot.", icon: Users },
      { title: "Tiết kiệm chi phí truyền dẫn", desc: "Miễn phí hoàn toàn 100% dung lượng Data Transfer từ máy chủ mây Viettel Cloud ra biên hệ thống CDN.", icon: Calculator }
    ],
    useCases: [
      { num: "①", title: "Livestream sự kiện thể thao chất lượng HD", desc: "Truyền phát mượt mà các trận đấu bóng đá đỉnh cao cho hàng triệu người xem đồng thời không gián đoạn giật lag." },
      { num: "②", title: "Tăng tốc website Thương mại điện tử", desc: "Đảm bảo trang danh sách sản phẩm với hàng vạn hình ảnh chất lượng cao luôn tải mượt mà dưới 1 giây." },
      { num: "③", title: "Phân phối bản cập nhật game dung lượng lớn", desc: "Hỗ trợ hàng triệu lượt tải file cài đặt game nặng đồng thời với tốc độ tải tối đa băng thông đường truyền nhà mạng." },
      { num: "④", title: "Tăng tốc hệ thống học trực tuyến EdTech", desc: "Truyền tải các video bài giảng chất lượng cao mượt mà tới học sinh ở mọi vùng sâu vùng xa trên toàn quốc." }
    ],
    faqs: [
      { q: "Làm cách nào để xóa bộ nhớ đệm (Purge Cache) khi tôi cập nhật file mới?", a: "Bạn có thể thực hiện xóa bộ nhớ đệm (Purge Cache) tức thì cho một file cụ thể hoặc toàn bộ thư mục trực tiếp trên Portal quản trị hoặc thông qua API tự động trong dưới 2 giây." },
      { q: "Hệ thống CDN của Viettel IDC có hỗ trợ giao thức HTTPS không?", a: "Có, hệ thống hỗ trợ đầy đủ giao thức HTTPS bảo mật cao, cho phép bạn tự tải lên chứng chỉ SSL riêng biệt hoặc khởi tạo chứng chỉ SSL miễn phí tự động gia hạn." }
    ]
  },
  "mobile-work": {
    slogan: "Văn phòng số an toàn · Làm việc linh hoạt mọi lúc mọi nơi",
    heroBadge: "KẾT NỐI & WORKSPACE · DIGITAL WORKPLACE",
    overviewTitle: "Môi trường làm việc ảo bảo mật thông tin tuyệt đối",
    overviewDesc: "Hợp nhất giải pháp máy tính ảo Cloud PC hiệu năng cao đặt tại IDC bảo mật vật lý vòng ngoài và bộ công cụ cộng tác trực tuyến Microsoft 365 bản quyền.",
    overviewCards: [
      { title: "Máy tính ảo Viettel Cloud PC", desc: "Dữ liệu lưu trữ tập trung hoàn toàn tại IDC, loại bỏ hoàn toàn rủi ro rò rỉ thông tin ra thiết bị cá nhân.", icon: Laptop },
      { title: "Cộng tác Microsoft 365", desc: "Tích hợp sẵn Exchange Email, Teams, OneDrive dung lượng lớn, kết nối đồng bộ mượt mà.", icon: Monitor },
      { title: "Quản trị chính sách IT tập trung", desc: "IT admin dễ dàng cấp phát, thu hồi tài nguyên máy tính ảo cho nhân viên chỉ trong 5 phút.", icon: Settings }
    ],
    componentsTitle: "Phân hệ giải pháp Văn phòng số di động",
    componentsGroups: [
      {
        title: "Dịch vụ không gian làm việc số",
        items: [
          { name: "Viettel Cloud PC", desc: "Dịch vụ cho thuê máy tính để bàn ảo hóa bảo mật, truy cập mượt mà từ mọi thiết bị.", details: ["Chặn đứng các hành vi chụp màn hình, cắm USB copy dữ liệu ra ngoài", "Vận hành ổn định trên mọi nền tảng Windows, macOS, Android, iOS", "Tiết kiệm chi phí đầu tư mua sắm nâng cấp phần cứng máy tính vật lý"], icon: Laptop, link: "/services/digital-services/viettel-cloud-pc" }
        ]
      }
    ],
    advantages: [
      { title: "Bảo mật dữ liệu tuyệt đối", desc: "Dữ liệu kinh doanh không bao giờ nằm trên thiết bị cá nhân của nhân viên, triệt tiêu nguy cơ rò rỉ khi mất máy.", icon: Shield },
      { title: "Cấp phát tài nguyên tức thì", desc: "Dễ dàng tạo mới 100 máy tính làm việc ảo cấu hình chuẩn cho nhân viên thuê ngoài (outsource) chỉ trong vài phút.", icon: Zap },
      { title: "Giảm 40% chi phí IT vận hành", desc: "Không cần đội ngũ IT túc trực sửa lỗi phần cứng tại chỗ, quản trị và hỗ trợ từ xa tập trung thông qua Portal.", icon: Calculator },
      { title: "Làm việc thông suốt mọi nơi", desc: "Nhân viên tự do làm việc tại nhà, quán cafe hay khi đi công tác với trải nghiệm mượt mà như tại văn phòng.", icon: Globe }
    ],
    useCases: [
      { num: "①", title: "Môi trường làm việc an toàn cho CTV outsource", desc: "Cấp máy tính ảo chặn copy-paste dữ liệu ra ngoài cho nhân sự thuê ngoài viết code hoặc nhập liệu dữ liệu nhạy cảm." },
      { num: "②", title: "Hạ tầng văn phòng số cho chuỗi chi nhánh", desc: "Đồng bộ hóa môi trường làm việc và phần mềm kế toán, bán hàng cho hàng trăm cửa hàng bán lẻ trên toàn quốc." },
      { num: "③", title: "Trung tâm chăm sóc khách hàng Call Center", desc: "Vận hành hệ thống tổng đài ảo trên Cloud PC mượt mà, ghi âm cuộc gọi tập trung bảo đảm chất lượng dịch vụ." },
      { num: "④", title: "Môi trường nghiên cứu R&D tuyệt mật", desc: "Cách ly hoàn toàn các dự án nghiên cứu công nghệ, công thức sản phẩm mới khỏi nguy cơ rò rỉ ra mạng internet." }
    ],
    faqs: [
      { q: "Tôi có thể truy cập Cloud PC từ thiết bị cá nhân của tôi được không?", a: "Hoàn toàn được. Bạn có thể kết nối an toàn vào máy tính ảo của mình từ bất kỳ thiết bị nào (như laptop cũ, máy tính bảng, điện thoại di động) thông qua giao thức kết nối bảo mật RDP/HTML5 mượt mà." },
      { q: "Làm thế nào để chặn nhân viên sao chép dữ liệu của công ty ra ngoài?", a: "IT Admin có thể thiết lập chính sách khóa an ninh chặt chẽ trên Portal: Chặn tính năng copy-paste giữa máy ảo và máy thật, khóa cổng USB, chặn in ấn và chặn chụp ảnh màn hình ứng dụng." }
    ]
  },
  "website": {
    slogan: "Web Hosting SSD siêu tốc · Tên miền & SSL tin cậy",
    heroBadge: "KẾT NỐI & WORKSPACE · WEB HOSTING SOLUTION",
    overviewTitle: "Giải pháp khởi dựng website doanh nghiệp trọn bộ",
    overviewDesc: "Gói giải pháp toàn diện bao gồm Hosting sử dụng 100% ổ cứng SSD Enterprise tốc độ cao, hệ thống Anycast DNS toàn cầu và chứng chỉ bảo mật SSL tin cậy.",
    overviewCards: [
      { title: "Hosting SSD Enterprise siêu tốc", desc: "Máy chủ Hosting trang bị vi xử lý Intel Xeon thế hệ mới kết hợp ổ cứng SSD, tăng gấp 3 tốc độ phản hồi web.", icon: HardDrive },
      { title: "Chứng chỉ bảo mật SSL miễn phí", desc: "Tự động tích hợp và gia hạn chứng chỉ SSL bảo mật, nâng cao uy tín thương hiệu và điểm SEO.", icon: Lock },
      { title: "Anycast DNS độ trễ dưới 10ms", desc: "Hệ thống phân giải tên miền phân tán đa điểm, tăng tốc truy cập website tức thì.", icon: Globe }
    ],
    componentsTitle: "Các phân hệ sản phẩm trong gói giải pháp Website",
    componentsGroups: [
      {
        title: "Dịch vụ lưu trữ & Tên miền",
        items: [
          { name: "Viettel Web Hosting", desc: "Dịch vụ lưu trữ mã nguồn website ổn định, bảo mật cao, hỗ trợ nhiều phiên bản PHP.", details: ["Tự động sao lưu dữ liệu hàng ngày (Daily Backup) an toàn", "Công nghệ máy chủ web LiteSpeed tăng tốc xử lý trang gấp nhiều lần", "Hệ thống bảo mật chặn quét malware tự động thời gian thực"], icon: Server, link: "/services/domain-hosting-email/viettel-web-hosting" }
        ]
      }
    ],
    advantages: [
      { title: "Tốc độ tải trang vượt trội", desc: "Tối ưu hóa sâu cấu hình máy chủ web và hạ tầng lưu trữ SSD giúp trang web luôn tải mượt mà dưới 1.2 giây.", icon: Zap },
      { title: "Bảo đảm Uptime 99.9%", desc: "Hệ thống máy chủ lưu trữ cấu hình HA dự phòng, tự động chuyển đổi chịu lỗi khi có sự cố phần cứng xảy ra.", icon: Shield },
      { title: "Quản trị dễ dàng trực quan", desc: "Trang bị bảng điều khiển cPanel/DirectAdmin tiếng Việt thân thiện, dễ dàng khởi dựng cơ sở dữ liệu và quản lý file.", icon: Settings },
      { title: "Hỗ trợ kỹ thuật 24/7/365", desc: "Đội ngũ kỹ sư hỗ trợ chuyên nghiệp túc trực liên tục qua Hotline và ticket, xử lý nhanh chóng mọi vấn đề kỹ thuật phát sinh.", icon: Phone }
    ],
    useCases: [
      { num: "①", title: "Website giới thiệu thương hiệu doanh nghiệp", desc: "Xây dựng trang web giới thiệu năng lực công ty, danh mục dịch vụ hoạt động ổn định và tin cậy cao." },
      { num: "②", title: "Trang tin tức & Tạp chí trực tuyến", desc: "Hosting chịu tải tốt, phân phối mượt mà hàng ngàn bài viết hình ảnh tới độc giả truy cập hàng ngày." },
      { num: "③", title: "Landing page quảng cáo chiến dịch", desc: "Khởi tạo nhanh chóng các trang đích bán hàng tải nhanh, tối ưu hóa điểm chất lượng quảng cáo Google/Facebook." },
      { num: "④", title: "Gian hàng thương mại điện tử vừa và nhỏ", desc: "Vận hành gian hàng bán sỉ trực tuyến sử dụng WooCommerce ổn định, tích hợp thanh toán bảo mật SSL." }
    ],
    faqs: [
      { q: "Website của tôi có tự động được sao lưu dự phòng không?", a: "Có, hệ thống tự động thực hiện sao lưu toàn bộ dữ liệu mã nguồn và cơ sở dữ liệu website hàng ngày (Daily Backup) và lưu trữ biệt lập an toàn. Bạn có thể tự khôi phục dữ liệu bất cứ lúc nào qua Portal." },
      { q: "Tôi có được hỗ trợ cài đặt mã nguồn WordPress tự động không?", a: "Có, bảng điều khiển Hosting tích hợp sẵn bộ cài đặt Softaculous, cho phép bạn tự động cài đặt WordPress và hàng trăm mã nguồn mở phổ biến khác chỉ bằng một cú click chuột." }
    ]
  },
  "fintech": {
    slogan: "Chuẩn bảo mật thanh toán PCI DSS · Đám mây tài chính dùng riêng",
    heroBadge: "GIẢI PHÁP THEO NGÀNH · FINTECH & BANKING CLOUD",
    overviewTitle: "Hạ tầng mây chuyên biệt cho ngành Tài chính - Ngân hàng",
    overviewDesc: "Đạt chứng chỉ uy tín PCI DSS Level 1 v4.0 bảo mật tối đa toàn cầu và tuân thủ nghiêm ngặt Thông tư 09/2020/TT-NHNN của Ngân hàng Nhà nước Việt Nam.",
    overviewCards: [
      { title: "Đạt chuẩn PCI DSS v4.0", desc: "Chứng chỉ bảo mật thông tin thanh toán thẻ cao nhất toàn cầu, bảo vệ an toàn mọi giao dịch tài chính số.", icon: Shield },
      { title: "Private Cloud cô lập vật lý", desc: "Phân vùng mây dùng riêng biệt lập hoàn toàn ở cấp độ phần cứng máy chủ và mạng viễn thông.", icon: Lock },
      { title: "Giám sát an ninh SOC 24/7", desc: "Hệ thống giám sát an ninh mạng SIEM thời gian thực chủ động phát hiện sớm và chặn đứng mã độc APT.", icon: Eye }
    ],
    componentsTitle: "Kiến trúc giải pháp mây Tài chính - Ngân hàng",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng biệt lập",
        items: [
          { name: "Viettel Dedicated Private Cloud", desc: "Private cloud chuyên biệt, cam kết 100% tài nguyên vật lý Dell/Cisco chính hãng không chia sẻ.", details: ["Thiết kế may đo chuẩn xác theo yêu cầu kiến trúc Core Banking", "Tích hợp sẵn tường lửa cứng và thiết bị mã hóa chuyên dụng HSM", " SLAs cam kết sẵn sàng hoạt động tối đa đạt 99.99%"], icon: Server, link: "/services/compute/viettel-dedicated-private-cloud" }
        ]
      }
    ],
    advantages: [
      { title: "Tuân thủ pháp lý 100%", desc: "Đáp ứng hoàn hảo các yêu cầu kiểm toán khắt khe nhất của Ngân hàng Nhà nước Việt Nam và Luật An ninh mạng.", icon: Check },
      { title: "An ninh 6 lớp tuyệt mật", desc: "Hạ tầng phòng máy đặt tại trung tâm dữ liệu chuẩn Rated 3 với quy trình kiểm soát an ninh vật lý vòng ngoài nghiêm mật.", icon: Shield },
      { title: "Khả năng co giãn đàn hồi", desc: "Hỗ trợ mở rộng tài nguyên mây tức thời để đáp ứng các đợt bùng nổ giao dịch trực tuyến ngày lễ tết.", icon: Zap },
      { title: "Kết nối trực tiếp tốc độ cao", desc: "Đường truyền Leased Line riêng biệt nối thẳng từ IDC tới văn phòng ngân hàng với cam kết băng thông tốc độ cao.", icon: Network }
    ],
    useCases: [
      { num: "①", title: "Hạ tầng mây cho Core Banking thế hệ mới", desc: "Triển khai hệ thống cơ sở dữ liệu giao dịch cốt lõi của ngân hàng trên phân vùng đám mây an toàn an ninh tuyệt đối." },
      { num: "②", title: "Cổng thanh toán & Ví điện tử trực tuyến", desc: "Vận hành hệ thống xử lý giao dịch thẻ thanh toán trực tuyến đạt chứng chỉ bảo mật quốc tế PCI-DSS nghiêm ngặt." },
      { num: "③", title: "Hệ thống chấm điểm tín dụng AI (Credit Scoring)", desc: "Ứng dụng máy chủ GPU hiệu năng cao để phân tích hành vi lịch sử tín dụng, chấm điểm rủi ro hồ sơ vay tự động." },
      { num: "④", title: "Ứng dụng Ngân hàng di động (Mobile Banking)", desc: "Đảm bảo ứng dụng Mobile Banking của hàng triệu khách hàng luôn phản hồi mượt mà dưới 500ms không nghẽn mạch." }
    ],
    faqs: [
      { q: "Hạ tầng Viettel IDC đáp ứng quy định nào của Ngân hàng Nhà nước?", a: "Hạ tầng của chúng tôi tuân thủ đầy đủ Thông tư 09/2020/TT-NHNN về an toàn hệ thống thông tin ngành ngân hàng và Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân nhạy cảm." },
      { q: "Tôi có thể thuê riêng tủ Rack vật lý biệt lập trong phòng máy được không?", a: "Hoàn toàn được. Viettel IDC cung cấp giải pháp Colocation cho thuê không gian lồng Cage biệt lập hoặc phòng Suite riêng, kết hợp camera an ninh AI góc quét riêng phục vụ nhu cầu của bạn." }
    ]
  },
  "ecommerce": {
    slogan: "Auto Scaling co giãn tự động · Phân phối ảnh sản phẩm CDN siêu tốc",
    heroBadge: "GIẢI PHÁP THEO NGÀNH · RETAIL & E-COMMERCE CLOUD",
    overviewTitle: "Hạ tầng đám mây bứt phá doanh số Mega Sale",
    overviewDesc: "Sử dụng cụm Kubernetes tự động co giãn container linh hoạt theo lượng truy cập thời gian thực kết hợp mạng phân phối nội dung CDN tăng tốc website tải sản phẩm mượt mà.",
    overviewCards: [
      { title: "Auto Scaling co giãn tự động", desc: "Tự động tăng gấp 50 lần số lượng container xử lý chỉ trong 5 phút khi có bão truy cập giờ vàng flash-sale.", icon: Zap },
      { title: "Tốc độ tải ảnh CDN biên", desc: "Lưu cache toàn bộ hình ảnh sản phẩm tại các nút biên CDN sát khách hàng nhất, thời gian tải trang dưới 0.5s.", icon: Globe },
      { title: "DB Cache Redis vCAS tốc độ cao", desc: "In-memory caching managed giảm tải trực tiếp cho cơ sở dữ liệu lõi, triệt tiêu nguy cơ sập trang giỏ hàng.", icon: Database }
    ],
    componentsTitle: "Giải pháp đám mây tối ưu Thương mại điện tử",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng co giãn",
        items: [
          { name: "Viettel Kubernetes Service (vK8s)", desc: "Quản trị container tự động, co giãn worker nodes linh hoạt theo tải người dùng thực tế.", details: ["Tự động tăng giảm tài nguyên chuẩn xác giúp tối ưu hóa chi phí mây", "Tích hợp sẵn Cloud Load Balancer phân luồng tải thông minh", "Deploy phiên bản ứng dụng mới không gây downtime gián đoạn"], icon: Box, link: "/services/compute/viettel-kubernetes" }
        ]
      }
    ],
    advantages: [
      { title: "Không lo sập mạng giờ vàng", desc: "Hạ tầng co giãn tự động thông minh gánh tải hàng triệu người dùng đồng thời, bảo vệ tỷ lệ chuyển đổi đơn hàng.", icon: Shield },
      { title: "Tiết kiệm 60% chi phí hạ tầng", desc: "Chỉ chi trả tiền cho lượng tài nguyên máy chủ thực dùng trong giờ sale, tự động thu nhỏ cấu hình về mức tối thiểu vào ban đêm.", icon: Calculator },
      { title: "Tốc độ phản hồi cực mượt", desc: "Kết hợp tối ưu hóa hình ảnh CDN và bộ nhớ đệm cơ sở dữ liệu, đảm bảo trải nghiệm mua sắm mượt mà không độ trễ.", icon: Zap },
      { title: "Bảo mật thông tin thẻ giao dịch", desc: "Hạ tầng hỗ trợ tích hợp tiêu chuẩn an toàn dữ liệu thẻ thanh toán, phòng chống đánh cắp thông tin tài khoản khách hàng.", icon: Lock }
    ],
    useCases: [
      { num: "①", title: "Chiến dịch siêu khuyến mãi Flash Sale", desc: "Tự động co giãn tài nguyên mây đáp ứng lượng truy cập tăng vọt đột biến gấp hàng trăm lần bình thường trong thời gian cực ngắn." },
      { num: "②", title: "Trang web giới thiệu sản phẩm nhiều hình ảnh", desc: "Tăng tốc tải trang danh mục sản phẩm chứa hàng vạn hình ảnh chất lượng cao mượt mà nhờ mạng lưới phân phối biên CDN." },
      { num: "③", title: "Hệ thống quản lý giỏ hàng & Đơn hàng lõi", desc: "Đảm bảo quy trình thêm sản phẩm vào giỏ và thanh toán luôn diễn ra trơn tru, không xảy ra lỗi bất nhất dữ liệu kho." },
      { num: "④", title: "Hệ thống Chatbot AI tư vấn khách hàng", desc: "Vận hành các mô hình AI suy luận trên máy chủ GPU giúp tư vấn sản phẩm và giải đáp thắc mắc khách hàng tự động 24/7." }
    ],
    faqs: [
      { q: "Hệ thống Auto Scaling mất bao lâu để kích hoạt thêm máy chủ mới?", a: "Cơ chế co giãn tự động của cụm vK8s có khả năng phát hiện tăng tải và nhân bản thêm container (Pod) mới chỉ trong dưới 15 giây, và tự động bổ sung thêm máy chủ ảo Worker Node trong dưới 3 phút." },
      { q: "Làm thế nào để bảo vệ website bán hàng khỏi bị tấn công DDoS đối thủ?", a: "Hệ thống tích hợp sẵn giải pháp Viettel CWAF (Web App Firewall) và Anti-DDoS lớp biên, tự động lọc sạch các truy cập độc hại giả mạo, bảo đảm website luôn online thông suốt." }
    ]
  },
  "healthtech": {
    slogan: "Lưu trữ hình ảnh PACS không giới hạn · Bảo mật hồ sơ bệnh án điện tử (EHR)",
    heroBadge: "GIẢI PHÁP THEO NGÀNH · HEALTHTECH & PACS CLOUD",
    overviewTitle: "Hạ tầng số hiện đại hóa ngành Y tế & Bệnh viện",
    overviewDesc: "Giải pháp lưu trữ đối tượng dung lượng lớn tối ưu cho hình ảnh y khoa PACS, truyền tải siêu tốc độ dưới 2 giây và bảo mật dữ liệu theo quy chuẩn Bộ Y tế.",
    overviewCards: [
      { title: "Lưu trữ PACS không giới hạn", desc: "Lưu trữ đối tượng Object Storage S3-compatible dung lượng khổng lồ với chi phí cực kỳ tối ưu.", icon: HardDrive },
      { title: "Truyền phim chụp dưới 2 giây", desc: "Đường truyền chuyên dụng tốc độ cao giúp truyền tải hình ảnh phim chụp DICOM sắc nét tới bác sĩ tức thì.", icon: Network },
      { title: "Bảo mật hồ sơ EHR tuyệt mật", desc: "Hạ tầng mây cách ly vật lý hoàn toàn, tuân thủ chặt chẽ các luật an toàn thông tin bệnh án Bộ Y tế.", icon: Shield }
    ],
    componentsTitle: "Kiến trúc số hóa dữ liệu Y khoa",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng tích hợp",
        items: [
          { name: "Viettel Cloud Object Storage", desc: "Lưu trữ đối tượng an toàn, không giới hạn dung lượng phình to của phim chụp X-quang, MRI, CT.", details: ["Truy xuất dữ liệu siêu tốc thông qua giao thức S3 tiêu chuẩn", "Cơ chế sao lưu đa vùng chống rủi ro hỏng hóc phần cứng vật lý", "Chi phí lưu trữ tối ưu hóa vượt trội so với ổ cứng SAN vật lý"], icon: HardDrive, link: "/services/storage/viettel-cloud-object-storage" }
        ]
      }
    ],
    advantages: [
      { title: "Chẩn đoán hình ảnh tức thì", desc: "Rút ngắn thời gian bác sĩ chờ đợi tải phim chụp y khoa từ vài phút xuống còn dưới 2 giây, nâng cao hiệu quả khám chữa bệnh.", icon: Zap },
      { title: "Bảo đảm toàn vẹn dữ liệu y tế", desc: "Cơ chế sao lưu dự phòng tự động liên tục bảo vệ bệnh án lịch sử của bệnh nhân an toàn qua nhiều năm.", icon: Shield },
      { title: "Tuân thủ quy chuẩn Bộ Y tế", desc: "Hệ thống đáp ứng đầy đủ bộ tiêu chí an toàn thông tin y tế của Bộ và các tiêu chuẩn bảo mật hồ sơ EHR quốc tế.", icon: Check },
      { title: "Hội chẩn từ xa không khoảng cách", desc: "Dễ dàng liên thông kết nối phim chụp y khoa DICOM an toàn giữa các bệnh viện tuyến dưới và tuyến trung ương.", icon: Globe }
    ],
    useCases: [
      { num: "①", title: "Hệ thống PACS lưu trữ phim chụp y khoa mây", desc: "Số hóa toàn bộ quy trình lưu trữ hình ảnh phim chụp X-quang, CT, MRI lên mây giúp bệnh viện loại bỏ hoàn toàn việc in phim nhựa tốn kém." },
      { num: "②", title: "Hệ thống Hồ sơ bệnh án điện tử (EHR/EMR)", desc: "Vận hành cơ sở dữ liệu bệnh án điện tử an toàn, bảo mật thông tin cá nhân bệnh nhân tuyệt đối theo luật định." },
      { num: "③", title: "Nền tảng hội chẩn y khoa từ xa (Telehealth)", desc: "Truyền phát trực tiếp hình ảnh nội soi, siêu âm chất lượng HD thời gian thực hỗ trợ chuyên gia tuyến trên cố vấn phẫu thuật." },
      { num: "④", title: "Ứng dụng AI hỗ trợ chẩn đoán hình ảnh", desc: "Sử dụng máy chủ GPU hiệu năng cao để chạy các mô hình AI phân tích tự động phát hiện sớm tổn thương, khối u trên phim X-quang." }
    ],
    faqs: [
      { q: "Chi phí lưu trữ hình ảnh PACS trên đám mây có đắt hơn lưu trữ tại chỗ không?", a: "Ngược lại, lưu trữ Object Storage của Viettel IDC giúp bệnh viện tiết kiệm tới 40% chi phí so với đầu tư hệ thống tủ đĩa SAN đắt đỏ tại chỗ, không lo chi phí bảo trì phần cứng vật lý hàng năm." },
      { q: "Làm thế nào để bảo mật thông tin hồ sơ bệnh án nhạy cảm của bệnh nhân?", a: "Toàn bộ dữ liệu hồ sơ bệnh án điện tử EHR được mã hóa tự động ở trạng thái lưu trữ (Encryption at Rest) và truyền tải (Encryption in Transit), phân quyền truy cập IAM nghiêm ngặt tới từng tài khoản bác sĩ." }
    ]
  },
  "edtech": {
    slogan: "Livestream lớp học HD mượt mà · Chịu tải đồng thời triệu học sinh",
    heroBadge: "GIẢI PHÁP THEO NGÀNH · EDTECH & LMS CLOUD",
    overviewTitle: "Hạ tầng số nâng bước tri thức Việt trực tuyến",
    overviewDesc: "Hệ thống truyền phát bài giảng Live-class trực tuyến không độ trễ nghẽn mạng và nền tảng quản lý học tập (LMS) chịu tải cực lớn.",
    overviewCards: [
      { title: "Livestream Live-class HD mượt", desc: "Truyền dẫn video qua mạng biên CDN tối ưu hóa cho livestreaming chất lượng HD mượt mà không giật lag.", icon: Monitor },
      { title: "Chịu tải thi trắc nghiệm lớn", desc: "Máy chủ mây cấu hình mạnh mẽ gánh tải hàng triệu truy vấn nộp bài thi trắc nghiệm đồng thời cùng một giây.", icon: Server },
      { title: "Mã hóa bảo vệ bản quyền DRM", desc: "Mã hóa chống tải xuống trái phép video bài giảng bằng giải pháp bảo vệ DRM bản quyền số chuyên nghiệp.", icon: Lock }
    ],
    componentsTitle: "Giải pháp đám mây chuyên sâu cho Giáo dục",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng truyền phát",
        items: [
          { name: "Viettel Media CDN", desc: "Tăng tốc truyền phát livestream lớp học ảo và bài giảng video nén chất lượng cao.", details: ["Tự động định tuyến luồng video tới node CDN gần học sinh nhất", "Tương thích hoàn hảo các thiết bị di động, tablet học trực tuyến", "Tiết kiệm tối đa chi phí băng thông đường truyền máy chủ gốc"], icon: Network, link: "/services/networking/viettel-media-cdn" }
        ]
      }
    ],
    advantages: [
      { title: "Trải nghiệm học không gián đoạn", desc: "Triệt tiêu hoàn toàn hiện tượng giật hình, rớt kết nối lớp học ảo vào khung giờ vàng học sinh đăng nhập trực tuyến.", icon: Zap },
      { title: "Bảo vệ bản quyền bài giảng số", desc: "Mã hóa DRM bảo vệ tài sản trí tuệ của giáo viên và trung tâm đào tạo khỏi hành vi sao chép lậu.", icon: Lock },
      { title: "Khả năng co giãn cực đàn hồi", desc: "Dễ dàng kích hoạt thêm 200 máy chủ ảo gánh tải hệ thống thi quốc gia chỉ trong 5 phút và tắt đi ngay sau đó.", icon: Server },
      { title: "Tiết kiệm chi phí băng thông", desc: "Hệ sinh thái CDN thông minh phân phối luồng tĩnh hiệu quả, giảm thiểu áp lực băng thông máy chủ gốc.", icon: Calculator }
    ],
    useCases: [
      { num: "①", title: "Nền tảng Lớp học ảo trực tuyến (LMS / LXP)", desc: "Vận hành hệ thống quản lý học tập ổn định, hỗ trợ hàng triệu tài khoản học sinh đăng nhập học tập hàng ngày." },
      { num: "②", title: "Livestream bài giảng tương tác Live-class", desc: "Phát sóng trực tiếp bài giảng tương tác hai chiều thời gian thực chất lượng HD, không gặp độ trễ nghẽn mạng." },
      { num: "③", title: "Hệ thống tổ chức thi trắc nghiệm trực tuyến", desc: "Chịu tải mượt mà các kỳ thi học kỳ quy mô lớn với hàng vạn học sinh cùng làm bài và nộp bài thi tập trung." },
      { num: "④", title: "Kho lưu trữ video bài giảng xem lại (VOD)", desc: "Lưu trữ và phân phối hàng vạn video bài giảng ghi hình sẵn chất lượng cao, cho phép học sinh xem lại mọi lúc mọi nơi." }
    ],
    faqs: [
      { q: "Làm thế nào để hệ thống thi trực tuyến không bị nghẽn sập khi có hàng ngàn học sinh nộp bài cùng lúc?", a: "Chúng tôi thiết lập cơ chế hàng đợi tin nhắn vKQS (Kafka managed) và cân bằng tải mây, giúp hấp thụ và xử lý tuần tự mượt mà hàng vạn yêu cầu gửi bài thi trong cùng một giây mà không gây treo DB." },
      { q: "Hệ thống có hỗ trợ bảo vệ chống tải lậu video bài giảng không?", a: "Có, giải pháp tích hợp công nghệ mã hóa DRM tiêu chuẩn bảo mật quốc tế, ngăn chặn triệt để các công cụ tải video lậu và chặn quay màn hình bài giảng trái phép." }
    ]
  },
  "digital-gov": {
    slogan: "Sovereign Cloud cách ly vật lý tuyệt đối · Đạt an ninh thông tin Cấp độ 4",
    heroBadge: "GIẢI PHÁP THEO NGÀNH · SOVEREIGN GOVERNMENT CLOUD",
    overviewTitle: "Hạ tầng mây bảo đảm chủ quyền dữ liệu quốc gia",
    overviewDesc: "Hạ tầng điện toán đám mây dùng riêng Sovereign Cloud biệt lập hoàn toàn ở cấp độ phần cứng máy chủ và mạng viễn thông, đáp ứng an toàn thông tin cấp độ cao của nhà nước.",
    overviewCards: [
      { title: "Đạt an ninh Cấp độ 4", desc: "Đáp ứng đầy đủ bộ tiêu chuẩn an toàn hệ thống thông tin của Bộ Thông tin & Truyền thông.", icon: Shield },
      { title: "Cách ly vật lý tuyệt đối", desc: "Phân vùng đám mây dùng riêng, vận hành biệt lập hoàn toàn bởi đội ngũ nhân sự Việt Nam.", icon: Lock },
      { title: "Tuân thủ Luật An ninh mạng", desc: "Dữ liệu được lưu trữ an toàn 100% trong nước dưới tầm kiểm soát bảo hộ pháp lý của nhà nước.", icon: Check }
    ],
    componentsTitle: "Kiến trúc đám mây Chính phủ số",
    componentsGroups: [
      {
        title: "Hạ tầng dùng riêng an toàn",
        items: [
          { name: "Viettel Dedicated Private Cloud", desc: "Private cloud chuyên biệt, hạ tầng phần cứng Dell/Cisco đặt tại DC chuẩn Rated 3.", details: ["Thiết kế an toàn thông tin biệt lập hoàn toàn ở tầng vật lý máy chủ", "Tích hợp sẵn tường lửa cứng và thiết bị mã hóa chuyên dụng HSM", "Cam kết SLAs sẵn sàng hoạt động tối đa đạt 99.99%"], icon: Server, link: "/services/compute/viettel-dedicated-private-cloud" }
        ]
      }
    ],
    advantages: [
      { title: "Tuyệt đối an toàn dữ liệu quốc gia", desc: "Chặn đứng hoàn toàn nguy cơ bị tấn công gián điệp, rò rỉ thông tin hành chính nhạy cảm ra ngoài biên giới.", icon: Shield },
      { title: "Tuân thủ chặt chẽ pháp luật", desc: "Đáp ứng 100% Luật An ninh mạng, Luật An toàn thông tin mạng và Nghị định 13 bảo vệ dữ liệu cá nhân.", icon: Check },
      { title: "Chịu tải dịch vụ công mượt mà", desc: "Sẵn sàng co giãn tài nguyên mây gánh tải khi lượng hồ sơ hành chính trực tuyến tăng vọt, không gây bức xúc dư luận.", icon: Zap },
      { title: "Đội ngũ chuyên gia túc trực 24/7", desc: "Đội ngũ kỹ sư Việt Nam trình độ cao trực chiến liên tục tại SOC chủ động ứng cứu và xử lý sự cố an ninh.", icon: Phone }
    ],
    useCases: [
      { num: "①", title: "Cổng dịch vụ công trực tuyến quốc gia / tỉnh", desc: "Đảm bảo hạ tầng vận hành an toàn bảo mật tuyệt đối cho các giao dịch hành chính công trực tuyến của hàng triệu người dân mỗi ngày." },
      { num: "②", title: "Cơ sở dữ liệu quốc gia dân cư nhạy cảm", desc: "Lưu trữ và xử lý an toàn dữ liệu định danh cá nhân của người dân, tuân thủ nghiêm ngặt quy định bảo mật thông tin." },
      { num: "③", title: "Hệ thống điều hành thông minh đô thị IOC", desc: "Thu thập và phân tích dữ liệu cảm biến đô thị, giao thông thời gian thực phục vụ công tác điều phối chỉ đạo của lãnh đạo." },
      { num: "④", title: "Cổng thông tin điện tử bộ ban ngành", desc: "Đảm bảo trang tin chính thức của cơ quan nhà nước luôn online ổn định, chống lại các cuộc tấn công thay đổi giao diện (deface)." }
    ],
    faqs: [
      { q: "Hạ tầng Sovereign Cloud của Viettel IDC có được vận hành bởi nhân sự nước ngoài không?", a: "Tuyệt đối không. Để bảo đảm an toàn chủ quyền dữ liệu quốc gia, toàn bộ hệ thống Sovereign Cloud được vận hành và giám sát 100% bởi đội ngũ kỹ sư quốc tịch Việt Nam đã qua kiểm duyệt an ninh nghiêm ngặt." },
      { q: "Hệ thống trung tâm dữ liệu đặt ở đâu để bảo đảm an toàn vật lý?", a: "Toàn bộ hệ thống DC của Viettel IDC đặt 100% trên lãnh thổ Việt Nam, được thiết kế siêu bảo mật với cấu trúc kháng chấn thiên tai và kiểm soát an ninh vật lý nghiêm ngặt 6 lớp." }
    ]
  },
  "smart-manufacturing": {
    slogan: "Kết nối Edge IoT siêu độ trễ <10ms · Tự động hóa nhà máy thông minh",
    heroBadge: "GIẢI PHÁP THEO NGÀNH · SMART MANUFACTURING",
    overviewTitle: "Hạ tầng số thúc đẩy cách mạng công nghiệp 4.0",
    overviewDesc: "Nền tảng kết nối IoT biên (Edge IoT), lưu trữ dữ liệu chuỗi cảm biến thời gian thực phục vụ tự động hóa dây chuyền nhà máy và giám sát logistics vận tải.",
    overviewCards: [
      { title: "Xử lý biên Edge Compute <10ms", desc: "Triển khai máy chủ biên xử lý dữ liệu tức thì ngay tại nhà máy, giảm độ trễ phản hồi xuống dưới 10ms.", icon: Cpu },
      { title: "Cổng kết nối IoT đa giao thức", desc: "Hỗ trợ tự động đồng bộ hóa các giao thức công nghiệp phổ biến (MQTT, Modbus, CoAP).", icon: Network },
      { title: "Bản đồ định vị GPS thời gian thực", desc: "Ứng dụng bản đồ số định vị thời gian thực kết hợp mạng di động băng thông rộng 4G/5G viễn thông Viettel.", icon: Globe }
    ],
    componentsTitle: "Hệ sinh thái số hóa Nhà máy sản xuất",
    componentsGroups: [
      {
        title: "Dịch vụ hạ tầng xử lý",
        items: [
          { name: "Viettel Cloud Server", desc: "Máy chủ đám mây hiệu năng cao phục vụ phân tích dữ liệu cảm biến công nghiệp tập trung.", details: ["Hỗ trợ kết nối mượt mà tới hàng vạn thiết bị IoT đầu cuối", "Lưu trữ dữ liệu chuỗi thời gian (Time-series Database) hiệu năng cao", "Đảm bảo SLAs sẵn sàng hoạt động tối đa đạt 99.99%"], icon: Server, link: "/services/compute/viettel-cloud-server" }
        ]
      }
    ],
    advantages: [
      { title: "Độ trễ siêu thấp dưới 10ms", desc: "Xử lý dữ liệu tức thì tại biên giúp nhà máy kịp thời dừng dây chuyền tự động khi phát hiện sản phẩm lỗi, tránh lãng phí.", icon: Zap },
      { title: "Kết nối vạn vật không giới hạn", desc: "Cổng kết nối IoT hỗ trợ tự động dịch dịch đồng bộ hàng chục ngàn thiết bị IoT sử dụng nhiều giao thức khác nhau.", icon: Network },
      { title: "Đồng hành logistics thông minh", desc: "Định vị và giám sát hành trình xe vận tải liên tục thời gian thực nhờ mạng di động 4G/5G phủ sóng rộng nhất của Viettel.", icon: Globe },
      { title: "Chứng chỉ an toàn quốc tế", desc: "Hệ thống đáp ứng các tiêu chuẩn bảo mật hạ tầng công nghiệp nghiêm ngặt, bảo vệ nhà máy trước rủi ro phá hoại mạng.", icon: Shield }
    ],
    useCases: [
      { num: "①", title: "Giám sát dây chuyền lắp ráp tự động hóa", desc: "Kết nối hàng vạn cảm biến và cánh tay robot tự động hóa lắp ráp linh kiện điện tử, nâng cao 25% hiệu suất vận hành nhà máy." },
      { num: "②", title: "Giám sát chuỗi cung ứng lạnh Logistics", desc: "Theo dõi liên tục nhiệt độ, độ ẩm thùng container đông lạnh trong quá trình vận chuyển nông thủy sản bằng cảm biến GPS." },
      { num: "③", title: "Bảo trì dự đoán thiết bị nhà máy (Predictive Maintenance)", desc: "Phân tích độ rung lắc, nhiệt độ động cơ máy chủ bằng mô hình AI để cảnh báo sớm thời điểm cần bảo trì trước khi máy hỏng sập." },
      { num: "④", title: "Quản lý kho hàng thông minh bằng RFID/Mã vạch", desc: "Số hóa quy trình xuất nhập kho tự động thời gian thực bằng cảm biến đọc mã vạch không dây kết nối đám mây." }
    ],
    faqs: [
      { q: "Mạng di động 5G đóng vai trò gì trong giải pháp nhà máy thông minh?", a: "Mạng 5G viễn thông Viettel cung cấp đường truyền băng thông siêu rộng kết hợp độ trễ siêu thấp dưới 5ms, hỗ trợ kết nối đồng thời hàng vạn robot tự hành AGV vận chuyển linh kiện mượt mà trong nhà máy." },
      { q: "Dữ liệu cảm biến IoT phình to rất nhanh, giải pháp lưu trữ nào là tối ưu?", a: "Chúng tôi cung cấp giải pháp lưu trữ đối tượng Object Storage S3 phối hợp cơ sở dữ liệu chuyên dụng Time-series Database, giúp nén tối ưu và truy vấn dữ liệu lịch sử hàng năm với chi phí cực rẻ." }
    ]
  }
};

function SolutionDetailPageContent({ params }: PageProps) {
  const router = useRouter();
  
  const resolvedParams = use(params);
  const solutionSlug = resolvedParams.slug;

  const solution = SOLUTIONS.find(s => s.slug === solutionSlug) || SOLUTIONS[0];
  
  // Get extended details or fallback to default
  const details = EXTENDED_DETAILS[solution.slug] || EXTENDED_DETAILS["backup-dr"];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    solution: solution.name
  });
  const [ctaSuccess, setCtaSuccess] = useState(false);

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCtaSuccess(true);
    setTimeout(() => {
      setCtaForm({
        name: '',
        email: '',
        phone: '',
        solution: solution.name
      });
    }, 4000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 80;
      const sections = ['overview', 'components', 'comparison', 'use-cases', 'faq'];
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

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section id="hero-section" className="relative overflow-hidden bg-[#1A1A1A] text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dpyizq1m2/image/upload/v1781978626/banner_uxmzgt.png')` }}
        />
        
        <div className="ali-container relative z-10 text-left flex flex-col items-start py-6 w-full">
          <div className="space-y-6 max-w-3xl flex flex-col items-start">
            <div className="inline-flex items-center space-x-2 bg-[#EE0033]/15 border border-[#EE0033]/30 px-3 py-1.5 rounded-full text-[#EE0033] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EE0033] mr-1 animate-ping" />
              {details.heroBadge}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              {solution.name}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#EE0033]">{details.slogan}</span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {solution.description} Được xây dựng và tối ưu hoàn hảo dựa trên hạ tầng siêu trung tâm dữ liệu chuẩn Rated 3 TIA-942 danh giá của Viettel IDC, cam kết bảo mật tuyệt đối, uptime SLAs 99.99% và hỗ trợ kỹ thuật chuyên sâu 24/7/365.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToSection('components')}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#EE0033] text-white font-bold text-sm tracking-wider rounded-full shadow-[0_4px_14px_rgba(238,0,51,0.4)] transition-all duration-300 hover:bg-[#FF1A4E] hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_6px_20px_rgba(238,0,51,0.5)] focus:outline-none text-center cursor-pointer animate-fade-in"
              >
                <span>Khám phá giải pháp</span>
                <span className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center text-[8px] font-bold group-hover:border-white group-hover:scale-110 transition-all duration-300">
                  →
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('consultation')}
                className="inline-flex items-center justify-center px-7 py-3 bg-transparent border border-gray-400 hover:border-white text-gray-300 hover:text-white font-bold text-sm tracking-wider rounded-full text-center transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Nhận tư vấn thiết kế miễn phí
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY TAB NAVIGATION MENU */}
      <div className="sticky top-0 z-[1010] bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm transition-all duration-300">
        <div className="ali-container">
          <div className="flex items-center justify-between h-14 md:h-16">
            
            {/* Left side: Solution Name & Tabs */}
            <div className="flex items-center gap-6 lg:gap-8 overflow-hidden h-full">
              <span className="text-sm md:text-base font-extrabold text-gray-950 tracking-tight shrink-0 flex items-center h-full border-r border-gray-200/60 pr-4 md:pr-6">
                {solution.name}
              </span>
              
              {/* Desktop Tabs */}
              <div className="hidden md:flex items-center gap-5 lg:gap-7 h-full">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'components', label: 'Các phân hệ giải pháp' },
                  { id: 'comparison', label: 'Ưu thế so sánh' },
                  { id: 'use-cases', label: 'Kịch bản triển khai' },
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

            {/* Right side: Mobile scroll area / Desktop CTA */}
            <div className="flex items-center gap-4 shrink-0 h-full">
              {/* Mobile tabs - scrollable on mobile */}
              <div className="md:hidden flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap max-w-[130px] sm:max-w-[240px] py-1">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'components', label: 'Phân hệ' },
                  { id: 'comparison', label: 'Ưu thế' },
                  { id: 'faq', label: 'Hỏi đáp' }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`text-[11px] font-bold px-2 py-1 rounded transition-all cursor-pointer ${
                        isActive ? 'text-[#EE0033] bg-red-50' : 'text-gray-500'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => scrollToSection('consultation')}
                className="px-5 py-2 md:py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-[10px] md:text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                Nhận báo giá
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION OVERVIEW */}
      <section id="overview" className="py-16 md:py-20 bg-white relative">
        <div className="ali-container">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">TỔNG QUAN DỊCH VỤ</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              {details.overviewTitle}
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              {details.overviewDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {details.overviewCards.map((card, i) => {
              const IconComponent = card.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE0033] flex items-center justify-center mb-6">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-950 mb-3">{card.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION COMPONENTS & SOLUTIONS DEEP DIVE */}
      <section id="components" className="py-16 md:py-20 bg-gray-50/50 border-y border-gray-200/40 relative overflow-hidden">
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">PHÂN HỆ GIẢI PHÁP</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              {details.componentsTitle}
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Các mảng dịch vụ cấu thành được liên kết đồng bộ để giải quyết triệt để bài toán khó nhất của riêng bạn.
            </p>
          </motion.div>

          <div className="space-y-16">
            {details.componentsGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-8">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-4 text-left">
                  <div className="w-2.5 h-6 bg-[#EE0033] rounded-full shrink-0" />
                  <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight uppercase font-sans">
                    {group.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
                  {group.items.map((prod, idx) => {
                    const IconComponent = prod.icon;
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 hover:border-[#EE0033] hover:shadow-[0_8px_24px_rgba(238,0,51,0.06)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      >
                        <Link href={prod.link} className="flex flex-col justify-between h-full w-full">
                          <div className="space-y-6">
                            <div className="flex justify-between items-start">
                              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FAFAFA] text-[#EE0033] border border-gray-100 transition-all duration-300 group-hover:bg-[#FFF0F2] group-hover:border-[#FCD9D8]">
                                <IconComponent className="w-5 h-5 stroke-[1.8]" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-base md:text-lg font-bold text-gray-950 leading-snug font-sans tracking-tight">{prod.name}</h4>
                              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-normal min-h-[40px]">{prod.desc}</p>
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                              {prod.details.map((detail, dIdx) => (
                                <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600">
                                  <Check className="w-3.5 h-3.5 text-[#EE0033] shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-6 mt-6 border-t border-gray-100">
                            <span className="text-xs font-bold text-[#EE0033] inline-flex items-center gap-1.5 transition-all duration-300">
                              <span className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap">
                                Khám phá dịch vụ
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION COMPARATIVE ADVANTAGES */}
      <section id="comparison" className="py-16 md:py-20 bg-white relative">
        <div className="ali-container">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ƯU THẾ SO SÁNH</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Chất lượng quốc tế · Kiến tạo mây Việt
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Giải pháp tối ưu hóa may đo chính xác, tuân thủ nghiêm ngặt chuẩn quốc gia và quốc tế của Viettel IDC đem lại giá trị thiết thực vượt trội.
            </p>
          </motion.div>

          {/* Bento-style grid advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {details.advantages.map((adv, i) => {
              const IconComponent = adv.icon;
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4 text-left">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-[#EE0033] flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-gray-900">{adv.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION USE CASES */}
      <section id="use-cases" className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">ỨNG DỤNG THỰC TẾ</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Kịch bản ứng dụng tiêu biểu
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              May đo chính xác và giải quyết triệt để các bài toán khó nhất theo kịch bản hoạt động của doanh nghiệp bạn.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {details.useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 text-left transition-all duration-300 hover:border-[#EE0033]/30 hover:shadow-sm flex gap-5"
              >
                <div className="text-3xl font-black text-[#EE0033] shrink-0 mt-0.5 font-mono select-none">
                  {useCase.num}
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-gray-950 leading-snug">{useCase.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{useCase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION FAQ */}
      <section id="faq" className="py-16 md:py-20 bg-gray-50/50 border-t border-gray-200/40 relative overflow-hidden">
        <div className="ali-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left w-full space-y-2 mb-12"
          >
            <span className="text-[#EE0033] font-bold text-xs uppercase tracking-widest block bg-[#EE0033]/10 px-3 py-1 rounded-full w-max">HỎI ĐÁP DỊCH VỤ</span>
            <h2 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Giải đáp thắc mắc kỹ thuật
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed">
              Những câu hỏi thường gặp nhất từ khách hàng khi tìm hiểu giải pháp {solution.name} của Viettel IDC.
            </p>
          </motion.div>

          <div className="space-y-4">
            {details.faqs.map((faq, i) => {
              const isOpen = openFAQ === i;
              return (
                <div 
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-xs md:text-sm text-gray-900 hover:text-[#EE0033] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180 text-[#EE0033]' : ''}`} />
                  </button>
                  <div 
                    className={`transition-all duration-300 overflow-hidden text-left ${
                      isOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
                    }`}
                  >
                    <p className="p-6 text-xs md:text-sm text-gray-500 leading-relaxed bg-gray-50/50">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION CONTACT CONSULTATION */}
      <section id="consultation" className="relative py-20 lg:py-28 bg-gradient-to-br from-[#8A001A] via-[#660011] to-[#3B0007] overflow-hidden text-white font-sans">
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
                Tư vấn chuyên sâu {solution.name}
              </h2>
              
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-2xl">
                Nhận cố vấn chuyên sâu từ đội ngũ Kiến trúc sư giải pháp mây cao cấp của chúng tôi. Chúng tôi sẽ cùng khảo sát, đo đạc dữ liệu, lập thiết kế topo tối ưu chi phí và hỗ trợ chuyển đổi dữ liệu miễn phí.
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
                    Bảo đảm an toàn dữ liệu và cam kết chất lượng dịch vụ SLA 99.99%
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl text-neutral-900 max-w-lg mx-auto lg:ml-auto relative border border-neutral-100">
                
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight">
                    Đăng ký tư vấn giải pháp
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

                    {/* Solutions text field */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700">Hạ tầng / Giải pháp quan tâm</label>
                      <input
                        type="text"
                        readOnly
                        value={ctaForm.solution}
                        className="w-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs rounded-xl px-4 py-3 focus:outline-none font-medium"
                      />
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
