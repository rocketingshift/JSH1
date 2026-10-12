import { Rocket, Cpu, Users, ShieldCheck, Heart } from "lucide-react";

export interface CodexCardData {
  id: string;
  number: string;
  code: string;
  title: string;
  tagline: string;
  product: string;
  productDesc: string;
  image: string;
  fullQuote: string;
  corePrinciple: string;
  actionLesson: string;
  icon: typeof Rocket;
}

export const CODEX_CARDS: CodexCardData[] = [
  {
    id: "mat-ma-01",
    number: "01",
    code: "MẬT MÃ 01",
    title: "Chạy Chứ Đừng Đi Bộ",
    tagline: "AI không phải trào lưu. Đây là ranh giới giữa tồn tại và biến mất",
    product: "NVIDIA AI & CUDA",
    productDesc:
      "Chi phí biên của trí tuệ gần như bằng 0 — hiệu quả năng lượng tính toán AI tăng 10.000 lần trong 8 năm",
    image:
      "https://vibe.filesafe.space/1791701521870138312/assets/b02c469d-6ce0-4796-8943-af121b616954.png",
    fullQuote: "Bạn sẽ không mất việc vì AI, bạn sẽ mất việc vì người khác sử dụng AI tốt hơn bạn.",
    corePrinciple:
      "Chi phí biên của trí tuệ tiến về 0: những việc trước đây không nghĩ tới làm, giờ làm ngay bây giờ.",
    actionLesson:
      "Câu hỏi đúng không phải 'tôi có nên dùng AI không?' mà là 'làm sao tôi dùng AI để giỏi hơn trong lĩnh vực của mình?'",
    icon: Rocket,
  },
  {
    id: "mat-ma-02",
    number: "02",
    code: "MẬT MÃ 02",
    title: "Nhà Máy AI Và Thị Trường 0 Tỷ USD",
    tagline:
      "Người thắng không phải người giành thị phần — mà là người tạo ra thị trường chưa tồn tại",
    product: "AI Factories & Token Economy",
    productDesc:
      "Electron vào, token trí tuệ ra — một triệu token trên mỗi đô la, cỗ máy thời gian cho khoa học",
    image:
      "https://vibe.filesafe.space/1791701521870138312/assets/08406e04-b531-4425-bd3e-212386021d52.png",
    fullQuote:
      "Tôi thích là người tạo thị trường, hơn là người tham gia thị trường. Tôi không thích khái niệm thị phần.",
    corePrinciple:
      "Thị trường 0 tỷ đô: nơi không có đối thủ, nơi bạn xây điều gì đó hoàn toàn mới từ hư không.",
    actionLesson:
      "Đừng hỏi 'chiếm bao nhiêu % thị trường?' — hãy hỏi 'tạo ra thị trường nào chưa tồn tại?'",
    icon: Cpu,
  },
  {
    id: "mat-ma-03",
    number: "03",
    code: "MẬT MÃ 03",
    title: "Quản Trị Nhân Sự Xuất Sắc",
    tagline: "60 người báo cáo trực tiếp, không họp 1-1, và không bao giờ bỏ cuộc với ai",
    product: "NVIDIA's 28.000-Person Team",
    productDesc:
      "Thông tin là quyền lực thuộc về tất cả — phản hồi công khai, trao quyền thực sự, không bỏ cuộc với ai",
    image:
      "https://vibe.filesafe.space/1791701521870138312/assets/0007357c-8679-4126-9bbb-f9281f81f4d0.png",
    fullQuote: "Tôi thà tra tấn họ cho tới khi họ trở nên vĩ đại, bởi vì tôi tin vào họ.",
    corePrinciple:
      "Thông tin chia sẻ = quyền lực nhân lên. Phản hồi công khai = học hỏi nhân lên. Không bỏ cuộc = đội ngũ vĩ đại.",
    actionLesson:
      "Thời gian gắn bó lâu dài tạo ra sự phi thường mà không quy trình vận hành nào thay thế được.",
    icon: Users,
  },
  {
    id: "mat-ma-04",
    number: "04",
    code: "MẬT MÃ 04",
    title: "Kiên Cường Qua Thất Bại",
    tagline:
      "Hết thất bại này đến thất bại khác - và mỗi lần, họ đứng dậy… lướt tới cơ hội tiếp theo",
    product: "AMD · Intel · Qualcomm → Robotics 0 Tỷ",
    productDesc:
      "3 lần thành công rực rỡ rồi bị đóng cửa — rồi chọn thị trường 0 tỷ đô, xây deep learning từ hư không",
    image:
      "https://vibe.filesafe.space/1791701521870138312/assets/f18430d4-8b2d-48f2-8cf0-3288acfd5968.png",
    fullQuote:
      "Hết thất bại này đến thất bại khác, chúng tôi vẫn đứng dậy, lướt tới cơ hội tiếp theo.",
    corePrinciple:
      "Kiên định là khả năng lý luận từ nguyên lý gốc — khi nguyên lý gốc không đổi, không có lý do để bỏ cuộc.",
    actionLesson:
      "Mỗi lần thất bại là cơ hội học kỹ năng mới, bồi đắp bản lĩnh — trở ngại ngày nay trông giống cơ hội.",
    icon: ShieldCheck,
  },
  {
    id: "mat-ma-05",
    number: "05",
    code: "MẬT MÃ 05",
    title: "Hãy Yêu Những Khó Khăn",
    tagline:
      "Vĩ đại không đến từ hạnh phúc mỗi ngày, mà từ việc không bỏ cuộc khi mọi thứ khó nhất",
    product: "Jensen's Lifelong Dedication",
    productDesc:
      "Đam mê ≠ hạnh phúc mỗi ngày — siêu năng lực là khả năng chịu đựng, kiên trì và vượt qua thất bại",
    image:
      "https://vibe.filesafe.space/1791701521870138312/assets/ad78c965-a803-495a-9ccc-393ad2657a8e.png",
    fullQuote:
      "Tôi chúc bạn đạt được sự vĩ đại — mà theo cách nói của tôi là tôi chúc bạn có thật nhiều đau đớn và gian khổ.",
    corePrinciple:
      "Đam mê không đồng nghĩa với hạnh phúc mỗi ngày. Vĩ đại đến từ việc không bỏ cuộc khi mọi thứ khó nhất.",
    actionLesson:
      "Khi bạn yêu công việc, bạn không thấy nó là gánh nặng — bạn có cả đời để làm nó, và đó là sự tự do thực sự.",
    icon: Heart,
  },
];
