/**
 * Astronomical Vietnamese Lunar-Solar Calendar Calculation Engine
 * Based on Dr. Ho Ngoc Duc's astronomical algorithm calibrated for Hanoi meridian (UTC+7).
 */

import {
  LunarDate,
  SolarDate,
  CanChiInfo,
  FullCanChi,
  HourAuspicious,
  DayDetailedInfo,
} from '../types/lunar';

const PI = Math.PI;

export const CAN_NAMES = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
export const CHI_ANIMALS = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Lợn'];

export const TIET_KHI_NAMES = [
  'Xuân phân', 'Thanh minh', 'Cốc vũ', 'Lập hạ',
  'Tiểu mãn', 'Mang chủng', 'Hạ chí', 'Tiểu thử',
  'Đại thử', 'Lập thu', 'Xử thử', 'Bạch lộ',
  'Thu phân', 'Hàn lộ', 'Sương giáng', 'Lập đông',
  'Tiểu tuyết', 'Đại tuyết', 'Đông chí', 'Tiểu hàn',
  'Đại hàn', 'Lập xuân', 'Vũ thủy', 'Kinh trập'
];

export const HOANG_DAO_STARS = [
  'Thanh Long', 'Minh Đường', 'Thiên Hình', 'Chu Tước',
  'Kim Quỹ', 'Kim Đường', 'Bạch Hổ', 'Ngọc Đường',
  'Thiên Lao', 'Huyền Vũ', 'Tư Mệnh', 'Câu Trận'
];

// 12 Trực
export const TRUC_NAMES = [
  { name: 'Kiến', meaning: 'Khởi đầu, xuất hành, giá thú tốt', isGood: true },
  { name: 'Trừ', meaning: 'Trừ phục, giải trừ, tắm gội, trị bệnh', isGood: true },
  { name: 'Mãn', meaning: 'Cầu tài, khai trương, xuất kho, nạp tài', isGood: true },
  { name: 'Bình', meaning: 'Bình an, tu sửa, hội họp', isGood: true },
  { name: 'Định', meaning: 'Ký kết hợp đồng, giao dịch, cầu tự', isGood: true },
  { name: 'Chấp', meaning: 'Xây dựng, trồng trọt, bắt giữ', isGood: false },
  { name: 'Phá', meaning: 'Phá vỡ, dỡ bỏ nhà cũ, tránh khởi sự', isGood: false },
  { name: 'Nguy', meaning: 'Cẩn trọng đi xa, phòng ngừa tai nạn', isGood: false },
  { name: 'Thành', meaning: 'Thành công, cưới hỏi, nhập trạch, mở mang', isGood: true },
  { name: 'Thâu', meaning: 'Thu hoạch, tích trữ, nạp lễ', isGood: true },
  { name: 'Khai', meaning: 'Mở cửa hàng, khai xuân, nhậm chức', isGood: true },
  { name: 'Bế', meaning: 'Đắp đê, ngăn nước, an táng, kiêng mở', isGood: false }
];

// Nhị thập bát tú (28 sao)
export const NHI_THAP_BAT_TU = [
  { name: 'Giác', element: 'Mộc', quality: 'Kiết (Tốt)', advice: 'Tốt cho hôn nhân, tạo tác, thăng quan tiến chức.' },
  { name: 'Cang', element: 'Kim', quality: 'Hung (Xấu)', advice: 'Kỵ cưới hỏi, xây cất mồ mả, cẩn trọng kiện tụng.' },
  { name: 'Đê', element: 'Thổ', quality: 'Hung (Xấu)', advice: 'Không nên khởi công nhà cửa, đề phòng trắc trở.' },
  { name: 'Phòng', element: 'Thái Dương', quality: 'Đại Kiết (Rất tốt)', advice: 'Vượng tài lộc, khởi nghiệp, xây cất đều đại cát.' },
  { name: 'Tâm', element: 'Thái Âm', quality: 'Hung (Xấu)', advice: 'Kỵ xuất hành, kinh doanh mở mang, nên giữ hòa khí.' },
  { name: 'Vĩ', element: 'Hỏa', quality: 'Kiết (Tốt)', advice: 'Tốt cho cưới xin, chôn cất, cầu phúc lộc.' },
  { name: 'Cơ', element: 'Thủy', quality: 'Kiết (Tốt)', advice: 'Thuận lợi cho trồng trọt, may mặc, nhập trạch.' },
  { name: 'Đẩu', element: 'Mộc', quality: 'Kiết (Tốt)', advice: 'Cắt may, cưới hỏi, dựng nhà, tế tự đều hanh thông.' },
  { name: 'Ngưu', element: 'Kim', quality: 'Hung (Xấu)', advice: 'Kỵ tạo tác, khai trương, cẩn thận tài sản.' },
  { name: 'Nữ', element: 'Thổ', quality: 'Hung (Xấu)', advice: 'Kỵ tranh chấp, kiện cáo, kiêng kỵ động thổ.' },
  { name: 'Hư', element: 'Thái Dương', quality: 'Hung (Xấu)', advice: 'Phòng sự cố, nên thủ thường an phận ngày này.' },
  { name: 'Nguy', element: 'Thái Âm', quality: 'Hung (Xấu)', advice: 'Kỵ leo cao, đi đường thủy, kiêng mở mang tiệc lớn.' },
  { name: 'Thất', element: 'Hỏa', quality: 'Kiết (Tốt)', advice: 'Tốt cho mưu đại sự, kết hôn, nhập học, vinh quy.' },
  { name: 'Bích', element: 'Thủy', quality: 'Kiết (Tốt)', advice: 'Vượng đinh tài, gia đạo hưng thịnh, tốt mọi sự.' },
  { name: 'Khuê', element: 'Mộc', quality: 'Hung (Xấu)', advice: 'Kỵ khai trương cửa hiệu, đào giếng, dỡ nhà.' },
  { name: 'Lâu', element: 'Kim', quality: 'Kiết (Tốt)', advice: 'Tốt cho nhập trạch, cầu y tế bệnh, mở hiệu buôn.' },
  { name: 'Vị', element: 'Thổ', quality: 'Kiết (Tốt)', advice: 'Thu tài nạp phúc, thuận cho mua sắm điền sản.' },
  { name: 'Mão', element: 'Thái Dương', quality: 'Hung (Xấu)', advice: 'Kỵ xây đắp công trình lớn, cẩn thận lời ăn tiếng nói.' },
  { name: 'Tất', element: 'Thái Âm', quality: 'Kiết (Tốt)', advice: 'Thuận lợi cưới hỏi, xây nhà, cầu công danh.' },
  { name: 'Chủy', element: 'Hỏa', quality: 'Hung (Xấu)', advice: 'Kỵ an táng, giá thú, đề phòng khẩu thiệt thị phi.' },
  { name: 'Sâm', element: 'Thủy', quality: 'Kiết (Tốt)', advice: 'Tốt cho xuất ngoại, buôn bán đường dài, kết giao bạn tốt.' },
  { name: 'Tỉnh', element: 'Mộc', quality: 'Kiết (Tốt)', advice: 'Hanh thông mọi việc, gặt hái thành quả, an khang.' },
  { name: 'Quỷ', element: 'Kim', quality: 'Hung (Xấu)', advice: 'Kỵ động thổ, cưới hỏi, cẩn trọng việc tang lễ.' },
  { name: 'Liễu', element: 'Thổ', quality: 'Hung (Xấu)', advice: 'Không nên xuất hành xa, tránh đầu tư mạo hiểm.' },
  { name: 'Tinh', element: 'Thái Dương', quality: 'Bình (Vừa)', advice: 'Hợp việc nhỏ, giữ chữ tín, kiêng mâu thuẫn lớn.' },
  { name: 'Trương', element: 'Thái Âm', quality: 'Kiết (Tốt)', advice: 'Cầu tài, nhận chức, đám cưới, may mặc đại cát.' },
  { name: 'Dực', element: 'Hỏa', quality: 'Hung (Xấu)', advice: 'Kỵ di dời chỗ ở, đi đường sông biển, cẩn thận giấy tờ.' },
  { name: 'Chẩn', element: 'Thủy', quality: 'Kiết (Tốt)', advice: 'Cát lợi trăm bề, xuất hành đắc lộc, gia sự êm ấm.' },
];

// Ngũ hành nạp âm Lục Thập Hoa Giáp
const NAP_AM_TABLE: Record<string, string> = {
  'Giáp Tý': 'Hải Trung Kim (Vàng trong biển)',
  'Ất Sửu': 'Hải Trung Kim (Vàng trong biển)',
  'Bính Dần': 'Lư Trung Hỏa (Lửa trong lò)',
  'Đinh Mão': 'Lư Trung Hỏa (Lửa trong lò)',
  'Mậu Thìn': 'Đại Lâm Mộc (Gỗ rừng già)',
  'Kỷ Tỵ': 'Đại Lâm Mộc (Gỗ rừng già)',
  'Canh Ngọ': 'Lộ Bàng Thổ (Đất ven đường)',
  'Tân Mùi': 'Lộ Bàng Thổ (Đất ven đường)',
  'Nhâm Thân': 'Kiếm Phong Kim (Vàng mũi kiếm)',
  'Quý Dậu': 'Kiếm Phong Kim (Vàng mũi kiếm)',
  'Giáp Tuất': 'Sơn Đầu Hỏa (Lửa đầu núi)',
  'Ất Hợi': 'Sơn Đầu Hỏa (Lửa đầu núi)',
  'Bính Tý': 'Giản Hạ Thủy (Nước khe suối)',
  'Đinh Sửu': 'Giản Hạ Thủy (Nước khe suối)',
  'Mậu Dần': 'Thành Đầu Thổ (Đất trên thành)',
  'Kỷ Mão': 'Thành Đầu Thổ (Đất trên thành)',
  'Canh Thìn': 'Bạch Lạp Kim (Vàng sáp ong)',
  'Tân Tỵ': 'Bạch Lạp Kim (Vàng sáp ong)',
  'Nhâm Ngọ': 'Dương Liễu Mộc (Gỗ cây dương)',
  'Quý Mùi': 'Dương Liễu Mộc (Gỗ cây dương)',
  'Giáp Thân': 'Tuyền Trung Thủy (Nước trong giếng)',
  'Ất Dậu': 'Tuyền Trung Thủy (Nước trong giếng)',
  'Bính Tuất': 'Ốc Thượng Thổ (Đất nóc nhà)',
  'Đinh Hợi': 'Ốc Thượng Thổ (Đất nóc nhà)',
  'Mậu Tý': 'Tích Lịch Hỏa (Lửa sấm sét)',
  'Kỷ Sửu': 'Tích Lịch Hỏa (Lửa sấm sét)',
  'Canh Dần': 'Tùng Bách Mộc (Gỗ tùng bách)',
  'Tân Mão': 'Tùng Bách Mộc (Gỗ tùng bách)',
  'Nhâm Thìn': 'Trường Lưu Thủy (Nước chảy dài)',
  'Quý Tỵ': 'Trường Lưu Thủy (Nước chảy dài)',
  'Giáp Ngọ': 'Sa Trung Kim (Vàng trong cát)',
  'Ất Mùi': 'Sa Trung Kim (Vàng trong cát)',
  'Bính Thân': 'Sơn Hạ Hỏa (Lửa dưới núi)',
  'Đinh Dậu': 'Sơn Hạ Hỏa (Lửa dưới núi)',
  'Mậu Tuất': 'Bình Địa Mộc (Gỗ đồng bằng)',
  'Kỷ Hợi': 'Bình Địa Mộc (Gỗ đồng bằng)',
  'Canh Tý': 'Bích Thượng Thổ (Đất trên vách)',
  'Tân Sửu': 'Bích Thượng Thổ (Đất trên vách)',
  'Nhâm Dần': 'Kim Bạch Kim (Vàng lá trắng)',
  'Quý Mão': 'Kim Bạch Kim (Vàng lá trắng)',
  'Giáp Thìn': 'Phúc Đăng Hỏa (Lửa ngọn đèn)',
  'Ất Tỵ': 'Phúc Đăng Hỏa (Lửa ngọn đèn)',
  'Bính Ngọ': 'Thiên Hà Thủy (Nước trên trời)',
  'Đinh Mùi': 'Thiên Hà Thủy (Nước trên trời)',
  'Mậu Thân': 'Đại Trạch Thổ (Đất nền lớn)',
  'Kỷ Dậu': 'Đại Trạch Thổ (Đất nền lớn)',
  'Canh Tuất': 'Thoa Xuyến Kim (Vàng trang sức)',
  'Tân Hợi': 'Thoa Xuyến Kim (Vàng trang sức)',
  'Nhâm Tý': 'Tang Đố Mộc (Gỗ cây dâu)',
  'Quý Sửu': 'Tang Đố Mộc (Gỗ cây dâu)',
  'Giáp Dần': 'Đại Khê Thủy (Nước khe lớn)',
  'Ất Mão': 'Đại Khê Thủy (Nước khe lớn)',
  'Bính Thìn': 'Sa Trung Thổ (Đất phù sa cát)',
  'Đinh Tỵ': 'Sa Trung Thổ (Đất phù sa cát)',
  'Mậu Ngọ': 'Thiên Thượng Hỏa (Lửa trên trời)',
  'Kỷ Mùi': 'Thiên Thượng Hỏa (Lửa trên trời)',
  'Canh Thân': 'Thạch Lựu Mộc (Gỗ cây lựu đá)',
  'Tân Dậu': 'Thạch Lựu Mộc (Gỗ cây lựu đá)',
  'Nhâm Tuất': 'Đại Hải Thủy (Nước biển lớn)',
  'Quý Hợi': 'Đại Hải Thủy (Nước biển lớn)',
};

// Ca dao, tục ngữ, danh ngôn Việt Nam
const VIETNAMESE_PROVERBS = [
  { text: 'Chim khôn kêu tiếng rảnh rang, người khôn nói tiếng dịu dàng dễ nghe.', authorOrSource: 'Ca dao tục ngữ Việt Nam' },
  { text: 'Muốn no thì phải chăm làm, một hạt thóc vàng chín giọt mồ hôi.', authorOrSource: 'Tục ngữ Việt Nam' },
  { text: 'Thuận vợ thuận chồng, tát biển Đông cũng cạn.', authorOrSource: 'Tục ngữ dân gian' },
  { text: 'Lời nói chẳng mất tiền mua, lựa lời mà nói cho vừa lòng nhau.', authorOrSource: 'Ca dao ngàn xưa' },
  { text: 'Có công mài sắt, có ngày nên kim.', authorOrSource: 'Tục ngữ Việt Nam' },
  { text: 'Học thầy không tày học bạn, đi một ngày đàng học một sàng khôn.', authorOrSource: 'Tục ngữ Việt Nam' },
  { text: 'Uống nước nhớ nguồn, ăn quả nhớ kẻ trồng cây.', authorOrSource: 'Đạo lý dân tộc' },
  { text: 'Lửa thử vàng, gian nan thử sức, việc khó tôi luyện người tài.', authorOrSource: 'Cổ nhân giảng dạy' },
  { text: 'Cây ngay không sợ chết đứng, lòng ngay thảo dạ vẹn mười.', authorOrSource: 'Tục ngữ truyền thống' },
  { text: 'Trăm năm bia đá thì mòn, ngàn năm bia miệng vẫn còn trơ trơ.', authorOrSource: 'Ca dao lưu truyền' },
  { text: 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.', authorOrSource: 'Ca dao tình đoàn kết' },
  { text: 'Gần mực thì đen, gần đèn thì rạng, chọn bạn mà chơi.', authorOrSource: 'Lời răn dạy cổ xưa' },
  { text: 'Đức năng thắng số, tâm an vạn sự an, tích thiện ắt phùng thiện.', authorOrSource: 'Triết lý phương Đông' },
  { text: 'Tấc đất tấc vàng, chăm vun trồng ắt mùa màng tươi tốt.', authorOrSource: 'Kinh nghiệm dân gian' },
  { text: 'Giấy rách phải giữ lấy lề, người sang trọng cốt ở nết na.', authorOrSource: 'Gia huấn cổ nhân' }
];

/**
 * Convert Date to Julian Day Number
 */
export function jdFromDate(dd: number, mm: number, yy: number): number {
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

function INT(d: number): number {
  return Math.floor(d);
}

/**
 * Convert Julian Day Number to Gregorian Date
 */
export function jdToDate(jd: number): SolarDate {
  let a: number, b: number, c: number;
  if (jd > 2299160) {
    a = jd + 32044;
    b = INT((4 * a + 3) / 146097);
    c = a - INT((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  let d = INT((4 * c + 3) / 1461);
  let e = c - INT((1461 * d) / 4);
  let m = INT((5 * e + 2) / 153);
  let day = e - INT((153 * m + 2) / 5) + 1;
  let month = m + 3 - 12 * INT(m / 10);
  let year = b * 100 + d - 4800 + INT(m / 10);
  return { day, month, year };
}

/**
 * Compute the time of the k-th new moon after the new moon of 1/1/1900 13:52 UCT
 */
function NewMoon(k: number): number {
  let T = k / 1236.85;
  let T2 = T * T;
  let T3 = T2 * T;
  let dr = PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  let M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  let Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  let F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  let deltat: number;
  if (T < -11) {
    deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }
  let JdNew = Jd1 + C1 - deltat;
  return JdNew;
}

/**
 * Sun longitude in radians normalized to [0, 2*PI)
 */
function SunLongitude(jdn: number): number {
  let T = (jdn - 2451545.0) / 36525;
  let T2 = T * T;
  let dr = PI / 180;
  let M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  let L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - PI * 2 * INT(L / (PI * 2));
  return L;
}

/**
 * Compute sun position at midnight of the day with given Julian day number (returns 0..11)
 */
function getSunLongitude(dayNumber: number, timeZone: number): number {
  return INT((SunLongitude(dayNumber - 0.5 - timeZone / 24) / PI) * 6);
}

/**
 * Find New Moon (Sóc) Julian Day in given time zone
 */
function getNewMoonDay(k: number, timeZone: number): number {
  return INT(NewMoon(k) + 0.5 + timeZone / 24);
}

/**
 * Find the day that starts the lunar month 11 of the given year
 */
function getLunarMonth11(yy: number, timeZone: number): number {
  let off = jdFromDate(31, 12, yy) - 2415021;
  let k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  let sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

/**
 * Find the index of the leap month after the month starting on day a11
 */
function getLeapMonthOffset(a11: number, timeZone: number): number {
  let k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

/**
 * Convert Solar Date to Vietnamese Lunar Date (Dr. Ho Ngoc Duc)
 */
export function convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number = 7): LunarDate {
  let dayNumber = jdFromDate(dd, mm, yy);
  let k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  let lunarDay = dayNumber - monthStart + 1;
  let diff = INT((monthStart - a11) / 29);
  let isLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    let leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        isLeap = true;
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }
  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap,
    jd: dayNumber,
  };
}

/**
 * Convert Vietnamese Lunar Date to Solar Date (Dr. Ho Ngoc Duc)
 */
export function convertLunar2Solar(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  lunarLeap: boolean = false,
  timeZone: number = 7
): SolarDate | null {
  let a11: number, b11: number;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear + 1, timeZone);
  }
  let k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarMonth - 11;
  if (off < 0) {
    off += 12;
  }
  if (b11 - a11 > 365) {
    let leapOff = getLeapMonthOffset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) {
      leapMonth += 12;
    }
    if (lunarLeap && lunarMonth !== leapMonth) {
      return null;
    } else if (lunarLeap || off >= leapOff) {
      off += 1;
    }
  }
  let monthStart = getNewMoonDay(k + off, timeZone);
  let nextMonthStart = getNewMoonDay(k + off + 1, timeZone);
  if (lunarDay > nextMonthStart - monthStart || lunarDay < 1) {
    return null;
  }
  return jdToDate(monthStart + lunarDay - 1);
}

/**
 * Can Chi for Year
 */
export function getYearCanChi(lunarYear: number): CanChiInfo {
  let canIndex = (lunarYear + 6) % 10;
  let chiIndex = (lunarYear + 8) % 12;
  return {
    can: CAN_NAMES[canIndex],
    chi: CHI_NAMES[chiIndex],
    name: `${CAN_NAMES[canIndex]} ${CHI_NAMES[chiIndex]}`,
  };
}

/**
 * Can Chi for Month
 */
export function getMonthCanChi(lunarMonth: number, lunarYear: number): CanChiInfo {
  let yearCanIndex = (lunarYear + 6) % 10;
  // Can của tháng Giêng (tháng 1):
  // Giáp Kỷ -> Bính Dần (2)
  // Ất Canh -> Mậu Dần (4)
  // Bính Tân -> Canh Dần (6)
  // Đinh Nhâm -> Nhâm Dần (8)
  // Mậu Quý -> Giáp Dần (0)
  let month1Can = (yearCanIndex * 2 + 2) % 10;
  let monthCan = (month1Can + lunarMonth - 1) % 10;
  let monthChi = (lunarMonth + 1) % 12; // Tháng 1 = Dần (2)
  return {
    can: CAN_NAMES[monthCan],
    chi: CHI_NAMES[monthChi],
    name: `${CAN_NAMES[monthCan]} ${CHI_NAMES[monthChi]}`,
  };
}

/**
 * Can Chi for Day
 */
export function getDayCanChi(jd: number): CanChiInfo {
  let canIndex = (jd + 9) % 10;
  let chiIndex = (jd + 1) % 12;
  return {
    can: CAN_NAMES[canIndex],
    chi: CHI_NAMES[chiIndex],
    name: `${CAN_NAMES[canIndex]} ${CHI_NAMES[chiIndex]}`,
  };
}

/**
 * Can Chi for Hour
 */
export function getHourCanChi(dayCanIndex: number, chiIndex: number): CanChiInfo {
  let tyCan = (dayCanIndex * 2) % 10;
  let canIndex = (tyCan + chiIndex) % 10;
  return {
    can: CAN_NAMES[canIndex],
    chi: CHI_NAMES[chiIndex],
    name: `${CAN_NAMES[canIndex]} ${CHI_NAMES[chiIndex]}`,
  };
}

/**
 * 24 Tiết Khí of the day
 */
export function getTietKhi(dayNumber: number, timeZone: number = 7): string {
  let rad = SunLongitude(dayNumber - 0.5 - timeZone / 24);
  let deg = (rad * 180) / PI;
  let index = Math.floor(deg / 15);
  return TIET_KHI_NAMES[index % 24];
}

/**
 * Check if the day is Hoang Dao (Auspicious) or Hac Dao (Inauspicious)
 */
export function getDayHoangDao(lunarMonth: number, dayChiIndex: number): { isHoangDao: boolean; name: string } {
  // Bảng 12 sao trực nhật theo tháng và chi ngày
  // Tháng 1, 7: Dần là Thanh Long
  // Tháng 2, 8: Thìn là Thanh Long
  // Tháng 3, 9: Ngọ là Thanh Long
  // Tháng 4, 10: Thân là Thanh Long
  // Tháng 5, 11: Tuất là Thanh Long
  // Tháng 6, 12: Tý là Thanh Long
  let baseChi: number;
  let m = (lunarMonth - 1) % 6;
  baseChi = (m * 2 + 2) % 12; // Dần, Thìn, Ngọ, Thân, Tuất, Tý

  let starIndex = (dayChiIndex - baseChi + 12) % 12;
  let starName = HOANG_DAO_STARS[starIndex];

  // Hoàng đạo stars: Thanh Long (0), Minh Đường (1), Kim Quỹ (4), Kim Đường (5), Ngọc Đường (7), Tư Mệnh (10)
  let isHoangDao = [0, 1, 4, 5, 7, 10].includes(starIndex);

  return {
    isHoangDao,
    name: `${starName} ${isHoangDao ? 'Hoàng Đạo (Cát)' : 'Hắc Đạo (Hung)'}`,
  };
}

/**
 * Get 12 Auspicious/Inauspicious Hours in the Day (Giờ Hoàng Đạo)
 */
export function getAuspiciousHours(dayChiIndex: number, dayCanIndex: number): HourAuspicious[] {
  // Quy tắc giờ Hoàng Đạo theo Chi ngày:
  // Dần, Thân: Tý, Sửu, Thìn, Tỵ, Mùi, Tuất
  // Mão, Dậu: Tý, Dần, Mão, Ngọ, Mùi, Dậu
  // Thìn, Tuất: Dần, Thìn, Tỵ, Thân, Dậu, Hợi
  // Tỵ, Hợi: Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi
  // Tý, Ngọ: Tý, Sửu, Mão, Ngọ, Thân, Dậu
  // Sửu, Mùi: Dần, Mão, Tỵ, Thân, Tuất, Hợi

  const HOANG_DAO_MAP: Record<number, number[]> = {
    0: [0, 1, 3, 6, 8, 9],     // Tý -> Tý, Sửu, Mão, Ngọ, Thân, Dậu
    1: [2, 3, 5, 8, 10, 11],   // Sửu -> Dần, Mão, Tỵ, Thân, Tuất, Hợi
    2: [0, 1, 4, 5, 7, 10],    // Dần -> Tý, Sửu, Thìn, Tỵ, Mùi, Tuất
    3: [0, 2, 3, 6, 7, 9],     // Mão -> Tý, Dần, Mão, Ngọ, Mùi, Dậu
    4: [2, 4, 5, 8, 9, 11],    // Thìn -> Dần, Thìn, Tỵ, Thân, Dậu, Hợi
    5: [1, 4, 6, 7, 10, 11],   // Tỵ -> Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi
    6: [0, 1, 3, 6, 8, 9],     // Ngọ
    7: [2, 3, 5, 8, 10, 11],   // Mùi
    8: [0, 1, 4, 5, 7, 10],    // Thân
    9: [0, 2, 3, 6, 7, 9],     // Dậu
    10: [2, 4, 5, 8, 9, 11],   // Tuất
    11: [1, 4, 6, 7, 10, 11],  // Hợi
  };

  const TIME_RANGES = [
    '23:00 - 00:59',
    '01:00 - 02:59',
    '03:00 - 04:59',
    '05:00 - 06:59',
    '07:00 - 08:59',
    '09:00 - 10:59',
    '11:00 - 12:59',
    '13:00 - 14:59',
    '15:00 - 16:59',
    '17:00 - 18:59',
    '19:00 - 20:59',
    '21:00 - 22:59',
  ];

  let hoangDaoIndices = HOANG_DAO_MAP[dayChiIndex] || [0, 1, 4, 5, 7, 10];

  return CHI_NAMES.map((chi, idx) => {
    let isAuspicious = hoangDaoIndices.includes(idx);
    let hourCanChi = getHourCanChi(dayCanIndex, idx);
    return {
      chi: `${chi} (${hourCanChi.name})`,
      timeRange: TIME_RANGES[idx],
      name: isAuspicious ? 'Hoàng Đạo' : 'Hắc Đạo',
      isAuspicious,
    };
  });
}

/**
 * Directions for Traveling (Hướng Xuất Hành)
 */
export function getTravelDirection(dayCanIndex: number): { hiThan: string; taiThan: string; hacThan: string } {
  // Hỉ Thần theo Can ngày:
  // Giáp, Kỷ: Đông Bắc
  // Ất, Canh: Tây Bắc
  // Bính, Tân: Tây Nam
  // Đinh, Nhâm: Chính Nam
  // Mậu, Quý: Đông Nam
  const HI_THAN = ['Đông Bắc', 'Tây Bắc', 'Tây Nam', 'Chính Nam', 'Đông Nam', 'Đông Bắc', 'Tây Bắc', 'Tây Nam', 'Chính Nam', 'Đông Nam'];

  // Tài Thần theo Can ngày:
  // Giáp, Ất: Đông Nam
  // Bính, Đinh: Chính Đông
  // Mậu: Chính Bắc
  // Kỷ: Chính Nam
  // Canh, Tân: Tây Nam
  // Nhâm, Quý: Chính Tây
  const TAI_THAN = ['Đông Nam', 'Đông Nam', 'Chính Đông', 'Chính Đông', 'Chính Bắc', 'Chính Nam', 'Tây Nam', 'Tây Nam', 'Chính Tây', 'Chính Tây'];

  // Hạc Thần (Hướng nên tránh khi xuất hành):
  const HAC_THAN = ['Tây Bắc', 'Tây Nam', 'Chính Bắc', 'Chính Tây', 'Đông Nam', 'Chính Đông', 'Đông Bắc', 'Chính Nam', 'Trung Cung', 'Chính Nam'];

  return {
    hiThan: HI_THAN[dayCanIndex],
    taiThan: TAI_THAN[dayCanIndex],
    hacThan: HAC_THAN[dayCanIndex],
  };
}

/**
 * Conflicting ages (Tuổi xung khắc theo ngày)
 */
export function getConflictingAges(dayCanIndex: number, dayChiIndex: number): string[] {
  // Lục xung: Tý - Ngọ, Sửu - Mùi, Dần - Thân, Mão - Dậu, Thìn - Tuất, Tỵ - Hợi
  let xungChiIndex = (dayChiIndex + 6) % 12;
  let xungCanIndex = (dayCanIndex + 4) % 10;
  let khacCanIndex = (dayCanIndex + 6) % 10;

  return [
    `${CAN_NAMES[xungCanIndex]} ${CHI_NAMES[xungChiIndex]}`,
    `${CAN_NAMES[khacCanIndex]} ${CHI_NAMES[xungChiIndex]}`,
    `${CAN_NAMES[dayCanIndex]} ${CHI_NAMES[xungChiIndex]}`,
    `Tuổi ${CHI_ANIMALS[xungChiIndex]} nói chung`,
  ];
}

/**
 * Trực của ngày (12 Trực)
 */
export function getDayTruc(lunarMonth: number, dayChiIndex: number): { name: string; meaning: string; isGood: boolean } {
  // Tháng 1: Kiến tại Dần (chi = 2)
  // Tháng 2: Kiến tại Mão (chi = 3)
  // v.v...
  let kienChi = (lunarMonth + 1) % 12;
  let trucIndex = (dayChiIndex - kienChi + 12) % 12;
  return TRUC_NAMES[trucIndex];
}

/**
 * Nhị Thập Bát Tú
 */
export function getNhiThapBatTu(jd: number): { name: string; element: string; quality: string; advice: string } {
  // Chu kỳ 28 sao theo Julian Day
  let index = (jd + 11) % 28;
  return NHI_THAP_BAT_TU[index];
}

/**
 * Comprehensive Day Information Builder
 */
export function getDayDetailedInfo(solarDate: SolarDate): DayDetailedInfo {
  let { day, month, year } = solarDate;
  let jd = jdFromDate(day, month, year);
  let lunar = convertSolar2Lunar(day, month, year, 7);

  let yearCanChi = getYearCanChi(lunar.year);
  let monthCanChi = getMonthCanChi(lunar.month, lunar.year);
  let dayCanChi = getDayCanChi(jd);

  // Approximate hour at current device time for the hour Can Chi
  let now = new Date();
  let currentHour = now.getHours();
  let hourChiIndex = Math.floor((currentHour + 1) / 2) % 12;
  let dayCanIndex = (jd + 9) % 10;
  let dayChiIndex = (jd + 1) % 12;
  let hourCanChi = getHourCanChi(dayCanIndex, hourChiIndex);

  let fullCanChi: FullCanChi = {
    day: dayCanChi,
    month: monthCanChi,
    year: yearCanChi,
    hour: hourCanChi,
  };

  let tietKhi = getTietKhi(jd, 7);
  let hoangDao = getDayHoangDao(lunar.month, dayChiIndex);
  let napAm = NAP_AM_TABLE[dayCanChi.name] || 'Hải Trung Kim';
  let truc = getDayTruc(lunar.month, dayChiIndex);
  let nhiThapBatTu = getNhiThapBatTu(jd);
  let auspiciousHours = getAuspiciousHours(dayChiIndex, dayCanIndex);
  let travelDirection = getTravelDirection(dayCanIndex);
  let conflictingAges = getConflictingAges(dayCanIndex, dayChiIndex);

  // Recommended activities based on Trực & Hoang Dao
  let goodActivities: string[] = [];
  let badActivities: string[] = [];

  if (hoangDao.isHoangDao) {
    goodActivities.push('Xuất hành, cầu tài lộc, mở mang kinh doanh');
    goodActivities.push('Đính hôn, cưới hỏi, kết giao bằng hữu');
    goodActivities.push('Ký kết văn bản hợp đồng, khởi công công trình nhỏ');
  } else {
    goodActivities.push('Tắm gội, thanh tịnh tâm trí, cầu an bái Phật');
    goodActivities.push('Thu dọn nhà cửa, sửa chữa vật dụng cũ');
  }

  if (truc.isGood) {
    goodActivities.push(`Hợp với việc: ${truc.meaning}`);
  } else {
    badActivities.push(`Trực ${truc.name}: Hạn chế các việc trọng đại`);
  }

  badActivities.push(`Tránh xuất hành về hướng ${travelDirection.hacThan} (Hạc Thần)`);
  badActivities.push('Tránh tranh cãi, mâu thuẫn lớn với các tuổi xung khắc');
  if (!hoangDao.isHoangDao) {
    badActivities.push('Kiêng động thổ lớn, xuất hành xa vào các giờ Hắc Đạo');
  }

  let proverbIndex = Math.abs(jd) % VIETNAMESE_PROVERBS.length;
  let proverb = VIETNAMESE_PROVERBS[proverbIndex];

  return {
    solar: solarDate,
    lunar,
    canChi: fullCanChi,
    tietKhi,
    isHoangDao: hoangDao.isHoangDao,
    hoangDaoName: hoangDao.name,
    napAm,
    truc,
    nhiThapBatTu,
    auspiciousHours,
    travelDirection,
    conflictingAges,
    goodActivities,
    badActivities,
    proverb,
  };
}
