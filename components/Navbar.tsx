'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Phone, FileText, Headphones, Globe, Search, ChevronDown, Check, ArrowRight, X, 
  Cpu, Database, Server, HardDrive, Network, Lock, BookOpen, Clock, Mail, MapPin, Shield, 
  Layers, Code, Box, Smartphone, Monitor, Zap, TrendingUp, Users, Star, UserPlus, 
  DollarSign, Info, Award, Heart, Newspaper, Calendar, Menu, Trash2, Eye, Settings, Laptop, Briefcase,
  Sparkles, Calculator, UserCheck
} from 'lucide-react';

interface NavbarProps {
  forceServicesOpen?: boolean;
  forceMobileDrawer?: boolean;
}

interface ServiceItem {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgClass: string;
  iconColorClass: string;
  badge?: 'HOT' | 'NEW' | 'BETA';
  subgroup?: string;
}

const serviceCategories = [
  'Tất cả', 'Điện toán & Container', 'Trung tâm dữ liệu', 'Lưu trữ & Bảo vệ dữ liệu',
  'Nền tảng dữ liệu & Tích hợp', 'Mạng & Phân phối nội dung', 'Bảo mật & An ninh mạng',
  'Vận hành & Giám sát', 'Ứng dụng & Làm việc số', 'Dịch vụ quản lý & Tư vấn', 'Domain, Hosting & Email'
];

const servicesList: Record<string, ServiceItem[]> = {
  'Tất cả': [
    { name: 'Viettel Cloud Server (VM)', desc: 'Máy chủ ảo hiệu năng cao, khởi tạo trong 5 phút', icon: Cpu, iconBgClass: 'bg-[#FEF3C7]', iconColorClass: 'text-[#D97706]', badge: 'HOT' },
    { name: 'Viettel Cloud Firewall', desc: 'Bảo vệ hạ tầng toàn diện, stateful firewall', icon: Shield, iconBgClass: 'bg-[#FAF5F6]', iconColorClass: 'text-[#EE0033]' },
    { name: 'Viettel Cloud GPU', desc: 'Hạ tầng AI/ML, training model quy mô lớn', icon: Cpu, iconBgClass: 'bg-[#F3E8FF]', iconColorClass: 'text-[#7C3AED]', badge: 'NEW' },
    { name: 'Viettel Cloud Backup (BaaS)', desc: 'Sao lưu tự động, khôi phục nhanh chóng', icon: Server, iconBgClass: 'bg-[#F0FDF4]', iconColorClass: 'text-[#15803D]' },
    { name: 'Viettel Open Kubernetes (vOKS)', desc: 'Container orchestration chuẩn K8s', icon: Box, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', badge: 'NEW' },
    { name: 'Viettel Media CDN', desc: 'Phân phối nội dung toàn quốc, độ trễ thấp', icon: Network, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]' },
    { name: 'Viettel Anti-DDoS', desc: 'Chống tấn công từ chối dịch vụ quy mô lớn', icon: Lock, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]' },
    { name: 'Viettel Database Service (vDBS)', desc: 'Cơ sở dữ liệu cloud được quản lý hoàn toàn', icon: Database, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]' }
  ],
  'Điện toán & Container': [
    { name: 'Viettel Cloud Server (VM)', desc: 'Máy chủ ảo hiệu năng cao, cấu hình linh hoạt, pay-as-you-go', icon: Cpu, iconBgClass: 'bg-[#FEF3C7]', iconColorClass: 'text-[#D97706]', badge: 'HOT', subgroup: 'Điện toán đám mây' },
    { name: 'Viettel Virtual Private Cloud (VPC)', desc: 'Mạng riêng ảo, phân vùng tài nguyên an toàn', icon: Network, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Điện toán đám mây' },
    { name: 'Viettel Private Cloud', desc: 'Hạ tầng cloud riêng tư, tài nguyên dành riêng', icon: Layers, iconBgClass: 'bg-[#EBEBEB]', iconColorClass: 'text-[#5A5A5A]', subgroup: 'Điện toán đám mây' },
    { name: 'Viettel Dedicated Private Cloud', desc: 'Private cloud chuyên biệt, phần cứng độc lập', icon: Server, iconBgClass: 'bg-[#EBEBEB]', iconColorClass: 'text-[#5A5A5A]', subgroup: 'Điện toán đám mây' },
    { name: 'Viettel Open Private Cloud', desc: 'Private cloud trên nền tảng OpenStack', icon: Layers, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Điện toán đám mây' },
    { name: 'Viettel Cloud GPU', desc: 'GPU NVIDIA A100/H100 cho AI/ML và xử lý đồ họa', icon: Cpu, iconBgClass: 'bg-[#F3E8FF]', iconColorClass: 'text-[#7C3AED]', badge: 'NEW', subgroup: 'Điện toán đám mây' },
    { name: 'Viettel Cloud NPU', desc: 'Neural Processing Unit cho inference AI tốc độ cao', icon: Zap, iconBgClass: 'bg-[#FCE7F3]', iconColorClass: 'text-[#DB2777]', badge: 'BETA', subgroup: 'Điện toán đám mây' },
    { name: 'Viettel Open Kubernetes Service (vOKS)', desc: 'Kubernetes managed, auto-scaling, multi-tenant', icon: Box, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', badge: 'NEW', subgroup: 'Container & Kubernetes' },
    { name: 'Viettel Dedicated Kubernetes Service (vDKS)', desc: 'Kubernetes cluster chuyên biệt, tài nguyên độc lập', icon: Box, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Container & Kubernetes' },
    { name: 'Viettel Container Registry (vCR)', desc: 'Kho lưu trữ Docker image, bảo mật và quản lý tập trung', icon: Layers, iconBgClass: 'bg-[#EBEBEB]', iconColorClass: 'text-[#5A5A5A]', subgroup: 'Container & Kubernetes' }
  ],
  'Trung tâm dữ liệu': [
    { name: 'Colocation (Rack / Cage / Suite)', desc: 'Thuê không gian tại Data Center Tier III, điện, làm mát, băng thông', icon: Server, iconBgClass: 'bg-[#EBEBEB]', iconColorClass: 'text-[#5A5A5A]', subgroup: 'Hạ tầng vật lý' },
    { name: 'Dedicated Server Leasing (Bare Metal)', desc: 'Thuê máy chủ vật lý riêng, hiệu năng tối đa, không chia sẻ', icon: Cpu, iconBgClass: 'bg-[#FEF3C7]', iconColorClass: 'text-[#D97706]', subgroup: 'Hạ tầng vật lý' },
    { name: 'Viettel Data Center Consulting', desc: 'Tư vấn thiết kế, xây dựng và vận hành Data Center cho doanh nghiệp', icon: Briefcase, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Tư vấn & Thiết kế' }
  ],
  'Lưu trữ & Bảo vệ dữ liệu': [
    { name: 'Viettel Cloud Object Storage', desc: 'Lưu trữ đối tượng vô hạn, S3-compatible, CDN tích hợp', icon: HardDrive, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Lưu trữ đám mây' },
    { name: 'Viettel Cloud File Storage', desc: 'NFS/SMB file system, chia sẻ dữ liệu giữa nhiều VM', icon: FileText, iconBgClass: 'bg-[#EBEBEB]', iconColorClass: 'text-[#5A5A5A]', subgroup: 'Lưu trữ đám mây' },
    { name: 'Viettel Cloud Backup (BaaS)', desc: 'Sao lưu tự động theo lịch, khôi phục nhanh chóng, mã hoá AES-256', icon: Server, iconBgClass: 'bg-[#F0FDF4]', iconColorClass: 'text-[#15803D]', subgroup: 'Sao lưu & Phục hồi thảm họa' },
    { name: 'Viettel Cloud Disaster Recovery (DRaaS)', desc: 'RTO < 15 phút, RPO < 1 giờ, failover tự động cross-DC', icon: Zap, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]', subgroup: 'Sao lưu & Phục hồi thảm họa' },
    { name: 'Viettel Cloud Data Archiving', desc: 'Lưu trữ dài hạn chi phí thấp, tuân thủ quy định lưu trữ dữ liệu', icon: HardDrive, iconBgClass: 'bg-[#EBEBEB]', iconColorClass: 'text-[#5A5A5A]', subgroup: 'Sao lưu & Phục hồi thảm họa' }
  ],
  'Nền tảng dữ liệu & Tích hợp': [
    { name: 'Viettel Database Service (vDBS)', desc: 'MySQL, PostgreSQL, SQL Server managed — HA, auto backup', icon: Database, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Cơ sở dữ liệu & Cache' },
    { name: 'Viettel Caching Service (vCAS)', desc: 'Redis/Memcached managed, in-memory caching tốc độ cao', icon: Zap, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Cơ sở dữ liệu & Cache' },
    { name: 'Viettel Search Engine Service (vSE)', desc: 'Elasticsearch managed, full-text search, log analytics', icon: Search, iconBgClass: 'bg-[#F3E8FF]', iconColorClass: 'text-[#7C3AED]', subgroup: 'Cơ sở dữ liệu & Cache' },
    { name: 'Viettel API Gateway', desc: 'Quản lý, bảo mật và giám sát API, rate limiting', icon: Network, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]', subgroup: 'Tích hợp & Messaging' },
    { name: 'Viettel Queue & Messaging (vKQS)', desc: 'Message queue Kafka-compatible, event streaming', icon: Zap, iconBgClass: 'bg-[#FEF3C7]', iconColorClass: 'text-[#D97706]', subgroup: 'Tích hợp & Messaging' }
  ],
  'Mạng & Phân phối nội dung': [
    { name: 'Viettel Interconnection (Leased Line)', desc: 'Kết nối băng thông cao, SLA 99.99%, peering toàn cầu', icon: Network, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Kết nối & SD-WAN' },
    { name: 'Viettel Cloud Connect', desc: 'Kết nối on-premise lên Cloud, độ trễ thấp, bảo mật', icon: Network, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Kết nối & SD-WAN' },
    { name: 'Viettel Hybrid Connect', desc: 'Kết nối Hybrid Cloud, tích hợp nhiều cloud provider', icon: Layers, iconBgClass: 'bg-[#F0FDF4]', iconColorClass: 'text-[#15803D]', subgroup: 'Kết nối & SD-WAN' },
    { name: 'Viettel SD-WAN', desc: 'Mạng WAN định nghĩa bằng phần mềm, tối ưu băng thông', icon: Network, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]', subgroup: 'Kết nối & SD-WAN' },
    { name: 'Viettel Media CDN', desc: 'CDN toàn quốc, streaming video, website tải nhanh', icon: Zap, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Phân phối nội dung (CDN)' },
    { name: 'Viettel Multi-CDN (vMCDN)', desc: 'Kết hợp nhiều CDN, tự động chọn route tối ưu', icon: Globe, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Phân phối nội dung (CDN)' }
  ],
  'Bảo mật & An ninh mạng': [
    { name: 'Viettel Cloud Firewall', desc: 'Stateful firewall, IDS/IPS tích hợp bảo vệ hạ tầng', icon: Shield, iconBgClass: 'bg-[#FAF5F6]', iconColorClass: 'text-[#EE0033]', subgroup: 'Bảo mật đám mây' },
    { name: 'Viettel CWAF (Web App Firewall)', desc: 'Bảo vệ ứng dụng web, chống lỗ hổng OWASP Top 10', icon: Lock, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]', subgroup: 'Bảo mật đám mây' },
    { name: 'Viettel Anti-DDoS', desc: 'Scrubbing center 1Tbps+, tự động giảm thiểu tấn công', icon: Zap, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]', subgroup: 'Bảo mật đám mây' },
    { name: 'Viettel Endpoint Security', desc: 'AV/EDR giám sát và phát hiện đe dọa trên máy chủ', icon: Monitor, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Bảo mật đám mây' },
    { name: 'Viettel SSL / PKI', desc: 'Chứng chỉ số an toàn giao diện, hạ tầng khóa công khai', icon: Lock, iconBgClass: 'bg-[#F0FDF4]', iconColorClass: 'text-[#15803D]', subgroup: 'Bảo mật đám mây' },
    { name: 'Viettel vCloudrity', desc: 'Platform bảo tồn không gian định danh, CSPM an toàn', icon: Eye, iconBgClass: 'bg-[#F3E8FF]', iconColorClass: 'text-[#7C3AED]', subgroup: 'Bảo mật đám mây' },
    { name: 'Viettel Virtual SOC', desc: 'Giám sát vận hành an ninh 24/7/365, quản lý SIEM', icon: Eye, iconBgClass: 'bg-[#FAF5F6]', iconColorClass: 'text-[#EE0033]', subgroup: 'Vận hành an ninh mạng' },
    { name: 'Viettel Threat Intelligence', desc: 'Dữ liệu tình báo, cập nhật IOC độc hại thời gian thực', icon: Zap, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]', subgroup: 'Vận hành an ninh mạng' },
    { name: 'Viettel Threat Hunting', desc: 'Gỡ rối và truy vết chủ động mối đe dọa tiềm tàng', icon: Search, iconBgClass: 'bg-[#F3E8FF]', iconColorClass: 'text-[#7C3AED]', subgroup: 'Vận hành an ninh mạng' },
    { name: 'Viettel Cyber Security Maturity (vCSMP)', desc: 'Đánh giá cấp độ an toàn và nâng hạng trưởng thành bảo mật', icon: TrendingUp, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Vận hành an ninh mạng' }
  ],
  'Vận hành & Giám sát': [
    { name: 'Viettel Application Performance Monitoring (APM)', desc: 'Giám sát ứng dụng đầu cuối, phát hiện lỗi hiệu năng', icon: Zap, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Giám sát hiệu năng' },
    { name: 'Viettel CloudWatch', desc: 'Giám sát tham số cấu hình, biểu đồ dashboard trực quan', icon: Eye, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Giám sát hiệu năng' },
    { name: 'Viettel Cloud Management Platform', desc: 'Giao diện quản trị đồng thời đa cụm tài nguyên hiệu quả', icon: Settings, iconBgClass: 'bg-[#EBEBEB]', iconColorClass: 'text-[#5A5A5A]', subgroup: 'Quản trị đám mây' }
  ],
  'Ứng dụng & Làm việc số': [
    { name: 'Microsoft 365 (đối tác)', desc: 'Bản quyền công cụ làm việc văn phòng Microsoft', icon: Monitor, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Không gian làm việc số' },
    { name: 'Viettel Drive', desc: 'Sao lưu đồng bộ và chia sẻ tài liệu trực tuyến an an toàn', icon: HardDrive, iconBgClass: 'bg-[#FAF5F6]', iconColorClass: 'text-[#EE0033]', subgroup: 'Không gian làm việc số' },
    { name: 'Viettel Cloud PC', desc: 'Vận hành máy tính làm việc ảo ổn định từ hạ tầng đám mây', icon: Laptop, iconBgClass: 'bg-[#EBEBEB]', iconColorClass: 'text-[#5A5A5A]', subgroup: 'Không gian làm việc số' },
    { name: 'Viettel Cloud Desktop (DaaS)', desc: ' Desktop as a Service, phân vùng làm việc ảo văn phòng', icon: Laptop, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Không gian làm việc số' },
    { name: 'Viettel License Leasing', desc: 'Cung cấp thuê bản quyền phần mềm chất lượng cao tối ưu', icon: FileText, iconBgClass: 'bg-[#FEF3C7]', iconColorClass: 'text-[#D97706]', subgroup: 'Không gian làm việc số' },
    { name: 'Viettel Voice Brandname (CPaaS)', desc: 'Hệ thống định danh cuộc gọi quảng bá thương hiệu tự tin', icon: Phone, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]', subgroup: 'Truyền thông & IoT' },
    { name: 'Viettel Cloud Camera (VSaaS)', desc: 'Giải pháp lưu trữ xử lý camera thông minh vượt trội', icon: Eye, iconBgClass: 'bg-[#F3E8FF]', iconColorClass: 'text-[#7C3AED]', subgroup: 'Truyền thông & IoT' }
  ],
  'Dịch vụ quản lý & Tư vấn': [
    { name: 'Viettel Managed Services (MSP)', desc: 'Vận hành và quản lý hạ tầng mây bảo đảm cam kết SLA', icon: Settings, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Quản trị & Vận hành' },
    { name: 'Viettel Multi-cloud Management', desc: 'Hạ tầng quản lý tập trung nhiều nền tảng mây khác biệt', icon: Layers, iconBgClass: 'bg-[#CCFBF1]', iconColorClass: 'text-[#0D9488]', subgroup: 'Quản trị & Vận hành' },
    { name: 'Viettel Cloud Migration', desc: 'Dịch vụ di dời dữ liệu mượt mà, hạn chế tối đa gián đoạn', icon: Server, iconBgClass: 'bg-[#F0FDF4]', iconColorClass: 'text-[#15803D]', subgroup: 'Chuyển đổi đám mây' }
  ],
  'Domain, Hosting & Email': [
    { name: 'Viettel Domain (DNS)', desc: 'Đăng ký và cấu hình tên miền hỗ trợ phân giải IP tốc độ cao', icon: Globe, iconBgClass: 'bg-[#E0F2FE]', iconColorClass: 'text-[#0369A1]', subgroup: 'Tên miền & DNS' },
    { name: 'Viettel Web Hosting', desc: 'Lưu trữ mã nguồn website hoạt động nhanh chóng và tối ưu', icon: Server, iconBgClass: 'bg-[#F0FDF4]', iconColorClass: 'text-[#15803D]', subgroup: 'Hosting & Email' },
    { name: 'Viettel Email Hosting', desc: 'Thư điện tử doanh nghiệp định dạng riêng, dung lượng tối đa', icon: Mail, iconBgClass: 'bg-[#FFF7ED]', iconColorClass: 'text-[#EA580C]', subgroup: 'Hosting & Email' }
  ]
};

const solutionCategories = ['Hạ tầng & Cloud', 'Dev, Ops & AI', 'Kết nối & Workspace'];

const solutionsList: Record<string, { name: string; desc: string; icon: any; iconBg: string; iconColor: string; href: string }[]> = {
  'Hạ tầng & Cloud': [
    { name: 'Sao lưu & Dự phòng dữ liệu', desc: 'Backup tự động, DR cross-DC, RTO < 15 phút, RPO < 1 giờ', icon: Server, iconBg: 'bg-[#F0FDF4]', iconColor: 'text-[#15803D]', href: '/solutions/backup-dr' },
    { name: 'Chuyển đổi hạ tầng Cloud', desc: 'Migration toàn diện từ on-premise lên Cloud, không gián đoạn', icon: Layers, iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0369A1]', href: '/solutions/cloud-migration' },
    { name: 'Triển khai Multi-Availability Zone', desc: 'Hạ tầng HA ổn định liên tục, bảo hộ rủi ro kỹ thuật', icon: Layers, iconBg: 'bg-[#CCFBF1]', iconColor: 'text-[#0D9488]', href: '/solutions/backup-dr' },
    { name: 'Viettel IaC Hub', desc: 'Tự động hóa hạ tầng thông qua Terraform templates và GitOps', icon: Code, iconBg: 'bg-[#EBEBEB]', iconColor: 'text-[#5A5A5A]', href: '/solutions/container' }
  ],
  'Dev, Ops & AI': [
    { name: 'Container & Kubernetes', desc: 'Triển khai cụm container quản trị K8s managed vOKS/vDKS', icon: Box, iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0369A1]', href: '/solutions/container' },
    { name: 'DevSecOps', desc: 'Tích hợp bảo mật tự động vào quy trình CI/CD hoàn hảo', icon: Shield, iconBg: 'bg-[#FAF5F6]', iconColor: 'text-[#EE0033]', href: '/solutions/container' },
    { name: 'Giám sát & Ứng dụng AI', desc: 'Quản lý hiệu năng APM tích hợp phân tích bất thường bằng AI', icon: Cpu, iconBg: 'bg-[#FEF3C7]', iconColor: 'text-[#D97706]', href: '/solutions/container' },
    { name: 'Đám mây hiệu năng cao', desc: 'Cụm máy GPU NVIDIA A100/H100 phục vụ học sâu training mẫu', icon: Zap, iconBg: 'bg-[#F3E8FF]', iconColor: 'text-[#7C3AED]', href: '/solutions/container' }
  ],
  'Kết nối & Workspace': [
    { name: 'Mạng phân phối nội dung (CDN)', desc: 'Multi-CDN tối ưu hóa định tuyến tải web toàn quốc', icon: Globe, iconBg: 'bg-[#CCFBF1]', iconColor: 'text-[#0D9488]', href: '/solutions/cloud-migration' },
    { name: 'Làm việc di động', desc: 'Không gian làm việc số an toàn Cloud PC, Microsoft 365', icon: Laptop, iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0369A1]', href: '/solutions/cloud-migration' },
    { name: 'Xây dựng Website', desc: 'Gói trọn bộ Web Hosting, SSD, tên miền SSL tin cậy', icon: Monitor, iconBg: 'bg-[#F0FDF4]', iconColor: 'text-[#15803D]', href: '/solutions/cloud-migration' }
  ]
};

const partnerCategories = ['Chương trình hợp tác', 'Pinnacle Alliance', 'Hỗ trợ đối tác'];

const getCategorySlug = (categoryName: string) => {
  const mapping: Record<string, string> = {
    'Điện toán & Container': 'compute',
    'Trung tâm dữ liệu': 'data-center',
    'Lưu trữ & Bảo vệ dữ liệu': 'storage',
    'Nền tảng dữ liệu & Tích hợp': 'data-platform',
    'Mạng & Phân phối nội dung': 'networking',
    'Bảo mật & An ninh mạng': 'security',
    'Vận hành & Giám sát': 'cloud-operations',
    'Ứng dụng & Làm việc số': 'digital-services',
    'Dịch vụ quản lý & Tư vấn': 'managed-services',
    'Domain, Hosting & Email': 'hosting',
  };
  return mapping[categoryName] || 'compute';
};

const getProductSlug = (name: string) => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('server') && !nameLower.includes('gpu') && !nameLower.includes('leasing')) return 'viettel-cloud-server';
  if (nameLower.includes('kubernetes') || nameLower.includes('voks')) return 'viettel-kubernetes';
  if (nameLower.includes('gpu') && nameLower.includes('server')) return 'viettel-gpu-server';
  if (nameLower.includes('colocation') || nameLower.includes('chỗ đặt')) return 'viettel-colocation';
  return null;
};

const getProductCategoryName = (name: string) => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('server') && !nameLower.includes('gpu') && !nameLower.includes('leasing')) return 'Điện toán & Container';
  if (nameLower.includes('kubernetes') || nameLower.includes('voks')) return 'Điện toán & Container';
  if (nameLower.includes('gpu')) return 'Điện toán & Container';
  if (nameLower.includes('colocation') || nameLower.includes('chỗ đặt')) return 'Trung tâm dữ liệu';
  if (nameLower.includes('storage') || nameLower.includes('file') || nameLower.includes('backup') || nameLower.includes('disaster') || nameLower.includes('archiving')) return 'Lưu trữ & Bảo vệ dữ liệu';
  if (nameLower.includes('database') || nameLower.includes('caching') || nameLower.includes('search') || nameLower.includes('api gateway') || nameLower.includes('queue') || nameLower.includes('vcas') || nameLower.includes('vdbs')) return 'Nền tảng dữ liệu & Tích hợp';
  if (nameLower.includes('leased line') || nameLower.includes('connect') || nameLower.includes('sd-wan') || nameLower.includes('cdn')) return 'Mạng & Phân phối nội dung';
  if (nameLower.includes('firewall') || nameLower.includes('ddos') || nameLower.includes('endpoint') || nameLower.includes('ssl') || nameLower.includes('vcloudrity') || nameLower.includes('soc') || nameLower.includes('threat') || nameLower.includes('security')) return 'Bảo mật & An ninh mạng';
  if (nameLower.includes('monitoring') || nameLower.includes('watch') || nameLower.includes('platform')) return 'Vận hành & Giám sát';
  if (nameLower.includes('microsoft') || nameLower.includes('drive') || nameLower.includes('pc') || nameLower.includes('desktop') || nameLower.includes('license') || nameLower.includes('voice') || nameLower.includes('camera')) return 'Ứng dụng & Làm việc số';
  if (nameLower.includes('managed') || nameLower.includes('multi-cloud') || nameLower.includes('migration')) return 'Dịch vụ quản lý & Tư vấn';
  if (nameLower.includes('domain') || nameLower.includes('dns') || nameLower.includes('hosting') || nameLower.includes('email')) return 'Domain, Hosting & Email';
  return 'Điện toán & Container';
};

const getProductRoute = (item: ServiceItem, activeCat: string) => {
  const catSlug = getCategorySlug(activeCat === 'Tất cả' ? getProductCategoryName(item.name) : activeCat);
  const prodSlug = getProductSlug(item.name);
  if (prodSlug) {
    return `/services/${catSlug}/${prodSlug}`;
  }
  return `/services/${catSlug}`;
};

export default function Navbar({ forceServicesOpen = false, forceMobileDrawer = false }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeCategoryA, setActiveCategoryA] = useState('Tất cả');
  const [activeCategoryB, setActiveCategoryB] = useState('Hạ tầng & Cloud');
  const [activeCategoryE, setActiveCategoryE] = useState('Chương trình hợp tác');
  
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('Việt Nam');

  const [serviceSearchQuery, setServiceSearchQuery] = useState('');

  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Gather all services
  const allServices = React.useMemo(() => {
    const list: { name: string; desc: string; category: string; slug: string | null; icon: any; iconBg: string; iconColor: string }[] = [];
    Object.entries(servicesList).forEach(([category, items]) => {
      if (category === 'Tất cả') return;
      items.forEach(item => {
        if (!list.some(existing => existing.name === item.name)) {
          list.push({
            name: item.name,
            desc: item.desc,
            category: category,
            slug: getProductSlug(item.name),
            icon: item.icon,
            iconBg: item.iconBgClass,
            iconColor: item.iconColorClass
          });
        }
      });
    });
    return list;
  }, []);

  // Gather all solutions
  const allSolutions = React.useMemo(() => {
    const list: { name: string; desc: string; category: string; href: string; icon: any; iconBg: string; iconColor: string }[] = [];
    Object.entries(solutionsList).forEach(([category, items]) => {
      items.forEach(item => {
        list.push({
          name: item.name,
          desc: item.desc,
          category: category,
          href: item.href,
          icon: item.icon,
          iconBg: item.iconBg,
          iconColor: item.iconColor
        });
      });
    });
    return list;
  }, []);

  const searchResults = React.useMemo(() => {
    if (!navSearchQuery.trim()) return { services: [], solutions: [] };
    const query = navSearchQuery.toLowerCase();
    
    const matchedServices = allServices.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.desc.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    );

    const matchedSolutions = allSolutions.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.desc.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    );

    return {
      services: matchedServices.slice(0, 5),
      solutions: matchedSolutions.slice(0, 3)
    };
  }, [navSearchQuery, allServices, allSolutions]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      if (forceServicesOpen) {
        setActiveMenu('services');
      } else {
        setActiveMenu(null);
      }
    });
    return () => cancelAnimationFrame(handle);
  }, [forceServicesOpen]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      if (forceMobileDrawer) {
        setMobileMenuOpen(true);
      } else {
        setMobileMenuOpen(false);
      }
    });
    return () => cancelAnimationFrame(handle);
  }, [forceMobileDrawer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setLangOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleL1Click = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const rawServices = servicesList[activeCategoryA] || [];
  const filteredServices = rawServices.filter(item =>
    item.name.toLowerCase().includes(serviceSearchQuery.toLowerCase()) || 
    item.desc.toLowerCase().includes(serviceSearchQuery.toLowerCase())
  );

  return (
    <>
      <header className="relative w-full font-sans select-none" id="main-header">
        
        {/* ━━━ BACKDROP ━━━ */}
        {(activeMenu || isSearchFocused) && (
          <div 
            className="fixed inset-0 bg-black/20 z-[9] transition-all duration-200"
            onClick={() => {
              setActiveMenu(null);
              setIsSearchFocused(false);
            }}
          />
        )}
        
        {/* ━━━ Selector 3: TOP BAR ━━━ */}
        <div className="h-[36px] bg-[#1A1A1A] text-white text-[12px] relative z-30 flex items-center border-b border-white/5">
          {/* ━━━ Selector 2: TOP BAR INNER ALIGNMENT ━━━ */}
          <div className="ali-container h-[36px] flex justify-end items-center">
            <a href="tel:18008088" className="h-full flex items-center gap-1.5 px-4 border-r border-white/10 text-white font-semibold hover:text-[#EE0033] transition-colors whitespace-nowrap">
              <Phone className="w-3.5 h-3.5 text-[#EE0033]" />
              <span>Hotline: 1800 8088</span>
            </a>
            
            <a href="https://docs.viettelidc.com.vn" target="_blank" rel="noreferrer" className="h-full flex items-center gap-1.5 px-4 border-r border-white/10 hover:text-white transition-colors whitespace-nowrap">
              <FileText className="w-3.5 h-3.5" />
              <span>Tài liệu kỹ thuật</span>
            </a>

            <a href="https://support.viettelidc.com.vn" target="_blank" rel="noreferrer" className="h-full flex items-center gap-1.5 px-4 border-r border-white/10 hover:text-white transition-colors whitespace-nowrap">
              <Headphones className="w-3.5 h-3.5" />
              <span>Hỗ trợ 24/7</span>
            </a>

            <div className="relative h-full flex items-center px-4" id="region-dropdown-container">
              <button 
                onClick={() => setLangOpen(!langOpen)} 
                className="flex items-center gap-1.5 text-white hover:text-white transition-colors focus:outline-none whitespace-nowrap cursor-pointer h-full"
              >
                <Globe className="w-3.5 h-3.5 text-[#EE0033]" />
                <span className="font-semibold">{currentLang}</span>
                <ChevronDown className={`w-3 h-3 text-white/50 transition-transform ${langOpen ? 'rotate-180 text-white' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-[35px] w-[260px] bg-white text-gray-800 rounded-b-[12px] shadow-[0_12px_24px_rgba(0,0,0,0.12)] border border-gray-100/80 z-[2030] overflow-hidden py-2 text-left">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-2.5 pb-1.5 select-none">
                    SOUTHEAST ASIA
                  </div>
                  <div className="flex flex-col">
                    {[
                      { name: 'Việt Nam', native: 'Tiếng Việt' },
                      { name: 'Singapore', native: 'English' },
                      { name: 'Indonesia', native: 'Bahasa Indonesia' },
                      { name: 'Thailand', native: 'ไทย' },
                      { name: 'Malaysia', native: 'Melayu' },
                      { name: 'Philippines', native: 'Filipino' },
                      { name: 'Cambodia', native: 'ភាសាខ្មែរ' },
                      { name: 'Laos', native: 'ພາສາລາວ' },
                      { name: 'Myanmar', native: 'မြန်မာဘာသာ' },
                    ].map((item) => {
                      const isActive = currentLang === item.name;
                      return (
                        <div
                          key={item.name}
                          onClick={() => {
                            setCurrentLang(item.name);
                            setLangOpen(false);
                          }}
                          className={`flex justify-between items-center w-full px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer border-l-[3px] ${
                            isActive 
                              ? 'border-[#EE0033] bg-rose-50/20 text-[#EE0033]' 
                              : 'border-transparent text-gray-700 hover:text-gray-900'
                          }`}
                        >
                          <span className={`text-[13px] ${isActive ? 'font-bold' : 'font-semibold'}`}>
                            {item.name}
                          </span>
                          <span className={`text-[11.5px] ${isActive ? 'text-[#EE0033]/80' : 'text-gray-400'}`}>
                            {item.native}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ━━━ Selector 1: MAIN NAV BAR ━━━ */}
        <div 
          className={`w-full bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky ${scrolled ? 'top-0 shadow-lg shadow-black/[0.03]' : 'relative'} z-[1000] transition-all duration-200`}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="ali-container h-[64px] flex items-center justify-between gap-4 relative">
            
            {/* LEFT AREA: Logo & Primary Nav closely aligned */}
            <div className="flex items-center gap-6 xl:gap-10 h-full flex-grow">
              {/* Logo */}
              <Link 
                href="/" 
                className="flex items-center gap-2 flex-shrink-0" 
                onClick={() => setActiveMenu(null)}
                onMouseEnter={() => setActiveMenu(null)}
              >
                <Image 
                  src="https://res.cloudinary.com/dpyizq1m2/image/upload/v1782053913/logo-IDC_2_up2gqp.svg" 
                  alt="Viettel IDC" 
                  width={128}
                  height={32}
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </Link>

              {/* Primary menu items left aligned */}
              <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 h-full" role="navigation">
                {[
                  { label: 'Dịch vụ', key: 'services' },
                  { label: 'Giải pháp', key: 'solutions' },
                  { label: 'Bảng giá', key: 'pricing' },
                  { label: 'Tài nguyên', key: 'resources' },
                  { label: 'Đối tác', key: 'partners' },
                  { label: 'Về Viettel IDC', key: 'about' }
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => handleL1Click(item.key)}
                    onMouseEnter={() => setActiveMenu(item.key)}
                    className={`h-full flex items-center px-1.5 lg:px-2 text-[14px] lg:text-[14.5px] font-normal transition-all duration-150 cursor-pointer border-b-2 hover:text-[#EE0033] whitespace-nowrap flex-shrink-0 ${
                      activeMenu === item.key ? 'text-[#EE0033] border-[#EE0033]' : 'text-[#344054] border-transparent'
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT - Utility with Stateful Search Icon */}
            <div 
              className="hidden lg:flex items-center lg:gap-2.5 xl:gap-4 flex-shrink-0"
              onMouseEnter={() => setActiveMenu(null)}
            >
              {/* Interactive Search Icon */}
              <button
                type="button"
                onClick={() => {
                  setIsSearchFocused(true);
                  setActiveMenu(null); // Close active dropdowns when search is opened
                }}
                className="p-2 rounded-full text-[#344054] hover:text-[#EE0033] hover:bg-gray-50 transition-all duration-150 flex items-center justify-center cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <a href="https://console.viettelidc.com.vn" target="_blank" rel="noreferrer" className="border border-[#D0D0D0] bg-white text-[#344054] h-[36px] px-3.5 rounded-[8px] text-[14px] font-medium hover:bg-gray-50 flex items-center justify-center transition-all whitespace-nowrap flex-shrink-0">
                Console
              </a>
              <Link href="/contact" className="bg-[#EE0033] text-white h-[36px] px-4 rounded-[8px] text-[14px] font-semibold hover:bg-[#FF302D] flex items-center justify-center transition-all whitespace-nowrap flex-shrink-0">
                Đăng ký tài khoản
              </Link>
            </div>

            {/* Mobile menu icon */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* MASTER FULL-SCREEN SEARCH OVERLAY */}
          {isSearchFocused && (
            <div className="absolute inset-x-0 top-0 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.12)] border-b border-gray-200 z-[2020] py-6 animate-fadeIn transition-all duration-300">
              <div className="ali-container">
                
                {/* Search Bar Row */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3.5 flex-1 max-w-4xl">
                    <Search className="w-6 h-6 text-[#EE0033] flex-shrink-0 animate-pulse" />
                    <input
                      autoFocus
                      type="text"
                      value={navSearchQuery}
                      onChange={(e) => setNavSearchQuery(e.target.value)}
                      placeholder="Tìm nhanh dịch vụ đám mây (Ví dụ: Cloud Server, GPU, Kubernetes, Storage...)"
                      className="w-full bg-transparent border-none text-[15px] sm:text-[16px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 p-0 font-medium font-sans"
                    />
                    {navSearchQuery ? (
                      <button 
                        type="button"
                        onClick={() => setNavSearchQuery('')} 
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    ) : null}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline text-[11px] font-bold text-gray-400 tracking-wider select-none">
                      ESC ĐỂ ĐÓNG
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchFocused(false);
                        setNavSearchQuery('');
                      }}
                      className="bg-[#FFF0F2] text-[#EE0033] hover:bg-[#FFE5E8] px-4.5 py-1.5 transition-all duration-150 rounded-full text-xs font-bold leading-none cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                </div>

                {/* Content Block */}
                {!navSearchQuery.trim() ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
                    {/* Left Column: Popular Suggestions */}
                    <div className="md:col-span-7">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                        GỢI Ý TÌM KIẾM PHỔ BIẾN
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          'Viettel Cloud Server',
                          'Viettel Cloud GPU',
                          'Viettel Container Registry',
                          'Viettel Web Hosting',
                          'Viettel Private Cloud'
                        ].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setNavSearchQuery(item)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-[#EE0033] hover:text-[#EE0033] hover:bg-red-50/5 rounded-full text-[13px] font-medium text-gray-700 transition-all cursor-pointer shadow-sm hover:shadow"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Quick Links */}
                    <div className="md:col-span-5">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                        LIÊN KẾT NHANH
                      </div>
                      <div className="space-y-3.5">
                        {[
                          {
                            label: 'Xem bảng giá dịch vụ ưu đãi',
                            href: '/pricing',
                            icon: Calculator,
                            iconBg: 'bg-emerald-50 text-emerald-600',
                            external: false
                          },
                          {
                            label: 'Đăng ký tài khoản nhận tư vấn',
                            href: '/contact',
                            icon: UserCheck,
                            iconBg: 'bg-rose-50 text-[#EE0033]',
                            external: false
                          },
                          {
                            label: 'Xem tài liệu kỹ thuật IDC docs',
                            href: 'https://docs.viettelidc.com.vn',
                            icon: BookOpen,
                            iconBg: 'bg-blue-50 text-blue-600',
                            external: true
                          }
                        ].map((link, idx) => {
                          const IconComp = link.icon;
                          const content = (
                            <div className="flex items-center gap-3.5 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer transition-colors text-left">
                              <div className={`w-[36px] h-[36px] rounded-lg ${link.iconBg} flex items-center justify-center flex-shrink-0 font-bold shadow-sm`}>
                                <IconComp className="w-4.5 h-4.5" />
                              </div>
                              <span className="text-[14px] font-semibold text-gray-700 group-hover:text-[#EE0033] transition-colors">
                                {link.label}
                              </span>
                            </div>
                          );

                          return link.external ? (
                            <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="block">
                              {content}
                            </a>
                          ) : (
                            <Link key={idx} href={link.href} onClick={() => setIsSearchFocused(false)}>
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Active Search Results
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 max-h-[460px] overflow-y-auto">
                    {/* Services section */}
                    <div className="border-r border-gray-100 pr-4 text-left">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">
                        DỊCH VỤ ({searchResults.services.length})
                      </div>
                      {searchResults.services.length > 0 ? (
                        <div className="space-y-1">
                          {searchResults.services.map((item) => {
                            const CategorySlug = getCategorySlug(item.category);
                            const ProductSlug = item.slug;
                            const path = ProductSlug 
                              ? `/services/${CategorySlug}/${ProductSlug}` 
                              : `/services/${CategorySlug}`;
                            
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                href={path}
                                onClick={() => {
                                  setIsSearchFocused(false);
                                  setNavSearchQuery('');
                                }}
                                className="flex items-start gap-3.5 p-2.5 hover:bg-rose-50/10 rounded-[10px] transition-colors group"
                              >
                                <div className={`w-[36px] h-[36px] rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0 shadow-sm`}>
                                  {Icon && <Icon className="w-[18px] h-[18px]" />}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-[13.5px] font-semibold text-gray-800 group-hover:text-[#EE0033] transition-colors truncate">
                                    {item.name}
                                  </div>
                                  <div className="text-[12px] text-gray-500 truncate">{item.desc}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-left text-gray-400 text-[12.5px] py-4 px-2 italic">
                          Không tìm thấy dịch vụ nào cho &quot;{navSearchQuery}&quot;
                        </div>
                      )}
                    </div>

                    {/* Solutions section */}
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">
                        GIẢI PHÁP ({searchResults.solutions.length})
                      </div>
                      {searchResults.solutions.length > 0 ? (
                        <div className="space-y-1">
                          {searchResults.solutions.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                  setIsSearchFocused(false);
                                  setNavSearchQuery('');
                                }}
                                className="flex items-start gap-3.5 p-2.5 hover:bg-rose-50/10 rounded-[10px] transition-colors group"
                              >
                                <div className={`w-[36px] h-[36px] rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} flex-shrink-0 shadow-sm`}>
                                  {Icon && <Icon className="w-[18px] h-[18px]" />}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-[13.5px] font-semibold text-gray-800 group-hover:text-[#EE0033] transition-colors truncate">
                                    {item.name}
                                  </div>
                                  <div className="text-[12px] text-gray-500 truncate">{item.desc}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-left text-gray-400 text-[12.5px] py-4 px-2 italic">
                          Không tìm thấy giải pháp nào cho &quot;{navSearchQuery}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ━━━ TẦNG 3: MEGA DROPDOWNS ━━━ */}

          {/* MEGA DROPDOWN A — "Dịch vụ" */}
          {activeMenu === 'services' && (
            <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] max-h-[580px] overflow-y-auto animate-in fade-in slide-in-from-top-3 transition-all duration-200">
            <div className="ali-container py-[28px] flex relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1 rounded-md transition-colors">
                <X className="w-[16px] h-[16px]" />
              </button>

              {/* Sidebar */}
              <div className="w-[220px] flex-shrink-0 pr-6 border-r border-[#EBEBEB]">
                <Link 
                  href={activeCategoryA === 'Tất cả' ? '/services' : `/services/${getCategorySlug(activeCategoryA)}`} 
                  onClick={() => setActiveMenu(null)} 
                  className="text-[14px] font-bold text-[#1A1A1A] hover:text-[#EE0033] flex items-center gap-1.5 mb-4 transition-colors"
                >
                  <span>Xem tất cả dịch vụ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="relative mb-4">
                  <input
                    type="text"
                    value={serviceSearchQuery}
                    onChange={(e) => setServiceSearchQuery(e.target.value)}
                    placeholder="Tìm dịch vụ..."
                    className="w-full h-[34px] border border-[#EBEBEB] rounded-[7px] bg-gray-50 px-3 pr-8 placeholder-gray-400 text-[12px] focus:outline-none focus:border-[#EE0033] focus:bg-white transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-2.5" />
                </div>

                <div className="space-y-[1px]">
                  {serviceCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategoryA(cat); setServiceSearchQuery(''); }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-[7px] text-[13px] transition-all flex items-center gap-2 ${
                        activeCategoryA === cat 
                          ? 'bg-[#FAF5F6] text-[#EE0033] font-semibold' 
                          : 'text-[#5A5A5A] hover:bg-[#FAF5F6] hover:text-[#EE0033]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Center List Area */}
              <div className="flex-1 px-7">
                <div className="text-[10px] font-bold text-gray-400 tracking-[1.2px] uppercase mb-3.5">
                  {activeCategoryA === 'Tất cả' ? 'DỊCH VỤ NỔI BẬT' : activeCategoryA.toUpperCase()}
                </div>

                {filteredServices.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 text-xs">Không tìm thấy dịch vụ nào khớp.</div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    {/* If we are in non-Tất cả and subgroups exist, group them! */}
                    {activeCategoryA !== 'Tất cả' && serviceSearchQuery === '' ? (
                      // Renders item grouped by heading sequentially
                      (() => {
                        const subgroups: Record<string, ServiceItem[]> = {};
                        filteredServices.forEach(item => {
                          const sg = item.subgroup || 'Dịch vụ khác';
                          if (!subgroups[sg]) subgroups[sg] = [];
                          subgroups[sg].push(item);
                        });
                        return Object.entries(subgroups).map(([groupName, items]) => (
                          <div key={groupName} className="col-span-2 mb-3 last:mb-0">
                            <div className="text-[10px] font-bold text-gray-400 tracking-[1px] uppercase border-b border-[#EBEBEB] pb-1.5 mb-2">{groupName}</div>
                            <div className="grid grid-cols-2 gap-2">
                              {items.map(item => (
                                <Link
                                  key={item.name}
                                  href={getProductRoute(item, activeCategoryA)}
                                  onClick={() => setActiveMenu(null)}
                                  className="flex items-start gap-3 p-2 rounded-[8px] hover:bg-gray-50 transition-all group text-left"
                                >
                                  <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white transition-colors duration-150">
                                    <item.icon className="w-[17px] h-[17px]" />
                                  </div>
                                  <div>
                                    <h4 className="text-[13px] font-semibold text-gray-950 group-hover:text-[#EE0033] transition-colors flex items-center gap-1.5 leading-tight">
                                      <span>{item.name}</span>
                                      {item.badge && (
                                        <span className={`badge ${item.badge === 'HOT' ? 'bg-[#FEE2E2] text-[#991B1B]' : item.badge === 'NEW' ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-blue-50 text-blue-800'} text-[9.5px] font-bold px-1.5 rounded`}>
                                          {item.badge}
                                        </span>
                                      )}
                                    </h4>
                                    <p className="text-[11.5px] text-[#767676] group-hover:text-gray-900 transition-colors mt-1 leading-normal">{item.desc}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ));
                      })()
                    ) : (
                      // Flat layout for search results or Tất cả (Featured layout)
                      filteredServices.map(item => (
                        <Link
                          key={item.name}
                          href={getProductRoute(item, activeCategoryA)}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-3 p-2 rounded-[8px] hover:bg-gray-50 transition-all group text-left"
                        >
                          <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white transition-colors duration-150">
                            <item.icon className="w-[17px] h-[17px]" />
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold text-gray-950 group-hover:text-[#EE0033] transition-colors flex items-center gap-1.5 leading-tight">
                              <span>{item.name}</span>
                              {item.badge && (
                                <span className={`badge ${item.badge === 'HOT' ? 'bg-[#FEE2E2] text-[#991B1B]' : item.badge === 'NEW' ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-blue-50 text-blue-800'} text-[9.5px] font-bold px-1.5 rounded`}>
                                  {item.badge}
                                </span>
                              )}
                            </h4>
                            <p className="text-[11.5px] text-[#767676] group-hover:text-gray-900 transition-colors mt-1 leading-normal">{item.desc}</p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Right Promos */}
              <div className="w-[240px] flex-shrink-0 pl-6 border-l border-[#EBEBEB] flex flex-col gap-2.5">
                <a href="/pricing" onClick={() => setActiveMenu(null)} className="rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(140deg, #1A1A1A 0%, #EE0033 100%)' }}>
                  <Zap className="w-[22px] h-[22px] text-white mb-2" />
                  <h4 className="text-[14px] font-bold text-white">Khuyến mãi tháng 6</h4>
                  <p className="text-[11.5px] text-white/80 mt-1 leading-relaxed">Giảm 30% Cloud Server cho mọi khách hàng mới trong tháng này.</p>
                  <span className="text-[12px] font-semibold text-[#FFB3C1] mt-3.5 flex items-center gap-1">Xem ngay →</span>
                </a>

                <a href="https://docs.viettelidc.com.vn" target="_blank" rel="noreferrer" className="rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5 border border-[#FCD9D8]/20" style={{ background: 'linear-gradient(140deg, #111827 0%, #EE0033 120%)' }}>
                  <BookOpen className="w-[22px] h-[22px] text-white mb-2" />
                  <h4 className="text-[14px] font-bold text-white">Tài liệu kỹ thuật</h4>
                  <p className="text-[11.5px] text-white/80 mt-1 leading-relaxed">API guides, CLI, SDK tools và sơ đồ kiến trúc mây an toàn.</p>
                  <span className="text-[12px] font-semibold text-[#FFB3C1] mt-3.5 flex items-center gap-1">docs.viettelidc.com.vn ↗</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MEGA DROPDOWN B — "Giải pháp" */}
        {activeMenu === 'solutions' && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] max-h-[580px] overflow-y-auto animate-in fade-in transition-all duration-200">
            <div className="ali-container py-[28px] flex relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>

              <div className="w-[220px] flex-shrink-0 pr-6 border-r border-[#EBEBEB]">
                <Link href="/solutions" onClick={() => setActiveMenu(null)} className="text-[14px] font-bold text-[#1A1A1A] hover:text-[#EE0033] flex items-center gap-1.5 mb-4 transition-colors">
                  <span>Xem tất cả giải pháp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="space-y-1">
                  {solutionCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryB(cat)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-[7px] text-[13px] transition-all flex items-center gap-2 ${
                        activeCategoryB === cat 
                          ? 'bg-[#FAF5F6] text-[#EE0033] font-semibold' 
                          : 'text-[#5A5A5A] hover:bg-[#FAF5F6] hover:text-[#EE0033]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 px-8 text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5">
                  {activeCategoryB.toUpperCase()}
                </div>
                <div className="flex flex-col gap-1">
                  {(solutionsList[activeCategoryB] || []).map(sol => (
                    <Link
                      key={sol.name}
                      href={sol.href}
                      onClick={() => setActiveMenu(null)}
                      className="flex items-start gap-3.5 p-2.5 rounded-[8px] hover:bg-gray-50 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white transition-colors duration-150">
                        <sol.icon className="w-[17px] h-[17px]" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#EE0033] transition-colors">{sol.name}</h4>
                        <p className="text-[11.5px] text-[#5A5A5A] mt-0.5 leading-normal">{sol.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="w-[240px] flex-shrink-0 pl-6 border-l border-[#EBEBEB] flex flex-col gap-2.5">
                <Link href="/pricing" onClick={() => setActiveMenu(null)} className="rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(140deg, #1A1A1A 0%, #EE0033 100%)' }}>
                  <TrendingUp className="w-[22px] h-[22px] text-white mb-2" />
                  <h4 className="text-[14px] font-bold text-white">ROI Calculator</h4>
                  <p className="text-[11.5px] text-white/80 mt-1 leading-relaxed">Tính toán mức tài chính và tối ưu CAPEX/OPEX khi chuyển đổi lên Cloud.</p>
                  <span className="text-[12px] font-semibold text-[#FFB3C1] mt-3.5 flex items-center gap-1">Tính ngay →</span>
                </Link>

                <Link href="/contact" onClick={() => setActiveMenu(null)} className="rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5 border border-[#FCD9D8]/20" style={{ background: 'linear-gradient(140deg, #111827 0%, #EE0033 120%)' }}>
                  <Users className="w-[22px] h-[22px] text-white mb-2" />
                  <h4 className="text-[14px] font-bold text-white">Tư vấn miễn phí</h4>
                  <p className="text-[11.5px] text-white/80 mt-1 leading-relaxed">Chuyên viên tư vấn Viettel IDC thiết kế kiến trúc hạ tầng chuyên biệt.</p>
                  <span className="text-[12px] font-semibold text-[#FFB3C1] mt-3.5 flex items-center gap-1">Đặt lịch ngay →</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* MEGA DROPDOWN C — "Bảng giá" */}
        {activeMenu === 'pricing' && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] max-h-[580px] overflow-y-auto animate-in fade-in transition-all duration-200">
            <div className="ali-container py-[28px] flex relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>

              <div className="flex-1 pr-8 text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5">
                  BẢNG GIÁ THEO NHÓM DỊCH VỤ
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Điện toán & Container', desc: 'Bảng giá chi tiết dịch vụ Cloud Server, GPU, vOKS', path: '/pricing', icon: Cpu, bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]' },
                    { name: 'Lưu trữ & Dữ liệu', desc: 'Mức phí Object Storage, Cloud Backup, vDBS', path: '/pricing', icon: Database, bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
                    { name: 'Mạng & CDN', desc: 'Điều hướng kết nối riêng biệt, CDN, SD-WAN', path: '/pricing', icon: Network, bg: 'bg-[#CCFBF1]', text: 'text-[#0D9488]' },
                    { name: 'Bảo mật & An ninh mạng', desc: 'Trang bị Cloud Firewall, Anti-DDoS, Virtual SOC', path: '/pricing', icon: Shield, bg: 'bg-[#FAF5F6]', text: 'text-[#EE0033]' },
                    { name: 'Domain, Hosting & Email', desc: 'Báo giá đăng ký thương hiệu tên miền, Web hosting', path: '/pricing', icon: Globe, bg: 'bg-[#EBEBEB]', text: 'text-[#5A5A5A]' }
                  ].map(pItem => (
                    <Link
                      key={pItem.name}
                      href={pItem.path}
                      onClick={() => setActiveMenu(null)}
                      className="flex items-start gap-3 p-2.5 rounded-[8px] hover:bg-gray-50 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white transition-colors duration-150">
                        <pItem.icon className="w-[17px] h-[17px]" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#EE0033] transition-colors">{pItem.name}</h4>
                        <p className="text-[11.5px] text-[#767676] mt-0.5">{pItem.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="h-px bg-gray-100 my-4" />

                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5">CÔNG CỤ TÍNH GIÁ</div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/pricing" onClick={() => setActiveMenu(null)} className="flex items-start gap-3 p-3.5 bg-[#FAF5F6] border border-[#FCD9D8] hover:border-[#EE0033] rounded-[12px] transition-all group text-left">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#EE0033] shadow-sm">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#EE0033] transition-colors">Cost Calculator</h4>
                      <p className="text-[11.5px] text-[#5A5A5A] mt-1">Ước tính kinh phí theo cấu hình máy, băng thông và lưu lượng dùng.</p>
                    </div>
                  </Link>
                  
                  <Link href="/contact" onClick={() => setActiveMenu(null)} className="flex items-start gap-3 p-3.5 bg-[#FAF5F6] border border-[#FCD9D8] hover:border-[#EE0033] rounded-[12px] transition-all group text-left">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#EE0033] shadow-sm">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#EE0033] transition-colors">Báo giá Enterprise</h4>
                      <p className="text-[11.5px] text-[#5A5A5A] mt-1">Hợp đồng dài hạn cùng chính sách chiết khấu quy mô hạ tầng lớn.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* pricing-highlight right panel */}
              <div className="w-[280px] flex-shrink-0 pl-6 border-l border-[#EBEBEB]">
                <div className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-6 text-left flex flex-col justify-between h-full">
                  <div>
                    <TrendingUp className="w-7 h-7 text-[#EE0033] mb-2.5" />
                    <div className="text-[28px] font-bold text-[#EE0033] tracking-tight">40%</div>
                    <div className="text-[12px] font-bold text-gray-900 mt-1">Chi phí tiết kiệm so với on-premise</div>
                    <p className="text-[11.5px] text-gray-500 mt-3 leading-relaxed">Không phí ẩn, cam kết SLA chất lượng cao, trả tiền theo phương án pay-as-you-go thực tế.</p>
                  </div>
                  <Link href="/pricing" onClick={() => setActiveMenu(null)} className="mt-5 w-full bg-[#EE0033] text-white flex items-center justify-center h-9 rounded-[8px] text-[13px] font-bold hover:bg-[#FF302D] transition-colors">
                    Tính chi phí ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEGA DROPDOWN D — "Tài nguyên" */}
        {activeMenu === 'resources' && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] max-h-[580px] overflow-y-auto animate-in fade-in transition-all duration-200">
            <div className="ali-container py-[28px] grid grid-cols-3 gap-8 relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>

              {/* Col 1 */}
              <div className="pr-4 border-r border-[#EBEBEB] text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">TIN TỨC</div>
                <div className="space-y-3">
                  {[
                    { title: 'Tin khuyến mãi', desc: 'Ưu đãi và chiết khấu mới nhất từ Viettel IDC', icon: Zap, bg: 'bg-[#FAF5F6]', text: 'text-[#EE0033]' },
                    { title: 'Tin sự kiện', desc: 'Hội thảo trực tuyến, triển lãm công nghệ', icon: Calendar, bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
                    { title: 'Tin công nghệ', desc: 'Xu hướng đám mây mây, AI và hạ tầng số', icon: Cpu, bg: 'bg-[#CCFBF1]', text: 'text-[#0D9488]' }
                  ].map(news => (
                    <Link key={news.title} href="/services" onClick={() => setActiveMenu(null)} className="group flex gap-3 text-left">
                      <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                        <news.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">{news.title}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">{news.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="h-px bg-gray-100 my-4" />
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3">CHÍNH SÁCH & PHÁP LÝ</div>
                <div className="space-y-2">
                  <Link href="/contact" onClick={() => setActiveMenu(null)} className="flex items-center gap-2 text-[12.5px] text-gray-700 hover:text-[#EE0033] transition-colors">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>Điều khoản sử dụng dịch vụ</span>
                  </Link>
                  <Link href="/contact" onClick={() => setActiveMenu(null)} className="flex items-center gap-2 text-[12.5px] text-gray-700 hover:text-[#EE0033] transition-colors">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span>Chính sách bảo mật</span>
                  </Link>
                </div>
              </div>

              {/* Col 2 */}
              <div className="px-4 border-r border-[#EBEBEB] text-left flex flex-col gap-3">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">HỖ TRỢ KỸ THUẬT</div>
                
                <a href="https://docs.viettelidc.com.vn" target="_blank" rel="noreferrer" className="bg-[#FAF5F6] border border-[#FCD9D8] hover:border-[#EE0033] rounded-[10px] p-4 transition-all">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] flex items-center justify-center">
                      <BookOpen className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[13px] font-bold text-[#EE0033]">Tài liệu kỹ thuật ↗</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#EE0033] mt-0.5">docs.viettelidc.com.vn</div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">API Reference · SDK · CLI · Hướng dẫn triển khai · Release notes</p>
                </a>

                <a href="https://support.viettelidc.com.vn" target="_blank" rel="noreferrer" className="bg-[#FAF5F6] border border-[#FCD9D8] hover:border-[#EE0033] rounded-[10px] p-4 transition-all">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] flex items-center justify-center">
                      <Headphones className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[13px] font-bold text-[#EE0033]">Trung tâm hỗ trợ ↗</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#EE0033] mt-0.5">support.viettelidc.com.vn</div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Gửi ticket · Theo dõi sự cố · Status page hệ thống · FAQ cơ bản</p>
                </a>
              </div>

              {/* Col 3 */}
              <div className="pl-4 text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">TÀI NGUYÊN KHÁC</div>
                <div className="space-y-3.5">
                  <Link href="/services" onClick={() => setActiveMenu(null)} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033]">Case Study</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">Khám phá hành trình số hóa của các khách hàng lớn.</p>
                    </div>
                  </Link>

                  <Link href="/services" onClick={() => setActiveMenu(null)} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <Newspaper className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033]">Blog kỹ thuật</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">Chuyên luận về công nghệ cloud, container, an ninh mạng.</p>
                    </div>
                  </Link>

                  <Link href="/services" onClick={() => setActiveMenu(null)} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033]">Whitepaper</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">Báo cáo khảo sát thị trường số và kiến nghị chính sách.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEGA DROPDOWN E — "Đối tác" */}
        {activeMenu === 'partners' && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] max-h-[580px] overflow-y-auto animate-in fade-in transition-all duration-200">
            <div className="ali-container py-[28px] flex relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>

              <div className="w-[220px] flex-shrink-0 pr-6 border-r border-[#EBEBEB]">
                <Link href="/partners" onClick={() => setActiveMenu(null)} className="text-[14px] font-bold text-[#1A1A1A] hover:text-[#EE0033] flex items-center gap-1.5 mb-4 transition-colors">
                  <span>Xem tất cả đối tác</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="space-y-1">
                  {partnerCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryE(cat)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-[7px] text-[13px] transition-all flex items-center gap-2 ${
                        activeCategoryE === cat 
                          ? 'bg-[#FAF5F6] text-[#EE0033] font-semibold' 
                          : 'text-[#5A5A5A] hover:bg-[#FAF5F6] hover:text-[#EE0033]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 px-8 text-left">
                {activeCategoryE === 'Chương trình hợp tác' && (
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5">ĐĂNG KÝ HỢP TÁC</div>
                    <div className="flex flex-col gap-2">
                      {[
                        { title: 'Tổng quan chương trình đối tác', desc: 'Chính sách phân cấp Tier Reseller, Solution Partner, Pinnacle Alliance', icon: Users, bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
                        { title: 'Đăng ký hợp tác trực tuyến', desc: 'Trở thành Đại lý phần cứng, Tiếp thị mây (Affiliate) nhanh chóng', icon: UserPlus, bg: 'bg-[#F0FDF4]', text: 'text-[#15803D]' },
                        { title: 'Chính sách lợi ích và Hoa hồng', desc: 'Tỷ lệ chiết khấu hấp dẫn, hỗ trợ co-marketing, deal registration bùng nổ', icon: DollarSign, bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]' }
                      ].map(item => (
                        <Link key={item.title} href="/partners" onClick={() => setActiveMenu(null)} className="flex items-start gap-3 p-2.5 rounded-[8px] hover:bg-gray-50 transition-all group">
                          <div className="w-8 h-8 rounded-full bg-[#FAF5F6] text-[#EE0033] flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE0033] group-hover:text-white transition-colors duration-150">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold text-gray-950 group-hover:text-[#EE0033] transition-colors leading-tight">{item.title}</h4>
                            <p className="text-[11.5px] text-[#767676] mt-1 leading-normal">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {activeCategoryE === 'Pinnacle Alliance' && (
                  <div className="space-y-4">
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">VIETTEL IDC PINNACLE ALLIANCE</div>
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-[12px] p-5 flex gap-4 items-start">
                      <div className="w-[44px] h-[44px] bg-[#EE0033] rounded-[10px] flex items-center justify-center flex-shrink-0">
                        <Star className="w-[22px] h-[22px] text-white" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-white">Viettel IDC × Qualcomm</h4>
                        <p className="text-[12px] text-white/60 mt-1 leading-relaxed">Hợp tác chiến lược triển khai hạ tầng edge computing và AI tại Việt Nam. Nâng cao năng lực cạnh tranh quốc gia cực kỳ bứt phá.</p>
                        <Link href="/partners" onClick={() => setActiveMenu(null)} className="text-[12px] font-bold text-[#EE0033] hover:underline mt-2.5 block">Xem chi tiết đặc biệt →</Link>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/partners" onClick={() => setActiveMenu(null)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-[12.5px] text-gray-800 font-semibold transition-colors">
                        <Star className="w-4 h-4 text-[#EE0033]" />
                        <span>Danh sách đối tác Pinnacle</span>
                      </Link>
                      <Link href="/partners" onClick={() => setActiveMenu(null)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-[12.5px] text-gray-800 font-semibold transition-colors">
                        <Award className="w-4 h-4 text-[#D97706]" />
                        <span>Trở thành đối tác hạng Pinnacle</span>
                      </Link>
                    </div>
                  </div>
                )}

                {activeCategoryE === 'Hỗ trợ đối tác' && (
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5">HỖ TRỢ ĐỐI TÁC</div>
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/partners" onClick={() => setActiveMenu(null)} className="p-4 bg-gray-50 border border-gray-100 rounded-[12px] hover:bg-gray-100 transition-all text-left">
                        <BookOpen className="w-5 h-5 text-gray-700 mb-2" />
                        <h4 className="text-[13px] font-semibold text-[#1A1A1A]">Tài nguyên hỗ trợ bán hàng</h4>
                        <p className="text-[11.5px] text-[#767676] mt-1 leading-normal">Sales kits, brochures, tài liệu kỹ thuật mây chuyên sâu hỗ trợ thuyết trình dự án.</p>
                      </Link>

                      <a href="https://console.viettelidc.com.vn" target="_blank" rel="noreferrer" className="p-4 bg-gray-50 border border-gray-100 rounded-[12px] hover:bg-gray-100 transition-all text-left">
                        <Laptop className="w-5 h-5 text-gray-700 mb-2" />
                        <h4 className="text-[13px] font-semibold text-[#1A1A1A]">Partner Portal ↗</h4>
                        <p className="text-[11.5px] text-[#767676] mt-1 leading-normal">Cổng thông tin tự chủ dành cho đối tác quản lý cơ cấu hoa hồng, xem deal.</p>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-[240px] flex-shrink-0 pl-6 border-l border-[#EBEBEB] flex flex-col gap-2.5">
                <a href="/partners" onClick={() => setActiveMenu(null)} className="rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(140deg, #1A1A1A 0%, #EE0033 100%)' }}>
                  <UserPlus className="w-[22px] h-[22px] text-white mb-2" />
                  <h4 className="text-[14px] font-bold text-white">Xây dựng đại lý</h4>
                  <p className="text-[11.5px] text-white/80 mt-1 leading-relaxed">Gia nhập mạng lưới cung cấp hạ tầng số lớn hàng đầu toàn quốc.</p>
                  <span className="text-[12px] font-semibold text-[#FFB3C1] mt-3.5 flex items-center gap-1">Đăng ký kinh doanh →</span>
                </a>

                <a href="https://console.viettelidc.com.vn" target="_blank" rel="noreferrer" className="rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5 border border-[#FCD9D8]/20" style={{ background: 'linear-gradient(140deg, #111827 0%, #EE0033 120%)' }}>
                  <Laptop className="w-[22px] h-[22px] text-white mb-2" />
                  <h4 className="text-[14px] font-bold text-white">Partner Portal</h4>
                  <p className="text-[11.5px] text-white/80 mt-1 leading-relaxed">Cổng ghi nhận đăng ký hỗ trợ bán hàng, kiểm toán giao dịch dự phòng.</p>
                  <span className="text-[12px] font-semibold text-[#FFB3C1] mt-3.5 flex items-center gap-1">Đăng nhập cổng →</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MEGA DROPDOWN F — "Về Viettel IDC" */}
        {activeMenu === 'about' && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] max-h-[580px] overflow-y-auto animate-in fade-in transition-all duration-200">
            <div className="ali-container py-[28px] grid grid-cols-3 gap-8 relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>

              <div className="pr-4 border-r border-[#EBEBEB] text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">THƯƠNG HIỆU</div>
                <div className="space-y-4">
                  {[
                    { label: 'Câu chuyện thương hiệu', desc: 'Sứ mệnh tối thượng làm chủ hạ tầng số quốc gia', icon: Info },
                    { label: 'Chứng chỉ & Giải thưởng', desc: 'Rated 3 DC, ISO 27001, SOC 2 cam kết an ninh', icon: Award },
                    { label: 'Hạ tầng Data center', desc: 'Mạng lưới phòng máy an toàn tại HN, Đà Nẵng, TP.HCM', icon: MapPin },
                    { label: 'Trách nhiệm xã hội (CSR)', desc: 'Chiến dịch đầu tư hỗ trợ phát triển tài năng trẻ Việt', icon: Heart }
                  ].map(item => (
                    <Link key={item.label} href="/contact" onClick={() => setActiveMenu(null)} className="group flex gap-3 text-left">
                      <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-150">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">{item.label}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-4 border-r border-[#EBEBEB] text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">SỰ KIỆN & BÁO CHÍ</div>
                <div className="space-y-4">
                  {[
                    { label: 'Sự kiện sắp diễn ra', desc: 'Đăng ký tham luận trực tuyến chia sẻ mây công nghệ', icon: Calendar },
                    { label: 'Sự kiện đã hoàn tất', desc: 'Thư viện tư liệu, video diễn thuyết hạ tầng chuyên đề', icon: Clock },
                    { label: 'Thông cáo báo chí', desc: 'Báo cáo tuyên ngôn hoạt động chính thức từ hội đồng', icon: Newspaper },
                    { label: 'Cơ hội Tuyển dụng', desc: 'Gia nhập cụm kỹ sư hạ tầng hàng đầu xây mây nội địa', icon: Users }
                  ].map(item => (
                    <Link key={item.label} href="/contact" onClick={() => setActiveMenu(null)} className="group flex gap-3 text-left">
                      <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-150">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">{item.label}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* contact-card column */}
              <div className="pl-4 text-left">
                <div className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-5">
                  <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5">LIÊN HỆ KHẨN CẤP</div>
                  
                  <div className="flex items-center gap-2 text-[18px] font-extrabold text-[#EE0033] leading-none mb-4">
                    <Phone className="w-5 h-5 text-[#EE0033]" />
                    <span>1800 8088</span>
                  </div>

                  <div className="space-y-2 text-[12px] text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>sales@viettelidc.com.vn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>Hà Nội · TP.HCM · Đà Nẵng</span>
                    </div>
                  </div>

                  <div className="h-px bg-red-100 my-4" />

                  <Link href="/contact" onClick={() => setActiveMenu(null)} className="w-full text-center py-2 bg-[#EE0033] hover:bg-[#FF302D] text-white flex items-center justify-center font-bold text-[13px] rounded-[8px] transition-colors">
                    Đặt lịch tư vấn trực tiếp
                  </Link>

                  <div className="mt-3.5 text-center">
                    <Link href="/contact" onClick={() => setActiveMenu(null)} className="text-[11.5px] text-gray-400 hover:text-[#EE0033] hover:underline">hoặc để lại thông tin liên hệ ngay →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>

        {/* ━━━ MOBILE DRAWER ━━━ */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[1001] lg:hidden flex">
            <div className="fixed inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
            
            <div className="relative w-[300px] bg-white h-full z-10 flex flex-col justify-between p-6 animate-in slide-in-from-left duration-200 text-left">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <img 
                      src="https://res.cloudinary.com/dpyizq1m2/image/upload/v1782053913/logo-IDC_2_up2gqp.svg" 
                      alt="Viettel IDC" 
                      className="h-7 w-auto object-contain"
                    />
                  </Link>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-500 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="text-[11px] font-extrabold text-gray-400 tracking-wider uppercase">ĐỀ MỤC CHÍNH</div>
                  <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Dịch vụ đám mây (Cloud)
                  </Link>
                  <Link href="/solutions" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Giải pháp nghiệp vụ
                  </Link>
                  <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Bảng giá tổng quan
                  </Link>
                  <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Hệ thống Đại lý / Đối tác
                  </Link>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Yêu cầu cuộc gọi tư vấn
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <a href="https://docs.viettelidc.com.vn" target="_blank" rel="noreferrer" className="block w-full py-2 bg-gray-50 text-[12.5px] font-bold text-center border rounded-lg text-gray-700">
                  📖 Tài liệu kỹ thuật ↗
                </a>
                
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block w-full py-2 bg-[#EE0033] text-[12.5px] font-bold text-center rounded-lg text-white">
                  Đăng ký nhận tư vấn miễn phí
                </Link>
              </div>
            </div>
          </div>
        )}

      </header>
    </>
  );
}
