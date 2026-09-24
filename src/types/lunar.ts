/**
 * Types for Vietnamese Lunar Calendar, Horoscope, and Festivals
 */

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeap: boolean;
  jd: number;
}

export interface SolarDate {
  day: number;
  month: number;
  year: number;
}

export interface CanChiInfo {
  can: string;
  chi: string;
  name: string;
}

export interface FullCanChi {
  day: CanChiInfo;
  month: CanChiInfo;
  year: CanChiInfo;
  hour: CanChiInfo; // Hour at current or chosen time
}

export interface HourAuspicious {
  chi: string;
  timeRange: string;
  name: string; // e.g., Thanh Long, Kim Quỹ...
  isAuspicious: boolean; // Hoàng đạo vs Hắc đạo
  lucNham?: string; // Tốc hỷ, Tiểu cát, Đại an...
}

export interface DayDetailedInfo {
  solar: SolarDate;
  lunar: LunarDate;
  canChi: FullCanChi;
  tietKhi: string; // Solar term (24 tiết khí)
  isHoangDao: boolean;
  hoangDaoName: string; // e.g., Kim Quỹ Hoàng Đạo, Chu Tước Hắc Đạo
  napAm: string; // Ngũ hành nạp âm ngày (e.g., Hải Trung Kim)
  truc: {
    name: string; // Kiến, Trừ, Mãn...
    meaning: string;
    isGood: boolean;
  };
  nhiThapBatTu: {
    name: string; // Giác, Cang, Đê...
    element: string; // Mộc, Kim...
    quality: string; // Kiết (Tốt) / Hung (Xấu)
    advice: string;
  };
  auspiciousHours: HourAuspicious[];
  travelDirection: {
    hiThan: string; // Hỉ thần
    taiThan: string; // Tài thần
    hacThan: string; // Hạc thần
  };
  conflictingAges: string[]; // Tuổi xung khắc trong ngày
  goodActivities: string[]; // Việc nên làm
  badActivities: string[]; // Việc kiêng cữ
  proverb: {
    text: string;
    authorOrSource: string;
  };
}

export type HolidayType = 'lunar' | 'solar' | 'traditional_festival';

export interface Holiday {
  id: string;
  title: string;
  type: HolidayType;
  day: number;
  month: number; // Lunar month or Solar month
  durationDays?: number;
  shortDescription: string;
  historicalSignificance: string;
  customs: string[];
  food: string[];
  taboos: string[];
  prayerText?: {
    title: string;
    content: string;
  };
  isOfficialOffDay?: boolean; // Nghỉ lễ chính thức quy định
}

export interface ZodiacSignInfo {
  id: string;
  name: string; // Tý, Sửu...
  animalNameVi: string; // Chuột, Trâu, Hổ, Mèo, Rồng, Rắn, Ngựa, Dê, Khỉ, Gà, Chó, Lợn
  element: string; // Thủy, Thổ, Mộc...
  yinYang: string; // Dương / Âm
  years: number[]; // Typical birth years (e.g. 1984, 1996, 2008...)
  hourlyPeriod: string; // 23h - 01h
  description: string;
}

export interface DailyHoroscope {
  zodiacId: string;
  scoreOverall: number; // 1 to 5 stars
  careerScore: number;
  wealthScore: number;
  loveScore: number;
  healthScore: number;
  summary: string;
  careerAdvice: string;
  wealthAdvice: string;
  loveAdvice: string;
  healthAdvice: string;
  luckyNumbers: number[];
  luckyColors: string[];
  auspiciousHours: string;
  compatibleZodiac: string; // Quý nhân
  incompatibleZodiac: string; // Xung khắc
}
