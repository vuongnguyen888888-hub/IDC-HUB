'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useMarket } from '../hooks/useMarket';
import { motion } from 'motion/react';
import { 
  Phone, FileText, Headphones, Globe, Search, ChevronDown, Check, ArrowRight, X, Gift, Percent,
  Cpu, Database, Server, HardDrive, Network, Lock, BookOpen, Clock, Mail, MapPin, Shield, 
  Layers, Code, Box, Smartphone, Monitor, Zap, TrendingUp, Users, Star, UserPlus, 
  DollarSign, Info, Award, Heart, Newspaper, Calendar, Menu, Trash2, Eye, Settings, Laptop, Briefcase,
  Sparkles, Calculator, UserCheck, ShoppingCart, Building2, GraduationCap, Activity, Factory
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
  'Dịch vụ nổi bật', 'Trung tâm dữ liệu', 'Điện toán & Container', 'Lưu trữ & Bảo vệ dữ liệu',
  'Nền tảng dữ liệu & Tích hợp', 'Mạng & Phân phối nội dung', 'Bảo mật & An ninh mạng',
  'Vận hành & Giám sát', 'Ứng dụng & Làm việc số', 'Dịch vụ quản lý & Tư vấn', 'Domain, Hosting & Email'
];

const servicesList: Record<string, ServiceItem[]> = {
  'Dịch vụ nổi bật': [
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

const solutionCategories = ['Hạ tầng & Cloud', 'Dev, Ops & AI', 'Kết nối & Workspace', 'Giải pháp theo ngành'];

const solutionsList: Record<string, { name: string; desc: string; icon: any; iconBg: string; iconColor: string; href: string }[]> = {
  'Hạ tầng & Cloud': [
    { name: 'Sao lưu & Dự phòng dữ liệu', desc: 'Backup tự động, DR cross-DC, RTO < 15 phút, RPO < 1 giờ', icon: Server, iconBg: 'bg-[#F0FDF4]', iconColor: 'text-[#15803D]', href: '/solutions/backup-dr' },
    { name: 'Chuyển đổi hạ tầng Cloud', desc: 'Migration toàn diện từ on-premise lên Cloud, không gián đoạn', icon: Layers, iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0369A1]', href: '/solutions/cloud-migration' },
    { name: 'Triển khai Multi-Availability Zone', desc: 'Hạ tầng HA ổn định liên tục, bảo hộ rủi ro kỹ thuật', icon: Layers, iconBg: 'bg-[#CCFBF1]', iconColor: 'text-[#0D9488]', href: '/solutions/multi-az' },
    { name: 'Viettel IaC Hub', desc: 'Tự động hóa hạ tầng thông qua Terraform templates và GitOps', icon: Code, iconBg: 'bg-[#EBEBEB]', iconColor: 'text-[#5A5A5A]', href: '/solutions/iac-hub' }
  ],
  'Dev, Ops & AI': [
    { name: 'Container & Kubernetes', desc: 'Triển khai cụm container quản trị K8s managed vOKS/vDKS', icon: Box, iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0369A1]', href: '/solutions/container' },
    { name: 'DevSecOps', desc: 'Tích hợp bảo mật tự động vào quy trình CI/CD hoàn hảo', icon: Shield, iconBg: 'bg-[#FAF5F6]', iconColor: 'text-[#EE0033]', href: '/solutions/devsecops' },
    { name: 'Giám sát & Ứng dụng AI', desc: 'Quản lý hiệu năng APM tích hợp phân tích bất thường bằng AI', icon: Cpu, iconBg: 'bg-[#FEF3C7]', iconColor: 'text-[#D97706]', href: '/solutions/monitoring-ai' },
    { name: 'Đám mây hiệu năng cao', desc: 'Cụm máy GPU NVIDIA A100/H100 phục vụ học sâu training mẫu', icon: Zap, iconBg: 'bg-[#F3E8FF]', iconColor: 'text-[#7C3AED]', href: '/solutions/hpc' }
  ],
  'Kết nối & Workspace': [
    { name: 'Mạng phân phối nội dung (CDN)', desc: 'Multi-CDN tối ưu hóa định tuyến tải web toàn quốc', icon: Globe, iconBg: 'bg-[#CCFBF1]', iconColor: 'text-[#0D9488]', href: '/solutions/cdn' },
    { name: 'Làm việc di động', desc: 'Không gian làm việc số an toàn Cloud PC, Microsoft 365', icon: Laptop, iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0369A1]', href: '/solutions/mobile-work' },
    { name: 'Xây dựng Website', desc: 'Gói trọn bộ Web Hosting, SSD, tên miền SSL tin cậy', icon: Monitor, iconBg: 'bg-[#F0FDF4]', iconColor: 'text-[#15803D]', href: '/solutions/website' }
  ],
  'Giải pháp theo ngành': [
    { name: 'Tài chính - Ngân hàng (Fintech & Banking)', desc: 'Đáp ứng tiêu chuẩn bảo mật khắt khe PCI-DSS, kiến trúc hybrid mây bảo mật tối đa', icon: DollarSign, iconBg: 'bg-[#FAF5F6]', iconColor: 'text-[#EE0033]', href: '/solutions/fintech' },
    { name: 'Thương mại điện tử & Bán lẻ (Retail & E-commerce)', desc: 'Hạ tầng chịu tải lớn, tự động co giãn (auto-scaling) mượt mà các dịp Sale lớn', icon: ShoppingCart, iconBg: 'bg-[#F0FDF4]', iconColor: 'text-[#15803D]', href: '/solutions/ecommerce' },
    { name: 'Y tế số (HealthTech & PACS Cloud)', desc: 'Lưu trữ hồ sơ PACS dung lượng siêu lớn, truyền tải nhanh, chuẩn hóa kết nối y khoa', icon: Activity, iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0369A1]', href: '/solutions/healthtech' },
    { name: 'Giáo dục trực tuyến (EdTech & LMS)', desc: 'Phát trực tuyến bài giảng không độ trễ, lưu trữ quản lý tài nguyên học tập linh hoạt', icon: GraduationCap, iconBg: 'bg-[#FEF3C7]', iconColor: 'text-[#D97706]', href: '/solutions/edtech' },
    { name: 'Chính phủ số & Hành chính công', desc: 'Hạ tầng mây dùng riêng đạt chứng chỉ an toàn thông tin cấp độ 4 cho cơ quan bộ ngành', icon: Building2, iconBg: 'bg-[#EBEBEB]', iconColor: 'text-[#5A5A5A]', href: '/solutions/digital-gov' },
    { name: 'Sản xuất thông minh & IoT Logistics', desc: 'Nền tảng kết nối IoT biên, phân tích hiệu năng dây chuyền và chuỗi cung ứng thực tế', icon: Factory, iconBg: 'bg-[#F3E8FF]', iconColor: 'text-[#7C3AED]', href: '/solutions/smart-manufacturing' }
  ]
};

const partnerCategories = ['Chương trình hợp tác', 'Pinnacle Alliance', 'Viettelidc x Qualcomm'];

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
  if (nameLower.includes('dedicated private cloud')) return 'viettel-dedicated-private-cloud';
  if (nameLower.includes('open private cloud')) return 'viettel-open-private-cloud';
  if (nameLower.includes('virtual private cloud') || nameLower.includes('vpc')) return 'viettel-virtual-private-cloud';
  if (nameLower.includes('private cloud')) return 'viettel-private-cloud';
  if (nameLower.includes('cloud gpu')) return 'viettel-cloud-gpu';
  if (nameLower.includes('cloud npu')) return 'viettel-cloud-npu';
  if (nameLower.includes('server (vm)') || (nameLower.includes('server') && !nameLower.includes('gpu') && !nameLower.includes('leasing'))) return 'viettel-cloud-server';
  if (nameLower.includes('dedicated kubernetes')) return 'viettel-dedicated-kubernetes-service-vdks';
  if (nameLower.includes('open kubernetes') || nameLower.includes('voks')) return 'viettel-open-kubernetes-service-voks';
  if (nameLower.includes('kubernetes')) return 'viettel-kubernetes';
  if (nameLower.includes('gpu') && nameLower.includes('server')) return 'viettel-gpu-server';
  if (nameLower.includes('colocation') || nameLower.includes('chỗ đặt')) return 'viettel-colocation';
  
  // Clean slugify for other services
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
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
  const catSlug = getCategorySlug(activeCat === 'Dịch vụ nổi bật' ? getProductCategoryName(item.name) : activeCat);
  const prodSlug = getProductSlug(item.name);
  if (prodSlug) {
    return `/services/${catSlug}/${prodSlug}`;
  }
  return `/services/${catSlug}`;
};

export default function Navbar({ forceServicesOpen = false, forceMobileDrawer = false }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const { market, isGlobal, getLocalizedPath } = useMarket();
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeCategoryA, setActiveCategoryA] = useState('Dịch vụ nổi bật');
  const [activeCategoryB, setActiveCategoryB] = useState('Hạ tầng & Cloud');
  const [activeCategoryE, setActiveCategoryE] = useState('Chương trình hợp tác');
  
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(isGlobal ? 'Singapore' : 'Việt Nam');
  const [prevIsGlobal, setPrevIsGlobal] = useState(isGlobal);
  if (isGlobal !== prevIsGlobal) {
    setPrevIsGlobal(isGlobal);
    setCurrentLang(isGlobal ? 'Singapore' : 'Việt Nam');
  }

  const [serviceSearchQuery, setServiceSearchQuery] = useState('');

  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Gather all services
  const allServices = React.useMemo(() => {
    const list: { name: string; desc: string; category: string; slug: string | null; icon: any; iconBg: string; iconColor: string }[] = [];
    Object.entries(servicesList).forEach(([category, items]) => {
      if (category === 'Dịch vụ nổi bật') return;
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
        <div className="h-[36px] bg-[#1A1A1A] text-white text-[12px] relative z-[1010] flex items-center border-b border-white/5">
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
                            
                            // Extract sub-route and navigate to localized market path
                            let subRoute = pathname || '/';
                            subRoute = subRoute.replace(/^\/(vn|global)/, '');
                            if (subRoute === '') subRoute = '/';
                            
                            if (item.name === 'Việt Nam') {
                              router.push(`/vn${subRoute === '/' ? '' : subRoute}`);
                            } else {
                              router.push(`/global${subRoute === '/' ? '' : subRoute}`);
                            }
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
                href={isGlobal ? "/global" : "/vn"} 
                className="flex items-center gap-2 flex-shrink-0" 
                onClick={() => setActiveMenu(null)}
                onMouseEnter={() => setActiveMenu(null)}
              >
                <Image 
                  src="https://res.cloudinary.com/dpyizq1m2/image/upload/v1782053913/logo-IDC_2_up2gqp.svg" 
                  alt="Viettel IDC" 
                  width={152}
                  height={38}
                  className="h-[38px] w-auto object-contain"
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
                  { label: 'Về Viettel IDC', key: 'about' },
                  { label: 'Khuyến mại', key: 'promotions' }
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => handleL1Click(item.key)}
                    onMouseEnter={() => setActiveMenu(item.key)}
                    className={`h-full flex items-center px-1.5 lg:px-2 text-[14px] lg:text-[14.5px] font-normal transition-all duration-150 cursor-pointer border-b-2 hover:text-[#EE0033] whitespace-nowrap flex-shrink-0 ${
                      activeMenu === item.key ? 'text-[#EE0033] border-[#EE0033]' : 'text-[#344054] border-transparent'
                    }`}
                  >
                    <span className="whitespace-nowrap flex items-center gap-0.5">
                      <span>{item.label}</span>
                      {item.key === 'promotions' && (
                        <motion.span
                          animate={{
                            rotate: [0, -12, 12, -12, 12, 0],
                          }}
                          whileHover={{ scale: 1.15 }}
                          transition={{
                            rotate: {
                              duration: 1.2,
                              repeat: Infinity,
                              repeatDelay: 2.5,
                              ease: "easeInOut"
                            },
                            scale: {
                              duration: 0.15
                            }
                          }}
                          className="inline-flex text-[#EE0033] ml-0.5 flex-shrink-0 cursor-pointer"
                        >
                          <Gift className="w-[19px] h-[19px]" />
                        </motion.span>
                      )}
                    </span>
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
              <Link href={getLocalizedPath('/contact')} className="bg-[#EE0033] text-white h-[36px] px-4 rounded-[8px] text-[14px] font-semibold hover:bg-[#FF302D] flex items-center justify-center transition-all whitespace-nowrap flex-shrink-0">
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
                            <Link key={idx} href={getLocalizedPath(link.href)} onClick={() => setIsSearchFocused(false)}>
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
                                href={getLocalizedPath(path)}
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
                                href={getLocalizedPath(item.href)}
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
            <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] animate-in fade-in slide-in-from-top-3 transition-all duration-200">
            <div className="ali-container py-[28px] flex relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1 rounded-md transition-colors">
                <X className="w-[16px] h-[16px]" />
              </button>

              {/* Sidebar */}
              <div className="w-[220px] flex-shrink-0 pr-6 border-r border-[#EBEBEB]">
                <Link 
                  href={getLocalizedPath(activeCategoryA === 'Dịch vụ nổi bật' ? '/services' : `/services/${getCategorySlug(activeCategoryA)}`)} 
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

                <div className="space-y-[4px]">
                  {serviceCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategoryA(cat); setServiceSearchQuery(''); }}
                      onMouseEnter={() => { setActiveCategoryA(cat); setServiceSearchQuery(''); }}
                      className={`w-full text-left py-2 px-3 rounded-[7px] text-[13px] transition-all flex items-center gap-2 ${
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
              <div className="flex-1 px-7 max-h-[460px] overflow-y-auto custom-scrollbar pr-3">
                <div className="text-[10px] font-bold text-gray-400 tracking-[1.2px] uppercase mb-3.5">
                  {activeCategoryA === 'Dịch vụ nổi bật' ? 'DỊCH VỤ NỔI BẬT' : activeCategoryA.toUpperCase()}
                </div>

                {filteredServices.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 text-xs">Không tìm thấy dịch vụ nào khớp.</div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                    {/* If we are in non-Dịch vụ nổi bật and subgroups exist, group them! */}
                    {activeCategoryA !== 'Dịch vụ nổi bật' && serviceSearchQuery === '' ? (
                      // Renders item grouped by heading sequentially
                      (() => {
                        const subgroups: Record<string, ServiceItem[]> = {};
                        filteredServices.forEach(item => {
                          const sg = item.subgroup || 'Dịch vụ khác';
                          if (!subgroups[sg]) subgroups[sg] = [];
                          subgroups[sg].push(item);
                        });
                        return Object.entries(subgroups).map(([groupName, items]) => (
                          <div key={groupName} className="col-span-2 mb-5 last:mb-0">
                            <div className="text-[10px] font-bold text-gray-400 tracking-[1px] uppercase border-b border-[#EBEBEB] pb-2 mb-3">{groupName}</div>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                              {items.map(item => (
                                <Link
                                  key={item.name}
                                  href={getLocalizedPath(getProductRoute(item, activeCategoryA))}
                                  onClick={() => setActiveMenu(null)}
                                  className="flex items-start gap-3.5 p-2.5 rounded-[8px] hover:bg-gray-50 transition-all group text-left"
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
                          href={getLocalizedPath(getProductRoute(item, activeCategoryA))}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-3.5 p-2.5 rounded-[8px] hover:bg-gray-50 transition-all group text-left"
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
                <Link href={getLocalizedPath('/pricing')} onClick={() => setActiveMenu(null)} className="rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(140deg, #1A1A1A 0%, #EE0033 100%)' }}>
                  <Zap className="w-[22px] h-[22px] text-white mb-2" />
                  <h4 className="text-[14px] font-bold text-white">Khuyến mãi tháng 6</h4>
                  <p className="text-[11.5px] text-white/80 mt-1 leading-relaxed">Giảm 30% Cloud Server cho mọi khách hàng mới trong tháng này.</p>
                  <span className="text-[12px] font-semibold text-[#FFB3C1] mt-3.5 flex items-center gap-1">Xem ngay →</span>
                </Link>

                <a href="https://docs.viettelidc.com.vn" target="_blank" rel="noreferrer" className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5">
                  <BookOpen className="w-[22px] h-[22px] text-[#EE0033] mb-2" />
                  <h4 className="text-[14px] font-bold text-gray-950">Tài liệu kỹ thuật</h4>
                  <p className="text-[11.5px] text-gray-700 mt-1 leading-relaxed">API guides, CLI, SDK tools và sơ đồ kiến trúc mây an toàn.</p>
                  <span className="text-[12px] font-bold text-[#EE0033] mt-3.5 flex items-center gap-1">docs.viettelidc.com.vn ↗</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MEGA DROPDOWN B — "Giải pháp" */}
        {activeMenu === 'solutions' && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] animate-in fade-in transition-all duration-200">
            <div className="ali-container py-[28px] flex relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>

              <div className="w-[220px] flex-shrink-0 pr-6 border-r border-[#EBEBEB]">
                <div className="space-y-[4px]">
                  {solutionCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryB(cat)}
                      onMouseEnter={() => setActiveCategoryB(cat)}
                      className={`w-full text-left py-2 px-3 rounded-[7px] text-[13px] transition-all flex items-center gap-2 ${
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

              <div className="flex-1 px-8 text-left max-h-[460px] overflow-y-auto custom-scrollbar pr-3">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">
                  {activeCategoryB.toUpperCase()}
                </div>
                <div className="flex flex-col gap-2.5">
                  {(solutionsList[activeCategoryB] || []).map(sol => (
                    <Link
                      key={sol.name}
                      href={getLocalizedPath(sol.href)}
                      onClick={() => setActiveMenu(null)}
                      className="flex items-start gap-4 p-3 rounded-[8px] hover:bg-gray-50 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white transition-colors duration-150">
                        <sol.icon className="w-[17px] h-[17px]" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#EE0033] transition-colors">{sol.name}</h4>
                        <p className="text-[11.5px] text-[#5A5A5A] mt-1 leading-normal">{sol.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="w-[240px] flex-shrink-0 pl-6 border-l border-[#EBEBEB] flex flex-col gap-2.5">
                <Link href={getLocalizedPath('/pricing')} onClick={() => setActiveMenu(null)} className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5">
                  <TrendingUp className="w-[22px] h-[22px] text-[#EE0033] mb-2" />
                  <h4 className="text-[14px] font-bold text-gray-950">ROI Calculator</h4>
                  <p className="text-[11.5px] text-gray-750 mt-1 leading-relaxed">Tính toán mức tài chính và tối ưu CAPEX/OPEX khi chuyển đổi lên Cloud.</p>
                  <span className="text-[12px] font-bold text-[#EE0033] mt-3.5 flex items-center gap-1">Tính ngay →</span>
                </Link>

                <Link href={getLocalizedPath('/contact')} onClick={() => setActiveMenu(null)} className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5">
                  <Users className="w-[22px] h-[22px] text-[#EE0033] mb-2" />
                  <h4 className="text-[14px] font-bold text-gray-950">Tư vấn miễn phí</h4>
                  <p className="text-[11.5px] text-gray-750 mt-1 leading-relaxed">Chuyên viên tư vấn Viettel IDC thiết kế kiến trúc hạ tầng chuyên biệt.</p>
                  <span className="text-[12px] font-bold text-[#EE0033] mt-3.5 flex items-center gap-1">Đặt lịch ngay →</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* MEGA DROPDOWN C — "Bảng giá" */}
        {activeMenu === 'pricing' && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] animate-in fade-in transition-all duration-200">
            <div className="ali-container py-[28px] relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-12 gap-8 w-full">
                {/* Left Side: Dịch vụ nổi bật (Col span 8) */}
                <div className="col-span-8 pr-4 text-left border-r border-[#EBEBEB]">
                  <div className="text-[10px] font-bold text-[#EE0033] tracking-wider uppercase mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#EE0033]" />
                    DỊCH VỤ NỔI BẬT
                  </div>
                  
                  <div className="max-h-[360px] overflow-y-auto pr-3 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                      {[
                        { name: 'Viettel Cloud Server', desc: 'Máy chủ ảo hiệu năng cao, SSD Enterprise', path: '/pricing', icon: Server, badge: 'HOT' },
                        { name: 'Viettel Virtual Private Cloud', desc: 'Mạng đám mây riêng dùng độc lập, bảo mật', path: '/pricing', icon: Layers },
                        { name: 'Viettel Cloud GPU', desc: 'Xử lý tăng tốc AI, Deep Learning đồ họa', path: '/pricing', icon: Cpu },
                        { name: 'Thuê chỗ đặt thiết bị Colocation', desc: 'Chỗ đặt máy chủ chuẩn Tier III toàn quốc', path: '/pricing', icon: HardDrive },
                        { name: 'Viettel Cloud Object Storage', desc: 'Lưu trữ đối tượng tương thích S3 vô hạn', path: '/pricing', icon: Database },
                        { name: 'Viettel Cloud File Storage', desc: 'Lưu trữ tệp tin chia sẻ hiệu năng cao', path: '/pricing', icon: Box },
                        { name: 'Viettel Cloud DR (Disaster Recovery - DRaaS)', desc: 'Sao lưu phục hồi thảm họa tự động', path: '/pricing', icon: Clock },
                        { name: 'Viettel Cloud Migration', desc: 'Chuyển đổi hạ tầng lên mây an toàn', path: '/pricing', icon: TrendingUp },
                        { name: 'Viettel Cloudrity (vCloudrity)', desc: 'Bảo mật website & quét lỗ hổng thông tin', path: '/pricing', icon: Shield },
                        { name: 'Viettel Cloud Firewall', desc: 'Tường lửa thế hệ mới ngăn chặn xâm nhập', path: '/pricing', icon: Lock },
                        { name: 'Viettel Endpoint Security', desc: 'Phòng chống mã độc, bảo mật điểm cuối', path: '/pricing', icon: Laptop },
                        { name: 'Viettel Virtual SOC', desc: 'Giám sát an ninh mạng thế hệ mới 24/7', path: '/pricing', icon: Eye },
                        { name: 'Viettel Anti-DDoS', desc: 'Chống tấn công từ chối dịch vụ băng rộng', path: '/pricing', icon: Zap },
                        { name: 'Viettel CWAF', desc: 'Bảo vệ ứng dụng web và API chuyên sâu', path: '/pricing', icon: Shield },
                        { name: 'Viettel Cyber Security Maturity Program (vCSMP)', desc: 'Đánh giá mức độ trưởng thành an ninh mạng', path: '/pricing', icon: Award },
                        { name: 'Viettel Open Kubernetes Service (vOKS)', desc: 'Quản lý container tự động mở rộng', path: '/pricing', icon: Code }
                      ].map(pItem => (
                        <Link
                          key={pItem.name}
                          href={getLocalizedPath(pItem.path)}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-3 p-2 rounded-[8px] hover:bg-gray-50 transition-all group"
                        >
                          <div className="w-8.5 h-8.5 rounded-[8px] flex items-center justify-center flex-shrink-0 bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white transition-colors duration-150">
                            <pItem.icon className="w-[16px] h-[16px]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-[12.5px] font-semibold text-[#1A1A1A] group-hover:text-[#EE0033] transition-colors truncate">{pItem.name}</h4>
                              {pItem.badge && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold bg-[#FAF5F6] text-[#EE0033] border border-[#FCD9D8]">
                                  {pItem.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#767676] mt-0.5 leading-normal line-clamp-1">{pItem.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 my-5" />

                  {/* Nút xem tất cả dịch vụ */}
                  <div className="flex justify-start pl-1">
                    <Link
                      href={getLocalizedPath('/pricing')}
                      onClick={() => setActiveMenu(null)}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#EE0033] hover:text-[#FF302D] hover:underline"
                    >
                      <span>Xem tất cả bảng giá & dịch vụ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Công cụ tính giá & Liên hệ báo giá (Col span 4) */}
                <div className="col-span-4 text-left flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">
                      ƯỚC TÍNH CHI PHÍ & LIÊN HỆ
                    </div>

                    <div className="space-y-3.5">
                      {/* Công cụ tính giá */}
                      <Link 
                        href={getLocalizedPath('/pricing/calculator')} 
                        onClick={() => setActiveMenu(null)} 
                        className="flex items-start gap-3.5 p-4 bg-white border border-gray-100 hover:border-[#EE0033] hover:shadow-[0_8px_16px_rgba(238,0,51,0.04)] rounded-[12px] transition-all group text-left block"
                      >
                        <div className="w-9 h-9 rounded-[8px] bg-[#FEF3C7] text-[#D97706] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                          <Calculator className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-[#1A1A1A] group-hover:text-[#EE0033] transition-colors flex items-center gap-1">
                            Công cụ tính giá
                            <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded">Mới</span>
                          </h4>
                          <p className="text-[11.5px] text-[#5A5A5A] mt-1 leading-relaxed">Ước tính kinh phí tức thì dựa trên cấu hình máy chủ, băng thông và bộ nhớ lưu trữ thực tế.</p>
                          <span className="text-[11.5px] font-semibold text-[#EE0033] mt-2 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">Thử tính ngay &rarr;</span>
                        </div>
                      </Link>

                      {/* Liên hệ báo giá */}
                      <Link 
                        href={getLocalizedPath('/contact')} 
                        onClick={() => setActiveMenu(null)} 
                        className="flex items-start gap-3.5 p-4 bg-white border border-gray-100 hover:border-[#EE0033] hover:shadow-[0_8px_16px_rgba(238,0,51,0.04)] rounded-[12px] transition-all group text-left block"
                      >
                        <div className="w-9 h-9 rounded-[8px] bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                          <Mail className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-[#1A1A1A] group-hover:text-[#EE0033] transition-colors">Liên hệ báo giá riêng</h4>
                          <p className="text-[11.5px] text-[#5A5A5A] mt-1 leading-relaxed">Nhận thiết kế phương án hạ tầng chuyên biệt và chính sách ưu đãi quy mô Enterprise.</p>
                          <span className="text-[11.5px] font-semibold text-[#EE0033] mt-2 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">Gửi yêu cầu báo giá &rarr;</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Elegant bottom banner or info */}
                  <div className="bg-[#FAF5F6] border border-[#FCD9D8]/60 rounded-[10px] p-3.5 mt-4 text-[11.5px] text-[#5A5A5A] leading-relaxed">
                    Đảm bảo tối ưu hóa chi phí đến <strong className="text-[#EE0033]">40%</strong> so với tự vận hành, hỗ trợ kỹ thuật <strong className="text-gray-900">24/7/365</strong> từ đội ngũ chuyên gia Viettel.
                  </div>
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

              {/* Col 1: Tin tức */}
              <div className="pr-4 border-r border-[#EBEBEB] text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">TIN TỨC</div>
                <div className="space-y-4">
                  {[
                    { title: 'Tin sự kiện', desc: 'Hội thảo trực tuyến, triển lãm công nghệ', icon: Calendar },
                    { title: 'Tin công nghệ', desc: 'Xu hướng đám mây, AI và hạ tầng số', icon: Cpu }
                  ].map(news => (
                    <Link key={news.title} href={getLocalizedPath('/resources')} onClick={() => setActiveMenu(null)} className="group flex gap-3.5 text-left p-1 rounded-[6px] hover:bg-gray-50/50 transition-all">
                      <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                        <news.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">{news.title}</h4>
                        <p className="text-[11px] text-gray-400 mt-1 leading-normal">{news.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Col 2: Tri thức chuyên sâu */}
              <div className="px-4 border-r border-[#EBEBEB] text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">TRI THỨC CHUYÊN SÂU</div>
                <div className="space-y-4">
                  <Link href={getLocalizedPath('/resources')} onClick={() => setActiveMenu(null)} className="flex items-start gap-3.5 group p-1 rounded-[6px] hover:bg-gray-50/50 transition-all">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">Case Study</h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-normal">Khám phá hành trình số hóa của các khách hàng lớn.</p>
                    </div>
                  </Link>

                  <Link href={getLocalizedPath('/resources')} onClick={() => setActiveMenu(null)} className="flex items-start gap-3.5 group p-1 rounded-[6px] hover:bg-gray-50/50 transition-all">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <Newspaper className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">Blog kỹ thuật</h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-normal">Chuyên luận về công nghệ cloud, container, an ninh mạng.</p>
                    </div>
                  </Link>

                  <Link href={getLocalizedPath('/resources')} onClick={() => setActiveMenu(null)} className="flex items-start gap-3.5 group p-1 rounded-[6px] hover:bg-gray-50/50 transition-all">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">Whitepaper</h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-normal">Báo cáo khảo sát thị trường số và kiến nghị chính sách.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Col 3: Hướng dẫn & Tài liệu */}
              <div className="pl-4 text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">TÀI LIỆU KỸ THUẬT</div>
                
                <a href="https://docs.viettelidc.com.vn" target="_blank" rel="noreferrer" className="bg-[#FAF5F6] border border-[#FCD9D8] hover:border-[#EE0033] rounded-[10px] p-4 transition-all block mb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] flex items-center justify-center">
                      <BookOpen className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[13px] font-bold text-[#EE0033]">Tài liệu kỹ thuật ↗</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#EE0033] mt-0.5">docs.viettelidc.com.vn</div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">API Reference · SDK · CLI · Hướng dẫn triển khai · Release notes</p>
                </a>

                <div className="text-[11.5px] text-[#5A5A5A] leading-relaxed bg-gray-50 p-3 rounded-[8px] border border-gray-100/80">
                  Hệ thống tài liệu hướng dẫn kỹ thuật chi tiết giúp tối ưu hóa việc quản lý và phát triển trên nền tảng đám mây Viettel IDC.
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
                <Link href={getLocalizedPath('/partners')} onClick={() => setActiveMenu(null)} className="text-[14px] font-bold text-[#1A1A1A] hover:text-[#EE0033] flex items-center gap-1.5 mb-4 transition-colors">
                  <span>Xem tất cả đối tác</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="space-y-[4px]">
                  {partnerCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryE(cat)}
                      onMouseEnter={() => setActiveCategoryE(cat)}
                      className={`w-full text-left py-2 px-3 rounded-[7px] text-[13px] transition-all flex items-center gap-2 ${
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
                    <div className="flex flex-col gap-3">
                      {[
                        { title: 'Đăng ký trở thành đối tác', desc: 'Chính sách phân cấp hợp tác dành cho các Reseller, Solution Partner chuyên nghiệp.', icon: Users },
                        { title: 'Đăng ký trở thành đại lý', desc: 'Trở thành đại lý phân phối hạ tầng số, Cloud và Colocation chuẩn Tier III.', icon: UserPlus },
                        { title: 'Đăng ký chương trình affiliate', desc: 'Tiếp thị liên kết mây, chia sẻ liên kết nhận hoa hồng trực tuyến nhanh chóng.', icon: DollarSign }
                      ].map(item => (
                        <Link key={item.title} href={getLocalizedPath('/partners')} onClick={() => setActiveMenu(null)} className="flex items-start gap-4 p-3 rounded-[8px] hover:bg-gray-50 transition-all group">
                          <div className="w-8 h-8 rounded-full bg-[#FAF5F6] text-[#EE0033] flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE0033] group-hover:text-white transition-colors duration-150">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold text-gray-950 group-hover:text-[#EE0033] transition-colors leading-tight">{item.title}</h4>
                            <p className="text-[11.5px] text-[#767676] mt-1.5 leading-normal">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {activeCategoryE === 'Pinnacle Alliance' && (
                  <div className="space-y-4">
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">VIETTEL IDC PINNACLE ALLIANCE</div>
                    <div className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-5 flex gap-4 items-start">
                      <div className="w-[44px] h-[44px] bg-[#EE0033] rounded-[10px] flex items-center justify-center flex-shrink-0 text-white">
                        <Award className="w-[22px] h-[22px]" />
                      </div>
                      <div>
                        <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                          Viettel IDC chính thức triển khai chương trình Viettel IDC Pinnacle Alliance - mô hình hợp tác chiến lược dành cho các nhà cung cấp dịch vụ đám mây (CSPs), các nhà tích hợp hệ thống (SI), nhà cung cấp dịch vụ quản lý (MSP), nhà phát triển phần mềm (ISV), các đơn vị cung cấp hạ tầng tại khu vực và quốc tế.{' '}
                          <Link href={getLocalizedPath('/partners')} onClick={() => setActiveMenu(null)} className="text-[#EE0033] font-bold hover:underline">
                            xem thêm.
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeCategoryE === 'Viettelidc x Qualcomm' && (
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5">VIETTEL IDC × QUALCOMM</div>
                    <div className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-5 flex gap-4 items-start text-left">
                      <div className="w-[44px] h-[44px] bg-[#EE0033] rounded-[10px] flex items-center justify-center flex-shrink-0 text-white">
                        <Cpu className="w-[22px] h-[22px]" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-950">Hợp tác chiến lược Viettel IDC & Qualcomm</h4>
                        <p className="text-[13px] text-gray-700 mt-1 leading-relaxed font-medium">
                          Hợp tác chiến lược triển khai hạ tầng edge computing và AI tại Việt Nam. Nâng cao năng lực cạnh tranh quốc gia cực kỳ bứt phá, phát triển hệ sinh thái AI Edge, camera thông minh, các giải pháp đô thị thông minh và hạ tầng điện toán đám mây biên cao cấp.{' '}
                          <Link href={getLocalizedPath('/partners')} onClick={() => setActiveMenu(null)} className="text-[#EE0033] font-bold hover:underline mt-1.5 block">Xem chi tiết đặc biệt →</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-[240px] flex-shrink-0 pl-6 border-l border-[#EBEBEB] flex flex-col gap-2.5">
                <Link href={getLocalizedPath('/partners')} onClick={() => setActiveMenu(null)} className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5">
                  <BookOpen className="w-[22px] h-[22px] text-[#EE0033] mb-2" />
                  <h4 className="text-[14px] font-bold text-gray-950">Tài nguyên hỗ trợ bán hàng</h4>
                  <p className="text-[11.5px] text-gray-700 mt-1 leading-relaxed">Sales kits, brochures, tài liệu kỹ thuật mây chuyên sâu hỗ trợ thuyết trình dự án.</p>
                  <span className="text-[12px] font-bold text-[#EE0033] mt-3.5 flex items-center gap-1">Tải tài liệu ngay →</span>
                </Link>

                <a href="https://console.viettelidc.com.vn" target="_blank" rel="noreferrer" className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-[18px] text-left transition-transform hover:-translate-y-0.5">
                  <Laptop className="w-[22px] h-[22px] text-[#EE0033] mb-2" />
                  <h4 className="text-[14px] font-bold text-gray-950">Partner Portal</h4>
                  <p className="text-[11.5px] text-gray-700 mt-1 leading-relaxed">Cổng ghi nhận đăng ký hỗ trợ bán hàng, kiểm toán giao dịch dự phòng.</p>
                  <span className="text-[12px] font-bold text-[#EE0033] mt-3.5 flex items-center gap-1">Đăng nhập cổng →</span>
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
                <div className="space-y-4.5">
                  {[
                    { label: 'Câu chuyện thương hiệu', desc: 'Sứ mệnh tối thượng làm chủ hạ tầng số quốc gia', icon: Info },
                    { label: 'Chứng chỉ & Giải thưởng', desc: 'Rated 3 DC, ISO 27001, SOC 2 cam kết an ninh', icon: Award },
                    { label: 'Hạ tầng Data center', desc: 'Mạng lưới phòng máy an toàn tại HN, Đà Nẵng, TP.HCM', icon: MapPin },
                    { label: 'Trách nhiệm xã hội (CSR)', desc: 'Chiến dịch đầu tư hỗ trợ phát triển tài năng trẻ Việt', icon: Heart }
                  ].map(item => (
                    <Link key={item.label} href={getLocalizedPath('/about')} onClick={() => setActiveMenu(null)} className="group flex gap-3.5 text-left p-1 rounded-[6px] hover:bg-gray-50/50 transition-all">
                      <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-150">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">{item.label}</h4>
                        <p className="text-[11px] text-gray-400 mt-1 leading-normal">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-4 border-r border-[#EBEBEB] text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">SỰ KIỆN & BÁO CHÍ</div>
                <div className="space-y-4.5">
                  {[
                    { label: 'Sự kiện sắp diễn ra', desc: 'Đăng ký tham luận trực tuyến chia sẻ mây công nghệ', icon: Calendar },
                    { label: 'Sự kiện đã hoàn tất', desc: 'Thư viện tư liệu, video diễn thuyết hạ tầng chuyên đề', icon: Clock },
                    { label: 'Thông cáo báo chí', desc: 'Báo cáo tuyên ngôn hoạt động chính thức từ hội đồng', icon: Newspaper },
                    { label: 'Cơ hội Tuyển dụng', desc: 'Gia nhập cụm kỹ sư hạ tầng hàng đầu xây mây nội địa', icon: Users }
                  ].map(item => (
                    <Link key={item.label} href={getLocalizedPath('/about')} onClick={() => setActiveMenu(null)} className="group flex gap-3.5 text-left p-1 rounded-[6px] hover:bg-gray-50/50 transition-all">
                      <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-150">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">{item.label}</h4>
                        <p className="text-[11px] text-gray-400 mt-1 leading-normal">{item.desc}</p>
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

                  <Link href={getLocalizedPath('/contact')} onClick={() => setActiveMenu(null)} className="w-full text-center py-2 bg-[#EE0033] hover:bg-[#FF302D] text-white flex items-center justify-center font-bold text-[13px] rounded-[8px] transition-colors">
                    Đặt lịch tư vấn trực tiếp
                  </Link>

                  <div className="mt-3.5 text-center">
                    <Link href={getLocalizedPath('/contact')} onClick={() => setActiveMenu(null)} className="text-[11.5px] text-gray-400 hover:text-[#EE0033] hover:underline">hoặc để lại thông tin liên hệ ngay →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEGA DROPDOWN G — "Khuyến mại" */}
        {activeMenu === 'promotions' && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-[#EBEBEB] border-b border-[#EBEBEB] shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[99] max-h-[580px] overflow-y-auto animate-in fade-in transition-all duration-200">
            <div className="ali-container py-[28px] grid grid-cols-3 gap-8 relative">
              <button onClick={() => setActiveMenu(null)} className="absolute top-4 right-6 text-gray-400 hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>

              <div className="pr-4 border-r border-[#EBEBEB] text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">CHƯƠNG TRÌNH NỔI BẬT</div>
                <div className="space-y-4.5">
                  {[
                    { label: 'Đại tiệc Cloud Server', desc: 'Nhận ngay coupon giảm 35% cho tất cả gói VM khởi tạo mới', icon: Sparkles, badge: 'HOT' },
                    { label: 'Mừng tuổi mây vàng', desc: 'Tặng thêm lên đến 6 tháng sử dụng dịch vụ lưu trữ dữ liệu', icon: Gift, badge: 'NEW' },
                    { label: 'Ưu đãi chuyển đổi hạ tầng', desc: 'Miễn phí chuyển vùng từ các nhà cung cấp khác về Viettel IDC', icon: Zap },
                    { label: 'Đồng hành cùng Start-up', desc: 'Gói hỗ trợ hạ tầng mây lên tới 50.000.000đ cho DN mới thành lập', icon: Award }
                  ].map(item => (
                    <Link key={item.label} href={getLocalizedPath('/promotions')} onClick={() => setActiveMenu(null)} className="group flex gap-3.5 text-left p-1 rounded-[6px] hover:bg-gray-50/50 transition-all">
                      <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] group-hover:bg-[#EE0033] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-150">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#EE0033] transition-colors">{item.label}</h4>
                          {item.badge && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold tracking-wide ${
                              item.badge === 'HOT' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'
                            }`}>{item.badge}</span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1 leading-normal">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="h-px bg-gray-100 my-4" />
                <div className="pl-1">
                  <Link href={getLocalizedPath('/promotions')} onClick={() => setActiveMenu(null)} className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#EE0033] hover:text-[#FF302D] hover:underline">
                    <span>Xem tất cả chương trình khuyến mại</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="px-4 border-r border-[#EBEBEB] text-left">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">MÃ ƯU ĐÃI THEO DỊCH VỤ</div>
                <div className="space-y-4.5">
                  {[
                    { label: 'Mã IDC-CLOUD30', desc: 'Giảm 30% dịch vụ Viettel Cloud Server, Cloud GPU', icon: Percent },
                    { label: 'Mã IDC-STORAGE50', desc: 'Giảm 50% Cloud Backup & Storage, Viettel Drive', icon: Percent },
                    { label: 'Mã IDC-DOMAIN0D', desc: 'Đăng ký tên miền .VN chỉ từ 0đ kèm Hosting bất kỳ', icon: Percent },
                    { label: 'Mã IDC-SECURITY20', desc: 'Giảm 20% các giải pháp Firewall, SOC và WAF cao cấp', icon: Percent }
                  ].map(item => (
                    <div key={item.label} className="group flex gap-3.5 text-left p-1 rounded-[6px]">
                      <div className="w-7 h-7 rounded bg-[#FAF5F6] text-[#EE0033] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-gray-950 font-mono tracking-tight">{item.label}</h4>
                        <p className="text-[11px] text-gray-500 mt-1 leading-normal">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pl-4 text-left">
                <div className="bg-[#FAF5F6] border border-[#FCD9D8] rounded-[12px] p-5">
                  <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5">ĐĂNG KÝ NHẬN QUÀ</div>
                  
                  <div className="flex items-center gap-2 text-[18px] font-extrabold text-[#EE0033] leading-none mb-4">
                    <Gift className="w-5 h-5 text-[#EE0033]" />
                    <span>Nhận mã 1,000,000đ</span>
                  </div>

                  <p className="text-[11.5px] text-gray-600 leading-relaxed mb-4">
                    Để lại email để nhận ngay voucher trải nghiệm hạ tầng điện toán đám mây và bảo mật cao cấp từ Viettel IDC.
                  </p>

                  <div className="h-px bg-red-100 my-4" />

                  <Link href={getLocalizedPath('/promotions')} onClick={() => setActiveMenu(null)} className="w-full text-center py-2 bg-[#EE0033] hover:bg-[#FF302D] text-white flex items-center justify-center font-bold text-[13px] rounded-[8px] transition-colors">
                    Đăng ký nhận quà ngay
                  </Link>

                  <div className="mt-3.5 text-center">
                    <span className="text-[11px] text-gray-400">Áp dụng cho khách hàng đăng ký mới trong tháng này.</span>
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
                  <Link href={isGlobal ? "/global" : "/vn"} className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
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
                  <Link href={getLocalizedPath('/services')} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Dịch vụ đám mây (Cloud)
                  </Link>
                  <Link href={getLocalizedPath('/solutions')} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Giải pháp nghiệp vụ
                  </Link>
                  <Link href={getLocalizedPath('/pricing')} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Bảng giá tổng quan
                  </Link>
                  <Link href={getLocalizedPath('/partners')} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Hệ thống Đại lý / Đối tác
                  </Link>
                  <Link href={getLocalizedPath('/contact')} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px]">
                    Yêu cầu cuộc gọi tư vấn
                  </Link>
                  <Link href={getLocalizedPath('/contact')} onClick={() => setMobileMenuOpen(false)} className="py-1 text-gray-800 hover:text-[#EE0033] font-semibold text-[14px] flex items-center gap-1.5">
                    <span>Chương trình Khuyến mại</span>
                    <span className="bg-[#EE0033] text-white text-[8px] font-bold px-1 rounded-full flex items-center justify-center min-w-[14px] h-[14px]">
                      4
                    </span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <a href="https://docs.viettelidc.com.vn" target="_blank" rel="noreferrer" className="block w-full py-2 bg-gray-50 text-[12.5px] font-bold text-center border rounded-lg text-gray-700">
                  📖 Tài liệu kỹ thuật ↗
                </a>
                
                <Link href={getLocalizedPath('/contact')} onClick={() => setMobileMenuOpen(false)} className="block w-full py-2 bg-[#EE0033] text-[12.5px] font-bold text-center rounded-lg text-white">
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
