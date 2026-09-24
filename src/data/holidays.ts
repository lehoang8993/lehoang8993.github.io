import { Holiday } from '../types/lunar';

export const VIETNAMESE_HOLIDAYS: Holiday[] = [
  // --- LỄ ÂM LỊCH CHÍNH ---
  {
    id: 'tet-nguyen-dan',
    title: 'Tết Nguyên Đán (Tết Cổ Truyền)',
    type: 'lunar',
    day: 1,
    month: 1,
    durationDays: 4,
    isOfficialOffDay: true,
    shortDescription: 'Lễ hội lớn nhất và quan trọng nhất trong văn hóa truyền thống của người Việt, khởi đầu năm mới.',
    historicalSignificance: 'Tết Nguyên Đán (từ chữ Hán: Tết: tiết trời; Nguyên: khởi đầu; Đán: buổi sáng sớm). Là khoảnh khắc giao hòa giữa đất trời, con người và thần linh, thời điểm các thế hệ sum họp gia đình, tri ân tổ tiên và ước nguyện một năm mới an khang thịnh vượng.',
    customs: [
      'Bao sái bàn thờ, trang hoàng nhà cửa bằng hoa đào, hoa mai, cây quất.',
      'Cúng Tất niên chiều 30 Tết và đón Giao thừa linh thiêng lúc 0h.',
      'Tục xông đất đầu năm chọn người hợp tuổi, hợp mệnh gia chủ.',
      'Chúc Tết người thân, mừng tuổi bằng phong bao lì xì đỏ may mắn.',
      'Đi lễ chùa đầu năm cầu bình an, xin lộc, xin chữ ông Đồ.'
    ],
    food: ['Bánh chưng (miền Bắc)', 'Bánh tét (miền Nam)', 'Thịt kho tàu hột vịt', 'Dưa hành, củ kiệu ngâm chua', 'Giò lụa, nem rán', 'Canh măng sườn móng giò', 'Mứt Tết ngũ sắc'],
    taboos: [
      'Kiêng quét nhà, đổ rác ngày Mùng 1 để không quét đi tài lộc.',
      'Kiêng làm vỡ bát đĩa, gương, đồ sành sứ đầu năm.',
      'Kiêng cãi cọ, to tiếng, nói lời xui xẻo hoặc đòi nợ ngày đầu xuân.',
      'Người có tang hoặc vía xấu không nên đi xông nhà người khác.'
    ],
    prayerText: {
      title: 'Văn khấn Giao thừa trong nhà',
      content: `Nam mô A Di Đà Phật! (3 lần, 3 lạy)
Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Đức Đương lai hạ sinh Di Lặc Tôn Phật.
Con kính lạy các cụ Tiên linh Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Bá thúc huynh đệ, cô di tỷ muội nội ngoại gia tộc.
Nay là phút giao thừa năm cũ chuyển sang năm mới.
Tín chủ chúng con là... ngụ tại...
Nhân phút thiêng liêng Giao thừa, chúng con thành tâm sắm sửa hương hoa lễ vật dâng lên trước án.
Cúi xin chư vị giáng lâm trước án, thụ hưởng lễ vật, độ trì cho toàn gia chúng con năm mới vạn sự an khang, gia đạo hưng thịnh, vạn sự hanh thông.
Nam mô A Di Đà Phật! (3 lần, 3 lạy)`
    }
  },
  {
    id: 'tet-nguyen-tieu',
    title: 'Tết Nguyên Tiêu (Rằm tháng Giêng)',
    type: 'lunar',
    day: 15,
    month: 1,
    isOfficialOffDay: false,
    shortDescription: 'Đêm rằm đầu tiên của năm mới, dân gian có câu: "Lễ Phật quanh năm không bằng ngày Rằm tháng Giêng".',
    historicalSignificance: 'Tết Thượng Nguyên (Nguyên Tiêu) là ngày trăng tròn đầu tiên trong năm. Trong truyền thống Phật giáo và tín ngưỡng dân gian, đây là ngày cúng trời đất, cầu nguyện quốc thái dân an, mùa màng bội thu và tiêu trừ tai ách.',
    customs: [
      'Đi chùa lễ Phật, phóng sinh chim cá để tạo phúc lành.',
      'Chuẩn bị mâm cỗ chay thanh tịnh dâng Phật và mâm cỗ mặn cúng gia tiên.',
      'Thả hoa đăng cầu nguyện bình an trên sông hồ.'
    ],
    food: ['Bánh trôi nước ngũ sắc (tượng trưng cho sự viên mãn trôi chảy)', 'Xôi gấc đỏ son', 'Chè trôi nước lá dứa', 'Mâm cỗ chay ngũ sắc'],
    taboos: [
      'Kiêng sát sinh thú vật trong ngày Rằm tháng Giêng.',
      'Tránh tranh cãi, nói lời bất kính nơi đền chùa chốn linh thiêng.'
    ],
    prayerText: {
      title: 'Văn khấn Rằm tháng Giêng tại gia',
      content: `Nam mô A Di Đà Phật! (3 lần, 3 lạy)
Con kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.
Con kính lạy Tổ tiên nội ngoại tông tộc họ...
Hôm nay là ngày Rằm tháng Giêng năm...
Tín chủ con thành tâm sắm lễ hương hoa quả ngọt, dâng lên trước án.
Kính xin các ngài phù hộ độ trì cho gia quyến bốn mùa không hạn ách nào xâm, tám tiết hưởng điều lành tiếp ứng.
Nam mô A Di Đà Phật! (3 lần, 3 lạy)`
    }
  },
  {
    id: 'tet-han-thuc',
    title: 'Tết Hàn Thực (Tết Bánh trôi Bánh chay)',
    type: 'lunar',
    day: 3,
    month: 3,
    isOfficialOffDay: false,
    shortDescription: 'Ngày tưởng nhớ tổ tiên, thưởng thức bánh trôi bánh chay mang ý nghĩa thuần khiết hướng về cội nguồn.',
    historicalSignificance: 'Mặc dù bắt nguồn từ điển tích Giới Tử Thôi thời Xuân Thu, khi du nhập vào Việt Nam, Tết Hàn Thực đã được Việt hóa đậm nét trở thành ngày tri ân tổ tiên, mang tinh thần sum vầy thanh đạm của gia đình Việt.',
    customs: [
      'Cả nhà cùng quây quần nặn bánh trôi tròn trịa và bánh chay thơm ngát.',
      'Dâng đĩa bánh trôi, bánh chay lên bàn thờ tổ tiên.',
      'Viếng mộ người thân, dọn cỏ chăm sóc phần mộ gia tiên.'
    ],
    food: ['Bánh trôi nước bọc đường phèn hạt sen', 'Bánh chay nhân đậu xanh thoảng hương hoa bưởi'],
    taboos: [
      'Tránh cúng bánh bị vỡ hoặc nhân chua hỏng.',
      'Giữ thái độ trang nghiêm, không đùa cợt khi làm bánh dâng cúng.'
    ]
  },
  {
    id: 'gio-to-hung-vuong',
    title: 'Giỗ Tổ Hùng Vương (10/3 Âm lịch)',
    type: 'lunar',
    day: 10,
    month: 3,
    isOfficialOffDay: true,
    shortDescription: 'Ngày quốc lễ thiêng liêng tri ân các Vua Hùng đã có công dựng nước Việt Nam: "Dù ai đi ngược về xuôi..."',
    historicalSignificance: 'Tín ngưỡng thờ cúng Hùng Vương đã được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại. Ngày hội tụ tinh thần đại đoàn kết toàn dân tộc, nhắc nhở con cháu Lạc Hồng về nguồn cội giang sơn gấm vóc.',
    customs: [
      'Đại lễ dâng hương tại Khu Di tích lịch sử Đền Hùng (Núi Nghĩa Lĩnh, Việt Trì, Phú Thọ).',
      'Lễ rước kiệu truyền thống và hội thi gói bánh chưng, giã bánh giầy.',
      'Các gia đình làm mâm cơm tươm tất thắp hương nhớ ơn Tiên Tổ.'
    ],
    food: ['Bánh chưng vuông (tượng trưng cho Đất)', 'Bánh giầy tròn (tượng trưng cho Trời)', 'Xôi gấc', 'Gà trống thiến luộc ngậm hoa hồng'],
    taboos: ['Ăn mặc hở hang khi tham gia trẩy hội Đền Hùng', 'Xô đẩy, chen lấn nơi chốn linh thiêng']
  },
  {
    id: 'tet-doan-ngo',
    title: 'Tết Đoan Ngọ (Tết Diệt Sâu Bọ)',
    type: 'lunar',
    day: 5,
    month: 5,
    isOfficialOffDay: false,
    shortDescription: 'Tết diệt sâu bọ trừ dịch bệnh lúc giữa năm, ăn cơm rượu nếp, quả chua khi vừa thức giấc.',
    historicalSignificance: 'Đoan Ngọ là thời điểm Mặt trời ở điểm gần xích đạo nhất, khí dương thịnh cực điểm. Người xưa dùng ngày này để làm sạch cơ thể, trừ khử sâu bọ gây hại mùa màng và phòng ngừa dịch bệnh chuyển mùa hè.',
    customs: [
      'Ăn cơm rượu nếp cay nồng và hoa quả vị chua ngay khi sáng sớm thức dậy.',
      'Hái lá thuốc nam vào đúng giờ Ngọ (11h - 13h) để phơi khô tích trữ làm thuốc chữa bệnh.',
      'Khảo cây (gõ vào thân cây ăn quả) cầu mong vụ sau sai trĩu cành.'
    ],
    food: ['Cơm rượu nếp cẩm, nếp cái hoa vàng', 'Bánh tro (bánh gio) chấm mật mía', 'Vải thiều, mận hậu chín đỏ, dưa hấu'],
    taboos: ['Vứt đồ ăn thừa bừa bãi trong nhà ngày này', 'Đi tắm sông hồ nguy hiểm vào buổi trưa nắng gắt']
  },
  {
    id: 'le-vu-lan',
    title: 'Lễ Vu Lan Báo Hiếu & Xá Tội Vong Nhân',
    type: 'lunar',
    day: 15,
    month: 7,
    isOfficialOffDay: false,
    shortDescription: 'Đại lễ mùa báo hiếu cha mẹ và mở rộng lòng từ bi xá tội cho các vong linh lang thang không nơi nương tựa.',
    historicalSignificance: 'Gắn liền với tích Bồ Tát Mục Kiền Liên cứu mẹ nơi cõi ngục. Tại Việt Nam, Vu Lan là dịp tôn vinh đạo hiếu thiêng liêng cao đẹp của con người đối với đấng sinh thành dưỡng dục.',
    customs: [
      'Nghi thức bông hồng cài áo (hoa đỏ cho người còn cha mẹ, hoa trắng cho người cha mẹ đã khuất).',
      'Làm lễ cúng dâng y, cúng chay hồi hướng công đức cho cha mẹ tổ tiên.',
      'Cúng chúng sinh (thí thực cô hồn) ngoài trời với cháo hoa, bỏng gạo, mía róc.',
      'Phóng sinh chim thú, thả đèn hoa đăng lung linh trên dòng sông.'
    ],
    food: ['Mâm cỗ chay thanh tịnh', 'Chè hạt sen long nhãn', 'Cháo trắng loãng cúng chúng sinh', 'Bỏng gạo, khoai lang luộc'],
    taboos: [
      'Kiêng sát sinh hại mạng tạo thêm nghiệp dữ.',
      'Không để trẻ nhỏ nhặt tiền lẻ rơi vãi ngoài đường khi cúng chúng sinh.'
    ],
    prayerText: {
      title: 'Văn khấn Thí Thực Cô Hồn (Lễ Vu Lan)',
      content: `Kính lạy Đức Phật Thích Ca Mâu Ni, Đức Phật A Di Đà, Đức Quan Thế Âm Bồ Tát.
Kính lạy Tiêu Diện Đại Sĩ, chư vị Hộ pháp thiện thần.
Hôm nay là tiết Vu Lan, ngày rằm tháng Bảy.
Tín chủ chúng con thiết lập đàn tràng, sắm sửa cháo hoa, bỏng nổ, hương hoa quả thực.
Cung thỉnh các hương linh không nơi nương tựa, phiêu bạt chốn dương gian.
Xin hãy về thụ hưởng lễ vật, nghe lời kinh Phật, sớm siêu sinh về miền tịnh cảnh an lành.
Nam mô Tiêu Diện Đại Sĩ Bồ Tát Ma Ha Tát!`
    }
  },
  {
    id: 'tet-trung-thu',
    title: 'Tết Trung Thu (Tết Trông Trăng, Tết Thiếu Nhi)',
    type: 'lunar',
    day: 15,
    month: 8,
    isOfficialOffDay: false,
    shortDescription: 'Đêm trăng tròn sáng nhất trong năm, ngày tết sum vầy của thiếu nhi và gia đình thưởng trà ngắm nguyệt.',
    historicalSignificance: 'Tiết trăng thu dịu mát, trăng tròn biểu trưng cho sự đoàn tụ viên mãn. Đây là ngày hội vui tươi rước đèn, phá cỗ, gắn liền với hình tượng Chị Hằng, Chú Cuội và điệu múa lân rộn rã.',
    customs: [
      'Bày mâm cỗ Trung Thu ngũ quả với chú cún bằng tép bưởi đáng yêu.',
      'Rước đèn ông sao, đèn kéo quân và xem múa lân sư rồng.',
      'Gia đình quây quần phá cỗ trông trăng, thưởng bánh nướng bánh dẻo với trà sen.'
    ],
    food: ['Bánh trung thu nướng thập cẩm, đậu xanh trứng muối', 'Bánh dẻo hạt sen', 'Bưởi đào tép hồng', 'Hồng giòn, chuối tiêu, na dai'],
    taboos: ['Tránh làm vỡ đèn lồng trong lúc rước đèn', 'Ăn mặc lôi thôi khi ra ngoài đón trăng sum họp']
  },
  {
    id: 'tet-ong-tao',
    title: 'Lễ Cúng Ông Công Ông Táo (23 tháng Chạp)',
    type: 'lunar',
    day: 23,
    month: 12,
    isOfficialOffDay: false,
    shortDescription: 'Lễ tiễn Táo Quân cưỡi cá chép vàng bay về Trời tấu báo việc tốt xấu của gia đình trong một năm.',
    historicalSignificance: 'Thần Táo Quân cai quản bếp núc và định đoạt phúc lộc trong nhà. Ngày 23 tháng Chạp, Táo Quân cưỡi cá chép hóa rồng lên Thiên đình báo cáo với Ngọc Hoàng Thượng Đế, khởi đầu chuỗi ngày chuẩn bị đón Tết.',
    customs: [
      'Bao sái, lau dọn khu vực bếp và bàn thờ gia tiên sạch sẽ bóng bẩy.',
      'Chuẩn bị 3 con cá chép đỏ còn sống khỏe mạnh bơi trong chậu nước trong.',
      'Dâng bộ mũ áo Táo Quân và mâm cỗ mặn thịnh soạn trước giờ Ngọ.',
      'Phóng sinh cá chép ra sông, hồ nước sạch sau khi hương tàn.'
    ],
    food: ['Gà trống luộc', 'Xôi gấc đỏ', 'Giò lụa', 'Canh bóng bì lợn nấm hương', 'Chè hoa cau'],
    taboos: [
      'Kiêng cúng sau 12h trưa ngày 23 (Táo Quân đã về trời).',
      'Tuyệt đối không ném cả túi nilon xuống sông hồ khi thả cá chép.',
      'Không dùng cá ươn, cá chết làm lễ cúng.'
    ],
    prayerText: {
      title: 'Văn khấn tiễn Táo Quân chầu Trời',
      content: `Nam mô A Di Đà Phật! (3 lần, 3 lạy)
Con kính lạy Thượng đế, Hoàng thiên Hậu Thổ, chư vị Tôn thần.
Con kính lạy Ngài Đông trù Tư mệnh Táo phủ Thần quân.
Hôm nay ngày 23 tháng Chạp năm...
Tín chủ chúng con là... ngụ tại...
Thành tâm sắm sửa hương hoa phẩm vật, áo hài cá chép dâng lên trước án.
Kính tiễn Táo quân cưỡi mây bay về chầu trời.
Cúi xin Táo quân tâu bày điều lành, che chở điều dữ, phù hộ cho gia trung bốn mùa an khang thái bình.
Nam mô A Di Đà Phật!`
    }
  },
  {
    id: 'le-tat-nien',
    title: 'Lễ Cúng Tất Niên (Chiều 30 Tết)',
    type: 'lunar',
    day: 30, // hoặc 29 nếu tháng thiếu
    month: 12,
    isOfficialOffDay: true,
    shortDescription: 'Bữa cơm sum họp cuối năm, tạ ơn trời đất tổ tiên và mời tiền nhân về ăn Tết cùng con cháu.',
    historicalSignificance: 'Khép lại toàn bộ lo toan của năm cũ. Bữa cơm chiều Tất niên là khoảnh khắc thiêng liêng nhất khi mọi thành viên tề tựu đông đủ, sưởi ấm tình thân và chuẩn bị tâm thế đón năm mới.',
    customs: [
      'Hoàn tất mọi công việc dọn dẹp, trang trí cây hoa đón Tết.',
      'Bày mâm cỗ cúng gia tiên và mâm cúng ngoài trời tạ tạ thần linh cai quản.',
      'Cả nhà cùng ngồi quây quần thưởng thức bữa cơm Tất niên ấm cúng.',
      'Nấu nồi nước lá mùi già thơm lừng để tắm gội tẩy trần chiều cuối năm.'
    ],
    food: ['Mâm ngũ quả tươi ngon', 'Gà luộc vàng ươm', 'Bánh chưng xanh dưa hành', 'Nem rán giòn rụm', 'Thịt đông, canh miến dong'],
    taboos: ['Tránh to tiếng, cãi vã trong bữa cơm Tất niên', 'Không để nhà cửa bừa bộn khi bước sang giờ Giao thừa']
  },

  // --- LỄ DƯƠNG LỊCH LỚN TẠI VIỆT NAM ---
  {
    id: 'tet-duong-lich',
    title: 'Tết Dương Lịch (Tết Tây)',
    type: 'solar',
    day: 1,
    month: 1,
    isOfficialOffDay: true,
    shortDescription: 'Ngày đầu tiên của năm mới theo lịch Gregorius (Dương lịch), kỳ nghỉ lễ toàn quốc.',
    historicalSignificance: 'Đánh dấu sự khởi đầu của năm dương lịch mới theo thông lệ quốc tế. Dịp nghỉ ngơi, du xuân và đặt ra các mục tiêu kế hoạch mới trong công việc và cuộc sống.',
    customs: [
      'Xem pháo hoa chào đón năm mới tại các trung tâm thành phố lớn.',
      'Gặp gỡ bạn bè, đi du lịch nghỉ ngơi cùng gia đình.',
      'Viết danh sách mục tiêu năm mới (New Year resolutions).'
    ],
    food: ['Tiệc nướng BBQ gia đình', 'Bánh ngọt đón năm mới', 'Rượu vang khai tiệc'],
    taboos: ['Uống rượu bia khi lái xe tham gia giao thông']
  },
  {
    id: 'quoc-te-phu-nu',
    title: 'Ngày Quốc tế Phụ nữ (8/3)',
    type: 'solar',
    day: 8,
    month: 3,
    isOfficialOffDay: false,
    shortDescription: 'Ngày tôn vinh vẻ đẹp, sự hy sinh và những đóng góp to lớn của phụ nữ trên toàn thế giới.',
    historicalSignificance: 'Kỷ niệm cuộc đấu tranh đòi quyền bình đẳng của phụ nữ lao động quốc tế, đồng thời là dịp tri ân bà, mẹ, vợ, chị em gái và đồng nghiệp nữ.',
    customs: [
      'Tặng hoa tươi, thiệp chúc mừng và quà tặng ý nghĩa cho người phụ nữ yêu thương.',
      'Tổ chức các buổi gặp mặt, tôn vinh trong cơ quan và gia đình.'
    ],
    food: ['Bữa tối lãng mạn do đấng mày râu chuẩn bị', 'Bánh kem hoa'],
    taboos: ['Vô tâm quên lời chúc mừng đến những người phụ nữ thân thương']
  },
  {
    id: 'giai-phong-mien-nam',
    title: 'Ngày Giải phóng miền Nam (30/4)',
    type: 'solar',
    day: 30,
    month: 4,
    isOfficialOffDay: true,
    shortDescription: 'Đại thắng mùa xuân 1975, non sông thu về một mối, đất nước trọn niềm vui thống nhất.',
    historicalSignificance: 'Ngày xe tăng Quân giải phóng húc đổ cổng Dinh Độc Lập ngày 30/4/1975, kết thúc thắng lợi cuộc kháng chiến chống Mỹ cứu nước, non sông liền một dải, mở ra kỷ nguyên độc lập tự do phát triển.',
    customs: [
      'Treo cờ Tổ quốc đỏ sao vàng rực rỡ khắp các tuyến phố.',
      'Viếng nghĩa trang liệt sĩ, tưởng nhớ các anh hùng liệt sĩ đã ngã xuống.',
      'Xem chương trình biểu diễn nghệ thuật, diễu hành kỷ niệm.'
    ],
    food: ['Mâm cơm liên hoan gia đình ngày đại lễ'],
    taboos: ['Có hành vi thiếu tôn trọng cờ Tổ quốc hoặc các di tích lịch sử cách mạng']
  },
  {
    id: 'quoc-te-lao-dong',
    title: 'Ngày Quốc tế Lao động (1/5)',
    type: 'solar',
    day: 1,
    month: 5,
    isOfficialOffDay: true,
    shortDescription: 'Ngày hội của giai cấp công nhân và nhân dân lao động trên toàn thế giới, nghỉ lễ liền kề 30/4.',
    historicalSignificance: 'Bắt nguồn từ cuộc bãi công ngày 1/5/1886 tại Chicago (Mỹ) đòi ngày làm việc 8 giờ. Tôn vinh sức lao động chân chính và tình đoàn kết quốc tế.',
    customs: ['Tận hưởng kỳ nghỉ dài ngày cùng người thân, đi du lịch dã ngoại'],
    food: ['Hải sản tươi ngon vùng biển', 'Ẩm thực đồng quê'],
    taboos: ['Làm việc quá sức trong kỳ nghỉ phục hồi năng lượng']
  },
  {
    id: 'quoc-khanh-viet-nam',
    title: 'Ngày Quốc Khánh Việt Nam (2/9)',
    type: 'solar',
    day: 2,
    month: 9,
    isOfficialOffDay: true,
    shortDescription: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử năm 1945.',
    historicalSignificance: 'Khai sinh ra nước Việt Nam Dân chủ Cộng hòa (nay là Cộng hòa Xã hội Chủ nghĩa Việt Nam). Mốc son chói lọi trong lịch sử hàng ngàn năm dựng nước và giữ nước của dân tộc.',
    customs: [
      'Treo cờ đỏ sao vàng tại từng hộ gia đình.',
      'Viếng Lăng Chủ tịch Hồ Chí Minh tại thủ đô Hà Nội.',
      'Thưởng thức các chương trình pháo hoa và hòa nhạc chào mừng Quốc khánh.'
    ],
    food: ['Bữa cơm sum họp ngày Quốc khánh'],
    taboos: ['Tụ tập gây mất an ninh trật tự nơi công cộng']
  },
  {
    id: 'phu-nu-viet-nam',
    title: 'Ngày Phụ nữ Việt Nam (20/10)',
    type: 'solar',
    day: 20,
    month: 10,
    isOfficialOffDay: false,
    shortDescription: 'Ngày thành lập Hội Phụ nữ phản đế Việt Nam (1930), tôn vinh người phụ nữ Việt Nam kiên cường, đảm đang.',
    historicalSignificance: 'Tôn vinh truyền thống anh hùng, bất khuất, trung hậu, đảm đang của phụ nữ Việt Nam qua các thời kỳ lịch sử.',
    customs: ['Tặng hoa, quà và gửi gắm những lời tri ân sâu sắc tới bà, mẹ, vợ và chị em.'],
    food: ['Trà hoa cúc, bánh hoa hồng ngọt ngào'],
    taboos: ['Thờ ơ, vô cảm với người phụ nữ trong gia đình']
  },
  {
    id: 'nha-giao-viet-nam',
    title: 'Ngày Nhà giáo Việt Nam (20/11)',
    type: 'solar',
    day: 20,
    month: 11,
    isOfficialOffDay: false,
    shortDescription: 'Ngày lễ truyền thống "Tôn sư trọng đạo", tri ân công ơn dạy dỗ của các thầy cô giáo.',
    historicalSignificance: 'Bắt đầu từ bản Hiến chương các nhà giáo năm 1957, chính thức chọn làm ngày hội tôn vinh nghề dạy học cao quý từ năm 1982.',
    customs: [
      'Học sinh, sinh viên về thăm lại trường xưa, tặng hoa thầy cô giáo cũ.',
      'Hội thi văn nghệ, viết báo tường chào mừng ngày Nhà giáo.'
    ],
    food: ['Trái cây, bánh kẹo liên hoan lớp học'],
    taboos: ['Thất lễ, bất kính với thầy cô giáo']
  },

  // --- LỄ HỘI DÂN GIAN TRUYỀN THỐNG NỔI TIẾNG ---
  {
    id: 'hoi-chua-huong',
    title: 'Lễ hội Chùa Hương (Hà Nội)',
    type: 'traditional_festival',
    day: 6,
    month: 1, // Âm lịch
    shortDescription: 'Lễ hội hành hương Phật giáo dài nhất nước, xuôi dòng suối Yến thơ mộng vào cõi Phật Nam Thiên Đệ Nhất Động.',
    historicalSignificance: 'Kéo dài từ mùng 6 tháng Giêng đến hết tháng 3 Âm lịch. Quần thể chùa Hương (Mỹ Đức, Hà Nội) là miền đất thiêng của Phật Bà Quán Thế Âm.',
    customs: [
      'Đi thuyền trên dòng suối Yến nước xanh biếc.',
      'Hành hương leo động Hương Tích, thắp nhang cầu tự và xin may mắn.',
      'Ngắm hoa mơ nở trắng rừng Hương Sơn.'
    ],
    food: ['Rau sắng chùa Hương', 'Chè củ mài', 'Bánh củ mài'],
    taboos: ['Xả rác xuống dòng suối Yến', 'Chèo kéo, vòi vĩnh tiền đò du khách']
  },
  {
    id: 'hoi-lim',
    title: 'Hội Lim Kinh Bắc (Bắc Ninh)',
    type: 'traditional_festival',
    day: 13,
    month: 1, // Âm lịch
    shortDescription: 'Hội tụ tinh hoa Dân ca Quan họ Bắc Ninh - Di sản văn hóa phi vật thể của nhân loại.',
    historicalSignificance: 'Hội Lim tổ chức tại đồi Lim (Tiên Du, Bắc Ninh), tôn vinh những làn điệu dân ca mượt mà, đằm thắm của liền anh, liền chị áo the khăn xếp.',
    customs: [
      'Nghe hát quan họ trên thuyền rồng, tại các lán trại và trong nhà nghệ nhân.',
      'Thưởng thức trầu têm cánh phượng thơm cay.',
      'Chơi các trò chơi dân gian: đấu vật, đánh đu, cờ người.'
    ],
    food: ['Bánh phu thê Đình Bảng', 'Nem bùi Ninh Xá', 'Rượu làng Vân'],
    taboos: ['Ngắt hoa bẻ cành bừa bãi tại lễ hội']
  },
  {
    id: 'hoi-giong',
    title: 'Hội Gióng Đền Phù Đổng & Đền Sóc',
    type: 'traditional_festival',
    day: 9,
    month: 4, // Âm lịch
    shortDescription: 'Lễ hội tái hiện chiến công hiển hách của Phù Đổng Thiên Vương đánh tan giặc Ân bảo vệ giang sơn.',
    historicalSignificance: 'Được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại. Diễn xướng hoành tráng tái hiện các trận đánh thần kỳ bằng tre ngà.',
    customs: [
      'Lễ rước cờ, rước kiệu hoa tre trang nghiêm.',
      'Tái hiện màn múa cờ lệnh điều binh của Ông Hiệu.',
      'Tục cướp hoa tre lấy may mắn phước lành cho gia đình.'
    ],
    food: ['Cơm nắm muối vừng', 'Bánh tẻ', 'Thịt dê nướng'],
    taboos: ['Xô đẩy tranh cướp bạo lực hoa tre']
  },
  {
    id: 'ba-chua-xu',
    title: 'Lễ hội Vía Bà Chúa Xứ Núi Sam (Châu Đốc, An Giang)',
    type: 'traditional_festival',
    day: 23,
    month: 4, // Âm lịch
    shortDescription: 'Lễ hội tâm linh lớn nhất vùng đất Tây Nam Bộ, thu hút hàng triệu du khách hành hương cầu an, xin tài lộc.',
    historicalSignificance: 'Di sản văn hóa phi vật thể quốc gia, tôn kính Bà Chúa Xứ núi Sam linh thiêng che chở mùa màng, phù hộ người dân xứ sông nước buôn may bán đắt.',
    customs: [
      'Lễ Tắm Bà vào lúc 0h đêm 23 rạng sáng 24/4 Âm lịch bằng nước thơm hoa quả.',
      'Lễ thỉnh sắc Thoại Ngọc Hầu và hai phu nhân.',
      'Dâng áo choàng thêu rồng phượng lên Bà để cầu lộc buôn bán.'
    ],
    food: ['Mắm cá Châu Đốc', 'Bò bảy món Núi Sam', 'Thốt nốt lạnh ngọt mát'],
    taboos: ['Mua chim phóng sinh bị nhốt ép hoặc mê tín dị đoan thái quá']
  }
];
