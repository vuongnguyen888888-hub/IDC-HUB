import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Ensure the SDK is initialized safely
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY target variable is missing in chatbot. Return smart fallback responses.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function POST(req: NextRequest) {
  try {
    const { message, type, history } = await req.json();

    const isAI = type === "ai";
    const userMessage = message || "";

    const ai = getGenAIClient();
    if (!ai) {
      // Mock / fallback responses when API Key is missing, to keep app fully functional
      let fallbackText = "";
      if (isAI) {
        if (userMessage.toLowerCase().includes("cloud") || userMessage.toLowerCase().includes("máy chủ")) {
          fallbackText = "Viettel Cloud Server cung cấp hạ tầng máy chủ ảo đám mây siêu mạnh, có khả năng tự động co giãn (Auto-scaling) theo lưu lượng truy cập thực tế. Dịch vụ đạt tiêu chuẩn bảo mật ISO 27001 và cam kết SLA lên tới 99.99%. Bạn có muốn nhận báo giá chi tiết không?";
        } else if (userMessage.toLowerCase().includes("data center") || userMessage.toLowerCase().includes("trung tâm dữ liệu")) {
          fallbackText = "Viettel IDC sở hữu hệ thống 5 Trung tâm dữ liệu lớn nhất Việt Nam đạt tiêu chuẩn quốc tế Rated 3 - TIA 942 (Hòa Lạc, Bình Dương, Đà Nẵng). Đảm bảo nguồn điện dự phòng UPS 2N+1 và vận hành an toàn 24/7/365.";
        } else if (userMessage.toLowerCase().includes("bảo mật") || userMessage.toLowerCase().includes("security") || userMessage.toLowerCase().includes("nghị định 13")) {
          fallbackText = "Hạ tầng Viettel IDC đạt chuẩn bảo mật thông tin ISO 27001, ISO 27017, PCI-DSS Level 1 và tuân thủ tuyệt đối Nghị định 13/NĐ-CP về bảo vệ dữ liệu cá nhân. Chúng tôi cung cấp dịch vụ quản lý an toàn thông tin SOC 24/7 và bảo mật WAF.";
        } else {
          fallbackText = "Xin chào! Tôi là ViDa - Trợ lý AI từ Viettel IDC. Tôi sẵn sàng giải đáp các câu hỏi về Cloud, Data Center & Bảo mật. Bạn cần tôi hỗ trợ gì hôm nay?";
        }
      } else {
        // Human consultant fallback
        if (userMessage.toLowerCase().includes("báo giá") || userMessage.toLowerCase().includes("chi phí") || userMessage.toLowerCase().includes("giá")) {
          fallbackText = "Chào bạn, về báo giá các gói dịch vụ Cloud Server hoặc thuê chỗ đặt DC, bạn vui lòng cho tôi xin số điện thoại di động hoặc email liên hệ nhé. Tôi sẽ lập tức gửi bảng giá ưu đãi mới nhất và gọi điện tư vấn trực tiếp cho bạn sau 5 phút ạ!";
        } else {
          fallbackText = "Dạ Minh Thư xin chào anh/chị! Em rất vui được hỗ trợ. Anh/chị đang quan tâm đến giải pháp Cloud Server, thuê chỗ đặt máy chủ vật lý hay dịch vụ an toàn thông tin của Viettel IDC để em tư vấn sâu hơn cho mình ạ?";
        }
      }

      return NextResponse.json({ text: fallbackText });
    }

    // Prepare custom system prompts
    const aiSystemPrompt = `Bạn là "ViDa" - trợ lý ảo thông minh, nhanh nhẹn, chuyên môn cao về hạ tầng số tại Viettel IDC (nhà cung cấp dịch vụ Điện toán đám mây & Trung tâm dữ liệu số 1 Việt Nam).
Nhiệm vụ của bạn:
1. Giải đáp các thắc mắc kỹ thuật, tính năng và quy trình của Viettel IDC (Viettel Cloud Server, Dedicated Private Cloud, vK8s Container, GPU Cloud với Qualcomm L40S, Trung tâm dữ liệu chuẩn Rated 3 TIA-942, Cloud Storage S3, Backup & DR, Cloud Security SOC, WAF, DDoS protection).
2. Viết câu trả lời súc tích, chuyên nghiệp, sử dụng markdown danh sách và in đậm rõ ràng để người dùng dễ đọc.
3. Luôn giữ thái độ lịch sự, xưng "Tôi" hoặc "ViDa" và gọi khách hàng là "Quý khách" hoặc "Anh/Chị".
4. Nếu khách hàng muốn liên hệ nhân sự thật hoặc có yêu cầu báo giá chuyên sâu phức tạp, hãy khuyên họ bấm vào nút "Gặp tư vấn viên" ở bên cạnh để gặp chị Nguyễn Minh Thư hỗ trợ trực tiếp.

Hãy trả lời câu hỏi sau đây của khách hàng: "${userMessage}"`;

    const consultantSystemPrompt = `Bạn là "Nguyễn Minh Thư" - Chuyên viên tư vấn giải pháp hạ tầng số cao cấp tại Viettel IDC. Bạn đang chat trực tuyến để hỗ trợ khách hàng trên website Viettel IDC Hub.
Nhiệm vụ của bạn:
1. Đóng vai một tư vấn viên là người thật cực kỳ thân thiện, khéo léo, chu đáo và am hiểu sâu sắc dịch vụ. Xưng hô là "Em" hoặc "Minh Thư" và gọi khách hàng là "Anh/Chị".
2. Khác với AI khô khan, bạn trả lời bằng văn phong nói chuyện tự nhiên, ấm áp, có biểu cảm nhẹ nhàng (ví dụ: Dạ, vâng ạ, hi vọng được đồng hành cùng anh/chị, chúc anh/chị ngày tốt lành...).
3. Tập trung vào việc thấu hiểu nỗi đau của doanh nghiệp khách hàng và khéo léo đề xuất họ để lại Số điện thoại hoặc Email để bạn có thể gọi điện tư vấn kỹ hơn hoặc gửi báo giá chi tiết qua Zalo/Email.
4. Giới thiệu ngắn gọn các ưu điểm vượt trội của Viettel IDC như: Hạ tầng đạt chuẩn quốc tế Rated 3 TIA-942, có chứng chỉ bảo mật PCI-DSS, cam kết SLA 99.99%, hỗ trợ kỹ thuật 24/7 trực tiếp tại Việt Nam.

Hãy trả lời câu hỏi sau đây của khách hàng: "${userMessage}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: isAI ? aiSystemPrompt : consultantSystemPrompt,
    });

    return NextResponse.json({
      text: response.text || "Xin lỗi, em chưa thể phản hồi lúc này. Anh/chị vui lòng thử lại sau ít phút hoặc để lại thông tin liên hệ nhé!"
    });

  } catch (error: any) {
    console.error("Error in chatbot route:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi kết nối chatbot ảo." },
      { status: 500 }
    );
  }
}
