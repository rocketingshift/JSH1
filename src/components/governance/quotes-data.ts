export interface QuoteData {
  id: string;
  number: string;
  text: string;
  image: string;
  /** portrait = ảnh chân dung Jensen Huang; scene = ảnh bối cảnh/trừu tượng (không người rõ mặt) */
  kind: "portrait" | "scene";
}

// 18 ảnh điện ảnh màu riêng biệt — đồng bộ vàng hổ phách + ngọc bích trên nền đen
// portrait = Jensen Huang · scene = bối cảnh/trừu tượng
const Q01 =
  "https://vibe.filesafe.space/1791701521870138312/assets/5ad166e9-8161-4a7b-9be5-214c23e51098.png"; // Jensen trong data center AI — portrait
const Q02 =
  "https://vibe.filesafe.space/1791701521870138312/assets/d4c232c7-d8ca-4ab1-b972-90572cc85857.png"; // chạy trong data center — scene
const Q03 =
  "https://vibe.filesafe.space/1791701521870138312/assets/7bb59235-ada9-4dbd-8272-e8055d2182ad.png"; // trí tuệ → chi phí 0 — scene
const Q04 =
  "https://vibe.filesafe.space/1791701521870138312/assets/ad8e7dac-2817-4ca7-9f7d-29372251b081.png"; // GPU = cỗ máy thời gian — scene
const Q05 =
  "https://vibe.filesafe.space/1791701521870138312/assets/b33dae2c-cdab-46d0-9705-b60731268d01.png"; // Jensen tạo thị trường 0 tỷ — portrait
const Q06 =
  "https://vibe.filesafe.space/1791701521870138312/assets/20cd418e-53a2-4c7c-89e3-359e61ff0e40.png"; // kiên cường đứng dậy — scene
const Q07 =
  "https://vibe.filesafe.space/1791701521870138312/assets/a8de4202-fcf5-42b1-8855-5c8fec141cff.png"; // 60 người họp — scene
const Q08 =
  "https://vibe.filesafe.space/1791701521870138312/assets/52c49320-70e1-4855-b388-2209235876fd.png"; // trái tim trong sản phẩm — scene
const Q09 =
  "https://vibe.filesafe.space/1791701521870138312/assets/c59cdb3d-b5ef-4230-9dbc-bc04f64688ea.png"; // Jensen mã hóa trải nghiệm — portrait
const Q10 =
  "https://vibe.filesafe.space/1791701521870138312/assets/1cbf4536-6ca4-4b4b-961f-c7fe9050306b.png"; // Jensen yêu công ty từng giây — portrait
const Q11 =
  "https://vibe.filesafe.space/1791701521870138312/assets/e62b9d80-902f-4529-b6b5-45fe79aca3c1.png"; // leo núi chịu đựng — scene
const Q12 =
  "https://vibe.filesafe.space/1791701521870138312/assets/0419dc2e-40ee-4aac-bac1-a9ead050a67b.png"; // xếp hạng siêu năng lực — scene
const Q13 =
  "https://vibe.filesafe.space/1791701521870138312/assets/b823b752-92dc-4a9a-9847-d224e7f4a1ec.png"; // Jensen chúc đau đớn → vĩ đại — portrait
const Q14 =
  "https://vibe.filesafe.space/1791701521870138312/assets/d7ab2b3d-2a88-4b90-9dcc-53102a1b9dd3.png"; // Jensen — máy tính dựa trên ý định — portrait
const Q15 =
  "https://vibe.filesafe.space/1791701521870138312/assets/57e40802-4660-46ee-943c-38ff1038df23.png"; // AI siêu phàm bên cạnh — scene
const Q16 =
  "https://vibe.filesafe.space/1791701521870138312/assets/dc8c353e-510d-4f19-b774-29d0f7a86705.png"; // Jensen — việc khó cần người kiên định — portrait
const Q17 =
  "https://vibe.filesafe.space/1791701521870138312/assets/4477b95c-22fd-494b-8ce7-ef3531e64e47.png"; // Jensen kiên định 30 năm — portrait
const Q18 =
  "https://vibe.filesafe.space/1791701521870138312/assets/9724e44f-20d5-440e-a0af-35dd14030982.png"; // Jensen — gạt bất định sang một bên — portrait

export const QUOTES: QuoteData[] = [
  {
    id: "q01",
    number: "01",
    text: "Bạn sẽ không mất việc vì AI - bạn sẽ mất việc vì người khác sử dụng AI tốt hơn bạn. Công ty của bạn sẽ không phá sản vì AI - công ty bạn sẽ phá sản vì công ty khác đã sử dụng AI. Chẳng có gì để nghi ngờ về điều đó cả.",
    image: Q01,
    kind: "portrait",
  },
  {
    id: "q02",
    number: "02",
    text: "Hãy chạy chứ đừng đi bộ để tham gia cuộc cách mạng AI này.",
    image: Q02,
    kind: "scene",
  },
  {
    id: "q03",
    number: "03",
    text: "Nếu chi phí biên của trí tuệ gần như bằng 0, có rất nhiều việc mà trước đây bạn không nghĩ tới chuyện làm - thì bạn sẽ lại quyết định làm nó ngay bây giờ.",
    image: Q03,
    kind: "scene",
  },
  {
    id: "q04",
    number: "04",
    text: "GPU giống như một cỗ máy thời gian vì nó cho bạn thấy tương lai sớm hơn.",
    image: Q04,
    kind: "scene",
  },
  {
    id: "q05",
    number: "05",
    text: "Tôi thích là người tạo thị trường hơn là người tham gia thị trường. Tạo ra thứ gì đó mới mà chưa từng tồn tại - thay vì nghĩ đến việc chiếm lĩnh thị phần.",
    image: Q05,
    kind: "portrait",
  },
  {
    id: "q06",
    number: "06",
    text: "Hết thất bại này đến thất bại khác, chúng tôi vẫn đứng dậy, lướt tới cơ hội tiếp theo. Mỗi lần như vậy, chúng tôi lại học thêm kỹ năng mới và bồi đắp thêm bản lĩnh. Bất kỳ trở ngại nào đến với chúng tôi ngày nay đều trông giống như một cơ hội.",
    image: Q06,
    kind: "scene",
  },
  {
    id: "q07",
    number: "07",
    text: "Phản hồi chính là học hỏi. Nếu đã là bài học, tại sao chỉ một mình bạn được học điều đó? Học từ sai lầm - đặc biệt là từ sai lầm của người khác - là cách học tốt nhất. Tại sao bạn phải đợi đến khi tự mình xấu hổ? Bạn phải học từ sự xấu hổ của người khác.",
    image: Q07,
    kind: "scene",
  },
  {
    id: "q08",
    number: "08",
    text: "Bạn không thể tạo ra những điều phi thường chỉ bằng xuất sắc trong vận hành. Rất nhiều điều vĩ đại cần có sự chăm chút bằng cả trái tim - và bạn không thể đưa điều đó vào quy trình kinh doanh.",
    image: Q08,
    kind: "scene",
  },
  {
    id: "q09",
    number: "09",
    text: "Tôi đã mã hóa, đã ký gửi biết bao nhiêu đau đớn, khổ cực, niềm vui, tri thức - toàn bộ những trải nghiệm cuộc đời - vào những con người mà tôi từng làm việc cùng.",
    image: Q09,
    kind: "portrait",
  },
  {
    id: "q10",
    number: "10",
    text: "Tôi không yêu thích mọi ngày làm việc của mình. Không phải năm nào tôi cũng hài lòng về công ty. Nhưng tôi yêu công ty từng giây phút trong đời mình.",
    image: Q10,
    kind: "portrait",
  },
  {
    id: "q11",
    number: "11",
    text: "Bạn phải chịu đựng. Bạn phải vật lộn. Bạn phải làm những điều khó khăn và vượt qua chúng thì mới thực sự trân trọng những gì bạn đã đạt được. Không có thứ gì vĩ đại mà lại dễ dàng để làm cả.",
    image: Q11,
    kind: "scene",
  },
  {
    id: "q12",
    number: "12",
    text: "Trong tất cả những điều tôi coi trọng nhất ở bản thân mình, trí thông minh không đứng đầu danh sách. Khả năng chịu đựng nỗi đau, kiên trì trong thời gian dài, vượt qua thất bại và nhìn thấy cơ hội ngay ở phía trước - đó mới là những siêu năng lực của tôi.",
    image: Q12,
    kind: "scene",
  },
  {
    id: "q13",
    number: "13",
    text: "Tôi chúc bạn đạt được sự vĩ đại - mà theo cách nói của tôi là: tôi chúc bạn có thật nhiều đau đớn và gian khổ.",
    image: Q13,
    kind: "portrait",
  },
  {
    id: "q14",
    number: "14",
    text: "Máy tính ngày nay đã trở thành máy tính dựa trên ý định, thay vì dựa trên chỉ dẫn. Bạn chỉ cần nói với máy tính điều bạn muốn - nó sẽ tự tìm ra cách thực hiện.",
    image: Q14,
    kind: "portrait",
  },
  {
    id: "q15",
    number: "15",
    text: "Chúng ta sẽ trở thành siêu nhân - không phải vì chúng ta tự có siêu năng lực, mà vì chúng ta có AI siêu phàm bên cạnh.",
    image: Q15,
    kind: "scene",
  },
  {
    id: "q16",
    number: "16",
    text: "Tôi thích những việc khó vì nó mất nhiều thời gian để làm. Và nếu nó mất nhiều thời gian, nhiều người ít cam kết có lẽ sẽ không làm - điều đó có nghĩa là bạn cần một người kiên định, tận tâm và thực sự cam kết để theo đuổi.",
    image: Q16,
    kind: "portrait",
  },
  {
    id: "q17",
    number: "17",
    text: "Câu hỏi về việc tại sao chúng tôi kiên định suốt thời gian dài như vậy - thực ra câu trả lời là ngược lại: Không có lý do gì để KHÔNG kiên định. Bởi vì chúng tôi tin vào nó. Tôi đã tin vào NVIDIA hơn 30 năm và đến giờ vẫn tin như thế.",
    image: Q17,
    kind: "portrait",
  },
  {
    id: "q18",
    number: "18",
    text: "Thế giới này vốn dĩ đầy bất định. Thế giới có thể không công bằng và trao cho bạn những lá bài xấu. Nhanh chóng - hãy gạt nó qua một bên.",
    image: Q18,
    kind: "portrait",
  },
];
