import { ZodiacSignInfo, DailyHoroscope, DayDetailedInfo, SolarDate } from '../types/lunar';
import { jdFromDate } from '../utils/lunarSolarEngine';

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  {
    id: 'ty',
    name: 'Tý',
    animalNameVi: 'Chuột',
    element: 'Thủy',
    yinYang: 'Dương',
    years: [1960, 1972, 1984, 1996, 2008, 2020],
    hourlyPeriod: '23:00 - 00:59 (Giờ Tý)',
    description: 'Thông minh, mẫn tiệp, nhanh nhẹn, giỏi thích ứng và tích lũy của cải chu đáo.'
  },
  {
    id: 'suu',
    name: 'Sửu',
    animalNameVi: 'Trâu',
    element: 'Thổ',
    yinYang: 'Âm',
    years: [1961, 1973, 1985, 1997, 2009, 2021],
    hourlyPeriod: '01:00 - 02:59 (Giờ Sửu)',
    description: 'Chăm chỉ, kiên định, đáng tin cậy, làm việc có nguyên tắc và giàu lòng vị tha.'
  },
  {
    id: 'dan',
    name: 'Dần',
    animalNameVi: 'Hổ',
    element: 'Mộc',
    yinYang: 'Dương',
    years: [1962, 1974, 1986, 1998, 2010, 2022],
    hourlyPeriod: '03:00 - 04:59 (Giờ Dần)',
    description: 'Dũng cảm, hào sảng, có tố chất lãnh đạo, dám nghĩ dám làm và không ngại thử thách.'
  },
  {
    id: 'mao',
    name: 'Mão',
    animalNameVi: 'Mèo',
    element: 'Mộc',
    yinYang: 'Âm',
    years: [1963, 1975, 1987, 1999, 2011, 2023],
    hourlyPeriod: '05:00 - 06:59 (Giờ Mão)',
    description: 'Ôn hòa, thanh lịch, tinh tế, khéo léo trong giao tiếp và chuộng hòa bình.'
  },
  {
    id: 'thin',
    name: 'Thìn',
    animalNameVi: 'Rồng',
    element: 'Thổ',
    yinYang: 'Dương',
    years: [1964, 1976, 1988, 2000, 2012, 2024],
    hourlyPeriod: '07:00 - 08:59 (Giờ Thìn)',
    description: 'Khí chất uy nghiêm, nhiều hoài bão lớn, nhiệt huyết và có sức ảnh hưởng mạnh mẽ.'
  },
  {
    id: 'ty_snake',
    name: 'Tỵ',
    animalNameVi: 'Rắn',
    element: 'Hỏa',
    yinYang: 'Âm',
    years: [1965, 1977, 1989, 2001, 2013, 2025],
    hourlyPeriod: '09:00 - 10:59 (Giờ Tỵ)',
    description: 'Sâu sắc, điềm đạm, trực giác nhạy bén, quyết đoán và có tầm nhìn sắc sảo.'
  },
  {
    id: 'ngo',
    name: 'Ngọ',
    animalNameVi: 'Ngựa',
    element: 'Hỏa',
    yinYang: 'Dương',
    years: [1966, 1978, 1990, 2002, 2014, 2026],
    hourlyPeriod: '11:00 - 12:59 (Giờ Ngọ)',
    description: 'Yêu tự do, phóng khoáng, năng nổ, thích khám phá và dồi dào năng lượng sáng tạo.'
  },
  {
    id: 'mui',
    name: 'Mùi',
    animalNameVi: 'Dê',
    element: 'Thổ',
    yinYang: 'Âm',
    years: [1967, 1979, 1991, 2003, 2015, 2027],
    hourlyPeriod: '13:00 - 14:59 (Giờ Mùi)',
    description: 'Hiền lành, nhân hậu, có mắt thẩm mỹ nghệ thuật, giàu tình cảm và lòng trắc ẩn.'
  },
  {
    id: 'than',
    name: 'Thân',
    animalNameVi: 'Khỉ',
    element: 'Kim',
    yinYang: 'Dương',
    years: [1968, 1980, 1992, 2004, 2016, 2028],
    hourlyPeriod: '15:00 - 16:59 (Giờ Thân)',
    description: 'Linh hoạt, hóm hỉnh, đa tài, giỏi xoay sở trong tình huống khó và ham học hỏi.'
  },
  {
    id: 'dau',
    name: 'Dậu',
    animalNameVi: 'Gà',
    element: 'Kim',
    yinYang: 'Âm',
    years: [1969, 1981, 1993, 2005, 2017, 2029],
    hourlyPeriod: '17:00 - 18:59 (Giờ Dậu)',
    description: 'Ngăn nắp, đúng giờ, thẳng thắn, có tinh thần trách nhiệm cao và biết quản lý tài chính.'
  },
  {
    id: 'tuat',
    name: 'Tuất',
    animalNameVi: 'Chó',
    element: 'Thổ',
    yinYang: 'Dương',
    years: [1970, 1982, 1994, 2006, 2018, 2030],
    hourlyPeriod: '19:00 - 20:59 (Giờ Tuất)',
    description: 'Trung thành, nghĩa hiệp, trọng danh dự, bảo vệ công lý và bạn bè hết lòng.'
  },
  {
    id: 'hoi',
    name: 'Hợi',
    animalNameVi: 'Lợn',
    element: 'Thủy',
    yinYang: 'Âm',
    years: [1971, 1983, 1995, 2007, 2019, 2031],
    hourlyPeriod: '21:00 - 22:59 (Giờ Hợi)',
    description: 'Bao dung, đôn hậu, yêu đời, thích cuộc sống an yên sung túc và luôn chân thành.'
  },
];

// Relationships: Tam Hợp & Tứ Hành Xung
const TAM_HOP: Record<string, string[]> = {
  ty: ['Thân', 'Thìn'],
  suu: ['Tỵ', 'Dậu'],
  dan: ['Ngọ', 'Tuất'],
  mao: ['Hợi', 'Mùi'],
  thin: ['Thân', 'Tý'],
  ty_snake: ['Sửu', 'Dậu'],
  ngo: ['Dần', 'Tuất'],
  mui: ['Hợi', 'Mão'],
  than: ['Tý', 'Thìn'],
  dau: ['Tỵ', 'Sửu'],
  tuat: ['Dần', 'Ngọ'],
  hoi: ['Mão', 'Mùi'],
};

const LUC_XUNG: Record<string, string> = {
  ty: 'Ngọ',
  suu: 'Mùi',
  dan: 'Thân',
  mao: 'Dậu',
  thin: 'Tuất',
  ty_snake: 'Hợi',
  ngo: 'Tý',
  mui: 'Sửu',
  than: 'Dần',
  dau: 'Mão',
  tuat: 'Thìn',
  hoi: 'Tỵ',
};

const ZODIAC_COLORS: Record<string, string[]> = {
  ty: ['Xanh lam', 'Đen', 'Trắng bạc'],
  suu: ['Vàng hoàng yến', 'Nâu đất', 'Đỏ ruby'],
  dan: ['Xanh lá cây', 'Xanh lam', 'Hổ phách'],
  mao: ['Xanh ngọc bích', 'Hồng nhạt', 'Tím sen'],
  thin: ['Vàng kim', 'Bạc', 'Xanh lam'],
  ty_snake: ['Đỏ son', 'Cam đất', 'Tím thạch anh'],
  ngo: ['Đỏ tươi', 'Vàng chanh', 'Tím hoa cà'],
  mui: ['Nâu hạt dẻ', 'Vàng đất', 'Xanh ngọc'],
  than: ['Trắng tinh khiết', 'Vàng kim', 'Ghi xám'],
  dau: ['Vàng champagne', 'Trắng ánh kim', 'Nâu đồng'],
  tuat: ['Vàng đất', 'Đỏ mận', 'Cam gạch'],
  hoi: ['Xanh nước biển', 'Trắng sứ', 'Đen huyền'],
};

/**
 * Deterministic pseudo-random based on day and zodiac index
 */
function getDaySeed(jd: number, zodiacIndex: number): number {
  let x = Math.sin(jd * 9301 + zodiacIndex * 49297 + 233280) * 10000;
  return x - Math.floor(x);
}

/**
 * Calculate horoscope predictions for a specific zodiac animal on a given day
 */
export function calculateDailyHoroscope(
  zodiacId: string,
  solarDate: SolarDate,
  dayInfo: DayDetailedInfo
): DailyHoroscope {
  let zodiacIndex = ZODIAC_SIGNS.findIndex(z => z.id === zodiacId);
  if (zodiacIndex === -1) zodiacIndex = 0;
  let sign = ZODIAC_SIGNS[zodiacIndex];

  let jd = jdFromDate(solarDate.day, solarDate.month, solarDate.year);
  let seed1 = getDaySeed(jd, zodiacIndex);
  let seed2 = getDaySeed(jd + 1, zodiacIndex + 3);
  let seed3 = getDaySeed(jd + 2, zodiacIndex + 7);
  let seed4 = getDaySeed(jd + 3, zodiacIndex + 11);

  // Check if day's Chi is in Tam Hợp or Lục Xung
  let dayChi = dayInfo.canChi.day.chi;
  let isTamHop = TAM_HOP[zodiacId]?.includes(dayChi);
  let isLucXung = LUC_XUNG[zodiacId] === dayChi;

  let baseBonus = 0;
  if (isTamHop) baseBonus += 1;
  if (isLucXung) baseBonus -= 1;
  if (dayInfo.isHoangDao) baseBonus += 0.5;

  let careerScore = Math.min(5, Math.max(2, Math.round(3.2 + seed1 * 1.6 + baseBonus * 0.4)));
  let wealthScore = Math.min(5, Math.max(2, Math.round(3.0 + seed2 * 1.8 + baseBonus * 0.4)));
  let loveScore = Math.min(5, Math.max(2, Math.round(3.1 + seed3 * 1.7 + (isTamHop ? 0.8 : 0))));
  let healthScore = Math.min(5, Math.max(2, Math.round(3.4 + seed4 * 1.5 - (isLucXung ? 0.6 : 0))));

  let scoreOverall = Math.round((careerScore + wealthScore + loveScore + healthScore) / 4);

  // Tailored summaries
  let summary = '';
  if (isTamHop) {
    summary = `Hôm nay là ngày cát tinh tương trợ cho tuổi ${sign.name}. Được cục diện Tam Hợp che chở, vận trình sáng sủa, mưu sự đại thành, đón nhận nhiều tin vui từ công việc và nhân duyên.`;
  } else if (isLucXung) {
    summary = `Ngày phạm Lục Xung cảnh báo tuổi ${sign.name} cần hành sự thận trọng. Tránh nóng vội buông lời thiếu suy nghĩ, đề phòng mâu thuẫn tranh chấp và cẩn thận trong quản lý chi tiêu.`;
  } else if (dayInfo.isHoangDao) {
    summary = `Ngày Hoàng Đạo vượng khí mang lại năng lượng tích cực cho tuổi ${sign.name}. Thích hợp cho việc mở rộng các mối quan hệ xã giao, bắt tay triển khai kế hoạch mới.`;
  } else {
    summary = `Vận trình ngày bình ổn, mọi việc duy trì ở mức ổn định. Tuổi ${sign.name} nên tập trung làm tốt nhiệm vụ chuyên môn, dành thời gian nghỉ ngơi thư giãn bên gia đình.`;
  }

  // Domain-specific advice
  const CAREER_ADVICE = [
    'Công việc có tiến triển vượt bậc, ý kiến đóng góp được cấp trên ghi nhận và đánh giá cao.',
    'Nên tập trung vào những việc trọng tâm, chớ phân tán vào tiểu tiết gây hao tốn thời gian.',
    'Gặp gỡ quý nhân hoặc đối tác tin cậy, mở ra cơ hội hợp tác kinh doanh nhiều tiềm năng.',
    'Cần kiểm tra kỹ các điều khoản văn bản hợp đồng trước khi đặt bút ký duyệt ngày hôm nay.',
    'Thích hợp để học hỏi thêm kỹ năng mới hoặc hoàn tất các báo cáo, kế hoạch tồn đọng.'
  ];

  const WEALTH_ADVICE = [
    'Tài lộc hanh thông, các khoản thu nhập phụ hoặc tiền thưởng bất ngờ tìm đến tay.',
    'Tài chính ở mức an toàn, cần lên kế hoạch chi tiêu hợp lý, tránh mua sắm theo cảm xúc.',
    'Có lộc từ công việc buôn bán, kinh doanh ký kết hợp đồng thu về lợi nhuận khả quan.',
    'Hạn chế cho vay mượn tiền bạc hay đầu tư vào các dự án rủi ro chưa rõ tính pháp lý.',
    'Cơ hội gia tăng tích lũy tài sản mở ra, thích hợp nghiên cứu kênh đầu tư dài hạn.'
  ];

  const LOVE_ADVICE = [
    'Gia đạo êm ấm, người độc thân có cơ hội gặp gỡ đối tượng tương đồng về quan điểm sống.',
    'Đôi lứa nên dành cho nhau những cử chỉ quan tâm nhẹ nhàng, lắng nghe để thấu hiểu.',
    'Có chút xao xuyến trong cảm xúc, hãy mở lòng chia sẻ để hóa giải những khúc mắc nhỏ.',
    'Tình duyên thắm nồng, thích hợp hẹn hò lãng mạn hoặc ra mắt người thân hai bên.',
    'Một ngày bình yên, sự sẻ chia chân thành từ người ấy là nguồn động viên to lớn cho bạn.'
  ];

  const HEALTH_ADVICE = [
    'Thể trạng dồi dào, tinh thần minh mẫn, thích hợp rèn luyện thể thao nâng cao sức bền.',
    'Chú ý cân bằng giữa làm việc và nghỉ ngơi, tránh thức khuya ảnh hưởng đến thị lực.',
    'Bổ sung thêm nước ấm và các loại rau củ thanh nhiệt để tăng cường hệ miễn dịch.',
    'Nên vận động nhẹ nhàng giữa các giờ làm việc, tránh ngồi một chỗ quá lâu gây mỏi lưng.',
    'Giữ tinh thần lạc quan, thư giãn tâm trí bằng một tách trà ấm hoặc bản nhạc êm dịu.'
  ];

  let careerAdvice = CAREER_ADVICE[Math.floor(seed1 * CAREER_ADVICE.length)];
  let wealthAdvice = WEALTH_ADVICE[Math.floor(seed2 * WEALTH_ADVICE.length)];
  let loveAdvice = LOVE_ADVICE[Math.floor(seed3 * LOVE_ADVICE.length)];
  let healthAdvice = HEALTH_ADVICE[Math.floor(seed4 * HEALTH_ADVICE.length)];

  // Lucky numbers: 2 numbers between 1-99
  let n1 = Math.floor(seed1 * 49) * 2 + 1;
  let n2 = Math.floor(seed2 * 45) * 2 + 2;
  let luckyNumbers = [n1, n2];

  let luckyColors = ZODIAC_COLORS[zodiacId] || ['Đỏ son', 'Vàng kim'];

  // Best auspicious hour from the day's auspicious hours
  let goodHour = dayInfo.auspiciousHours.find(h => h.isAuspicious)?.chi || 'Giờ Thìn (07h-09h)';

  let compatibleZodiac = TAM_HOP[zodiacId]?.[0] || 'Thìn';
  let incompatibleZodiac = LUC_XUNG[zodiacId] || 'Ngọ';

  return {
    zodiacId,
    scoreOverall,
    careerScore,
    wealthScore,
    loveScore,
    healthScore,
    summary,
    careerAdvice,
    wealthAdvice,
    loveAdvice,
    healthAdvice,
    luckyNumbers,
    luckyColors,
    auspiciousHours: goodHour,
    compatibleZodiac,
    incompatibleZodiac,
  };
}
