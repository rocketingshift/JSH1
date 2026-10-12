import type { ComponentType } from "react";
import { Rocket, Cpu, Users, ShieldCheck, Heart } from "lucide-react";

// Cinematic still images (cinematic, modern, featuring Jensen Huang)
const IMG_01 =
  "https://vibe.filesafe.space/1791701521870138312/assets/5bf84e84-c369-4108-9f6c-3a32c2b9eb52.png";
const IMG_02 =
  "https://vibe.filesafe.space/1791701521870138312/assets/0a197bf8-c680-439d-a75b-b9a726c2dae3.png";
const IMG_03 =
  "https://vibe.filesafe.space/1791701521870138312/assets/610fa064-f1bc-402a-a2d4-b0c9010e53f7.png";
const IMG_04 =
  "https://vibe.filesafe.space/1791701521870138312/assets/9dcf6e3d-90f2-4c12-b366-262881c071f6.png";
const IMG_05 =
  "https://vibe.filesafe.space/1791701521870138312/assets/32e4ff01-4a4e-4050-aec0-36294d5cecc0.png";

export type SceneKey = "falcon" | "atom" | "gears" | "constellation" | "sphere";

export type VizKey =
  | "timeline2008"
  | "costbars"
  | "piegrowth"
  | "aiEfficiency10k"
  | "lightbulbCompare"
  | "marginalCostZero"
  | "marketZero"
  | "industrialRevolutions"
  | "tokenFactory"
  | "orgChartFlat"
  | "broadcastComms"
  | "teamScale"
  | "failureTimeline"
  | "noCustomersNoCompetitors"
  | "resilienceLoop"
  | "passionHappiness"
  | "superpowerRanking"
  | "paradoxBlessing";

export type Block =
  | { t: "p"; text: string }
  | { t: "q"; text: string } // Jensen spoken quote
  | { t: "h"; text: string } // inline heading (e.g. "Bài học:")
  | { t: "pull"; text: string } // big mid-chapter pull quote (verbatim)
  | {
      t: "choice";
      title: string;
      options: string[];
      chosen: string;
      reason: string;
    }
  | {
      t: "steps";
      steps: { step: string; title: string; desc: string; detail?: string }[];
    }
  | { t: "lesson"; text: string }
  | { t: "viz"; viz: VizKey };

export interface Chapter {
  id: string;
  code: string;
  number: string;
  subtitle: string;
  tagline: string;
  icon: ComponentType<{ className?: string }>;
  tags: string[];
  image: string;
  scene: SceneKey;
  imageAlign?: "top" | "center"; // top for portraits (head near top edge), center for scenes
  blocks: Block[];
}

export const SECTION_TITLE = "MẬT MÃ QUẢN TRỊ";
export const SECTION_SUBTITLE =
  "Những nguyên tắc từ người đã đặt cược tất cả vào thứ mà cả thế giới chưa ai cần";

export const PREAMBLE: string[] = [
  "Năm 2012, Jensen Huang đầu tư hàng tỷ đô vào một công nghệ mà không ai hỏi mua, không ai hiểu, và thị trường của nó trị giá đúng 0 đồng.",
  "Không phải vì ông liều lĩnh. Mà vì ông nhìn thấy điều mà người khác chưa thể thấy.",
  "Hôm nay, NVIDIA là công ty nghìn tỷ đô đang định hình lại toàn bộ nền văn minh công nghệ.",
  "Đây là 5 bài học từ người đàn ông đó - được đúc kết từ hơn 30 năm thất bại, xoay trục, và không bao giờ bỏ cuộc.",
];

export const CHAPTERS: Chapter[] = [
  {
    id: "mat-ma-01",
    code: "DOSSIER // CODE_01",
    number: "01",
    subtitle: "Chạy Chứ Đừng Đi Bộ",
    tagline: "AI không phải trào lưu. Đây là ranh giới giữa tồn tại và biến mất",
    icon: Rocket,
    tags: ["AI CÁCH MẠNG", "CHI PHÍ BIÊN = 0", "10.000× NĂNG LƯỢNG", "NVIDIA"],
    image: IMG_01,
    scene: "falcon",
    imageAlign: "top",
    blocks: [
      {
        t: "p",
        text: `Jensen Huang không dùng nhiều lời hoa mỹ khi nói về AI. Ông nói thẳng, với sự rõ ràng của người đã dành cả đời trong lòng công nghệ:`,
      },
      {
        t: "q",
        text: `Nếu bạn không chủ động và tích cực trong việc sử dụng AI thì bạn đang làm sai. Bạn sẽ không mất việc vì AI, bạn sẽ mất việc vì người khác sử dụng AI tốt hơn bạn. Công ty của bạn sẽ không phá sản vì AI, công ty bạn sẽ phá sản vì công ty khác đã sử dụng AI. Chẳng có gì để nghi ngờ về điều đó cả.`,
      },
      {
        t: "p",
        text: `Không phải cảnh báo. Là sự thật.`,
      },
      {
        t: "p",
        text: `Nhưng ông không dừng lại ở lời cảnh tỉnh. Ông đi thẳng vào câu hỏi thực tế: AI giúp được gì mà trước đây bạn không dám nghĩ tới?`,
      },
      {
        t: "q",
        text: `Nếu chi phí biên của trí tuệ gần như bằng 0, có rất nhiều việc mà trước đây bạn không nghĩ tới chuyện làm, thì bạn sẽ lại quyết định làm nó ngay bây giờ.`,
      },
      {
        t: "p",
        text: `Đây là sự thay đổi căn bản. Không phải về tốc độ. Mà là về những gì có thể xảy ra.`,
      },
      { t: "viz", viz: "marginalCostZero" },
      {
        t: "p",
        text: `Tại NVIDIA, họ không thể thiết kế chip nếu không có AI nữa. Ban đêm, các hệ thống AI khám phá những không gian thiết kế rộng lớn đến mức không một đội kỹ sư người nào có thể làm được, vì chi phí quá cao. Nhờ đó, chip của họ tiêu thụ ít năng lượng hơn trong khi hiệu suất cao hơn. Phần mềm cũng vậy, họ dùng AI để báo lỗi, xác định ai cần sửa, và gửi thông báo tới người đó.`,
      },
      {
        t: "q",
        text: `Tôi muốn mọi người, mọi tổ chức hãy tích cực sử dụng AI.`,
      },
      {
        t: "p",
        text: `Và còn một con số đáng kinh ngạc: từ năm 2016 đến 2024, chỉ trong 8 năm, hiệu quả năng lượng tính toán AI đã tăng 10.000 lần. Hãy tưởng tượng nếu bóng đèn của bạn hiệu quả gấp 10.000 lần — thay vì 100W, nó chỉ cần một lượng điện nhỏ hơn 10.000 lần mà vẫn tạo ra cùng độ sáng.`,
      },
      { t: "viz", viz: "aiEfficiency10k" },
      {
        t: "p",
        text: `Đây là công nghệ duy nhất Jensen biết đang tăng trưởng theo nhiều cấp số nhân cùng một lúc.`,
      },
      { t: "viz", viz: "lightbulbCompare" },
      {
        t: "p",
        text: `Lời khuyên ông đưa ra cho tất cả mọi người:`,
      },
      {
        t: "pull",
        text: `Hãy chạy chứ đừng đi bộ để tham gia cuộc cách mạng AI này.`,
      },
      { t: "h", text: `Bài học:` },
      {
        t: "lesson",
        text: `Câu hỏi không còn là "Tôi có nên dùng AI không?" Câu hỏi đúng là: "Làm thế nào tôi có thể dùng AI để trở nên giỏi hơn trong lĩnh vực của mình?" Dù bạn là luật sư, bác sĩ, nhà hóa học, hay podcaster… thì câu hỏi đó đều nên tồn tại trong đầu bạn mỗi ngày. Thế hệ trước phải hỏi: "Làm sao tôi dùng máy tính?" Thế hệ này phải hỏi: "Làm sao tôi dùng AI?"`,
      },
    ],
  },
  {
    id: "mat-ma-02",
    code: "DOSSIER // CODE_02",
    number: "02",
    subtitle: "Nhà Máy AI Và Thị Trường 0 Tỷ USD",
    tagline:
      "Người thắng không phải người giành thị phần — mà là người tạo ra thị trường chưa tồn tại",
    icon: Cpu,
    tags: ["THỊ TRƯỜNG 0 TỶ", "TẠO THỊ TRƯỜNG", "TOKEN TRÍ TUỆ", "CỖ MÁY THỜI GIAN"],
    image: IMG_02,
    scene: "atom",
    imageAlign: "center",
    blocks: [
      {
        t: "p",
        text: `Jensen Huang không thích nói về thị phần. Ông nói thẳng:`,
      },
      {
        t: "q",
        text: `Tôi thích là người tạo thị trường, người tạo ra thị trường, hơn là người tham gia thị trường. Tôi không thích nghĩ về thị phần. Tôi không thích khái niệm thị phần.`,
      },
      {
        t: "p",
        text: `Vì sao? Vì cách ông nhìn về cơ hội lớn nhất lại bắt đầu từ con số không:`,
      },
      {
        t: "q",
        text: `Nếu đúng như vậy - việc đó chưa từng được thực hiện trước đây, cực kỳ khó khăn - thì thị trường đó có lẽ là 0 tỷ đô la. Bởi vì nó chưa từng tồn tại.`,
      },
      {
        t: "p",
        text: `Thị trường 0 tỷ đô. Đó không phải sự thất bại. Đó là nơi không có đối thủ - và là nơi bạn có thể xây điều gì đó hoàn toàn mới.`,
      },
      { t: "viz", viz: "marketZero" },
      {
        t: "p",
        text: `Đó chính xác là những gì đã xảy ra với NVIDIA và AI.`,
      },
      {
        t: "p",
        text: `Trong cuộc cách mạng công nghiệp đầu tiên, nguyên tử vào và electron ra. Điện trở thành hàng hóa, được bán theo kilowatt giờ.`,
      },
      {
        t: "p",
        text: `Trong cuộc cách mạng công nghiệp mới này:`,
      },
      {
        t: "q",
        text: `Electron vào và số dấu chấm động ra. Giống như cách mạng công nghiệp trước, không ai hiểu tại sao điện lại có giá trị. Và bây giờ, chúng ta có một triệu token trên mỗi đô la.`,
      },
      { t: "viz", viz: "industrialRevolutions" },
      {
        t: "p",
        text: `Những token đó là trí tuệ. Bạn có thể lấy chúng và tái cấu trúc thành tiếng Anh, tiếng Pháp, protein, hóa chất, đồ họa, hình ảnh, video, chuyển động robot. Và những nhà máy AI - các trung tâm dữ liệu chuyên sản xuất token trí tuệ - chính là cỗ máy của cuộc cách mạng công nghiệp mới.`,
      },
      { t: "viz", viz: "tokenFactory" },
      {
        t: "p",
        text: `Nhưng còn hơn thế. Jensen mô tả GPU như một cỗ máy thời gian:`,
      },
      {
        t: "q",
        text: `Một trong những điều tuyệt vời nhất mà ai đó từng nói với tôi là của một nhà khoa học hóa học lượng tử. Ông ấy nói: "Jensen, nhờ công việc của NVIDIA, tôi có thể hoàn thành công trình của cả cuộc đời mình ngay trong đời này." Đó chính là du hành thời gian.`,
      },
      {
        t: "p",
        text: `Dự báo thời tiết, mô phỏng giao thông, sinh học số, nghiên cứu khí hậu - tất cả đều là những dạng "du hành thời gian": nhìn thấy tương lai trước khi nó xảy ra, để có thể tối ưu hóa phiên bản tốt nhất của nó.`,
      },
      { t: "h", text: `Bài học:` },
      {
        t: "lesson",
        text: `Đừng hỏi "Tôi có thể chiếm bao nhiêu % thị trường?" Hãy hỏi "Tôi có thể tạo ra thị trường nào chưa tồn tại?". NVIDIA tạo ra ngành điện toán AI từ hư không. Những người xây dựng thứ chưa ai làm không cần tranh giành với ai - vì họ đang chơi một trò chơi mà chỉ mình họ có luật.`,
      },
    ],
  },
  {
    id: "mat-ma-03",
    code: "DOSSIER // CODE_03",
    number: "03",
    subtitle: "Quản Trị Nhân Sự Xuất Sắc",
    tagline: "60 người báo cáo trực tiếp, không họp 1-1, và không bao giờ bỏ cuộc với ai",
    icon: Users,
    tags: ["60 BÁO CÁO TRỰC TIẾP", "KHÔNG HỌP 1-1", "PHẢN HỒI CÔNG KHAI", "28.000 NGƯỜI"],
    image: IMG_03,
    scene: "gears",
    imageAlign: "top",
    blocks: [
      {
        t: "p",
        text: `Trong một cuộc phỏng vấn, người phỏng vấn nhìn Jensen Huang với vẻ không tin:`,
      },
      { t: "p", text: `"60 người báo cáo trực tiếp cho anh?"` },
      { t: "p", text: `"Đúng, 60 người."` },
      {
        t: "p",
        text: `"Điều này không được coi là 'thông lệ tốt' theo cách quản trị truyền thống."`,
      },
      {
        t: "p",
        text: `Jensen trả lời không do dự:`,
      },
      {
        t: "q",
        text: `Tôi tin chắc rằng đây là cách tốt nhất. Dù không phải thông lệ thông thường, nhưng tôi tin chắc nó là cách tốt nhất. Và đến cuối buổi này, tôi sẽ thuyết phục tất cả các bạn cũng nên có 60 người báo cáo trực tiếp cho mình.`,
      },
      { t: "viz", viz: "orgChartFlat" },
      {
        t: "p",
        text: `Tại sao? Vì ông tin vào một nguyên tắc căn bản: thông tin là quyền lực, và quyền lực nên thuộc về tất cả mọi người.`,
      },
      {
        t: "q",
        text: `Tôi không họp 1-1. Hầu như mọi điều tôi nói, tôi đều nói cho tất cả mọi người cùng nghe. Bởi vì tôi không tin rằng có bất kỳ thông tin nào mà chỉ một hoặc hai người nên biết. Thông tin về những thử thách công ty đang đối mặt, những vấn đề tôi đang cố giải quyết, hướng đi mà chúng tôi muốn theo đuổi - tất cả mọi người đều nên được nghe.`,
      },
      {
        t: "p",
        text: `Khi 60 người cùng nghe, cùng biết, cùng giải quyết vấn đề - mỗi người đều được trao quyền thực sự, không phải trao quyền chỉ trên danh nghĩa.`,
      },
      { t: "viz", viz: "broadcastComms" },
      {
        t: "p",
        text: `Và khi có phản hồi cần đưa ra? Ông sẽ thực hiện điều đó trước mặt tất cả mọi người, thẳng thắn, không kiêng nể.`,
      },
      {
        t: "q",
        text: `Phản hồi chính là học hỏi. Nếu đã là bài học, tại sao chỉ một mình bạn được học điều đó? Bạn tạo ra tình huống - nhưng tất cả chúng ta đều nên học từ nó.`,
      },
      {
        t: "q",
        text: `Học từ sai lầm - đặc biệt là từ sai lầm của người khác - là cách học tốt nhất. Tại sao bạn phải đợi đến khi học từ sai lầm của chính mình? Tại sao bạn phải đợi đến khi tự mình xấu hổ? Bạn phải học từ sự xấu hổ của người khác.`,
      },
      {
        t: "p",
        text: `Nhưng có một nguyên tắc ông giữ chặt hơn bất cứ điều nào khác: không bỏ cuộc với nhân sự của mình.`,
      },
      {
        t: "q",
        text: `Tôi thà giúp họ tiến bộ còn hơn là bỏ cuộc với họ. Có rất ít thứ mà con người không thể học được. Chỉ cần họ được trao cơ hội.`,
      },
      {
        t: "p",
        text: `Và ông mô tả triết lý của mình bằng một hình ảnh vừa hài hước vừa thật:`,
      },
      {
        t: "q",
        text: `Nói vui một chút - nhưng mọi người đều biết rằng tôi thà tra tấn họ cho tới khi họ trở nên vĩ đại, bởi vì tôi tin vào họ. Sự vĩ đại thường đến rất bất ngờ - tự nhiên một ngày ai đó sẽ thốt lên: "Ồ, tôi làm được rồi!" Bạn có tưởng tượng được không, nếu bạn bỏ cuộc ngay trước khoảnh khắc đó?`,
      },
      {
        t: "p",
        text: `Và còn một thứ không thể đo lường, nhưng ông tin là yếu tố tạo nên sự phi thường:`,
      },
      {
        t: "pull",
        text: `Bạn không thể tạo ra những điều phi thường chỉ bằng xuất sắc trong vận hành. Rất nhiều điều vĩ đại trong sản phẩm bạn làm, công ty bạn gây dựng - cần có sự chăm chút bằng cả trái tim. Bạn không thể đưa nó vào quy trình kinh doanh.`,
      },
      {
        t: "p",
        text: `Đó là lý do ông tin vào thời gian gắn bó lâu dài. Khi bạn đã cùng nhau đi qua đau đớn, niềm vui, thất bại và thành công, bạn đã mã hóa "phép màu của công ty" vào những con người đó theo cách không từ ngữ nào mô tả được. Và bạn không muốn đánh mất điều đó.`,
      },
      {
        t: "q",
        text: `NVIDIA về cơ bản là một đội ngũ nhỏ với 28.000 người. Người ta nói rằng chúng tôi "đấm vượt hạng cân" là vì lý do đó.`,
      },
      { t: "viz", viz: "teamScale" },
      { t: "h", text: `Bài học:` },
      {
        t: "lesson",
        text: `Thông tin chia sẻ = quyền lực nhân lên. Phản hồi công khai = học hỏi nhân lên. Không bỏ cuộc với nhân sự của mình = đội ngũ vĩ đại. Và thời gian gắn bó lâu dài là thứ tạo ra sự phi thường mà không quy trình nào thay thế được.`,
      },
    ],
  },
  {
    id: "mat-ma-04",
    code: "DOSSIER // CODE_04",
    number: "04",
    subtitle: "Kiên Cường Qua Thất Bại",
    tagline:
      "Hết thất bại này đến thất bại khác - và mỗi lần, họ đứng dậy… lướt tới cơ hội tiếp theo",
    icon: ShieldCheck,
    tags: ["AMD · INTEL · QUALCOMM", "3 LẦN THẤT BẠI", "ROBOTICS 0 TỶ", "DEEP LEARNING"],
    image: IMG_04,
    scene: "constellation",
    imageAlign: "center",
    blocks: [
      {
        t: "p",
        text: `Câu chuyện của NVIDIA không bắt đầu bằng AI. Nó bắt đầu bằng đồ họa và một chuỗi thất bại liên tiếp mà hầu hết công ty khác sẽ không sống sót qua được.`,
      },
      { t: "h", text: `Lần thứ nhất: AMD` },
      {
        t: "p",
        text: `Năm 2000, NVIDIA phát minh ra GPU và programmable shading, tái định nghĩa toàn bộ ngành đồ họa máy tính. Muốn đưa GPU vào mọi chiếc máy tính, họ tích hợp GPU với chipset trên bo mạch chủ và ra mắt chip đồ họa cho CPU AMD. Kết quả? Doanh thu từ gần 0 lên 1 tỷ đô - gần như chỉ sau một đêm.`,
      },
      {
        t: "p",
        text: `Rồi AMD quyết định muốn kiểm soát toàn bộ công nghệ trong PC. Họ mua lại ATI, và không cần NVIDIA nữa.`,
      },
      { t: "h", text: `Lần thứ hai: Intel và Apple` },
      {
        t: "p",
        text: `NVIDIA xoay trục, quay sang Intel để đàm phán giấy phép kết nối với CPU của họ. Trong lúc đó, Apple hào hứng với những gì NVIDIA đang xây dựng và mời họ cùng phát triển một chiếc máy tính mới. Sản phẩm đó trở thành MacBook Air đầu tiên.`,
      },
      {
        t: "p",
        text: `Intel nhìn thấy điều đang xảy ra và ngay lập tức chấm dứt thỏa thuận với NVIDIA.`,
      },
      { t: "h", text: `Lần thứ ba: Qualcomm và Android` },
      {
        t: "p",
        text: `Không còn đường ở PC, NVIDIA xoay sang hướng hoàn toàn mới: cấp phép ARM và tự xây dựng SoC tiêu thụ điện năng thấp - chip di động đầu tiên trên thế giới có thể được xem là một máy tính đầy đủ.`,
      },
      {
        t: "p",
        text: `Google phấn khích. Họ mời NVIDIA hợp tác làm thiết bị di động - thứ sau này trở thành thiết bị Android đầu tiên.`,
      },
      {
        t: "p",
        text: `Nhưng Qualcomm từ chối cho phép NVIDIA kết nối với modem của họ. Không có modem - không có điện thoại. Không còn nhà cung cấp modem nào khác trên thị trường. NVIDIA buộc phải rút lui hoàn toàn.`,
      },
      {
        t: "p",
        text: `Ba lần. Ba thị trường khác nhau. Ba lần thành công rực rỡ rồi bị đóng cửa - không phải vì họ không làm được, mà vì người khác không muốn họ thắng.`,
      },
      { t: "viz", viz: "failureTimeline" },
      {
        t: "p",
        text: `Jensen nhìn lại chuỗi thất bại đó:`,
      },
      {
        t: "q",
        text: `Điều này diễn ra gần như đều đặn hàng năm: Chúng tôi tạo ra một sản phẩm, nó thành công rực rỡ, gây ra sự phấn khích khổng lồ - rồi chỉ một năm sau, chúng tôi bị loại khỏi thị trường đó.`,
      },
      {
        t: "p",
        text: `Đó là lúc Jensen Huang và đội ngũ quyết định làm thứ không ai muốn làm:`,
      },
      {
        t: "q",
        text: `Chúng tôi quyết định xây dựng một thứ mà chắc chắn không có khách hàng. Bởi vì một điều bạn có thể chắc chắn: nơi nào không có khách hàng, nơi đó không có đối thủ cạnh tranh, và không ai quan tâm đến bạn.`,
      },
      {
        t: "p",
        text: `Họ chọn robotics - một thị trường 0 tỷ đô. Và xây máy tính robotics đầu tiên trên thế giới, xử lý một thuật toán mà khi đó không ai hiểu, gọi là deep learning.`,
      },
      { t: "viz", viz: "noCustomersNoCompetitors" },
      { t: "p", text: `Đó là hơn 10 năm về trước.` },
      {
        t: "p",
        text: `Nhưng điều quan trọng hơn sản phẩm, là điều họ tích lũy qua từng lần vấp ngã:`,
      },
      {
        t: "pull",
        text: `Hết thất bại này đến thất bại khác, chúng tôi vẫn đứng dậy, lướt tới cơ hội tiếp theo. Mỗi lần như vậy, chúng tôi lại học thêm kỹ năng mới và bồi đắp thêm bản lĩnh. Chúng tôi đã rèn luyện được bản lĩnh doanh nghiệp. Bất kỳ trở ngại nào đến với chúng tôi ngày nay đều trông giống như một cơ hội.`,
      },
      { t: "viz", viz: "resilienceLoop" },
      { t: "h", text: `Bài học:` },
      {
        t: "lesson",
        text: `Kiên định không phải bướng bỉnh. Kiên định là khả năng lý luận từ nguyên lý gốc, và khi nguyên lý gốc không thay đổi, không có lý do gì để bỏ cuộc. Jensen tin vào NVIDIA hơn 30 năm vì ông có lý do để tin tưởng. Và mỗi lần thất bại không phải là dấu hiệu để dừng lại, mà là cơ hội để học kỹ năng mới và bồi đắp thêm bản lĩnh.`,
      },
    ],
  },
  {
    id: "mat-ma-05",
    code: "DOSSIER // CODE_05",
    number: "05",
    subtitle: "Hãy Yêu Những Khó Khăn",
    tagline:
      "Vĩ đại không đến từ hạnh phúc mỗi ngày, mà từ việc không bỏ cuộc khi mọi thứ khó nhất",
    icon: Heart,
    tags: ["ĐAM MÊ ≠ HẠNH PHÚC", "CHỊU ĐỰNG", "KIÊN TRÌ", "SIÊU NĂNG LỰC"],
    image: IMG_05,
    scene: "sphere",
    imageAlign: "center",
    blocks: [
      {
        t: "p",
        text: `Jensen Huang bắt đầu mỗi ngày theo đúng một cách: làm việc quan trọng nhất trước tiên.`,
      },
      {
        t: "q",
        text: `Trước khi tôi đến nơi làm việc, một ngày của tôi đã được coi là thành công. Tôi đã hoàn thành công việc quan trọng nhất, và có thể dành phần còn lại trong ngày để giúp đỡ người khác.`,
      },
      {
        t: "p",
        text: `Ông làm việc từ lúc thức dậy đến khi ngủ. Bảy ngày một tuần.`,
      },
      {
        t: "q",
        text: `Tôi vẫn ngồi xem phim, nhưng tôi chẳng nhớ gì về phim, vì đầu tôi đang nghĩ về công việc.`,
      },
      {
        t: "p",
        text: `Nhưng ông không nghĩ đây là gánh nặng. Ông nói điều ít ai dám nói thẳng về hành trình đi đến vĩ đại:`,
      },
      {
        t: "q",
        text: `Có một câu nói rằng: "Bạn nên chọn nghề nghiệp dựa trên đam mê của mình." Thông thường, người ta liên kết đam mê với hạnh phúc. Và tôi nghĩ có gì đó bị thiếu trong câu nói đó.`,
      },
      {
        t: "p",
        text: `Thiếu gì? Thiếu sự thật rằng: vĩ đại không phải lúc nào cũng dễ chịu.`,
      },
      {
        t: "q",
        text: `Tôi không yêu thích mọi ngày làm việc của mình. Tôi không nghĩ ngày nào cũng vui vẻ. Và không phải năm nào tôi cũng hài lòng về công ty. Nhưng tôi yêu công ty từng giây phút trong đời mình.`,
      },
      {
        t: "pull",
        text: `Bạn phải chịu đựng. Bạn phải vật lộn. Bạn phải nỗ lực. Bạn phải làm những điều khó khăn và vượt qua chúng thì mới thực sự trân trọng những gì bạn đã đạt được. Không có thứ gì vĩ đại mà lại dễ dàng để làm cả.`,
      },
      { t: "viz", viz: "passionHappiness" },
      {
        t: "p",
        text: `Và đây là lời chúc nghe có vẻ ngược đời của ông dành cho bạn:`,
      },
      {
        t: "q",
        text: `Theo định nghĩa của tôi, tôi muốn nói rằng: Tôi chúc bạn đạt được sự vĩ đại - mà theo cách nói của tôi là tôi chúc bạn có thật nhiều đau đớn và gian khổ.`,
      },
      { t: "viz", viz: "paradoxBlessing" },
      {
        t: "p",
        text: `Vì chính trong đau đớn đó:`,
      },
      {
        t: "q",
        text: `Trong tất cả những điều tôi coi trọng nhất ở bản thân mình, trí thông minh không đứng đầu danh sách. Khả năng chịu đựng nỗi đau và sự khổ cực, khả năng kiên trì làm việc với một điều gì đó trong một khoảng thời gian rất dài, khả năng vượt qua thất bại và nhìn thấy cơ hội ngay ở phía trước - đó mới là những điều tôi xem là siêu năng lực của mình. Và tôi hy vọng chúng cũng sẽ là của bạn.`,
      },
      { t: "viz", viz: "superpowerRanking" },
      { t: "h", text: `Bài học:` },
      {
        t: "lesson",
        text: `Đam mê không đồng nghĩa với hạnh phúc mỗi ngày. Vĩ đại đến từ việc tìm ra thứ bạn muốn dành cả đời để mài giũa và không bỏ cuộc, dù có những ngày tháng khó khăn, những năm tháng gian khổ. Khi bạn yêu công việc của mình, bạn không thấy nó là gánh nặng. Bạn có cả đời để làm nó và đó chính là sự tự do thực sự.`,
      },
    ],
  },
];
