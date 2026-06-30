import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Ensure the SDK is initialized safely
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Falls back gracefully or uses placeholder for development
    console.warn("GEMINI_API_KEY target variable is missing. Return mock suggestions.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function POST(req: NextRequest) {
  try {
    const { industry, need } = await req.json();

    const ai = getGenAIClient();
    if (!ai) {
      // Graceful fallback response when API key is not fully configured
      return NextResponse.json({
        report: `### Báo Cáo Tư Vấn Giải Pháp Viettel IDC (Chế độ Phác thảo) \n\n` +
          `*Doanh nghiệp được phân tích: Ngành **${industry || "Doanh nghiệp"}** | Nhu cầu lớn: **${need || "Tối ưu hóa hạ tầng"}**.*\n\n` +
          `#### 1. Đánh giá hiện trạng & Thách thức\n` +
          `- Ngành ${industry} đòi hỏi khắt khe về tính ổn định hệ thống cao và tuân thủ các quy định bảo mật dữ liệu cá nhân theo Nghị định 13/NĐ-CP của Chính phủ.\n` +
          `- Mục tiêu triển khai "${need}" yêu cầu cấu trúc hạ tầng hiện đại, loại bỏ các chi phí duy trì vật lý cồng kềnh.\n\n` +
          `#### 2. Đề xuất kiến trúc Viettel IDC đề nghị\n` +
          `- **Viettel Cloud Server**: Thiết lập tài nguyên máy chủ ảo đám mây hiệu năng cao co giãn tự động (Auto-scaling).\n` +
          `- **Viettel Cloud Security (VPC, WAF)**: Tường lửa ứng dụng web lọc 100% traffic độc hại xâm nhập.\n` +
          `- **Quy trình Backup & DR**: Sao lưu dữ liệu bất biến (Object Lock) phục hồi thảm họa tự động RTO < 15 phút.\n\n` +
          `#### 3. Chỉ số KPI Dự Kiến\n` +
          `- **Uptime Cam Kết**: 99.99% dịch vụ hoạt động.\n` +
          `- **Rút ngắn chu đoạn**: Tiết kiệm lên tới 55% CAPEX vận hành phòng máy.`
      });
    }

    const sysPrompt = `Bạn là một chuyên gia tư vấn giải pháp hạ tầng số và Điện toán đám mây cao cấp tại Viettel IDC (nhà cung cấp Cloud & Data Center số 1 Việt Nam).
Mục tiêu của bạn là phân tích nhu cầu của khách hàng và cung cấp một chiến lược hạ tầng số chuyên nghiệp, bài bản theo văn phong B2B corporate sang trọng, có cấu trúc chặt chẽ.

Hãy viết một bản phác thảo chi tiết (bằng Tiếng Việt, định dạng Markdown) để tư vấn giải pháp cho một doanh nghiệp hoạt động trong ngành: "${industry}" đang gặp bài toán/nhu cầu: "${need}".

Bản báo cáo PHẢI bao gồm các mục cụ thể:
1. ĐÁNH GIÁ THÁCH THỨC VÀ RỦI RO ĐẶC THÙ (Của ngành và bài toán)
2. KIẾN TRÚC GIẢI PHÁP ĐỀ XUẤT (Nêu rõ các dịch vụ Viettel IDC khuyên dùng như Viettel Cloud Server, Colocation, Backup & DR, vK8s...)
3. LỢI ÍCH TÀI CHÍNH & VẬN HÀNH (SLA, bảo mật ISO 27001, tối ưu tài chính CAPEX -> OPEX)
4. LỘ TRÌNH TRIỂN KHAI KHUYẾN NGHỊ (Gồm 3 bước tinh gọn: Khảo sát & Demo -> Di chuyển dữ liệu -> Vận hành & Giám sát SOC)`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: sysPrompt,
    });

    return NextResponse.json({
      report: response.text || "Không thể khởi tạo nội dung tư vấn từ mô hình AI."
    });

  } catch (error: any) {
    console.error("Error generating solution report:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi hệ thống trong quá trình sinh giải pháp." },
      { status: 500 }
    );
  }
}
